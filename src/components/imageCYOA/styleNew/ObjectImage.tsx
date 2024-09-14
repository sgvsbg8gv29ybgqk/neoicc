export default function ObjectImage() {
  return <></>;
}
// <template>
//   <v-card width="100%">
//     <v-card-text>
//       <v-container>
//         <v-row>
//           <v-col>
//             <v-col class="py-0">Size and Margin of the choice image</v-col>
//             <v-text-field v-model="styling.objectImageWidth" label="Width of the image inside of a choice" suffix="%"
//               type="number" filled></v-text-field>
//             <v-text-field v-model="styling.objectImageMarginTop" label="Distance Between Top of choice and Image"
//               suffix="%" type="number" filled></v-text-field>
//             <v-text-field v-model="styling.objectImageMarginBottom" label="Distance Between Title and Image" suffix="%"
//               type="number" filled></v-text-field>
//           </v-col>
//
//           <v-col>
//             <v-col class="py-0">Style and Width of the border</v-col>
//             <v-select :items="borderStyles" v-model="styling.objectImgBorderStyle" item-value="text" filled
//               label="Style of the border"></v-select>
//             <v-text-field hide-details v-model="styling.objectImgBorderWidth" suffix="px" type="number"
//               label="Thickness of the border" filled>px</v-text-field>
//
//             <v-checkbox v-model="styling.objectImgBorderIsOn" hide-details label="Border Is On"
//               class="auto shrink mr-2"></v-checkbox>
//             <v-checkbox v-model="styling.objectImgOverflowIsOn" hide-details label="Cut off overflow images/text"
//               class="auto shrink mr-2 mt-0"></v-checkbox>
//           </v-col>
//
//           <v-col>
//             <v-col class="py-0">Rounded corners on the choices</v-col>
//             <v-row>
//               <v-col class="pt-0">
//                 <v-text-field v-model="styling.objectImgBorderRadiusTopLeft" label="Border-radius Top Left"
//                   placeholder="0" type="number" :suffix="borderRadiusSuffix" filled></v-text-field>
//                 <v-text-field hide-details v-model="styling.objectImgBorderRadiusTopRight"
//                   label="Border-radius Top Right" placeholder="0" type="number" :suffix="borderRadiusSuffix"
//                   filled></v-text-field>
//               </v-col>
//               <v-col class="pt-0">
//                 <v-text-field v-model="styling.objectImgBorderRadiusBottomRight" label="Border-radius Bottom Right"
//                   placeholder="0" type="number" :suffix="borderRadiusSuffix" filled></v-text-field>
//                 <v-text-field hide-details v-model="styling.objectImgBorderRadiusBottomLeft"
//                   label="Border-radius Bottom Left" placeholder="0" type="number" :suffix="borderRadiusSuffix"
//                   filled></v-text-field>
//               </v-col>
//             </v-row>
//             <v-switch v-model="styling.objectImgBorderRadiusIsPixels" label="Pixels or Percents" hide-details
//               class="auto shrink pt-0"></v-switch>
//           </v-col>
//
//           <v-col>
//             <v-col class="py-0">Style and Width of the border</v-col>
//
//             <v-color-picker class="mx-auto" canvas-height="50" v-model="styling.objectImgBorderColor"></v-color-picker>
//           </v-col>
//         </v-row>
//
//         <v-row>
//           <v-col class="py-0" cols="12">Object Fit<br />
//             How the images fit inside of the choice.<br>
//             A textfield where you can decide the Size of the container will appear in Row Settings when the switch is
//             on.</v-col>
//
//           <v-col>
//             <v-select :items="objectFitStyles" v-model="styling.objectImgObjectFillStyle" item-value="value"
//               item-text="text" filled hide-details label="Object Fill"></v-select>
//             <v-checkbox v-model="styling.objectImgObjectFillIsOn" hide-details label="Object Fit Is On"
//               class="auto shrink mr-2"></v-checkbox>
//           </v-col>
//
//
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
//       objectFitStyles: [
//         {
//           value: "fill",
//           text:
//             "Fill: The replaced content is sized to fill the element's content box. If necessary, the object will be stretched or squished to fit",
//         },
//         {
//           value: "contain",
//           text:
//             "Contain: The replaced content is scaled to maintain its aspect ratio while fitting within the element's content box",
//         },
//         {
//           value: "cover",
//           text:
//             "Cover: The replaced content is sized to maintain its aspect ratio while filling the element's entire content box. The object will be clipped to fit",
//         },
//         {
//           value: "scale-down",
//           text:
//             "Scale-down: The content is sized as if none or contain were specified (would result in a smaller concrete object size)",
//         },
//         { value: "none", text: "None: The replaced content is not resized" },
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
//       return this.styling.objectImgBorderRadiusIsPixels ? "px" : "%";
//     },
//   },
//   methods: {
//     cleanCurrentDesignComponent() {
//       this.$emit("cleanCurrentDesignComponent", "");
//     },
//   },
// };
// </script>
