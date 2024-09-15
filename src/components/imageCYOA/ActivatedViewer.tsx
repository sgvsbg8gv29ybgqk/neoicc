import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store";

export default function ActivatedViewer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [choicesTitles, setChoicesTitles] = useState<string>("");
  const [choicesIDs, setChoicesIDs] = useState<string>("");

  const [copiedTitles, setCopiedTitles] = useState(false);
  const [copiedIDs, setCopiedIDs] = useState(false);

  const [newActivated, setNewActivated] = useState<string>("");

  const styling = useAppStore((state) => state.app.styling);
  const rows = useAppStore((state) => state.app.rows);
  const setActivatedList = useAppStore((state) => state.setActivatedList);

  useEffect(() => {
    const titles: string[] = [];
    const ids: string[] = [];
    for (const row of rows) {
      for (const object of row.objects) {
        if (object.isActive) {
          titles.push(object.title);
          ids.push(object.id);
        } else if (
          object.isSelectableMultiple &&
          object.multipleUseVariable !== 0
        ) {
          titles.push(
            `${object.title} (Taken ${object.multipleUseVariable} Times)`,
          );
          ids.push(object.id + "/ON#" + object.multipleUseVariable);
        } else if (object.isImageUpload && object.image.length > 0) {
          ids.push(
            object.id + "/IMG#" + object.image.replaceAll(",", "/CHAR#"),
          );
        }
      }
    }
    setChoicesTitles(titles.join(", "));
    setChoicesIDs(ids.join(","));
  }, [rows]);

  function handleCopyTitles() {
    navigator.clipboard.writeText(choicesTitles);
    setCopiedTitles(true);
    setTimeout(() => setCopiedTitles(false), 1000);
  }

  function handleCopyIDs() {
    navigator.clipboard.writeText(choicesIDs);
    setCopiedIDs(true);
    setTimeout(() => setCopiedIDs(false), 1000);
  }

  function handleSaveChanges() {
    setActivatedList(newActivated);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(a) => !a && onClose()}>
      <DialogContent
        className="bg-repeat sm:max-w-3xl"
        style={{
          backgroundImage: `url("${styling.backgroundImage}")`,
          backgroundColor: styling.backgroundColor,
        }}
      >
        <DialogHeader>
          <DialogTitle>Activated Viewer</DialogTitle>
          <DialogDescription>
            Import/Export activated choices and their ID's.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {choicesTitles && (
            <div>
              <Label>Current Activated Choices Titles</Label>
              <ScrollArea className="mb-2 max-h-32 overflow-y-scroll rounded bg-white p-2">
                {choicesTitles}
              </ScrollArea>
              <Button
                variant="ghost"
                className="relative right-0 float-right -mt-12 bg-white/30"
                size="icon"
                onClick={handleCopyTitles}
              >
                {copiedTitles ? <Check /> : <Copy />}
              </Button>
            </div>
          )}
          {choicesIDs && (
            <div>
              <Label>Current Activated Choices IDs</Label>
              <ScrollArea className="mb-2 max-h-32 overflow-y-scroll rounded bg-white p-2">
                {choicesIDs}
              </ScrollArea>
              <Button
                variant="ghost"
                className="relative right-0 float-right -mt-12 bg-white/30"
                size="icon"
                onClick={handleCopyIDs}
              >
                {copiedIDs ? <Check /> : <Copy />}
              </Button>
            </div>
          )}
          <div>
            <Label htmlFor="activated-choices-textarea">
              Imported Choices IDs
            </Label>
            <Textarea
              id="activated-choices-textarea"
              placeholder="Area to import activated choices with lists of id's"
              value={newActivated}
              onChange={(e) => setNewActivated(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveChanges}>
            Save changes (Clean if empty)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
