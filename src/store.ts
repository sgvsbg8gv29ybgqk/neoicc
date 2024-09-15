import { isDraft, original } from "immer";
import { toast } from "sonner";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Styling = {
  // Font for the text.
  rowTitle: string; // The font for the row-titles.
  rowText: string; // The font for the row-under-text.
  objectTitle: string; // The font for the object-titles.
  objectText: string; // The font for the object-under-text.
  addonTitle: string; // The font for the object-titles.
  addonText: string; // The font for the object-under-text.

  // Size for the text.
  rowTitleTextSize: number | string;
  rowTextTextSize: number | string;
  objectTitleTextSize: number | string;
  objectTextTextSize: number | string;
  addonTitleTextSize: number | string;
  addonTextTextSize: number | string;

  barTextColor: string;
  barBackgroundColor: string;
  barTextPadding: number | string;
  barTextMargin: number | string;
  barTextFont: string;
  barTextSize: number | string;
  barPadding: number | string;
  barMargin: number | string;

  // Colors for the text.
  rowTitleColor: string;
  rowTextColor: string;
  objectTitleColor: string;
  objectTextColor: string;
  addonTitleColor: string;
  addonTextColor: string;
  objectHeight: boolean;

  rowTitleAlign: string;
  rowTextAlign: string;
  objectTitleAlign: string;
  objectTextAlign: string;
  addonTitleAlign: string;
  addonTextAlign: string;

  // Background image and color.
  backgroundImage: string;
  rowBackgroundImage: string;
  objectBackgroundImage: string;
  backgroundColor: string;
  objectBgColor: string;
  rowBgColor: string;

  // Boolean that says if the row or object-color will be viewed.
  rowBgColorIsOn: boolean;
  objectBgColorIsOn: boolean;

  // Image radius and width
  objectImageWidth: number | string;
  rowImageWidth: number | string;

  // Margin and padding
  objectMargin: number | string;
  rowMargin: number | string;
  rowTextPaddingY: number | string;
  rowTextPaddingX: number | string;
  objectTextPadding: number | string;

  rowBodyMarginTop: number | string;
  rowBodyMarginBottom: number | string;
  rowBodyMarginSides: number | string;

  // Style Drop Shadow Object
  objectDropShadowH: number | string;
  objectDropShadowV: number | string;
  objectDropShadowSpread: number | string;
  objectDropShadowBlur: number | string;
  objectDropShadowColor: string;
  objectDropShadowIsOn: boolean;

  // Style Drop Shadow Row
  rowDropShadowH: number;
  rowDropShadowV: number;
  rowDropShadowSpread: number;
  rowDropShadowBlur: number | string;
  rowDropShadowColor: string;
  rowDropShadowIsOn: boolean;

  // Selected Filter
  selFilterBlurIsOn: boolean;
  selFilterBlur: number | string;
  selFilterBrightIsOn: boolean;
  selFilterBright: number | string;
  selFilterContIsOn: boolean;
  selFilterCont: number;
  selFilterGrayIsOn: boolean;
  selFilterGray: number;
  selFilterHueIsOn: boolean;
  selFilterHue: number | string;
  selFilterInvertIsOn: boolean;
  selFilterInvert: number | string;
  selFilterOpacIsOn: boolean;
  selFilterOpac: number | string;
  selFilterSaturIsOn: boolean;
  selFilterSatur: number;
  selFilterSepiaIsOn: boolean;
  selFilterSepia: number;
  selBgColorIsOn: boolean;
  selFilterBgColor: string;

  // Required Filter
  reqFilterBlurIsOn: boolean;
  reqFilterBlur: number;
  reqFilterBrightIsOn: boolean;
  reqFilterBright: number | string;
  reqFilterContIsOn: boolean;
  reqFilterCont: number | string;
  reqFilterGrayIsOn: boolean;
  reqFilterGray: number | string;
  reqFilterHueIsOn: boolean;
  reqFilterHue: number | string;
  reqFilterInvertIsOn: boolean;
  reqFilterInvert: number;
  reqFilterOpacIsOn: boolean;
  reqFilterOpac: number | string;
  reqFilterSaturIsOn: boolean;
  reqFilterSatur: number | string;
  reqFilterSepiaIsOn: boolean;
  reqFilterSepia: number | string;
  reqBgColorIsOn: boolean;
  reqFilterBgColor: string;
  reqFilterVisibleIsOn: boolean;

  objectDesignIsAdvanced?: boolean;
  rowDesignIsAdvanced?: boolean;
  rowImageMarginBottom?: number | string;
  rowImgOverflowIsOn?: boolean;
  barPointPos?: Colors;
  barPointNeg?: Colors;
  objectGradientIsOn?: boolean;
  objectGradient?: string;
  rowGradientIsOn?: boolean;
  rowGradient?: string;
  rowImageBorderRadius?: number;
  objectImageBorderRadius?: number;
  multiChoiceTextSize?: number | string;
  multiChoiceTextFont?: string;
  objectImgObjectFillIsOn?: boolean;
  objectImgObjectFillStyle?: string;
  objectImgOverflowIsOn?: boolean;
  isBackgroundRepeat?: boolean;
  barIconColor?: string;
  selFilterBorderColor?: string;
  selFilterCTitleColor?: string;
  selFilterCTextColor?: string;
  selFilterATitleColor?: string;
  selFilterATextColor?: string;
  reqFilterBorderColor?: string;
  reqFilterCTitleColor?: string;
  reqFilterCTextColor?: string;
  reqFilterATitleColor?: string;
  reqFilterATextColor?: string;
  rowBorderImage?: string;
  objectBorderImage?: string;
  objectGradientOnSelect?: string;
  objectGradientOnReq?: string;
  objectImgObjectFillHeight?: number | string;
};

type Colors = {
  alpha: number;
  hex: string;
  hexa: string;
  hsla: {
    h: number;
    s: number;
    l: number;
    a: number;
  };
  hsva: {
    h: number;
    s: number;
    v: number;
    a: number;
  };
  hue: number;
  rgba: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
};

export type Object = {
  id: string;
  title: string;
  text: string;
  image: string;
  template: number | string;
  objectWidth: string;
  isActive: boolean | number;
  // "isVisible": {"type": "boolean"},
  multipleUseVariable?: number;
  // "selectedThisManyTimesProp": {"type": "integer"},
  defaultAspectWidth: number | string;
  defaultAspectHeight: number | string;
  requireds: Requireds[];
  addons: {
    // "id": {"type": "string"},
    title: string;
    text: string;
    // "template": {"type": "string"},
    image: string;
    requireds: Requireds[];
    defaultAspectWidth?: number | string;
    defaultAspectHeight?: number | string;
    imageSourceTooltip?: string;
    // "id",
    // "title",
    // "text",
    // "template",
    // "image",
    // "requireds",
  }[];
  scores: {
    id: string;
    value: string | number;
    // "type": {"type": "string"},
    requireds: Requireds[];
    beforeText: string;
    afterText: string;
    showScore: boolean;
    isActive?: boolean;
    // "setValue": {"type": "boolean"},
    // "discountIsOn": {"type": "boolean"},
    // "isRandom": {"type": "boolean"},
    // "minValue": int_string,
    // "maxValue": int_string,
    // "id",
    // "value",
    // "type",
    // "requireds",
    // "beforeText",
    // "afterText",
    // "showScore",
  }[];
  groups: { id: string }[];
  // "imageIsUrl": {"type": "boolean"},
  deactivateOtherChoice?: boolean;
  deactivateThisChoice?: string;
  activateOtherChoice?: boolean;
  activateThisChoice?: string;
  multiplyPointtypeIsOn?: boolean;
  multiplyPointtypeIsOnCheck?: boolean;
  pointTypeToMultiply?: string;
  multiplyPointtypeIsId?: boolean;
  multiplyWithThis?: number | string;
  startingSumAtMultiply?: number;
  multipleScoreId?: string;
  numMultipleTimesMinus?: number | string;
  numMultipleTimesPluss?: number | string;
  isImageUpload?: boolean;
  textfieldIsOn?: boolean;
  isNotSelectable?: boolean;
  addToAllowChoice?: boolean;
  idOfAllowChoice?: string;
  numbAddToAllowChoice?: number;
  dividePointtypeIsOn?: boolean;
  dividePointtypeIsOnCheck?: boolean;
  pointTypeToDivide?: string;
  divideWithThis?: number | string;
  // "selectFunctions": {"type": "boolean"},
  // "selectOnce": {"type": "boolean"},
  isSelectableMultiple?: boolean;
  isMultipleUseVariable?: boolean;
  cleanACtivatedOnSelect?: boolean;
  isPrivateStyling?: boolean;
  styling: Styling;
  // "currentChoices": {"type": ["integer", "null"]},
  // "forcedActivated": {"type": "boolean"},
  // "initMultipleTimesMinus": int_string,
  // "imageLink": {"type": "string"},
  idOfTheTextfieldWord?: string;
  wordChangeSelect?: string;
  wordChangeDeselect?: string;
  randomWeight?: number | string;
  isButtonObject?: boolean;
  imageSourceTooltip?: string;
  // "id",
  // "title",
  // "text",
  // "image",
  // "template",
  // "objectWidth",
  // "isActive",
  // "isVisible",
  // "defaultAspectWidth",
  // "defaultAspectHeight",
  // "requireds",
  // "addons",
  // "scores",
  // "groups",
};

export type App = {
  isEditModeOnAll: boolean; // If the editmode is open.
  isStyleOpen: boolean; // If the style is open.
  isPointsOpen: boolean; // If the points is open.
  isChoicesOpen: boolean; // If the choice is open.
  isDesignOpen: boolean;
  isViewerVersion: boolean;
  backpack: {
    // "id": {"type": "string", "description": "Row Id"},
    title: string;
    titleText: string;
    objectWidth: string;
    image: string;
    template: string;
    isButtonRow: boolean;
    buttonType: boolean;
    buttonId: string;
    buttonText: string;
    buttonRandom: boolean;
    buttonRandomNumber: number;
    isResultRow: boolean;
    resultGroupId: string;
    isInfoRow: boolean;
    isPrivateStyling: boolean;
    defaultAspectWidth: number | string;
    defaultAspectHeight: number | string;
    allowedChoices: number;
    currentChoices: number;
    requireds: Requireds[];
    isEditModeOn: boolean;
    // "isRequirementOpen": {
    //     "type": "boolean",
    //     "description": "doesnt seem to be used",
    // },
    objects: Object[];
    styling: Styling;
    textIsRemoved?: boolean;
    rowJustify?: string;
    resultShowRowTitle?: boolean;
    choicesShareTemplate?: boolean;
    deselectChoices?: boolean;
    // "width": {
    //     "type": "boolean",
    //     "description": "Half of the screen?",
    // },
    imageSourceTooltip?: string;
    onlyIfNoChoices?: boolean;
    isWeightedRandom?: boolean;
    onlyUnselectedChoices?: boolean;
    // "id",
    // "title",
    // "titleText",
    // "objectWidth",
    // "image",
    // "template",
    // "isButtonRow",
    // "buttonType",
    // "buttonId",
    // "buttonText",
    // "buttonRandom",
    // "buttonRandomNumber",
    // "isResultRow",
    // "resultGroupId",
    // "isInfoRow",
    // "isPrivateStyling",
    // "defaultAspectWidth",
    // "defaultAspectHeight",
    // "allowedChoices",
    // "currentChoices",
    // "requireds",
    // "isEditModeOn",
    // "isRequirementOpen",
    // "objects",
    // "styling",
  }[];
  words: { id: string; replaceText: string }[];
  groups: {
    id: string;
    rowType?: string;
    name: string;
    elements: {
      id: string;
    }[];
  }[];
  chapters: {
    pages: { app: App; children: App["chapters"][0]["pages"] }[];
  }[];
  activated: string[]; // The array that holds the id's of the selected objects.
  rows: {
    id: string;
    title: string;
    titleText: string;
    objectWidth: string;
    image: string;
    template: string;
    isButtonRow: boolean;
    buttonType: boolean;
    buttonId: string;
    buttonText: string;
    buttonRandom: boolean;
    buttonRandomNumber: number;
    isResultRow: boolean;
    resultGroupId: string | null;
    isInfoRow: boolean;
    isPrivateStyling: boolean;
    defaultAspectWidth: number | string;
    defaultAspectHeight: number | string;
    allowedChoices: number | string;
    currentChoices: number;
    requireds: Requireds[];
    isEditModeOn: boolean;
    // "isRequirementOpen": {"type": "boolean"},
    objects: Object[];
    styling: Styling;
    rowJustify?: string;
    width?: boolean;
    deselectChoices?: boolean;
    resultShowRowTitle?: boolean;
    allowedChoicesChange: number;
    // "buttonTypeRadio": {"type": "string"},
    onlyUnselectedChoices?: boolean;
    // "imageIsUrl": {"type": "boolean"},
    imageSourceTooltip?: string;
    onlyIfNoChoices?: boolean;
    isWeightedRandom?: boolean;
    choicesShareTemplate?: boolean;
    textIsRemoved?: boolean;
    // "id",
    // "title",
    // "titleText",
    // "objectWidth",
    // "image",
    // "template",
    // "isButtonRow",
    // "buttonType",
    // "buttonId",
    // "buttonText",
    // "buttonRandom",
    // "buttonRandomNumber",
    // "isResultRow",
    // "resultGroupId",
    // "isInfoRow",
    // "isPrivateStyling",
    // "defaultAspectWidth",
    // "defaultAspectHeight",
    // "allowedChoices",
    // "currentChoices",
    // "requireds",
    // "isEditModeOn",
    // "isRequirementOpen",
    // "objects",
    // "styling",
  }[]; // The rows that the user have been created.
  pointTypes: {
    id: string;
    name: string;
    startingSum: number | string;
    activatedId: string;
    afterText: string;
    beforeText: string;
    belowZeroNotAllowed?: boolean;
    iconIsOn?: boolean;
    pointColorsIsOn?: boolean;
    positiveColor?: Colors;
    negativeColor?: Colors;
    plussOrMinusAdded?: boolean;
    plussOrMinusInverted?: boolean;
    image?: string;
    // "initValue": {"type": "integer"},
    imageSidePlacement?: boolean;
    imageOnSide?: boolean;
    iconWidth?: number | string;
    iconHeight?: number | string;
    // "id",
    // "name",
    // "startingSum",
    // "activatedId",
    // "afterText",
    // "beforeText",
  }[]; // The pointtypes that the user have created.
  variables: { id: string; isTrue: boolean }[]; // The variables that the user have created.

  // The defaults that will fill the various text boxes.
  defaultRowTitle: string;
  defaultRowText: string;
  defaultChoiceTitle: string;
  defaultChoiceText: string;
  defaultBeforePoint: string;
  defaultAfterPoint: string;
  defaultBeforeReq: string;
  defaultAfterReq: string;
  defaultAddonTitle: string;
  defaultAddonText: string;

  // The styling that has to be done in the row.
  styling: Styling & {
    scoreText: string;
    scoreTextSize: number | string;
    scoreTextColor: string;
    scoreTextAlign: string;

    rowButtonXPadding: number;
    rowButtonYPadding: number;

    objectImageMarginTop: number | string;
    objectImageMarginBottom: number | string;
    rowImageMarginTop: number | string;

    // Border radius object, and border
    objectBorderRadiusTopLeft: number;
    objectBorderRadiusTopRight: number;
    objectBorderRadiusBottomRight: number;
    objectBorderRadiusBottomLeft: number;
    objectBorderRadiusIsPixels: boolean;
    objectOverflowIsOn?: boolean;

    objectBorderIsOn: boolean;
    objectBorderColor: string;
    objectBorderStyle: string;
    objectBorderWidth: number;

    // Border radius object image, and border
    objectImgBorderRadiusTopLeft: number;
    objectImgBorderRadiusTopRight: number;
    objectImgBorderRadiusBottomRight: number;
    objectImgBorderRadiusBottomLeft: number;
    objectImgBorderRadiusIsPixels: boolean;

    objectImgBorderIsOn: boolean;
    objectImgBorderColor: string;
    objectImgBorderStyle: string;
    objectImgBorderWidth: number;

    // Border radius row image, and border
    rowImgBorderRadiusTopLeft: number;
    rowImgBorderRadiusTopRight: number;
    rowImgBorderRadiusBottomRight: number;
    rowImgBorderRadiusBottomLeft: number;
    rowImgBorderRadiusIsPixels: boolean;

    rowImgBorderIsOn: boolean;
    rowImgBorderColor: string;
    rowImgBorderStyle: string;
    rowImgBorderWidth: number;

    rowBorderIsOn: boolean;
    rowBorderColor: string;
    rowBorderStyle: string;
    rowBorderWidth: number;

    // Border radius row, and border
    rowBorderRadiusTopLeft: number;
    rowBorderRadiusTopRight: number;
    rowBorderRadiusBottomRight: number;
    rowBorderRadiusBottomLeft: number;
    rowBorderRadiusIsPixels: boolean;
    rowOverflowIsOn: boolean;

    backPackWidth: number;
  };
  importedChoicesIsOpen?: boolean;
};

const defaultApp = {
  // If an object is activated
  isEditModeOnAll: true, // If the editmode is open.
  isStyleOpen: false, // If the style is open.
  isPointsOpen: false, // If the points is open.
  isChoicesOpen: false, // If the choice is open.
  isDesignOpen: false,
  isViewerVersion: false,
  backpack: [],
  words: [],
  groups: [],
  chapters: [],
  activated: [], // The array that holds the id's of the selected objects.
  rows: [], // The rows that the user have been created.
  pointTypes: [], // The pointtypes that the user have created.
  variables: [], // The variables that the user have created.

  // The defaults that will fill the various text boxes.
  defaultRowTitle: "Row",
  defaultRowText:
    "This is a row, and inside of it, you can place choices. On both rows and choices Requirements can be placed, which will a row from being viewed, or make the player unable to select a choice, depending on either Point-types or the Ids of other choices. Point-types can be made in Features then Manage Points. Hovering over buttons will explain what they do. The Design of the project can be changed in 'Modify Design' at the side navigation bar, and private styling for each row can be turned on in the rows Settings. Default text like this can be turned off in Features -> Manage Defaults. block",
  defaultChoiceTitle: "Choice",
  defaultChoiceText:
    "This is a Choice, and inside of it, you can place images and text. Scores can be added to it, and have Point-types attached. Addons can be added underneath the image and text. In the Functions at the bottom of the choice, there is an array of different things that can be done. Default text like this can be turned off in Features then Manage Defaults.",
  defaultBeforePoint: "Cost:",
  defaultAfterPoint: "points",
  defaultBeforeReq: "Required:",
  defaultAfterReq: "choice",
  defaultAddonTitle: "Addon",
  defaultAddonText:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

  // The styling that has to be done in the row.
  styling: {
    // Font for the text.
    rowTitle: "Times New Roman", // The font for the row-titles.
    rowText: "Times New Roman", // The font for the row-under-text.
    objectTitle: "Times New Roman", // The font for the object-titles.
    objectText: "Times New Roman", // The font for the object-under-text.
    addonTitle: "Times New Roman", // The font for the object-titles.
    addonText: "Times New Roman", // The font for the object-under-text.
    scoreText: "Times New Roman",

    // Size for the text.
    rowTitleTextSize: 200,
    rowTextTextSize: 100,
    objectTitleTextSize: 200,
    objectTextTextSize: 100,
    addonTitleTextSize: 200,
    addonTextTextSize: 100,
    scoreTextSize: 75,

    barTextColor: "#000000",
    barBackgroundColor: "#FFFFFFFF",
    barTextPadding: 17,
    barTextMargin: 0,
    barTextFont: "Times New Roman",
    barTextSize: 15,
    barPadding: 0,
    barMargin: 0,

    // Colors for the text.
    rowTitleColor: "000000",
    rowTextColor: "000000",
    objectTitleColor: "000000",
    objectTextColor: "000000",
    addonTitleColor: "000000",
    addonTextColor: "000000",
    scoreTextColor: "000000",
    objectHeight: true,

    rowTitleAlign: "center",
    rowTextAlign: "center",
    objectTitleAlign: "center",
    objectTextAlign: "center",
    addonTitleAlign: "center",
    addonTextAlign: "center",
    scoreTextAlign: "center",

    rowButtonXPadding: 0,
    rowButtonYPadding: 0,

    // Background image and color.
    backgroundImage: "",
    rowBackgroundImage: "",
    objectBackgroundImage: "",
    backgroundColor: "#FFFFFFFF",
    objectBgColor: "#FFFFFFFF",
    rowBgColor: "#FFFFFFFF",

    // Boolean that says if the row or object-color will be viewed.
    rowBgColorIsOn: false,
    objectBgColorIsOn: false,

    // Image radius and width
    objectImageWidth: 100,
    rowImageWidth: 100,
    objectImageMarginTop: 0,
    objectImageMarginBottom: 0,
    rowImageMarginTop: 0,

    // Margin and padding
    objectMargin: 10,
    rowMargin: 10,
    rowTextPaddingY: 5,
    rowTextPaddingX: 10,
    objectTextPadding: 10,

    rowBodyMarginTop: 25,
    rowBodyMarginBottom: 25,
    rowBodyMarginSides: 1,

    // Style Drop Shadow Object
    objectDropShadowH: 0,
    objectDropShadowV: 0,
    objectDropShadowSpread: 0,
    objectDropShadowBlur: 0,
    objectDropShadowColor: "grey",
    objectDropShadowIsOn: false,

    // Style Drop Shadow Row
    rowDropShadowH: 0,
    rowDropShadowV: 0,
    rowDropShadowSpread: 0,
    rowDropShadowBlur: 0,
    rowDropShadowColor: "grey",
    rowDropShadowIsOn: false,

    // Selected Filter
    selFilterBlurIsOn: false,
    selFilterBlur: 0,
    selFilterBrightIsOn: false,
    selFilterBright: 100,
    selFilterContIsOn: false,
    selFilterCont: 100,
    selFilterGrayIsOn: false,
    selFilterGray: 0,
    selFilterHueIsOn: false,
    selFilterHue: 0,
    selFilterInvertIsOn: false,
    selFilterInvert: 0,
    selFilterOpacIsOn: false,
    selFilterOpac: 100,
    selFilterSaturIsOn: false,
    selFilterSatur: 1,
    selFilterSepiaIsOn: false,
    selFilterSepia: 0,
    selBgColorIsOn: true,
    selFilterBgColor: "#70FF7EFF",

    // Required Filter
    reqFilterBlurIsOn: false,
    reqFilterBlur: 0,
    reqFilterBrightIsOn: false,
    reqFilterBright: 100,
    reqFilterContIsOn: false,
    reqFilterCont: 100,
    reqFilterGrayIsOn: false,
    reqFilterGray: 0,
    reqFilterHueIsOn: false,
    reqFilterHue: 0,
    reqFilterInvertIsOn: false,
    reqFilterInvert: 0,
    reqFilterOpacIsOn: true,
    reqFilterOpac: 50,
    reqFilterSaturIsOn: false,
    reqFilterSatur: 1,
    reqFilterSepiaIsOn: false,
    reqFilterSepia: 0,
    reqBgColorIsOn: false,
    reqFilterBgColor: "#FFFFFFFF",
    reqFilterVisibleIsOn: false,

    // Border radius row, and border
    rowBorderRadiusTopLeft: 0,
    rowBorderRadiusTopRight: 0,
    rowBorderRadiusBottomRight: 0,
    rowBorderRadiusBottomLeft: 0,
    rowBorderRadiusIsPixels: true,
    rowOverflowIsOn: true,

    rowBorderIsOn: false,
    rowBorderColor: "red",
    rowBorderStyle: "solid",
    rowBorderWidth: 2,

    // Border radius object, and border
    objectBorderRadiusTopLeft: 0,
    objectBorderRadiusTopRight: 0,
    objectBorderRadiusBottomRight: 0,
    objectBorderRadiusBottomLeft: 0,
    objectBorderRadiusIsPixels: true,
    objectOverflowIsOn: true,

    objectBorderIsOn: false,
    objectBorderColor: "red",
    objectBorderStyle: "solid",
    objectBorderWidth: 2,

    // Border radius object image, and border
    objectImgBorderRadiusTopLeft: 0,
    objectImgBorderRadiusTopRight: 0,
    objectImgBorderRadiusBottomRight: 0,
    objectImgBorderRadiusBottomLeft: 0,
    objectImgBorderRadiusIsPixels: true,

    objectImgBorderIsOn: false,
    objectImgBorderColor: "red",
    objectImgBorderStyle: "solid",
    objectImgBorderWidth: 2,

    // Border radius row image, and border
    rowImgBorderRadiusTopLeft: 0,
    rowImgBorderRadiusTopRight: 0,
    rowImgBorderRadiusBottomRight: 0,
    rowImgBorderRadiusBottomLeft: 0,
    rowImgBorderRadiusIsPixels: true,

    rowImgBorderIsOn: false,
    rowImgBorderColor: "red",
    rowImgBorderStyle: "solid",
    rowImgBorderWidth: 2,

    backPackWidth: 1200,
  },
} satisfies App;

export type Requireds = {
  required: boolean;
  requireds: Requireds[];
  orRequired: { req: string }[];
  // id: { type: "string" };
  type: string;
  reqId: string;
  reqId1: string;
  // reqId2: { type: "string" };
  // reqId3: { type: "string" };
  reqPoints: number | string;
  showRequired: boolean;
  operator: number | string;
  afterText: string;
  beforeText: string;
  // orNum: { type: "integer" };
  // selNum: { type: "integer" };
  startingSum?: string;
  // more: empty_array;
  // required;
  // requireds;
  // orRequired;
  // id;
  // type;
  // reqId;
  // reqId1;
  // reqId2;
  // reqId3;
  // reqPoints;
  // showRequired;
  // operator;
  // afterText;
  // beforeText;
};

export function pi(el: unknown): number {
  if (typeof el === "string") return parseInt(el as string);
  return el as number;
}

function draftOriginal<T>(e: T): T {
  return isDraft(e) ? (original(e) as T) : e;
}

// Used everywhere in the application,
export function checkRequireds(
  app: {
    activated: string[];
    pointTypes: { id: string; startingSum: number | string }[];
  },
  object: { requireds?: Requireds[] },
) {
  if (typeof object.requireds === "undefined") return true;
  // If the object has requireds that have yet to be selected.
  // Needs to run trough all the requireds
  for (const required of object.requireds) {
    // Used to see if any of the requirements
    let requiredHasRequireds = false;
    // Checks if the requirement itself has requirements.
    if (typeof required.requireds !== "undefined") {
      if (checkRequireds(app, required)) requiredHasRequireds = true;
    } else {
      requiredHasRequireds = true;
    }

    if (requiredHasRequireds) {
      // This happens when the object is of the type that will set HAS-requirement
      if (required.required) {
        // Is NOT in the array, is of type 'id'.
        if (!app.activated.includes(required.reqId) && required.type === "id") {
          return false;
          // If the type of required is'Points'
        } else if (required.type === "points") {
          if (typeof required.operator === "undefined") {
            // Needs to run trough all the requireds
            for (const pointType of app.pointTypes) {
              // Is in the array and is of requiredf type 'points'.
              if (required.reqId === pointType.id) {
                // If there is more points than the
                if (pi(required.reqPoints) > pi(pointType.startingSum))
                  return false;
              }
            }
          } else {
            /*
              pointReqOperators: [
                { text: "+ More than", value: "1" },
                { text: "+= More or equal", value: "2" },
                { text: "= Equal to", value: "3" },
                { text: "-= Less or equal", value: "4" },
                { text: "- Less han", value: "5" }
              ],
            */
            // Needs to run trough all the requireds
            for (const pointType of app.pointTypes) {
              // Is in the array and is of requiredf type 'points'.
              if (required.reqId === pointType.id) {
                // If reqPoints is a number and not a string
                if (!isNaN(pi(required.reqPoints))) {
                  // Is there more points than required?
                  if (
                    pi(required.operator) === 1 &&
                    pi(required.reqPoints) >= pi(pointType.startingSum)
                  ) {
                    return false;
                    // Is there more or equal points to required?
                  } else if (
                    pi(required.operator) === 2 &&
                    pi(required.reqPoints) > pi(pointType.startingSum)
                  ) {
                    return false;
                    // Is there THIS many points?
                  } else if (
                    pi(required.operator) === 3 &&
                    pi(required.reqPoints) !== pi(pointType.startingSum)
                  ) {
                    return false;
                    // Is there less or equal points to required?
                  } else if (
                    pi(required.operator) === 4 &&
                    pi(required.reqPoints) < pi(pointType.startingSum)
                  ) {
                    return false;
                    // Is there less points than required?
                  } else if (
                    pi(required.operator) === 5 &&
                    pi(required.reqPoints) <= pi(pointType.startingSum)
                  ) {
                    return false;
                  }
                } else {
                  for (const pointType2 of app.pointTypes) {
                    if (required.startingSum === pointType2.id) {
                      // Is there more points than required?
                      if (
                        pi(required.operator) === 1 &&
                        pi(pointType.startingSum) >= pi(pointType2.startingSum)
                      ) {
                        return false;
                        // Is there more or equal points to required?
                      } else if (
                        pi(required.operator) === 2 &&
                        pi(pointType.startingSum) > pi(pointType2.startingSum)
                      ) {
                        return false;
                        // Is there THIS many points?
                      } else if (
                        pi(required.operator) === 3 &&
                        pi(pointType.startingSum) !== pi(pointType2.startingSum)
                      ) {
                        return false;
                        // Is there less or equal points to required?
                      } else if (
                        pi(required.operator) === 4 &&
                        pi(pointType.startingSum) < pi(pointType2.startingSum)
                      ) {
                        return false;
                        // Is there less points than required?
                      } else if (
                        pi(required.operator) === 5 &&
                        pi(pointType.startingSum) <= pi(pointType2.startingSum)
                      ) {
                        return false;
                      }
                    }
                  }
                }
              }
            }
          }
        } else if (required.type === "or") {
          let check = false;

          for (const orRequired of required.orRequired) {
            if (app.activated.includes(orRequired.req) && orRequired.req != "")
              check = true;
          }
          // Checks if one of the requireds is selected.
          if (!check) return false;
        } else if (required.type === "pointCompare") {
          let pointtypeA: number = 0;
          let pointtypeB: number = 0;

          for (const pointType of app.pointTypes) {
            // Is in the array and is of requiredf type 'points'.
            if (required.reqId === pointType.id) {
              // If there is more points than the
              pointtypeA = pi(pointType.startingSum);
            }
          }

          for (const pointType of app.pointTypes) {
            // Is in the array and is of requiredf type 'points'.
            if (required.reqId1 === pointType.id) {
              // If there is more points than the
              pointtypeB = pi(pointType.startingSum);
            }
          }

          /*
            pointReqOperators: [
              { text: "+ More than", value: "1" },
              { text: "+= More or equal", value: "3" },
              { text: "= Equal to", value: "2" },
              { text: "-= Less or equal", value: "4" },
              { text: "- Less han", value: "5" }
            ],
          */

          if (pointtypeA <= pointtypeB && pi(required.operator) === 1)
            return false;
          else if (pointtypeA != pointtypeB && pi(required.operator) === 2)
            return false;
          else if (pointtypeA < pointtypeB && pi(required.operator) === 3)
            return false;

          // Checks if one of the requireds is selected.
        }
      }
      // This happens when the object is of the type that will set NOT-requirement
      if (!required.required) {
        // Is in the array, is of type 'id'.
        if (app.activated.includes(required.reqId) && required.type === "id") {
          return false;
          // If the type of reqyired is'Points'
        } else if (required.type === "points") {
          if (typeof required.operator === "undefined") {
            // Needs to run trough all the requireds
            for (const pointType of app.pointTypes) {
              // Is in the array and is of requiredf type 'points'.
              if (required.reqId === pointType.id) {
                // If there is more points than the
                if (pi(required.reqPoints) <= pi(pointType.startingSum))
                  return false;
              }
            }
          } else {
            // Needs to run trough all the requireds
            for (const pointType of app.pointTypes) {
              // Is in the array and is of requiredf type 'points'.
              if (required.reqId === pointType.id) {
                // If reqPoints is a number and not a string.
                if (!isNaN(pi(required.reqPoints))) {
                  // Is there more points than required?
                  if (
                    pi(required.operator) === 1 &&
                    pi(required.reqPoints) >= pi(pointType.startingSum)
                  ) {
                    return false;
                    // Is there more or equal points to required?
                  } else if (
                    pi(required.operator) === 2 &&
                    pi(required.reqPoints) > pi(pointType.startingSum)
                  ) {
                    return false;
                    // Is there THIS many points?
                  } else if (
                    pi(required.operator) === 3 &&
                    pi(required.reqPoints) !== pi(pointType.startingSum)
                  ) {
                    return false;
                    // Is there less or equal points to required?
                  } else if (
                    pi(required.operator) === 4 &&
                    pi(required.reqPoints) < pi(pointType.startingSum)
                  ) {
                    return false;
                    // Is there less points than required?
                  } else if (
                    pi(required.operator) === 5 &&
                    pi(required.reqPoints) <= pi(pointType.startingSum)
                  ) {
                    return false;
                  }
                } else {
                  for (const pointType2 of app.pointTypes) {
                    if (required.reqPoints === pointType2.id) {
                      // Is there more points than required?
                      if (
                        pi(required.operator) === 1 &&
                        pi(pointType.startingSum) >= pi(pointType2.startingSum)
                      ) {
                        return false;
                        // Is there more or equal points to required?
                      } else if (
                        pi(required.operator) === 2 &&
                        pi(pointType.startingSum) > pi(pointType2.startingSum)
                      ) {
                        return false;
                        // Is there THIS many points?
                      } else if (
                        pi(required.operator) === 3 &&
                        pi(pointType.startingSum) !== pi(pointType2.startingSum)
                      ) {
                        return false;
                        // Is there less or equal points to required?
                      } else if (
                        pi(required.operator) === 4 &&
                        pi(pointType.startingSum) < pi(pointType2.startingSum)
                      ) {
                        return false;
                        // Is there less points than required?
                      } else if (
                        pi(required.operator) === 5 &&
                        pi(pointType.startingSum) <= pi(pointType2.startingSum)
                      ) {
                        return false;
                      }
                    }
                  }
                }
              }
            }
          }
        } else if (required.type === "or") {
          let check = false;
          for (const orRequired of required.orRequired) {
            if (!app.activated.includes(orRequired.req) && orRequired.req != "")
              check = true;
          }
          // Checks if one of the requireds is selected.
          if (!check) return false;
        }
      }
    }
  }
  return true;
}

function cleanActivated(app: App) {
  // For each of the rows.
  for (const row of app.rows) {
    row.isEditModeOn = false;
    if (row.allowedChoicesChange > 0)
      row.allowedChoices = pi(row.allowedChoices) - row.allowedChoicesChange;

    // For each of the objects.
    for (const object of row.objects) {
      if (!object.isSelectableMultiple) continue;

      // Will go trough all tiers left to lowest tier.
      if (object.isMultipleUseVariable) {
        for (let g = 0; g < pi(object.multipleUseVariable); g++) {
          let isLessThanLimit = true;

          for (const pointType of app.pointTypes) {
            if (pointType.id === object.multipleScoreId) {
              if (pi(object.numMultipleTimesMinus) < pi(pointType.startingSum))
                pointType.startingSum = pi(pointType.startingSum) - 1;
              else isLessThanLimit = false;
            }
          }

          if (isLessThanLimit) {
            for (const score of object.scores) {
              // Goes trough all of the scores and check which is fits.
              for (const pointType of app.pointTypes) {
                if (pointType.id === score.id && checkRequireds(app, score)) {
                  pointType.startingSum =
                    pi(pointType.startingSum) + pi(score.value);
                }
              }
            }
          }
        }
      } else {
        for (
          let g = 0;
          g <
          pi(object.numMultipleTimesPluss) - pi(object.numMultipleTimesMinus);
          g++
        ) {
          let isLessThanLimit = true;

          for (const pointType of app.pointTypes) {
            if (pointType.id === object.multipleScoreId) {
              if (pi(object.numMultipleTimesMinus) < pi(pointType.startingSum))
                pointType.startingSum = pi(pointType.startingSum) - 1;
              else isLessThanLimit = false;
            }
          }

          if (isLessThanLimit) {
            for (const score of object.scores) {
              // Goes trough all of the scores and check which is fits.
              for (const pointType of app.pointTypes) {
                if (pointType.id === score.id && checkRequireds(app, score))
                  pointType.startingSum =
                    pi(pointType.startingSum) + pi(score.value);
              }
            }
          }
        }
      }

      object.multipleUseVariable = 0;
    }
  }

  // For each of the rows.
  for (const row of app.rows) {
    row.isEditModeOn = false;

    // For each of the objects.
    for (const object of row.objects) {
      if (object.isActive) {
        // Deactivate the choice.
        object.isActive = false;
        row.currentChoices = 0;

        // For each of the scores.
        for (const score of object.scores) {
          for (const pointType of app.pointTypes) {
            if (pointType.id === score.id) {
              // If the score has a required, and there is more requirements than 0.
              if (
                typeof score.requireds !== "undefined" ||
                score.requireds > 0
              ) {
                // If the score has been activated.
                if (score.isActive) {
                  score.isActive = false;
                  pointType.startingSum =
                    pi(pointType.startingSum) + pi(score.value);
                }
              } else {
                pointType.startingSum =
                  pi(pointType.startingSum) + pi(score.value);
              }
            }
          }
        }
      } else if (object.isImageUpload) {
        object.image = "";
      }
    }
  }
}

function checkPoints(
  object: Object,
  activated: string[],
  pointTypes: App["pointTypes"],
) {
  let check = true;
  // Then make the one that

  for (const score of object.scores) {
    if (checkRequireds({ activated, pointTypes }, score) && !score.isActive) {
      // Goes trough all of the scores and check which is fits.
      for (const pointType of pointTypes) {
        if (pointType.id === score.id && pointType.belowZeroNotAllowed) {
          if (pi(pointType.startingSum) - pi(score.value) < 0) check = false;
        }
      }
    }
  }

  return check;
}

function findRow(
  row: App["rows"][0] | App["backpack"][0],
  app: App,
): App["rows"][0] | App["backpack"][0] {
  for (const row2 of app.rows) {
    if (draftOriginal(row) === draftOriginal(row2)) return row2;
  }
  for (const row2 of app.backpack) {
    if (draftOriginal(row) === draftOriginal(row2)) return row2;
  }
  return row;
}

function findObject(obj: Object, app: App): Object {
  for (const row of app.rows) {
    for (const obj2 of row.objects)
      if (draftOriginal(obj) === draftOriginal(obj2)) return obj2;
  }
  for (const row of app.backpack) {
    for (const obj2 of row.objects)
      if (draftOriginal(obj) === draftOriginal(obj2)) return obj2;
  }
  return obj;
}

function findObj(
  obj: App["rows"][0] | Object | Object["addons"][0],
  app: App,
): App["rows"][0] | Object | Object["addons"][0] {
  const origObj = draftOriginal(obj);
  for (const row of app.rows) {
    if (draftOriginal(row) === origObj) return row;
    for (const object of row.objects) {
      if (draftOriginal(object) === origObj) return object;
      for (const addon of object.addons) {
        if (draftOriginal(addon) === origObj) return addon;
      }
    }
  }
  for (const row of app.backpack) {
    if (draftOriginal(row) === origObj) return row as App["rows"][0];
    for (const object of row.objects) {
      if (draftOriginal(object) === origObj) return object;
      for (const addon of object.addons) {
        if (draftOriginal(addon) === origObj) return addon;
      }
    }
  }
  return obj;
}

export function findObjRow(
  obj: App["rows"][0] | Object | Object["addons"][0],
  app: { rows: App["rows"]; backpack: App["backpack"] },
): App["rows"][0] | App["backpack"][0] {
  const origObj = draftOriginal(obj);
  for (const row of app.rows) {
    if (draftOriginal(row) === origObj) return row;
    for (const object of row.objects) {
      if (draftOriginal(object) === origObj) return row;
      for (const addon of object.addons) {
        if (draftOriginal(addon) === origObj) return row;
      }
    }
  }
  for (const row of app.backpack) {
    if (draftOriginal(row) === origObj) return row;
    for (const object of row.objects) {
      if (draftOriginal(object) === origObj) return row;
      for (const addon of object.addons) {
        if (draftOriginal(addon) === origObj) return row;
      }
    }
  }
  return obj as App["rows"][0];
}

// used when the - in a multiple is pressed.
function selectedOneMore(object: Object, app: App) {
  object = findObject(object, app);
  let selectedThisManyTimesProp = null;
  let isLessThanLimit = true;

  // If the multiple choice uses its own variable.
  if (object.isMultipleUseVariable) {
    object.multipleUseVariable = object.multipleUseVariable ?? 0;
    if (pi(object.numMultipleTimesPluss) > pi(object.multipleUseVariable)) {
      object.multipleUseVariable = pi(object.multipleUseVariable) + 1;
      selectedThisManyTimesProp = object.multipleUseVariable;
    } else {
      isLessThanLimit = false;
    }
  } else {
    for (const pointType of app.pointTypes) {
      if (pointType.id === object.multipleScoreId) {
        if (pi(object.numMultipleTimesPluss) > pi(pointType.startingSum)) {
          pointType.startingSum = pi(pointType.startingSum) + 1;
          selectedThisManyTimesProp = pointType.startingSum;
        } else {
          isLessThanLimit = false;
        }
      }
    }
  }
  if (isLessThanLimit) {
    for (const score of object.scores) {
      // Goes trough all of the scores and check which is fits.
      for (const pointType of app.pointTypes) {
        if (pointType.id === score.id && checkRequireds(app, score))
          pointType.startingSum = pi(pointType.startingSum) - pi(score.value);
      }
    }
  }
  return selectedThisManyTimesProp;
}

// used when the + in a multiple is pressed.
function selectedOneLess(object: Object, app: App) {
  object = findObject(object, app);
  let selectedThisManyTimesProp = null;
  let isLessThanLimit = true;
  // If the multiple choice uses its own variable.
  if (object.isMultipleUseVariable) {
    object.multipleUseVariable = object.multipleUseVariable ?? 0;
    if (pi(object.numMultipleTimesMinus) < object.multipleUseVariable) {
      object.multipleUseVariable--;
      selectedThisManyTimesProp = object.multipleUseVariable;
    } else {
      isLessThanLimit = false;
    }
  } else {
    for (const pointType of app.pointTypes) {
      if (pointType.id === object.multipleScoreId) {
        if (pi(object.numMultipleTimesMinus) < pi(pointType.startingSum)) {
          pointType.startingSum = pi(pointType.startingSum) - 1;
          selectedThisManyTimesProp = pointType.startingSum;
        } else {
          isLessThanLimit = false;
        }
      }
    }
  }
  if (isLessThanLimit) {
    for (const score of object.scores) {
      // Goes trough all of the scores and check which is fits.
      for (const pointType of app.pointTypes) {
        console.log(object.multipleUseVariable);

        if (pointType.id === score.id && checkRequireds(app, score)) {
          pointType.startingSum = pi(pointType.startingSum) + pi(score.value);
        }
      }
    }
  }
  return selectedThisManyTimesProp;
}

// When someone clicks on a object this process needs to happen.
function activateObject(
  object: Object,
  row: App["rows"][0] | App["backpack"][0],
  app: App,
) {
  row = findRow(row, app);
  object = findObject(object, app);

  const { activated, pointTypes, rows, groups, words } = app;
  const hasRequireds = checkRequireds({ activated, pointTypes }, object);
  const hasPoints = checkPoints(object, activated, pointTypes);

  // Will here run trugh all the scores, and check if there is enough
  // 1. Find the type of points and how many there is.
  // 2. take the points off, or add.

  // Used to make the activated change when a selected is pressed.
  if (
    pi(row.currentChoices) + 1 > pi(row.allowedChoices) &&
    !object.isActive &&
    row.allowedChoices != 0
  ) {
    // For each of the objects in the row.
    // Check if the number of allowed choices allows it.
    for (const object of row.objects) {
      if (
        object.isActive &&
        pi(row.currentChoices) + 1 > pi(row.allowedChoices)
      )
        activateObject(object, row, app);
    }
  }

  // If hasRequireds is true, and currentchoices is not above allowedChoices.
  if (
    hasRequireds &&
    hasPoints &&
    (pi(row.currentChoices) < pi(row.allowedChoices) ||
      pi(row.allowedChoices) === 0)
  ) {
    // If the array does not have this id-from before of, turn on.
    if (!activated.includes(object.id)) {
      // Adds the object-id into the

      // Then make the one that
      for (const score of object.scores) {
        if (
          checkRequireds({ activated, pointTypes }, score) &&
          !score.isActive
        ) {
          // Goes trough all of the scores and check which is fits.
          for (const pointType of pointTypes) {
            if (pointType.id === score.id) {
              pointType.startingSum =
                pi(pointType.startingSum) - pi(score.value);
              score.isActive = true;
            }
          }
        }
      }

      // Is the FUNCTIONS, happens when the object is selected.
      // ------------------------------------------------------

      // This activates cleaning if the function is activated.
      if (object.cleanACtivatedOnSelect) cleanActivated(app);

      // This will force activate another choice.
      if (
        object.activateOtherChoice &&
        typeof object.activateThisChoice !== "undefined"
      ) {
        const array = object.activateThisChoice.split(",");

        for (const el of array) {
          for (const row of rows) {
            for (const object of row.objects) {
              if (object.id === el && !object.isActive) {
                object.isNotSelectable = true;
                activateObject(object, row, app);
              } else if (object.id === el && object.isActive) {
                object.isNotSelectable = true;
              }
            }
          }
        }
      }

      // This will deactivate another choice.
      if (object.deactivateOtherChoice) {
        const array = object.deactivateThisChoice?.split(",") ?? [];

        for (const el of array) {
          for (const row of rows) {
            for (const object of row.objects) {
              if (
                (object.id === el || row.resultGroupId === el) &&
                object.isActive
              ) {
                //this.app.rows[c].objects[m].isActive = false;
                activateObject(object, row, app);
              }
            }
          }

          // Checks if the id added in one of the groups in feature.
          //let groupIdArray = this.newActivated.split(",");
          for (const group of groups) {
            if (group.id === el) {
              for (const row of rows) {
                for (const object of row.objects) {
                  for (const group of object.groups) {
                    if (group.id === el && object.isActive) {
                      //this.app.rows[c].objects[m].isActive = false;
                      activateObject(object, row, app);
                    }
                  }
                }
              }
            }
          }
        }
      }

      let allChanges = "Scores Updated On: ";
      // Will go trough all of the scores and see if there is any requirements with this id.
      for (const row of rows) {
        for (const objects of row.objects) {
          for (const score of objects.scores) {
            for (const required of score.requireds) {
              if (objects.isActive) {
                if (required.reqId === object.id) {
                  if (allChanges.length === 19) allChanges += objects.title;
                  else allChanges += ", " + objects.title;
                  activateObject(objects, row, app);
                } else if (
                  JSON.stringify(required).includes('"' + object.id + '"')
                ) {
                  if (allChanges.length === 19) allChanges += objects.title;
                  else allChanges += ", " + objects.title;
                  activateObject(objects, row, app);
                }
              } else if (objects.isSelectableMultiple) {
                if (JSON.stringify(required).includes('"' + object.id + '"')) {
                  console.log("one");

                  if (
                    allChanges.length === 19 &&
                    pi(objects.multipleUseVariable) > 0
                  ) {
                    allChanges += objects.title;
                  } else if (pi(objects.multipleUseVariable) > 0) {
                    allChanges += ", " + objects.title;
                  }

                  for (
                    let i = 0;
                    i <
                    pi(objects.numMultipleTimesPluss) -
                      pi(objects.numMultipleTimesMinus);
                    i++
                  ) {
                    selectedOneLess(objects, app);
                  }
                }
              }
            }
          }
        }
      }
      if (allChanges !== "Scores Updated On: ") toast(allChanges + ".");

      // This will multiply a point type when activated.
      if (object.multiplyPointtypeIsOn) {
        // used when checing if
        object.multiplyPointtypeIsOnCheck = true;
        for (const pointType of pointTypes) {
          if (pointType.id === object.pointTypeToMultiply) {
            if (!object.multiplyPointtypeIsId) {
              object.startingSumAtMultiply =
                pi(pointType.startingSum) * pi(object.multiplyWithThis) -
                pi(pointType.startingSum);

              pointType.startingSum =
                pi(pointType.startingSum) * pi(object.multiplyWithThis);
              // If the multiplyWithThis is a ID
            } else {
              for (const pointType2 of pointTypes) {
                if (pointType2.id === object.multiplyWithThis) {
                  object.startingSumAtMultiply =
                    pi(pointType.startingSum) * pi(pointType2.startingSum) -
                    pi(pointType.startingSum);
                  pointType.startingSum =
                    pi(pointType.startingSum) * pi(pointType2.startingSum);
                }
              }
            }
          }
        }
      }

      // This will divide a point type when activated.
      if (object.dividePointtypeIsOn) {
        // used when checing if
        object.dividePointtypeIsOnCheck = true;
        for (const pointType of pointTypes) {
          if (pointType.id === object.pointTypeToDivide) {
            pointType.startingSum =
              pi(pointType.startingSum) / pi(object.divideWithThis);
            console.log("Multiply:");
          }
        }
      }

      // This will change the Allowed Choices of Row.
      if (object.addToAllowChoice) {
        for (const row of rows) {
          if (object.idOfAllowChoice === row.id) {
            row.allowedChoices =
              pi(row.allowedChoices) + pi(object.numbAddToAllowChoice);

            if (isNaN(row.allowedChoicesChange)) row.allowedChoicesChange = 0;

            row.allowedChoicesChange =
              pi(row.allowedChoicesChange) + pi(object.numbAddToAllowChoice); // Added to keep record.

            let numActive = 0;
            for (const object of row.objects) {
              if (object.isActive) numActive++;
            }

            // If there is more active than is allowed, need to turna few off.
            if (numActive > row.allowedChoices) {
              let deactivateChoices = numActive - row.allowedChoices;
              for (const object of row.objects) {
                if (deactivateChoices > 0 && object.isActive) {
                  activateObject(object, row, app);
                  deactivateChoices--;
                }
              }
            }
          }
        }
      }

      // This will divide a point type when activated.
      if (object.textfieldIsOn) {
        // used when checing if

        for (const word of words) {
          if (word.id === object.idOfTheTextfieldWord)
            word.replaceText = object.wordChangeSelect ?? "";
        }
      }

      activated.push(object.id);
      row.currentChoices += 1;

      // Deletes the the id from the array.
    } else {
      for (const score of object.scores) {
        if (
          (checkRequireds({ activated, pointTypes }, score) &&
            score.isActive) ||
          score.isActive
        ) {
          // Goes trough all of the scores and check which is fits.
          for (const pointType of pointTypes) {
            if (pointType.id === score.id) {
              pointType.startingSum =
                pi(pointType.startingSum) + pi(score.value);
              score.isActive = false;
            }
          }
        }
      }

      // Is the FUNCTIONS, happens when the object is deselected.
      // ------------------------------------------------------

      // This will force activate another choice.
      if (
        object.activateOtherChoice &&
        typeof object.activateThisChoice !== "undefined"
      ) {
        const array = object.activateThisChoice.split(",");

        for (const el of array) {
          // This will force activate another choice.

          for (const row of rows) {
            for (const object of row.objects) {
              if (object.id === el && object.isActive) {
                object.isNotSelectable = false;
                activateObject(object, row, app);
              } else {
                object.isNotSelectable = false;
              }
            }
          }
        }
      }

      // This will deactivate another choice.
      if (object.deactivateOtherChoice) {
        const array = object.deactivateThisChoice?.split(",") ?? [];

        for (const el of array) {
          for (const row of rows) {
            for (const object of row.objects) {
              if (
                (object.id === el || row.resultGroupId === el) &&
                object.isActive
              ) {
                //this.app.rows[c].objects[m].isActive = false;
                activateObject(object, row, app);
              }
            }
          }

          // Checks if the id added in one of the groups in feature.
          //let groupIdArray = this.newActivated.split(",");
          for (const group of groups) {
            if (group.id === el) {
              for (const row of rows) {
                for (const object of row.objects) {
                  for (const group of object.groups) {
                    if (group.id === el && object.isActive) {
                      //this.app.rows[c].objects[m].isActive = false;
                      activateObject(object, row, app);
                    }
                  }
                }
              }
            }
          }
        }
      }

      let allChanges = "Scores Updated On: ";
      // Will go trough all of the scores and see if there is any requirements with this id.
      for (const row of rows) {
        for (const objects of row.objects) {
          for (const score of objects.scores) {
            for (const required of score.requireds) {
              if (objects.isActive) {
                if (required.reqId === object.id) {
                  if (allChanges.length === 19) {
                    allChanges += objects.title;
                  } else {
                    allChanges += ", " + objects.title;
                  }
                  activateObject(objects, row, app);
                } else if (
                  JSON.stringify(required).includes('"' + object.id + '"')
                ) {
                  if (allChanges.length === 19) {
                    allChanges += objects.title;
                  } else {
                    allChanges += ", " + objects.title;
                  }
                  activateObject(objects, row, app);
                }
              } else if (objects.isSelectableMultiple) {
                if (JSON.stringify(required).includes('"' + object.id + '"')) {
                  console.log("one");

                  if (
                    allChanges.length === 19 &&
                    pi(objects.multipleUseVariable) > 0
                  ) {
                    allChanges += objects.title;
                  } else if (pi(objects.multipleUseVariable) > 0) {
                    allChanges += ", " + objects.title;
                  }

                  for (
                    let i = 0;
                    i <
                    pi(objects.numMultipleTimesPluss) -
                      pi(objects.numMultipleTimesMinus);
                    i++
                  ) {
                    selectedOneLess(objects, app);
                  }
                }
              }
            }
          }
        }
      }
      if (allChanges !== "Scores Updated On: ") toast(allChanges + ".");

      // This will divide a point type when activated.
      if (object.multiplyPointtypeIsOnCheck) {
        // used when checing if
        object.multiplyPointtypeIsOnCheck = false;
        for (const pointType of pointTypes) {
          if (pointType.id === object.pointTypeToMultiply) {
            pointType.startingSum =
              pi(pointType.startingSum) - pi(object.startingSumAtMultiply);
            //this.app.pointTypes[c].startingSum /= object.multiplyWithThis;
            console.log("Multiply:" + object.startingSumAtMultiply);
          }
        }
      }

      // This will multiply a point type when activated.
      if (object.dividePointtypeIsOnCheck) {
        // used when checing if
        object.dividePointtypeIsOnCheck = false;
        for (const pointType of pointTypes) {
          if (pointType.id === object.pointTypeToDivide) {
            pointType.startingSum =
              pi(pointType.startingSum) * pi(object.divideWithThis);
            console.log("Multiply:");
          }
        }
      }

      // This will divide a point type when activated.
      if (object.textfieldIsOn) {
        // used when checing if

        for (const word of words) {
          if (word.id === object.idOfTheTextfieldWord) {
            word.replaceText = object.wordChangeDeselect ?? "";
          }
        }
      }

      // This will change the Allowed Choices of Row.
      if (object.addToAllowChoice) {
        for (const row of rows) {
          if (object.idOfAllowChoice === row.id) {
            row.allowedChoices =
              pi(row.allowedChoices) - pi(object.numbAddToAllowChoice);
            let numActive = 0;
            for (const object of row.objects) {
              if (object.isActive) numActive++;
            }

            // If there is more active than is allowed, need to turna few off.
            if (numActive > row.allowedChoices) {
              let deactivateChoices = numActive - row.allowedChoices;
              for (const object of row.objects) {
                if (deactivateChoices > 0 && object.isActive) {
                  activateObject(object, row, app);
                  deactivateChoices--;
                }
              }
            }
          }
        }
      }

      // Delete the id from the activated array
      activated.splice(activated.indexOf(object.id), 1);
      row.currentChoices -= 1;
    }

    // Switches the isActive and updates the object.
    object.isActive = !object.isActive;

    // If the object.id is in the activated-array, but required is not there.
    // Turns the object off after removing the points.
  } else if (activated.includes(object.id)) {
    // Removes this id from the activated array.
    activated.splice(activated.indexOf(object.id), 1);

    for (const score of object.scores) {
      if (
        (checkRequireds({ activated, pointTypes }, score) && score.isActive) ||
        score.isActive
      ) {
        // Goes trough all of the scores and check which is fits.
        for (const pointType of pointTypes) {
          if (pointType.id === score.id) {
            pointType.startingSum = pi(pointType.startingSum) + pi(score.value);
            score.isActive = false;
          }
        }
      }
    }

    // Is the FUNCTIONS, happens when the object is selected.
    // ------------------------------------------------------

    // This will force activate another choice.
    if (
      object.activateOtherChoice &&
      typeof object.activateThisChoice !== "undefined"
    ) {
      const array = object.activateThisChoice.split(",");

      for (const el of array) {
        // This will force activate another choice.

        for (const row of rows) {
          for (const object of row.objects) {
            if (object.id === el && object.isActive) {
              object.isNotSelectable = false;
              activateObject(object, row, app);
            } else {
              object.isNotSelectable = false;
            }
          }
        }
      }
    }

    let allChanges = "Scores Updated On: ";
    // Will go trough all of the scores and see if there is any requirements with this id.
    for (const row of rows) {
      for (const objects of row.objects) {
        for (const score of object.scores) {
          for (const required of score.requireds) {
            if (objects.isActive) {
              if (required.reqId === object.id) {
                if (allChanges.length === 19) {
                  allChanges += objects.title;
                } else {
                  allChanges += ", " + objects.title;
                }
                activateObject(objects, row, app);
              } else if (
                JSON.stringify(required).includes('"' + object.id + '"')
              ) {
                if (allChanges.length === 19) {
                  allChanges += objects.title;
                } else {
                  allChanges += ", " + objects.title;
                }
                activateObject(objects, row, app);
              }
            } else if (objects.isSelectableMultiple) {
              if (JSON.stringify(required).includes('"' + object.id + '"')) {
                console.log("one");

                if (
                  allChanges.length === 19 &&
                  pi(objects.multipleUseVariable) > 0
                ) {
                  allChanges += objects.title;
                } else if (pi(objects.multipleUseVariable) > 0) {
                  allChanges += ", " + objects.title;
                }

                for (
                  let i = 0;
                  i <
                  pi(objects.numMultipleTimesPluss) -
                    pi(objects.numMultipleTimesMinus);
                  i++
                ) {
                  selectedOneLess(objects, app);
                }
              }
            }
          }
        }
      }
    }
    if (allChanges !== "Scores Updated On: ") toast(allChanges + ".");

    // This will divide a point type when activated.
    if (object.textfieldIsOn) {
      // used when checing if

      for (const word of words) {
        if (word.id === object.idOfTheTextfieldWord) {
          word.replaceText = object.wordChangeDeselect ?? "";
        }
      }
    }

    // This will change the Allowed Choices of Row.
    if (object.addToAllowChoice) {
      for (const row of rows) {
        if (object.idOfAllowChoice === row.id) {
          row.allowedChoices =
            pi(row.allowedChoices) - pi(object.numbAddToAllowChoice);
          let numActive = 0;
          for (const object of row.objects) {
            if (object.isActive) numActive++;
          }

          // If there is more active than is allowed, need to turna few off.
          if (numActive > row.allowedChoices) {
            let deactivateChoices = numActive - row.allowedChoices;
            for (const object of row.objects) {
              if (deactivateChoices > 0 && object.isActive) {
                activateObject(object, row, app);
                deactivateChoices--;
              }
            }
          }
        }
      }
    }

    // Switches the isActive and updates the object.
    object.isActive = !object.isActive;
    row.currentChoices -= 1;
  } else {
    // Does not have the required, nothing happens.
  }
}

export function getImageURL(image: string, imagePrefix: string): string {
  if (image.length > 100) {
    // most likely a base64 image
    return image;
  }
  const res = `${imagePrefix}${image}`;
  return res;
}

export type State = {
  currentDesignComponent: string;
  app: App;
  objectWidths: { text: string; value: string }[];
  imagePrefix: string;
  loadApp: (n: App) => void;
  cleanActivated: () => void;
  addNewPointType: (pointType: {
    id: string;
    name: string;
    startingSum: string;
    activatedId: string;
    afterText: string;
  }) => void;
  addNewGroup: (group: { id: string; rowType?: string; name: string }) => void;
  addNewVariable: (variable: { id: string; isTrue: boolean }) => void;
  addNewWord: (word: { id: string; replaceText: string }) => void;
  deleteRow: (row: App["rows"][0]) => void;
  deletePointType: (pointType: App["pointTypes"][0]) => void;
  deleteGroup: (group: App["groups"][0]) => void;
  deleteVariable: (variable: App["variables"][0]) => void;
  deleteWord: (word: App["words"][0]) => void;
  activateObject: (
    object: Object,
    row: App["rows"][0] | App["backpack"][0],
  ) => void;
  checkIfDeselect: (row: App["rows"][0] | App["backpack"][0]) => boolean;
  handleButtonActivate: (row: App["rows"][0] | App["backpack"][0]) => void;
  selectedOneMore: (object: Object) => number | null;
  selectedOneLess: (object: Object) => number | null;
  setObjectSelectable: (object: Object) => void;
  multiplyOrDivide: (object: Object) => void;
  setImagePrefix: (imagePrefix: string) => void;
  setImage: (
    obj: App["rows"][0] | Object | Object["addons"][0],
    image: string,
    aspectWidth?: number,
    aspectHeight?: number,
    tooltip?: string,
  ) => void;
  setActivatedList: (activatedList: string) => void;
};

export const useAppStore = create<State, [["zustand/immer", never]]>(
  immer((set) => ({
    currentDesignComponent: "none",
    // This is the large object that holds the data of the current CYOA,
    app: defaultApp,
    // The list of widths used in row and objects.
    objectWidths: [
      { text: "Row", value: "" },
      { text: "1 per row", value: "col-12" },
      { text: "11/12", value: "col-sm-11" },
      { text: "10/12", value: "col-sm-10" },
      { text: "9/12", value: "col-sm-9" },
      { text: "8/12", value: "col-sm-8" },
      { text: "7/12", value: "col-sm-7" },
      { text: "2 per row", value: "col-sm-6" }, // w-50
      { text: "5/12", value: "col-sm-5" }, // w-50
      { text: "3 per Row", value: "col-md-4" }, // w33
      { text: "4 per Row", value: "col-md-3" }, // w-25
      { text: "5 per Row", value: "w-20" },
      { text: "6 per Row", value: "col-lg-2" }, // w-6
      { text: "7 per Row ", value: "w-14" },
      { text: "8 per Row ", value: "w-12" },
      { text: "9 per Row ", value: "w-11" }, //w-11
      { text: "10 per Row", value: "w-10" },
      { text: "11 per Row ", value: "w-9" },
      { text: "12 per Row", value: "col-xl-1" }, //w-8
    ],
    imagePrefix: "",
    // Saves the app, used in Load.vue to collect from json-files.
    loadApp: (n: App) => set((state: State) => ({ ...state, app: n }), true),
    // Sets the state as default, cleans all activated and refounds all used points.
    cleanActivated() {
      set((state: State) => {
        cleanActivated(state.app);
      });
    },
    // Creates a new point-type, done in Points.vue
    addNewPointType(pointType: {
      id: string;
      name: string;
      startingSum: string;
      activatedId: string;
      afterText: string;
    }) {
      set((state: State) => {
        state.app.pointTypes.push({
          id: pointType.id,
          name: pointType.name,
          startingSum: pointType.startingSum,
          activatedId: pointType.activatedId,
          afterText: pointType.afterText,
          beforeText: pointType.name + ":",
        });
      });
    },
    // Creates a new point-type, done in Points.vue
    addNewGroup(group: { id: string; rowType?: string; name: string }) {
      set((state: State) => {
        state.app.groups.push({
          id: group.id,
          rowType: group.rowType,
          name: group.name,
          elements: [],
        });
      });
    },
    // Creates a new point-type, done in Points.vue
    addNewVariable(variable: { id: string; isTrue: boolean }) {
      set((state: State) => {
        state.app.variables.push({ id: variable.id, isTrue: variable.isTrue });
      });
    },
    // Creates a new point-type, done in Points.vue
    addNewWord(word: { id: string; replaceText: string }) {
      set((state: State) => {
        state.app.words.push({ id: word.id, replaceText: word.replaceText });
      });
    },
    // Delete's a row after its index is found, used in Row.vue.
    deleteRow(row: App["rows"][0]) {
      set((state: State) => {
        state.app.rows = state.app.rows.filter(
          (r) => draftOriginal(r) !== draftOriginal(row),
        );
      });
    },
    deletePointType(pointType: App["pointTypes"][0]) {
      set((state: State) => {
        state.app.pointTypes = state.app.pointTypes.filter(
          (r) => draftOriginal(r) !== draftOriginal(pointType),
        );
      });
    },
    deleteGroup(group: App["groups"][0]) {
      set((state: State) => {
        state.app.groups = state.app.groups.filter(
          (r) => draftOriginal(r) !== draftOriginal(group),
        );
      });
    },
    deleteVariable(variable: App["variables"][0]) {
      set((state: State) => {
        state.app.variables = state.app.variables.filter(
          (r) => draftOriginal(r) !== draftOriginal(variable),
        );
      });
    },
    deleteWord(word: App["words"][0]) {
      set((state: State) => {
        state.app.words = state.app.words.filter(
          (r) => draftOriginal(r) !== draftOriginal(word),
        );
      });
    },
    activateObject(object: Object, row: App["rows"][0] | App["backpack"][0]) {
      set((state: State) => {
        activateObject(object, row, state.app);
      });
    },
    checkIfDeselect(row: App["rows"][0] | App["backpack"][0]) {
      let res = false;
      set((state: State) => {
        const { activated, pointTypes } = state.app;
        res = checkRequireds({ activated, pointTypes }, row);
        if (row.deselectChoices && !res) {
          for (const obj of row.objects) {
            if (
              obj.isActive &&
              pi(row.currentChoices) + 1 > pi(row.allowedChoices)
            )
              activateObject(obj, row, state.app);
          }
        }
      });
      return res;
    },
    setActivated: (activated: string[]) => {
      set((state: State) => {
        state.app.activated = activated;
      });
    },
    handleButtonActivate(row: App["rows"][0] | App["backpack"][0]) {
      set((state: State) => {
        row = findRow(row, state.app);
        // If the button is the type that will select X random or add variable to activated-array.
        if (row.buttonRandom) {
          const randomArray: number[] = [];

          // Is it uniform random or weighted random.
          if (
            !row.isWeightedRandom ||
            typeof row.isWeightedRandom === "undefined"
          ) {
            // For each of the random choices that will be selected.
            for (let i = 0; i < row.buttonRandomNumber; i++) {
              let random = Math.floor(Math.random() * row.objects.length);
              let randomObject = row.objects[random];

              // To stop an unending while loop.
              const maxTries = 100;
              let tryNumber = 0;
              let foundOne = true;

              // If only unselected choices is allowed to be selected.
              if (row.onlyUnselectedChoices) {
                // While the random is not unique and the elements requireds does not fit.
                while (
                  randomArray.includes(random) ||
                  state.app.activated.includes(randomObject.id) ||
                  !checkRequireds(state.app, randomObject) ||
                  randomObject.isNotSelectable
                ) {
                  tryNumber++;
                  random = Math.floor(Math.random() * row.objects.length);
                  randomObject = row.objects[random];

                  // Breaks the loop if the number of objects if fewer or equal to the randomNumber.
                  // Or if max tries have been surpassed.
                  if (row.objects.length <= i || maxTries <= tryNumber) {
                    foundOne = false;
                    break;
                  }
                }
              } else {
                // While the random is not unique and the elements requireds does not fit.
                while (
                  randomArray.includes(random) ||
                  !checkRequireds(state.app, randomObject) ||
                  randomObject.isNotSelectable
                ) {
                  tryNumber++;
                  random = Math.floor(Math.random() * row.objects.length);
                  randomObject = row.objects[random];

                  // Breaks the loop if the number of objects if fewer or equal to the randomNumber.
                  // Or if max tries have been surpassed.
                  if (row.objects.length <= i || maxTries <= tryNumber) {
                    break;
                  }
                }
              }

              if (foundOne) {
                // Push random into random-array.
                randomArray.push(random);

                // Checks if the objects have all requireds.
                activateObject(randomObject, row, state.app);
              }
            }

            // The random is weighted.
          } else {
            let randomTotalWeight = 0;
            let randomCumuWeight = 0;
            // sum up the weights
            for (const object of row.objects) {
              // If the number is default, not yet set
              if (
                typeof object.randomWeight === "undefined" ||
                object.randomWeight === ""
              ) {
                randomTotalWeight += 100;
              } else {
                randomTotalWeight += pi(object.randomWeight);
              }
            }

            // Use a while to ensure that things has required and is only selected once.
            for (let x = 0; x < row.buttonRandomNumber; x++) {
              const random = Math.floor(Math.random() * randomTotalWeight);
              console.log(random);

              // For each of the rows check if the choice is unique.
              for (const object of row.objects) {
                if (
                  typeof object.randomWeight === "undefined" ||
                  object.randomWeight === ""
                ) {
                  randomCumuWeight += 100;
                } else {
                  randomCumuWeight += pi(object.randomWeight);
                }
                if (random < randomCumuWeight) {
                  // Checks if the objects have all requireds.
                  activateObject(object, row, state.app);

                  break;
                }
              }
            }
          }
        } else {
          // Checks if the choice should be permanent or not.
          if (row.buttonType) {
            if (state.app.activated.includes(row.buttonId))
              state.app.activated.splice(
                state.app.activated.indexOf(row.buttonId),
                1,
              );
            else state.app.activated.push(row.buttonId);
          } else {
            state.app.activated.push(row.buttonId);
          }
        }
      });
    },
    selectedOneMore(object: Object) {
      let res: number | null = null;
      set((state: State) => {
        res = selectedOneMore(object, state.app);
      });
      return res;
    },
    selectedOneLess(object: Object) {
      let res: number | null = null;
      set((state: State) => {
        res = selectedOneLess(object, state.app);
      });
      return res;
    },
    setObjectSelectable(object: Object) {
      set((state: State) => {
        object = findObject(object, state.app);
        object.isNotSelectable = true;
      });
    },
    multiplyOrDivide(object: Object) {
      set((state: State) => {
        object = findObject(object, state.app);
        // TODO if object Multiplies or divides.
        // This will divide a point type when activated.
        if (object.multiplyPointtypeIsOnCheck) {
          // used when checing if
          object.multiplyPointtypeIsOnCheck = false;
          for (const pointType of state.app.pointTypes) {
            if (pointType.id == object.pointTypeToMultiply) {
              pointType.startingSum =
                pi(pointType.startingSum) - pi(object.startingSumAtMultiply);
              //pointType.startingSum /= object.multiplyWithThis;
              console.log("Multiply:" + object.startingSumAtMultiply);
            }
          }
        }

        // This will multiply a point type when activated.
        if (object.dividePointtypeIsOnCheck) {
          // used when checing if
          object.dividePointtypeIsOnCheck = false;
          for (const pointType of state.app.pointTypes) {
            if (pointType.id == object.pointTypeToDivide) {
              pointType.startingSum =
                pi(pointType.startingSum) * pi(object.divideWithThis);
              console.log("Multiply:");
            }
          }
        }
      });
    },
    setImagePrefix(prefix: string) {
      set((state: State) => {
        state.imagePrefix = prefix;
      });
    },
    setImage(
      obj: App["rows"][0] | Object | Object["addons"][0],
      image: string,
      aspectWidth?: number,
      aspectHeight?: number,
      tooltip?: string,
    ) {
      set((state: State) => {
        obj = findObj(obj, state.app);
        const objRow = findObjRow(obj, state.app);
        if (aspectWidth && aspectHeight) {
          objRow.defaultAspectWidth = aspectWidth;
          objRow.defaultAspectHeight = aspectHeight;
        }
        obj.image = image;
        obj.imageSourceTooltip = tooltip;
      });
    },
    setActivatedList(activatedList: string) {
      set((state: State) => {
        const app = state.app;
        const array = activatedList.split(",");
        let number = 0;
        app.activated = array;
        // For each of the rows.
        for (const row of app.rows) {
          // Turns of edit-mode on all rows.
          row.isEditModeOn = false;
          // For each of the objects in a row.
          for (const object of row.objects) {
            if (app.activated.includes(object.id)) {
              object.isActive = true;
              row.currentChoices++;

              // For each of the scores in an object.
              for (const score of object.scores) {
                for (const pointType of app.pointTypes) {
                  // If the score is of this point-type.
                  if (
                    pointType.id === score.id &&
                    score.requireds.length === 0
                  ) {
                    score.isActive = true;
                    pointType.startingSum =
                      pi(pointType.startingSum) - pi(score.value);
                  }
                }
              }
            }
          }
        }

        // Is needed to add points from scores with requirements after all other stuff has been done.
        for (const row of app.rows) {
          for (const object of row.objects) {
            if (app.activated.includes(object.id)) {
              for (const score of object.scores) {
                for (const pointType of app.pointTypes) {
                  if (
                    pointType.id === score.id &&
                    score.requireds.length > 0 &&
                    checkRequireds(app, score)
                  ) {
                    score.isActive = true;
                    pointType.startingSum =
                      pi(pointType.startingSum) - pi(score.value);
                  }
                }
              }
            }
          }
        }

        // Cleans the array and imports a new one.
        for (const row of app.rows) {
          for (const object of row.objects) {
            // Check if the object is a Multiple
            if (object.isSelectableMultiple) {
              // Then check if it is in the array
              for (const el of array) {
                if (object.id === el.split("/ON#")[0]) {
                  // Increment/Decrement
                  number = pi(el.split("/ON#")[1]);
                  if (number > 0) {
                    for (let nx = 0; nx < number; nx++) {
                      selectedOneMore(object, app);
                    }
                  } else if (number < 0) {
                    for (let nd = 0; nd < number * -1; nd++) {
                      selectedOneLess(object, app);
                    }
                  }
                }
              }
            } else if (object.isImageUpload) {
              for (const el of array) {
                if (object.id === el.split("/IMG#")[0]) {
                  object.image = el.split("/IMG#")[1].replaceAll("/CHAR#", ",");
                }
              }
            }
          }
        }
        console.log(
          array.filter((el) => !el.includes("/ON#") && !el.includes("/IMG#")),
        );
      });
    },
  })),
);
