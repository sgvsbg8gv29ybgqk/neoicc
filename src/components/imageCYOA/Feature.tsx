import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Feature({
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
//   <v-row justify="center">
//     <v-dialog v-model="dialog" max-width="1200px" @click:outside="cleanCurrentComponent">
//       <v-card>
//         <v-card-title class="headline">Features</v-card-title>
//
//         <v-card-text>
//           <v-container>
//             <v-row>
//               <v-col class="col-lg-6">
//                 <p>Point systems can be created and used to handle the player's ability to buy things and to keep a
//                   record of selected choices in a group or row.</p>
//                 <v-btn @click="currentComponent = 'appPoints'" style="color:black">Manage Points</v-btn>
//               </v-col>
//
//               <v-col class="col-lg-6">
//                 <p>Variables can currently only be used by adding them to buttons, which in turn can activate and
//                   deactivate them, and the variable-id can be used in requirements.</p>
//                 <v-btn @click="currentComponent = 'appVariables'" style="color:black">Manage Variables</v-btn>
//               </v-col>
//
//               <v-col class="col-lg-6">
//                 <p>Rows and objects can be added into groups, and rows that show the selected choices can then use a
//                   group to decide which choices to show.</p>
//                 <v-btn @click="currentComponent = 'appGroups'" style="color:black">Manage Groups</v-btn>
//               </v-col>
//
//               <v-col class="col-lg-6">
//                 <p>The backpack is where rows can show which choices have been selected can be placed, and the import is
//                   where selected choices can be imported.</p>
//                 <v-btn @click="currentComponent = 'appBackpack'" style="color:black">Manage Backpack and choice
//                   import</v-btn>
//               </v-col>
//
//               <v-col class="col-lg-6">
//                 <p>In defaults, you can write in default text that you want the choices and rows to be filled with when
//                   created.</p>
//                 <v-btn @click="currentComponent = 'appDefaults'" style="color:black">Manage Defaults</v-btn>
//               </v-col>
//
//               <v-col class="col-lg-6">
//                 <p>In styles, you can find the premade design-templates, that either can be used as-is or to create a
//                   new design from.</p>
//                 <v-btn @click="currentComponent = 'appTemplates'" style="color:black">Style Templates</v-btn>
//               </v-col>
//
//               <v-col class="col-lg-6">
//                 <p>Words can be changed when a choice is presssed, or in textfields by the player, and be placed around
//                   in the text.</p>
//                 <v-btn @click="currentComponent = 'appWords'" style="color:black">Words</v-btn>
//               </v-col>
//
//               <v-col class="col-lg-6">
//                 <p>Symbols will show off some of the alt-codes that can be used in your project where you can place
//                   text. This is also where you can compress all the images in your project.</p>
//                 <v-btn @click="currentComponent = 'appSymbols'" style="color:black">Symbols and Image
//                   Compression</v-btn>
//               </v-col>
//
//               <v-col class="col-lg-12">
//                 <p>Will show you a list of ID's and the names of the choices they belong to.</p>
//                 <v-btn @click="currentComponent = 'appIdSearch'" style="color:black">Id / Name list</v-btn>
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
//
//     <component v-bind:is="currentComponent" :currentComponent="currentComponent"
//       @cleanCurrentComponent="currentComponent = $event"></component>
//   </v-row>
// </template>
//
// <script>
// import appPoints from "./features/Points.vue";
// import appSymbols from "./features/Symbols.vue";
// import appVariables from "./features/Variables.vue";
// import appGroups from "./features/Groups.vue";
// import appTemplates from "./features/Templates.vue";
// import appBackpack from "../standardcyoa/Backpack.vue";
// import appDefaults from "./features/Defaults.vue";
// import appWords from "./features/Words.vue";
// import appIdSearch from "./features/IdSearch.vue";
//
// export default {
//   data: function () {
//     return {
//       currentComponent: "",
//       dialog: true
//     };
//   },
//   components: {
//     appPoints,
//     appVariables,
//     appGroups,
//     appBackpack,
//     appTemplates,
//     appDefaults,
//     appSymbols,
//     appWords,
//     appIdSearch
//   },
//   methods: {
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     }
//   }
// };
// </script>
