export default function ObjectDesign() {
  return <></>;
}
// <template>
//   <v-dialog v-model="dialog" max-width="1200px" @click:outside="cleanCurrentComponent">
//     <v-card>
//       <v-card-title class="headline">Choice Design</v-card-title>
//
//       <v-card-text>
//         <v-container>
//           <v-row>
//             <v-col>
//               <v-checkbox v-model="styling.objectHeight" hide-details
//                 label="If this is checked then every choice in a row will have identical height."
//                 class="auto shrink mr-2 mt-0"></v-checkbox>
//             </v-col>
//             <v-col>
//               <v-switch v-model="styling.objectDesignIsAdvanced" class="pt-0 mt-0" label="Advanced Design?"></v-switch>
//             </v-col>
//           </v-row>
//           <v-row v-if="styling.objectDesignIsAdvanced">
//             <v-row>
//               <v-col>
//                 <v-col class="pa-0">Margin and Padding of the choices</v-col>
//                 <v-text-field v-model="styling.objectMargin" type="number" suffix="px" label="Margin"
//                   filled></v-text-field>
//                 <v-text-field v-model="styling.objectTextPadding" type="number" suffix="px" label="Padding"
//                   filled></v-text-field>
//                 <v-col class="py-0 mt-n6">Style and Width of the border</v-col>
//
//                 <v-select :items="borderStyles" v-model="styling.objectBorderStyle" item-value="text" filled
//                   label="Border Styles"></v-select>
//                 <v-text-field v-model="styling.objectBorderWidth" suffix="px" type="number" label="Border Width"
//                   filled>px</v-text-field>
//                 <v-checkbox v-model="styling.objectBorderIsOn" hide-details label="Border is turned on"
//                   class="auto shrink mr-2 mt-0"></v-checkbox>
//               </v-col>
//               <v-col>
//                 <v-col class="py-0">Shadow that the choice makes</v-col>
//
//                 <v-text-field v-model="styling.objectDropShadowH" type="number" suffix="px" label="Horizontal Shadow"
//                   filled>px</v-text-field>
//                 <v-text-field v-model="styling.objectDropShadowV" type="number" suffix="px" label="Vertical Shadow"
//                   filled>px</v-text-field>
//                 <v-text-field v-model="styling.objectDropShadowBlur" type="number" suffix="px" label="Shadow Blur"
//                   filled>px</v-text-field>
//                 <v-text-field v-model="styling.objectDropShadowSpread" type="number" suffix="px" label="Shadow Spread"
//                   filled>px</v-text-field>
//                 <v-checkbox v-model="styling.objectDropShadowIsOn" hide-details label="Drop Shadow Is turned on"
//                   class="auto shrink mr-2 mt-0"></v-checkbox>
//               </v-col>
//               <v-col>
//                 <v-col class="py-0">Rounded corners on the choices</v-col>
//
//                 <v-text-field v-model="styling.objectBorderRadiusTopLeft" label="Border-radius Top Left" placeholder="0"
//                   type="number" :suffix="borderRadiusSuffix" filled></v-text-field>
//                 <v-text-field v-model="styling.objectBorderRadiusTopRight" label="Border-radius Top Right"
//                   placeholder="0" type="number" :suffix="borderRadiusSuffix" filled></v-text-field>
//                 <v-text-field v-model="styling.objectBorderRadiusBottomRight" label="Border-radius Bottom Right"
//                   placeholder="0" type="number" :suffix="borderRadiusSuffix" filled></v-text-field>
//                 <v-text-field v-model="styling.objectBorderRadiusBottomLeft" label="Border-radius Bottom Left"
//                   placeholder="0" type="number" :suffix="borderRadiusSuffix" filled></v-text-field>
//                 <v-switch v-model="styling.objectBorderRadiusIsPixels" label="Border-Radius Percent or Pixels?"
//                   hide-details class="auto shrink mt-n3"></v-switch>
//
//                 <v-checkbox v-model="styling.objectOverflowIsOn" hide-details label="Border-Radius Cuts off overflow"
//                   class="auto shrink mr-2 mt-0"></v-checkbox>
//               </v-col>
//             </v-row>
//           </v-row>
//
//           <v-row v-else>
//             <v-col>
//               <v-col class="pa-0">Margin and Padding of the choices</v-col>
//               <v-text-field v-model="styling.objectMargin" type="number" suffix="px" label="Space between the choices"
//                 filled></v-text-field>
//               <v-text-field v-model="styling.objectTextPadding" type="number" suffix="px"
//                 label="Space between the text in the choices and its border" filled></v-text-field>
//               <v-col class="py-0 mt-n4">Shadow that the choice makes</v-col>
//               <v-text-field v-model="styling.objectDropShadowH" @change="shadowIsChanged()" type="number" suffix="px"
//                 label="The Higher the number the bigger the shadow will be." filled>px</v-text-field>
//             </v-col>
//
//             <v-col>
//               <v-col class="py-0">Style and Width of the border</v-col>
//               <v-select :items="borderStyles" v-model="styling.objectBorderStyle" item-value="text" filled
//                 label="Border Styles"></v-select>
//               <v-text-field v-model="styling.objectBorderWidth" suffix="px" type="number" label="Border Width"
//                 filled>px</v-text-field>
//               <v-checkbox v-model="styling.objectBorderIsOn" hide-details label="Border is turned on"
//                 class="auto shrink mr-2 mt-0"></v-checkbox>
//             </v-col>
//             <v-col>
//               <v-col class="py-0">Rounded corners on the choices</v-col>
//               <v-text-field v-model="styling.objectBorderRadiusTopLeft" @change="topBorderIsChanged()"
//                 label="Rounded corners in the top of each choice" placeholder="0" type="number"
//                 :suffix="borderRadiusSuffix" filled></v-text-field>
//               <v-text-field v-model="styling.objectBorderRadiusBottomLeft" @change="bottomBorderIsChanged()"
//                 label="Rounded corners in the bottom of each choice" placeholder="0" type="number"
//                 :suffix="borderRadiusSuffix" filled></v-text-field>
//
//               <v-checkbox v-model="styling.objectDropShadowIsOn" hide-details label="Drop Shadow Is turned on"
//                 class="shrink mr-2 mt-0"></v-checkbox>
//             </v-col>
//           </v-row>
//           <v-row>
//             <v-col>
//               <v-col class="py-0 colorPickerText">Color of the Drop Shadow</v-col>
//               <v-color-picker class="mx-auto" v-model="styling.objectDropShadowColor"></v-color-picker> </v-col><v-col>
//               <v-checkbox v-model="styling.objectGradientIsOn" hide-details label="Object Gradient is turned on"
//                 class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field v-if="styling.objectGradientIsOn" v-model="styling.objectGradient"
//                 label="Gradient when not selected" filled hide-details
//                 placeholder="to left, blue, red">px</v-text-field>
//
//               <v-text-field v-if="styling.objectGradientIsOn" v-model="styling.objectGradientOnSelect"
//                 label="Gradient when selected" filled hide-details placeholder="to left, blue, red">px</v-text-field>
//
//               <v-text-field v-if="styling.objectGradientIsOn" v-model="styling.objectGradientOnReq"
//                 label="Gradient when missing requirement" filled hide-details
//                 placeholder="to left, blue, red">px</v-text-field>
//               <span v-if="styling.objectGradientIsOn">You might need to leave for the main menu if things stop
//                 updating, using the background colors for filters does not work
//                 well, so you'll need to place gradients in ALL of them, but
//                 using something like (green, green) works.
//                 <a target="_blank"
//                   href="https://www.w3schools.com/css/css3_gradients.asp">https://www.w3schools.com/css/css3_gradients.asp</a></span>
//             </v-col>
//             <v-col>
//               <v-col class="py-0 colorPickerText">Color of the choice border</v-col>
//               <v-color-picker class="mx-auto" v-model="styling.objectBorderColor"></v-color-picker>
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
//     // Collects styling from Store.
//     styling() {
//       if (this.from === "private") return this.row.styling;
//       else return this.$store.state.app.styling;
//     },
//     borderRadiusSuffix() {
//       return this.styling.objectBorderRadiusIsPixels ? "px" : "%";
//     },
//   },
//   methods: {
//     shadowIsChanged() {
//       this.styling.objectDropShadowV = this.styling.objectDropShadowH;
//       this.styling.objectDropShadowSpread = this.styling.objectDropShadowH;
//       this.styling.objectDropShadowBlur = this.styling.objectDropShadowH;
//     },
//     topBorderIsChanged() {
//       this.styling.objectBorderRadiusTopRight = this.styling.objectBorderRadiusTopLeft;
//     },
//     bottomBorderIsChanged() {
//       this.styling.objectBorderRadiusBottomRight = this.styling.objectBorderRadiusBottomLeft;
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
