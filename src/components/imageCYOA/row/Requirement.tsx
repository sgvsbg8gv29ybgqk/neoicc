import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { App } from "@/store";

export default function Requirement({
  open,
  onClose,
  row,
}: {
  open: boolean;
  onClose: () => void;
  row: App["rows"][0];
}) {
  void row;
  return (
    <Dialog open={open} onOpenChange={(a) => !a && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>Hi</div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
// <template>
//   <v-row justify="center">
//     <v-dialog v-model="dialog" max-width="1000px" @click:outside="cleanCurrentComponent">
//       <v-card>
//         <v-card-title class="headline">Create Requirement</v-card-title>
//
//         <v-card-text>
//           <v-container>
//             <v-row>
//               <p>Requirements are conditions that will decide if the player can select the choice or not, these use the
//                 ID of choices and variables, and the design of the filter placed on non-selectable choices can be
//                 changed in filter design.</p>
//               <v-card-text class="mb-n5">Choice Requirements</v-card-text>
//               <v-col pa="4">
//                 <v-btn type="button" class="btn" @click="addNewRequired(row.requireds, 'id', true, '')"
//                   style="color:black">Add selected Choice requirement</v-btn>
//               </v-col>
//               <v-col>
//                 <v-btn type="button" class="btn" @click="addNewRequired(row.requireds, 'id', false, '')"
//                   style="color:black">Add non-selected Choice requirement</v-btn>
//               </v-col>
//
//               <v-col cols="6">
//                 <v-row>
//                   <v-card-text class="mb-n5">
//                     Point Requirements
//                     <br />
//                   </v-card-text>
//
//                   <v-col>
//                     <v-btn type="button" class="btn" @click="addNewRequired(row.requireds, 'points', true, '3')"
//                       style="color:black">= Equal to</v-btn>
//                   </v-col>
//
//                   <v-col>
//                     <v-btn type="button" class="btn" @click="addNewRequired(row.requireds, 'points', true, '1')"
//                       style="color:black">+ More than</v-btn>
//                   </v-col>
//
//                   <v-col>
//                     <v-btn type="button" class="btn" @click="addNewRequired(row.requireds, 'points', true, '5')"
//                       style="color:black">- Less than</v-btn>
//                   </v-col>
//
//                   <v-col>
//                     <v-btn type="button" class="btn" @click="addNewRequired(row.requireds, 'points', true, '2')"
//                       style="color:black">+= More or equal</v-btn>
//                   </v-col>
//
//                   <v-col>
//                     <v-btn type="button" class="btn" @click="addNewRequired(row.requireds, 'points', true, '4')"
//                       style="color:black">-= Less or equal</v-btn>
//                   </v-col>
//                 </v-row>
//               </v-col>
//
//               <v-col cols="6">
//                 <v-card-text class="mb-n5">Point Comparison Requirements</v-card-text>
//                 <v-col>
//                   <v-btn type="button" class="btn" @click="addNewRequired(row.requireds, 'pointCompare', true, '1')"
//                     style="color:black">This Point-type is bigger</v-btn>
//                 </v-col>
//                 <v-col>
//                   <v-btn type="button" class="btn" @click="addNewRequired(row.requireds, 'pointCompare', true, '3')"
//                     style="color:black">This Point-type is bigger or equal</v-btn>
//                 </v-col>
//
//                 <v-col>
//                   <v-btn type="button" class="btn" @click="addNewRequired(row.requireds, 'pointCompare', true, '2')"
//                     style="color:black">These Point-types are equal</v-btn>
//                 </v-col>
//               </v-col>
//
//               <v-card-text class="mb-n5">'One of these' Requirements</v-card-text>
//               <v-col>
//                 <v-btn type="button" class="btn" @click="addNewRequired(row.requireds, 'or', true, '')"
//                   style="color:black">'One of these is selected' Requirement</v-btn>
//               </v-col>
//
//               <v-col>
//                 <v-btn type="button" class="btn" @click="addNewRequired(row.requireds, 'or', false, '')"
//                   style="color:black">'One of these is not selected' Requirement</v-btn>
//               </v-col>
//               <v-col cols="12">
//                 <v-text-field hide-details label="Number of requirements" type="number" v-model="numberOfOrRequireds"
//                   filled></v-text-field>
//               </v-col>
//             </v-row>
//           </v-container>
//         </v-card-text>
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
// export default {
//   props: {
//     row: Object
//   },
//   data: function () {
//     return {
//       currentComponent: "",
//       dialog: true,
//       numberOfOrRequireds: 4
//     };
//   },
//   components: {},
//   computed: {
//     app() {
//       return this.$store.state.app;
//     }
//   },
//   methods: {
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     },
//     // The Method that will create a new has-requirement in a object.
//     addNewRequired(object, type, required, operator) {
//       let orRequired = [];
//       for (let o = 0; o < this.numberOfOrRequireds; o++) {
//         orRequired.push({ req: "" });
//       }
//       console.log(operator);
//
//       object.push({
//         required: required,
//         requireds: [],
//         orRequired: orRequired,
//         id: "",
//         type: type,
//         reqId: "",
//         reqId1: "",
//         reqId2: "",
//         reqId3: "",
//         reqPoints: 0,
//         showRequired: false,
//         operator: operator,
//         afterText: this.app.defaultAfterReq,
//         beforeText: this.app.defaultBeforeReq
//       });
//     }
//   }
// };
// </script>
