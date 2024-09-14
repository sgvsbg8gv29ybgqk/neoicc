export default function Backpack() {
  return <></>;
}
// <template>
//   <v-dialog v-model="dialog" max-width="1920px" @click:outside="cleanCurrentComponent">
//     <v-card>
//       <v-card-text>
//         <v-container>
//           <v-row>
//             <v-col align-self="center">
//               <v-btn @click.stop="createNewBackpackRow()">Add New Backpack Row</v-btn>
//             </v-col>
//             <v-col align-self="center"></v-col>
//             <v-col align-self="center"></v-col>
//             <v-col align-self="center"></v-col>
//           </v-row>
//
//           <v-row cols="12" align-self="center">
//             <v-col cols="3" align-self="center">
//               <v-switch class="mt-n2 mb-n6 ms-3" :label="`Dialog where selected choices can be imported with ID's.`"
//                 v-model="$store.state.app.importedChoicesIsOpen"></v-switch>
//             </v-col>
//           </v-row>
//
//           <v-row>
//             <v-col cols="12" class="pa-0" v-for="row in backpack" :key="row.index">
//               <v-toolbar class="grey lighten-2">
//                 <v-toolbar-title v-html="row.title"></v-toolbar-title>
//
//                 <v-spacer></v-spacer>
//
//                 <v-tooltip bottom open-delay="1000">
//                   <template v-slot:activator="{ on }">
//                     <v-btn icon v-on="on">
//                       <v-icon v-if="!row.isEditModeOn" @click="row.isEditModeOn = !row.isEditModeOn">mdi-wrench</v-icon>
//                       <v-icon v-else @click="row.isEditModeOn = !row.isEditModeOn">mdi-keyboard-backspace</v-icon>
//                     </v-btn>
//                   </template>
//                   <span v-if="!row.isEditModeOn">Edit Row</span>
//                   <span v-else>Preview</span>
//                 </v-tooltip>
//
//                 <v-tooltip bottom open-delay="1000">
//                   <template v-slot:activator="{ on }">
//                     <v-btn icon v-on="on">
//                       <v-icon @click="deleteRow(row)">mdi-delete-forever</v-icon>
//                     </v-btn>
//                   </template>
//                   <span>Delete Row</span>
//                 </v-tooltip>
//
//                 <v-tooltip bottom open-delay="1000">
//                   <template v-slot:activator="{ on }">
//                     <v-btn icon v-on="on">
//                       <v-icon @click="cloneRow(row)">mdi-content-copy</v-icon>
//                     </v-btn>
//                   </template>
//                   <span>Clone Row</span>
//                 </v-tooltip>
//
//                 <v-tooltip bottom open-delay="1000">
//                   <template v-slot:activator="{ on }">
//                     <v-btn icon v-on="on">
//                       <v-icon @click="currentComponent = 'appDesign'">mdi-grease-pencil</v-icon>
//                     </v-btn>
//                   </template>
//                   <span>Modify Row Design</span>
//                 </v-tooltip>
//
//                 <v-tooltip bottom open-delay="1000">
//                   <template v-slot:activator="{ on }">
//                     <v-btn icon v-on="on">
//                       <v-icon @click="moveRowUp(row)">mdi-chevron-up</v-icon>
//                     </v-btn>
//                   </template>
//                   <span>Move Row Up</span>
//                 </v-tooltip>
//
//                 <v-tooltip bottom open-delay="1000">
//                   <template v-slot:activator="{ on }">
//                     <v-btn icon v-on="on">
//                       <v-icon @click="moveRowDown(row)">mdi-chevron-down</v-icon>
//                     </v-btn>
//                   </template>
//                   <span>Move Row Down</span>
//                 </v-tooltip>
//               </v-toolbar>
//
//               <app-Row :row="row" :type="type" @rowWasChanged="row = $event"></app-Row>
//             </v-col>
//           </v-row>
//         </v-container>
//       </v-card-text>
//
//       <v-card-actions>
//         <v-btn color="green darken-1" text @click="cleanCurrentComponent">Close</v-btn>
//       </v-card-actions>
//     </v-card>
//   </v-dialog>
// </template>
//
// <script>
// import Row from "../imageCyoa/Row.vue";
//
// export default {
//   props: {
//     chapter: Object,
//     page: Object,
//     type: String,
//   },
//   data: function () {
//     return {
//       dialog: true,
//     };
//   },
//   components: {
//     appRow: Row,
//   },
//   computed: {
//     backpack() {
//       return this.$store.state.app.backpack;
//     },
//   },
//   methods: {
//     // Deletes a row after its index is found.
//     deleteRow(row) {
//       this.backpack.splice(this.backpack.indexOf(row), 1);
//     },
//     moveRowUp(row) {
//       let index = this.backpack.indexOf(row);
//       if (index > 0) {
//         let el = this.backpack[index];
//         this.$set(this.backpack, index, this.backpack[index - 1]);
//         this.$set(this.backpack, index - 1, el);
//       }
//     },
//     cloneRow(row) {
//       this.backpack.splice(
//         this.backpack.indexOf(row) + 1,
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
//       this.backpack[this.backpack.indexOf(row) + 1].id = text;
//
//       for (
//         let i = 0;
//         i < this.backpack[this.backpack.indexOf(row) + 1].objects.length;
//         i++
//       ) {
//         text = "";
//
//         for (var h = 0; h < 4; h++)
//           text += charset.charAt(Math.floor(Math.random() * charset.length));
//
//         this.backpack[this.backpack.indexOf(row) + 1].objects[i].id = text;
//       }
//     },
//     moveRowDown(row) {
//       let index = this.backpack.indexOf(row);
//       if (index !== -1 && index < this.backpack.length - 1) {
//         let el = this.backpack[index];
//         this.$set(this.backpack, index, this.backpack[index + 1]);
//         this.$set(this.backpack, index + 1, el);
//       }
//     },
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     },
//     createNewBackpackRow() {
//       // Creates the id
//       var text = "";
//       var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
//       for (var i = 0; i < 4; i++)
//         text += charset.charAt(Math.floor(Math.random() * charset.length));
//
//       this.backpack.push({
//         id: text,
//         title: "The Row",
//         titleText:
//           "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
//         isResultRow: true, // Is the row a result row?
//         resultGroupId: "",
//         isInfoRow: true, // Is the row a information row?
//         isPrivateStyling: false,
//
//         defaultAspectWidth: 1, // The default width and height for cropper aspect.
//         defaultAspectHeight: 1, // The default height for cropper aspect.
//         allowedChoices: 0, // Allowed choices in the array.
//         currentChoices: 0, // Current selected choices in the array.
//         requireds: [],
//         isEditModeOn: false,
//         isRequirementOpen: false,
//         objects: [],
//         // The styling that has to be done in the row.
//         styling: {
//           // Font for the text.
//           rowTitle: "Times New Roman", // The font for the row-titles.
//           rowText: "Times New Roman", // The font for the row-under-text.
//           objectTitle: "Times New Roman", // The font for the object-titles.
//           objectText: "Times New Roman", // The font for the object-under-text.
//           addonTitle: "Times New Roman", // The font for the object-titles.
//           addonText: "Times New Roman", // The font for the object-under-text.
//
//           // Size for the text.
//           rowTitleTextSize: 200,
//           rowTextTextSize: 100,
//           objectTitleTextSize: 200,
//           objectTextTextSize: 100,
//           addonTitleTextSize: 200,
//           addonTextTextSize: 100,
//
//           rowTitleAlign: "center",
//           rowTextAlign: "center",
//           objectTitleAlign: "center",
//           objectTextAlign: "center",
//           addonTitleAlign: "center",
//           addonTextAlign: "center",
//
//           barTextColor: "#000000",
//           barBackgroundColor: "#FFFFFFFF",
//           barTextPadding: 17,
//           barTextMargin: 0,
//           barTextFont: "Times New Roman",
//           barTextSize: 15,
//           barPadding: 0,
//           barMargin: 0,
//
//           // Colors for the text.
//           rowTitleColor: "000000",
//           rowTextColor: "000000",
//           objectTitleColor: "000000",
//           objectTextColor: "000000",
//           addonTitleColor: "000000",
//           addonTextColor: "000000",
//           objectHeight: true,
//
//           // Background image and color.
//           backgroundImage: "",
//           rowBackgroundImage: "",
//           objectBackgroundImage: "",
//           backgroundColor: "#FFFFFFFF",
//           objectBgColor: "#FFFFFFFF",
//           rowBgColor: "#FFFFFFFF",
//
//           // Boolean that says if the row or object-color will be viewed.
//           rowBgColorIsOn: false,
//           objectBgColorIsOn: false,
//
//           // Image radius and width
//           rowImageBorderRadius: 0,
//           objectImageBorderRadius: 0,
//           objectImageWidth: 100,
//           rowImageWidth: 100,
//
//           // Margin and padding
//           objectMargin: 10,
//           rowMargin: 0,
//           rowTextPaddingY: 1,
//           rowTextPaddingX: 10,
//           objectTextPadding: 10,
//
//           rowBodyMarginTop: 1,
//           rowBodyMarginBottom: 25,
//           rowBodyMarginSides: 1,
//
//           // Style Drop Shadow Object
//           objectDropShadowH: 0,
//           objectDropShadowV: 0,
//           objectDropShadowSpread: 0,
//           objectDropShadowBlur: 0,
//           objectDropShadowColor: "grey",
//           objectDropShadowIsOn: false,
//
//           // Style Drop Shadow Row
//           rowDropShadowH: 0,
//           rowDropShadowV: 0,
//           rowDropShadowSpread: 0,
//           rowDropShadowBlur: 0,
//           rowDropShadowColor: "grey",
//           rowDropShadowIsOn: false,
//
//           // Selected Filter
//           selFilterBlurIsOn: false,
//           selFilterBlur: 0,
//           selFilterBrightIsOn: false,
//           selFilterBright: 100,
//           selFilterContIsOn: false,
//           selFilterCont: 100,
//           selFilterGrayIsOn: false,
//           selFilterGray: 0,
//           selFilterHueIsOn: false,
//           selFilterHue: 0,
//           selFilterInvertIsOn: false,
//           selFilterInvert: 0,
//           selFilterOpacIsOn: false,
//           selFilterOpac: 100,
//           selFilterSaturIsOn: false,
//           selFilterSatur: 1,
//           selFilterSepiaIsOn: false,
//           selFilterSepia: 0,
//           selBgColorIsOn: true,
//           selFilterBgColor: "#70FF7EFF",
//
//           // Required Filter
//           reqFilterBlurIsOn: false,
//           reqFilterBlur: 0,
//           reqFilterBrightIsOn: false,
//           reqFilterBright: 100,
//           reqFilterContIsOn: false,
//           reqFilterCont: 100,
//           reqFilterGrayIsOn: false,
//           reqFilterGray: 0,
//           reqFilterHueIsOn: false,
//           reqFilterHue: 0,
//           reqFilterInvertIsOn: false,
//           reqFilterInvert: 0,
//           reqFilterOpacIsOn: true,
//           reqFilterOpac: 50,
//           reqFilterSaturIsOn: false,
//           reqFilterSatur: 1,
//           reqFilterSepiaIsOn: false,
//           reqFilterSepia: 0,
//           reqBgColorIsOn: false,
//           reqFilterBgColor: "#FFFFFFFF",
//           reqFilterVisibleIsOn: false, // Add later
//         },
//       });
//     },
//   },
// };
// </script>
//
// <style scoped>
// .btn {
//   margin: 5px;
//   font-size: small;
// }
//
// .cropper {
//   width: 100%;
//   background: #ddd;
// }
//
// .row {
//   padding: 10px;
// }
//
// /* Important part */
// .modal-dialog {
//   overflow-y: initial !important;
// }
//
// .modal-body {
//   max-height: calc(100vh - 100px);
//   overflow-y: auto;
// }
//
// @media (min-width: 768px) {
//   .modal-xl {
//     width: 90%;
//     max-width: 1200px;
//   }
// }
// </style>
