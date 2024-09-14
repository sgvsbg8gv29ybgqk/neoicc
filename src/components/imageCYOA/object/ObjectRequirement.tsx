export default function ObjectRequirement() {
  return <></>;
}
// <template>
//   <span>
//     <!-- Will only show when the Boolean isEditModeOn is true. -->
//     <v-col class="pa-0 pb-1">
//       <v-btn icon>
//         <v-icon @click="currentComponent = 'appRequirement'">mdi-key-plus</v-icon>
//       </v-btn>
//
//       <span v-if="required.type == 'id'">
//         <v-checkbox v-model="required.showRequired" hide-details label="Show Requirement"
//           class="pt-0 mt-0"></v-checkbox>
//         <v-text-field v-show="required.showRequired" hide-details filled v-model="required.beforeText"
//           label="Text Before"></v-text-field>
//         <v-text-field v-show="required.showRequired" hide-details filled v-model="required.afterText"
//           label="Text After"></v-text-field>
//         <v-text-field hide-details v-model="required.reqId"
//           :label="required.required ? 'Selected Id' : 'Not Selected Id'" filled></v-text-field>
//       </span>
//
//       <span v-else-if="required.type == 'points'">
//         <v-checkbox v-model="required.showRequired" hide-details label="Show Requirement"
//           class="pt-0 mt-0"></v-checkbox>
//         <v-text-field v-show="required.showRequired" hide-details filled v-model="required.beforeText"
//           label="Text Before"></v-text-field>
//         <v-text-field v-show="required.showRequired" hide-details filled v-model="required.afterText"
//           label="Text After"></v-text-field>
//         <v-select hide-details :items="pointReqOperators" v-model="required.operator" item-text="text"
//           item-value="value" filled label="Operator"></v-select>
//
//         <v-select hide-details :items="app.pointTypes" v-model="required.reqId" item-text="name" item-value="id" filled
//           label="Point Type"></v-select>
//
//         <v-text-field hide-details type="number" v-model="required.reqPoints" filled></v-text-field>
//       </span>
//
//       <span v-else-if="required.type == 'pointCompare'">
//
//
//         <span v-if="required.operator == '1'" style="text-align:center">A is bigger than B</span>
//         <span v-if="required.operator == '2'" style="text-align:center">A is equal to B</span>
//         <span v-if="required.operator == '3'" style="text-align:center">A is bigger/equal to B</span>
//         <v-select hide-details :items="app.pointTypes" v-model="required.reqId" item-text="name" item-value="id" filled
//           label="Point Type A"></v-select>
//
//         <v-select hide-details :items="app.pointTypes" v-model="required.reqId1" item-text="name" item-value="id" filled
//           label="Point Type B"></v-select>
//
//       </span>
//
//       <span v-else-if="required.type == 'or'">
//         <v-checkbox v-model="required.showRequired" hide-details label="Show Requirement"
//           class="pt-0 mt-0"></v-checkbox>
//         <v-text-field v-show="required.showRequired" hide-details filled v-model="required.beforeText"
//           label="Text Before"></v-text-field>
//         <v-text-field v-show="required.showRequired" hide-details filled v-model="required.afterText"
//           label="Text After"></v-text-field>
//         <span v-for="orRequired in required.orRequired" :key="orRequired.index">
//           <v-text-field :label="required.required ? 'Selected Choice Id' : 'Not Selected Choice Id'" hide-details
//             v-model="orRequired.req" :placeholder="required.required ? 'Selected Id' : 'Not Selected Id'"
//             filled></v-text-field>
//         </span>
//       </span>
//
//       <v-row class="pa-0 ma-0">
//         <v-col cols="6" class="pa-2" v-for="(requiredReq, indexReq) in required.requireds" :key="requiredReq.index">
//           <span v-if="requiredReq.type == 'id'">
//             <v-text-field hide-details v-model="requiredReq.reqId"
//               :label="requiredReq.required ? 'Selected Id' : 'Not Selected Id'" filled></v-text-field>
//             <v-btn @click="deleteEvent(indexReq, required.requireds)" class="pa-0" style="color:black">Delete</v-btn>
//           </span>
//
//           <span v-else-if="requiredReq.type == 'points'">
//             <v-select hide-details :items="pointReqOperators" v-model="requiredReq.operator" item-text="text"
//               item-value="value" filled label="Operator"></v-select>
//
//             <v-select hide-details :items="app.pointTypes" v-model="requiredReq.reqId" item-text="name" item-value="id"
//               filled label="Point Type"></v-select>
//
//             <v-text-field hide-details v-model="requiredReq.reqPoints" type="number" filled></v-text-field>
//
//             <v-btn @click="deleteEvent(indexReq, required.requireds)" style="color:black">Delete</v-btn>
//           </span>
//
//           <span v-else-if="requiredReq.type == 'pointCompare'">
//             <span v-if="requiredReq.operator == 1">A is bigger than B</span>
//             <span v-if="requiredReq.operator == 2">A is equal to B</span>
//             <span v-if="requiredReq.operator == 3">A is bigger/equal to B</span>
//
//             <v-select hide-details :items="app.pointTypes" v-model="requiredReq.reqId" item-text="name" item-value="id"
//               filled label="Point Type A"></v-select>
//
//             <v-select hide-details :items="app.pointTypes" v-model="requiredReq.reqId1" item-text="name" item-value="id"
//               filled label="Point Type B"></v-select>
//
//             <v-btn @click="deleteEvent(indexReq, required.requireds)" style="color:black">Delete</v-btn>
//           </span>
//
//           <span v-else-if="requiredReq.type == 'or'">
//             <span v-for="orRequired in requiredReq.orRequired" :key="orRequired.index">
//               <v-text-field :label="requiredReq.required ? 'Selected Choice Id' : 'Not Selected Choice Id'" hide-details
//                 v-model="orRequired.req" :placeholder="requiredReq.required ? 'Selected Id' : 'Not Selected Id'"
//                 filled></v-text-field>
//             </span>
//
//             <v-btn @click="deleteEvent(indexReq, required.requireds)" style="color:black">Delete</v-btn>
//           </span>
//
//         </v-col>
//       </v-row>
//     </v-col>
//
//     <!-- This is the holder that holds the requirement-component -->
//     <component :is="currentComponent" :row="required" :object="required" @rowWasChanged="required = $event"
//       @cleanCurrentComponent="currentComponent = $event"></component>
//   </span>
// </template>
//
// <script>
// // Holds the buttons for adding requirements.
// import AppRequirement from "../row/Requirement.vue";
//
// export default {
//   props: {
//     required: Object,
//     isEditModeOn: Boolean,
//     row: Object
//   },
//   data: function () {
//     return {
//       currentComponent: "",
//       pointReqOperators: [
//         { text: "+ More than", value: "1" },
//         { text: "+= More or equal", value: "2" },
//         { text: "= Equal to", value: "3" },
//         { text: "-= Less or equal", value: "4" },
//         { text: "- Less than", value: "5" }
//       ]
//     };
//   },
//   components: {
//     AppRequirement
//   },
//   computed: {
//     activated() {
//       return this.$store.state.app.activated;
//     },
//     pointTypes() {
//       return this.$store.state.app.pointTypes;
//     },
//     app() {
//       return this.$store.state.app;
//     },
//     styling() {
//       if (this.row.isPrivateStyling) return this.row.styling;
//       else return this.$store.state.app.styling;
//     }
//   },
//   methods: {
//     // Checks if the id's and points allow this object to be selected.
//     checkRequireds(object) {
//       return this.$store.getters.checkRequireds(object);
//     },
//     // Removes a object from a array, the parameter is the objects index and the array that holds it.
//     deleteEvent: function (index, array) {
//       array.splice(index, 1);
//     }
//   }
// };
// </script>
//
// <style scoped>
// .btn {
//   margin: 5px;
//   font-size: small;
// }
//
// .row {
//   padding: 10px;
// }
// </style>
//
