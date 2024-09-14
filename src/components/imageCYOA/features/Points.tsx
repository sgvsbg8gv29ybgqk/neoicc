export default function Points() {
  return <></>;
}
// <template>
//   <v-dialog scrollable v-model="dialog" max-width="1920px" @click:outside="cleanCurrentComponent">
//     <v-card>
//       <v-card-title class="headline">Point Types</v-card-title>
//
//       <v-card-text>
//         <v-container>
//           <v-row>
//             <v-col cols="12" md="4" v-for="point in pointTypes" :key="point.index">
//               <v-col>
//                 <v-switch v-model="point.belowZeroNotAllowed" class="mt-n2 mb-n6 ms-3"
//                   :label="`This score is not allowed to go under 0.`">
//                 </v-switch>
//                 <v-switch v-model="point.plussOrMinusAdded" class="mt-n2 mb-n6 ms-3"
//                   :label="`Add a + or - in front of the scores.`">
//                 </v-switch>
//                 <v-switch v-model="point.plussOrMinusInverted" v-if="point.plussOrMinusAdded" class="mt-n2 mb-n6 ms-3"
//                   :label="`Invert the + and -.`">
//                 </v-switch>
//                 <v-switch v-model="point.pointColorsIsOn" class="mt-n2 mb-n6 ms-3"
//                   :label="`Set colors for positive or negative.`">
//                 </v-switch>
//
//                 <v-switch v-model="point.iconIsOn" class="mt-n2 mb-n6 ms-3" :label="`This score has a Icon.`">
//                 </v-switch>
//
//                 <v-row v-if="point.iconIsOn" @click="currId = point.id">
//                   <v-col>
//                     <picture-input class="col" :ref="pictureInput"
//                       removeButtonClass="v-btn v-btn--contained theme--light v-size--default" :hideChangeButton="true"
//                       :removable="true" :crop="false" :zIndex="0" margin="50" @change="onImageChangeBackground"
//                       @remove="onImageRemoval(point.id)" :prefill="point.image" :custom-strings="{
//                         upload: '<h1>Error!</h1>',
//                         drag: 'Upload Background Image',
//                       }"></picture-input>
//                   </v-col>
//
//                   <v-col>
//                     <v-switch v-model="point.imageOnSide" class="mt-n2 mb-n6 ms-3"
//                       :label="`Image is on Right/Left side.`">
//                     </v-switch>
//
//                     <v-switch v-model="point.imageSidePlacement" class="mt-n2 mb-n6 ms-3"
//                       :label="`Image is Before/After text.`">
//                     </v-switch>
//
//                     <v-text-field hide-details v-model="point.iconWidth" label="The Image Width" filled></v-text-field>
//
//                     <v-text-field hide-details v-model="point.iconHeight" label="The Image Height"
//                       filled></v-text-field>
//                   </v-col>
//                 </v-row>
//
//                 <v-row>
//                   <v-col>
//                     <v-color-picker class="mx-auto" hide-canvas hide-sliders show-swatches mode="hexa"
//                       swatches-max-height="75" v-model="point.positiveColor"
//                       v-if="point.pointColorsIsOn"></v-color-picker></v-col>
//                   <v-col><v-color-picker class="mx-auto" hide-canvas show-swatches hide-sliders mode="hexa"
//                       swatches-max-height="75" v-model="point.negativeColor"
//                       v-if="point.pointColorsIsOn"></v-color-picker></v-col>
//                 </v-row>
//               </v-col>
//               <v-row>
//                 <v-col class="col-6" md="4">
//                   <v-text-field hide-details v-model="point.id" label="The Pointype Id" filled></v-text-field>
//                 </v-col>
//                 <v-col class="col-6" md="4">
//                   <v-text-field hide-details v-model="point.name" label="The Pointtype Name" filled></v-text-field>
//                 </v-col>
//                 <v-col class="col-6" md="4">
//                   <v-text-field hide-details type="number" v-model.number="point.startingSum" label="Starting Sum"
//                     filled></v-text-field>
//                 </v-col>
//                 <v-col class="col-6" md="4">
//                   <v-text-field hide-details v-model="point.activatedId" label="Id Needed To Show"
//                     placeholder="No Id Needed" filled></v-text-field>
//                 </v-col>
//                 <v-col class="col-6" md="4">
//                   <v-text-field hide-details v-model="point.beforeText" label="Text Before Number"
//                     filled></v-text-field>
//                 </v-col>
//                 <v-col class="col-6" md="4">
//                   <v-text-field hide-details v-model="point.afterText" label="Text After Number" filled></v-text-field>
//                 </v-col>
//                 <v-col class="col-12">
//                   <v-btn class="py-0" hide-details @click="deletePointsType(point)">Delete</v-btn>
//                 </v-col>
//               </v-row>
//             </v-col>
//           </v-row>
//         </v-container>
//       </v-card-text>
//
//       <v-card-actions>
//         <v-col cols="6">
//           <v-btn color="green darken-1" text @click="createNewPointType">Create new Point Type</v-btn>
//         </v-col>
//         <v-col cols="6">
//           <v-btn color="green darken-1" text @click="cleanCurrentComponent">Close</v-btn>
//         </v-col>
//       </v-card-actions>
//     </v-card>
//   </v-dialog>
// </template>
//
// <script>
// // The Picture Upload Component.
// import PictureInput from "vue-picture-input";
//
// export default {
//   data: function () {
//     return {
//       dialog: true,
//       currId: "",
//     };
//   },
//   components: {
//     PictureInput,
//   },
//   computed: {
//     // Collects styling from Store.
//     pointTypes() {
//       return this.$store.state.app.pointTypes;
//     },
//   },
//   methods: {
//     onImageChangeBackground(image) {
//       for (let i = 0; i < this.pointTypes.length; i++) {
//         if (this.pointTypes[i].id == this.currId) {
//           this.pointTypes[i].image = image;
//           this.pointTypes[i].iconIsOn = false;
//           console.log(this.pointTypes[i].iconIsOn);
//
//           this.pointTypes[i].iconIsOn = true;
//         }
//       }
//     },
//     onImageRemoval(id) {
//       for (let i = 0; i < this.pointTypes.length; i++) {
//         if (this.pointTypes[i].id == id) {
//           this.pointTypes[i].image = "";
//         }
//       }
//     },
//     // Cleans currentcomponent in parent component to close this dialog.
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     },
//     // Creates a new point type.
//     createNewPointType() {
//       // Creates the id
//       var text = "";
//       var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
//       for (var i = 0; i < 2; i++)
//         text += charset.charAt(Math.floor(Math.random() * charset.length));
//
//       this.$store.commit({
//         type: "addNewPointType",
//         id: text,
//         name: "Points",
//         startingSum: 0,
//         activatedId: "",
//         afterText: "",
//       });
//     },
//     // Deletes one of the point types.
//     deletePointsType(pointType) {
//       this.$store.commit("deletePointType", pointType);
//     },
//   },
// };
// </script>
