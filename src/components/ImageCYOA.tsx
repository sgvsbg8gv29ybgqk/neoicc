import { checkRequireds, pi, useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, CircleCheckBig, ListTodo } from "lucide-react";
import html2canvas from "html2canvas";
import { cn } from "@/lib/utils";
import Row from "./imageCYOAViewer/Row";
import { useWindowDimensions } from "@/lib/resize";
import Load from "./imageCYOA/storage/Load";
import ActivatedViewer from "./imageCYOA/ActivatedViewer";
import BackpackPreview from "./standardcyoa/BackpackPreview";

export default function ImageCYOAViewer({ onBack }: { onBack: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const bgImage = useAppStore((state) => state.app.styling.backgroundImage);
  const bgColor = useAppStore((state) => state.app.styling.backgroundColor);
  const barBGCol = useAppStore((state) => state.app.styling.barBackgroundColor);
  const barMargin = useAppStore((state) => state.app.styling.barMargin);
  const barPadding = useAppStore((state) => state.app.styling.barPadding);
  const pointTypes = useAppStore((state) => state.app.pointTypes);
  const backpack = useAppStore((state) => state.app.backpack);
  const activated = useAppStore((state) => state.app.activated);
  const barTextColor = useAppStore((state) => state.app.styling.barTextColor);
  const barTextMargin = useAppStore((state) => state.app.styling.barTextMargin);
  const barTextPad = useAppStore((state) => state.app.styling.barTextPadding);
  const barTextFont = useAppStore((state) => state.app.styling.barTextFont);
  const barTextSize = useAppStore((state) => state.app.styling.barTextSize);
  const barPointPos = useAppStore((state) => state.app.styling.barPointPos);
  const barPointNeg = useAppStore((state) => state.app.styling.barPointNeg);
  const rows = useAppStore((state) => state.app.rows);
  const importOpen = useAppStore((state) => state.app.importedChoicesIsOpen);
  const loadApp = useAppStore((state) => state.loadApp);
  const [modal, setModal] = useState<
    "none" | "appLoad" | "appActivatedViewer" | "appBackpackPreview"
  >("none");
  const { width } = useWindowDimensions();

  async function print() {
    if (!ref.current) return;
    html2canvas(ref.current, {
      imageTimeout: 0,
    }).then(function (canvas) {
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
    });
  }

  useEffect(() => {
    fetch("/project.json")
      .then((r) => r.json())
      .then(loadApp)
      .catch((e) => console.info(`No local project.json found: ${e}`));
  }, [loadApp]);

  return (
    <div
      className="bg-repeat pb-16 text-center"
      ref={ref}
      style={{
        backgroundImage: bgImage,
        backgroundColor: bgColor,
      }}
    >
      <div
        className="flex flex-row justify-between p-2"
        data-html2canvas-ignore
      >
        <Button variant="outline" onClick={onBack} type="button" size="icon">
          <ChevronLeft />
        </Button>
        <div className="flex flex-row gap-x-2">
          <Button onClick={print}>
            Download Image (Go all the way to the bottom to load in the pictures
            first)
          </Button>
          <Button onClick={() => setModal("appLoad")}>Load Project</Button>
        </div>
      </div>
      {/* Navbar that holds the pointtypes and backpack */}
      {(pointTypes.length > 0 || backpack.length > 0 || importOpen) && (
        <div
          className="fixed bottom-0 left-0 right-0 z-10 flex h-14 flex-row items-center justify-around"
          data-html2canvas-ignore
          style={{
            backgroundColor: barBGCol,
            margin: barMargin + "px",
            padding: barPadding + "px",
          }}
        >
          <div>
            {importOpen && (
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => setModal("appActivatedViewer")}
              >
                <ListTodo />
              </Button>
            )}
          </div>
          <div className="flex flex-row items-center justify-center">
            {pointTypes
              .filter(
                (el) =>
                  el.activatedId === "" || activated.includes(el.activatedId),
              )
              .map((score, index) => (
                <div
                  key={index}
                  style={{
                    color: barTextColor,
                    margin: barTextMargin + "px",
                    padding: barTextPad + "px",
                    fontFamily: `"${barTextFont}"`,
                    fontSize: barTextSize + "px",
                  }}
                >
                  {score.beforeText}{" "}
                  <span
                    style={{
                      color:
                        pi(score.startingSum) >= 0
                          ? typeof barPointPos !== "undefined"
                            ? barPointPos.hex
                            : ""
                          : typeof barPointNeg !== "undefined"
                            ? barPointNeg.hex
                            : "",
                    }}
                  >
                    {Math.round(pi(score.startingSum))}
                  </span>{" "}
                  {score.afterText}
                </div>
              ))}
          </div>
          <div>
            {backpack.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => setModal("appBackpackPreview")}
              >
                <CircleCheckBig />
              </Button>
            )}
          </div>
        </div>
      )}

      <Load open={modal === "appLoad"} onClose={() => setModal("none")} />
      <ActivatedViewer
        open={modal === "appActivatedViewer"}
        onClose={() => setModal("none")}
      />
      <BackpackPreview
        open={modal === "appBackpackPreview"}
        onClose={() => setModal("none")}
        type=""
      />

      <div className="grid-cols-2">
        {/* This is where the rows is shown */}
        {rows.map((row, index) => (
          <div
            key={index}
            className={cn(
              "grid h-max pb-0 pt-0",
              width > 1200 && row.width ? "col-span-1" : "col-span-2",
            )}
          >
            {checkRequireds({ activated, pointTypes }, row) && (
              <Row row={row} type="" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
