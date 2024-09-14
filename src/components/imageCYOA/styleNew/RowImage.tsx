export default function RowImage() {
  return <></>;
}
// <template>
//   <v-card width="100%">
//     <v-card-text>
//       <v-container>
//         <v-row>
//           <v-col>
//             <v-col class="pt-0 pb-0">Size and Margin of the row image</v-col>
//
//             <v-text-field v-model="styling.rowImageWidth" label="Width of the image inside of a choice" suffix="%"
//               type="number" filled></v-text-field>
//             <v-text-field v-model="styling.rowImageMarginTop" label="Distance Between Top of row and Image" suffix="%"
//               type="number" filled></v-text-field>
//             <v-text-field v-model="styling.rowImageMarginBottom" label="Distance Between Title and Image" suffix="%"
//               placeholder="0" type="number" filled></v-text-field>
//           </v-col>
//           <v-col>
//             <v-col class="py-0">Style and Width of the border</v-col>
//
//             <v-select :items="borderStyles" v-model="styling.rowImgBorderStyle" item-value="text" filled
//               label="Style of the border"></v-select>
//             <v-text-field hide-details v-model="styling.rowImgBorderWidth" placeholder="0" suffix="px"
//               label="Thickness of the border" filled type="number"></v-text-field>
//
//             <v-row>
//               <v-col>
//                 <v-checkbox v-model="styling.rowImgBorderIsOn" hide-details label="Border Is On"
//                   class="auto shrink mr-2"></v-checkbox>
//               </v-col>
//               <v-col>
//
//                 <v-checkbox v-model="styling.rowImgOverflowIsOn" hide-details label="Cut off overflow"
//                   class="auto shrink mr-2"></v-checkbox>
//               </v-col>
//             </v-row>
//           </v-col>
//
//           <v-col>
//             <v-col class="py-0">Rounded corners on the choices</v-col>
//
//             <v-row>
//               <v-col class="py-0">
//                 <v-text-field v-model="styling.rowImgBorderRadiusTopLeft" label="Border-radius Top Left" placeholder="0"
//                   type="number" :suffix="borderRadiusSuffix" filled></v-text-field>
//                 <v-text-field v-model="styling.rowImgBorderRadiusTopRight" label="Border-radius Top Right"
//                   placeholder="0" type="number" :suffix="borderRadiusSuffix" filled hide-details></v-text-field>
//               </v-col>
//               <v-col class="pt-0">
//                 <v-text-field v-model="styling.rowImgBorderRadiusBottomRight" label="Border-radius Bottom Right"
//                   placeholder="0" type="number" :suffix="borderRadiusSuffix" filled></v-text-field>
//                 <v-text-field hide-details v-model="styling.rowImgBorderRadiusBottomLeft"
//                   label="Border-radius Bottom Left" placeholder="0" type="number" :suffix="borderRadiusSuffix"
//                   filled></v-text-field>
//               </v-col>
//             </v-row>
//
//             <v-switch v-model="styling.rowImgBorderRadiusIsPixels" label="Pixels or Percents" hide-details
//               class="auto shrink"></v-switch>
//           </v-col>
//           <v-col>
//             <v-col class="py-0">Style and Width of the border</v-col>
//
//             <v-color-picker class="mx-auto" canvas-height="70" v-model="styling.rowImgBorderColor"></v-color-picker>
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
//       borderStyles: [
//         { text: "solid" },
//         { text: "dotted" },
//         { text: "dashed" },
//         { text: "double" },
//         { text: "groove" },
//         { text: "ridge" },
//         { text: "inset" },
//         { text: "outset" },
//         { text: "hidden" }
//       ]
//     };
//   },
//   computed: {
//     // Collects styling from Store.
//     styling() {
//       if (this.from === "private") return this.row.styling;
//       else return this.$store.state.app.styling;
//     },
//     borderRadiusSuffix() {
//       return this.styling.rowImgBorderRadiusIsPixels ? "px" : "%";
//     }
//   },
//   methods: {
//     cleanCurrentDesignComponent() {
//       this.$emit("cleanCurrentDesignComponent", "");
//     }
//   }
// };
// </script>
