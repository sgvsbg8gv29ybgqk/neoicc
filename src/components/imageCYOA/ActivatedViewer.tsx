import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ActivatedViewer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
//   <v-dialog v-model="dialog" max-width="1920px" @click:outside="cleanCurrentComponent">
//     <v-card :style="background">
//       <v-card-text>
//         <v-container>
//           <v-row>
//             <v-textarea hide-details background-color="white" class="pa-1" filled v-model="getSelectedObjectName"
//               label="Current Activated Choices Titles"></v-textarea>
//
//             <v-textarea class="pa-1" hide-details background-color="white" filled v-model="activated"
//               label="Current Activated Choices ID's"></v-textarea>
//           </v-row>
//
//           <v-textarea hide-details background-color="white" filled v-model="newActivated"
//             label="Area To Import Activated Choices With Lists Of Id's"></v-textarea>
//           <v-btn @click="cleanActivated">Import Choices/Clean if empty</v-btn>
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
// <script lang="ts">
// export default {
//   props: {
//     chapter: Object,
//     page: Object,
//     type: String,
//   },
//   data: function () {
//     return {
//       dialog: true,
//       newActivated: "",
//     };
//   },
//   computed: {
//     // Computes the styles for the title-text and the under-text
//     background() {
//       return (
//         'background-image: url("' +
//         this.app.styling.backgroundImage +
//         '");' +
//         "background-color: " +
//         this.app.styling.backgroundColor +
//         ";background-repeat: repeat;"
//       );
//     },
//     activated() {
//       let array = [];
//       for (var i = 0; i < this.rows.length; i++) {
//         for (var x = 0; x < this.rows[i].objects.length; x++) {
//           if (this.rows[i].objects[x].isActive) {
//             array.push(this.rows[i].objects[x].id);
//           } else if (
//             this.rows[i].objects[x].isSelectableMultiple &&
//             this.rows[i].objects[x].multipleUseVariable !== 0
//           ) {
//             array.push(
//               this.rows[i].objects[x].id +
//               "/ON#" +
//               this.rows[i].objects[x].multipleUseVariable
//             );
//           } else if (
//             this.rows[i].objects[x].isImageUpload &&
//             this.rows[i].objects[x].image.length > 0
//           ) {
//             array.push(
//               this.rows[i].objects[x].id +
//               "/IMG#" +
//               this.rows[i].objects[x].image.replaceAll(",", "/CHAR#")
//             );
//           }
//         }
//       }
//       return array;
//     },
//     app() {
//       return this.$store.state.app;
//     },
//     sactivated() {
//       return this.$store.state.app.activated;
//     },
//     rows() {
//       return this.$store.state.app.rows;
//     },
//     // Gets the title of the object.
//     getSelectedObjectName() {
//       let array = [];
//       for (var i = 0; i < this.rows.length; i++) {
//         for (var x = 0; x < this.rows[i].objects.length; x++) {
//           if (this.rows[i].objects[x].isActive) {
//             array.push(
//               (array.length > 0 ? " " : "") + this.rows[i].objects[x].title
//             );
//           } else if (
//             this.rows[i].objects[x].isSelectableMultiple &&
//             this.rows[i].objects[x].multipleUseVariable !== 0
//           ) {
//             array.push(
//               (array.length > 0 ? " " : "") +
//               this.rows[i].objects[x].title +
//               "(Taken " +
//               this.rows[i].objects[x].multipleUseVariable +
//               " Times)"
//             );
//           }
//         }
//       }
//       return array;
//     },
//   },
//   methods: {
//     // Cleans the array and imports a new one.
//     cleanActivated() {
//
//       this.$store.commit({
//         type: "cleanActivated",
//       });
//
//       // Collects all the ids and places them in an array.
//       let array = this.newActivated.split(",");
//       let number = 0;
//
//       this.app.activated = array;
//
//       // For each of the rows.
//       for (i = 0; i < this.app.rows.length; i++) {
//         // Turns of edit-mode on all rows.
//         this.app.rows[i].isEditModeOn = false;
//
//         // For each of the objects in a row.
//         for (x = 0; x < this.app.rows[i].objects.length; x++) {
//           if (this.app.activated.includes(this.app.rows[i].objects[x].id)) {
//             this.app.rows[i].objects[x].isActive = true;
//             this.app.rows[i].currentChoices += 1;
//
//             // For each of the scores in an object.
//             for (
//               var o = 0;
//               o < this.app.rows[i].objects[x].scores.length;
//               o++
//             ) {
//               for (var y = 0; y < this.app.pointTypes.length; y++) {
//                 // If the score is of this point-type.
//
//                 if (
//                   this.app.pointTypes[y].id ==
//                   this.app.rows[i].objects[x].scores[o].id &&
//                   this.app.rows[i].objects[x].scores[o].requireds.length <= 0
//                 ) {
//                   this.app.rows[i].objects[x].scores[o].isActive = true;
//                   this.app.pointTypes[y].startingSum -= parseInt(
//                     this.app.rows[i].objects[x].scores[o].value
//                   );
//                 }
//               }
//             }
//           }
//         }
//       }
//
//       // Is needed to add points from scores with requirements after all other stuff has been done.
//       for (i = 0; i < this.app.rows.length; i++) {
//         // Turns of edit-mode on all rows.
//         this.app.rows[i].isEditModeOn = false;
//
//         // For each of the objects in a row.
//         for (x = 0; x < this.app.rows[i].objects.length; x++) {
//           if (this.app.activated.includes(this.app.rows[i].objects[x].id)) {
//             // For each of the scores in an object.
//             for (o = 0; o < this.app.rows[i].objects[x].scores.length; o++) {
//               for (y = 0; y < this.app.pointTypes.length; y++) {
//                 // If the score is of this point-type.
//                 if (
//                   this.app.pointTypes[y].id ==
//                   this.app.rows[i].objects[x].scores[o].id &&
//                   this.app.rows[i].objects[x].scores[o].requireds.length > 0
//                 ) {
//                   if (
//                     this.checkRequireds(this.app.rows[i].objects[x].scores[o])
//                   ) {
//                     this.app.rows[i].objects[x].scores[o].isActive = true;
//                     this.app.pointTypes[y].startingSum -= parseInt(
//                       this.app.rows[i].objects[x].scores[o].value
//                     );
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//
//
//       // For each row.
//       for (var i = 0; i < this.rows.length; i++) {
//         // For each object.
//         for (var x = 0; x < this.rows[i].objects.length; x++) {
//           // Check if the object is a Multiple
//           if (this.rows[i].objects[x].isSelectableMultiple) {
//             // Then check if it is in the array
//             for (var n = 0; n < array.length; n++) {
//               if (this.rows[i].objects[x].id == array[n].split("/ON#")[0]) {
//                 // Increment/Decrement
//                 number = array[n].split("/ON#")[1];
//
//                 if (number > 0) {
//                   this.multipleUseVariable = 0;
//                   for (var nx = 0; nx < number; nx++) {
//                     this.selectedOneMore(this.rows[i].objects[x]);
//                   }
//                 } else if (number < 0) {
//                   this.multipleUseVariable = 0;
//                   for (var nd = 0; nd < number * -1; nd++) {
//                     this.selectedOneLess(this.rows[i].objects[x]);
//                   }
//                 }
//
//                 // Removes it from the array.
//                 array.splice(n, 1);
//               }
//             }
//           } else if (this.rows[i].objects[x].isImageUpload) {
//             for (var ne = 0; ne < array.length; ne++) {
//               if (this.rows[i].objects[x].id == array[ne].split("/IMG#")[0]) {
//                 this.rows[i].objects[x].image = array[ne]
//                   .split("/IMG#")[1]
//                   .replaceAll("/CHAR#", ",");
//
//                 array.splice(ne, 1);
//               }
//             }
//           }
//         }
//       }
//
//       console.log(array);
//     },
//     // used when the - in a multiple is pressed.
//     selectedOneMore(object) {
//       let isLessThanLimit = true;
//
//       // If the multiple choice uses its own variable.
//       if (object.isMultipleUseVariable) {
//         if (object.numMultipleTimesPluss > this.multipleUseVariable) {
//           this.multipleUseVariable++;
//           object.multipleUseVariable = this.multipleUseVariable;
//           this.selectedThisManyTimesProp = this.multipleUseVariable;
//         } else {
//           isLessThanLimit = false;
//         }
//       } else {
//         for (var n = 0; n < this.app.pointTypes.length; n++) {
//           if (this.app.pointTypes[n].id == object.multipleScoreId) {
//             if (
//               object.numMultipleTimesPluss > this.app.pointTypes[n].startingSum
//             ) {
//               this.app.pointTypes[n].startingSum++;
//               this.selectedThisManyTimesProp = this.app.pointTypes[
//                 n
//               ].startingSum;
//             } else {
//               isLessThanLimit = false;
//             }
//           }
//         }
//       }
//       if (isLessThanLimit) {
//         for (var o = 0; o < object.scores.length; o++) {
//           // Goes trough all of the scores and check which is fits.
//           for (var x = 0; x < this.app.pointTypes.length; x++) {
//             if (this.app.pointTypes[x].id == object.scores[o].id && this.checkRequireds(object.scores[o])) {
//               this.app.pointTypes[x].startingSum -= parseInt(
//                 object.scores[o].value
//               );
//             }
//           }
//         }
//       }
//     },
//     // used when the + in a multiple is pressed.
//     selectedOneLess(object) {
//       let isLessThanLimit = true;
//
//       // If the multiple choice uses its own variable.
//       if (this.object.isMultipleUseVariable) {
//         if (this.object.numMultipleTimesMinus < this.multipleUseVariable) {
//           this.multipleUseVariable--;
//           this.object.multipleUseVariable = this.multipleUseVariable;
//           this.selectedThisManyTimesProp = this.multipleUseVariable;
//         } else {
//           isLessThanLimit = false;
//         }
//       } else {
//         for (var n = 0; n < this.app.pointTypes.length; n++) {
//           if (this.app.pointTypes[n].id == this.object.multipleScoreId) {
//             if (
//               object.numMultipleTimesMinus < this.app.pointTypes[n].startingSum
//             ) {
//               this.app.pointTypes[n].startingSum--;
//               this.selectedThisManyTimesProp = this.app.pointTypes[
//                 n
//               ].startingSum;
//             } else {
//               isLessThanLimit = false;
//             }
//           }
//         }
//       }
//       if (isLessThanLimit) {
//         for (let i = 0; i < object.scores.length; i++) {
//           // Goes trough all of the scores and check which is fits.
//           for (let x = 0; x < this.app.pointTypes.length; x++) {
//             if (this.app.pointTypes[x].id == object.scores[i].id && this.checkRequireds(object.scores[i])) {
//               this.app.pointTypes[x].startingSum += parseInt(
//                 object.scores[i].value
//               );
//             }
//           }
//         }
//       }
//     },
//
//     // Checks if the id's and points allow this object to be selected.
//     checkRequireds(object) {
//       return this.$store.getters.checkRequireds(object);
//     },
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     },
//   },
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
