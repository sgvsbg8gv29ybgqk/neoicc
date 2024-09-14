export default function Variables() {
  return <></>;
}
// <template>
//   <v-dialog scrollable v-model="dialog" max-width="800px" @click:outside="cleanCurrentComponent">
//     <v-card>
//       <v-card-title class="headline">Variables</v-card-title>
//
//       <v-card-text>
//         <v-container>
//           <v-col v-for="(variable, index) in variables" :key="variable.index">
//             <v-row>
//               <v-col>
//                 <v-text-field hide-details v-model="variable.id" label="Id" filled></v-text-field>
//               </v-col>
//               <v-col>
//                 <v-text-field hide-details v-model="variable.isTrue" disabled label="Status" filled></v-text-field>
//               </v-col>
//               <v-btn class="py-0" hide-details @click="deleteVariable(index, variables)">Delete</v-btn>
//             </v-row>
//           </v-col>
//         </v-container>
//       </v-card-text>
//
//       <v-card-actions>
//         <v-col cols="6">
//           <v-btn color="green darken-1" text @click="createNewVariable">Create new Variable</v-btn>
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
//     variables() {
//       return this.$store.state.app.variables;
//     }
//   },
//   methods: {
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     },
//     createNewVariable() {
//       // Creates the id
//       var text = "";
//       var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
//       for (var i = 0; i < 2; i++)
//         text += charset.charAt(Math.floor(Math.random() * charset.length));
//
//       this.$store.commit({
//         type: "addNewVariable",
//         id: text,
//         isTrue: false
//       });
//     },
//     deleteVariable() {
//       this.$store.commit("deleteVariable", this.variables);
//     }
//   }
// };
// </script>
