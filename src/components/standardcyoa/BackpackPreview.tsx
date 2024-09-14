import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BackpackPreview({
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
//   <v-dialog v-model="dialog" :max-width="styling.backPackWidth + 'px'" @click:outside="cleanCurrentComponent">
//     <v-card :style="background">
//
//       <v-btn small @click="print()" style="color: black">Download Image (Go all the way to the bottom to load in the
//         pictures first)</v-btn>
//
//       <v-card-text>
//         <v-container>
//           <v-row ref="printThis">
//             <v-col cols="12" class="pa-0" v-for="row in backpack" :key="row.index">
//               <app-Row :row="row" :type="type" @rowWasChanged="row = $event"></app-Row>
//             </v-col>
//           </v-row>
//         </v-container>
//       </v-card-text>
//
//
//       <v-card-actions>
//         <v-btn color="green darken-1" text @click="cleanCurrentComponent">Close</v-btn>
//       </v-card-actions>
//     </v-card>
//   </v-dialog>
// </template>
//
// <script lang="ts">
// import Row from "../imageCyoaViewer/Row.vue";
// import html2canvas from "html2canvas";
//
//
// export default {
//   props: {
//     chapter: Object,
//     page: Object,
//     type: String,
//   },
//   data: function () {
//     return {
//       dialog: true,
//     };
//   },
//   components: {
//     appRow: Row,
//   },
//   computed: {
//     backpack() {
//       return this.$store.state.app.backpack;
//     },
//     styling() {
//       return this.$store.state.app.styling;
//     },
//     app() {
//       return this.$store.state.app;
//     },
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
//   },
//   methods: {
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     },
//     async print() {
//
//       scroll(0, 0);
//       let vc = this
//       console.log(vc.$refs.printThis);
//       html2canvas(vc.$refs.printThis, {
//         imageTimeout: 0,
//       }).then(function (canvas) {
//         document.body.appendChild(canvas);
//
//         var link = document.createElement("a");
//         if (typeof link.download === "string") {
//           link.href = canvas.toDataURL();
//           link.download = "canvas.png";
//
//           //Firefox requires the link to be in the body
//           document.body.appendChild(link);
//
//           //simulate click
//           link.click();
//
//           //remove the link when done
//           document.body.removeChild(link);
//           document.body.removeChild(canvas);
//         } else {
//           window.open(canvas.toDataURL());
//         }
//       });
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
// .cropper {
//   width: 100%;
//   background: #ddd;
// }
//
// .row {
//   padding: 10px;
// }
//
// .modal-dialog {
//   overflow-y: initial !important;
// }
//
// .modal-body {
//   max-height: calc(100vh - 100px);
//   overflow-y: auto;
// }
//
// @media (min-width: 768px) {
//   .modal-xl {
//     width: 90%;
//     max-width: 1200px;
//   }
// }
// </style>
//
