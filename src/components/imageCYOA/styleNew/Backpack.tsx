export default function Backpack() {
  return <></>;
}
// <template>
//   <v-card width="100%">
//
//     <v-card-text>
//       <v-container>
//         <v-text-field v-model="styling.backPackWidth" label="Backpack Width" suffix="px" filled></v-text-field>
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
//   data: function () {
//     return {
//       dialog: true
//     };
//   },
//   computed: {
//     // Collects styling from Store.
//     styling() {
//       return this.$store.state.app.styling;
//     }
//   },
//   methods: {
//     cleanCurrentDesignComponent() {
//       this.$emit("cleanCurrentDesignComponent", "");
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
//         name: "Group " + this.groups.length
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
