export default function Filter() {
  return <></>;
}
// <template>
//   <v-card width="100%">
//     <v-card-text>
//       <v-row align="center">
//         <v-col>
//           <!-- Selected Object Filter -->
//           <v-row class="modal-header">
//             <h5 class="modal-title">Filter on Choice that is selected</h5>
//           </v-row>
//
//           <v-row>
//             <v-col>
//               <v-checkbox dense v-model="styling.selFilterBlurIsOn" hide-details
//                 class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense v-model="styling.selFilterBlur" label="Blur" suffix="px" filled hide-details
//                 type="number"></v-text-field>
//
//               <v-checkbox dense v-model="styling.selFilterBrightIsOn" hide-details
//                 class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense v-model="styling.selFilterBright" label="Brightness" suffix="%" filled hide-details
//                 type="number"></v-text-field>
//               <v-checkbox dense v-model="styling.selFilterContIsOn" hide-details
//                 class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense v-model="styling.selFilterCont" label="Contrast" suffix="%" filled hide-details
//                 type="number"></v-text-field>
//             </v-col>
//
//             <v-col>
//               <v-checkbox dense v-model="styling.selFilterHueIsOn" hide-details
//                 class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense v-model="styling.selFilterHue" label="Hue-rotate" suffix="deg" filled hide-details
//                 type="number"></v-text-field>
//
//               <v-checkbox dense v-model="styling.selFilterInvertIsOn" hide-details
//                 class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense v-model="styling.selFilterInvert" label="Invert" suffix="%" filled hide-details
//                 type="number"></v-text-field>
//               <v-checkbox dense v-model="styling.selFilterSepiaIsOn" hide-details
//                 class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense v-model="styling.selFilterSepia" label="Sepia" suffix="%" filled hide-details
//                 type="number"></v-text-field>
//             </v-col>
//
//             <v-col>
//               <v-checkbox dense v-model="styling.selFilterOpacIsOn" hide-details
//                 class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense v-model="styling.selFilterOpac" label="Opacity" suffix="%" filled hide-details
//                 type="number"></v-text-field>
//
//               <v-checkbox dense v-model="styling.selFilterSaturIsOn" hide-details
//                 class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense v-model="styling.selFilterSatur" label="Saturate" suffix="%" filled hide-details
//                 type="number"></v-text-field>
//               <v-checkbox dense v-model="styling.selFilterGrayIsOn" hide-details
//                 class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense v-model="styling.selFilterGray" label="Greyscale" suffix="%" filled hide-details
//                 type="number"></v-text-field>
//             </v-col>
//
//             <v-col>
//               <v-checkbox dense v-model="styling.selBgColorIsOn" hide-details label="Background Color"
//                 class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-color-picker dense canvas-height="50" class="mx-auto" v-model="styling.selFilterBgColor"
//                 :disabled="!styling.selBgColorIsOn"></v-color-picker>
//             </v-col>
//           </v-row>
//         </v-col>
//
//         <v-col>
//           <!-- Required Object Filter -->
//           <v-row class="modal-header">
//             <h5 class="modal-title">Filter on Choice that is missing its required</h5>
//
//           </v-row>
//
//           <v-row>
//             <v-col>
//               <v-checkbox dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqFilterBlurIsOn"
//                 hide-details class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqFilterBlur" label="Blur"
//                 suffix="px" filled hide-details type="number"></v-text-field>
//
//               <v-checkbox dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqFilterBrightIsOn"
//                 hide-details class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqFilterBright"
//                 label="Brightness" suffix="%" filled hide-details type="number"></v-text-field>
//               <v-checkbox dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqFilterContIsOn"
//                 hide-details class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqFilterCont"
//                 label="Contrast" suffix="%" filled hide-details type="number"></v-text-field>
//             </v-col>
//
//             <v-col>
//               <!--<v-checkbox
//                 dense
//                 :disabled="styling.reqFilterVisibleIsOn"
//                 v-model="styling.reqFilterHueIsOn"
//                 hide-details
//                 class="auto shrink mr-2 mt-0"
//               ></v-checkbox>
//               <v-text-field
//                 dense
//                 :disabled="styling.reqFilterVisibleIsOn"
//                 v-model="styling.reqFilterHue"
//                 label="Hue-rotate"
//                 suffix="deg"
//                 filled
//                 hide-details
//                 type="number"
//               ></v-text-field>-->
//
//               <v-checkbox dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqFilterInvertIsOn"
//                 hide-details class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqFilterInvert"
//                 label="Invert" hide-details suffix="%" filled type="number"></v-text-field>
//               <v-checkbox dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqFilterSepiaIsOn"
//                 hide-details class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqFilterSepia"
//                 label="Sepia" hide-details suffix="%" filled type="number"></v-text-field>
//
//               <v-switch dense v-model="styling.reqFilterVisibleIsOn" :label="`Hide The Choice Completely`"></v-switch>
//             </v-col>
//
//             <v-col>
//               <v-checkbox dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqFilterOpacIsOn"
//                 hide-details class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqFilterOpac"
//                 label="Opacity" hide-details suffix="%" filled type="number"></v-text-field>
//
//               <v-checkbox dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqFilterSaturIsOn"
//                 hide-details class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqFilterSatur"
//                 label="Saturate" hide-details suffix="%" filled type="number"></v-text-field>
//               <v-checkbox dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqFilterGrayIsOn"
//                 hide-details class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-text-field dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqFilterGray"
//                 label="Greyscale" hide-details suffix="%" filled type="number"></v-text-field>
//             </v-col>
//
//             <v-col>
//               <v-checkbox dense :disabled="styling.reqFilterVisibleIsOn" v-model="styling.reqBgColorIsOn" hide-details
//                 label="Background Color" class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-color-picker dense canvas-height="50" class="mx-auto" v-model="styling.reqFilterBgColor"
//                 :disabled="!styling.reqBgColorIsOn || styling.reqFilterVisibleIsOn"></v-color-picker>
//             </v-col>
//           </v-row>
//         </v-col>
//       </v-row>
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
//       dialog: true
//     };
//   },
//   computed: {
//     // Collects styling from Store.
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
