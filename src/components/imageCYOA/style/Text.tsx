export default function Text() {
  return <></>;
}
// <template>
//   <v-dialog v-model="dialog" max-width="1200px" @click:outside="cleanCurrentComponent">
//     <v-card>
//       <v-card-title class="headline">Text</v-card-title>
//       <v-card-text>
//         <v-container>
//           <v-row>
//             <v-col cols="3">
//               Row Title
//               <v-select :items="textFonts" v-model="styling.rowTitle" filled label="Text Font"></v-select>
//
//               <v-text-field v-model="styling.rowTitleTextSize" type="number" label="Text Size" filled>%</v-text-field>
//               <v-select :items="textAlignment" v-model="styling.rowTitleAlign" filled label="Text Alignment"></v-select>
//               <v-color-picker class="mx-auto" v-model="styling.rowTitleColor"></v-color-picker>
//             </v-col>
//
//             <v-col cols="3">
//               Row Text
//               <v-select :items="textFonts" v-model="styling.rowText" filled label="Text Font"></v-select>
//               <v-text-field v-model="styling.rowTextTextSize" type="number" label="Text Size" filled></v-text-field>
//               <v-select :items="textAlignment" v-model="styling.rowTextAlign" filled label="Text Alignment"></v-select>
//               <v-color-picker class="mx-auto" v-model="styling.rowTextColor"></v-color-picker>
//             </v-col>
//
//             <v-col cols="3">
//               Choice Title
//               <v-select :items="textFonts" v-model="styling.objectTitle" filled label="Text Font"></v-select>
//
//               <v-text-field v-model="styling.objectTitleTextSize" type="number" label="Text Size" filled></v-text-field>
//               <v-select :items="textAlignment" v-model="styling.objectTitleAlign" filled
//                 label="Text Alignment"></v-select>
//               <v-color-picker class="mx-auto" v-model="styling.objectTitleColor"></v-color-picker>
//             </v-col>
//
//             <v-col cols="3">
//               Choice Text
//               <v-select :items="textFonts" v-model="styling.objectText" filled label="Text Font"></v-select>
//               <v-text-field v-model="styling.objectTextTextSize" type="number" label="Text Size" filled></v-text-field>
//               <v-select :items="textAlignment" v-model="styling.objectTextAlign" filled
//                 label="Text Alignment"></v-select>
//               <v-color-picker class="mx-auto" v-model="styling.objectTextColor"></v-color-picker>
//             </v-col>
//
//             <v-col cols="3">
//               Addon Title
//               <v-select :items="textFonts" v-model="styling.addonTitle" filled label="Text Font"></v-select>
//               <v-text-field v-model="styling.addonTitleTextSize" type="number" label="Text Size" filled></v-text-field>
//               <v-select :items="textAlignment" v-model="styling.addonTitleAlign" filled
//                 label="Text Alignment"></v-select>
//               <v-color-picker class="mx-auto" v-model="styling.addonTitleColor"></v-color-picker>
//             </v-col>
//
//             <v-col cols="3">
//               Addon Text
//               <v-select :items="textFonts" v-model="styling.addonText" filled label="Text Font"></v-select>
//               <v-text-field v-model="styling.addonTextTextSize" type="number" label="Text Size" filled></v-text-field>
//               <v-select :items="textAlignment" v-model="styling.addonTextAlign" filled
//                 label="Text Alignment"></v-select>
//               <v-color-picker class="mx-auto" v-model="styling.addonTextColor"></v-color-picker>
//             </v-col>
//
//             <v-col cols="3">
//               Score and Requirement Text
//               <v-select :items="textFonts" v-model="styling.scoreText" filled label="Text Font"></v-select>
//               <v-text-field v-model="styling.scoreTextSize" type="number" label="Text Size" filled></v-text-field>
//               <v-select :items="textAlignment" v-model="styling.scoreTextAlign" filled
//                 label="Text Alignment"></v-select>
//               <v-color-picker class="mx-auto" v-model="styling.scoreTextColor"></v-color-picker>
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
//       textAlignment: [
//         { text: "Center", value: "center" },
//         { text: "Left", value: "left" },
//         { text: "Right", value: "right" },
//         { text: "Justify", value: "justify" }
//       ],
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
//     styling() {
//       if (this.from === "private") return this.row.styling;
//       else return this.$store.state.app.styling;
//     }
//   },
//   methods: {
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     }
//   }
// };
// </script>
