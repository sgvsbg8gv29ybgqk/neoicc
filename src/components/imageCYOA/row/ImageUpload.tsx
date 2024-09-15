import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { App, findObjRow, Object, useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import ReactCrop, { centerCrop, PixelCrop } from "react-image-crop";

async function getDataURL(
  image: HTMLImageElement,
  crop: PixelCrop,
  scale = 100,
  quality = 100,
) {
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const offscreen = new OffscreenCanvas(
    crop.width * scaleX * (scale / 100),
    crop.height * scaleY * (scale / 100),
  );
  const ctx = offscreen.getContext("2d");
  if (!ctx) throw new Error("No 2d context in offscreen canvas");

  const cropX = crop.x * scaleX * 1;
  const cropY = crop.y * scaleY * 1;

  ctx.save();

  ctx.scale(scale / 100, scale / 100);
  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  );

  ctx.restore();

  const blob = await offscreen.convertToBlob(
    /*
    quality === 100
      ? { type: "image/png" }
      : { type: "image/jpeg", quality: quality / 100 },
      */
    { type: "image/jpeg", quality: quality / 100 },
  );
  const url = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      resolve(reader.result as string);
    };
  });
  return {
    url,
    size: blob.size,
    originalSize: 4 * Math.ceil(image.src.length / 3) * 0.5624896334383812,
    width: crop.width * (scale / 100),
    height: crop.height * (scale / 100),
  };
}

export default function ImageUpload({
  open,
  onClose,
  obj,
}: {
  open: boolean;
  onClose: () => void;
  obj: App["rows"][0] | Object | Object["addons"][0];
}) {
  const [crop, setCrop] = useState<PixelCrop | undefined>();
  const [imgSrc, setImgSrc] = useState<string>("");
  const [aspect, setAspect] = useState<number | undefined>(1);
  const [selectAspect, setSelectAspect] = useState<string>("1:1");
  const [inputAspectWidth, setInputAspectWidth] = useState<string>("1");
  const [inputAspectHeight, setInputAspectHeight] = useState<string>("1");
  const [scale, setScale] = useState<number>(100);
  const [quality, setQuality] = useState<number>(100);
  const [tooltip, setTooltip] = useState<string>("");
  const [resultImage, setResultImage] = useState<
    | {
        url: string;
        size: number;
        originalSize: number;
        width: number;
        height: number;
      }
    | undefined
  >();
  const [currentTab, setCurrentTab] = useState<"upload" | "external">("upload");
  const app = useAppStore((state) => ({
    rows: state.app.rows,
    backpack: state.app.backpack,
  }));
  const setImage = useAppStore((state) => state.setImage);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>();

  useEffect(() => {
    const row = findObjRow(obj, app);
    const w = row.defaultAspectWidth;
    const h = row.defaultAspectHeight;
    if (w && h) {
      const parsedW = typeof w === "string" ? parseInt(w) : w;
      const parsedH = typeof h === "string" ? parseInt(h) : h;
      setAspect(parsedW / parsedH);
      setInputAspectWidth(parsedW.toString());
      setInputAspectHeight(parsedH.toString());
      if (parsedW === parsedH) setSelectAspect("1:1");
      else if (parsedW === 3 && parsedH === 2) setSelectAspect("3:2");
      else if (parsedW === 4 && parsedH === 3) setSelectAspect("4:3");
      else if (parsedW === 16 && parsedH === 9) setSelectAspect("16:9");
      else if (parsedW === 9 && parsedH === 16) setSelectAspect("9:16");
      else setSelectAspect("custom");
    }
    if (!imgSrc && obj.image) {
      if (obj.image.length < 100) setCurrentTab("external");
      setImgSrc(obj.image);
    }
    if (!tooltip && obj.imageSourceTooltip) setTooltip(obj.imageSourceTooltip);
  }, [app, obj, imgSrc, tooltip]);

  function handleSelectAspectChange(value: string) {
    setSelectAspect(value);
    if (value === "custom") {
      setAspect(1);
      setInputAspectWidth("1");
      setInputAspectHeight("1");
      return;
    } else if (value === "unbound") {
      setAspect(undefined);
      setInputAspectWidth("");
      setInputAspectHeight("");
      return;
    }
    const [width, height] = value.split(":").map(Number);
    setAspect(width / height);
    setInputAspectWidth(width.toString());
    setInputAspectHeight(height.toString());
  }

  function handleInputAspectWidthChange(value: string) {
    setInputAspectWidth(value);
    if (!inputAspectHeight || !value) {
      setSelectAspect("unbound");
      setAspect(undefined);
      return;
    }
    if (selectAspect !== "custom") setSelectAspect("custom");
    setAspect(Number(value) / Number(inputAspectHeight));
  }

  function handleInputAspectHeightChange(value: string) {
    setInputAspectHeight(value);
    if (!inputAspectWidth || !value) {
      setSelectAspect("unbound");
      setAspect(undefined);
      return;
    }
    if (selectAspect !== "custom") setSelectAspect("custom");
    setAspect(Number(inputAspectWidth) / Number(value));
  }

  function handleUploadImageChange(image: FileList | null) {
    if (!image) {
      setImgSrc("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImgSrc(reader.result as string);
    reader.readAsDataURL(image[0]);
  }

  function handleImageLoad(image: HTMLImageElement) {
    const newAspect = aspect ?? 1;
    const constrainedHeight = image.height * newAspect <= image.width;
    setCrop(
      centerCrop(
        {
          unit: "px",
          width: constrainedHeight ? image.height * newAspect : image.width,
          height: constrainedHeight ? image.height : image.width / newAspect,
        },
        image.width,
        image.height,
      ),
    );
  }

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      (async () => {
        if (currentTab === "external") return;
        if (!crop || !imgSrc || !imageRef.current) {
          setResultImage(undefined);
          return;
        }
        const dataURL = await getDataURL(
          imageRef.current,
          crop,
          scale,
          quality,
        );
        setResultImage(dataURL);
      })();
    }, 100);
  }, [crop, imgSrc, imageRef, quality, scale, currentTab]);

  function handleSaveChanges() {
    if (currentTab === "external") {
      setImage(
        obj,
        imgSrc,
        undefined,
        undefined,
        tooltip ? tooltip : undefined,
      );
      onClose();
      return;
    }
    if (!resultImage) {
      setImage(obj, "");
      return;
    } else if (resultImage.url) {
      if (inputAspectWidth && inputAspectHeight)
        setImage(
          obj,
          resultImage.url,
          parseInt(inputAspectWidth),
          parseInt(inputAspectHeight),
          tooltip ? tooltip : undefined,
        );
      else
        setImage(
          obj,
          resultImage.url,
          undefined,
          undefined,
          tooltip ? tooltip : undefined,
        );
    }
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(a) => !a && onClose()}>
      <DialogContent className="max-h-screen max-w-max overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Image</DialogTitle>
          <DialogDescription>
            Upload your image or provide an external URL.
          </DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue="upload"
          value={currentTab}
          onValueChange={(v) => setCurrentTab(v as "upload" | "external")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
            <TabsTrigger value="external">External URL</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="flex flex-col gap-y-2">
            <div className="flex flex-row gap-x-2">
              <Input
                type="file"
                onChange={(e) => handleUploadImageChange(e.target.files)}
              />
              <Button onClick={() => setImgSrc("")}>Clear</Button>
            </div>
            {imgSrc && (
              <ReactCrop
                crop={crop}
                onChange={setCrop}
                aspect={aspect}
                className="w-max"
              >
                <img
                  src={imgSrc}
                  onLoad={(e) => handleImageLoad(e.currentTarget)}
                  ref={imageRef}
                />
              </ReactCrop>
            )}
            <div className="flex flex-col gap-y-1">
              <Label className="">Aspect Ratio</Label>
              <div className="grid grid-cols-2 gap-x-2">
                <Select
                  defaultValue="custom"
                  value={selectAspect}
                  onValueChange={handleSelectAspectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an Aspect Ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Aspect Ratios</SelectLabel>
                      <SelectItem value="custom">Custom</SelectItem>
                      <SelectItem value="unbound">Unbound</SelectItem>
                      <SelectItem value="1:1">1:1</SelectItem>
                      <SelectItem value="3:2">3:2</SelectItem>
                      <SelectItem value="4:3">4:3</SelectItem>
                      <SelectItem value="16:9">16:9</SelectItem>
                      <SelectItem value="9:16">9:16</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="flex flex-row items-center gap-x-2">
                  <Input
                    type="number"
                    className="rounded-r-none"
                    value={inputAspectWidth}
                    onChange={(e) =>
                      handleInputAspectWidthChange(e.target.value)
                    }
                  />
                  <span className="text-lg font-light text-neutral-300">/</span>
                  <Input
                    type="number"
                    className="rounded-l-none"
                    value={inputAspectHeight}
                    onChange={(e) =>
                      handleInputAspectHeightChange(e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <div className="flex flex-col gap-y-1">
                <Label htmlFor="scale-input">Scale</Label>
                <Input
                  id="scale-input"
                  type="number"
                  value={scale}
                  onChange={(e) => setScale(parseInt(e.target.value || "100"))}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <Label htmlFor="quality-input">Quality</Label>
                <Input
                  id="quality-input"
                  type="number"
                  value={quality}
                  onChange={(e) =>
                    setQuality(parseInt(e.target.value || "100"))
                  }
                />
              </div>
            </div>
            <span>
              Before: {Math.round((resultImage?.originalSize ?? 0) / 1000)}kB
              After: {Math.round((resultImage?.size ?? 0) / 1000)}kB
            </span>
            {resultImage?.url && (
              <img
                src={resultImage?.url}
                style={{
                  width: crop?.width ?? resultImage.width,
                  height: crop?.height ?? resultImage.height,
                }}
              />
            )}
          </TabsContent>
          <TabsContent value="external" className="flex flex-col gap-y-2">
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imgSrc}
              onChange={(e) => setImgSrc(e.target.value)}
            />
            {imgSrc && <img src={imgSrc} />}
          </TabsContent>
        </Tabs>
        <Input
          type="text"
          placeholder="Tooltip that shows when hovering over it"
          value={tooltip}
          onChange={(e) => setTooltip(e.target.value)}
        />
        <DialogFooter>
          <Button type="button" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
