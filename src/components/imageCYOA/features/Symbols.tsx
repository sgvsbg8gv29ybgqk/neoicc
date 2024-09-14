export default function Symbols() {
  return <></>;
}
// <template>
//   <v-dialog scrollable v-model="dialog" max-width="1300px" @click:outside="cleanCurrentComponent">
//     <v-card>
//       <v-card-title class="headline">Symbols and Image Compression</v-card-title>
//
//       <v-card-text>
//         <v-container>
//           <v-row>
//             <span v-for="symbol in symbols" :key="symbol.index" style="font-size:200%; padding:5px">{{ symbol.symbol
//               }}</span>
//           </v-row>More can be found on
//           <a target="_blank" href="https://www.alt-codes.net/">https://www.alt-codes.net/</a>
//
//           <v-row align="center" justify="center">
//             <v-col cols="12">
//               <v-btn @click="compressAllImages" class="mt-2">Compress All Images</v-btn>
//             </v-col>This will reduce the size and quality of every image in your project that is above the size in the
//             text field below, down to lower than that size.
//             Before you do this, make a backup, and you'll probably want to keep working on an uncompressed project file,
//             as you might want a version with high-quality images later. Compressing below 100 Kb with 200+ images might
//             freeze your browser.
//             <v-col cols="6">
//               <v-text-field v-model="maxSize" suffix="KB" label="Max Size of Images after compress (KB)"></v-text-field>
//             </v-col>
//             <v-col cols="6">{{ imageCounter }} Images Compressed | Size Reduced With {{ Math.round(sizeReduced) }}
//               MB</v-col>
//           </v-row>
//           <v-row>
//             <v-btn @click="cleanAllStyles" class="mt-2">Clean All Styles Of Choices</v-btn>
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
// import base64toblob from "base64toblob";
//
// const Compress = require("compress.js");
//
// export default {
//   data: function () {
//     return {
//       dialog: true,
//       imageCounter: 0,
//       maxSize: 100,
//       sizeReduced: 0,
//       symbols: [
//         { symbol: "✅" },
//         { symbol: "✓" },
//         { symbol: "✔" },
//         { symbol: "🗸" },
//         { symbol: "☑" },
//         { symbol: "🗹" },
//
//         { symbol: "♂" },
//         { symbol: "♀" },
//         { symbol: "⚥" },
//         { symbol: "⚢" },
//         { symbol: "⚣" },
//         { symbol: "⚤" },
//         { symbol: "⚦" },
//         { symbol: "⚧" },
//         { symbol: "⚨" },
//         { symbol: "⚩" },
//
//         { symbol: "•" },
//         { symbol: "◘" },
//         { symbol: "○" },
//         { symbol: "◙" },
//         { symbol: "•" },
//         { symbol: "‣" },
//         { symbol: "⁃" },
//         { symbol: "⁌" },
//         { symbol: "⁍" },
//         { symbol: "◘" },
//         { symbol: "◦" },
//         { symbol: "⦾" },
//         { symbol: "⦿" },
//
//         { symbol: "♥" },
//         { symbol: "♡" },
//         { symbol: "🖤" },
//         { symbol: "💙" },
//         { symbol: "💚" },
//         { symbol: "💛" },
//         { symbol: "💜" },
//         { symbol: "🧡" },
//         { symbol: "🤍" },
//         { symbol: "🤎" },
//         { symbol: "❣" },
//         { symbol: "❤" },
//         { symbol: "❥" },
//         { symbol: "🎔" },
//         { symbol: "💓" },
//         { symbol: "💔" },
//         { symbol: "💖" },
//         { symbol: "💗" },
//         { symbol: "💕" },
//         { symbol: "💞" },
//         { symbol: "💘" },
//
//         { symbol: "↑" },
//         { symbol: "↓" },
//         { symbol: "→" },
//         { symbol: "←" },
//         { symbol: "↔" },
//         { symbol: "↕" },
//         { symbol: "↨" },
//         { symbol: "▲" },
//         { symbol: "▼" },
//         { symbol: "►" },
//         { symbol: "◄" },
//         { symbol: "⤴" },
//         { symbol: "⤵" },
//         { symbol: "↩" },
//         { symbol: "↪" },
//         { symbol: "🏹" },
//
//         { symbol: "⭐" },
//         { symbol: "★" },
//         { symbol: "☆" },
//         { symbol: "★" },
//         { symbol: "✯" }
//       ]
//     };
//   },
//   computed: {
//     app() {
//       return this.$store.state.app;
//     }
//   },
//   methods: {
//     cleanAllStyles() {
//       for (let i = 0; i < this.app.rows.length; i++) {
//         this.app.rows[i].styling = "";
//       }
//     },
//     compressAllImages() {
//       const compress = new Compress();
//       let files;
//       for (let i = 0; i < this.app.rows.length; i++) {
//         let stringLength =
//           this.app.rows[i].image.length - "data:image/png;base64,".length;
//         let sizeInKBytes =
//           4 *
//           Math.round(Math.ceil(stringLength / 3) * 0.5624896334383812 * 1000);
//
//         if (this.app.rows[i].image.length > 0 && sizeInKBytes > this.maxSize) {
//           files = [
//             base64toblob(this.app.rows[i].image.split(",")[1], "image/jpeg")
//           ];
//           compress
//             .compress(files, {
//               size: this.maxSize / 1000, // the max size in MB, defaults to 2MB
//               quality: 0.75, // the quality of the image, max is 1,
//               maxWidth: 1920, // the max width of the output image, defaults to 1920px
//               maxHeight: 1920, // the max height of the output image, defaults to 1920px
//               resize: true // defaults to true, set false if you do not want to resize the image width and height
//             })
//             .then(data => {
//               this.imageCounter++;
//               this.sizeReduced += data[0].initialSizeInMb - data[0].endSizeInMb;
//               this.app.rows[i].image = data[0].prefix + "" + data[0].data;
//               //this.blobToBase4(data[0], this.app.rows[i]);
//             });
//         }
//         for (let o = 0; o < this.app.rows[i].objects.length; o++) {
//           stringLength =
//             this.app.rows[i].objects[o].image.length -
//             "data:image/png;base64,".length;
//
//           sizeInKBytes =
//             Math.round(4 * (Math.ceil(stringLength / 3) * 0.5624896334383812)) /
//             1000;
//
//           if (
//             this.app.rows[i].objects[o].image.length > 0 &&
//             sizeInKBytes > this.maxSize
//           ) {
//             files = [
//               base64toblob(
//                 this.app.rows[i].objects[o].image.split(",")[1],
//                 "image/jpeg"
//               )
//             ];
//
//             compress
//               .compress(files, {
//                 size: this.maxSize / 1000, // the max size in MB, defaults to 2MB
//                 quality: 0.75, // the quality of the image, max is 1,
//                 maxWidth: 1920, // the max width of the output image, defaults to 1920px
//                 maxHeight: 1920, // the max height of the output image, defaults to 1920px
//                 resize: true // defaults to true, set false if you do not want to resize the image width and height
//               })
//               .then(data => {
//                 this.imageCounter++;
//                 this.sizeReduced +=
//                   data[0].initialSizeInMb - data[0].endSizeInMb;
//
//                 this.app.rows[i].objects[o].image =
//                   data[0].prefix + "" + data[0].data;
//                 //this.blobToBase4(data[0], this.app.rows[i]);
//               });
//           }
//         }
//       }
//     },
//     blobToBase4(blob, rowImage) {
//       var reader = new FileReader();
//
//       reader.readAsDataURL(blob.data);
//       reader.onloadend = function () {
//         var base64data = reader.result;
//         rowImage.image = base64data;
//       };
//     },
//     toBlob(imgUrl) {
//       let blob = base64toblob(imgUrl.split(",")[1], "image/jpeg");
//       let url = window.URL.createObjectURL(blob);
//       return url;
//     },
//     cleanCurrentComponent() {
//       this.$emit("cleanCurrentComponent", "");
//     }
//   }
// };
// </script>
