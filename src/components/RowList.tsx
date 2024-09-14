export default function RowList() {
  return <></>;
}
// <template>
//   <v-row justify="center">
//     <v-dialog v-model="dialog" max-width="600px" @click:outside="cleanCurrentComponent">
//       <v-card>
//         <v-card-title class="headline">Rows</v-card-title>
//
//         <appDraggable v-model="app.rows" group="people" @start="drag = true" @end="drag = false">
//           <v-list-group v-for="(row, index) in app.rows" :key="index" :prepend-icon="row.action" no-action>
//             <template v-slot:activator>
//               <v-list-item-content>
//                 <!-- Show title if there is one, elsewise show the id. -->
//                 <v-list-item-title
//                   v-html="$sanitize(row.title != '' ? index + 1 + '. ' + row.title : index + 1 + '. ' + row.id)"></v-list-item-title>
//                 <v-list-item-subtitle></v-list-item-subtitle>
//               </v-list-item-content>
//             </template>
//
//             <v-list-item v-for="(object, index) in row.objects" :key="index">
//               <v-list-item-content>
//                 <v-list-item-title v-html="$sanitize(index + 1 + '. ' + object.title)"></v-list-item-title>
//                 <v-list-item-subtitle></v-list-item-subtitle>
//               </v-list-item-content>
//               <v-list-item-action>
//                 <v-btn icon @click.stop="moveObjectDown(row, object)">
//                   <v-icon color="grey lighten-1">mdi-chevron-down</v-icon>
//                 </v-btn>
//               </v-list-item-action>
//               <v-list-item-action>
//                 <v-btn icon @click.stop="moveObjectUp(row, object)">
//                   <v-icon color="grey lighten-1">mdi-chevron-up</v-icon>
//                 </v-btn>
//               </v-list-item-action>
//             </v-list-item>
//           </v-list-group>
//         </appDraggable>
//
//         <v-card-actions>
//           <v-spacer></v-spacer>
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
//   data: function () {
//     return {
//       row: Object,
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
//     },
//     moveRowUp(row) {
//       let index = this.app.rows.indexOf(row);
//       if (index > 0) {
//         let el = this.app.rows[index];
//         this.$set(this.app.rows, index, this.app.rows[index - 1]);
//         this.$set(this.app.rows, index - 1, el);
//       }
//     },
//     moveRowDown(row) {
//       let index = this.app.rows.indexOf(row);
//       if (index !== -1 && index < this.app.rows.length - 1) {
//         let el = this.app.rows[index];
//         this.$set(this.app.rows, index, this.app.rows[index + 1]);
//         this.$set(this.app.rows, index + 1, el);
//       }
//     },
//     // Will move the object up one in the array that holds it.
//     moveObjectUp(row, object) {
//       let index = row.objects.indexOf(object);
//       if (index > 0) {
//         let el = row.objects[index];
//         this.$set(row.objects, index, row.objects[index - 1]);
//         this.$set(row.objects, index - 1, el);
//       }
//     },
//     // Will move the object down one in the array that holds it.
//     moveObjectDown(row, object) {
//       let index = row.objects.indexOf(object);
//       if (index !== -1 && index < row.objects.length - 1) {
//         let el = row.objects[index];
//         this.$set(row.objects, index, row.objects[index + 1]);
//         this.$set(row.objects, index + 1, el);
//       }
//     }
//   }
// };
// </script>
