export default function Defaults() {
  return <></>;
}
// <template>
//   <v-dialog scrollable v-model="dialog" max-width="1300px" @click:outside="cleanCurrentComponent">
//     <v-card>
//       <v-card-title class="headline">Project Defaults</v-card-title>
//
//       <v-card-text>
//         <v-container>
//           <v-row>
//             <v-col>
//               Row
//               <v-text-field v-model="app.defaultRowTitle" placeholder="Empty" label="Row Title" filled
//                 hide-details></v-text-field>
//
//               <v-text-field v-model="app.defaultRowText" placeholder="Empty" label="Row Text"
//                 filled></v-text-field>Choice
//               <v-text-field v-model="app.defaultChoiceTitle" placeholder="Empty" label="Choice Title" filled
//                 hide-details></v-text-field>
//
//               <v-text-field v-model="app.defaultChoiceText" placeholder="Empty" label="Choice Text"
//                 filled></v-text-field>
//             </v-col>
//
//             <v-col>
//               Addon
//               <v-text-field v-model="app.defaultAddonTitle" placeholder="Empty" label="Addon Title" filled
//                 hide-details></v-text-field>
//
//               <v-text-field v-model="app.defaultAddonText" placeholder="Empty" label="Addon Text"
//                 filled></v-text-field>Requirement
//               <v-text-field v-model="app.defaultBeforeReq" placeholder="Empty" label="Before Required Text" filled
//                 hide-details></v-text-field>
//
//               <v-text-field v-model="app.defaultAfterReq" placeholder="Empty" label="After Required Text"
//                 filled></v-text-field>
//             </v-col>
//
//             <v-col>
//               Points
//               <v-text-field v-model="app.defaultBeforePoint" placeholder="Empty" label="Before Points Text" filled
//                 hide-details></v-text-field>
//               <v-text-field v-model="app.defaultAfterPoint" placeholder="Empty" label="After Points Text"
//                 filled></v-text-field>
//               <br />Clicking this will change the id of all of the choices and rows where the title is longer than 2
//               letters, or the default title, into the title,
//               which can make it easier to manage on larger projects with large amounts of requirements being used.
//               <v-btn small @click="idToTitle()" style="color:black">change Ids to titles</v-btn>
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
//   data: function () {
//     return {
//       dialog: true
//     };
//   },
//   computed: {
//     app() {
//       return this.$store.state.app;
//     }
//   },
//   methods: {
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     },
//     // Will make every id's in rows and choices to the titles, if the titles has two letters or more.
//     idToTitle() {
//       for (let i = 0; i < this.app.rows.length; i++) {
//         if (this.app.rows[i].id.length > 2 && this.app.rows[i].title != this.app.defaultRowTitle) {
//           this.app.rows[i].id = this.app.rows[i].title;
//         }
//
//         for (let v = 0; v < this.app.rows[i].objects.length; v++) {
//           if (this.app.rows[i].objects[v].id.length > 2 && this.app.rows[i].objects[v].title != this.app.defaultChoiceTitle) {
//             this.app.rows[i].objects[v].id = this.app.rows[i].objects[v].title;
//           }
//         }
//       }
//     }
//   }
// };
// </script>
