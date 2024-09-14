export default function Text() {
  return <></>;
}
// <template>
//   <v-card width="100%">
//     <v-card-text>
//       <v-container>
//         <v-row>
//           <v-col>
//             Row Title
//             <v-row>
//               <v-col class="px-1">
//                 <v-select hide-details :items="textFonts" v-model="styling.rowTitle" filled
//                   label="Text Font"></v-select>
//               </v-col>
//               <v-col class="px-1">
//                 <v-text-field hide-details v-model="styling.rowTitleTextSize" type="number" label="Text Size"
//                   filled>%</v-text-field>
//               </v-col>
//             </v-row>
//
//             <v-col class="px-0" cols="12">
//               <v-btn-toggle v-model="styling.rowTitleAlign" tile color="deep-purple accent-3">
//                 <v-btn :value="alignment.value" v-for="alignment in textAlignment" :key="alignment.index"
//                   style="width:25%">{{ alignment.text }}</v-btn>
//               </v-btn-toggle>
//             </v-col>
//
//             <v-color-picker class="mx-auto" v-model="styling.rowTitleColor"></v-color-picker>
//           </v-col>
//
//           <v-col>
//             Row Text
//             <v-row>
//               <v-col class="px-1">
//                 <v-select hide-details :items="textFonts" v-model="styling.rowText" filled label="Text Font"></v-select>
//               </v-col>
//               <v-col class="px-1">
//                 <v-text-field hide-details v-model="styling.rowTextTextSize" type="number" label="Text Size"
//                   filled>%</v-text-field>
//               </v-col>
//             </v-row>
//
//             <v-col class="px-0" cols="12">
//               <v-btn-toggle v-model="styling.rowTextAlign" tile color="deep-purple accent-3">
//                 <v-btn :value="alignment.value" v-for="alignment in textAlignment" :key="alignment.index"
//                   style="width:25%">{{ alignment.text }}</v-btn>
//               </v-btn-toggle>
//             </v-col>
//
//             <v-color-picker class="mx-auto" v-model="styling.rowTextColor"></v-color-picker>
//           </v-col>
//
//           <v-col>
//             Choice Title
//             <v-row>
//               <v-col class="px-1">
//                 <v-select hide-details :items="textFonts" v-model="styling.objectTitle" filled
//                   label="Text Font"></v-select>
//               </v-col>
//               <v-col class="px-1">
//                 <v-text-field hide-details v-model="styling.objectTitleTextSize" type="number" label="Text Size"
//                   filled>%</v-text-field>
//               </v-col>
//             </v-row>
//
//             <v-col class="px-0" cols="12">
//               <v-btn-toggle v-model="styling.objectTitleAlign" tile color="deep-purple accent-3">
//                 <v-btn :value="alignment.value" v-for="alignment in textAlignment" :key="alignment.index"
//                   style="width:25%">{{ alignment.text }}</v-btn>
//               </v-btn-toggle>
//             </v-col>
//
//             <v-color-picker class="mx-auto" v-model="styling.objectTitleColor"></v-color-picker>
//           </v-col>
//
//           <v-col>
//             Choice Text
//             <v-row>
//               <v-col class="px-1">
//                 <v-select hide-details :items="textFonts" v-model="styling.objectText" filled
//                   label="Text Font"></v-select>
//               </v-col>
//               <v-col class="px-1">
//                 <v-text-field hide-details v-model="styling.objectTextTextSize" type="number" label="Text Size"
//                   filled>%</v-text-field>
//               </v-col>
//             </v-row>
//
//             <v-col class="px-0" cols="12">
//               <v-btn-toggle v-model="styling.objectTextAlign" tile color="deep-purple accent-3">
//                 <v-btn :value="alignment.value" v-for="alignment in textAlignment" :key="alignment.index"
//                   style="width:25%">{{ alignment.text }}</v-btn>
//               </v-btn-toggle>
//             </v-col>
//
//             <v-color-picker class="mx-auto" v-model="styling.objectTextColor"></v-color-picker>
//           </v-col>
//
//           <v-col>
//             Addon Title
//             <v-row>
//               <v-col class="px-1">
//                 <v-select hide-details :items="textFonts" v-model="styling.addonTitle" filled
//                   label="Text Font"></v-select>
//               </v-col>
//               <v-col class="px-1">
//                 <v-text-field hide-details v-model="styling.addonTitleTextSize" type="number" label="Text Size"
//                   filled>%</v-text-field>
//               </v-col>
//             </v-row>
//
//             <v-col class="px-0" cols="12">
//               <v-btn-toggle v-model="styling.addonTitleAlign" tile color="deep-purple accent-3">
//                 <v-btn :value="alignment.value" v-for="alignment in textAlignment" :key="alignment.index"
//                   style="width:25%">{{ alignment.text }}</v-btn>
//               </v-btn-toggle>
//             </v-col>
//
//             <v-color-picker class="mx-auto" v-model="styling.addonTitleColor"></v-color-picker>
//           </v-col>
//
//           <v-col>
//             Addon Text
//             <v-row>
//               <v-col class="px-1">
//                 <v-select hide-details :items="textFonts" v-model="styling.addonText" filled
//                   label="Text Font"></v-select>
//               </v-col>
//               <v-col class="px-1">
//                 <v-text-field hide-details v-model="styling.addonTextTextSize" type="number" label="Text Size"
//                   filled>%</v-text-field>
//               </v-col>
//             </v-row>
//
//             <v-col class="px-0" cols="12">
//               <v-btn-toggle v-model="styling.addonTextAlign" tile color="deep-purple accent-3">
//                 <v-btn :value="alignment.value" v-for="alignment in textAlignment" :key="alignment.index"
//                   style="width:25%">{{ alignment.text }}</v-btn>
//               </v-btn-toggle>
//             </v-col>
//
//             <v-color-picker class="mx-auto" v-model="styling.addonTextColor"></v-color-picker>
//           </v-col>
//
//           <v-col>
//             Score and Requirement Text
//             <v-row>
//               <v-col class="px-1">
//                 <v-select hide-details :items="textFonts" v-model="styling.scoreText" filled
//                   label="Text Font"></v-select>
//               </v-col>
//               <v-col class="px-1">
//                 <v-text-field hide-details v-model="styling.scoreTextSize" type="number" label="Text Size"
//                   filled>%</v-text-field>
//               </v-col>
//             </v-row>
//
//             <v-col class="px-0" cols="12">
//               <v-btn-toggle v-model="styling.scoreTextAlign" tile color="deep-purple accent-3">
//                 <v-btn :value="alignment.value" v-for="alignment in textAlignment" :key="alignment.index"
//                   style="width:25%">{{ alignment.text }}</v-btn>
//               </v-btn-toggle>
//             </v-col>
//
//             <v-color-picker class="mx-auto" v-model="styling.scoreTextColor"></v-color-picker>
//           </v-col>
//         </v-row>
//       </v-container>
//     </v-card-text>
//
//     <v-card-actions>
//       <v-btn color="green darken-1" text @click="cleanCurrentDesignComponent">Close</v-btn>
//     </v-card-actions>
//   </v-card>
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
//         { text: "Left", value: "left" },
//         { text: "Center", value: "center" },
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
//     cleanCurrentDesignComponent() {
//       this.$emit("cleanCurrentDesignComponent", "");
//     }
//   }
// };
// </script>
