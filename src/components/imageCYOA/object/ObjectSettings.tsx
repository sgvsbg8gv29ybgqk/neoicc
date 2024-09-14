export default function ObjectSettings() {
  return <></>;
}
// i<template>
//   <v-dialog v-model="dialog" max-width="600px" @click:outside="cleanCurrentComponent">
//     <v-card>
//       <v-card-title class="headline">Row Settings</v-card-title>
//
//       <v-card-text>
//         <v-container>
//           <v-row>
//             <v-col cols="12">
//               Copy Choice Into Another Row
//               <v-select hide-details :items="rows" v-model="newRow" item-text="title" item-value="id" filled
//                 label="Copy this choice into..."></v-select>
//               <v-row class="pa-0">
//                 <v-col>
//                   <v-btn @click="mergeObject()" style="color: black">Copy</v-btn>
//                 </v-col>
//               </v-row>
//             </v-col>
//           </v-row>
//         </v-container>
//
//         <v-container>
//           <v-col>
//             <v-switch class="mt-n2 mb-n6 ms-3" v-model="row.isPrivateStyling"
//               @change="row.styling = JSON.parse(JSON.stringify(styling))" :label="`Use private styling?`"></v-switch>
//           </v-col>
//
//           <v-row v-if="row.isPrivateStyling">
//             <v-tooltip right open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-col>
//                   <v-btn v-on="on" @click="currentComponent = 'appFilter'" style="color: black">Manage Filter
//                     Design</v-btn>
//                 </v-col>
//               </template>
//               <span>
//                 Here you can change the filters for choices that are selected
//                 <br />and the one's you dont have the requirements for.
//               </span>
//             </v-tooltip>
//
//             <v-tooltip right open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-col>
//                   <v-btn v-on="on" @click="currentComponent = 'appText'" style="color: black">Manage Text Design</v-btn>
//                 </v-col>
//               </template>
//               <span>
//                 Here you can change the size, font and
//                 <br />color of the text on titles and text.
//               </span>
//             </v-tooltip>
//
//             <v-tooltip right open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-col>
//                   <v-btn v-on="on" @click="currentComponent = 'appObjectImage'" style="color: black">Manage Choices
//                     Image Design</v-btn>
//                 </v-col>
//               </template>
//               <span>
//                 Here you can change the margin and padding
//                 <br />of images on rows and objects.
//               </span>
//             </v-tooltip>
//
//             <v-tooltip right open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-col>
//                   <v-btn v-on="on" @click="currentComponent = 'appBackground'" style="color: black">Manage Background
//                     Design</v-btn>
//                 </v-col>
//               </template>
//               <span>
//                 Here you can change the color and place images in
//                 <br />the background of rows, choices and the whole project.
//               </span>
//             </v-tooltip>
//
//             <v-tooltip right open-delay="1000">
//               <template v-slot:activator="{ on }">
//                 <v-col>
//                   <v-btn v-on="on" @click="currentComponent = 'appObjectDesign'" style="color: black">Manage Choice
//                     Design</v-btn>
//                 </v-col>
//               </template>
//               <span>
//                 Here you can change the margin,
//                 <br />padding, borders, and drop-shadow on choices.
//               </span>
//             </v-tooltip>
//           </v-row>
//         </v-container>
//       </v-card-text>
//
//       <component v-bind:is="currentComponent" :from="'private'" :row="row" :currentComponent="currentComponent"
//         @cleanCurrentComponent="currentComponent = $event"></component>
//
//       <v-card-actions>
//         <v-btn color="green darken-1" text @click="cleanCurrentComponent">Close</v-btn>
//       </v-card-actions>
//     </v-card>
//   </v-dialog>
// </template>
//
// <script>
// import Filter from "../style/Filter.vue";
// import Text from "../style/Text.vue";
// import ObjectImage from "../style/ObjectImage.vue";
// import RowImage from "../style/RowImage.vue";
// import Background from "../style/Background.vue";
// import ObjectDesign from "../style/ObjectDesign.vue";
// import RowDesign from "../style/RowDesign.vue";
// import PointBar from "../style/PointBar.vue";
//
// export default {
//   props: {
//     row: Object,
//   },
//   data: function () {
//     return {
//       currentComponent: "",
//       dialog: true,
//       sortType: 1,
//       newRow: "",
//       sort: [
//         { text: "Object Width - Biggest to smallest.", value: "1" },
//         { text: "Object Width - Smallest to Biggest.", value: "2" },
//         { text: "Text Length - Longest to Shortest.", value: "3" },
//         { text: "Text Length - Shortest to Longest.", value: "4" },
//       ],
//     };
//   },
//   components: {
//     appFilter: Filter,
//     appText: Text,
//     appObjectImage: ObjectImage,
//     appBackground: Background,
//     appObjectDesign: ObjectDesign,
//     appRowDesign: RowDesign,
//     appPointBar: PointBar,
//     appRowImage: RowImage,
//   },
//   computed: {
//     // Collects styling from Store.
//     styling() {
//       return this.$store.state.app.styling;
//     },
//     // Collects styling from Store.
//     rows() {
//       return this.$store.state.app.rows;
//     },
//     // Collects styling from Store.
//     groups() {
//       return this.$store.state.app.groups;
//     },
//   },
//   methods: {
//     /**
//      * Copies the objects of the row into another row.
//      */
//     mergeObject() {
//       for (var i = 0; i < this.rows.length; i++) {
//         if (this.rows[i].id == this.newRow) {
//           this.rows[i].objects.push(JSON.parse(JSON.stringify(this.row)));
//
//           var text = "";
//           var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
//
//           for (var o = 0; o < 4; o++)
//             text += charset.charAt(Math.floor(Math.random() * charset.length));
//
//           this.rows[i].objects[this.rows[i].objects.length - 1].id = text;
//         }
//       }
//     },
//
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     },
//     rowWasChanged() {
//       this.$emit("rowWasChanged", this.row);
//     },
//   },
// };
// </script>
