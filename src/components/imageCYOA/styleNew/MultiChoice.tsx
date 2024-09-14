export default function MultiChoice() {
  return <></>;
}
// <template>
//   <v-card width="100%">
//
//     <v-card-text>
//       <v-container>
//         <v-row>
//           <v-col class="col-md-6">
//             Font size of the tier number
//             <v-text-field v-model="styling.multiChoiceTextSize" label="Number text size" suffix="%" type="number"
//               filled></v-text-field>
//           </v-col>
//
//           <v-col class="col-md-6">
//             The font of the tier number
//             <v-select :items="textFonts" v-model="styling.multiChoiceTextFont" filled
//               label="Number text font"></v-select>
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
//       if (this.from === "private") return this.row.styling;
//       else return this.$store.state.app.styling;
//     }
//   },
//   methods: {
//     cleanCurrentDesignComponent() {
//       this.$emit("cleanCurrentDesignComponent", "");
//     },
//   }
// };
// </script>
