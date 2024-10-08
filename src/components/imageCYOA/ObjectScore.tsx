import { cn } from "@/lib/utils";
import { getImageURL, Object, pi, useAppStore } from "@/store";
import { CSSProperties } from "react";

export default function ObjectScore({ score }: { score: Object["scores"][0] }) {
  const pointTypes = useAppStore((state) => state.app.pointTypes);
  const activated = useAppStore((state) => state.app.activated);
  const styling = useAppStore((state) => state.app.styling);
  const imagePrefix = useAppStore((state) => state.imagePrefix);

  const posOrNeg = pi(score.value) < 0 ? true : false;

  // Checks if the pointype has been avtivated if there is a activatedId in it.
  const isPointtypeActivated = (() => {
    for (const pointType of pointTypes) {
      if (pointType.id == score.id && pointType.activatedId != "")
        return activated.includes(pointType.activatedId);
    }
    return true;
  })();

  const pointType = (() => {
    for (const pointType of pointTypes) {
      if (pointType.id === score.id) {
        return pointType;
      }
    }
    return {
      id: "text",
      name: "Points",
      startingSum: 0,
      activatedId: "",
      afterText: "",
      pointColorsIsOn: false,
    } as (typeof pointTypes)[0];
  })();

  const scoreTextStyle: CSSProperties = {
    fontFamily: styling.scoreText,
    fontSize: styling.scoreTextSize + "%",
    textAlign: styling.scoreTextAlign as CSSProperties["textAlign"],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: pointType
      ? pointType.pointColorsIsOn
        ? posOrNeg
          ? pointType.positiveColor?.hex
          : pointType.negativeColor?.hex
        : styling.scoreTextColor
      : undefined,
  };

  const scoreValue = (() => {
    const value = posOrNeg ? pi(score.value) * -1 : score.value;

    if (pointType?.plussOrMinusAdded) {
      if (
        (posOrNeg && !pointType.plussOrMinusInverted) ||
        (pointType.plussOrMinusInverted && !posOrNeg)
      ) {
        return "+" + value;
      } else {
        return "-" + value;
      }
    }

    return value.toString();
  })();

  return (
    <div className="p-0">
      {/* Preview */}
      {!pointType?.imageSidePlacement &&
      score.showScore &&
      isPointtypeActivated ? (
        <div className="m-0 p-0" style={scoreTextStyle}>
          <div
            className={cn(
              pointType?.imageOnSide
                ? "pl-[3px] pr-[3px]"
                : "pl-[1px] pr-[2px]",
            )}
          >
            {pointType?.iconIsOn &&
              !pointType.imageOnSide &&
              pointType.image && (
                <img
                  className="float-left inline-block"
                  style={{
                    width: pointType.iconWidth + "px",
                    height: pointType.iconHeight + "px",
                  }}
                  src={getImageURL(pointType.image, imagePrefix)}
                />
              )}
          </div>
          <div>
            <p
              className="m-0 p-0"
              dangerouslySetInnerHTML={{
                __html: `${score.beforeText} ${scoreValue} ${score.afterText}`,
              }}
            />
          </div>
          <div className="m-0 p-0" style={scoreTextStyle}>
            <div
              className={cn(
                pointType?.imageOnSide
                  ? "pl-[3px] pr-[3px]"
                  : "pl-[1px] pr-[2px]",
              )}
            >
              {pointType?.iconIsOn &&
                pointType.imageOnSide &&
                pointType.image && (
                  <img
                    className="float-left inline-block"
                    style={{
                      width: pointType.iconWidth + "px",
                      height: pointType.iconHeight + "px",
                    }}
                    src={getImageURL(pointType.image, imagePrefix)}
                  />
                )}
            </div>
          </div>
        </div>
      ) : (
        pointType?.imageSidePlacement &&
        score.showScore &&
        isPointtypeActivated && (
          <div>
            <div className="m-0 p-0" style={scoreTextStyle}>
              <div>
                <p
                  className="m-0 p-0"
                  dangerouslySetInnerHTML={{
                    __html: `${score.beforeText} `,
                  }}
                />
              </div>
              <div
                className={cn(
                  !pointType.imageOnSide
                    ? "pl-[3px] pr-[3px]"
                    : "pl-[1px] pr-[2px]",
                )}
              >
                {pointType.iconIsOn &&
                  !pointType.imageOnSide &&
                  pointType.image && (
                    <img
                      className="float-left inline-block"
                      style={{
                        width: pointType.iconWidth + "px",
                        height: pointType.iconHeight + "px",
                      }}
                      src={getImageURL(pointType.image, imagePrefix)}
                    />
                  )}
              </div>
              <div>
                <p
                  className="m-0 p-0"
                  dangerouslySetInnerHTML={{
                    __html: ` ${scoreValue} `,
                  }}
                />
              </div>
              <div
                className={cn(
                  !pointType.imageOnSide
                    ? "pl-[3px] pr-[3px]"
                    : "pl-[1px] pr-[2px]",
                )}
              >
                {pointType.iconIsOn &&
                  pointType.imageOnSide &&
                  pointType.image && (
                    <img
                      className="float-left inline-block"
                      style={{
                        width: pointType.iconWidth + "px",
                        height: pointType.iconHeight + "px",
                      }}
                      src={getImageURL(pointType.image, imagePrefix)}
                    />
                  )}
              </div>
              <div>
                <p
                  className="m-0 p-0"
                  dangerouslySetInnerHTML={{ __html: score.afterText }}
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
