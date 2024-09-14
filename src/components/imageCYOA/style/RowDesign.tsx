export default function RowDesign() {
  return <></>;
}
// <template>
//   <v-dialog v-model="dialog" max-width="1200px" @click:outside="cleanCurrentComponent">
//     <v-card>
//       <v-card-title class="headline">Row Design</v-card-title>
//
//       <v-card-text>
//         <v-container>
//           <v-switch v-model="styling.rowDesignIsAdvanced" label="Advanced Design?"></v-switch>
//
//           <v-row v-if="styling.rowDesignIsAdvanced">
//             <v-col>
//               <v-col class="py-0">Margin and Padding</v-col>
//
//               <v-text-field v-model="styling.rowMargin" label="Text Margin" suffix="px" filled
//                 type="number"></v-text-field>
//               <v-text-field v-model="styling.rowBodyMarginSides" label="Row Left and Right Margin" filled type="number"
//                 suffix="px">px</v-text-field>
//               <v-text-field v-model="styling.rowBodyMarginTop" label="Row Top Margin" suffix="px" filled
//                 type="number"></v-text-field>
//               <v-text-field v-model="styling.rowBodyMarginBottom" label="Row Bottom Margin" suffix="px" filled
//                 type="number"></v-text-field>
//               <v-col class="py-0">Text Padding</v-col>
//               <v-text-field v-model="styling.rowTextPaddingY" label="Text Left and Right Padding" suffix="px" filled
//                 type="number"></v-text-field>
//               <v-text-field v-model="styling.rowTextPaddingX" label="Text Top and Bottom Padding" suffix="px" filled
//                 type="number"></v-text-field>
//               <v-checkbox v-model="styling.rowOverflowIsOn" hide-details label="Border-Radius Cuts off overflow"
//                 class="shrink mr-2 mt-0"></v-checkbox>
//             </v-col>
//
//             <v-col>
//               <v-col class="py-0">Shadow that the row makes</v-col>
//
//               <v-text-field v-model="styling.rowDropShadowH" label="Horizontal Shadow" suffix="px" filled
//                 type="number"></v-text-field>
//               <v-text-field v-model="styling.rowDropShadowV" label="Vertical Shadow" suffix="px" filled
//                 type="number"></v-text-field>
//               <v-text-field v-model="styling.rowDropShadowBlur" label="Shadow Blur" suffix="px" filled
//                 type="number"></v-text-field>
//               <v-text-field v-model="styling.rowDropShadowSpread" label="Shadow Spread" suffix="px" filled
//                 type="number"></v-text-field>
//               <v-col class="py-0">The Width and Height of the buttons</v-col>
//               <v-text-field v-model="styling.rowButtonXPadding" label="Button Height" suffix="px" filled
//                 type="number"></v-text-field>
//               <v-text-field v-model="styling.rowButtonYPadding" label="Button Width" suffix="px" filled
//                 type="number"></v-text-field>
//               <v-checkbox v-model="styling.rowDropShadowIsOn" hide-details label="Drop Shadow Is turned on"
//                 class="shrink mr-2 mt-0"></v-checkbox>
//             </v-col>
//
//             <v-col>
//               <v-col class="py-0">Rounded corners on the choices</v-col>
//
//               <v-text-field v-model="styling.rowBorderRadiusTopLeft" label="Border-radius Top Left" placeholder="0"
//                 :suffix="borderRadiusSuffix" filled type="number"></v-text-field>
//               <v-text-field v-model="styling.rowBorderRadiusTopRight" label="Border-radius Top Right" placeholder="0"
//                 :suffix="borderRadiusSuffix" filled type="number"></v-text-field>
//               <v-text-field v-model="styling.rowBorderRadiusBottomRight" label="Border-radius Bottom Right"
//                 placeholder="0" :suffix="borderRadiusSuffix" filled type="number"></v-text-field>
//               <v-text-field v-model="styling.rowBorderRadiusBottomLeft" label="Border-radius Bottom Left"
//                 placeholder="0" :suffix="borderRadiusSuffix" filled type="number"></v-text-field>
//               <v-col class="py-0">Border Style and Width</v-col>
//
//               <v-select :items="borderStyles" v-model="styling.rowBorderStyle" item-value="text" filled
//                 label="Border Styles"></v-select>
//               <v-text-field v-model="styling.rowBorderWidth" suffix="px" label="Border Width" filled
//                 type="number">px</v-text-field>
//               <v-switch v-model="styling.rowBorderRadiusIsPixels" label="Border-Radius Percent or Pixels?" hide-details
//                 class="shrink mr-2 mt-0"></v-switch>
//
//               <v-checkbox v-model="styling.rowBorderIsOn" hide-details label="Border is turned on"
//                 class="shrink mr-2 mt-0"></v-checkbox>
//             </v-col>
//           </v-row>
//
//           <v-row v-else>
//             <v-col>
//               <v-col class="py-0">Size of the row</v-col>
//
//               <v-text-field v-model="styling.rowMargin" label="Width of the row top." suffix="px" filled
//                 type="number"></v-text-field>
//               <v-text-field v-model="styling.rowBodyMarginSides" label="Space at the right and left of the rows" filled
//                 type="number" suffix="%">px</v-text-field>
//               <v-text-field v-model="styling.rowBodyMarginBottom" label="Space Between Rows" suffix="px" filled
//                 type="number"></v-text-field>
//
//               <v-checkbox v-model="styling.rowBorderIsOn" hide-details label="Border is turned on"
//                 class="auto shrink mr-2 mt-0"></v-checkbox>
//             </v-col>
//
//             <v-col>
//               <v-col class="py-0">Padding of the text inside of row</v-col>
//               <v-text-field v-model="styling.rowTextPaddingY" label="Text Left and Right Padding" suffix="px" filled
//                 type="number"></v-text-field>
//               <v-text-field v-model="styling.rowTextPaddingX" label="Text Top and Bottom Padding" suffix="px" filled
//                 type="number"></v-text-field>
//               <v-col class="py-0 mt-n5">Shadow that the choice makes</v-col>
//               <v-text-field v-model="styling.rowDropShadowH" @change="shadowIsChanged()" type="number" suffix="px"
//                 label="The Higher the number the bigger the shadow will be." filled>px</v-text-field>
//               <v-checkbox v-model="styling.rowDropShadowIsOn" hide-details label="Drop Shadow Is turned on"
//                 class="shrink mr-2 mt-0"></v-checkbox>
//             </v-col>
//             <v-col>
//               <v-col class="py-0">Style and Width of the border</v-col>
//               <v-select :items="borderStyles" v-model="styling.rowBorderStyle" item-value="text" filled
//                 label="Border Styles"></v-select>
//               <v-text-field v-model="styling.rowBorderWidth" suffix="px" type="number" label="Border Width"
//                 filled>px</v-text-field>
//
//               <v-col class="py-0 mt-n5">Rounded corners on the choices</v-col>
//               <v-text-field v-model="styling.rowBorderRadiusTopLeft" @change="topBorderIsChanged()"
//                 label="Rounded corners in the top of each row" placeholder="0" type="number"
//                 :suffix="borderRadiusSuffix" filled></v-text-field>
//               <v-text-field v-model="styling.rowBorderRadiusBottomLeft" @change="bottomBorderIsChanged()"
//                 label="Rounded corners in the bottom of each row" placeholder="0" type="number"
//                 :suffix="borderRadiusSuffix" filled></v-text-field>
//             </v-col>
//           </v-row>
//           <v-row>
//             <v-col>
//               <v-col class="py-0 colorPickerText">Border Color</v-col>
//               <v-color-picker class="mx-auto" v-model="styling.rowBorderColor"></v-color-picker> </v-col><v-col>
//               <v-checkbox v-model="styling.rowGradientIsOn" hide-details label="Object Gradient is turned on"
//                 class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field v-if="styling.rowGradientIsOn" v-model="styling.rowGradient" label="Gradient" filled
//                 hide-details placeholder="to left, blue, red">px</v-text-field>
//
//               <span v-if="styling.rowGradientIsOn">You might need to leave for the main menu if things stop
//                 updating, using something like (green, green) works.
//                 <a target="_blank"
//                   href="https://www.w3schools.com/css/css3_gradients.asp">https://www.w3schools.com/css/css3_gradients.asp</a></span>
//             </v-col>
//             <v-col>
//               <v-col class="py-0 colorPickerText">Color of the choice shadow</v-col>
//               <v-color-picker class="mx-auto" v-model="styling.rowDropShadowColor"></v-color-picker>
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
// export default {
//   props: {
//     from: String,
//     row: Object,
//     isAdvanced: Boolean,
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
//         { text: "hidden" },
//       ],
//     };
//   },
//   computed: {
//     styling() {
//       if (this.from === "private") return this.row.styling;
//       else return this.$store.state.app.styling;
//     },
//     borderRadiusSuffix() {
//       return this.styling.rowBorderRadiusIsPixels ? "px" : "%";
//     },
//   },
//   methods: {
//     shadowIsChanged() {
//       this.styling.rowDropShadowV = this.styling.rowDropShadowH;
//       this.styling.rowDropShadowSpread = this.styling.rowDropShadowH;
//       this.styling.rowDropShadowBlur = this.styling.rowDropShadowH;
//     },
//     topBorderIsChanged() {
//       this.styling.rowBorderRadiusTopRight = this.styling.rowBorderRadiusTopLeft;
//     },
//     bottomBorderIsChanged() {
//       this.styling.rowBorderRadiusBottomRight = this.styling.rowBorderRadiusBottomLeft;
//     },
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     },
//   },
// };
// </script>
//
// <style scoped>
// .colorPickerText {
//   text-align: center;
// }
// </style>
