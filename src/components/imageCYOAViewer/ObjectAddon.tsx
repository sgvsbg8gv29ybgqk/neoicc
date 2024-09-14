import { App, checkRequireds, getImageURL, Object, useAppStore } from "@/store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import DOMPurify from "dompurify";
import { CSSProperties } from "react";

export default function ObjectAddon({
  addon,
  row,
}: {
  addon: Object["addons"][0];
  row: App["rows"][0];
}) {
  const activated = useAppStore((state) => state.app.activated);
  const pointTypes = useAppStore((state) => state.app.pointTypes);
  const appStyling = useAppStore((state) => state.app.styling);
  const words = useAppStore((state) => state.app.words);
  const imagePrefix = useAppStore((state) => state.imagePrefix);
  const styling: typeof row.styling & Partial<typeof appStyling> =
    row.isPrivateStyling ? row.styling : appStyling;

  const replaceAddonTitle = (() => {
    let newObjectText = addon.title;
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

  const replaceAddonText = (() => {
    let newObjectText = addon.text;
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

  // Preview
  if (!checkRequireds({ activated, pointTypes }, addon)) return null;

  const objectImgBorderSuffix = styling.objectImgBorderRadiusIsPixels
    ? "px"
    : "%";
  const objectImageStyle: CSSProperties = {
    width: styling.objectImageWidth + "%",
    marginTop: styling.objectImageMarginTop + "%",
    marginBottom: styling.objectImageMarginBottom + "%",
    borderRadius: `${styling.objectImgBorderRadiusTopLeft}0${objectImgBorderSuffix} ${styling.objectImgBorderRadiusTopRight}0${objectImgBorderSuffix} ${styling.objectImgBorderRadiusBottomRight}0${objectImgBorderSuffix} ${styling.objectImgBorderRadiusBottomLeft}0${objectImgBorderSuffix}`,
    overflow: styling.objectImgOverflowIsOn ? "hidden" : undefined,
    border: styling.objectImgBorderIsOn
      ? `${styling.objectImgBorderWidth}0px ${styling.objectImgBorderStyle} ${styling.objectImgBorderColor}`
      : undefined,
  };

  return (
    <div className="m-0 w-full">
      {addon.imageSourceTooltip !== "" &&
      typeof addon.imageSourceTooltip !== "undefined" ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <img
                style={objectImageStyle}
                src={getImageURL(addon.image, imagePrefix)}
              />
            </TooltipTrigger>
            <TooltipContent>
              <span>{addon.imageSourceTooltip}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        // If there is no tooltip
        <img
          style={objectImageStyle}
          src={getImageURL(addon.image, imagePrefix)}
        />
      )}

      <div>
        {addon.title !== "" && (
          <h4
            style={{
              fontFamily: styling.addonTitle,
              fontSize: styling.addonTitleTextSize + "%",
              textAlign: styling.addonTitleAlign as CSSProperties["textAlign"],
              color: styling.addonTitleColor,
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(replaceAddonTitle),
            }}
          />
        )}
        <p
          style={{
            fontFamily: styling.addonText,
            fontSize: styling.addonTextTextSize + "%",
            textAlign: styling.addonTextAlign as CSSProperties["textAlign"],
            color: styling.addonTextColor,
          }}
          className="whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(replaceAddonText),
          }}
        />
      </div>
    </div>
  );
}
