export default function ImageCYOA() {
  return <></>;
}
// <template>
//   <div style="text-align: center" :style="rowBody">
//     <v-card class="my-n2">
//       <v-toolbar v-if="row.isEditModeOn" class="grey lighten-3" dense flat>
//         <v-spacer></v-spacer>
//
//         <!-- Create new object icon -->
//         <v-tooltip bottom open-delay="1000">
//           <template v-slot:activator="{ on }">
//             <v-btn icon v-on="on">
//               <v-icon @click="createNewObject(row)">mdi-file-plus</v-icon>
//             </v-btn>
//           </template>
//           <span>Create New Object</span>
//         </v-tooltip>
//
//         <!-- Create new requirement icon -->
//         <v-tooltip v-for="button in rowIconButtons" :key="button.index" bottom open-delay="1000">
//           <template v-slot:activator="{ on }">
//             <v-btn icon v-on="on">
//               <v-icon @click="currentComponent = button.component">{{
//                 button.icon
//               }}</v-icon>
//             </v-btn>
//           </template>
//           <span>{{ button.text }}</span>
//         </v-tooltip>
//       </v-toolbar>
//
//       <v-row v-if="row.isEditModeOn">
//         <!-- The upload of Image -->
//         <v-row class="pa-2 ma-2">
//           <v-col class="col-md-2 pa-2">
//             <v-col class="pa-0" v-if="!row.isButtonRow">
//               <v-img @click="currentComponent = 'appImageUpload'" max-height="140" max-width="300" contain
//                 :src="row.image"></v-img>
//
//               <v-btn class="mb-2" @click="currentComponent = 'appImageUpload'" style="color: black">Change Image</v-btn>
//             </v-col>
//
//             <v-col class="pa-0" v-else>
//               <!--The button that opens button settings-->
//
//               <v-btn class="mb-2" @click="currentComponent = 'appButtonSettings'" style="color: black">Open Button
//                 Settings</v-btn>
//             </v-col>
//           </v-col>
//
//           <v-col class="col-md-2 pa-2">
//             <!-- switch that let the user change between an image and button -->
//             <v-col>
//               <v-switch class="mt-n2 mb-n6 ms-3" v-model="row.isButtonRow" :label="`Button?`"></v-switch>
//             </v-col>
//
//             <v-col>
//               <v-switch class="mt-n2 mb-n6 ms-3" v-model="row.isInfoRow" :label="`Non-activatable?`"></v-switch>
//             </v-col>
//
//             <v-col>
//               <v-switch class="mt-n2 mb-n6 ms-3" v-model="row.isResultRow" :label="`Selected Choices?`"></v-switch>
//             </v-col>
//
//             <v-col>
//               <v-switch class="mt-n2 mb-n6 ms-3" v-model="row.width" :label="`Half of the screen?`"></v-switch>
//             </v-col>
//
//             <v-select hide-details deletable-chips chips v-if="row.isResultRow" :items="groups"
//               v-model="row.resultGroupId" item-text="name" item-value="id" filled label="Selected Choices from Group Id"
//               placeholder="All Rows and Objects"></v-select>
//           </v-col>
//
//           <v-col class="col-md-2 pa-2">
//             <v-select :items="templates" v-model="row.template" item-text="text" item-value="value" filled
//               label="Template"></v-select>
//
//             <v-text-field label="Row Title" v-model="row.title" placeholder="Placeholder" filled></v-text-field>
//
//             <v-text-field hide-details type="number" label="Allowed Choices" v-model.number="row.allowedChoices"
//               placeholder="Placeholder" filled></v-text-field>
//           </v-col>
//
//           <v-col class="col-md-2 pa-2">
//             <v-select hide-details :items="objectWidths" v-model="row.objectWidth" item-text="text" item-value="value"
//               filled label="Objects Per Row"></v-select>
//
//             <v-select hide-details :items="justify" v-model="row.rowJustify" item-text="value" item-value="value" filled
//               label="Choices Justify"></v-select>
//
//             <v-text-field hide-details label="Row Id" v-model="row.id" placeholder="Placeholder" filled></v-text-field>
//
//             <v-text-field hide-details type="number" label="Selected Choices" v-model.number="row.currentChoices"
//               placeholder="Placeholder" filled></v-text-field>
//           </v-col>
//
//           <v-col class="col-md-4 pa-2">
//             <v-textarea hide-details filled rows="8" label="Row Text" v-model="row.titleText"></v-textarea>
//           </v-col><v-row cols="12">
//             <v-col>
//               <v-switch class="mt-n2 mb-n6 ms-3" v-model="row.deselectChoices"
//                 :label="`Deselects choices when Row lack requirements?`"></v-switch>
//             </v-col>
//             <v-col>
//               <v-switch v-if="row.isResultRow" class="mt-n2 mb-n6 ms-3" v-model="row.choicesShareTemplate"
//                 :label="`Choices will all be 'Template Top' and Row Width`"></v-switch></v-col>
//             <v-col>
//               <v-switch v-if="row.isResultRow" class="mt-n2 mb-n6 ms-3" v-model="row.textIsRemoved"
//                 :label="`Remove the text of the choices.`"></v-switch></v-col>
//             <v-col>
//               <v-switch v-if="row.isResultRow" class="mt-n2 mb-n6 ms-3" v-model="row.resultShowRowTitle"
//                 :label="`Show the title of the row in the choice.`"></v-switch></v-col>
//           </v-row>
//         </v-row>
//       </v-row>
//
//       <!-- Shows the requirements, allows the user to delete or change its id -->
//       <v-row class="mx-0" v-if="row.isEditModeOn">
//         <v-col v-for="(required, index) in row.requireds" :key="required.index">
//           <ObjectRequirement :isEditModeOn="isEditModeOn" :required="required" @requiredWasChanged="required = $event">
//           </ObjectRequirement>
//
//           <v-btn @click="deleteEvent(index, row.requireds)" style="color: black">Delete</v-btn>
//         </v-col>
//       </v-row>
//     </v-card>
//
//     <!-- Preview and editable objects -->
//     <span>
//       <!-- The templates of the preview, show if !isEditModeOn and all requireds is selected. -->
//       <div :style="row.title != '' && row.text != '' ? rowBackground : ''"
//         v-if="!row.isEditModeOn && checkIfDeselect(row)">
//         <!-- Tche div that will show of the preview -->
//         <div class="col pa-0" v-if="row.template == 1 || window.width < 1000">
//           <!-- If Image is activated -->
//
//           <v-tooltip v-if="
//             !row.isButtonRow &&
//             row.imageSourceTooltip !== '' &&
//             typeof row.imageSourceTooltip !== 'undefined'
//           " top open-delay="1500">
//             <template v-slot:activator="{ on }">
//               <img v-on="on" :style="row.image != '' ? rowImage : ''" :src="row.image" />
//             </template>
//             <span>{{ row.imageSourceTooltip }}</span>
//           </v-tooltip>
//
//           <img v-else-if="!row.isButtonRow" :style="row.image != '' ? rowImage : ''" :src="row.image" />
//
//           <!-- If button is activated -->
//           <v-btn :disabled="(!row.buttonType && this.activated.includes(this.row.buttonId)) ||
//             isButtonPressable
//             " @click="buttonActivate" :style="rowButton" v-else>{{ row.buttonText }}</v-btn>
//
//           <!-- Title or text -->
//           <h2 :style="rowTitle" class="mb-0" v-html="$sanitize(replaceRowTitle, sanitizeArg)" v-if="row.title !== ''">
//           </h2>
//           <p :style="rowText" class="mb-0" style="white-space: pre-line" v-html="$sanitize(replaceRowText, sanitizeArg)"
//             v-if="row.titleText !== ''"></p>
//         </div>
//
//         <!-- The div that will show of the preview -->
//         <div class="row nopadding" v-if="row.template == 2 && window.width > 1000">
//           <!-- Text and title -->
//           <div class="col-6 nopadding">
//             <h2 :style="rowTitle" class="mb-0" v-html="$sanitize(replaceRowTitle, sanitizeArg)" v-if="row.title !== ''">
//             </h2>
//             <p :style="rowText" class="mb-0" style="white-space: pre-line"
//               v-html="$sanitize(replaceRowText, sanitizeArg)" v-if="row.titleText !== ''"></p>
//           </div>
//
//           <!-- Image or button -->
//           <div class="col-6 nopadding">
//             <v-tooltip v-if="
//               !row.isButtonRow &&
//               row.imageSourceTooltip !== '' &&
//               typeof row.imageSourceTooltip !== 'undefined'
//             " top open-delay="1500">
//               <template v-slot:activator="{ on }">
//                 <img v-on="on" :style="row.image != '' ? rowImage : ''" :src="row.image" />
//               </template>
//               <span>{{ row.imageSourceTooltip }}</span>
//             </v-tooltip>
//
//             <img v-else-if="!row.isButtonRow" :style="row.image != '' ? rowImage : ''" :src="row.image" />
//
//             <!-- If button is activated -->
//             <v-btn :disabled="(!row.buttonType &&
//               this.activated.includes(this.row.buttonId)) ||
//               isButtonPressable
//               " @click="buttonActivate" :style="rowButton" v-else>{{ row.buttonText }}</v-btn>
//           </div>
//         </div>
//
//         <!-- The div that will show of the preview -->
//         <div class="row nopadding" v-if="row.template == 3 && window.width > 1000">
//           <div class="col-6 nopadding">
//             <!-- If Image is activated -->
//             <v-tooltip v-if="
//               !row.isButtonRow &&
//               row.imageSourceTooltip !== '' &&
//               typeof row.imageSourceTooltip !== 'undefined'
//             " top open-delay="1500">
//               <template v-slot:activator="{ on }">
//                 <img v-on="on" :style="row.image != '' ? rowImage : ''" :src="row.image" />
//               </template>
//               <span>{{ row.imageSourceTooltip }}</span>
//             </v-tooltip>
//
//             <img v-else-if="!row.isButtonRow" :style="row.image != '' ? rowImage : ''" :src="row.image" />
//
//             <!-- If button is activated -->
//             <v-btn :disabled="(!row.buttonType &&
//               this.activated.includes(this.row.buttonId)) ||
//               isButtonPressable
//               " ref="rowBtn" @click="buttonActivate" :style="rowButton" v-else>{{ row.buttonText }}</v-btn>
//           </div>
//           <div class="col-6 nopadding">
//             <h2 :style="rowTitle" class="mb-0" v-html="$sanitize(replaceRowTitle, sanitizeArg)" v-if="row.title !== ''">
//             </h2>
//             <p :style="rowText" class="mb-0" style="white-space: pre-line"
//               v-html="$sanitize(replaceRowText, sanitizeArg)" v-if="row.titleText !== ''"></p>
//           </div>
//         </div>
//
//         <!-- The div that will show of the preview -->
//         <div class="col nopadding" v-if="row.template == 4">
//           <h2 :style="rowTitle" class="mb-0" v-if="row.title !== ''" v-html="$sanitize(replaceRowTitle, sanitizeArg)">
//           </h2>
//           <p :style="rowText" class="mb-0" style="white-space: pre-line" v-html="$sanitize(replaceRowText, sanitizeArg)"
//             v-if="row.titleText !== ''"></p>
//           <!-- If Image is activated -->
//           <v-tooltip v-if="
//             !row.isButtonRow &&
//             row.imageSourceTooltip !== '' &&
//             typeof row.imageSourceTooltip !== 'undefined'
//           " top open-delay="1500">
//             <template v-slot:activator="{ on }">
//               <img v-on="on" :style="row.image != '' ? rowImage : ''" :src="row.image" />
//             </template>
//             <span>{{ row.imageSourceTooltip }}</span>
//           </v-tooltip>
//
//           <img v-else-if="!row.isButtonRow" :style="row.image != '' ? rowImage : ''" :src="row.image" />
//
//           <!-- If button is activated -->
//           <v-btn :disabled="(!row.buttonType && this.activated.includes(this.row.buttonId)) ||
//             isButtonPressable
//             " ref="rowBtn" @click="buttonActivate" :style="rowButton" v-else>{{ row.buttonText }}</v-btn>
//         </div>
//       </div>
//
//       <!-- Where the object-components are created and listed. -->
//       <v-row v-if="!row.isResultRow" class="display-flex row objectRow pa-0 ma-0" :justify="row.rowJustify">
//         <!-- If objectWidth in the object is empty, use the row.objectWidth -->
//         <v-col v-show="checkRequireds(object) ||
//           row.isEditModeOn || (object.isPrivateStyling ?
//             object.reqFilterVisibleIsOn : !styling.reqFilterVisibleIsOn)
//           " :class="window.width > 500
//             ? window.width > 1000
//               ? object.objectWidth == ''
//                 ? row.objectWidth
//                 : object.objectWidth
//               : 'col-6'
//             : 'col-12'
//             " class="nopadding" v-for="object in row.objects" :key="object.index">
//           <AppObject :class="objectHeight" :isEditModeOn="row.isEditModeOn" :activated="activated" :object="object"
//             :row="row" :objects="row.objects" @objectWasChanged="object = $event"></AppObject>
//         </v-col>
//       </v-row>
//
//       <!-- Where the object-components are created and listed. -->
//       <!-- If objectWidth in the object is empty, use the row.objectWidth -->
//       <v-row :justify="row.rowJustify" v-else class="display-flex row objectRow">
//         <!-- If objectWidth in the object is empty, use the row.objectWidth -->
//         <v-col class="nopadding" v-for="object in resultArray" :key="object.index" :class="object.objectWidth == '' || row.choicesShareTemplate
//           ? row.objectWidth
//           : object.objectWidth
//           ">
//           <AppObject :class="objectHeight" :isEditModeOn="row.isEditModeOn" :activated="activated" :object="object"
//             :row="row" :objects="row.objects" @objectWasChanged="object = $event"></AppObject>
//         </v-col>
//       </v-row>
//     </span>
//
//     <!-- This is the holder that holds the requirement-component -->
//     <component :is="currentComponent" :row="row" @rowWasChanged="row = $event"
//       @cleanCurrentComponent="currentComponent = $event"></component>
//   </div>
// </template>
//
// <script>
// // The List Objects.
// import AppObject from "./Object.vue";
//
// import ObjectRequirement from "./object/ObjectRequirement.vue";
// // Holds the buttons for adding requirements.
// import AppRequirement from "./row/Requirement.vue";
// // The Image-upload where one can upload the row image.
// import AppImageUpload from "./row/ImageUpload.vue";
// // The row settings menu.
// import AppRowSettings from "./row/RowSettings.vue";
// // The button settings menu.
// import AppButtonSettings from "./row/ButtonSettings.vue";
//
// import AppObjectList from "./row/ObjectList.vue";
//
// export default {
//   props: {
//     row: Object,
//     type: String,
//   },
//   data: function () {
//     return {
//       window: {
//         width: 0,
//         height: 0,
//       },
//       // The select that decides the template of the row.
//       templates: [
//         { text: "Image Top", value: "1" },
//         { text: "Image Right", value: "2" },
//         { text: "Image Left", value: "3" }, // 5 per row.
//         { text: "Image Bottom", value: "4" },
//       ],
//       justify: [
//         { value: "start" },
//         { value: "center" },
//         { value: "end" },
//         { value: "space-around" },
//         { value: "space-between" },
//       ],
//       pointReqOperators: [
//         { text: "+ More than", value: "1" },
//         { text: "+= More or equal", value: "2" },
//         { text: "= Equal to", value: "3" },
//         { text: "-= Less or equal", value: "4" },
//         { text: "- Less than", value: "5" },
//       ],
//       // Used in the for loop that lists icons button in the row.
//       rowIconButtons: [
//         {
//           component: "AppObjectList",
//           icon: "mdi-format-list-bulleted",
//           text: "List of objects",
//         },
//         {
//           component: "appRequirement",
//           icon: "mdi-key-plus",
//           text: "Create Requirement",
//         },
//         {
//           component: "appRowSettings",
//           icon: "mdi-decagram",
//           text: "Open Row Settings",
//         },
//       ],
//       // Is edit mode on for this row?
//       isEditModeOn: true,
//       // The current opened component in the row.
//       currentComponent: "",
//       activeObjectList: [],
//       sanitizeArg: {
//         allowedTags: [
//           "address",
//           "article",
//           "aside",
//           "footer",
//           "header",
//           "h1",
//           "h2",
//           "h3",
//           "h4",
//           "h5",
//           "h6",
//           "hgroup",
//           "main",
//           "nav",
//           "section",
//           "blockquote",
//           "dd",
//           "div",
//           "dl",
//           "dt",
//           "figcaption",
//           "figure",
//           "hr",
//           "li",
//           "main",
//           "ol",
//           "p",
//           "pre",
//           "ul",
//           "a",
//           "abbr",
//           "b",
//           "bdi",
//           "bdo",
//           "br",
//           "cite",
//           "code",
//           "data",
//           "dfn",
//           "em",
//           "i",
//           "kbd",
//           "mark",
//           "q",
//           "rb",
//           "rp",
//           "rt",
//           "rtc",
//           "ruby",
//           "s",
//           "samp",
//           "small",
//           "span",
//           "strong",
//           "sub",
//           "sup",
//           "time",
//           "u",
//           "var",
//           "wbr",
//           "caption",
//           "col",
//           "colgroup",
//           "table",
//           "tbody",
//           "td",
//           "tfoot",
//           "th",
//           "thead",
//           "tr",
//         ],
//         allowedAttributes: {
//           p: ["style"],
//           b: ["style"],
//           span: ["style"],
//           strong: ["style"],
//         },
//         allowedStyles: {
//           "*": {
//             // Match HEX and RGB
//             color: [
//               /^#(0x)?[0-9a-f]+$/i,
//               /^[A-Za-z]+$/,
//               /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
//             ],
//             "text-align": [/^left$/, /^right$/, /^center$/],
//             // Match any number with px, em, or %
//             "font-size": [/^\d+(?:px|em|%)$/],
//           },
//           p: {
//             "font-size": [/^\d+rem$/],
//           },
//         },
//       },
//     };
//   },
//   components: {
//     AppObject,
//     AppRequirement,
//     AppImageUpload,
//     AppRowSettings,
//     AppObjectList,
//     ObjectRequirement,
//     AppButtonSettings,
//   },
//   created() {
//     window.addEventListener("resize", this.handleResize);
//     this.handleResize();
//   },
//   destroyed() {
//     window.removeEventListener("resize", this.handleResize);
//   },
//   computed: {
//     objectWidths() {
//       return this.$store.state.objectWidths;
//     },
//     // Computes the styles for the title-text and the under-text
//     rowTitle() {
//       return (
//         'font-family: "' +
//         this.styling.rowTitle +
//         '";' +
//         "font-size: " +
//         this.styling.rowTitleTextSize +
//         "%;" +
//         "text-align: " +
//         this.styling.rowTitleAlign +
//         ";" +
//         "color: " +
//         this.styling.rowTitleColor +
//         ";"
//       );
//     },
//     styling() {
//       if (this.row.isPrivateStyling) return this.row.styling;
//       else return this.$store.state.app.styling;
//     },
//     resultArray() {
//       let objectArray = [];
//       let x, i;
//
//       if (this.type == "standard") {
//         // For each chapter.
//         for (let i = 0; i < this.allChapters.length; i++) {
//           // For each page.
//           for (let j = 0; j < this.allChapters[i].pages.length; j++) {
//             // Check out this page, send in value of end-id.
//             this.findAllActiveObjects(
//               this.allChapters[i].pages[j],
//               this.allChapters[i]
//             ); // ID is string like «30»
//           }
//         }
//         objectArray = this.activeObjectList;
//       } else {
//         // If groups are not used.
//         if (this.row.resultGroupId == "" || this.row.resultGroupId == null) {
//           for (i = 0; i < this.rows.length; i++) {
//             for (x = 0; x < this.rows[i].objects.length; x++) {
//               // If the object is active.
//               if (this.rows[i].objects[x].isActive) {
//                 objectArray.push(this.rows[i].objects[x]);
//               } else if (this.rows[i].objects[x].isImageUpload) {
//                 if (this.rows[i].objects[x].image.length > 5) {
//                   objectArray.push(this.rows[i].objects[x]);
//                 }
//                 // TODO
//               } else if (this.rows[i].objects[x].isSelectableMultiple) {
//                 if (
//                   typeof this.rows[i].objects[x].multipleUseVariable !==
//                   "undefined"
//                 ) {
//                   if (this.rows[i].objects[x].multipleUseVariable > 0) {
//                     objectArray.push(this.rows[i].objects[x]);
//                   }
//                 }
//               }
//             }
//           }
//         } else {
//           // For all of the objects in the rows.
//           for (i = 0; i < this.rows.length; i++) {
//             for (x = 0; x < this.rows[i].objects.length; x++) {
//               // If the object is active...
//               if (this.rows[i].objects[x].isActive) {
//                 // Move trough all groups...
//                 for (let n = 0; n < this.groups.length; n++) {
//                   if (
//                     this.row.resultGroupId == this.rows[i].resultGroupId &&
//                     this.rows[i] != this.row &&
//                     this.groups[n].id == this.rows[i].resultGroupId
//                   ) {
//                     objectArray.push(this.rows[i].objects[x]);
//                   } else {
//                     for (
//                       let a = 0;
//                       a < this.rows[i].objects[x].groups.length;
//                       a++
//                     ) {
//                       if (
//                         this.rows[i].objects[x].groups[a].id ==
//                         this.row.resultGroupId &&
//                         this.groups[n].id == this.row.resultGroupId
//                       ) {
//                         objectArray.push(this.rows[i].objects[x]);
//                       }
//                     }
//                   }
//                 }
//               } else if (
//                 this.rows[i].objects[x].isImageUpload &&
//                 this.rows[i].objects[x].image.length > 5
//               ) {
//                 for (let n = 0; n < this.groups.length; n++) {
//                   if (
//                     this.row.resultGroupId == this.rows[i].resultGroupId &&
//                     this.rows[i] != this.row &&
//                     this.groups[n].id == this.rows[i].resultGroupId
//                   ) {
//                     objectArray.push(this.rows[i].objects[x]);
//                   } else {
//                     for (
//                       let a = 0;
//                       a < this.rows[i].objects[x].groups.length;
//                       a++
//                     ) {
//                       if (
//                         this.rows[i].objects[x].groups[a].id ==
//                         this.row.resultGroupId &&
//                         this.groups[n].id == this.row.resultGroupId
//                       ) {
//                         objectArray.push(this.rows[i].objects[x]);
//                       }
//                     }
//                   }
//                 }
//               } else if (this.rows[i].objects[x].isSelectableMultiple) {
//                 console.log("Mul");
//                 if (
//                   typeof this.rows[i].objects[x].multipleUseVariable !==
//                   "undefined"
//                 ) {
//                   if (this.rows[i].objects[x].multipleUseVariable > 0) {
//                     // Move trough all groups...
//                     for (let n = 0; n < this.groups.length; n++) {
//                       if (
//                         this.row.resultGroupId == this.rows[i].resultGroupId &&
//                         this.rows[i] != this.row &&
//                         this.groups[n].id == this.rows[i].resultGroupId
//                       ) {
//                         objectArray.push(this.rows[i].objects[x]);
//                       } else {
//                         for (
//                           let a = 0;
//                           a < this.rows[i].objects[x].groups.length;
//                           a++
//                         ) {
//                           if (
//                             this.rows[i].objects[x].groups[a].id ==
//                             this.row.resultGroupId &&
//                             this.groups[n].id == this.row.resultGroupId
//                           ) {
//                             objectArray.push(this.rows[i].objects[x]);
//                           }
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//       return objectArray;
//     },
//     rowBody() {
//       let style =
//         "margin-top: " +
//         this.styling.rowBodyMarginTop +
//         "px;" +
//         "margin-bottom:" +
//         this.styling.rowBodyMarginBottom +
//         "px;" +
//         'background-image: url("' +
//         this.styling.backgroundImage +
//         '");' +
//         "background-color: " +
//         this.styling.backgroundColor +
//         ";background-repeat: repeat;";
//
//       ("; background-repeat: repeat;");
//       if (!this.row.isEditModeOn) {
//         style +=
//           "margin-left: " +
//           this.styling.rowBodyMarginSides +
//           "%;" +
//           "margin-right: " +
//           this.styling.rowBodyMarginSides +
//           "%;";
//       } else {
//         style += "margin-left: 1%;" + "margin-right: 1%;";
//       }
//
//       return style;
//     },
//     rowText() {
//       let style =
//         'font-family: "' +
//         this.styling.rowText +
//         '";' +
//         "text-align: " +
//         this.styling.rowTextAlign +
//         ";" +
//         "font-size: " +
//         this.styling.rowTextTextSize +
//         "%;" +
//         "color: " +
//         this.styling.rowTextColor +
//         ";" +
//         "padding-top: " +
//         this.styling.rowTextPaddingX +
//         "px;" +
//         "padding-bottom: " +
//         this.styling.rowTextPaddingX +
//         "px;";
//
//       if (!this.row.isEditModeOn) {
//         style +=
//           "padding-left: " +
//           this.styling.rowTextPaddingY +
//           "%;" +
//           "padding-right: " +
//           this.styling.rowTextPaddingY +
//           "%;";
//       }
//
//       return style;
//     },
//     rowButton() {
//       return (
//         "padding-left: " +
//         this.styling.rowButtonYPadding +
//         "px;" +
//         "padding-right: " +
//         this.styling.rowButtonYPadding +
//         "px;" +
//         "padding-top: " +
//         this.styling.rowButtonXPadding +
//         "px;" +
//         "padding-bottom: " +
//         this.styling.rowButtonXPadding +
//         "px;color:black;;"
//       );
//     },
//     rowBackground() {
//       let style =
//         'background-repeat: repeat; background-image: url("' +
//         this.styling.rowBackgroundImage +
//         '");' +
//         (this.styling.rowBgColorIsOn
//           ? "background-color: " + this.styling.rowBgColor + ";"
//           : "") +
//         "margin-left:" +
//         this.styling.rowMargin +
//         "%;margin-right: " +
//         this.styling.rowMargin +
//         "%;";
//
//       // Border Radius
//       let suffix = this.styling.rowBorderRadiusIsPixels ? "px" : "%";
//
//       if (this.styling.rowGradientIsOn) {
//         style += this.styling.rowGradientIsOn
//           ? ";background-image: linear-gradient(" +
//           this.styling.rowGradient +
//           ");"
//           : "";
//       }
//
//       style +=
//         "border-radius: " +
//         this.styling.rowBorderRadiusTopLeft +
//         +"" +
//         suffix +
//         " " +
//         this.styling.rowBorderRadiusTopRight +
//         +"" +
//         suffix +
//         " " +
//         this.styling.rowBorderRadiusBottomRight +
//         +"" +
//         suffix +
//         " " +
//         this.styling.rowBorderRadiusBottomLeft +
//         +"" +
//         suffix +
//         ";";
//
//       if (this.styling.rowOverflowIsOn) {
//         style += "overflow:hidden;";
//       }
//
//       if (this.styling.rowBorderIsOn) {
//         style +=
//           "border: " +
//           this.styling.rowBorderWidth +
//           "" +
//           "px " +
//           this.styling.rowBorderStyle +
//           " " +
//           this.styling.rowBorderColor +
//           "" +
//           ";";
//       }
//
//       // Drop Shadow
//       if (this.styling.rowDropShadowIsOn) {
//         style +=
//           "filter: drop-shadow(" +
//           this.styling.rowDropShadowH +
//           "px " +
//           this.styling.rowDropShadowV +
//           "px " +
//           this.styling.rowDropShadowBlur +
//           "px " +
//           this.styling.rowDropShadowColor +
//           ");";
//       }
//
//       return style;
//     },
//     rowImage() {
//       let style =
//         "width:" +
//         this.styling.rowImageWidth +
//         "%;margin-top:" +
//         this.styling.rowImageMarginTop +
//         "%;margin-bottom:" +
//         this.styling.rowImageMarginBottom +
//         "%;";
//
//       // Border Radius
//       let suffix = this.styling.rowImgBorderRadiusIsPixels ? "px" : "%";
//       style +=
//         "border-radius: " +
//         this.styling.rowImgBorderRadiusTopLeft +
//         +"" +
//         suffix +
//         " " +
//         this.styling.rowImgBorderRadiusTopRight +
//         +"" +
//         suffix +
//         " " +
//         this.styling.rowImgBorderRadiusBottomRight +
//         +"" +
//         suffix +
//         " " +
//         this.styling.rowImgBorderRadiusBottomLeft +
//         +"" +
//         suffix +
//         ";";
//
//       if (this.styling.rowImgOverflowIsOn) {
//         style += "overflow:hidden;";
//       }
//
//       if (this.styling.rowImgBorderIsOn) {
//         style +=
//           "border: " +
//           this.styling.rowImgBorderWidth +
//           "" +
//           "px " +
//           this.styling.rowImgBorderStyle +
//           " " +
//           this.styling.rowImgBorderColor +
//           "" +
//           ";";
//       }
//
//       return style;
//     },
//     rows() {
//       return this.$store.state.app.rows;
//     },
//     app() {
//       return this.$store.state.app;
//     },
//     pointTypes() {
//       return this.$store.state.app.pointTypes;
//     },
//     groups() {
//       return this.$store.state.app.groups;
//     },
//     variables() {
//       return this.$store.state.app.variables;
//     },
//     activated() {
//       return this.$store.state.app.activated;
//     },
//     allChapters() {
//       return this.$store.state.app.chapters;
//     },
//     // The object height, checks if full object height is turned on and edit-mode is off.
//     objectHeight() {
//       if (this.$store.state.app.styling.objectHeight && !this.row.isEditModeOn)
//         return "d-flex fullHeight";
//       else return "";
//     },
//     replaceRowTitle() {
//       let newObjectText = this.row.title;
//       let isPointType = false;
//
//       // TODO Add point type if it is.
//
//       if (typeof this.$store.state.app.words != "undefined") {
//         // Checks if the word is the ID of a point-type.
//         for (let r = 0; r < this.app.words.length; r++) {
//           isPointType = false;
//
//           for (let u = 0; u < this.app.pointTypes.length; u++) {
//             if (this.app.pointTypes[u].id == this.app.words[r].id) {
//               newObjectText = newObjectText.replace(
//                 new RegExp(this.app.words[r].id, "g"),
//                 this.app.pointTypes[u].startingSum
//               );
//               isPointType = true;
//             }
//           } // If its not a point-type.
//           if (!isPointType) {
//             for (let i = 0; i < this.app.words.length; i++) {
//               newObjectText = newObjectText.replace(
//                 new RegExp(this.app.words[i].id, "g"),
//                 this.app.words[i].replaceText
//               );
//             }
//           }
//         }
//       }
//       return newObjectText;
//     },
//     replaceRowText() {
//       let newObjectText = this.row.titleText;
//       let isPointType = false;
//
//       // TODO Add point type if it is.
//
//       if (typeof this.$store.state.app.words != "undefined") {
//         // Checks if the word is the ID of a point-type.
//         for (let r = 0; r < this.app.words.length; r++) {
//           isPointType = false;
//           for (let u = 0; u < this.app.pointTypes.length; u++) {
//             if (this.app.pointTypes[u].id == this.app.words[r].id) {
//               newObjectText = newObjectText.replace(
//                 new RegExp(this.app.words[r].id, "g"),
//                 this.app.pointTypes[u].startingSum
//               );
//               isPointType = true;
//             }
//           } // If its not a point-type.
//           if (!isPointType) {
//             for (let i = 0; i < this.app.words.length; i++) {
//               newObjectText = newObjectText.replace(
//                 new RegExp(this.app.words[i].id, "g"),
//                 this.app.words[i].replaceText
//               );
//             }
//           }
//         }
//       }
//       return newObjectText;
//     },
//     isButtonPressable() {
//       if (this.row.onlyIfNoChoices && this.row.currentChoices !== 0) {
//         return true;
//       } else {
//         return false;
//       }
//     },
//   },
//   methods: {
//     handleResize() {
//       this.window.width = window.innerWidth;
//       this.window.height = window.innerHeight;
//     },
//     // Used to find the backpack items in standard only.
//     findAllActiveObjects(obj, chapter) {
//       // If the id of child is equal to the redirect end-id.
//       for (let x = 0; x < obj.app.rows.length; x++) {
//         for (let y = 0; y < obj.app.rows[x].objects.length; y++) {
//           if (obj.app.rows[x].objects[y].isActive) {
//             this.activeObjectList.push(obj.app.rows[x].objects[y]);
//           }
//         }
//       }
//
//       if (obj && obj.children && obj.children.length > 0) {
//         // For each child page.
//         for (let j = 0; j < obj.children.length; j++) {
//           this.findAllActiveObjects(obj.children[j], chapter);
//         }
//       }
//     },
//     // Changes the stored image when a image is uploaded.
//     // Creates a new object in the row.
//     createNewObject() {
//       // Creates the id
//       var text = "";
//       var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
//       for (var i = 0; i < 4; i++)
//         text += charset.charAt(Math.floor(Math.random() * charset.length));
//
//       this.row.objects.push({
//         id: text,
//         title: this.app.defaultChoiceTitle,
//         text: this.app.defaultChoiceText,
//         image: "",
//         template: 1,
//         objectWidth: "",
//         isActive: false,
//         isVisible: true,
//         multipleUseVariable: 0,
//         defaultAspectWidth: this.row.defaultAspectWidth,
//         defaultAspectHeight: this.row.defaultAspectHeight,
//         requireds: [], // Holds the required's.
//         addons: [], // Holds the created addons.
//         scores: [], // Holds the created scores.
//         groups: [],
//       });
//     },
//     buttonActivate() {
//       if (this.row.btnPointAddon && this.row.buttonTypeRadio == 'sumaddon') {
//         //If Random
//         let random = Math.floor(
//           Math.random() * (this.row.randomMax - this.row.randomMin) +
//           this.row.randomMin
//         );
//
//         for (let c = 0; c < this.app.pointTypes.length; c++) {
//           if (this.app.pointTypes[c].id == this.row.pointTypeRandom) {
//             this.app.pointTypes[c].startingSum += random;
//           }
//         }
//       } else {
//         // If the button is the type that will select X random or add variable to activated-array.
//         if (this.row.buttonRandom) {
//           let randomArray = [];
//           let i;
//
//           // Is it uniform random or weighted random.
//           if (
//             !this.row.isWeightedRandom ||
//             typeof this.row.isWeightedRandom == "undefined"
//           ) {
//             // For each of the random choices that will be selected.
//             for (i = 0; i < this.row.buttonRandomNumber; i++) {
//               let random = Math.floor(Math.random() * this.row.objects.length);
//               let randomObject = this.row.objects[random];
//
//               // To stop an unending while loop.
//               let max_tries = 100;
//               let tryNumber = 0;
//               let foundOne = true;
//
//               // If only unselected choices is allowed to be selected.
//               if (this.row.onlyUnselectedChoices) {
//                 // While the random is not unique and the elements requireds does not fit.
//                 while (
//                   randomArray.includes(random) ||
//                   this.activated.includes(randomObject.id) ||
//                   !this.checkRequireds(randomObject) ||
//                   randomObject.isNotSelectable
//                 ) {
//                   tryNumber++;
//                   random = Math.floor(Math.random() * this.row.objects.length);
//                   randomObject = this.row.objects[random];
//
//                   // Breaks the loop if the number of objects if fewer or equal to the randomNumber.
//                   // Or if max tries have been surpassed.
//                   if (this.row.objects.length <= i || max_tries <= tryNumber) {
//                     foundOne = false;
//                     break;
//                   }
//                 }
//               } else {
//                 // While the random is not unique and the elements requireds does not fit.
//                 while (
//                   randomArray.includes(random) ||
//                   !this.checkRequireds(randomObject) ||
//                   randomObject.isNotSelectable
//                 ) {
//                   tryNumber++;
//                   random = Math.floor(Math.random() * this.row.objects.length);
//                   randomObject = this.row.objects[random];
//
//                   // Breaks the loop if the number of objects if fewer or equal to the randomNumber.
//                   // Or if max tries have been surpassed.
//                   if (this.row.objects.length <= i || max_tries <= tryNumber) {
//                     break;
//                   }
//                 }
//               }
//
//               if (foundOne) {
//                 // Push random into random-array.
//                 randomArray.push(random);
//
//                 // Checks if the objects have all requireds.
//                 this.activateObject(randomObject, this.row);
//               }
//             }
//
//             // The random is weighted.
//           } else {
//             var randomTotalWeight = 0,
//               randomCumuWeight = 0;
//             // sum up the weights
//             for (i = 0; i < this.row.objects.length; i++) {
//               // If the number is default, not yet set
//               if (
//                 typeof this.row.objects[i].randomWeight == "undefined" ||
//                 this.row.objects[i].randomWeight == ""
//               ) {
//                 randomTotalWeight += 100;
//               } else {
//                 randomTotalWeight += parseInt(this.row.objects[i].randomWeight);
//               }
//             }
//
//             // Use a while to ensure that things has required and is only selected once.
//             for (var x = 0; x < this.row.buttonRandomNumber; x++) {
//               var random = Math.floor(Math.random() * randomTotalWeight);
//               console.log(random);
//
//               // For each of the rows check if the choice is unique.
//               for (i = 0; i < this.row.objects.length; i++) {
//                 if (
//                   typeof this.row.objects[i].randomWeight == "undefined" ||
//                   this.row.objects[i].randomWeight == ""
//                 ) {
//                   randomCumuWeight += 100;
//                 } else {
//                   randomCumuWeight += parseInt(
//                     this.row.objects[i].randomWeight
//                   );
//                 }
//                 if (random < randomCumuWeight) {
//                   // Checks if the objects have all requireds.
//                   this.activateObject(this.row.objects[i], this.row);
//
//                   break;
//                 }
//               }
//             }
//           }
//         } else if (!this.row.buttonRandom) {
//           // Checks if the choice should be permanent or not.
//           if (this.row.buttonType) {
//             this.activated.includes(this.row.buttonId)
//               ? this.activated.splice(
//                 this.activated.indexOf(this.row.buttonId),
//                 1
//               )
//               : this.activated.push(this.row.buttonId);
//           } else {
//             this.activated.push(this.row.buttonId);
//           }
//         }
//       }
//     },
//     // Checks if row deselect is on.
//     checkIfDeselect(object) {
//       let checkRequireds = this.$store.getters.checkRequireds(object);
//       if (object.deselectChoices && !checkRequireds) {
//         for (var no = 0; no < object.objects.length; no++) {
//           if (object.objects[no].isActive) {
//             this.activateObject(object.objects[no], object);
//           }
//         }
//       }
//
//       return checkRequireds;
//     },
//     // Checks if the id's and points allow this object to be selected.
//     checkRequireds(object) {
//       return this.$store.getters.checkRequireds(object);
//     },
//     deleteEvent: function (index, array) {
//       array.splice(index, 1);
//     },
//     checkPoints(object) {
//       let check = true;
//       // Then make the one that
//
//       for (var o = 0; o < object.scores.length; o++) {
//         if (
//           this.checkRequireds(object.scores[o]) &&
//           !object.scores[o].isActive
//         ) {
//           // Goes trough all of the scores and check which is fits.
//           for (var x = 0; x < this.app.pointTypes.length; x++) {
//             if (
//               this.app.pointTypes[x].id == object.scores[o].id &&
//               this.app.pointTypes[x].belowZeroNotAllowed
//             ) {
//               if (
//                 this.app.pointTypes[x].startingSum -
//                 parseInt(object.scores[o].value) <
//                 0
//               ) {
//                 check = false;
//               }
//             }
//           }
//           // } else {}
//         }
//       }
//
//       return check;
//     },
//     // When someone clicks on a object this process needs to happen.
//     // When someone clicks on a object this process needs to happen.
//     activateObject(object, row) {
//       let hasRequireds = this.checkRequireds(object);
//       let hasPoints = this.checkPoints(object);
//
//       // Will here run trugh all the scores, and check if there is enough
//       // 1. Find the type of points and how many there is.
//       // 2. take the points off, or add.
//
//       // Used to make the activated change when a selected is pressed.
//       if (
//         row.currentChoices + 1 > row.allowedChoices &&
//         !object.isActive &&
//         row.allowedChoices != 0
//       ) {
//         // For each of the objects in the row.
//         // Check if the number of allowed choices allows it.
//         for (var n = 0; n < row.objects.length; n++) {
//           if (
//             row.objects[n].isActive &&
//             row.currentChoices + 1 > row.allowedChoices
//           ) {
//             this.activateObject(row.objects[n], row);
//           }
//         }
//       }
//
//       // If hasRequireds is true, and currentchoices is not above allowedChoices.
//       if (
//         hasRequireds &&
//         hasPoints &&
//         (row.currentChoices < row.allowedChoices || row.allowedChoices == 0)
//       ) {
//         // If the array does not have this id-from before of, turn on.
//         if (!this.activated.includes(object.id)) {
//           // Adds the object-id into the
//
//           // Then make the one that
//           for (var o = 0; o < object.scores.length; o++) {
//             if (
//               this.checkRequireds(object.scores[o]) &&
//               !object.scores[o].isActive
//             ) {
//               // Goes trough all of the scores and check which is fits.
//               for (var x = 0; x < this.app.pointTypes.length; x++) {
//                 if (this.app.pointTypes[x].id == object.scores[o].id) {
//                   this.app.pointTypes[x].startingSum -= parseInt(
//                     object.scores[o].value
//                   );
//                   object.scores[o].isActive = true;
//                 }
//               }
//               // } else {}
//             }
//           }
//
//           // Is the FUNCTIONS, happens when the object is selected.
//           // ------------------------------------------------------
//
//           var i, v, c, m;
//
//           // This activates cleaning if the function is activated.
//           if (object.cleanACtivatedOnSelect) {
//             this.cleanActivated();
//           }
//
//           let array;
//
//           // This will force activate another choice.
//           if (
//             object.activateOtherChoice &&
//             typeof object.activateThisChoice !== "undefined"
//           ) {
//             array = object.activateThisChoice.split(",");
//
//             for (m = 0; m < array.length; m++) {
//               for (i = 0; i < this.app.rows.length; i++) {
//                 for (v = 0; v < this.app.rows[i].objects.length; v++) {
//                   if (
//                     this.app.rows[i].objects[v].id == array[m] &&
//                     !this.app.rows[i].objects[v].isActive
//                   ) {
//                     this.app.rows[i].objects[v].isNotSelectable = true;
//                     this.activateObject(
//                       this.app.rows[i].objects[v],
//                       this.app.rows[i]
//                     );
//                   } else if (
//                     this.app.rows[i].objects[v].id == array[m] &&
//                     this.app.rows[i].objects[v].isActive
//                   ) {
//                     this.app.rows[i].objects[v].isNotSelectable = true;
//                   }
//                 }
//               }
//             }
//           }
//
//           // This will deactivate another choice.
//           if (object.deactivateOtherChoice) {
//             array = object.deactivateThisChoice.split(",");
//
//             for (i = 0; i < array.length; i++) {
//               for (c = 0; c < this.app.rows.length; c++) {
//                 for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                   if (
//                     (this.app.rows[c].objects[m].id == array[i] ||
//                       this.app.rows[c].resultGroupId == array[i]) &&
//                     this.app.rows[c].objects[m].isActive
//                   ) {
//                     //this.app.rows[c].objects[m].isActive = false;
//                     this.activateObject(
//                       this.app.rows[c].objects[m],
//                       this.app.rows[c]
//                     );
//                   }
//                 }
//               }
//
//               // Checks if the id added in one of the groups in feature.
//               //let groupIdArray = this.newActivated.split(",");
//               for (let g = 0; g < this.app.groups.length; g++) {
//                 if (this.app.groups[g].id == array[i]) {
//                   for (c = 0; c < this.app.rows.length; c++) {
//                     for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                       for (
//                         let y = 0;
//                         y < this.app.rows[c].objects[m].groups.length;
//                         y++
//                       ) {
//                         if (
//                           this.app.rows[c].objects[m].groups[y].id ==
//                           array[i] &&
//                           this.app.rows[c].objects[m].isActive
//                         ) {
//                           //this.app.rows[c].objects[m].isActive = false;
//                           this.activateObject(
//                             this.app.rows[c].objects[m],
//                             this.app.rows[c]
//                           );
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//
//           let allChanges = "Scores Updated On: ";
//           // Will go trough all of the scores and see if there is any requirements with this id.
//           this.app.rows.forEach((element) => {
//             element.objects.forEach((objects) => {
//               objects.scores.forEach((scores) => {
//                 scores.requireds.forEach((requireds) => {
//                   if (objects.isActive) {
//                     if (requireds.reqId == object.id) {
//                       if (allChanges.length == 19) {
//                         allChanges += objects.title;
//                       } else {
//                         allChanges += ", " + objects.title;
//                       }
//                       this.activateObject(objects, element);
//                     } else if (
//                       JSON.stringify(requireds).includes('"' + object.id + '"')
//                     ) {
//                       if (allChanges.length == 19) {
//                         allChanges += objects.title;
//                       } else {
//                         allChanges += ", " + objects.title;
//                       }
//                       this.activateObject(objects, element);
//                     }
//                   } else if (objects.isSelectableMultiple) {
//                     if (
//                       JSON.stringify(requireds).includes('"' + object.id + '"')
//                     ) {
//                       console.log("one");
//
//                       if (
//                         allChanges.length == 19 &&
//                         objects.multipleUseVariable > 0
//                       ) {
//                         allChanges += objects.title;
//                       } else if (objects.multipleUseVariable > 0) {
//                         allChanges += ", " + objects.title;
//                       }
//
//                       for (
//                         let i = 0;
//                         i <
//                         objects.numMultipleTimesPluss -
//                         objects.numMultipleTimesMinus;
//                         i++
//                       ) {
//                         this.selectedOneLess(objects);
//                       }
//                     }
//                   }
//                 });
//               });
//             });
//           });
//           if (allChanges !== "Scores Updated On: ") {
//             this.text = allChanges + ".";
//             this.snackbar = true;
//           }
//
//           // This will multiply a point type when activated.
//           if (object.multiplyPointtypeIsOn) {
//             // used when checing if
//             object.multiplyPointtypeIsOnCheck = true;
//             for (c = 0; c < this.app.pointTypes.length; c++) {
//               if (this.app.pointTypes[c].id == object.pointTypeToMultiply) {
//                 if (!object.multiplyPointtypeIsId) {
//                   object.startingSumAtMultiply =
//                     this.app.pointTypes[c].startingSum *
//                     object.multiplyWithThis -
//                     this.app.pointTypes[c].startingSum;
//
//                   this.app.pointTypes[c].startingSum *= object.multiplyWithThis;
//                   // If the multiplyWithThis is a ID
//                 } else {
//                   for (let ca = 0; ca < this.app.pointTypes.length; ca++) {
//                     if (this.app.pointTypes[ca].id == object.multiplyWithThis) {
//                       object.startingSumAtMultiply =
//                         this.app.pointTypes[c].startingSum *
//                         this.app.pointTypes[ca].startingSum -
//                         this.app.pointTypes[c].startingSum;
//                       this.app.pointTypes[c].startingSum *= this.app.pointTypes[
//                         ca
//                       ].startingSum;
//                     }
//                   }
//                 }
//               }
//             }
//           }
//
//           // This will divide a point type when activated.
//           if (object.dividePointtypeIsOn) {
//             // used when checing if
//             object.dividePointtypeIsOnCheck = true;
//             for (c = 0; c < this.app.pointTypes.length; c++) {
//               if (this.app.pointTypes[c].id == object.pointTypeToDivide) {
//                 this.app.pointTypes[c].startingSum /= object.divideWithThis;
//                 console.log("Multiply:");
//               }
//             }
//           }
//
//           // This will change the Allowed Choices of Row.
//           if (object.addToAllowChoice) {
//             for (c = 0; c < this.app.rows.length; c++) {
//               if (object.idOfAllowChoice == this.app.rows[c].id) {
//                 this.app.rows[c].allowedChoices += object.numbAddToAllowChoice;
//
//                 if (isNaN(this.app.rows[c].allowedChoicesChange)) {
//                   this.app.rows[c].allowedChoicesChange = 0;
//                 }
//
//                 this.app.rows[c].allowedChoicesChange +=
//                   object.numbAddToAllowChoice; // Added to keep record.
//
//                 let numActive = 0;
//                 for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                   this.app.rows[c].objects[m].isActive ? numActive++ : "";
//                 }
//
//                 // If there is more active than is allowed, need to turna few off.
//                 if (numActive > this.app.rows[c].allowedChoices) {
//                   let deactivateChoices =
//                     numActive - this.app.rows[c].allowedChoices;
//                   for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                     if (
//                       deactivateChoices > 0 &&
//                       this.app.rows[c].objects[m].isActive
//                     ) {
//                       this.activateObject(
//                         this.app.rows[c].objects[m],
//                         this.app.rows[c]
//                       );
//                       deactivateChoices--;
//                     }
//                   }
//                 }
//               }
//             }
//           }
//
//           // This will divide a point type when activated.
//           if (object.textfieldIsOn) {
//             // used when checing if
//
//             for (c = 0; c < this.app.words.length; c++) {
//               if (this.app.words[c].id == object.idOfTheTextfieldWord) {
//                 this.app.words[c].replaceText = object.wordChangeSelect;
//               }
//             }
//           }
//
//           this.activated.push(object.id);
//           row.currentChoices += 1;
//
//           // Deletes the the id from the array.
//         } else {
//           for (let i = 0; i < object.scores.length; i++) {
//             if (
//               (this.checkRequireds(object.scores[i]) &&
//                 object.scores[i].isActive) ||
//               object.scores[i].isActive
//             ) {
//               // Goes trough all of the scores and check which is fits.
//               for (let x = 0; x < this.app.pointTypes.length; x++) {
//                 if (this.app.pointTypes[x].id == object.scores[i].id) {
//                   this.app.pointTypes[x].startingSum += parseInt(
//                     object.scores[i].value
//                   );
//                   object.scores[i].isActive = false;
//                 }
//               }
//             }
//           }
//
//           // Is the FUNCTIONS, happens when the object is deselected.
//           // ------------------------------------------------------
//
//           let array;
//           // This will force activate another choice.
//           if (
//             object.activateOtherChoice &&
//             typeof object.activateThisChoice !== "undefined"
//           ) {
//             array = object.activateThisChoice.split(",");
//
//             for (m = 0; m < array.length; m++) {
//               // This will force activate another choice.
//
//               for (i = 0; i < this.app.rows.length; i++) {
//                 for (v = 0; v < this.app.rows[i].objects.length; v++) {
//                   if (
//                     this.app.rows[i].objects[v].id == array[m] &&
//                     this.app.rows[i].objects[v].isActive
//                   ) {
//                     this.app.rows[i].objects[v].isNotSelectable = false;
//                     this.activateObject(
//                       this.app.rows[i].objects[v],
//                       this.app.rows[i]
//                     );
//                   } else {
//                     this.app.rows[i].objects[v].isNotSelectable = false;
//                   }
//                 }
//               }
//             }
//           }
//
//           // This will deactivate another choice.
//           if (object.deactivateOtherChoice) {
//             array = object.deactivateThisChoice.split(",");
//
//             for (i = 0; i < array.length; i++) {
//               for (c = 0; c < this.app.rows.length; c++) {
//                 for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                   if (
//                     (this.app.rows[c].objects[m].id == array[i] ||
//                       this.app.rows[c].resultGroupId == array[i]) &&
//                     this.app.rows[c].objects[m].isActive
//                   ) {
//                     //this.app.rows[c].objects[m].isActive = false;
//                     this.activateObject(
//                       this.app.rows[c].objects[m],
//                       this.app.rows[c]
//                     );
//                   }
//                 }
//               }
//
//               // Checks if the id added in one of the groups in feature.
//               //let groupIdArray = this.newActivated.split(",");
//               for (let g = 0; g < this.app.groups.length; g++) {
//                 if (this.app.groups[g].id == array[i]) {
//                   for (c = 0; c < this.app.rows.length; c++) {
//                     for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                       for (
//                         let y = 0;
//                         y < this.app.rows[c].objects[m].groups.length;
//                         y++
//                       ) {
//                         if (
//                           this.app.rows[c].objects[m].groups[y].id ==
//                           array[i] &&
//                           this.app.rows[c].objects[m].isActive
//                         ) {
//                           //this.app.rows[c].objects[m].isActive = false;
//                           this.activateObject(
//                             this.app.rows[c].objects[m],
//                             this.app.rows[c]
//                           );
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//
//           let allChanges = "Scores Updated On: ";
//           // Will go trough all of the scores and see if there is any requirements with this id.
//           this.app.rows.forEach((element) => {
//             element.objects.forEach((objects) => {
//               objects.scores.forEach((scores) => {
//                 scores.requireds.forEach((requireds) => {
//                   if (objects.isActive) {
//                     if (requireds.reqId == object.id) {
//                       if (allChanges.length == 19) {
//                         allChanges += objects.title;
//                       } else {
//                         allChanges += ", " + objects.title;
//                       }
//                       this.activateObject(objects, element);
//                     } else if (
//                       JSON.stringify(requireds).includes('"' + object.id + '"')
//                     ) {
//                       if (allChanges.length == 19) {
//                         allChanges += objects.title;
//                       } else {
//                         allChanges += ", " + objects.title;
//                       }
//                       this.activateObject(objects, element);
//                     }
//                   } else if (objects.isSelectableMultiple) {
//                     if (
//                       JSON.stringify(requireds).includes('"' + object.id + '"')
//                     ) {
//                       console.log("one");
//
//                       if (
//                         allChanges.length == 19 &&
//                         objects.multipleUseVariable > 0
//                       ) {
//                         allChanges += objects.title;
//                       } else if (objects.multipleUseVariable > 0) {
//                         allChanges += ", " + objects.title;
//                       }
//
//                       for (
//                         let i = 0;
//                         i <
//                         objects.numMultipleTimesPluss -
//                         objects.numMultipleTimesMinus;
//                         i++
//                       ) {
//                         this.selectedOneLess(objects);
//                       }
//                     }
//                   }
//                 });
//               });
//             });
//           });
//           if (allChanges !== "Scores Updated On: ") {
//             this.text = allChanges + ".";
//             this.snackbar = true;
//           }
//
//           // This will divide a point type when activated.
//           if (object.multiplyPointtypeIsOnCheck) {
//             // used when checing if
//             object.multiplyPointtypeIsOnCheck = false;
//             for (c = 0; c < this.app.pointTypes.length; c++) {
//               if (this.app.pointTypes[c].id == object.pointTypeToMultiply) {
//                 this.app.pointTypes[c].startingSum -=
//                   object.startingSumAtMultiply;
//                 //this.app.pointTypes[c].startingSum /= object.multiplyWithThis;
//                 console.log("Multiply:" + object.startingSumAtMultiply);
//               }
//             }
//           }
//
//           // This will multiply a point type when activated.
//           if (object.dividePointtypeIsOnCheck) {
//             // used when checing if
//             object.dividePointtypeIsOnCheck = false;
//             for (c = 0; c < this.app.pointTypes.length; c++) {
//               if (this.app.pointTypes[c].id == object.pointTypeToDivide) {
//                 this.app.pointTypes[c].startingSum *= object.divideWithThis;
//                 console.log("Multiply:");
//               }
//             }
//           }
//
//           // This will divide a point type when activated.
//           if (object.textfieldIsOn) {
//             // used when checing if
//
//             for (c = 0; c < this.app.words.length; c++) {
//               if (this.app.words[c].id == object.idOfTheTextfieldWord) {
//                 this.app.words[c].replaceText = object.wordChangeDeselect;
//               }
//             }
//           }
//
//           // This will change the Allowed Choices of Row.
//           if (object.addToAllowChoice) {
//             for (c = 0; c < this.app.rows.length; c++) {
//               if (object.idOfAllowChoice == this.app.rows[c].id) {
//                 this.app.rows[c].allowedChoices -= object.numbAddToAllowChoice;
//                 let numActive = 0;
//                 for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                   this.app.rows[c].objects[m].isActive ? numActive++ : "";
//                 }
//
//                 // If there is more active than is allowed, need to turna few off.
//                 if (numActive > this.app.rows[c].allowedChoices) {
//                   let deactivateChoices =
//                     numActive - this.app.rows[c].allowedChoices;
//                   for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                     if (
//                       deactivateChoices > 0 &&
//                       this.app.rows[c].objects[m].isActive
//                     ) {
//                       this.activateObject(
//                         this.app.rows[c].objects[m],
//                         this.app.rows[c]
//                       );
//                       deactivateChoices--;
//                     }
//                   }
//                 }
//               }
//             }
//           }
//
//           // Delete the id from the activated array
//           this.activated.splice(this.activated.indexOf(object.id), 1);
//           row.currentChoices -= 1;
//         }
//
//         // Switches the isActive and updates the object.
//         object.isActive = !object.isActive;
//         this.updateActivated();
//
//         // If the object.id is in the activated-array, but required is not there.
//         // Turns the object off after removing the points.
//       } else if (this.activated.includes(object.id)) {
//         // Removes this id from the activated array.
//         this.activated.splice(this.activated.indexOf(object.id), 1);
//
//         for (let i = 0; i < object.scores.length; i++) {
//           if (
//             (this.checkRequireds(object.scores[i]) &&
//               object.scores[i].isActive) ||
//             object.scores[i].isActive
//           ) {
//             // Goes trough all of the scores and check which is fits.
//             for (let x = 0; x < this.app.pointTypes.length; x++) {
//               if (this.app.pointTypes[x].id == object.scores[i].id) {
//                 this.app.pointTypes[x].startingSum += parseInt(
//                   object.scores[i].value
//                 );
//                 object.scores[i].isActive = false;
//               }
//             }
//           }
//         }
//
//         // Is the FUNCTIONS, happens when the object is selected.
//         // ------------------------------------------------------
//
//         // This will force activate another choice.
//         if (
//           object.activateOtherChoice &&
//           typeof object.activateThisChoice !== "undefined"
//         ) {
//           let array = object.activateThisChoice.split(",");
//
//           for (m = 0; m < array.length; m++) {
//             // This will force activate another choice.
//
//             for (i = 0; i < this.app.rows.length; i++) {
//               for (v = 0; v < this.app.rows[i].objects.length; v++) {
//                 if (
//                   this.app.rows[i].objects[v].id == array[m] &&
//                   this.app.rows[i].objects[v].isActive
//                 ) {
//                   this.app.rows[i].objects[v].isNotSelectable = false;
//                   this.activateObject(
//                     this.app.rows[i].objects[v],
//                     this.app.rows[i]
//                   );
//                 } else {
//                   this.app.rows[i].objects[v].isNotSelectable = false;
//                 }
//               }
//             }
//           }
//         }
//
//         let allChanges = "Scores Updated On: ";
//         // Will go trough all of the scores and see if there is any requirements with this id.
//         this.app.rows.forEach((element) => {
//           element.objects.forEach((objects) => {
//             objects.scores.forEach((scores) => {
//               scores.requireds.forEach((requireds) => {
//                 if (objects.isActive) {
//                   if (requireds.reqId == object.id) {
//                     if (allChanges.length == 19) {
//                       allChanges += objects.title;
//                     } else {
//                       allChanges += ", " + objects.title;
//                     }
//                     this.activateObject(objects, element);
//                   } else if (
//                     JSON.stringify(requireds).includes('"' + object.id + '"')
//                   ) {
//                     if (allChanges.length == 19) {
//                       allChanges += objects.title;
//                     } else {
//                       allChanges += ", " + objects.title;
//                     }
//                     this.activateObject(objects, element);
//                   }
//                 } else if (objects.isSelectableMultiple) {
//                   if (
//                     JSON.stringify(requireds).includes('"' + object.id + '"')
//                   ) {
//                     console.log("one");
//
//                     if (
//                       allChanges.length == 19 &&
//                       objects.multipleUseVariable > 0
//                     ) {
//                       allChanges += objects.title;
//                     } else if (objects.multipleUseVariable > 0) {
//                       allChanges += ", " + objects.title;
//                     }
//
//                     for (
//                       let i = 0;
//                       i <
//                       objects.numMultipleTimesPluss -
//                       objects.numMultipleTimesMinus;
//                       i++
//                     ) {
//                       this.selectedOneLess(objects);
//                     }
//                   }
//                 }
//               });
//             });
//           });
//         });
//         if (allChanges !== "Scores Updated On: ") {
//           this.text = allChanges + ".";
//           this.snackbar = true;
//         }
//
//         // This will divide a point type when activated.
//         if (object.textfieldIsOn) {
//           // used when checing if
//
//           for (c = 0; c < this.app.words.length; c++) {
//             if (this.app.words[c].id == object.idOfTheTextfieldWord) {
//               this.app.words[c].replaceText = object.wordChangeDeselect;
//             }
//           }
//         }
//
//         // This will change the Allowed Choices of Row.
//         if (object.addToAllowChoice) {
//           for (c = 0; c < this.app.rows.length; c++) {
//             if (object.idOfAllowChoice == this.app.rows[c].id) {
//               this.app.rows[c].allowedChoices -= object.numbAddToAllowChoice;
//               let numActive = 0;
//               for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                 this.app.rows[c].objects[m].isActive ? numActive++ : "";
//               }
//
//               // If there is more active than is allowed, need to turna few off.
//               if (numActive > this.app.rows[c].allowedChoices) {
//                 let deactivateChoices =
//                   numActive - this.app.rows[c].allowedChoices;
//                 for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                   if (
//                     deactivateChoices > 0 &&
//                     this.app.rows[c].objects[m].isActive
//                   ) {
//                     this.activateObject(
//                       this.app.rows[c].objects[m],
//                       this.app.rows[c]
//                     );
//                     deactivateChoices--;
//                   }
//                 }
//               }
//             }
//           }
//         }
//
//         // Switches the isActive and updates the object.
//         object.isActive = !object.isActive;
//         this.updateActivated();
//         row.currentChoices -= 1;
//       } else {
//         // Does not have the required, nothing happens.
//       }
//     },
//     // Updates the list of activateds.
//     updateActivated() {
//       this.$emit("activatedWasChanged", this.activated);
//     },
//   },
// };
// </script>
//
// <style scoped>
// .btn {
//   margin-bottom: 5px;
// }
//
// .fullHeight {
//   height: 100%;
// }
//
// .margin {
//   margin-top: 5px;
//   margin-bottom: 5px;
// }
// </style>
