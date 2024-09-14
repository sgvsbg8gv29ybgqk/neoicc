export default function ImageCYOA() {
  return <></>;
}
// <template>
//   <div style="text-align: center" class="pb-12" :style="background">
//     <v-navigation-drawer data-html2canvas-ignore v-model="drawer" expand-on-hover :permanent="drawer"
//       :mini-variant="mini">
//       <v-layout column fill-height>
//         <v-list dense>
//           <v-list-item @click="cleanCurrentComponent" v-on="on">
//             <v-list-item-icon>
//               <v-icon>mdi-chevron-left</v-icon>
//             </v-list-item-icon>
//
//             <v-list-item-content>
//               <v-list-item-title>Return To Menu </v-list-item-title>
//             </v-list-item-content>
//           </v-list-item>
//
//           <v-divider></v-divider>
//
//           <v-list-item @click="createNewRow" v-on="on">
//             <v-list-item-icon>
//               <v-icon>mdi-file-plus</v-icon>
//             </v-list-item-icon>
//
//             <v-list-item-content>
//               <v-list-item-title>Create New Row</v-list-item-title>
//             </v-list-item-content>
//           </v-list-item>
//
//           <v-list-item v-for="item in navComponentButtons" @click="currentComponent = item.component" :key="item.title">
//             <v-list-item-icon v-on="on">
//               <v-icon>{{ item.icon }}</v-icon>
//             </v-list-item-icon>
//
//             <v-list-item-content>
//               <v-list-item-title>{{ item.text }}</v-list-item-title>
//             </v-list-item-content>
//           </v-list-item>
//         </v-list>
//
//         <v-spacer></v-spacer>
//
//         <v-list dense>
//           <v-list-item @click="cleanSelectedChoices" v-on="on">
//             <v-list-item-icon>
//               <v-icon>mdi-select-off</v-icon>
//             </v-list-item-icon>
//
//             <v-list-item-content>
//               <v-list-item-title>Clean Selected Choices</v-list-item-title>
//             </v-list-item-content>
//           </v-list-item>
//
//           <v-list-item @click="currentComponent = 'appIdSearch'" v-on="on">
//             <v-list-item-icon>
//               <v-icon>mdi-clipboard-list</v-icon>
//             </v-list-item-icon>
//
//             <v-list-item-content>
//               <v-list-item-title> See ID/Title List </v-list-item-title>
//             </v-list-item-content>
//           </v-list-item>
//
//           <v-list-item @click="drawer = !drawer" v-on="on">
//             <v-list-item-icon>
//               <v-icon>mdi-menu</v-icon>
//             </v-list-item-icon>
//
//             <v-list-item-content>
//               <v-list-item-title> Use Alternate Menu </v-list-item-title>
//             </v-list-item-content>
//           </v-list-item>
//         </v-list>
//       </v-layout>
//     </v-navigation-drawer>
//
//     <v-main><!-- Nav Bar -->
//       <v-row v-if="!drawer" data-html2canvas-ignore style="background-color: lightgrey">
//         <v-col icon v-on="on" class="text-center">
//           <v-btn small @click="cleanCurrentComponent()" style="color: black">
//             <v-icon>mdi-chevron-left</v-icon>
//           </v-btn>
//         </v-col>
//
//         <v-col icon v-on="on" class="text-center">
//           <v-btn small @click="cleanSelectedChoices()" style="color: black">
//             De-select Choices
//           </v-btn>
//         </v-col>
//
//         <v-col icon v-on="on" class="text-center">
//           <v-btn small @click="drawer = !drawer" style="color: black">
//             <v-icon>mdi-menu</v-icon>
//           </v-btn>
//         </v-col>
//
//         <v-col class="text-center">
//           <v-btn small @click="createNewRow" style="color: black">New Row</v-btn>
//         </v-col>
//
//         <!-- For loop that creates the identical buttons in the nav bar. -->
//         <v-col v-for="button in navComponentButtons" :key="button.index" class="text-center">
//           <v-btn small @click="currentComponent = button.component" style="color: black">{{ button.text }}</v-btn>
//         </v-col>
//       </v-row>
//
//       <v-row data-html2canvas-ignore style="background-color: lightgrey">
//         <component data-html2canvas-ignore :is="currentDesignComponent" @cleanCurrentDesignComponent="
//           $store.state.currentDesignComponent = $event
//           "></component>
//       </v-row>
//
//       <!-- Navbar that holds the pointtypes and backpack -->
//       <v-bottom-navigation data-html2canvas-ignore :style="pointBar" v-if="
//         app.pointTypes.length > 0 ||
//         app.backpack.length > 0 ||
//         app.importedChoicesIsOpen
//       " fixed>
//         <v-row>
//           <v-col>
//             <v-btn v-show="app.importedChoicesIsOpen" text icon x-large @click="currentComponent = 'appActivatedViewer'"
//               color="black">
//               <v-icon>mdi-format-list-checks</v-icon>
//             </v-btn>
//           </v-col>
//           <v-col v-show="score.activatedId == '' ||
//             app.activated.includes(score.activatedId)
//             " :style="pointBarText" v-for="score in app.pointTypes" :key="score.index">{{ score.beforeText }}
//             <span :style="score.startingSum >= 0
//               ? typeof app.styling.barPointPos !== 'undefined'
//                 ? 'color: ' + app.styling.barPointPos.hex
//                 : ''
//               : typeof app.styling.barPointNeg !== 'undefined'
//                 ? 'color: ' + app.styling.barPointNeg.hex
//                 : ''
//               ">{{ Math.round(score.startingSum) }}</span>
//             {{ score.afterText }}</v-col>
//           <v-col>
//             <v-btn v-show="app.backpack.length > 0" text icon x-large @click="currentComponent = 'appBackpackPreview'"
//               color="black">
//               <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
//             </v-btn>
//           </v-col>
//         </v-row>
//       </v-bottom-navigation>
//
//       <!-- This is the holder that holds the design, save and load-component -->
//       <component :is="currentComponent" @cleanCurrentComponent="currentComponent = $event"></component>
//
//       <v-row class="pa-0" data-html2canvas-ignore>
//         <!-- This is where the rows is shown -->
//         <v-col :class="window.width > 1200
//           ? row.width
//             ? 'col-6 pt-0 pb-0'
//             : 'col-12 pt-0 pb-0'
//           : 'col-12 pt-0 pb-0'
//           " v-for="row in app.rows" :key="row.index">
//           <v-toolbar class="grey ma-2 lighten-2">
//             <v-toolbar-title v-html="$sanitize(row.title)"></v-toolbar-title>
//
//             <v-spacer></v-spacer>
//
//             <v-tooltip bottom open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-btn icon v-on="on">
//                   <v-icon v-if="!row.isEditModeOn" @click="row.isEditModeOn = !row.isEditModeOn">mdi-wrench</v-icon>
//                   <v-icon v-else @click="row.isEditModeOn = !row.isEditModeOn">mdi-keyboard-backspace</v-icon>
//                 </v-btn>
//               </template>
//               <span v-if="!row.isEditModeOn">Edit Row</span>
//               <span v-else>Preview</span>
//             </v-tooltip>
//
//             <v-tooltip bottom open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-btn icon v-on="on">
//                   <v-icon @click="deleteRow(row)">mdi-delete-forever</v-icon>
//                 </v-btn>
//               </template>
//               <span>Delete Row</span>
//             </v-tooltip>
//
//             <v-tooltip bottom open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-btn icon v-on="on">
//                   <v-icon @click="cloneRow(row)">mdi-content-copy</v-icon>
//                 </v-btn>
//               </template>
//               <span>Clone Row</span>
//             </v-tooltip>
//
//             <v-tooltip bottom open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-btn icon v-on="on">
//                   <v-icon @click="moveRowUp(row)">mdi-chevron-up</v-icon>
//                 </v-btn>
//               </template>
//               <span>Move Row Up</span>
//             </v-tooltip>
//
//             <v-tooltip bottom open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-btn icon v-on="on">
//                   <v-icon @click="moveRowDown(row)">mdi-chevron-down</v-icon>
//                 </v-btn>
//               </template>
//               <span>Move Row Down</span>
//             </v-tooltip>
//           </v-toolbar>
//
//           <app-Row :row="row" @rowWasChanged="row = $event"></app-Row>
//         </v-col>
//       </v-row>
//
//       <ConfirmDlg ref="confirm" />
//     </v-main>
//   </div>
// </template>
//
// <script>
// import Row from "./imageCyoa/Row.vue";
// import Load from "./imageCyoa/storage/Load.vue";
// import Design from "./imageCyoa/Design.vue";
// import Feature from "./imageCyoa/Feature.vue";
// import RowList from "./imageCyoa/RowList.vue";
// import ActivatedViewer from "./imageCyoa/ActivatedViewer.vue";
// import BackpackPreview from "./standardcyoa/BackpackPreview.vue";
//
// import FilterDesign from "./imageCyoa/styleNew/Filter.vue";
// import BackgroundDesign from "./imageCyoa/styleNew/Background.vue";
// import BackpackDesign from "./imageCyoa/styleNew/Backpack.vue";
// import MultiChoiceDesign from "./imageCyoa/styleNew/MultiChoice.vue";
// import ObjectDesign from "./imageCyoa/styleNew/ObjectDesign.vue";
//
// import ObjectImage from "./imageCyoa/styleNew/ObjectImage.vue";
// import PointBar from "./imageCyoa/styleNew/PointBar.vue";
// import RowDesign from "./imageCyoa/styleNew/RowDesign.vue";
// import RowImage from "./imageCyoa/styleNew/RowImage.vue";
// import Text from "./imageCyoa/styleNew/Text.vue";
//
// import IdSearch from "./imageCyoa/features/IdSearch.vue";
//
// export default {
//   data: function () {
//     return {
//       currentComponent: "",
//       // the buttons on the top of the creator.
//       navComponentButtons: [
//         {
//           component: "appRowList",
//           text: "Open Row List",
//           icon: "mdi-format-list-bulleted",
//           desc: "Opens a List of The Rows",
//         },
//         {
//           component: "appFeature",
//           text: "Open Features",
//           icon: "mdi-tools",
//           desc: "Opens the Features Menu",
//         },
//         {
//           component: "appDesign",
//           text: "Modify Design",
//           icon: "mdi-fountain-pen",
//           desc: "Opens The Design Menu",
//         },
//         {
//           component: "appLoad",
//           text: "Save/Load Project",
//           icon: "mdi-floppy",
//           desc: "Opens The Saving/Loading Menu",
//         },
//       ],
//       window: {
//         width: 0,
//         height: 0,
//       },
//       drawer: true,
//
//       mini: true,
//     };
//   },
//   components: {
//     // One of the row components
//     appRow: Row,
//     appDesign: Design,
//     appLoad: Load,
//     appFeature: Feature,
//     appRowList: RowList,
//     appBackpackPreview: BackpackPreview,
//     appActivatedViewer: ActivatedViewer,
//
//     appFilter: FilterDesign,
//     appBackground: BackgroundDesign,
//     appBackpack: BackpackDesign,
//     appMultiChoice: MultiChoiceDesign,
//     appObjectDesign: ObjectDesign,
//     appObjectImage: ObjectImage,
//     appPointBar: PointBar,
//     appRowDesign: RowDesign,
//     appRowImage: RowImage,
//     appText: Text,
//
//     appIdSearch: IdSearch,
//
//     ConfirmDlg: () => import("./imageCyoa/confirmDialog"),
//   },
//   // Lifecycle hook that happens when component is created.
//   created() {
//     window.addEventListener("resize", this.handleResize);
//     this.handleResize();
//   },
//   // Lifecycle hook that happens when components is destroyed.
//   destroyed() {
//     window.removeEventListener("resize", this.handleResize);
//   },
//   // Nearly all the computed methods is used for the design of the project.
//   computed: {
//     // Computes the styles for the title-text and the under-text
//     background() {
//       return (
//         'background-image: url("' +
//         this.app.styling.backgroundImage +
//         '");' +
//         "background-color: " +
//         this.app.styling.backgroundColor +
//         ";background-repeat: repeat;"
//       );
//     },
//     pointBar() {
//       return (
//         "background-color: " +
//         this.app.styling.barBackgroundColor +
//         "; margin: " +
//         this.app.styling.barMargin +
//         "px; padding: " +
//         this.app.styling.barPadding +
//         "px;"
//       );
//     },
//     pointBarText() {
//       let pointBarText =
//         "color: " +
//         this.app.styling.barTextColor +
//         "; margin: " +
//         this.app.styling.barTextMargin +
//         "px; padding: " +
//         this.app.styling.barTextPadding +
//         "px;" +
//         'font-family: "' +
//         this.app.styling.barTextFont +
//         '";';
//
//       if (this.window.width > 800) {
//         pointBarText += "font-size: " + this.app.styling.barTextSize + "px;";
//       } else {
//         pointBarText += "font-size: 10px;";
//       }
//
//       return pointBarText;
//     },
//     app() {
//       return this.$store.state.app;
//     },
//     currentDesignComponent() {
//       return this.$store.state.currentDesignComponent;
//     },
//   },
//   methods: {
//     cloneRow(row) {
//       this.app.rows.splice(
//         this.app.rows.indexOf(row) + 1,
//         0,
//         JSON.parse(JSON.stringify(row))
//       );
//
//       var text = "";
//       var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
//
//       for (var o = 0; o < 4; o++)
//         text += charset.charAt(Math.floor(Math.random() * charset.length));
//
//       this.app.rows[this.app.rows.indexOf(row) + 1].id = text;
//
//       for (
//         let i = 0;
//         i < this.app.rows[this.app.rows.indexOf(row) + 1].objects.length;
//         i++
//       ) {
//         text = "";
//
//         for (var h = 0; h < 4; h++)
//           text += charset.charAt(Math.floor(Math.random() * charset.length));
//
//         this.app.rows[this.app.rows.indexOf(row) + 1].objects[i].id = text;
//       }
//     },
//     handleResize() {
//       this.window.width = window.innerWidth;
//       this.window.height = window.innerHeight;
//     },
//     // Calls on the mutation in store that deletes the Id's in the activated array
//     cleanActivated() {
//       this.$store.commit({
//         type: "cleanActivated",
//       });
//     },
//     // The Method that will create a new row.
//     createNewRow() {
//       // Creates the id
//       var text = "";
//       var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
//       for (var i = 0; i < 4; i++)
//         text += charset.charAt(Math.floor(Math.random() * charset.length));
//
//       var styling = JSON.parse(JSON.stringify(this.app.styling));
//
//       // Removes the images when a new row is created, to stop bloating.
//       styling.backgroundImage = "";
//       styling.rowBackgroundImage = "";
//       styling.objectBackgroundImage = "";
//
//       this.app.rows.push({
//         id: text,
//         title: this.app.defaultRowTitle,
//         titleText: this.app.defaultRowText,
//         objectWidth: "col-md-3",
//         image: "",
//         template: "1",
//
//         // Button in row.
//         isButtonRow: false, // Does the row show an image(true) or an button(false)?
//         buttonType: true, // True if permanent, false if switch.
//         buttonId: "", // The id of the variable that the button uses.
//         buttonText: "Click",
//         buttonRandom: false,
//         buttonRandomNumber: 1,
//
//         isResultRow: false, // Is the row a result row?
//         resultGroupId: "",
//         isInfoRow: false, // Is the row a information row?
//         isPrivateStyling: false,
//
//         defaultAspectWidth: 1, // The default width and height for cropper aspect.
//         defaultAspectHeight: 1, // The default height for cropper aspect.
//         allowedChoices: 0, // Allowed choices in the array.
//         currentChoices: 0, // Current selected choices in the array.
//         requireds: [],
//         isEditModeOn: false,
//         isRequirementOpen: false,
//
//         objects: [],
//         // Styling is collected like this to make a copy, and not a pointer to the same object.
//         styling: styling,
//       });
//     },
//     // Deletes a row after its index is found.
//     async deleteRow(row) {
//       if (
//         await this.$refs.confirm.open(
//           "Confirm",
//           "Are you sure you want to delete this row?"
//         )
//       ) {
//         this.$store.commit("deleteRow", row);
//       }
//     },
//     // Moves the row 1 up in the row array.
//     moveRowUp(row) {
//       let index = this.app.rows.indexOf(row);
//       if (index > 0) {
//         let el = this.app.rows[index];
//         this.$set(this.app.rows, index, this.app.rows[index - 1]);
//         this.$set(this.app.rows, index - 1, el);
//       }
//     },
//     // Moves the row 1 down in the row array.
//     moveRowDown(row) {
//       let index = this.app.rows.indexOf(row);
//       if (index !== -1 && index < this.app.rows.length - 1) {
//         let el = this.app.rows[index];
//         this.$set(this.app.rows, index, this.app.rows[index + 1]);
//         this.$set(this.app.rows, index + 1, el);
//       }
//     },
//     cleanSelectedChoices() {
//       this.cleanActivated();
//     },
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     },
//   },
// };
// </script>
//
// <style>
// .nopadding {
//   padding: 0 !important;
//   margin: 0 !important;
// }
//
// /* ------------------- The Style Options -------------------- */
// /* Makes space between the row of objects and the row details */
//
// img {
//   padding-right: 0px !important;
//   padding-left: 0px !important;
//   width: 100%;
// }
//
// div.root {
//   margin: 50px;
// }
//
// .w-100 {
//   -webkit-box-flex: 0;
//   -ms-flex: 0 0 100% !important;
//   flex: 0 0 100% !important;
//   max-width: 100%;
// }
//
// .w-50 {
//   -webkit-box-flex: 0;
//   -ms-flex: 0 0 50% !important;
//   flex: 0 0 50% !important;
//   max-width: 50%;
// }
//
// .w-33 {
//   -webkit-box-flex: 0;
//   -ms-flex: 0 0 33.33% !important;
//   flex: 0 0 33.33% !important;
//   max-width: 33.33%;
// }
//
// .w-25 {
//   -webkit-box-flex: 0;
//   -ms-flex: 0 0 25% !important;
//   flex: 0 0 25% !important;
//   max-width: 25%;
// }
//
// .w-20 {
//   -webkit-box-flex: 0;
//   -ms-flex: 0 0 20% !important;
//   flex: 0 0 20% !important;
//   max-width: 20%;
// }
//
// .w-16 {
//   -webkit-box-flex: 0;
//   -ms-flex: 0 0 16.66% !important;
//   flex: 0 0 16.66% !important;
//   max-width: 16.66%;
// }
//
// .w-14 {
//   -webkit-box-flex: 0;
//   -ms-flex: 0 0 14.28% !important;
//   flex: 0 0 14.28% !important;
//   max-width: 14.28%;
// }
//
// .w-12 {
//   -webkit-box-flex: 0;
//   -ms-flex: 0 0 12.5% !important;
//   flex: 0 0 12.5% !important;
//   max-width: 12.5%;
// }
//
// .w-11 {
//   -webkit-box-flex: 0;
//   -ms-flex: 0 0 11.11% !important;
//   flex: 0 0 11.11% !important;
//   max-width: 11.11%;
// }
//
// .w-10 {
//   -webkit-box-flex: 0;
//   -ms-flex: 0 0 10% !important;
//   flex: 0 0 10% !important;
//   max-width: 10%;
// }
//
// .w-9 {
//   -webkit-box-flex: 0;
//   -ms-flex: 0 0 9.09% !important;
//   flex: 0 0 9.09% !important;
//   max-width: 9.09%;
// }
//
// .w-8 {
//   -webkit-box-flex: 0;
//   -ms-flex: 0 0 8.33% !important;
//   flex: 0 0 8.33% !important;
//   max-width: 8.33%;
// }
//
// /* When something is pressed and activated */
// .active {
//   background-color: lightgreen;
// }
//
// .zeroPadding {
//   padding: 0px !important;
// }
//
// select {
//   margin-bottom: 5px;
// }
//
// .form-control {
//   margin-top: 0 !important;
// }
//
// div.col-md-2 {
//   text-align: center;
// }
//
// div.col5 {
//   text-align: center;
//   width: 20%;
// }
//
// div.col-md-6 {
//   text-align: center;
// }
//
// div.col-md-3 {
//   text-align: center;
// }
//
// /* Border around the objects, will be toggable */
// div.border {
//   border: 1px solid #ccc;
// }
//
// p {
//   text-align: left;
// }
//
// h1 {
//   text-align: center;
// }
//
// /* To keep the lows beautiful and on same size*/
// .row.display-flex {
//   display: flex;
//   flex-wrap: wrap;
// }
//
// .row.display-flex>[class*="col-"] {
//   display: flex;
//   flex-direction: column;
// }
//
// /********************* Header *************************/
// .header {
//   padding: 10px;
//   background: #555;
//   color: #f1f1f1;
//   width: 100%;
// }
//
// .sticky {
//   position: fixed;
//   top: 0;
//
//   z-index: 99999;
// }
//
// /********************* /Header *************************/
// </style>
