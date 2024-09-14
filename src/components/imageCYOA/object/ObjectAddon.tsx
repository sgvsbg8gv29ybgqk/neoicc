export default function ObjectAddon() {
  return <></>;
}
// <template>
//   <span>
//     <!-- Will only show when the Boolean isEditModeOn is true. -->
//     <v-col class="pa-0 pb-1" v-if="isEditModeOn">
//       <v-btn icon>
//         <v-icon @click="currentComponent = 'appRequirement'">mdi-key-plus</v-icon>
//       </v-btn>
//
//       <!-- The  of Image -->
//       <v-col cols="12" class="pt-0 px-12">
//         <v-col class="px-0 pt-1">
//           <v-img @click="currentComponent = 'appImageUpload'" max-height="175" contain :src="addon.image"></v-img>
//         </v-col>
//
//         <v-btn @click="currentComponent = 'appImageUpload'" style="color:black">Change Image</v-btn>
//       </v-col>
//
//       <v-text-field hide-details class="pb-1" v-model="addon.title" filled label="Addon Title"></v-text-field>
//       <v-textarea hide-details filled label="Addon Text" v-model="addon.text"></v-textarea>
//
//       <v-row>
//         <v-col cols="6" class="pa-2" v-for="(required, index) in addon.requireds" :key="required.index">
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
//               <v-btn @click="deleteEvent(index, addon.requireds)" class="pa-0" style="color:black">Delete</v-btn>
//             </span>
//
//             <span v-else-if="required.type == 'points'">
//               <v-select hide-details :items="pointReqOperators" v-model="required.operator" item-text="text"
//                 item-value="value" filled label="Operator"></v-select>
//
//               <v-select hide-details :items="pointTypes" v-model="required.reqId" item-text="name" item-value="id"
//                 filled label="Point Type"></v-select>
//
//               <v-text-field hide-details v-model="required.reqPoints"
//                 :label="required.required ? 'More Than' : 'Less Than'" filled></v-text-field>
//               <v-btn @click="deleteEvent(index, addon.requireds)" style="color:black">Delete</v-btn>
//             </span>
//
//             <span v-else-if="required.type == 'or'">
//               <span v-for="orRequired in required.orRequired" :key="orRequired.index">
//                 <v-text-field :label="required.required ? 'Selected Choice Id' : 'Not Selected Choice Id'" hide-details
//                   v-model="orRequired.req" :placeholder="required.required ? 'Selected Id' : 'Not Selected Id'"
//                   filled></v-text-field>
//               </span>
//
//               <v-btn @click="deleteEvent(index, addon.requireds)" style="color:black">Delete</v-btn>
//             </span>
//           </v-card>
//         </v-col>
//       </v-row>
//     </v-col>
//
//     <!-- Preview -->
//     <div v-else-if="checkRequireds(addon)">
//       <!-- Template 1 - Picture on top. -->
//       <span style="width:100%;" class="ma-0">
//         <v-tooltip v-if="addon.imageSourceTooltip !== '' && typeof addon.imageSourceTooltip !== 'undefined'" top
//           open-delay="1500">
//           <template v-slot:activator="{ on }">
//             <img v-on="on" :style="addon.image != '' ? objectImage : ''" :src="addon.image" />
//           </template>
//           <span>{{ addon.imageSourceTooltip }}</span>
//         </v-tooltip>
//
//         <!-- If there is no tooltip -->
//         <img v-else :style="addon.image != '' ? objectImage : ''" :src="addon.image" />
//
//         <span>
//           <h4 v-show="addon.title != ''" :style="addonTitle" v-html="$sanitize(replaceAddonTitle, sanitizeArg)"></h4>
//           <p style="white-space: pre-line;" :style="addonText" v-html="$sanitize(replaceAddonText, sanitizeArg)"></p>
//         </span>
//       </span>
//     </div>
//
//     <!-- This is the holder that holds the requirement-component -->
//     <component :is="currentComponent" :row="addon" :object="addon" @rowWasChanged="object = $event"
//       @cleanCurrentComponent="currentComponent = $event"></component>
//   </span>
// </template>
//
// <script>
// // Holds the buttons for adding requirements.
// import AppRequirement from "../row/Requirement.vue";
// import AppImageUpload from "../row/ImageUpload.vue";
//
// export default {
//   props: {
//     addon: Object,
//     isEditModeOn: Boolean,
//     row: Object
//   },
//   data: function () {
//     return {
//       window: {
//         width: 0,
//         height: 0
//       },
//       currentComponent: "",
//       sanitizeArg: {
//         allowedTags: ["address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4",
//           "h5", "h6", "hgroup", "main", "nav", "section", "blockquote", "dd", "div",
//           "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre",
//           "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
//           "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
//           "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
//           "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr"],
//         allowedAttributes: {
//           'p': ['style'], 'b': ['style'], 'span': ['style'], 'strong': ['style']
//         },
//         allowedStyles: {
//           '*': {
//             // Match HEX and RGB
//             'color': [/^#(0x)?[0-9a-f]+$/i, /^[A-Za-z]+$/, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
//             'text-align': [/^left$/, /^right$/, /^center$/],
//             // Match any number with px, em, or %
//             'font-size': [/^\d+(?:px|em|%)$/]
//           },
//           'p': {
//             'font-size': [/^\d+rem$/]
//           }
//         }
//       },
//       pointReqOperators: [
//         { text: "+ More than", value: "1" },
//         { text: "+= More or equal", value: "2" },
//         { text: "= Equal to", value: "3" },
//         { text: "-= Less or equal", value: "4" },
//         { text: "- Less than", value: "5" }
//       ]
//     };
//   },
//   components: {
//     AppRequirement,
//     AppImageUpload
//   },
//   computed: {
//     // Used on the img in the object.
//     objectImage() {
//       let style =
//         "width:" +
//         this.styling.objectImageWidth +
//         "%;margin-top:" +
//         this.styling.objectImageMarginTop +
//         "%;margin-bottom:" +
//         this.styling.objectImageMarginBottom +
//         "%;";
//
//       // Border Radius
//       let suffix = this.styling.objectImgBorderRadiusIsPixels ? "px" : "%";
//
//       style +=
//         "border-radius: " +
//         this.styling.objectImgBorderRadiusTopLeft +
//         +"" +
//         suffix +
//         " " +
//         this.styling.objectImgBorderRadiusTopRight +
//         +"" +
//         suffix +
//         " " +
//         this.styling.objectImgBorderRadiusBottomRight +
//         +"" +
//         suffix +
//         " " +
//         this.styling.objectImgBorderRadiusBottomLeft +
//         +"" +
//         suffix +
//         ";";
//
//       if (this.styling.objectImgOverflowIsOn) {
//         style += "overflow:hidden;";
//       }
//
//       if (this.styling.objectImgBorderIsOn) {
//         style +=
//           "border: " +
//           this.styling.objectImgBorderWidth +
//           "" +
//           "px " +
//           this.styling.objectImgBorderStyle +
//           " " +
//           this.styling.objectImgBorderColor +
//           "" +
//           ";";
//       }
//
//       return style;
//     },
//     activated() {
//       return this.$store.state.app.activated;
//     },
//     pointTypes() {
//       return this.$store.state.app.pointTypes;
//     },
//     app() {
//       return this.$store.state.app;
//     },
//     addonTitle() {
//       return (
//         'font-family: "' +
//         this.styling.addonTitle +
//         '";' +
//         "font-size: " +
//         this.styling.addonTitleTextSize +
//         "%;" +
//         "text-align: " +
//         this.styling.addonTitleAlign +
//         ";" +
//         "color: " +
//         this.styling.addonTitleColor +
//         ";"
//       );
//     },
//     addonText() {
//       return (
//         'font-family: "' +
//         this.styling.addonText +
//         '";' +
//         "font-size: " +
//         this.styling.addonTextTextSize +
//         "%;" +
//         "text-align: " +
//         this.styling.addonTextAlign +
//         ";" +
//         "color: " +
//         this.styling.addonTextColor +
//         ";"
//       );
//     },
//     styling() {
//       if (this.row.isPrivateStyling) return this.row.styling;
//       else return this.$store.state.app.styling;
//     },
//     replaceAddonTitle() {
//       let newObjectText = this.addon.title;
//       let isPointType = false;
//
//       // TODO Add point type if it is.
//
//       if (typeof this.$store.state.app.words != "undefined") {
//         // Checks if the word is the ID of a point-type.
//         for (let r = 0; r < this.app.words.length; r++) {
//           isPointType = false;
//           for (let u = 0; u < this.app.pointTypes.length; u++) {
//             if (this.app.pointTypes[u].id == this.app.words[r].id) {
//               newObjectText = newObjectText.replace(
//                 new RegExp(this.app.words[r].id, "g"),
//                 this.app.pointTypes[u].startingSum
//               );
//               isPointType = true;
//             }
//           } // If its not a point-type.
//           if (!isPointType) {
//             for (let i = 0; i < this.app.words.length; i++) {
//               newObjectText = newObjectText.replace(
//                 new RegExp(this.app.words[i].id, "g"),
//                 this.app.words[i].replaceText
//               );
//             }
//           }
//         }
//       }
//       return newObjectText;
//     },
//     replaceAddonText() {
//       let newObjectText = this.addon.text;
//       let isPointType = false;
//
//       // TODO Add point type if it is.
//
//       if (typeof this.$store.state.app.words != "undefined") {
//         // Checks if the word is the ID of a point-type.
//         for (let r = 0; r < this.app.words.length; r++) {
//           isPointType = false;
//           for (let u = 0; u < this.app.pointTypes.length; u++) {
//             if (this.app.pointTypes[u].id == this.app.words[r].id) {
//               newObjectText = newObjectText.replace(
//                 new RegExp(this.app.words[r].id, "g"),
//                 this.app.pointTypes[u].startingSum
//               );
//               isPointType = true;
//             }
//           } // If its not a point-type.
//           if (!isPointType) {
//             for (let i = 0; i < this.app.words.length; i++) {
//               newObjectText = newObjectText.replace(
//                 new RegExp(this.app.words[i].id, "g"),
//                 this.app.words[i].replaceText
//               );
//             }
//           }
//         }
//       }
//       return newObjectText;
//     }
//   },
//   methods: {
//     // Checks if the id's and points allow this object to be selected.
//     checkRequireds(object) {
//       return this.$store.getters.checkRequireds(object);
//     },
//     // Removes a object from a array, the parameter is the objects index and the array that holds it.
//     deleteEvent: function (index, array) {
//       array.splice(index, 1);
//     }
//   }
// };
// </script>
//
// <style scoped>
// .btn {
//   margin: 5px;
//   font-size: small;
// }
//
// .row {
//   padding: 10px;
// }
// </style>
//
