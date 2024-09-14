import {
  App,
  checkRequireds,
  pi,
  Requireds,
  useAppStore,
  type Object,
} from "@/store";
import { CSSProperties, useEffect, useState } from "react";
// Image Upload
import ImageUpload from "../imageCYOA/row/ImageUpload";
import { useWindowDimensions } from "@/lib/resize";
import DOMPurify from "dompurify";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
// The Score under objects
import ObjectScore from "./ObjectScore";
// The Addon under objects.
import ObjectAddon from "./ObjectAddon";

export default function Object({
  className,
  activated,
  object,
  row,
}: {
  className: string;
  activated: string[];
  object: Object;
  row: App["rows"][0];
}) {
  const [selectedThisManyTimesProp, setSelectedThisManyTimesProp] = useState(
    object.multipleUseVariable ?? 0,
  );
  const [modal, setModal] = useState<"none" | "appImageUpload">("none");

  const pointTypes = useAppStore((state) => state.app.pointTypes);
  const appStyling = useAppStore((state) => state.app.styling);
  const rows = useAppStore((state) => state.app.rows);
  const words = useAppStore((state) => state.app.words);
  const activateObject = useAppStore((state) => state.activateObject);
  const selectedOneLess = useAppStore((state) => state.selectedOneLess);
  const selectedOneMore = useAppStore((state) => state.selectedOneMore);
  const setObjectSelectable = useAppStore((state) => state.setObjectSelectable);
  const multiplyOrDivide = useAppStore((state) => state.multiplyOrDivide);
  const styling: typeof object.styling & Partial<typeof appStyling> =
    object.isPrivateStyling
      ? object.styling
      : row.isPrivateStyling
        ? row.styling
        : appStyling;
  const { width } = useWindowDimensions();

  useEffect(() => {
    const hasRequireds = checkRequireds({ activated, pointTypes }, object);
    if (hasRequireds) return;
    // Turns the object inactive and removes the id from the activated-array.
    if (object.isActive) {
      activateObject(object, row);
      // If the choice is tier-based with multiple.
    } else if (object.isSelectableMultiple) {
      // Will go trough all tiers left to lowest tier.
      for (
        let i = 0;
        i < pi(object.numMultipleTimesPluss) - pi(object.numMultipleTimesMinus);
        i++
      )
        setSelectedThisManyTimesProp(
          selectedOneLess(object) ?? selectedThisManyTimesProp,
        );
    }

    if (object.multiplyPointtypeIsOnCheck || object.dividePointtypeIsOnCheck) {
      multiplyOrDivide(object);
    }

    // Is here to make the activated choice selectable.
    if (object.activateOtherChoice) {
      for (const row of rows) {
        for (const object2 of row.objects) {
          if (object2.id === object.activateThisChoice && object2.isActive)
            setObjectSelectable(object2);
        }
      }
    }
  }, [
    activateObject,
    activated,
    multiplyOrDivide,
    object,
    pointTypes,
    row,
    rows,
    selectedOneLess,
    selectedThisManyTimesProp,
    setObjectSelectable,
  ]);

  // Used on the div that holds the preview of the object.
  const objectBackground = (() => {
    const style: CSSProperties = {};
    // Styles the color of the background, margin and selected color if selected.
    if (!object.isActive) {
      style.backgroundImage = `url("${styling.objectBackgroundImage}")`;
      style.backgroundRepeat = "repeat";
    }
    if (styling.objectBgColorIsOn)
      style.backgroundColor = styling.objectBgColor;
    style.margin = styling.objectMargin + "px";
    if (object.isActive || (object.isImageUpload && object.image.length > 0))
      style.backgroundColor = styling.selFilterBgColor;

    // Border Radius
    const suffix = styling.objectBorderRadiusIsPixels ? "px" : "%";

    if (styling.objectGradientIsOn)
      style.backgroundImage = `linear-gradient(${styling.objectGradient})`;

    if (pi(object.template) === 1 || row.choicesShareTemplate)
      style.borderRadius = `${styling.objectBorderRadiusTopLeft}0${suffix} ${styling.objectBorderRadiusTopRight}0${suffix} ${styling.objectBorderRadiusBottomRight}0${suffix} ${styling.objectBorderRadiusBottomLeft}0${suffix}`;
    else if (pi(object.template) === 2)
      style.borderRadius = `${styling.objectBorderRadiusTopLeft}0${suffix} ${styling.objectBorderRadiusBottomLeft}0${suffix} ${styling.objectBorderRadiusBottomRight}0${suffix} ${styling.objectBorderRadiusTopRight}0${suffix}`;
    else
      style.borderRadius = `${styling.objectBorderRadiusBottomLeft}0${suffix} ${styling.objectBorderRadiusTopLeft}0${suffix} ${styling.objectBorderRadiusTopRight}0${suffix} ${styling.objectBorderRadiusBottomRight}0${suffix}`;

    if (styling.objectOverflowIsOn) style.overflow = "hidden";

    if (styling.objectBorderIsOn)
      style.border = `${styling.objectBorderWidth}px ${styling.objectBorderStyle} ${styling.objectBorderColor}`;

    // Styles here the drop-shadow.
    style.filter = "";
    if (styling.objectDropShadowIsOn)
      style.filter += ` drop-shadow(${styling.objectDropShadowH}px ${styling.objectDropShadowV}px ${styling.objectDropShadowBlur}px ${styling.objectDropShadowColor})`;

    // TODO Make this part more efficient.

    // Needs to check if the object have all of the requireds.
    const hasRequireds = checkRequireds({ activated, pointTypes }, object);

    // If the object is selected.
    if (
      (object.isActive ||
        (object.isSelectableMultiple && pi(object.multipleUseVariable) > 0)) &&
      hasRequireds
    ) {
      if (styling.selFilterBlurIsOn)
        style.filter += ` blur(${styling.selFilterBlur}px)`;
      if (styling.selFilterBrightIsOn)
        style.filter += ` brightness(${styling.selFilterBright}%)`;
      if (styling.selFilterContIsOn)
        style.filter += ` contrast(${styling.selFilterCont}%)`;
      if (styling.selFilterGrayIsOn)
        style.filter += ` grayscale(${styling.selFilterGray}%)`;
      if (styling.selFilterHueIsOn)
        style.filter += ` hue-rotate(${styling.selFilterHue}deg)`;
      if (styling.selFilterInvertIsOn)
        style.filter += ` invert(${styling.selFilterInvert}%)`;
      if (styling.selFilterOpacIsOn)
        style.filter += ` opacity(${styling.selFilterOpac}%)`;
      if (styling.selFilterSaturIsOn)
        style.filter += ` saturate(${styling.selFilterSatur})`;
      if (styling.selFilterSepiaIsOn)
        style.filter += ` sepia(${styling.selFilterSepia}%)`;

      if (styling.objectGradientIsOn)
        style.backgroundImage = `linear-gradient(${styling.objectGradientOnSelect})`;
    } else {
      // If the object does not have alle of the conditions.
      if (!hasRequireds) {
        if (styling.reqFilterBlurIsOn)
          style.filter += ` blur(${styling.reqFilterBlur}px)`;
        if (styling.reqFilterBrightIsOn)
          style.filter += ` brightness(${styling.reqFilterBright}%)`;
        if (styling.reqFilterContIsOn)
          style.filter += ` contrast(${styling.reqFilterCont}%)`;
        if (styling.reqFilterGrayIsOn)
          style.filter += ` grayscale(${styling.reqFilterGray}%)`;
        if (styling.reqFilterHueIsOn)
          style.filter += ` hue-rotate(${styling.reqFilterHue}deg)`;
        if (styling.reqFilterInvertIsOn)
          style.filter += ` invert(${styling.reqFilterInvert}%)`;
        if (styling.reqFilterOpacIsOn)
          style.filter += ` opacity(${styling.reqFilterOpac}%)`;
        if (styling.reqFilterSaturIsOn)
          style.filter += ` saturate(${styling.reqFilterSatur})`;
        if (styling.reqFilterSepiaIsOn)
          style.filter += ` sepia(${styling.reqFilterSepia}%)`;

        if (styling.objectGradientIsOn)
          style.backgroundColor = styling.reqFilterBgColor;
        else style.backgroundColor = styling.objectBgColor;

        if (styling.objectGradientIsOn)
          style.backgroundImage = `linear-gradient(${styling.objectGradientOnReq})`;
      }
    }

    return style;
  })();

  const findRowTitle =
    rows.find((row) => row.objects.includes(object))?.title ?? "";

  const scoreTextStyle: CSSProperties = {
    fontFamily: styling.scoreText,
    fontSize: styling.scoreTextSize + "%",
    textAlign: styling.scoreTextAlign as CSSProperties["textAlign"],
    color: styling.scoreTextColor,
  };

  // Used on the img in the object.
  const objectImageStyle = (() => {
    const style: CSSProperties = {};
    if (object.image === "") return style;
    style.width = styling.objectImageWidth + "%";
    style.marginTop = styling.objectImageMarginTop + "%";
    style.marginBottom = styling.objectImageMarginBottom + "%";

    if (styling.objectImgObjectFillIsOn) {
      style.objectFit =
        styling.objectImgObjectFillStyle as CSSProperties["objectFit"];
      style.height = styling.objectImgObjectFillHeight + "px";
    }

    // Border Radius
    const suffix = styling.objectImgBorderRadiusIsPixels ? "px" : "%";

    if (pi(object.template) === 1 || row.choicesShareTemplate) {
      style.borderRadius = `${styling.objectImgBorderRadiusTopLeft}${suffix} ${styling.objectImgBorderRadiusTopRight}${suffix} ${styling.objectImgBorderRadiusBottomRight}${suffix} ${styling.objectImgBorderRadiusBottomLeft}${suffix}`;
    } else if (pi(object.template) === 2) {
      style.borderRadius = `${styling.objectImgBorderRadiusTopLeft}${suffix} ${styling.objectImgBorderRadiusBottomLeft}${suffix} ${styling.objectImgBorderRadiusBottomRight}${suffix} ${styling.objectImgBorderRadiusTopRight}${suffix}`;
    } else {
      style.borderRadius = `${styling.objectImgBorderRadiusBottomLeft}${suffix} ${styling.objectImgBorderRadiusTopLeft}${suffix} ${styling.objectImgBorderRadiusTopRight}${suffix} ${styling.objectImgBorderRadiusBottomRight}${suffix}`;
    }

    if (styling.objectImgOverflowIsOn) style.overflow = "hidden";

    if (styling.objectImgBorderIsOn)
      style.border = `${styling.objectImgBorderWidth}px ${styling.objectImgBorderStyle} ${styling.objectImgBorderColor}`;

    return style;
  })();

  const replaceObjectTitleText = (() => {
    let newObjectText = object.title;
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

  const objectTitleStyle: CSSProperties = {
    fontFamily: styling.objectTitle,
    fontSize: styling.objectTitleTextSize + "%",
    textAlign: styling.objectTitleAlign as CSSProperties["textAlign"],
    color: styling.objectTitleColor,
  };

  const multiChoiceButtonStype: CSSProperties = {
    color: styling.scoreTextColor,
  };

  const multiChoiceTextStyle: CSSProperties = {
    fontFamily: styling.multiChoiceTextFont,
    color: styling.scoreTextColor,
    fontSize: styling.multiChoiceTextSize + "%",
  };

  /**
   * Collects the title of the required id in the requirements.
   * And shows it when showrequired is true.
   */
  function getChoiceTitle(required: Requireds) {
    if (required.showRequired) {
      if (required.type == "id") {
        for (const row of rows) {
          for (const object of row.objects) {
            if (required.reqId == object.id)
              return `${required.beforeText} ${object.title} ${required.afterText}`;
          }
        }
      } else if (required.type == "points") {
        for (const pointType of pointTypes) {
          if (required.reqId == pointType.id) {
            return `${required.beforeText} ${required.reqPoints} ${pointType.name} ${required.afterText}`;
          }
        }
      } else if (required.type == "or") {
        let listOfOrTitles = "";
        for (const orRequired of required.orRequired) {
          for (const row of rows) {
            for (const object of row.objects) {
              if (orRequired.req == object.id)
                listOfOrTitles += object.title + ", ";
            }
          }
        }

        return `${required.beforeText} ${listOfOrTitles} ${required.afterText}`;
      }
    }
    return "";
  }

  const objectTextStyle: CSSProperties = {
    fontFamily: styling.objectText,
    textAlign: styling.objectTextAlign as CSSProperties["textAlign"],
    fontSize: styling.objectTextTextSize + "%",
    color: styling.objectTextColor,
    padding: styling.objectTextPadding + "px",
  };

  const replaceObjectText = (() => {
    let newObjectText = object.text;
    let isPointType = false;

    // TODO Add point type if it is.

    if (typeof words != "undefined") {
      // Checks if the word is the ID of a point-type.
      for (const word of words) {
        isPointType = false;

        for (const pointType of pointTypes) {
          if (pointType.id == word.id) {
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

  return (
    <div className={className}>
      {/* Preview and templates */}
      {/* If the row is not an info row or is not selectable, make it clickable */}
      {checkRequireds({ activated, pointTypes }, row) && (
        <div
          className="w-full p-0"
          style={objectBackground}
          onClick={() => {
            if (object.isImageUpload) setModal("appImageUpload");
            else if (
              !row.isInfoRow &&
              !object.isNotSelectable &&
              !object.isSelectableMultiple &&
              !object.isButtonObject
            ) {
              activateObject(object, row);
            }
          }}
        >
          {/* Template 1 - Picture on top. */}
          {pi(object.template) === 1 ||
          width < 1000 ||
          row.choicesShareTemplate ? (
            <div className="m-0 w-full">
              {row.resultShowRowTitle && (
                <div
                  style={{
                    marginTop: 0,
                    marginBottom: 0,
                    backgroundImage: `url("${styling.backgroundImage}")`,
                    backgroundColor: styling.backgroundColor,
                    backgroundRepeat: "repeat",
                    marginLeft: !row.isEditModeOn
                      ? styling.rowBodyMarginSides + "%"
                      : "1%",
                    marginRight: !row.isEditModeOn
                      ? styling.rowBodyMarginSides + "%"
                      : "1%",
                  }}
                >
                  <div
                    className="p-0"
                    style={scoreTextStyle}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(findRowTitle),
                    }}
                  />
                </div>
              )}
              {object.imageSourceTooltip !== "" &&
              typeof object.imageSourceTooltip !== "undefined" ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {object.image.length > 0 && (
                        <img style={objectImageStyle} src={object.image} />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>{object.imageSourceTooltip}</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                // If there is no tooltip
                object.image.length > 0 && (
                  <img style={objectImageStyle} src={object.image} />
                )
              )}
              <div>
                <h3
                  style={objectTitleStyle}
                  className="mb-0"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(replaceObjectTitleText),
                  }}
                />
                {/* If the choice can be selected multiple times. */}
                {object.isSelectableMultiple && (
                  <div className="flex w-full flex-row items-center justify-evenly">
                    <Button
                      className="my-[5px]"
                      disabled={
                        !checkRequireds({ activated, pointTypes }, object)
                      }
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() =>
                        setSelectedThisManyTimesProp(
                          selectedOneLess(object) ?? selectedThisManyTimesProp,
                        )
                      }
                      style={multiChoiceButtonStype}
                    >
                      <Minus />
                    </Button>
                    <div className="p-0" style={multiChoiceTextStyle}>
                      {selectedThisManyTimesProp}
                    </div>
                    <Button
                      className="my-[5px]"
                      disabled={
                        !checkRequireds({ activated, pointTypes }, object)
                      }
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() =>
                        setSelectedThisManyTimesProp(
                          selectedOneMore(object) ?? selectedThisManyTimesProp,
                        )
                      }
                      style={multiChoiceButtonStype}
                    >
                      <Plus />
                    </Button>
                  </div>
                )}
                {/* Lists up all of the Scores added to the object. */}
                {object.scores.map((score, index) => (
                  <div className="py-0" key={index}>
                    {score.showScore &&
                      checkRequireds({ activated, pointTypes }, score) && (
                        <ObjectScore score={score} />
                      )}
                  </div>
                ))}
                {/* Will show of the required if showRequired is selected */}
                {object.requireds.map((required, index) => (
                  <div key={index} className="p-0">
                    {required.showRequired && (
                      <div
                        style={scoreTextStyle}
                        className="p-0"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(getChoiceTitle(required)),
                        }}
                      />
                    )}
                  </div>
                ))}
                {/* The text of the object. */}
                {!row.textIsRemoved && object.text !== "" && (
                  <p
                    className="my-0 whitespace-pre-line"
                    style={objectTextStyle}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(replaceObjectText),
                    }}
                  />
                )}
                {/* Lists up the addons that the object holds. */}
                {object.addons.map((addon, index) => (
                  <div key={index} className="py-0">
                    <ObjectAddon addon={addon} row={row} />
                  </div>
                ))}
              </div>
            </div>
          ) : pi(object.template) === 2 && width > 1000 ? (
            // Template 2 - Picture on left side.
            <div className="m-0 grid w-full grid-cols-1 p-0">
              {/* The object choice in the preview. */}
              <div>
                <div className="m-0 p-0">
                  {object.imageSourceTooltip !== "" &&
                  typeof object.imageSourceTooltip !== "undefined" ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {object.image.length > 0 && (
                            <img style={objectImageStyle} src={object.image} />
                          )}
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>{object.imageSourceTooltip}</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    object.image.length > 0 && (
                      <img style={objectImageStyle} src={object.image} />
                    )
                  )}
                </div>
                <div className="p-1">
                  <h3
                    className="mb-0"
                    style={objectTitleStyle}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(replaceObjectTitleText),
                    }}
                  />
                  {/* If the choice can be selected multiple times. */}
                  {object.isSelectableMultiple && (
                    <div className="flex w-full flex-row items-center justify-evenly">
                      <Button
                        className="my-[5px]"
                        disabled={
                          !checkRequireds({ activated, pointTypes }, object)
                        }
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() =>
                          setSelectedThisManyTimesProp(
                            selectedOneLess(object) ??
                              selectedThisManyTimesProp,
                          )
                        }
                        style={multiChoiceButtonStype}
                      >
                        <Minus />
                      </Button>
                      <div className="p-0" style={multiChoiceTextStyle}>
                        {selectedThisManyTimesProp}
                      </div>
                      <Button
                        className="my-[5px]"
                        disabled={
                          !checkRequireds({ activated, pointTypes }, object)
                        }
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() =>
                          setSelectedThisManyTimesProp(
                            selectedOneMore(object) ??
                              selectedThisManyTimesProp,
                          )
                        }
                        style={multiChoiceButtonStype}
                      >
                        <Plus />
                      </Button>
                    </div>
                  )}
                  {/* Lists up all of the Scores added to the object. */}
                  {object.scores.map((score, index) => (
                    <div key={index}>
                      {score.showScore &&
                        checkRequireds({ activated, pointTypes }, score) && (
                          <ObjectScore score={score} />
                        )}
                    </div>
                  ))}
                  {object.requireds.map((required, index) => (
                    <div key={index} className="p-0">
                      {required.showRequired && (
                        <div
                          style={scoreTextStyle}
                          className="p-0"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              getChoiceTitle(required),
                            ),
                          }}
                        />
                      )}
                    </div>
                  ))}
                  {/* The text of the object. */}
                  {object.text !== "" && (
                    <p
                      className="whitespace-pre-line"
                      style={objectTextStyle}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(replaceObjectText),
                      }}
                    />
                  )}
                </div>
              </div>
              {/* Lists up the addons that the object holds. */}
              {object.addons.map((addon, index) => (
                <div key={index} className="p-0">
                  <ObjectAddon addon={addon} row={row} />
                </div>
              ))}
            </div>
          ) : (
            pi(object.template) === 3 &&
            width > 1000 && (
              // Template 3 - Picture on right side.
              <div className="m-0 grid w-full grid-cols-1 p-0">
                <div>
                  <div className="p-1">
                    <h3
                      className="mb-0"
                      style={objectTitleStyle}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(replaceObjectTitleText),
                      }}
                    />
                    {/* If the choice can be selected multiple times. */}
                    {object.isSelectableMultiple && (
                      <div className="flex w-full flex-row items-center justify-evenly">
                        <Button
                          className="my-[5px]"
                          disabled={
                            !checkRequireds({ activated, pointTypes }, object)
                          }
                          variant="ghost"
                          size="icon"
                          type="button"
                          onClick={() =>
                            setSelectedThisManyTimesProp(
                              selectedOneLess(object) ??
                                selectedThisManyTimesProp,
                            )
                          }
                          style={multiChoiceButtonStype}
                        >
                          <Minus />
                        </Button>
                        <div className="p-0" style={multiChoiceTextStyle}>
                          {selectedThisManyTimesProp}
                        </div>
                        <Button
                          className="my-[5px]"
                          disabled={
                            !checkRequireds({ activated, pointTypes }, object)
                          }
                          variant="ghost"
                          size="icon"
                          type="button"
                          onClick={() =>
                            setSelectedThisManyTimesProp(
                              selectedOneMore(object) ??
                                selectedThisManyTimesProp,
                            )
                          }
                          style={multiChoiceButtonStype}
                        >
                          <Plus />
                        </Button>
                      </div>
                    )}
                    {/* Lists up all of the Scores added to the object. */}
                    {object.scores.map((score, index) => (
                      <div key={index}>
                        {score.showScore &&
                          checkRequireds({ activated, pointTypes }, score) && (
                            <ObjectScore score={score} />
                          )}
                      </div>
                    ))}
                    {object.requireds.map((required, index) => (
                      <div key={index} className="p-0">
                        {required.showRequired && (
                          <div
                            style={scoreTextStyle}
                            className="p-0"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                getChoiceTitle(required),
                              ),
                            }}
                          />
                        )}
                      </div>
                    ))}
                    {/* The text of the object. */}
                    {object.text !== "" && (
                      <p
                        className="whitespace-pre-line"
                        style={objectTextStyle}
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(replaceObjectText),
                        }}
                      />
                    )}
                  </div>
                  {/* The object choice in the preview. */}
                  <div className="m-0 p-0">
                    {object.imageSourceTooltip !== "" &&
                    typeof object.imageSourceTooltip !== "undefined" ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            {object.image.length > 0 && (
                              <img
                                style={objectImageStyle}
                                src={object.image}
                              />
                            )}
                          </TooltipTrigger>
                          <TooltipContent>
                            <span>{object.imageSourceTooltip}</span>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      object.image.length > 0 && (
                        <img style={objectImageStyle} src={object.image} />
                      )
                    )}
                  </div>
                </div>
                {/* Lists up the addons that the object holds. */}
                {object.addons.map((addon, index) => (
                  <div key={index} className="pt-0">
                    <ObjectAddon addon={addon} row={row} />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}

      <ImageUpload
        open={modal === "appImageUpload"}
        onClose={() => setModal("none")}
        object={object}
      />
    </div>
  );
}
