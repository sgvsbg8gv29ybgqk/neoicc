export default function RowSettings() {
  return <></>;
}
// <template>
//   <v-dialog v-model="dialog" max-width="600px" @click:outside="cleanCurrentComponent">
//     <v-card>
//       <v-card-title class="headline">Row Settings</v-card-title>
//
//       <v-card-text>
//         <v-container>
//           <v-row>
//             <v-col cols="12">
//               Sort The Choices In The Row
//               <v-select hide-details :items="sort" v-model="sortType" item-text="text" item-value="value" filled
//                 label="Sort By..."></v-select>
//               <v-col class="px-0">
//                 <v-btn @click="sortRowObjects()" style="color: black">Sort</v-btn>
//               </v-col>
//             </v-col>
//
//             <v-col cols="12">
//               Copy Choices Into Another Row
//               <v-select hide-details :items="rows" v-model="newRow" item-text="title" item-value="id" filled
//                 label="Copy this row's objects into..."></v-select>
//               <v-row class="pa-0">
//                 <v-col class="col-md-4 col-sm-12">
//                   <v-btn @click="mergeRow()" style="color: black">Copy</v-btn>
//                 </v-col>
//                 <v-col class="col-md-8 col-sm-12">
//                   <v-btn @click="mergeAndDeleteRow()" style="color: black">Copy and delete</v-btn>
//                 </v-col>
//               </v-row>
//             </v-col>
//             <v-col cols="12">
//               Group Membership
//               <v-select hide-details deletable-chips chips :items="groups" v-model="row.resultGroupId" item-text="name"
//                 item-value="id" filled label="All choices In Row Is Members Of This Group"
//                 placeholder="All Rows and Objects"></v-select>
//             </v-col>
//
//             <v-col cols="12">
//               <v-text-field v-if="
//                 styling.objectImgObjectFillIsOn ||
//                 (row.isPrivateStyling && row.styling.objectImgObjectFillIsOn)
//               " v-model="row.styling.objectImgObjectFillHeight" suffix="px" type="number"
//                 label="Height of the image container" filled hint="Leave empty for no Object-Fit"
//                 persistent-hint></v-text-field>
//             </v-col>
//           </v-row>
//         </v-container>
//
//         <v-container>
//           <v-col>
//             <v-switch class="mt-n2 mb-n6 ms-3" v-model="row.isPrivateStyling"
//               @change="row.styling = JSON.parse(JSON.stringify(styling))" :label="`Use private styling?`"></v-switch>
//           </v-col>
//
//           <v-row v-if="row.isPrivateStyling">
//             <v-tooltip right open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-col>
//                   <v-btn v-on="on" @click="currentComponent = 'appFilter'" style="color: black">Manage Filter
//                     Design</v-btn>
//                 </v-col>
//               </template>
//               <span>
//                 Here you can change the filters for choices that are selected
//                 <br />and the one's you dont have the requirements for.
//               </span>
//             </v-tooltip>
//
//             <v-tooltip right open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-col>
//                   <v-btn v-on="on" @click="currentComponent = 'appText'" style="color: black">Manage Text Design</v-btn>
//                 </v-col>
//               </template>
//               <span>
//                 Here you can change the size, font and
//                 <br />color of the text on titles and text.
//               </span>
//             </v-tooltip>
//
//             <v-tooltip right open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-col>
//                   <v-btn v-on="on" @click="currentComponent = 'appObjectImage'" style="color: black">Manage Choices
//                     Image Design</v-btn>
//                 </v-col>
//               </template>
//               <span>
//                 Here you can change the margin and padding
//                 <br />of images on rows and objects.
//               </span>
//             </v-tooltip>
//
//             <v-tooltip right open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-col>
//                   <v-btn v-on="on" @click="currentComponent = 'appRowImage'" style="color: black">Manage Row Image
//                     Design</v-btn>
//                 </v-col>
//               </template>
//               <span>
//                 Here you can change the margin and padding
//                 <br />of images on rows and objects.
//               </span>
//             </v-tooltip>
//
//             <v-tooltip right open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-col>
//                   <v-btn v-on="on" @click="currentComponent = 'appBackground'" style="color: black">Manage Background
//                     Design</v-btn>
//                 </v-col>
//               </template>
//               <span>
//                 Here you can change the color and place images in
//                 <br />the background of rows, choices and the whole project.
//               </span>
//             </v-tooltip>
//
//             <v-tooltip right open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-col>
//                   <v-btn v-on="on" @click="currentComponent = 'appRowDesign'" style="color: black">Manage Row
//                     Design</v-btn>
//                 </v-col>
//               </template>
//               <span>
//                 Here you can change the margin,
//                 <br />padding, borders, and drop-shadow on rows.
//               </span>
//             </v-tooltip>
//
//             <v-tooltip right open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-col>
//                   <v-btn v-on="on" @click="currentComponent = 'appObjectDesign'" style="color: black">Manage Choice
//                     Design</v-btn>
//                 </v-col>
//               </template>
//               <span>
//                 Here you can change the margin,
//                 <br />padding, borders, and drop-shadow on choices.
//               </span>
//             </v-tooltip>
//
//             <v-tooltip right open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-col>
//                   <v-btn v-on="on" @click="currentComponent = 'appBackpack'" style="color: black">Manage Backpack
//                     Design</v-btn>
//                 </v-col>
//               </template>
//               <span>Here you can change the backpack.</span>
//             </v-tooltip>
//           </v-row>
//         </v-container>
//       </v-card-text>
//
//       <component v-bind:is="currentComponent" :from="'private'" :row="row" :currentComponent="currentComponent"
//         @cleanCurrentComponent="currentComponent = $event"></component>
//
//       <v-card-actions>
//         <v-btn color="green darken-1" text @click="cleanCurrentComponent">Close</v-btn>
//       </v-card-actions>
//     </v-card>
//   </v-dialog>
// </template>
//
// <script>
// import Filter from "../style/Filter.vue";
// import Text from "../style/Text.vue";
// import ObjectImage from "../style/ObjectImage.vue";
// import RowImage from "../style/RowImage.vue";
// import Background from "../style/Background.vue";
// import ObjectDesign from "../style/ObjectDesign.vue";
// import RowDesign from "../style/RowDesign.vue";
// import PointBar from "../style/PointBar.vue";
//
// export default {
//   props: {
//     row: Object,
//   },
//   data: function () {
//     return {
//       currentComponent: "",
//       dialog: true,
//       sortType: 1,
//       newRow: "",
//       sort: [
//         { text: "Object Width - Biggest to smallest.", value: "1" },
//         { text: "Object Width - Smallest to Biggest.", value: "2" },
//         { text: "Text Length - Longest to Shortest.", value: "3" },
//         { text: "Text Length - Shortest to Longest.", value: "4" },
//       ],
//       options: [
//         { text: "1", value: "w-100" },
//         { text: "2", value: "w-50" },
//         { text: "3", value: "w-33" },
//         { text: "4", value: "w-25" },
//         { text: "5", value: "w-20" },
//         { text: "6", value: "w-16" },
//         { text: "7", value: "w-14" },
//         { text: "8", value: "w-12" },
//         { text: "9", value: "w-11" },
//         { text: "10", value: "w-10" },
//         { text: "11", value: "w-9" },
//         { text: "12", value: "w-8" },
//       ],
//     };
//   },
//   components: {
//     appFilter: Filter,
//     appText: Text,
//     appObjectImage: ObjectImage,
//     appBackground: Background,
//     appObjectDesign: ObjectDesign,
//     appRowDesign: RowDesign,
//     appPointBar: PointBar,
//     appRowImage: RowImage,
//   },
//   computed: {
//     // Collects styling from Store.
//     styling() {
//       return this.$store.state.app.styling;
//     },
//     // Collects styling from Store.
//     rows() {
//       return this.$store.state.app.rows;
//     },
//     // Collects styling from Store.
//     groups() {
//       return this.$store.state.app.groups;
//     },
//   },
//   methods: {
//     /**
//      * Copies the objects of the row into another row.
//      */
//     mergeRow() {
//       for (var i = 0; i < this.rows.length; i++) {
//         if (this.rows[i].id == this.newRow) {
//           let numOfObjects = this.row.objects.length;
//           for (var x = 0; x < numOfObjects; x++) {
//             this.rows[i].objects.push(
//               JSON.parse(JSON.stringify(this.row.objects[x]))
//             );
//
//             var text = "";
//             var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
//
//             for (var o = 0; o < 4; o++)
//               text += charset.charAt(
//                 Math.floor(Math.random() * charset.length)
//               );
//
//             this.rows[i].objects[this.rows[i].objects.length - 1].id = text;
//           }
//         }
//       }
//     },
//     /**
//      * Copies the objects of the row into another row.
//      * And then deletes this row.
//      */
//     mergeAndDeleteRow() {
//       for (var i = 0; i < this.rows.length; i++) {
//         if (this.row.id != this.newRow && this.rows[i].id == this.newRow) {
//           for (var x = 0; x < this.row.objects.length; x++) {
//             this.rows[i].objects.push(this.row.objects[x]);
//           }
//           this.rows.splice(this.rows.indexOf(this.row), 1);
//           this.cleanCurrentComponent();
//         }
//       }
//     },
//     sortRowObjects() {
//       var rowObjectWidth = parseInt(this.row.objectWidth.replace(/\D/g, ""));
//       if (this.sortType == "1") {
//         // If the user want to sort the objects after size
//         this.row.objects.sort(function (a, b) {
//           var keyA, keyB;
//           if (b.objectWidth != "") {
//             keyB = parseInt(b.objectWidth.replace(/\D/g, ""));
//           } else {
//             keyB = rowObjectWidth;
//           }
//           if (a.objectWidth != "") {
//             keyA = parseInt(a.objectWidth.replace(/\D/g, ""));
//           } else {
//             keyA = rowObjectWidth;
//           }
//           // Compare the 2 dates
//           if (keyA > keyB) return -1;
//           if (keyA < keyB) return 1;
//           return 0;
//         });
//       } else if (this.sortType == "2") {
//         // If the user want to sort the objects after reverse size.
//         this.row.objects.sort(function (a, b) {
//           var keyA, keyB;
//           if (b.objectWidth != "") {
//             keyB = parseInt(b.objectWidth.replace(/\D/g, ""));
//           } else {
//             keyB = rowObjectWidth;
//           }
//           if (a.objectWidth != "") {
//             keyA = parseInt(a.objectWidth.replace(/\D/g, ""));
//           } else {
//             keyA = rowObjectWidth;
//           }
//           // Compare the 2 dates
//           if (keyA < keyB) return -1;
//           if (keyA > keyB) return 1;
//           return 0;
//         });
//       } else if (this.sortType == "3") {
//         // If the user wants to sort the objects after text length.
//         this.row.objects.sort(function (a, b) {
//           var keyA = a.text.length,
//             keyB = b.text.length;
//           // Compare the 2 dates
//           if (keyA > keyB) return -1;
//           if (keyA < keyB) return 1;
//           return 0;
//         });
//       } else if (this.sortType == "4") {
//         // If the user
//         this.row.objects.sort(function (a, b) {
//           var keyA = a.text.length,
//             keyB = b.text.length;
//           // Compare the 2 dates
//           if (keyA < keyB) return -1;
//           if (keyA > keyB) return 1;
//           return 0;
//         });
//       }
//     },
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     },
//     rowWasChanged() {
//       this.$emit("rowWasChanged", this.row);
//     },
//   },
// };
// </script>
