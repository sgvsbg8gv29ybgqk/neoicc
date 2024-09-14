export default function ObjectList() {
  return <></>;
}
// <template>
//   <v-row justify="center">
//     <v-dialog v-model="dialog" max-width="600px" @click:outside="cleanCurrentComponent">
//       <v-card>
//         <v-card-title class="headline">Choices</v-card-title>
//
//         <appDraggable v-model="row.objects" @start="drag = true" @end="drag = false">
//           <v-list-group v-for="(row, index) in row.objects" :key="index">
//             <template v-slot:activator>
//               <!-- Show title if there is one, elsewise show the id. -->
//               <v-list-item-title
//                 v-html="$sanitize(row.title != '' ? index + 1 + '. ' + row.title : index + 1 + '. ' + row.id)"></v-list-item-title>
//             </template>
//           </v-list-group>
//         </appDraggable>
//
//         <v-card-actions>
//           <v-btn color="green darken-1" text @click="cleanCurrentComponent">Close</v-btn>
//         </v-card-actions>
//       </v-card>
//     </v-dialog>
//   </v-row>
// </template>
//
// <script>
// import Draggable from "vuedraggable";
//
// export default {
//   props: {
//     row: Object
//   },
//   data: function () {
//     return {
//       dialog: true
//     };
//   },
//   components: {
//     appDraggable: Draggable
//   },
//   computed: {
//     app() {
//       return this.$store.state.app;
//     }
//   },
//   methods: {
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     }
//   }
// };
// </script>
