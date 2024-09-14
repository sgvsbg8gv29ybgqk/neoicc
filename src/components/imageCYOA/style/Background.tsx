export default function Background() {
  return <></>;
}
// <template>
//   <v-dialog v-model="dialog" max-width="1200px" @click:outside="cleanCurrentComponent">
//     <v-card>
//       <v-card-title class="headline">Backgrounds</v-card-title>
//
//       <v-card-text>
//         <v-container>
//           <v-row align="center">
//             <v-col>
//               <p class="text-center">Color of the background</p>
//               <v-color-picker class="mx-auto" v-model="styling.backgroundColor"></v-color-picker>
//             </v-col>
//
//             <v-col>
//               <v-checkbox v-model="styling.rowBgColorIsOn" hide-details label="Color of the row backgrounds"
//                 class="auto shrink mr-2 mt-0"></v-checkbox>
//               <v-color-picker class="mx-auto" v-model="styling.rowBgColor"
//                 :disabled="!styling.rowBgColorIsOn"></v-color-picker>
//             </v-col>
//
//             <v-col>
//               <v-checkbox v-model="styling.objectBgColorIsOn" label="Color of the choice backgrounds" hide-details
//                 class="shrink mr-2 mt-0"></v-checkbox>
//               <v-color-picker class="mx-auto" v-model="styling.objectBgColor"
//                 :disabled="!styling.objectBgColorIsOn"></v-color-picker>
//             </v-col>
//
//             <v-col class="col-4">
//               <picture-input class="col" ref="pictureInput"
//                 removeButtonClass="v-btn v-btn--contained theme--light v-size--default" :hideChangeButton="true"
//                 :removable="true" :crop="false" :zIndex="0" margin="50" @change="onImageChangeBackground"
//                 @remove="onImageRemoval" :prefill="styling.backgroundImage" :custom-strings="{
//                   upload: '<h1>Error!</h1>',
//                   drag: 'Upload Background Image',
//                 }"></picture-input>
//             </v-col>
//
//             <v-col class="col-4">
//               <picture-input class="col" ref="pictureInput"
//                 removeButtonClass="v-btn v-btn--contained theme--light v-size--default" :hideChangeButton="true"
//                 :removable="true" :crop="false" :zIndex="0" margin="50" @change="onImageChangeObject"
//                 @remove="onImageRemovalObject" :prefill="styling.objectBackgroundImage" :custom-strings="{
//                   upload: '<h1>Error!</h1>',
//                   drag: 'Upload Object Background Image',
//                 }"></picture-input>
//             </v-col>
//
//             <v-col class="col-4">
//               <picture-input class="col" ref="pictureInput"
//                 removeButtonClass="v-btn v-btn--contained theme--light v-size--default" :hideChangeButton="true"
//                 :removable="true" :crop="false" :zIndex="0" margin="50" @change="onImageChangeRow"
//                 @remove="onImageRemovalRow" :prefill="styling.rowBackgroundImage" :custom-strings="{
//                   upload: '<h1>Error!</h1>',
//                   drag: 'Upload Row Background Image',
//                 }"></picture-input>
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
// // The Picture Upload Component.
// import PictureInput from "vue-picture-input";
//
// export default {
//   props: {
//     from: String,
//     row: Object,
//     isAdvanced: Boolean,
//   },
//   data: function () {
//     return {
//       dialog: true,
//     };
//   },
//   components: {
//     PictureInput,
//   },
//   computed: {
//     // Collects styling from Store.
//     styling() {
//       if (this.from === "private") return this.row.styling;
//       else return this.$store.state.app.styling;
//     },
//   },
//   methods: {
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     },
//     onChange(image) {
//       console.log(image);
//       if (this.$refs.pictureInput.image) {
//         console.log("Picture loaded.");
//       } else {
//         console.log("FileReader API not supported: use the <form>, Luke!");
//       }
//     },
//     onImageChangeBackground(image) {
//       console.log(image);
//       this.styling.backgroundImage = image;
//
//       if (this.$refs.pictureInput.image) {
//         console.log("Picture loaded.");
//       } else {
//         console.log("FileReader API not supported: use the <form>, Luke!");
//       }
//     },
//     onImageChangeObject(image) {
//       console.log(image);
//       this.styling.objectBackgroundImage = image;
//
//       if (this.$refs.pictureInput.image) {
//         console.log("Picture loaded.");
//       } else {
//         console.log("FileReader API not supported: use the <form>, Luke!");
//       }
//     },
//     onImageChangeRow(image) {
//       console.log(image);
//       this.styling.rowBackgroundImage = image;
//
//       if (this.$refs.pictureInput.image) {
//         console.log("Picture loaded.");
//       } else {
//         console.log("FileReader API not supported: use the <form>, Luke!");
//       }
//     },
//     onImageRemoval() {
//       this.styling.backgroundImage = "";
//     },
//     onImageRemovalObject() {
//       this.styling.objectBackgroundImage = "";
//     },
//     onImageRemovalRow() {
//       this.styling.rowBackgroundImage = "";
//     },
//   },
// };
// </script>
