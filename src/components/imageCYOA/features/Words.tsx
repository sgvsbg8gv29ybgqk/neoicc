export default function Words() {
  return <></>;
}
// <template>
//   <v-dialog scrollable v-model="dialog" max-width="800px" @click:outside="cleanCurrentComponent">
//     <v-card>
//       <v-card-title class="headline">Words</v-card-title>
//
//       <v-card-text>
//         <v-container>
//           At creation and deletion on older project, the list might not update. Exit dialog and return to force it, is
//           fixed the next time the project is saved and loaded.
//           <v-col v-for="(word, index) in words" :key="word.index">
//             <v-row>
//               <v-col>
//                 <v-text-field hide-details v-model="word.id" label="Id that can be placed in the text"
//                   filled></v-text-field>
//               </v-col>
//               <v-col>
//                 <v-text-field hide-details v-model="word.replaceText" label="Text to replace id with"
//                   filled></v-text-field>
//               </v-col>
//               <v-btn class="py-0" hide-details @click="deleteVariable(index, words)">Delete</v-btn>
//             </v-row>
//           </v-col>
//         </v-container>
//       </v-card-text>
//
//       <v-card-actions>
//         <v-col cols="6">
//           <v-btn color="green darken-1" text @click="createNewWord">Create new Word</v-btn>
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
// export default {
//   data: function () {
//     return {
//       dialog: true
//     };
//   },
//   computed: {
//     // Collects styling from Store.
//     words() {
//       return this.$store.state.app.words;
//     }
//   },
//   methods: {
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     },
//     createNewWord() {
//       if (typeof this.$store.state.app.words === "undefined") {
//         // does not exist
//         this.$store.state.app.words = [];
//       }
//
//       var text = "#";
//       var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
//       for (var i = 0; i < 2; i++)
//         text += charset.charAt(Math.floor(Math.random() * charset.length));
//
//       this.$store.commit({
//         type: "addNewWord",
//         id: text,
//         replaceText: ""
//       });
//     },
//     deleteVariable() {
//       this.$store.commit("deleteWord", this.words);
//     }
//   }
// };
// </script>
