export default function PointBar() {
  return <></>;
}
// <template>
//   <v-dialog v-model="dialog" max-width="600px" @click:outside="cleanCurrentComponent">
//     <v-card>
//       <v-card-title class="headline">Point Bar</v-card-title>
//
//       <v-card-text>
//         <v-container>
//           <v-row>
//             <v-col class="col-6">
//               Style of text inside the point-bar
//               <v-text-field v-model="styling.barTextPadding" label="Bar Text Padding" suffix="px" type="number"
//                 filled></v-text-field>
//               <v-text-field v-model="styling.barTextMargin" label="Bar Text Margin" suffix="px" type="number"
//                 filled></v-text-field>
//
//               <v-select :items="textFonts" v-model="styling.barTextFont" filled label="Text Font"></v-select>Bar Text
//               Color
//               <v-color-picker class="mx-auto" v-model="styling.barTextColor"></v-color-picker>
//             </v-col>
//             <v-col class="col-6">
//               Style of the bar itself
//               <v-text-field v-model="styling.barPadding" type="number" label="Bar Padding" suffix="px"
//                 filled></v-text-field>
//               <v-text-field v-model="styling.barMargin" type="number" label="Bar Margin" suffix="px"
//                 filled></v-text-field>
//               <v-text-field v-model="styling.barTextSize" type="number" label="Bar Text Size" suffix="px"
//                 filled></v-text-field>Bar Background Color
//               <v-color-picker class="mx-auto" v-model="styling.barBackgroundColor"></v-color-picker>
//             </v-col>
//           </v-row>
//
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
// export default {
//   props: {
//     from: String,
//     row: Object,
//     isAdvanced: Boolean
//   },
//   data: function () {
//     return {
//       dialog: true,
//       textFonts: [
//         { text: "Times New Roman", value: "Times New Roman" },
//         { text: "Arial", value: "Arial" },
//         { text: "Roboto", value: "Roboto" },
//         { text: "Courier New", value: "Courier New" },
//         { text: "Courier", value: "Courier" },
//         { text: "Verdana", value: "Verdana" },
//         { text: "Georgia", value: "Georgia" },
//         { text: "Comic Sans MS(NO!)", value: "Comic Sans MS" },
//         { text: "Candara", value: "Candara" },
//         { text: "Arial Black", value: "Arial Black" },
//         { text: "Impact", value: "Impact" },
//         { text: "Helvetica", value: "Helvetica" },
//         { text: "Calibri", value: "Calibri" },
//         { text: "Cambria", value: "Cambria" },
//         { text: "Trebuchet MS", value: "Trebuchet MS" },
//         { text: "Tahoma", value: "Tahoma" }
//       ]
//     };
//   },
//   computed: {
//     // Collects styling from Store.
//     styling() {
//       return this.$store.state.app.styling;
//     }
//   },
//   methods: {
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     }
//   }
// };
// </script>
