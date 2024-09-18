import { App, checkRequireds, pi, useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Brush,
  CaptionsOff,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  CircleCheckBig,
  ClipboardList,
  Copy,
  FilePlus2,
  List,
  ListTodo,
  Menu,
  PencilRuler,
  Save,
  Trash2,
  Wrench,
} from "lucide-react";
import html2canvas from "html2canvas";
import { cn } from "@/lib/utils";
import Row from "./imageCYOAViewer/Row";
import { useWindowDimensions } from "@/lib/resize";
import Load from "./imageCYOA/storage/Load";
import ActivatedViewer from "./imageCYOA/ActivatedViewer";
import BackpackPreview from "./standardcyoa/BackpackPreview";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Separator } from "./ui/separator";
import DOMPurify from "dompurify";
import ConfirmDialog from "./imageCYOA/ConfirmDialog";

export default function ImageCYOA({
  onBack,
  isCreator,
}: {
  onBack: () => void;
  isCreator: boolean;
}) {
  // TODO: implement these modals
  // "appRowList"
  // "appFeatures"
  // "appDesign"
  // "appIDList"
  // TODO: implement design component somewhere
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
  const toggleRowEdit = useAppStore((state) => state.toggleRowEdit);
  const cloneRow = useAppStore((state) => state.cloneRow);
  const createNewRow = useAppStore((state) => state.createNewRow);
  const cleanActivated = useAppStore((state) => state.cleanActivated);
  const moveRowUp = useAppStore((state) => state.moveRowUp);
  const moveRowDown = useAppStore((state) => state.moveRowDown);
  const deleteRow = useAppStore((state) => state.deleteRow);
  const [confirmDeleteRow, setConfirmDeleteRow] = useState<
    App["rows"][0] | undefined
  >(undefined);
  const [modal, setModal] = useState<
    | "none"
    | "appLoad"
    | "appActivatedViewer"
    | "appBackpackPreview"
    | "appRowList"
    | "appFeatures"
    | "appDesign"
    | "appIDList"
    | "appConfirm"
  >("none");
  const { width } = useWindowDimensions();
  const [topNav, setTopNav] = useState(false);

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
    /*
    fetch("/project.json")
      .then((r) => r.json())
      .then(loadApp)
      .catch((e) => console.info(`No local project.json found: ${e}`));
      */
  }, [loadApp]);

  const navButtons = [
    {
      text: "New Row",
      component: <FilePlus2 />,
      action: () => createNewRow(),
    },
    {
      text: "Open Row List",
      component: <List />,
      action: () => setModal("appRowList"),
    },
    {
      text: "Open Features",
      component: <PencilRuler />,
      action: () => setModal("appFeatures"),
    },
    {
      text: "Modify Design",
      component: <Brush />,
      action: () => setModal("appDesign"),
    },
    {
      text: "Save/Load Project",
      component: <Save />,
      action: () => setModal("appLoad"),
    },
  ] as const;

  return (
    <div
      className="flex flex-row bg-repeat pb-16 text-center"
      ref={ref}
      style={{
        backgroundImage: `url("${bgImage}")`,
        backgroundColor: bgColor,
      }}
    >
      {isCreator && !topNav && (
        <nav className="fixed z-20 flex h-screen flex-col justify-between bg-white p-2">
          <div className="flex flex-col gap-y-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => onBack()} size="icon" variant="ghost">
                    <ChevronLeft />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Return To Menu</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Separator />
            {navButtons.map((button, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={button.action} size="icon" variant="ghost">
                      {button.component}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{button.text}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          <div className="flex flex-col gap-y-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => cleanActivated()}
                    size="icon"
                    variant="ghost"
                  >
                    <CaptionsOff />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Clean Selected Choices</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setModal("appIDList")}
                    size="icon"
                    variant="ghost"
                  >
                    <ClipboardList />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>See ID/Title List</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setTopNav(true)}
                    size="icon"
                    variant="ghost"
                  >
                    <Menu />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Use Alternate Menu</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </nav>
      )}
      <div className={cn(isCreator && !topNav && "ml-14")}>
        {!isCreator && (
          <div
            className="flex flex-row justify-between p-2"
            data-html2canvas-ignore
          >
            <Button
              variant="outline"
              onClick={onBack}
              type="button"
              size="icon"
            >
              <ChevronLeft />
            </Button>
            <div className="flex flex-row gap-x-2">
              <Button onClick={print}>
                Download Image (Go all the way to the bottom to load in the
                pictures first)
              </Button>
              <Button onClick={() => setModal("appLoad")}>Load Project</Button>
            </div>
          </div>
        )}
        {isCreator && topNav && (
          <nav
            className="grid w-full grid-cols-8 justify-evenly gap-4 bg-white px-2.5 py-2.5"
            data-html2canvas-ignore
          >
            <Button onClick={() => onBack()} variant="ghost">
              <ChevronLeft />
            </Button>
            <Button onClick={() => cleanActivated()} variant="ghost">
              De-select Choices
            </Button>
            <Button onClick={() => setTopNav(false)} variant="ghost">
              <Menu />
            </Button>
            {navButtons.map((button, index) => (
              <Button onClick={button.action} variant="ghost" key={index}>
                {button.text}
              </Button>
            ))}
          </nav>
        )}
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
        <ConfirmDialog
          open={modal === "appConfirm"}
          onBack={() => setModal("none")}
          onConfirm={() => {
            if (confirmDeleteRow) {
              deleteRow(confirmDeleteRow);
              setConfirmDeleteRow(undefined);
            }
          }}
          text="Are you sure you want to delete this row?"
        />

        <div
          className={cn(
            "grid grid-cols-2",
            isCreator && !topNav ? "w-[calc(100vw-3.5rem)]" : "w-screen",
          )}
        >
          {/* This is where the rows is shown */}
          {rows.map((row, index) => (
            <div
              key={index}
              className={cn(
                "grid h-max pb-0 pt-0",
                width > 1200 && row.width ? "col-span-1" : "col-span-2",
              )}
            >
              <div>
                {isCreator && (
                  <div className="mx-2 mt-2 flex flex-row items-center justify-between rounded border bg-white px-4 py-4">
                    <div>
                      <b
                        className="text-xl"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(row.title),
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => toggleRowEdit(row)}
                              size="icon"
                              variant="ghost"
                            >
                              <Wrench />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <span>Edit Row</span>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => {
                                setConfirmDeleteRow(row);
                                setModal("appConfirm");
                              }}
                              size="icon"
                              variant="ghost"
                            >
                              <Trash2 />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <span>Delete Row</span>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => cloneRow(row)}
                              size="icon"
                              variant="ghost"
                            >
                              <Copy />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <span>Clone Row</span>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => moveRowUp(row)}
                              size="icon"
                              variant="ghost"
                            >
                              <ChevronUp />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <span>Move Row Up</span>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => moveRowDown(row)}
                              size="icon"
                              variant="ghost"
                            >
                              <ChevronDown />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <span>Move Row Down</span>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                )}
                {(isCreator ||
                  checkRequireds({ activated, pointTypes }, row)) && (
                  <Row row={row} type="" isCreator={isCreator} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
