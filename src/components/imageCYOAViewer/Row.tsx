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
import { CSSProperties } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import DOMPurify from "dompurify";
import AppObject from "./Object";

export default function Row({
  row,
  type,
}: {
  row: App["rows"][0];
  type: string;
}) {
  const pointTypes = useAppStore((state) => state.app.pointTypes);
  const activated = useAppStore((state) => state.app.activated);
  const rows = useAppStore((state) => state.app.rows);
  const words = useAppStore((state) => state.app.words);
  const appStyling = useAppStore((state) => state.app.styling);
  const chapters = useAppStore((state) => state.app.chapters);
  const imagePrefix = useAppStore((state) => state.imagePrefix);
  const checkIfDeselect = useAppStore((state) => state.checkIfDeselect);
  const handleButtonActivate = useAppStore(
    (state) => state.handleButtonActivate,
  );
  const isEditModeOn = row.isEditModeOn;

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
      {/* Preview and editable objects */}
      {checkIfDeselect(row) && (
        <div>
          {/* The templates of the preview, show if !isEditModeOn and all requireds is selected. */}
          <div
            className={cn(
              row.title !== "" && "bg-repeat",
              row.title !== "" && styling.rowOverflowIsOn && "overflow-hidden",
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
                  (checkRequireds({ activated, pointTypes }, object) ||
                    (object.isPrivateStyling
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
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
