import {
  App,
  checkRequireds,
  getImageURL,
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
import { cn } from "@/lib/utils";

export default function Object({
  className,
  activated,
  object,
  row,
  isCreator,
  isEditModeOn,
}: {
  className: string;
  activated: string[];
  object: Object;
  row: App["rows"][0] | App["backpack"][0];
  isCreator: boolean;
  isEditModeOn: boolean;
}) {
  const [selectedThisManyTimesProp, setSelectedThisManyTimesProp] = useState(
    object.multipleUseVariable ?? 0,
  );
  const [modal, setModal] = useState<"none" | "appImageUpload">("none");

  const pointTypes = useAppStore((state) => state.app.pointTypes);
  const appStyling = useAppStore((state) => state.app.styling);
  const rows = useAppStore((state) => state.app.rows);
  const words = useAppStore((state) => state.app.words);
  const imagePrefix = useAppStore((state) => state.imagePrefix);
  const activateObject = useAppStore((state) => state.activateObject);
  const selectedOneLess = useAppStore((state) => state.selectedOneLess);
  const selectedOneMore = useAppStore((state) => state.selectedOneMore);
  const setObjectSelectable = useAppStore((state) => state.setObjectSelectable);
  const multiplyOrDivide = useAppStore((state) => state.multiplyOrDivide);
  const styling: NonNullable<typeof object.styling> &
    Partial<typeof appStyling> = object.isPrivateStyling
    ? (object.styling ?? (row.isPrivateStyling ? row.styling : appStyling))
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

        if (styling.reqBgColorIsOn)
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
      style.borderRadius = `${styling.objectImgBorderRadiusTopLeft}0${suffix} ${styling.objectImgBorderRadiusTopRight}0${suffix} ${styling.objectImgBorderRadiusBottomRight}0${suffix} ${styling.objectImgBorderRadiusBottomLeft}0${suffix}`;
    } else if (pi(object.template) === 2) {
      style.borderRadius = `${styling.objectImgBorderRadiusTopLeft}0${suffix} ${styling.objectImgBorderRadiusBottomLeft}0${suffix} ${styling.objectImgBorderRadiusBottomRight}0${suffix} ${styling.objectImgBorderRadiusTopRight}0${suffix}`;
    } else {
      style.borderRadius = `${styling.objectImgBorderRadiusBottomLeft}0${suffix} ${styling.objectImgBorderRadiusTopLeft}0${suffix} ${styling.objectImgBorderRadiusTopRight}0${suffix} ${styling.objectImgBorderRadiusBottomRight}0${suffix}`;
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
    <div className={cn("flex", className)}>
      {/* Will only show when the Boolean isEditModeOn is true. */}
      {isCreator && isEditModeOn && (
        <div>
          {/*
      <v-card class="ma-1" width="100%" outlined>
        <!-- v-btn that creates a new required in the object -->

        <v-toolbar v-if="row.isEditModeOn" class="grey lighten-3" dense flat>
          <v-spacer></v-spacer>

          <v-tooltip bottom open-delay="1000">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon @click="moveObjectUp()">mdi-chevron-left</v-icon>
              </v-btn>
            </template>
            <span>Move Left</span>
          </v-tooltip>

          <v-spacer></v-spacer>

          <v-tooltip bottom open-delay="1000">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon @click="deleteObject()">mdi-delete-forever</v-icon>
              </v-btn>
            </template>
            <span>Delete Object</span>
          </v-tooltip>

          <v-spacer></v-spacer>

          <v-tooltip bottom open-delay="1000">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon @click="currentComponent = 'ObjectSettings'">mdi-decagram</v-icon>
              </v-btn>
            </template>
            <span>Object Settings</span>
          </v-tooltip>

          <v-spacer></v-spacer>

          <v-tooltip bottom open-delay="1000">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon @click="cloneObject()">mdi-content-copy</v-icon>
              </v-btn>
            </template>
            <span>Clone Object</span>
          </v-tooltip>

          <v-spacer></v-spacer>

          <v-tooltip bottom open-delay="1000">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon @click="moveObjectDown()">mdi-chevron-right</v-icon>
              </v-btn>
            </template>
            <span>Move Right</span>
          </v-tooltip>

          <v-spacer></v-spacer>
        </v-toolbar>

        <v-col cols="12" class="pa-0">
          <v-text-field type="number" v-if="row.isWeightedRandom && row.isButtonRow && row.buttonRandom"
            placeholder="100" hide-details v-model="object.randomWeight" label="Random Weight" filled></v-text-field>
        </v-col>

        <!-- The  of Image -->
        <v-col cols="12" class="pt-0 px-12">
          <v-col class="px-0 pt-1">
            <v-img @click="currentComponent = 'appImageUpload'" max-height="175" contain :src="object.image"></v-img>
          </v-col>

          <v-btn @click="currentComponent = 'appImageUpload'" style="color: black">Change Image</v-btn>
        </v-col>

        <v-col cols="12" class="pt-0 pb-0">
          <v-textarea hide-details filled v-model="object.text" label="Object Text"></v-textarea>
        </v-col>

        <v-row class="py-0">
          <v-col class="col-md-6 pr-1 pb-2">
            <v-text-field hide-details v-model="object.title" label="Object Title" filled></v-text-field>
          </v-col>

          <v-col class="col-md-6 pl-1 pb-2">
            <v-text-field hide-details v-model="object.id" label="Object Id" filled></v-text-field>
          </v-col>
        </v-row>

        <v-row class="py-0">
          <v-col class="col-md-6 pr-1 pt-1">
            <v-select hide-details :items="templates" v-model="object.template" item-text="text" item-value="value"
              filled label="Template"></v-select>
          </v-col>
          <v-col class="col-md-6 pl-1 pt-1">
            <v-select hide-details :items="objectWidths" v-model="object.objectWidth" item-text="text"
              item-value="value" filled label="Object Width"></v-select>
          </v-col>
        </v-row>

        <v-toolbar v-if="row.isEditModeOn" class="grey lighten-3" dense flat>
          <v-spacer></v-spacer>

          <v-tooltip bottom open-delay="1000">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon @click="createNewScore()">mdi-numeric-9-plus-box</v-icon>
              </v-btn>
            </template>
            <span>Create Score</span>
          </v-tooltip>

          <v-spacer></v-spacer>

          <!-- Create new requirement icon -->
          <v-tooltip bottom open-delay="1000">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon @click="createNewAddon()">mdi-comment-plus</v-icon>
              </v-btn>
            </template>
            <span>Create Addon</span>
          </v-tooltip>

          <v-spacer></v-spacer>

          <!-- Create new requirement icon -->
          <v-tooltip bottom open-delay="1000">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon @click="currentComponent = 'appRequirement'">mdi-key-plus</v-icon>
              </v-btn>
            </template>
            <span>Create Requirement</span>
          </v-tooltip>

          <v-spacer></v-spacer>

          <!-- Create new requirement icon -->
          <v-tooltip bottom open-delay="1000">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon @click="addObjectToGroup">mdi-key</v-icon>
              </v-btn>
            </template>
            <span>Add To Group</span>
          </v-tooltip>

          <v-spacer></v-spacer>
        </v-toolbar>

        <v-expansion-panels multiple accordion>
          <v-expansion-panel v-if="object.scores.length > 0">
            <v-expansion-panel-header
              v-html="$sanitize('Scores: ' + object.scores.length, sanitizeArg)"></v-expansion-panel-header>
            <v-expansion-panel-content>
              <!-- Lists up the scores that the object holds. -->
              <v-col cols="12" class="pa-0" v-for="(score, index) in object.scores" :key="score.index">
                <ObjectScore :isEditModeOn="isEditModeOn" :app="app" :score="score" @scoreWasChanged="score = $event">
                </ObjectScore>

                <v-row class="pa-0">
                  <v-col cols="6" class="pa-0 d-flex justify-center">
                    <v-checkbox v-model="score.showScore" label="Show Score?"
                      class="justify-center shrink mr-2 mt-1"></v-checkbox>
                  </v-col>
                  <v-col cols="6" class="pt-1">
                    <v-btn @click="deleteEvent(index, object.scores)" style="color: black">Delete</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel v-if="object.addons.length > 0">
            <v-expansion-panel-header
              v-html="$sanitize('Addons: ' + object.addons.length, sanitizeArg)"></v-expansion-panel-header>
            <v-expansion-panel-content>
              <!-- Lists up the addons that the object holds. -->
              <v-col cols="12" class="pa-0" v-for="(addon, index) in object.addons" :key="addon.index">
                <ObjectAddon :isEditModeOn="isEditModeOn" :addon="addon" @addonWasChanged="addon = $event">
                </ObjectAddon>
                <v-btn @click="deleteEvent(index, object.addons)" style="color: black">Delete</v-btn>
              </v-col>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel v-if="object.requireds.length > 0">
            <v-expansion-panel-header v-html="$sanitize(
              'Requirements: ' + object.requireds.length,
              sanitizeArg
            )
              "></v-expansion-panel-header>
            <v-expansion-panel-content>
              <!-- Shows the requirements, allows the user to delete or change its id -->
              <v-row class="pa-0">
                <v-col :cols="typeof required.requireds !== 'undefined' &&
                  required.requireds.length > 0
                  ? '12'
                  : '6'
                  " class="pa-2" v-for="(required, index) in object.requireds" :key="required.index">
                  <ObjectRequirement :isEditModeOn="isEditModeOn" :required="required"
                    @requiredWasChanged="required = $event">
                  </ObjectRequirement>

                  <v-btn @click="deleteEvent(index, object.requireds)" style="color: black">Delete</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel v-if="
            typeof object.groups !== 'undefined' && object.groups.length > 0
          ">
            <v-expansion-panel-header v-html="$sanitize(
              'Groups: ' +
              (typeof object.groups !== 'undefined'
                ? object.groups.length
                : ''),
              sanitizeArg
            )
              "></v-expansion-panel-header>
            <v-expansion-panel-content>
              <!-- Shows the requirements, allows the user to delete or change its id -->
              <v-row class="pa-0">
                <v-col cols="6" class="pa-2" v-for="(group, index) in object.groups" :key="group.index">
                  <v-card>
                    <v-select hide-details :items="app.groups" v-model="group.id" item-text="name" item-value="id"
                      filled label="Group Id"></v-select>

                    <v-btn @click="deleteEvent(index, object.groups)" style="color: black">Delete</v-btn>
                  </v-card>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header v-html="'Functions: '"></v-expansion-panel-header>
            <v-expansion-panel-content>
              <!-- Shows the requirements, allows the user to delete or change its id -->

              <v-checkbox class="mt-n2" hide-details v-model="object.cleanACtivatedOnSelect"
                label="Selecting this choice will de-select all other choices"></v-checkbox>

              <!-- Where the elements controlling multiple select choices is -->
              <v-checkbox hide-details v-model="object.isSelectableMultiple"
                label="The choice can be selected multiple times"></v-checkbox>
              <v-checkbox hide-details v-if="object.isSelectableMultiple" v-model="object.isMultipleUseVariable"
                label="Press this to use a simple variable instead of a Point-type?"></v-checkbox>
              <p v-if="
                object.isSelectableMultiple && !object.isMultipleUseVariable
              ">
                The point type used here should only be used for this choice,
                and it can be hidden by placing something in 'Id needed to
                activate' in Features -> Manage Points.
              </p>
              <v-select class="pa-1" hide-details v-if="
                object.isSelectableMultiple && !object.isMultipleUseVariable
              " :items="app.pointTypes" v-model="object.multipleScoreId" item-text="name" item-value="id" filled
                label="Point Type that will be used"></v-select>
              <v-text-field hide-details type="number" v-if="object.isSelectableMultiple"
                label="Number where the minus will stop working" v-model="object.numMultipleTimesMinus"
                filled></v-text-field>
              <v-text-field hide-details type="number" v-if="object.isSelectableMultiple"
                label="Number where the pluss will stop working" v-model="object.numMultipleTimesPluss"
                filled></v-text-field>

              <v-checkbox hide-details v-model="object.isNotSelectable"
                label="Selecting this choice will be impossible"></v-checkbox>

              <v-checkbox hide-details v-model="object.activateOtherChoice"
                label="Forces another choice active:"></v-checkbox>
              <v-col v-if="object.activateOtherChoice" class="py-0">Works badly if multiple of these have the same ID,
                or if the
                target has requirements attached. You can use comma to activate
                multiple (ID,ID,ID).</v-col>

              <v-text-field hide-details v-if="object.activateOtherChoice"
                label="Id of the choice that will be activated" v-model="object.activateThisChoice"
                filled></v-text-field>

              <v-checkbox hide-details v-model="object.deactivateOtherChoice"
                label="Will make another choice unselected:"></v-checkbox>

              <v-col v-if="object.deactivateOtherChoice" class="py-0">Will be useful if the target has scores with
                requirements,
                use
                a Group Id to turn of multiple. You can use comma to deactivate
                multiple (ID,ID,ID).</v-col>

              <v-text-field hide-details v-if="object.deactivateOtherChoice"
                label="Id of the choice that will be deactivated" v-model="object.deactivateThisChoice"
                filled></v-text-field>

              <!-- Muliply Points -->
              <v-checkbox hide-details v-model="object.multiplyPointtypeIsOn"
                label="Multiply Points when activated:"></v-checkbox>
              <v-col v-if="object.multiplyPointtypeIsOn" class="pb-0">Not to be used on choices with scores. Wont work
                if the
                Allowed
                Choices on the row is bigger than 0.</v-col>
              <v-select class="pa-1" hide-details v-if="object.multiplyPointtypeIsOn" :items="app.pointTypes"
                v-model="object.pointTypeToMultiply" item-text="name" item-value="id" filled
                label="Point-Type to multiply "></v-select>

              <v-text-field class="pa-1" hide-details v-if="
                object.multiplyPointtypeIsOn && !object.multiplyPointtypeIsId
              " label="Multiplied by X" v-model="object.multiplyWithThis" filled></v-text-field>

              <v-select class="pa-1" hide-details v-if="
                object.multiplyPointtypeIsOn && object.multiplyPointtypeIsId
              " :items="app.pointTypes" v-model="object.multiplyWithThis" item-text="name" item-value="id" filled
                label="Multiplied with this Point-Type"></v-select>

              <v-checkbox class="mt-0" hide-details v-if="object.multiplyPointtypeIsOn"
                v-model="object.multiplyPointtypeIsId" label="Is point-type id, multiplies by the sum."></v-checkbox>

              <!-- Divide Points -->
              <v-checkbox hide-details v-model="object.dividePointtypeIsOn"
                label="Divide Points when activated:"></v-checkbox>

              <v-select class="pa-1" hide-details v-if="object.dividePointtypeIsOn" :items="app.pointTypes"
                v-model="object.pointTypeToDivide" item-text="name" item-value="id" filled
                label="Point Type"></v-select>

              <v-text-field class="pa-1" hide-details type="number" v-if="object.dividePointtypeIsOn"
                label="Divided by X" v-model="object.divideWithThis" filled></v-text-field>

              <v-checkbox hide-details v-model="object.textfieldIsOn"
                label="Word will be changed to something else at select."></v-checkbox>

              <v-select class="pa-1" hide-details v-if="object.textfieldIsOn" :items="app.words"
                v-model="object.idOfTheTextfieldWord" item-text="id" item-value="id" filled
                label="Id of word that will change"></v-select>

              <v-text-field class="pa-1" hide-details v-if="object.textfieldIsOn"
                label="Will be changed to this on select" v-model="object.wordChangeSelect" filled></v-text-field>

              <v-text-field class="pa-1" hide-details v-if="object.textfieldIsOn"
                label="Will be changed to this on deselect" v-model="object.wordChangeDeselect" filled></v-text-field>

              <v-checkbox hide-details v-model="object.isImageUpload"
                label="Player can upload a picture by pressing this choice."></v-checkbox>

              <v-checkbox hide-details v-model="object.addToAllowChoice"
                label="Adds or takes away a rows Allowed Choices."></v-checkbox>

              <v-select class="pa-1" hide-details v-if="object.addToAllowChoice" :items="this.app.rows"
                v-model="object.idOfAllowChoice" item-text="id" item-value="id" filled
                label="Id of the row whose Allowed Choices will be changed.">
                <template slot="selection" slot-scope="data">
                  <!-- HTML that describe how select should render selected items -->
                  {{ data.item.id }} - {{ data.item.title }}
                </template>
                <template slot="item" slot-scope="data">
                  <!-- HTML that describe how select should render selected items -->
                  {{ data.item.id }} - {{ data.item.title }}
                </template>
              </v-select>

              <v-text-field class="pa-1" hide-details type="number" v-if="object.addToAllowChoice"
                label="This numbr will be added to the Allowed Choices on select."
                v-model.number="object.numbAddToAllowChoice" filled></v-text-field>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>*/}
        </div>
      )}

      {/* Preview and templates */}
      {/* If the row is not an info row or is not selectable, make it clickable */}
      {/* Added the object.isImageUpload */}
      {(!isCreator || !isEditModeOn) &&
        checkRequireds({ activated, pointTypes }, row) && (
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
                      marginLeft: !isEditModeOn
                        ? styling.rowBodyMarginSides + "%"
                        : "1%",
                      marginRight: !isEditModeOn
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
                          <img
                            className="inline-block"
                            style={objectImageStyle}
                            src={getImageURL(object.image, imagePrefix)}
                          />
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
                    <img
                      className="inline-block"
                      style={objectImageStyle}
                      src={getImageURL(object.image, imagePrefix)}
                    />
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
                            __html: DOMPurify.sanitize(
                              getChoiceTitle(required),
                            ),
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
                  {/* TODO change word with text field.
                      {object.textfieldIsOn && (
                        <div className="flex flex-col gap-y-1">
                          <Label for="random-weight-input">Random Weight</Label>
                          <Input
                            id="random-weight-input"
                            type="number"
                            placeholder="100"
                            // TODO Change word with text field.
                            onChange={(e) => changeTheWord(e.target.value)}
                            value={object.randomWeight}
                          />
                        </div>
                      )}
                  */}
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
              <div className="m-0 grid w-full grid-cols-2 p-0">
                {/* The object choice in the preview. */}
                <div className="m-0 p-0">
                  {object.imageSourceTooltip !== "" &&
                  typeof object.imageSourceTooltip !== "undefined" ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {object.image.length > 0 && (
                            <img
                              className="inline-block"
                              style={objectImageStyle}
                              src={getImageURL(object.image, imagePrefix)}
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
                      <img
                        className="inline-block"
                        style={objectImageStyle}
                        src={getImageURL(object.image, imagePrefix)}
                      />
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
                {/* Lists up the addons that the object holds. */}
                {object.addons.map((addon, index) => (
                  <div key={index} className="col-span-2 p-0">
                    <ObjectAddon addon={addon} row={row} />
                  </div>
                ))}
              </div>
            ) : (
              pi(object.template) === 3 &&
              width > 1000 && (
                // Template 3 - Picture on right side.
                <div className="m-0 grid w-full grid-cols-2 p-0">
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
                                className="inline-block"
                                style={objectImageStyle}
                                src={getImageURL(object.image, imagePrefix)}
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
                        <img
                          className="inline-block"
                          style={objectImageStyle}
                          src={getImageURL(object.image, imagePrefix)}
                        />
                      )
                    )}
                  </div>
                  {/* Lists up the addons that the object holds. */}
                  {object.addons.map((addon, index) => (
                    <div key={index} className="col-span-2 pt-0">
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
        obj={object}
      />
    </div>
  );
}
