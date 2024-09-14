export default function IdSearch() {
  return <></>;
}
// <template>
//   <v-dialog scrollable v-model="dialog" max-width="1200px" @click:outside="cleanCurrentComponent">
//     <v-card>
//       <v-card-title class="headline">Id / Name List</v-card-title>
//
//       <v-card-text>
//         <v-container>
//           <v-row>
//
//             You can use CTRL + F to find ID's or Names.
//             <v-col class="col-lg-12" v-for="row in rows" :key="row.index">
//               <b>{{ row.title }} / {{ row.id }}</b>
//               <v-row>
//                 <v-col class="col-lg-2" v-for="object in row.objects" :key="object.index">
//                   {{ object.title }} / {{ object.id }}
//                 </v-col>
//               </v-row>
//             </v-col>
//
//
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
//       dialog: true,
//
//     };
//   },
//   computed: {
//     // Collects styling from Store.
//     rows() {
//       return this.$store.state.app.rows;
//     }
//   },
//   methods: {
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     }
//
//   }
// };
// </script>
