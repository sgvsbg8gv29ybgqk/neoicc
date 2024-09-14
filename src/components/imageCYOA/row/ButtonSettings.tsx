export default function ButtonSettings() {
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
//               <!-- The number of random choices that will be selected -->
//               <v-text-field hide-details label="Button Text" v-model="row.buttonText" filled></v-text-field>
//
//               <v-radio-group v-model="row.buttonTypeRadio" column>
//                 <v-radio label="Point Type Sum Addon" color="blue" value="sumaddon"></v-radio>
//                 <v-radio label="Other" color="blue" value="choiceselect"></v-radio>
//               </v-radio-group>
//
//               <v-select v-if="!row.buttonRandom" v-show="row.buttonTypeRadio == 'choiceselect'" hide-details
//                 :items="variables" v-model="row.buttonId" item-text="id" item-value="id" filled
//                 label="Variable"></v-select>
//               <v-text-field hide-details v-show="row.buttonTypeRadio == 'choiceselect'"
//                 v-if="row.buttonRandom && !row.isWeightedRandom" label="Number of random choices that will be selected"
//                 v-model="row.buttonRandomNumber" filled></v-text-field>
//               <v-switch hide-details v-show="row.buttonTypeRadio == 'choiceselect'" v-model="row.buttonRandom"
//                 class="ms-3" :label="`Random or Variable?`"></v-switch>
//
//               <v-switch hide-details v-model="row.btnPointAddon" v-show="row.buttonTypeRadio == 'sumaddon'" class="ms-3"
//                 :label="`Button will add a sum to a Point-type`"></v-switch>
//
//               <v-select class="pa-1" hide-details v-show="row.buttonTypeRadio == 'sumaddon'" v-if="row.btnPointAddon"
//                 :items="pointTypes" v-model="row.pointTypeRandom" item-text="name" item-value="id" filled
//                 label="Point-Type to use "></v-select>
//
//               <v-text-field type="number" hide-details v-show="row.buttonTypeRadio == 'sumaddon'"
//                 v-if="row.btnPointAddon" label="Button Min" v-model="row.randomMin" filled></v-text-field>
//
//               <v-text-field type="number" hide-details v-show="row.buttonTypeRadio == 'sumaddon'"
//                 v-if="row.btnPointAddon" label="Random Max" v-model="row.randomMax" filled></v-text-field>
//
//               <v-switch hide-details v-if="row.buttonRandom" v-show="row.buttonTypeRadio == 'choiceselect'"
//                 v-model="row.isWeightedRandom" class="ms-3" :label="`Uniform or Weighted?`"></v-switch>
//               <v-switch hide-details v-if="row.buttonRandom" v-show="row.buttonTypeRadio == 'choiceselect'"
//                 v-model="row.onlyUnselectedChoices" class="ms-3" :label="`Only Unselected choices?`"></v-switch>
//               <v-switch hide-details v-if="row.buttonRandom" v-show="row.buttonTypeRadio == 'choiceselect'"
//                 v-model="row.onlyIfNoChoices" class="ms-3"
//                 :label="`Button can only be pressed if no choices is selected?`"></v-switch>
//               <v-switch hide-details v-model="row.buttonType" v-show="row.buttonTypeRadio == 'choiceselect'"
//                 v-if="!row.buttonRandom" class="ms-3" :label="`Toggleable?`"></v-switch>
//             </v-col>
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
//     variables() {
//       return this.$store.state.app.variables;
//     },
//     pointTypes() {
//       return this.$store.state.app.pointTypes;
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
