export default function ObjectStore() {
  return <></>;
}
// <template>
//   <v-col class="pa-0">
//     <!-- Will only show when the Boolean isEditModeOn is true. -->
//     <v-row class="pt-0 px-0" justify="center" v-if="isEditModeOn">
//       <v-btn icon>
//         <v-icon @click="currentComponent = 'appRequirement'">mdi-key-plus</v-icon>
//       </v-btn>
//       <v-row>
//         <v-col class="py-0 pr-1">
//           <v-select hide-details class="my-1" :items="pointTypes" v-model="score.id" item-text="name" item-value="id"
//             filled label="Point Type"></v-select>
//           <v-text-field hide-details type="number" class="my-1" filled v-model="score.value"
//             label="Value"></v-text-field>
//         </v-col>
//
//         <!-- Where the user places inn the value the object will cost/give -->
//         <v-col class="py-0 pl-2">
//           <v-text-field hide-details filled class="my-1" v-model="score.beforeText" label="Text Before"></v-text-field>
//           <v-text-field hide-details filled class="my-1" v-model="score.afterText" label="Text After"></v-text-field>
//         </v-col>
//       </v-row>
//
//       <v-row>
//         <v-col cols="6" class="pa-2" v-for="(required, index) in score.requireds" :key="required.index">
//           <v-card>
//             <span v-if="required.type == 'id'">
//               <!--
//               <v-checkbox
//                 v-model="required.showRequired"
//                 hide-details
//                 label="Show Requirement"
//                 class
//               ></v-checkbox>-->
//
//               <v-text-field v-show="required.showRequired" hide-details filled v-model="required.beforeText"
//                 label="Text Before"></v-text-field>
//
//               <v-text-field v-show="required.showRequired" hide-details filled v-model="required.afterText"
//                 label="Text After"></v-text-field>
//
//               <v-text-field hide-details v-model="required.reqId"
//                 :label="required.required ? 'Selected Id' : 'Not Selected Id'" filled></v-text-field>
//
//               <v-btn @click="deleteEvent(index, score.requireds)" class="pa-0" style="color: black">Delete</v-btn>
//             </span>
//
//             <span v-else-if="required.type == 'points'">
//               <v-select hide-details :items="pointReqOperators" v-model="required.operator" item-text="text"
//                 item-value="value" filled label="Operator"></v-select>
//
//               <v-select hide-details :items="pointTypes" v-model="required.reqId" item-text="name" item-value="id"
//                 filled label="Point Type"></v-select>
//
//               <v-text-field hide-details type="number" v-model="required.reqPoints"
//                 :label="required.required ? 'More Than' : 'Less Than'" filled></v-text-field>
//               <v-btn @click="deleteEvent(index, score.requireds)" style="color: black">Delete</v-btn>
//             </span>
//
//             <span v-else-if="required.type == 'or'">
//               <span v-for="orRequired in required.orRequired" :key="orRequired.index">
//                 <v-text-field :label="required.required
//                   ? 'Selected Choice Id'
//                   : 'Not Selected Choice Id'
//                   " hide-details v-model="orRequired.req" :placeholder="required.required ? 'Selected Id' : 'Not Selected Id'
//                     " filled></v-text-field>
//               </span>
//
//               <v-btn @click="deleteEvent(index, score.requireds)" style="color: black">Delete</v-btn>
//             </span>
//           </v-card>
//         </v-col>
//       </v-row>
//       <!-- This is the holder that holds the requirement-component -->
//       <component :is="currentComponent" :row="score" :object="score" @rowWasChanged="object = $event"
//         @cleanCurrentComponent="currentComponent = $event"></component>
//     </v-row>
//
//     <!-- Preview -->
//     <v-row v-else-if="
//       !pointType.imageSidePlacement && score.showScore && isPointtypeActivated
//     ">
//       <v-col class="pa-0 ma-0" :style="scoreText">
//         <div :style="pointType.imageOnSide
//           ? 'padding-left:3px;padding-right:3px'
//           : 'padding-left:1px;padding-right:2px'
//           ">
//           <img v-if="pointType.iconIsOn && !pointType.imageOnSide" :style="'float: left; width:' +
//             pointType.iconWidth +
//             'px;height:' +
//             pointType.iconHeight +
//             'px;'
//             " :src="pointType.image" />
//         </div>
//         <div>
//           <p v-html="$sanitize(
//             score.beforeText + ' ' + scoreValue + ' ' + score.afterText,
//             sanitizeArg
//           )
//             " class="pa-0 ma-0"></p>
//         </div>
//         <div :style="pointType.imageOnSide
//           ? 'padding-left:3px;padding-right:3px'
//           : 'padding-left:1px;padding-right:2px'
//           ">
//           <img v-if="pointType.iconIsOn && pointType.imageOnSide" :style="'float: left; width:' +
//             pointType.iconWidth +
//             'px;height:' +
//             pointType.iconHeight +
//             'px;'
//             " :src="pointType.image" />
//         </div>
//       </v-col>
//     </v-row>
//
//     <v-row v-else-if="
//       pointType.imageSidePlacement && score.showScore && isPointtypeActivated
//     ">
//       <v-col class="pa-0 ma-0" :style="scoreText">
//         <div>
//           <p v-html="$sanitize(score.beforeText + '  ', sanitizeArg)" class="pa-0 ma-0"></p>
//         </div>
//         <div :style="!pointType.imageOnSide
//           ? 'padding-left:3px;padding-right:3px'
//           : 'padding-left:1px;padding-right:2px'
//           ">
//           <img v-if="pointType.iconIsOn && !pointType.imageOnSide" :style="'float: left; width:' +
//             pointType.iconWidth +
//             'px;height:' +
//             pointType.iconHeight +
//             'px;'
//             " :src="pointType.image" />
//         </div>
//         <div>
//           <p v-html="$sanitize(' ' + scoreValue + ' ', sanitizeArg)" class="pa-0 ma-0"></p>
//         </div>
//         <div :style="pointType.imageOnSide
//           ? 'padding-left:3px;padding-right:3px'
//           : 'padding-left:1px;padding-right:2px'
//           ">
//           <img v-if="pointType.iconIsOn && pointType.imageOnSide" :style="'float: left; width:' +
//             pointType.iconWidth +
//             'px;height:' +
//             pointType.iconHeight +
//             'px;'
//             " :src="pointType.image" />
//         </div>
//         <div>
//           <p v-html="$sanitize(score.afterText, sanitizeArg)" class="pa-0 ma-0"></p>
//         </div>
//       </v-col>
//     </v-row>
//   </v-col>
// </template>
//
// <script>
// // Holds the buttons for adding requirements.
// import AppRequirement from "../row/Requirement.vue";
//
// export default {
//   props: {
//     score: Object,
//     isEditModeOn: Boolean,
//   },
//   data: function () {
//     return {
//       currentComponent: "",
//       pointReqOperators: [
//         { text: "+ More than", value: "1" },
//         { text: "+= More or equal", value: "2" },
//         { text: "= Equal to", value: "3" },
//         { text: "-= Less or equal", value: "4" },
//         { text: "- Less than", value: "5" },
//       ],
//       pointType: {
//         id: "text",
//         name: "Points",
//         startingSum: 0,
//         activatedId: "",
//         afterText: "",
//       },
//       posOrNeg: null,
//       sanitizeArg: {
//         allowedTags: [
//           "address",
//           "article",
//           "aside",
//           "footer",
//           "header",
//           "h1",
//           "h2",
//           "h3",
//           "h4",
//           "h5",
//           "h6",
//           "hgroup",
//           "main",
//           "nav",
//           "section",
//           "blockquote",
//           "dd",
//           "div",
//           "dl",
//           "dt",
//           "figcaption",
//           "figure",
//           "hr",
//           "li",
//           "main",
//           "ol",
//           "p",
//           "pre",
//           "ul",
//           "a",
//           "abbr",
//           "b",
//           "bdi",
//           "bdo",
//           "br",
//           "cite",
//           "code",
//           "data",
//           "dfn",
//           "em",
//           "i",
//           "kbd",
//           "mark",
//           "q",
//           "rb",
//           "rp",
//           "rt",
//           "rtc",
//           "ruby",
//           "s",
//           "samp",
//           "small",
//           "span",
//           "strong",
//           "sub",
//           "sup",
//           "time",
//           "u",
//           "var",
//           "wbr",
//           "caption",
//           "col",
//           "colgroup",
//           "table",
//           "tbody",
//           "td",
//           "tfoot",
//           "th",
//           "thead",
//           "tr",
//         ],
//         allowedAttributes: {
//           p: ["style"],
//           b: ["style"],
//           span: ["style"],
//           strong: ["style"],
//         },
//         allowedStyles: {
//           "*": {
//             // Match HEX and RGB
//             color: [
//
//               /^#(0x)?[0-9a-f]+$/i, /^[A-Za-z]+$/,
//               /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
//             ],
//             "text-align": [/^left$/, /^right$/, /^center$/],
//             // Match any number with px, em, or %
//             "font-size": [/^\d+(?:px|em|%)$/],
//           },
//           p: {
//             "font-size": [/^\d+rem$/],
//           },
//         },
//       },
//     };
//   },
//   components: {
//     AppRequirement,
//   },
//   created() {
//     for (var i = 0; i < this.pointTypes.length; i++) {
//       if (this.pointTypes[i].id == this.score.id)
//         this.pointType = this.pointTypes[i];
//     }
//
//     this.posOrNeg = this.score.value < 0 ? true : false;
//   },
//   computed: {
//     // Checks if the 'activatedId' of current pointtype is something else than '',
//     // And if it is in the Activated-array.
//     pointTypes() {
//       return this.$store.state.app.pointTypes;
//     },
//     styling() {
//       return this.$store.state.app.styling;
//     },
//     scoreText() {
//       let text =
//         'font-family: "' +
//         this.styling.scoreText +
//         '";' +
//         "font-size: " +
//         this.styling.scoreTextSize +
//         "%;" +
//         "text-align: " +
//         this.styling.scoreTextAlign +
//         ";display: flex; align-items: center; justify-content:center;";
//
//       if (typeof this.pointType !== "undefined") {
//         if (this.pointType.pointColorsIsOn) {
//           if (this.posOrNeg) {
//             text += "color: " + this.pointType.positiveColor.hex + ";";
//           } else {
//             text += "color: " + this.pointType.negativeColor.hex + ";";
//           }
//         } else {
//           text += "color: " + this.styling.scoreTextColor + ";";
//         }
//       }
//
//       return text;
//       //"color: " + this.styling.scoreTextColor + ";";
//     },
//     // Returns the score value, but changes it to positive.
//     scoreValue() {
//       let value = this.posOrNeg ? this.score.value * -1 : this.score.value;
//
//       if (this.pointType.plussOrMinusAdded) {
//         if (
//           (this.posOrNeg && !this.pointType.plussOrMinusInverted) ||
//           (this.pointType.plussOrMinusInverted && !this.posOrNeg)
//         ) {
//           value = "+" + value;
//         } else {
//           value = "-" + value;
//         }
//       }
//
//       return value;
//     },
//     activated() {
//       return this.$store.state.app.activated;
//     },
//     // Checks if the pointype has been avtivated if there is a activatedId in it.
//     isPointtypeActivated() {
//       for (var i = 0; i < this.pointTypes.length; i++) {
//         if (
//           this.pointTypes[i].id == this.score.id &&
//           this.pointTypes[i].activatedId != ""
//         )
//           return this.activated.includes(this.pointTypes[i].activatedId)
//             ? true
//             : false;
//       }
//       return true;
//     },
//   },
//   methods: {
//     // Removes a object from a array, the parameter is the objects index and the array that holds it.
//     deleteEvent: function (index, array) {
//       array.splice(index, 1);
//     },
//     // Updates the object.
//     updateObject() {
//       this.$emit("scoreWasChanged", this.score);
//     },
//     // Collects the name from the Select, and places it in the score's name.
//     changedOption(event) {
//       this.score.name =
//         event.target.options[event.target.options.selectedIndex].text;
//     },
//   },
// };
// </script>
