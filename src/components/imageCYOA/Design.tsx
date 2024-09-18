import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Design({
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
//     <v-dialog v-model="dialog" max-width="800px" @click:outside="cleanCurrentComponent">
//       <v-card>
//         <v-card-title class="headline">Design</v-card-title>
//
//         <v-card-text>
//           <v-container>
//             Hover over the buttons to see what they do.
//             <v-row>
//               <v-tooltip v-for="button in designComponentButtons" :key="button.index" right open-delay="1000">
//                 <template v-slot:activator="{ on }">
//                   <v-col class="col-lg-6">
//                     <v-btn v-on="on" @click="selectedButton(button.component)" style="color:black">{{ button.text
//                       }}</v-btn>
//                   </v-col>
//                 </template>
//                 <span v-html="button.tooltip"></span>
//               </v-tooltip>
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
//     <component :isAdvanced="app.designIsAdvanced" v-bind:is="currentComponent" :currentComponent="currentComponent"
//       @cleanCurrentComponent="currentComponent = $event"></component>
//   </v-row>
// </template>
//
// <script>
// import Filter from "./style/Filter.vue";
// import Text from "./style/Text.vue";
// import ObjectImage from "./style/ObjectImage.vue";
// import RowImage from "./style/RowImage.vue";
// import Background from "./style/Background.vue";
// import ObjectDesign from "./style/ObjectDesign.vue";
// import RowDesign from "./style/RowDesign.vue";
// import PointBar from "./style/PointBar.vue";
// import Backpack from "./style/Backpack.vue";
// import MultiChoice from "./style/MultiChoice.vue";
//
// export default {
//   data: function () {
//     return {
//       currentComponent: "",
//       dialog: true,
//       designComponentButtons: [
//         {
//           component: "appObjectDesign",
//           text: "Manage Choice Design",
//           tooltip:
//             " Here you can change the margin,<br />padding, borders, and drop-shadow on choices."
//         },
//         {
//           component: "appRowDesign",
//           text: "Manage Row Design",
//           tooltip:
//             "Here you can change the margin, <br />padding, borders, and drop-shadow on rows."
//         },
//
//         {
//           component: "appObjectImage",
//           text: "Manage Choices Image Design",
//           tooltip:
//             "Here you can change the margin and padding <br />of images on rows and objects."
//         },
//         {
//           component: "appRowImage",
//           text: "Manage Row Image Design",
//           tooltip:
//             "Here you can change the margin and padding <br />of images on rows and objects."
//         },
//         {
//           component: "appFilter",
//           text: "Manage Filter Design",
//           tooltip:
//             "Here you can change the filters for choices that are selected<br />and the one's you dont have the requirements for."
//         },
//         {
//           component: "appBackground",
//           text: "Manage Background Design",
//           tooltip:
//             "Here you can change the color and place images in <br />the background of rows, choices and the whole project."
//         },
//         {
//           component: "appText",
//           text: "Manage Text Design",
//           tooltip:
//             "Here you can change the size, font and<br />color of the text on titles and text."
//         },
//         {
//           component: "appPointBar",
//           text: "Manage Point-Bar Design",
//           tooltip:
//             "Here you can change the color, postition and font of the <br />bar that holds the created points."
//         },
//         {
//           component: "appMultiChoice",
//           text: "Manage Multi Choice Design",
//           tooltip:
//             "Here you can change the color, size and font of the <br /> choices that can be selected multiple times."
//         },
//         {
//           component: "appBackpack",
//           text: "Manage Backpack Design",
//           tooltip: "Here you can change the backpack."
//         }
//       ]
//     };
//   },
//   computed: {
//     app() {
//       return this.$store.state.app;
//     }
//   },
//   components: {
//     appFilter: Filter,
//     appText: Text,
//     appObjectImage: ObjectImage,
//     appBackground: Background,
//     appObjectDesign: ObjectDesign,
//     appRowDesign: RowDesign,
//     appPointBar: PointBar,
//     appBackpack: Backpack,
//     appRowImage: RowImage,
//     appMultiChoice: MultiChoice
//   },
//   methods: {
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     },
//     selectedButton(component) {
//       this.$store.state.currentDesignComponent = component;
//       this.cleanCurrentComponent();
//     }
//   }
// };
// </script>
