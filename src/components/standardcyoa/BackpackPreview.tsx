import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store";
import { useRef } from "react";
import Row from "../imageCYOAViewer/Row";
import html2canvas from "html2canvas";

export default function BackpackPreview({
  open,
  onClose,
  type,
}: {
  open: boolean;
  onClose: () => void;
  type: string;
}) {
  const styling = useAppStore((state) => state.app.styling);
  const printRef = useRef<HTMLDivElement | null>(null);
  const backpack = useAppStore((state) => state.app.backpack);

  async function handlePrint() {
    if (!printRef.current) return;
    printRef.current.scroll({ top: 0, left: 0 });
    const canvas = await html2canvas(printRef.current, {
      imageTimeout: 0,
    });
    document.body.appendChild(canvas);
    const link = document.createElement("a");
    if (typeof link.download === "string") {
      link.href = canvas.toDataURL();
      link.download = "canvas.png";

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
      document.body.removeChild(canvas);
    } else {
      window.open(canvas.toDataURL());
    }
  }

  return (
    <Dialog open={open} onOpenChange={(a) => !a && onClose()}>
      <DialogContent
        className="max-h-screen overflow-y-scroll bg-repeat"
        style={{
          backgroundImage: `url(${styling.backgroundImage})`,
          backgroundColor: styling.backgroundColor,
          maxWidth: styling.backPackWidth + "px",
        }}
      >
        <DialogHeader>
          <DialogTitle>Backpack Preview</DialogTitle>
          <DialogDescription>Preview of your backpack</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={handlePrint} type="button">
            Download Image (Go all the way to the bottom to load in the pictures
            first)
          </Button>
          <div ref={printRef} className="flex flex-col">
            {backpack.map((row, index) => (
              <div key={index} className="p-0">
                <Row row={row} type={type} />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
