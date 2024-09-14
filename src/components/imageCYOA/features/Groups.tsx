export default function Groups() {
  return <></>;
}
// <template>
//   <v-dialog scrollable v-model="dialog" max-width="800px" @click:outside="cleanCurrentComponent">
//     <v-card>
//       <v-card-title class="headline">Groups</v-card-title>
//
//       <v-card-text>
//         <v-container>
//           <v-col class="mt-2" v-for="(group, index) in groups" :key="group.index">
//
//             <v-row>
//               <v-col>
//                 <v-text-field hide-details v-model="group.id" label="Id" filled></v-text-field>
//               </v-col>
//               <v-col>
//                 <v-text-field hide-details v-model="group.name" label="Name" filled></v-text-field>
//               </v-col>
//             </v-row>
//
//             <v-row>
//               <v-col v-for="element in group.elements" :key="element.index">
//                 <v-text-field hide-details v-model="element.id" label="Id" filled></v-text-field>
//                 <!--<v-btn
//                   class="py-0"
//                   hide-details
//                   @click="deleteGroupElement(index, group.elements)"
//                 >Delete</v-btn>-->
//               </v-col>
//             </v-row>
//
//             <v-row>
//               <v-col>
//                 <v-btn class="py-0" hide-details @click="addElement(group.elements)">Add New row/choice</v-btn>
//               </v-col>
//               <v-col>
//                 <v-btn class="py-0" hide-details @click="deleteGroup(index)">Delete</v-btn>
//               </v-col>
//             </v-row>
//             <v-divider></v-divider>
//
//           </v-col>
//         </v-container>
//       </v-card-text>
//
//       <v-card-actions>
//         <v-col class="col-md-6">
//           <v-btn color="green darken-1" text @click="createNewGroup">Create new Group</v-btn>
//         </v-col>
//         <v-col class="col-md-6">
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
//     groups() {
//       return this.$store.state.app.groups;
//     }
//   },
//   methods: {
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     },
//     addElement(elements) {
//       elements.push({
//         id: ""
//       });
//     },
//     createNewGroup() {
//       // Creates the id
//       var text = "";
//       var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
//       for (var i = 0; i < 2; i++)
//         text += charset.charAt(Math.floor(Math.random() * charset.length));
//
//       this.$store.commit({
//         type: "addNewGroup",
//         id: text,
//         name: "Group " + (this.groups.length + 1)
//       });
//     },
//     deleteGroupElement(index, elements) {
//       elements.splice(index, 1);
//     },
//     deleteGroup(index) {
//       this.groups.splice(index, 1);
//     }
//   }
// };
// </script>
