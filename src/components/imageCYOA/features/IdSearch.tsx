import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function IDSearch({
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
