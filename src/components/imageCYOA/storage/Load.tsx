import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import JSZip from "jszip";
import { useAppStore } from "@/store";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useMemo } from "react";

function base64ToBlob(base64: string, mime: string) {
  mime = mime || "";
  const sliceSize = 1024;
  const byteChars = window.atob(base64);
  const byteArrays = [];

  for (
    let offset = 0, len = byteChars.length;
    offset < len;
    offset += sliceSize
  ) {
    const slice = byteChars.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mime });
}

export default function Load({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const loadApp = useAppStore((state) => state.loadApp);
  const app = useAppStore((state) => state.app);

  // Loads the file when the file input is changed.
  function uploadFile(files: FileList | null) {
    const item = files?.item(0);
    if (!item) return;
    console.log(item);
    const reader = new FileReader();
    reader.onload = () => {
      //console.log('hello', JSON.parse(reader.result));
      loadApp(JSON.parse(reader.result as string));
    };
    reader.readAsText(item);
  }

  // Saves the app-object down to a JSON-file.
  function saveFile(filename: string) {
    const data = JSON.stringify(app);
    const blob = new Blob([data], { type: "text/plain" });
    const a = document.createElement("a");
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = filename + ".json";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  // Saves the app-object down to a JSON-file.
  function saveFileFinished(filename: string) {
    const zip = new JSZip();
    const tempApp = JSON.parse(JSON.stringify(app));
    // Row image
    for (let i = 0; i < app.rows.length; i++) {
      const row = app.rows[i];
      if (row.image.length > 20) {
        console.log(row.image);

        const blab = base64ToBlob(row.image.split(",")[1], "image/jpeg");

        zip.file("images/R" + (i + 1) + ".jpeg", blab, { binary: true });
        tempApp.rows[i].image = "images/R" + (i + 1) + ".jpeg";
      }

      // Choice Image
      for (let j = 0; j < row.objects.length; j++) {
        const object = row.objects[j];
        if (object.image.length > 20) {
          const blab = base64ToBlob(object.image.split(",")[1], "image/jpeg");

          zip.file("images/R" + (i + 1) + "C" + (j + 1) + ".jpeg", blab, {
            binary: true,
          });

          tempApp.rows[i].objects[j].image =
            "images/R" + (i + 1) + "C" + (j + 1) + ".jpeg";
        }

        // Addon Image
        for (let k = 0; k < object.addons.length; k++) {
          const addon = object.addons[k];
          if (addon.image.length > 20) {
            const blab = base64ToBlob(addon.image.split(",")[1], "image/jpeg");

            zip.file(
              "images/R" + (i + 1) + "C" + (j + 1) + "A" + (k + 1) + ".jpeg",
              blab,
              {
                binary: true,
              },
            );

            tempApp.rows[i].objects[j].addons[k].image =
              "images/R" + (i + 1) + "C" + (j + 1) + "A" + (k + 1) + ".jpeg";
          }
        }
      }
    }

    const data = JSON.stringify(tempApp);
    const blob = new Blob([data], { type: "text/plain" });

    zip.file(filename + ".json", blob);

    zip.generateAsync({ type: "blob" }).then(function (blob) {
      const a = document.createElement("a");
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download = "hello.zip";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    });
  }

  const {
    characters: characterCount,
    choices: choicesCount,
    images: imagesCount,
    rows: rowsCount,
    biggestImage,
    smallestImage,
  } = useMemo(() => {
    let biggestPicture = 0;
    let biggestPictureTitle;
    let smallestPicture = 0;
    let smallestPictureTitle;

    let characters = 0;
    let choices = 0;
    let images = 0;

    for (const row of app.rows) {
      choices += row.objects.length;
      if (typeof row.titleText !== "undefined") {
        characters += row.titleText.length;
        characters += row.title.length;
      }
      if (row.image.length != 0) images++;

      for (const object of row.objects) {
        if (object.image.length != 0) {
          images++;
          const stringLength =
            object.image.length - "data:image/png;base64,".length;
          const sizeInBytes =
            4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
          if (Math.floor(sizeInBytes / 1000) > 400) {
            console.log(
              Math.floor(sizeInBytes / 1000) + " KB, " + object.title,
            );
          }
          if (biggestPicture < sizeInBytes) {
            biggestPicture = sizeInBytes;
            biggestPictureTitle = object.title;
          } else if (smallestPicture > sizeInBytes || smallestPicture == 0) {
            smallestPicture = sizeInBytes;
            smallestPictureTitle = object.title;
          }
        }
        if (typeof object.text !== "undefined") {
          characters += object.title.length;
          characters += object.text.length;

          for (const addon of object.addons) {
            characters += addon.title.length;
            characters += addon.text.length;
          }
        }
      }
    }

    const biggestImage =
      Math.floor(biggestPicture / 1000) + " KB, " + biggestPictureTitle;
    const smallestImage =
      Math.floor(smallestPicture / 1000) + " KB, " + smallestPictureTitle;

    return {
      characters,
      choices,
      images,
      rows: app.rows.length,
      biggestImage,
      smallestImage,
    };
  }, [app.rows]);

  return (
    <Dialog open={open} onOpenChange={(a) => !a && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Load/Save Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="load-project">Load Project</Label>
            <Input
              id="load-project"
              type="file"
              onChange={(e) => uploadFile(e.target.files)}
            />
          </div>
          <Button onClick={() => saveFile("project")}>Save Project</Button>
          <p className="text-sm">
            You can use the button below to save when you have finished your
            project, it will keep the images separated from the JSON. Do not
            overwrite your project, as the new JSON-file inside the zip this
            downloads will have no pictures if loaded into the Creator. Place
            the JSON into the app-file like normal, and the images-folder
            besides the other folders. If the project has a lot of images then
            they might end up not showing when someone loads on the page, if so
            then just use the normal way, and use Image Compression in features
            to reduce the size of the project file.
          </p>
          <Button
            onClick={() => saveFileFinished("project")}
            className="w-full"
          >
            Download Finished Project with separate images
          </Button>
          <Separator />
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Project Stats
          </h2>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-nowrap w-max">
                  Character Count
                </TableCell>
                <TableCell className="w-full">
                  {characterCount} Characters
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-nowrap w-max">
                  Choices Count
                </TableCell>
                <TableCell className="w-full">{choicesCount} Choices</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-nowrap w-max">
                  Images Count
                </TableCell>
                <TableCell className="w-full">{imagesCount} Images</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-nowrap w-max">Rows Count</TableCell>
                <TableCell className="w-full">{rowsCount} Rows</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-nowrap w-max">
                  Biggest Picture
                </TableCell>
                <TableCell className="w-full">{biggestImage}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-nowrap w-max">
                  Smallest Picture
                </TableCell>
                <TableCell className="w-full">{smallestImage}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-nowrap w-max">
                  Time Guesstimate
                </TableCell>
                <TableCell className="w-full">
                  {Math.floor(imagesCount * 5 + characterCount / 175)} Minutes/
                  {Math.floor(
                    (imagesCount * 5 + characterCount / 175) / 60,
                  )}{" "}
                  Hours <br />
                  (175 Characters Per Minute,
                  <br />5 Minutes Per Picture)
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
