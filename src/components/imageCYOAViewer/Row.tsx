import { useWindowDimensions } from "@/lib/resize";
import { cn } from "@/lib/utils";
import {
  App,
  checkRequireds,
  getImageURL,
  Object,
  pi,
  useAppStore,
} from "@/store";
import { CSSProperties, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import DOMPurify from "dompurify";
import AppObject from "./Object";
import { FilePlus2, KeyRound, List, Settings } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ObjectRequirement from "../imageCYOA/object/ObjectRequirement";
import ObjectList from "../imageCYOA/row/ObjectList";
import Requirement from "../imageCYOA/row/Requirement";
import ImageUpload from "../imageCYOA/row/ImageUpload";
import RowSettings from "../imageCYOA/row/RowSettings";
import ButtonSettings from "../imageCYOA/row/ButtonSettings";

export default function Row({
  row,
  type,
  isCreator,
}: {
  row: App["rows"][0] | App["backpack"][0];
  type: string;
  isCreator: boolean;
}) {
  const pointTypes = useAppStore((state) => state.app.pointTypes);
  const activated = useAppStore((state) => state.app.activated);
  const rows = useAppStore((state) => state.app.rows);
  const words = useAppStore((state) => state.app.words);
  const appStyling = useAppStore((state) => state.app.styling);
  const chapters = useAppStore((state) => state.app.chapters);
  const imagePrefix = useAppStore((state) => state.imagePrefix);
  const groups = useAppStore((state) => state.app.groups);
  const objectWidths = useAppStore((state) => state.objectWidths);
  const checkIfDeselect = useAppStore((state) => state.checkIfDeselect);
  const handleButtonActivate = useAppStore(
    (state) => state.handleButtonActivate,
  );
  const createNewObject = useAppStore((state) => state.createNewObject);
  const setRowButtonRow = useAppStore((state) => state.setRowButtonRow);
  const setRowInfoRow = useAppStore((state) => state.setRowInfoRow);
  const setRowResultRow = useAppStore((state) => state.setRowResultRow);
  const setRowWidth = useAppStore((state) => state.setRowWidth);
  const setRowResultGroupID = useAppStore((state) => state.setRowResultGroupID);
  const setRowTemplate = useAppStore((state) => state.setRowTemplate);
  const setRowTitle = useAppStore((state) => state.setRowTitle);
  const setRowAllowedChoices = useAppStore(
    (state) => state.setRowAllowedChoices,
  );
  const setRowObjectWidth = useAppStore((state) => state.setRowObjectWidth);
  const setRowRowJustify = useAppStore((state) => state.setRowRowJustify);
  const setRowID = useAppStore((state) => state.setRowID);
  const setRowCurrentChoices = useAppStore(
    (state) => state.setRowCurrentChoices,
  );
  const setRowTitleText = useAppStore((state) => state.setRowTitleText);
  const setRowDeselectChoices = useAppStore(
    (state) => state.setRowDeselectChoices,
  );
  const setRowChoicesShareTemplate = useAppStore(
    (state) => state.setRowChoicesShareTemplate,
  );
  const setRowTextIsRemoved = useAppStore((state) => state.setRowTextIsRemoved);
  const setRowResultShowRowTitle = useAppStore(
    (state) => state.setRowResultShowRowTitle,
  );
  const deleteRowRequireds = useAppStore((state) => state.deleteRowRequireds);
  const isEditModeOn = row.isEditModeOn;
  const [modal, setModal] = useState<
    | "none"
    | "appObjectList"
    | "appRequirement"
    | "appRowSettings"
    | "appImageUpload"
    | "appButtonSettings"
  >("none");

  /* TODO: Add the following modals:
     "appObjectList"
     "appRequirement"
     "appRowSettings"
     "appImageUpload"
     "appButtonSettings" */

  const { width } = useWindowDimensions();

  const widthMap = {
    "w-100": 100 / 1,
    "w-50": 100 / 2,
    "w-33": 100 / 3,
    "w-25": 100 / 4,
    "w-20": 100 / 5,
    "w-16": 100 / 6,
    "w-14": 100 / 7,
    "w-12": 100 / 8,
    "w-11": 100 / 9,
    "w-10": 100 / 10,
    "w-9": 100 / 11,
    "w-8": 100 / 12,
  };

  const styling: typeof row.styling & Partial<typeof appStyling> =
    row.isPrivateStyling ? row.styling : appStyling;

  const borderRadiusSuffix = styling.rowBorderRadiusIsPixels ? "px" : "%";
  const rowImageBorderRadiusSuffix = styling.rowImgBorderRadiusIsPixels
    ? "px"
    : "%";

  const rowImageStyle = (
    row.image !== ""
      ? {
          width: styling.rowImageWidth + "%",
          marginTop: styling.rowImageMarginTop + "%",
          marginBottom: styling.rowImageMarginBottom + "%",
          borderRadius: `${styling.rowImgBorderRadiusTopLeft}0${rowImageBorderRadiusSuffix} ${styling.rowImgBorderRadiusTopRight}0${rowImageBorderRadiusSuffix} ${styling.rowImgBorderRadiusBottomRight}0${rowImageBorderRadiusSuffix} ${styling.rowImgBorderRadiusBottomLeft}0${rowImageBorderRadiusSuffix}`,
          overflow: styling.rowImgOverflowIsOn ? "hidden" : undefined,
          border: styling.rowImgBorderIsOn
            ? `${styling.rowImgBorderWidth}px ${styling.rowImgBorderStyle} ${styling.rowImgBorderColor}`
            : undefined,
        }
      : {}
  ) satisfies CSSProperties;

  const rowButtonStyle = {
    paddingLeft: styling.rowButtonYPadding + "px",
    paddingRight: styling.rowButtonYPadding + "px",
    paddingTop: styling.rowButtonXPadding + "px",
    paddingBottom: styling.rowButtonXPadding + "px",
    color: "black",
  } satisfies CSSProperties;

  const rowTitle = (() => {
    let newObjectText = row.title;
    let isPointType = false;

    // TODO Add point type if it is.

    if (typeof words != "undefined") {
      // Checks if the word is the ID of a point-type.
      for (const word of words) {
        isPointType = false;

        for (const pointType of pointTypes) {
          if (pointType.id === word.id) {
            newObjectText = newObjectText.replace(
              new RegExp(word.id, "g"),
              pointType.startingSum.toString(),
            );
            isPointType = true;
          }
        } // If its not a point-type.
        if (!isPointType) {
          for (const word of words) {
            newObjectText = newObjectText.replace(
              new RegExp(word.id, "g"),
              word.replaceText,
            );
          }
        }
      }
    }
    return newObjectText;
  })();

  const rowTitleStyle = {
    fontFamily: styling.rowTitle,
    fontSize: styling.rowTitleTextSize + "%",
    textAlign: styling.rowTitleAlign as CSSProperties["textAlign"],
    color: styling.rowTitleColor,
  } satisfies CSSProperties;
  const rowTextStyle = {
    fontFamily: styling.rowText,
    textAlign: styling.rowTextAlign as CSSProperties["textAlign"],
    fontSize: styling.rowTextTextSize + "%",
    color: styling.rowTextColor,
    paddingTop: styling.rowTextPaddingX + "px",
    paddingBottom: styling.rowTextPaddingX + "px",
    paddingLeft: !isEditModeOn ? styling.rowTextPaddingY + "%" : undefined,
    paddingRight: !isEditModeOn ? styling.rowTextPaddingY + "%" : undefined,
  } satisfies CSSProperties;

  function parseColSpan(colSpan: string): number {
    const split = colSpan.split("-");
    if (split.length === 2) {
      if (split[0] !== "col") return -1;
      const span = parseInt(split[1]);
      if (isNaN(span)) return -1;
      return span;
    } else if (split.length === 3) {
      if (split[0] !== "col") return -1;
      const span = parseInt(split[2]);
      if (isNaN(span)) return -1;
      return span;
    }
    return -1;
  }

  // Used to find the backpack items in standard only.
  function findAllActiveObjects(
    obj: App["chapters"][0]["pages"][0],
    chapter: App["chapters"][0],
  ) {
    const newObjectList: Object[] = [];
    // If the id of child is equal to the redirect end-id.
    for (const row of obj.app.rows) {
      for (const object of row.objects) {
        if (object.isActive) newObjectList.push(object);
      }
    }

    if (obj && obj.children && obj.children.length > 0) {
      // For each child page.
      for (const child of obj.children)
        newObjectList.push(...findAllActiveObjects(child, chapter));
    }
    return newObjectList;
  }

  const resultArray = (() => {
    const objectArray: Object[] = [];

    if (type === "standard") {
      // For each chapter.
      for (const chapter of chapters) {
        // For each page.
        for (const page of chapter.pages) {
          // Check out this page, send in value of end-id.
          objectArray.push(...findAllActiveObjects(page, chapter)); // ID is string like «30»
        }
      }
    } else {
      // If groups are not used.
      if (row.resultGroupId === "" || row.resultGroupId === null) {
        for (const row of rows) {
          for (const object of row.objects) {
            // If the object is active.
            if (object.isActive) {
              objectArray.push(object);
            } else if (object.isImageUpload) {
              if (object.image.length > 5) objectArray.push(object);
              // TODO
            } else if (object.isSelectableMultiple) {
              if (typeof object.multipleUseVariable !== "undefined") {
                if (object.multipleUseVariable > 0) {
                  objectArray.push(object);
                }
              }
            }
          }
        }
      } else {
        // For all of the objects in the rows.
        for (const row2 of rows) {
          for (const object of row2.objects) {
            // If the object is active...
            if (object.isActive) {
              // Move trough all groups...
              for (const group of object.groups) {
                if (
                  row.resultGroupId === row2.resultGroupId &&
                  row2 != row &&
                  group.id === row2.resultGroupId
                ) {
                  objectArray.push(object);
                } else {
                  for (const group2 of object.groups) {
                    if (
                      group2.id === row.resultGroupId &&
                      group.id === row.resultGroupId
                    ) {
                      objectArray.push(object);
                    }
                  }
                }
              }
            } else if (object.isImageUpload && object.image.length > 5) {
              for (const group of object.groups) {
                if (
                  row.resultGroupId === row2.resultGroupId &&
                  row2 != row &&
                  group.id === row2.resultGroupId
                ) {
                  objectArray.push(object);
                } else {
                  for (const group2 of object.groups) {
                    if (
                      group2.id === row.resultGroupId &&
                      group.id === row.resultGroupId
                    ) {
                      objectArray.push(object);
                    }
                  }
                }
              }
            } else if (object.isSelectableMultiple) {
              // console.log("Mul");
              if (typeof object.multipleUseVariable !== "undefined") {
                if (object.multipleUseVariable > 0) {
                  // Move trough all groups...
                  for (const group of object.groups) {
                    if (
                      row.resultGroupId === row2.resultGroupId &&
                      row2 != row &&
                      group.id === row2.resultGroupId
                    ) {
                      objectArray.push(object);
                    } else {
                      for (const group2 of object.groups) {
                        if (
                          group2.id === row.resultGroupId &&
                          group.id === row.resultGroupId
                        ) {
                          objectArray.push(object);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return objectArray;
  })();

  // The object height, checks if full object height is turned on and edit-mode is off.
  const objectHeight =
    styling.objectHeight && !isEditModeOn ? "flex h-full" : "";

  // The select that decides the template of the row.
  const templates = [
    { text: "Image Top", value: "1" },
    { text: "Image Right", value: "2" },
    { text: "Image Left", value: "3" }, // 5 per row.
    { text: "Image Bottom", value: "4" },
  ];

  const justify = [
    { value: "start" },
    { value: "center" },
    { value: "end" },
    { value: "space-around" },
    { value: "space-between" },
  ];

  return (
    <div
      className="bg-repeat text-center"
      style={{
        marginTop: styling.rowBodyMarginTop + "px",
        marginBottom: styling.rowBodyMarginBottom + "px",
        backgroundImage: `url("${styling.backgroundImage}")`,
        backgroundColor: styling.backgroundColor,
        marginLeft: !isEditModeOn ? styling.rowBodyMarginSides + "%" : "1%",
        marginRight: !isEditModeOn ? styling.rowBodyMarginSides + "%" : "1%",
      }}
    >
      {isEditModeOn && (
        <div>
          <div className="flex flex-row justify-end rounded-t border p-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => createNewObject(row)}
                    size="icon"
                    variant="ghost"
                  >
                    <FilePlus2 />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Create New Object</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setModal("appObjectList")}
                    size="icon"
                    variant="ghost"
                  >
                    <List />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>List of objects</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setModal("appRequirement")}
                    size="icon"
                    variant="ghost"
                  >
                    <KeyRound />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Create Requirement</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setModal("appRowSettings")}
                    size="icon"
                    variant="ghost"
                  >
                    <Settings />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Open Row Settings</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-row flex-wrap justify-around gap-4 rounded-b border-x border-b p-2">
            <div>
              {/* The upload of Image */}
              {!row.isButtonRow ? (
                <div className="flex flex-col items-center gap-y-2">
                  {row.image && (
                    <img
                      className="max-w-80 inline-block h-max max-h-36 w-max"
                      src={getImageURL(row.image, imagePrefix)}
                      onClick={() => setModal("appImageUpload")}
                    />
                  )}
                  <Button
                    onClick={() => setModal("appImageUpload")}
                    className="min-w-48 w-full"
                  >
                    Change Image
                  </Button>
                </div>
              ) : (
                // The button that opens button settings
                <Button
                  onClick={() => setModal("appButtonSettings")}
                  className="min-w-48"
                >
                  Open Button Settings
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              {/* switch that let the user change between an image and button */}
              <div className="flex flex-row items-center gap-x-1">
                <Switch
                  id="button-row-switch"
                  checked={row.isButtonRow}
                  onCheckedChange={(checked) => setRowButtonRow(row, checked)}
                />
                <Label htmlFor="button-row-switch">Button?</Label>
              </div>
              <div className="flex flex-row items-center gap-x-1">
                <Switch
                  id="row-info-switch"
                  checked={row.isInfoRow}
                  onCheckedChange={(checked) => setRowInfoRow(row, checked)}
                />
                <Label htmlFor="row-info-switch">Non-activatable?</Label>
              </div>
              <div className="flex flex-row items-center gap-x-1">
                <Switch
                  id="row-result-switch"
                  checked={row.isResultRow}
                  onCheckedChange={(checked) => setRowResultRow(row, checked)}
                />
                <Label htmlFor="row-result-switch">Selected Choices?</Label>
              </div>
              <div className="flex flex-row items-center gap-x-1">
                <Switch
                  id="width-switch"
                  checked={row.width ?? false}
                  onCheckedChange={(checked) => setRowWidth(row, checked)}
                />
                <Label htmlFor="width-switch">Half of the screen?</Label>
              </div>
              {row.isResultRow && (
                <div className="flex flex-col items-start gap-y-1">
                  <Label htmlFor="group-select">
                    Select Choices From Group ID
                  </Label>
                  <Select
                    value={row.resultGroupId || "none"}
                    onValueChange={(value) => {
                      const res = value === "none" ? null : value;
                      setRowResultGroupID(row, res);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        id="group-select"
                        placeholder="All Rows and Objects"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Groups</SelectLabel>
                        <SelectItem value="none">None</SelectItem>
                        {groups.map((group) => (
                          <SelectItem value={group.id} key={group.id}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-col items-start gap-y-1">
                <Label htmlFor="template-select">Template</Label>
                <Select
                  value={row.template}
                  onValueChange={(value) => setRowTemplate(row, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue id="template-select" placeholder="Templates" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Templates</SelectLabel>
                      {templates.map((template) => (
                        <SelectItem value={template.value} key={template.value}>
                          {template.text}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col items-start gap-y-1">
                <Label htmlFor="row-title-input">Row Title</Label>
                <Input
                  id="row-title-input"
                  placeholder="Placeholder"
                  value={row.title}
                  onChange={(e) => {
                    const value = e.target.value;
                    setRowTitle(row, value);
                  }}
                />
              </div>
              <div className="flex flex-col items-start gap-y-1">
                <Label htmlFor="allowed-choices-input">Allowed Choices</Label>
                <Input
                  id="allowed-choices-input"
                  type="number"
                  value={row.allowedChoices}
                  onChange={(e) => {
                    const value = e.target.value;
                    setRowAllowedChoices(row, value);
                  }}
                  placeholder="Placeholder"
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-col items-start gap-y-1">
                <Label htmlFor="object-width-select">Objects Per Row</Label>
                <Select
                  value={row.objectWidth}
                  onValueChange={(value) => {
                    const res = value === "none" ? "" : value;
                    setRowObjectWidth(row, res);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      id="object-width-select"
                      placeholder="Templates"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Object Widths</SelectLabel>
                      {objectWidths.map((width) => (
                        <SelectItem
                          value={width.value || "none"}
                          key={width.value || "none"}
                        >
                          {width.text}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col items-start gap-y-1">
                <Label htmlFor="justify-select">Choices Justify</Label>
                <Select
                  value={row.rowJustify ?? "none"}
                  onValueChange={(value) => {
                    const res = value === "none" ? null : value;
                    setRowRowJustify(row, res);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue id="justify-select" placeholder="Templates" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Justifies</SelectLabel>
                      <SelectItem value="none">none</SelectItem>
                      {justify.map((just) => (
                        <SelectItem value={just.value} key={just.value}>
                          {just.value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col items-start gap-y-1">
                <Label htmlFor="row-id-input">Row ID</Label>
                <Input
                  id="row-id-input"
                  value={row.id}
                  onChange={(e) => {
                    const value = e.target.value;
                    setRowID(row, value);
                  }}
                  placeholder="Placeholder"
                />
              </div>
              <div className="flex flex-col items-start gap-y-1">
                <Label htmlFor="selected-choices-input">Selected Choices</Label>
                <Input
                  id="selected-choices-input"
                  type="number"
                  value={row.currentChoices}
                  onChange={(e) => {
                    const value = e.target.value;
                    setRowCurrentChoices(row, parseInt(value));
                  }}
                  placeholder="Placeholder"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col items-start gap-y-1">
                <Label htmlFor="row-text-textarea">Row Text</Label>
                <Textarea
                  id="row-text-textarea"
                  value={row.titleText}
                  onChange={(e) => {
                    const value = e.target.value;
                    setRowTitleText(row, value);
                  }}
                  rows={8}
                  className="min-w-96"
                />
              </div>
            </div>
            <div className="flex w-full flex-row justify-around gap-x-2">
              <div className="flex flex-row items-center gap-x-1">
                <Switch
                  id="deselect-choices-switch"
                  checked={row.deselectChoices ?? false}
                  onCheckedChange={(checked) =>
                    setRowDeselectChoices(row, checked)
                  }
                />
                <Label htmlFor="deselect-choices-switch" className="text-left">
                  Deselects choices when Row lack requirements?
                </Label>
              </div>
              {row.isResultRow && (
                <>
                  <div className="flex flex-row items-center gap-x-1">
                    <Switch
                      id="choices-share-template-switch"
                      checked={row.choicesShareTemplate ?? false}
                      onCheckedChange={(checked) =>
                        setRowChoicesShareTemplate(row, checked)
                      }
                    />
                    <Label
                      htmlFor="choices-share-template-switch"
                      className="text-left"
                    >
                      Choices will all be 'Template Top' and Row Width
                    </Label>
                  </div>
                  <div className="flex flex-row items-center gap-x-1">
                    <Switch
                      id="text-is-removed-switch"
                      checked={row.textIsRemoved ?? false}
                      onCheckedChange={(checked) =>
                        setRowTextIsRemoved(row, checked)
                      }
                    />
                    <Label
                      htmlFor="text-is-removed-switch"
                      className="text-left"
                    >
                      Remove the text of the choices.
                    </Label>
                  </div>
                  <div className="flex flex-row items-center gap-x-1">
                    <Switch
                      id="result-show-row-title-switch"
                      checked={row.resultShowRowTitle ?? false}
                      onCheckedChange={(checked) =>
                        setRowResultShowRowTitle(row, checked)
                      }
                    />
                    <Label
                      htmlFor="result-show-row-title-switch"
                      className="text-left"
                    >
                      Show the title of the row in the choice.
                    </Label>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-row flex-wrap justify-around">
            {/* Shows the requirements, allows the user to delete or change its id */}
            {row.requireds.map((required, index) => (
              <div>
                <ObjectRequirement
                  isEditModeOn={isEditModeOn}
                  required={required}
                  key={index}
                />
                <Button onClick={() => deleteRowRequireds(row, required)}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Preview and editable objects */}
      {(isCreator || checkIfDeselect(row)) && (
        <div>
          {/* The templates of the preview, show if !isEditModeOn and all requireds is selected. */}
          {(!isCreator || (!isEditModeOn && checkIfDeselect(row))) && (
            <div
              className={cn(
                row.title !== "" && "bg-repeat",
                row.title !== "" &&
                  styling.rowOverflowIsOn &&
                  "overflow-hidden",
              )}
              style={
                row.title !== ""
                  ? {
                      backgroundImage: styling.rowGradientIsOn
                        ? `linear-gradient("${styling.rowGradient}")`
                        : `url("${styling.rowBackgroundImage}")`,
                      backgroundColor: styling.rowBgColorIsOn
                        ? styling.rowBgColor
                        : undefined,
                      marginLeft: styling.rowMargin + "%",
                      marginRight: styling.rowMargin + "%",
                      borderRadius: `${styling.rowBorderRadiusTopLeft}0${borderRadiusSuffix} ${styling.rowBorderRadiusTopRight}0${borderRadiusSuffix} ${styling.rowBorderRadiusBottomRight}0${borderRadiusSuffix} ${styling.rowBorderRadiusBottomLeft}0${borderRadiusSuffix}`,
                      border: styling.rowBorderIsOn
                        ? `${styling.rowBorderWidth}px ${styling.rowBorderStyle} ${styling.rowBorderColor}`
                        : undefined,
                      filter: styling.rowDropShadowIsOn
                        ? `drop-shadow(${styling.rowDropShadowH}px ${styling.rowDropShadowV}px ${styling.rowDropShadowBlur}px ${styling.rowDropShadowColor})`
                        : undefined,
                    }
                  : {}
              }
            >
              {/* The div that will show of the preview */}
              {(pi(row.template) === 1 || width < 1000) && (
                <div>
                  {/* If Image is activated */}
                  {!row.isButtonRow &&
                  row.imageSourceTooltip !== "" &&
                  typeof row.imageSourceTooltip !== "undefined" ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {row.image ? (
                            <img
                              className="inline-block"
                              style={rowImageStyle}
                              src={getImageURL(row.image, imagePrefix)}
                            />
                          ) : (
                            <div className="inline-block" />
                          )}
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>{row.imageSourceTooltip}</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : !row.isButtonRow ? (
                    row.image ? (
                      <img
                        className="inline-block"
                        style={rowImageStyle}
                        src={getImageURL(row.image, imagePrefix)}
                      />
                    ) : (
                      <div className="inline-block" />
                    )
                  ) : (
                    // If button is activated
                    <Button
                      className="mb-[5px]"
                      disabled={
                        (!row.buttonType && activated.includes(row.buttonId)) ||
                        (row.onlyIfNoChoices && row.currentChoices !== 0)
                      }
                      onClick={() => handleButtonActivate(row)}
                      style={rowButtonStyle}
                    >
                      {row.buttonText}
                    </Button>
                  )}
                  {/* Title or text */}
                  {row.title !== "" && (
                    <h2
                      style={rowTitleStyle}
                      className="mb-0"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(rowTitle),
                      }}
                    />
                  )}
                  {row.titleText !== "" && (
                    <p
                      className="mb-0 whitespace-pre-line"
                      style={rowTextStyle}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(row.titleText),
                      }}
                    ></p>
                  )}
                </div>
              )}
              {/* The div that will show of the preview */}
              {pi(row.template) === 2 && width > 1000 && (
                <div className="grid grid-cols-2 p-0">
                  {/* Text and title */}
                  <div className="p-0">
                    {row.title !== "" && (
                      <h2
                        className="mb-0"
                        style={rowTitleStyle}
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(rowTitle),
                        }}
                      />
                    )}
                    {row.titleText !== "" && (
                      <p
                        className="mb-0 whitespace-pre-line"
                        style={rowTextStyle}
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(row.titleText),
                        }}
                      />
                    )}
                  </div>
                  {/* Image or button */}
                  <div className="p-0">
                    {!row.isButtonRow &&
                    row.imageSourceTooltip !== "" &&
                    typeof row.imageSourceTooltip !== "undefined" ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            {row.image ? (
                              <img
                                className="inline-block"
                                style={rowImageStyle}
                                src={getImageURL(row.image, imagePrefix)}
                              />
                            ) : (
                              <div className="inline-block" />
                            )}
                          </TooltipTrigger>
                          <TooltipContent>
                            <span>{row.imageSourceTooltip}</span>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : !row.isButtonRow ? (
                      row.image ? (
                        <img
                          className="inline-block"
                          style={rowImageStyle}
                          src={getImageURL(row.image, imagePrefix)}
                        />
                      ) : (
                        <div className="inline-block" />
                      )
                    ) : (
                      // If button is activated
                      <Button
                        className="mb-[5px]"
                        disabled={
                          (!row.buttonType &&
                            activated.includes(row.buttonId)) ||
                          (row.onlyIfNoChoices && row.currentChoices !== 0)
                        }
                        onClick={() => handleButtonActivate(row)}
                        style={rowButtonStyle}
                      >
                        {row.buttonText}
                      </Button>
                    )}
                  </div>
                </div>
              )}
              {/* The div that will show of the preview */}
              {pi(row.template) === 3 && (
                <div className="grid grid-cols-2 p-0">
                  <div className="p-0">
                    {!row.isButtonRow &&
                    row.imageSourceTooltip !== "" &&
                    typeof row.imageSourceTooltip !== "undefined" ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            {row.image ? (
                              <img
                                className="inline-block"
                                style={rowImageStyle}
                                src={getImageURL(row.image, imagePrefix)}
                              />
                            ) : (
                              <div className="inline-block" />
                            )}
                          </TooltipTrigger>
                          <TooltipContent>
                            <span>{row.imageSourceTooltip}</span>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : !row.isButtonRow ? (
                      row.image ? (
                        <img
                          className="inline-block"
                          style={rowImageStyle}
                          src={getImageURL(row.image, imagePrefix)}
                        />
                      ) : (
                        <div className="inline-block" />
                      )
                    ) : (
                      // If button is activated
                      <Button
                        className="mb-[5px]"
                        disabled={
                          (!row.buttonType &&
                            activated.includes(row.buttonId)) ||
                          (row.onlyIfNoChoices && row.currentChoices !== 0)
                        }
                        onClick={() => handleButtonActivate(row)}
                        style={rowButtonStyle}
                      >
                        {row.buttonText}
                      </Button>
                    )}
                  </div>
                  <div className="p-0">
                    {row.title !== "" && (
                      <h2
                        className="mb-0"
                        style={rowTitleStyle}
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(rowTitle),
                        }}
                      />
                    )}
                    {row.titleText !== "" && (
                      <p
                        className="mb-0 whitespace-pre-line"
                        style={rowTextStyle}
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(row.titleText),
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
              {/* The div that will show of the preview */}
              {pi(row.template) === 4 && (
                <div className="p-0">
                  {row.title !== "" && (
                    <h2
                      className="mb-0"
                      style={rowTitleStyle}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(rowTitle),
                      }}
                    />
                  )}
                  {row.titleText !== "" && (
                    <p
                      className="mb-0 whitespace-pre-line"
                      style={rowTextStyle}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(row.titleText),
                      }}
                    />
                  )}
                  {/* If Image is activated */}
                  {!row.isButtonRow &&
                  row.imageSourceTooltip !== "" &&
                  typeof row.imageSourceTooltip !== "undefined" ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {row.image ? (
                            <img
                              className="inline-block"
                              style={rowImageStyle}
                              src={getImageURL(row.image, imagePrefix)}
                            />
                          ) : (
                            <div className="inline-block" />
                          )}
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>{row.imageSourceTooltip}</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : !row.isButtonRow ? (
                    row.image ? (
                      <img
                        className="inline-block"
                        style={rowImageStyle}
                        src={getImageURL(row.image, imagePrefix)}
                      />
                    ) : (
                      <div className="inline-block" />
                    )
                  ) : (
                    <Button
                      className="mb-[5px]"
                      disabled={
                        (!row.buttonType && activated.includes(row.buttonId)) ||
                        (row.onlyIfNoChoices && row.currentChoices !== 0)
                      }
                      onClick={() => handleButtonActivate(row)}
                      style={rowButtonStyle}
                    >
                      {row.buttonText}
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
          {/* Where the object-components are created and listed. */}
          {!row.isResultRow ? (
            <div
              className="m-0 flex flex-row flex-wrap p-0"
              style={{ justifyContent: row.rowJustify }}
            >
              {/* If objectWidth in the object is empty, use the row.objectWidth */}
              {row.objects.map((object, index) => {
                const widthClass = object.objectWidth || row.objectWidth;
                const span = parseColSpan(widthClass);
                let widthPercentage =
                  span !== -1
                    ? (100 / 12) * span
                    : widthMap[widthClass as keyof typeof widthMap];
                if (width <= 500) widthPercentage = 100;
                else if (width <= 1000) widthPercentage = 50;
                return (
                  ((isCreator && isEditModeOn) ||
                    checkRequireds({ activated, pointTypes }, object) ||
                    (object.isPrivateStyling &&
                    object.styling?.reqFilterVisibleIsOn
                      ? object.styling.reqFilterVisibleIsOn
                      : !styling.reqFilterVisibleIsOn)) && (
                    <div
                      style={{
                        flex: `0 0 ${widthPercentage}%`,
                        maxWidth: `${widthPercentage}%`,
                      }}
                      className="w-full p-0"
                      key={index}
                    >
                      <AppObject
                        className={objectHeight}
                        activated={activated}
                        object={object}
                        row={row}
                        isCreator={isCreator}
                      />
                    </div>
                  )
                );
              })}
            </div>
          ) : (
            // Where the object-components are created and listed.
            // If objectWidth in the object is empty, use the row.objectWidth
            <div
              className="flex flex-row flex-wrap"
              style={{ justifyContent: row.rowJustify }}
            >
              {/* If objectWidth in the object is empty, use the row.objectWidth */}
              {resultArray.map((object, index) => {
                const widthClass =
                  object.objectWidth === "" || row.choicesShareTemplate
                    ? row.objectWidth
                    : object.objectWidth;
                const span = parseColSpan(widthClass);
                let widthPercentage =
                  span !== -1
                    ? (100 / 12) * span
                    : widthMap[widthClass as keyof typeof widthMap];
                if (width <= 500) widthPercentage = 100;
                else if (width <= 1000) widthPercentage = 50;
                return (
                  <div
                    className="w-full p-0"
                    key={index}
                    style={{
                      flex: `0 0 ${widthPercentage}%`,
                      maxWidth: `${widthPercentage}%`,
                    }}
                  >
                    <AppObject
                      className={objectHeight}
                      activated={activated}
                      object={object}
                      row={row}
                      isCreator={isCreator}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      <ObjectList
        open={modal === "appObjectList"}
        onClose={() => setModal("none")}
        row={row}
      />
      <Requirement
        open={modal === "appRequirement"}
        onClose={() => setModal("none")}
        row={row}
      />
      <RowSettings
        open={modal === "appRowSettings"}
        onClose={() => setModal("none")}
        row={row}
      />
      <ImageUpload
        open={modal === "appImageUpload"}
        onClose={() => setModal("none")}
        obj={row}
      />
      <ButtonSettings
        open={modal === "appButtonSettings"}
        onClose={() => setModal("none")}
        row={row}
      />
    </div>
  );
}
