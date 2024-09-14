export default function Object() {
  return <></>;
}
// <template>
//   <span>
//     <!-- Will only show when the Boolean isEditModeOn is true. -->
//     <v-row v-if="isEditModeOn">
//       <v-card class="ma-1" width="100%" outlined>
//         <!-- v-btn that creates a new required in the object -->
//
//         <v-toolbar v-if="row.isEditModeOn" class="grey lighten-3" dense flat>
//           <v-spacer></v-spacer>
//
//           <v-tooltip bottom open-delay="1000">
//             <template v-slot:activator="{ on }">
//               <v-btn icon v-on="on">
//                 <v-icon @click="moveObjectUp()">mdi-chevron-left</v-icon>
//               </v-btn>
//             </template>
//             <span>Move Left</span>
//           </v-tooltip>
//
//           <v-spacer></v-spacer>
//
//           <v-tooltip bottom open-delay="1000">
//             <template v-slot:activator="{ on }">
//               <v-btn icon v-on="on">
//                 <v-icon @click="deleteObject()">mdi-delete-forever</v-icon>
//               </v-btn>
//             </template>
//             <span>Delete Object</span>
//           </v-tooltip>
//
//           <v-spacer></v-spacer>
//
//           <v-tooltip bottom open-delay="1000">
//             <template v-slot:activator="{ on }">
//               <v-btn icon v-on="on">
//                 <v-icon @click="currentComponent = 'ObjectSettings'">mdi-decagram</v-icon>
//               </v-btn>
//             </template>
//             <span>Object Settings</span>
//           </v-tooltip>
//
//           <v-spacer></v-spacer>
//
//           <v-tooltip bottom open-delay="1000">
//             <template v-slot:activator="{ on }">
//               <v-btn icon v-on="on">
//                 <v-icon @click="cloneObject()">mdi-content-copy</v-icon>
//               </v-btn>
//             </template>
//             <span>Clone Object</span>
//           </v-tooltip>
//
//           <v-spacer></v-spacer>
//
//           <v-tooltip bottom open-delay="1000">
//             <template v-slot:activator="{ on }">
//               <v-btn icon v-on="on">
//                 <v-icon @click="moveObjectDown()">mdi-chevron-right</v-icon>
//               </v-btn>
//             </template>
//             <span>Move Right</span>
//           </v-tooltip>
//
//           <v-spacer></v-spacer>
//         </v-toolbar>
//
//         <v-col cols="12" class="pa-0">
//           <v-text-field type="number" v-if="row.isWeightedRandom && row.isButtonRow && row.buttonRandom"
//             placeholder="100" hide-details v-model="object.randomWeight" label="Random Weight" filled></v-text-field>
//         </v-col>
//
//         <!-- The  of Image -->
//         <v-col cols="12" class="pt-0 px-12">
//           <v-col class="px-0 pt-1">
//             <v-img @click="currentComponent = 'appImageUpload'" max-height="175" contain :src="object.image"></v-img>
//           </v-col>
//
//           <v-btn @click="currentComponent = 'appImageUpload'" style="color: black">Change Image</v-btn>
//         </v-col>
//
//         <v-col cols="12" class="pt-0 pb-0">
//           <v-textarea hide-details filled v-model="object.text" label="Object Text"></v-textarea>
//         </v-col>
//
//         <v-row class="py-0">
//           <v-col class="col-md-6 pr-1 pb-2">
//             <v-text-field hide-details v-model="object.title" label="Object Title" filled></v-text-field>
//           </v-col>
//
//           <v-col class="col-md-6 pl-1 pb-2">
//             <v-text-field hide-details v-model="object.id" label="Object Id" filled></v-text-field>
//           </v-col>
//         </v-row>
//
//         <v-row class="py-0">
//           <v-col class="col-md-6 pr-1 pt-1">
//             <v-select hide-details :items="templates" v-model="object.template" item-text="text" item-value="value"
//               filled label="Template"></v-select>
//           </v-col>
//           <v-col class="col-md-6 pl-1 pt-1">
//             <v-select hide-details :items="objectWidths" v-model="object.objectWidth" item-text="text"
//               item-value="value" filled label="Object Width"></v-select>
//           </v-col>
//         </v-row>
//
//         <v-toolbar v-if="row.isEditModeOn" class="grey lighten-3" dense flat>
//           <v-spacer></v-spacer>
//
//           <v-tooltip bottom open-delay="1000">
//             <template v-slot:activator="{ on }">
//               <v-btn icon v-on="on">
//                 <v-icon @click="createNewScore()">mdi-numeric-9-plus-box</v-icon>
//               </v-btn>
//             </template>
//             <span>Create Score</span>
//           </v-tooltip>
//
//           <v-spacer></v-spacer>
//
//           <!-- Create new requirement icon -->
//           <v-tooltip bottom open-delay="1000">
//             <template v-slot:activator="{ on }">
//               <v-btn icon v-on="on">
//                 <v-icon @click="createNewAddon()">mdi-comment-plus</v-icon>
//               </v-btn>
//             </template>
//             <span>Create Addon</span>
//           </v-tooltip>
//
//           <v-spacer></v-spacer>
//
//           <!-- Create new requirement icon -->
//           <v-tooltip bottom open-delay="1000">
//             <template v-slot:activator="{ on }">
//               <v-btn icon v-on="on">
//                 <v-icon @click="currentComponent = 'appRequirement'">mdi-key-plus</v-icon>
//               </v-btn>
//             </template>
//             <span>Create Requirement</span>
//           </v-tooltip>
//
//           <v-spacer></v-spacer>
//
//           <!-- Create new requirement icon -->
//           <v-tooltip bottom open-delay="1000">
//             <template v-slot:activator="{ on }">
//               <v-btn icon v-on="on">
//                 <v-icon @click="addObjectToGroup">mdi-key</v-icon>
//               </v-btn>
//             </template>
//             <span>Add To Group</span>
//           </v-tooltip>
//
//           <v-spacer></v-spacer>
//         </v-toolbar>
//
//         <v-expansion-panels multiple accordion>
//           <v-expansion-panel v-if="object.scores.length > 0">
//             <v-expansion-panel-header
//               v-html="$sanitize('Scores: ' + object.scores.length, sanitizeArg)"></v-expansion-panel-header>
//             <v-expansion-panel-content>
//               <!-- Lists up the scores that the object holds. -->
//               <v-col cols="12" class="pa-0" v-for="(score, index) in object.scores" :key="score.index">
//                 <ObjectScore :isEditModeOn="isEditModeOn" :app="app" :score="score" @scoreWasChanged="score = $event">
//                 </ObjectScore>
//
//                 <v-row class="pa-0">
//                   <v-col cols="6" class="pa-0 d-flex justify-center">
//                     <v-checkbox v-model="score.showScore" label="Show Score?"
//                       class="justify-center shrink mr-2 mt-1"></v-checkbox>
//                   </v-col>
//                   <v-col cols="6" class="pt-1">
//                     <v-btn @click="deleteEvent(index, object.scores)" style="color: black">Delete</v-btn>
//                   </v-col>
//                 </v-row>
//               </v-col>
//             </v-expansion-panel-content>
//           </v-expansion-panel>
//
//           <v-expansion-panel v-if="object.addons.length > 0">
//             <v-expansion-panel-header
//               v-html="$sanitize('Addons: ' + object.addons.length, sanitizeArg)"></v-expansion-panel-header>
//             <v-expansion-panel-content>
//               <!-- Lists up the addons that the object holds. -->
//               <v-col cols="12" class="pa-0" v-for="(addon, index) in object.addons" :key="addon.index">
//                 <ObjectAddon :isEditModeOn="isEditModeOn" :addon="addon" @addonWasChanged="addon = $event">
//                 </ObjectAddon>
//                 <v-btn @click="deleteEvent(index, object.addons)" style="color: black">Delete</v-btn>
//               </v-col>
//             </v-expansion-panel-content>
//           </v-expansion-panel>
//
//           <v-expansion-panel v-if="object.requireds.length > 0">
//             <v-expansion-panel-header v-html="$sanitize(
//               'Requirements: ' + object.requireds.length,
//               sanitizeArg
//             )
//               "></v-expansion-panel-header>
//             <v-expansion-panel-content>
//               <!-- Shows the requirements, allows the user to delete or change its id -->
//               <v-row class="pa-0">
//                 <v-col :cols="typeof required.requireds !== 'undefined' &&
//                   required.requireds.length > 0
//                   ? '12'
//                   : '6'
//                   " class="pa-2" v-for="(required, index) in object.requireds" :key="required.index">
//                   <ObjectRequirement :isEditModeOn="isEditModeOn" :required="required"
//                     @requiredWasChanged="required = $event">
//                   </ObjectRequirement>
//
//                   <v-btn @click="deleteEvent(index, object.requireds)" style="color: black">Delete</v-btn>
//                 </v-col>
//               </v-row>
//             </v-expansion-panel-content>
//           </v-expansion-panel>
//
//           <v-expansion-panel v-if="
//             typeof object.groups !== 'undefined' && object.groups.length > 0
//           ">
//             <v-expansion-panel-header v-html="$sanitize(
//               'Groups: ' +
//               (typeof object.groups !== 'undefined'
//                 ? object.groups.length
//                 : ''),
//               sanitizeArg
//             )
//               "></v-expansion-panel-header>
//             <v-expansion-panel-content>
//               <!-- Shows the requirements, allows the user to delete or change its id -->
//               <v-row class="pa-0">
//                 <v-col cols="6" class="pa-2" v-for="(group, index) in object.groups" :key="group.index">
//                   <v-card>
//                     <v-select hide-details :items="app.groups" v-model="group.id" item-text="name" item-value="id"
//                       filled label="Group Id"></v-select>
//
//                     <v-btn @click="deleteEvent(index, object.groups)" style="color: black">Delete</v-btn>
//                   </v-card>
//                 </v-col>
//               </v-row>
//             </v-expansion-panel-content>
//           </v-expansion-panel>
//
//           <v-expansion-panel>
//             <v-expansion-panel-header v-html="'Functions: '"></v-expansion-panel-header>
//             <v-expansion-panel-content>
//               <!-- Shows the requirements, allows the user to delete or change its id -->
//
//               <v-checkbox class="mt-n2" hide-details v-model="object.cleanACtivatedOnSelect"
//                 label="Selecting this choice will de-select all other choices"></v-checkbox>
//
//               <!-- Where the elements controlling multiple select choices is -->
//               <v-checkbox hide-details v-model="object.isSelectableMultiple"
//                 label="The choice can be selected multiple times"></v-checkbox>
//               <v-checkbox hide-details v-if="object.isSelectableMultiple" v-model="object.isMultipleUseVariable"
//                 label="Press this to use a simple variable instead of a Point-type?"></v-checkbox>
//               <p v-if="
//                 object.isSelectableMultiple && !object.isMultipleUseVariable
//               ">
//                 The point type used here should only be used for this choice,
//                 and it can be hidden by placing something in 'Id needed to
//                 activate' in Features -> Manage Points.
//               </p>
//               <v-select class="pa-1" hide-details v-if="
//                 object.isSelectableMultiple && !object.isMultipleUseVariable
//               " :items="app.pointTypes" v-model="object.multipleScoreId" item-text="name" item-value="id" filled
//                 label="Point Type that will be used"></v-select>
//               <v-text-field hide-details type="number" v-if="object.isSelectableMultiple"
//                 label="Number where the minus will stop working" v-model="object.numMultipleTimesMinus"
//                 filled></v-text-field>
//               <v-text-field hide-details type="number" v-if="object.isSelectableMultiple"
//                 label="Number where the pluss will stop working" v-model="object.numMultipleTimesPluss"
//                 filled></v-text-field>
//
//               <v-checkbox hide-details v-model="object.isNotSelectable"
//                 label="Selecting this choice will be impossible"></v-checkbox>
//
//               <v-checkbox hide-details v-model="object.activateOtherChoice"
//                 label="Forces another choice active:"></v-checkbox>
//               <v-col v-if="object.activateOtherChoice" class="py-0">Works badly if multiple of these have the same ID,
//                 or if the
//                 target has requirements attached. You can use comma to activate
//                 multiple (ID,ID,ID).</v-col>
//
//               <v-text-field hide-details v-if="object.activateOtherChoice"
//                 label="Id of the choice that will be activated" v-model="object.activateThisChoice"
//                 filled></v-text-field>
//
//               <v-checkbox hide-details v-model="object.deactivateOtherChoice"
//                 label="Will make another choice unselected:"></v-checkbox>
//
//               <v-col v-if="object.deactivateOtherChoice" class="py-0">Will be useful if the target has scores with
//                 requirements,
//                 use
//                 a Group Id to turn of multiple. You can use comma to deactivate
//                 multiple (ID,ID,ID).</v-col>
//
//               <v-text-field hide-details v-if="object.deactivateOtherChoice"
//                 label="Id of the choice that will be deactivated" v-model="object.deactivateThisChoice"
//                 filled></v-text-field>
//
//               <!-- Muliply Points -->
//               <v-checkbox hide-details v-model="object.multiplyPointtypeIsOn"
//                 label="Multiply Points when activated:"></v-checkbox>
//               <v-col v-if="object.multiplyPointtypeIsOn" class="pb-0">Not to be used on choices with scores. Wont work
//                 if the
//                 Allowed
//                 Choices on the row is bigger than 0.</v-col>
//               <v-select class="pa-1" hide-details v-if="object.multiplyPointtypeIsOn" :items="app.pointTypes"
//                 v-model="object.pointTypeToMultiply" item-text="name" item-value="id" filled
//                 label="Point-Type to multiply "></v-select>
//
//               <v-text-field class="pa-1" hide-details v-if="
//                 object.multiplyPointtypeIsOn && !object.multiplyPointtypeIsId
//               " label="Multiplied by X" v-model="object.multiplyWithThis" filled></v-text-field>
//
//               <v-select class="pa-1" hide-details v-if="
//                 object.multiplyPointtypeIsOn && object.multiplyPointtypeIsId
//               " :items="app.pointTypes" v-model="object.multiplyWithThis" item-text="name" item-value="id" filled
//                 label="Multiplied with this Point-Type"></v-select>
//
//               <v-checkbox class="mt-0" hide-details v-if="object.multiplyPointtypeIsOn"
//                 v-model="object.multiplyPointtypeIsId" label="Is point-type id, multiplies by the sum."></v-checkbox>
//
//               <!-- Divide Points -->
//               <v-checkbox hide-details v-model="object.dividePointtypeIsOn"
//                 label="Divide Points when activated:"></v-checkbox>
//
//               <v-select class="pa-1" hide-details v-if="object.dividePointtypeIsOn" :items="app.pointTypes"
//                 v-model="object.pointTypeToDivide" item-text="name" item-value="id" filled
//                 label="Point Type"></v-select>
//
//               <v-text-field class="pa-1" hide-details type="number" v-if="object.dividePointtypeIsOn"
//                 label="Divided by X" v-model="object.divideWithThis" filled></v-text-field>
//
//               <v-checkbox hide-details v-model="object.textfieldIsOn"
//                 label="Word will be changed to something else at select."></v-checkbox>
//
//               <v-select class="pa-1" hide-details v-if="object.textfieldIsOn" :items="app.words"
//                 v-model="object.idOfTheTextfieldWord" item-text="id" item-value="id" filled
//                 label="Id of word that will change"></v-select>
//
//               <v-text-field class="pa-1" hide-details v-if="object.textfieldIsOn"
//                 label="Will be changed to this on select" v-model="object.wordChangeSelect" filled></v-text-field>
//
//               <v-text-field class="pa-1" hide-details v-if="object.textfieldIsOn"
//                 label="Will be changed to this on deselect" v-model="object.wordChangeDeselect" filled></v-text-field>
//
//               <v-checkbox hide-details v-model="object.isImageUpload"
//                 label="Player can upload a picture by pressing this choice."></v-checkbox>
//
//               <v-checkbox hide-details v-model="object.addToAllowChoice"
//                 label="Adds or takes away a rows Allowed Choices."></v-checkbox>
//
//               <v-select class="pa-1" hide-details v-if="object.addToAllowChoice" :items="this.app.rows"
//                 v-model="object.idOfAllowChoice" item-text="id" item-value="id" filled
//                 label="Id of the row whose Allowed Choices will be changed.">
//                 <template slot="selection" slot-scope="data">
//                   <!-- HTML that describe how select should render selected items -->
//                   {{ data.item.id }} - {{ data.item.title }}
//                 </template>
//                 <template slot="item" slot-scope="data">
//                   <!-- HTML that describe how select should render selected items -->
//                   {{ data.item.id }} - {{ data.item.title }}
//                 </template>
//               </v-select>
//
//               <v-text-field class="pa-1" hide-details type="number" v-if="object.addToAllowChoice"
//                 label="This numbr will be added to the Allowed Choices on select."
//                 v-model.number="object.numbAddToAllowChoice" filled></v-text-field>
//             </v-expansion-panel-content>
//           </v-expansion-panel>
//         </v-expansion-panels>
//       </v-card>
//     </v-row>
//
//     <!-- Preview and templates -->
//     <!-- If the row is not an info row or is not selectable, make it clickable -->
//     <!-- Added the object.isImageUpload -->
//     <span class="row pa-0" :style="objectBackground" v-else-if="checkRequireds(row)" @click="
//       [
//         row.isInfoRow ||
//           object.isNotSelectable ||
//           object.isSelectableMultiple ||
//           object.isImageUpload
//           ? object.isImageUpload
//             ? (currentComponent = 'appImageUpload')
//             : ''
//           : activateObject(object, row),
//       ]
//       ">
//       <!-- Template 1 - Picture on top. -->
//       <span style="width: 100%" class="ma-0" v-if="
//         object.template == 1 ||
//         window.width < 1000 ||
//         row.choicesShareTemplate
//       ">
//         <div v-if="row.resultShowRowTitle" :style="rowBody">
//           <v-col :style="scoreText" v-html="$sanitize(findRowTitle, sanitizeArg)" class="pa-0"></v-col>
//         </div>
//
//         <v-tooltip v-if="
//           object.imageSourceTooltip !== '' &&
//           typeof object.imageSourceTooltip !== 'undefined'
//         " top open-delay="1500">
//           <template v-slot:activator="{ on }">
//             <img v-if="object.image.length > 0" v-on="on" :style="object.image != '' ? objectImage : ''"
//               v-lazy="object.image" />
//           </template>
//           <span>{{ object.imageSourceTooltip }}</span>
//         </v-tooltip>
//
//         <!-- If there is no tooltip -->
//         <img v-else-if="object.image.length > 0" :style="object.image != '' ? objectImage : ''" v-lazy="object.image" />
//
//         <span>
//           <h3 class="mb-0" :style="objectTitle" v-html="$sanitize(replaceObjectTitleText, sanitizeArg)"></h3>
//
//           <!-- If the choice can be selected multiple times. -->
//           <v-row v-if="object.isSelectableMultiple">
//             <v-spacer></v-spacer>
//             <v-btn :disabled="!checkRequireds(this.object)" icon>
//               <v-icon @click="selectedOneLess(object)" :style="multiChoiceButton" size="x-large">mdi-minus</v-icon>
//             </v-btn>
//
//             <v-spacer></v-spacer>
//             <v-col class="pa-0" :style="multiChoiceText" v-html="selectedThisManyTimesProp"></v-col>
//             <v-spacer></v-spacer>
//
//             <v-btn :disabled="!checkRequireds(this.object)" icon>
//               <v-icon @click="selectedOneMore(object)" :style="multiChoiceButton" size="x-large">mdi-plus</v-icon>
//             </v-btn>
//             <v-spacer></v-spacer>
//           </v-row>
//
//           <!-- Lists up all of the Scores added to the object. -->
//           <v-col class="py-0" v-for="score in object.scores" :key="score.index">
//             <ObjectScore v-if="score.showScore && checkRequireds(score)" :isEditModeOn="isEditModeOn" :score="score"
//               @scoreWasChanged="score = $event"></ObjectScore>
//           </v-col>
//
//           <!-- Will show of the required if showRequired is selected -->
//           <v-col class="pa-0" v-for="required in object.requireds" :key="required.index">
//             <v-col :style="scoreText" v-if="required.showRequired"
//               v-html="$sanitize(getChoiceTitle(required), sanitizeArg)" class="pa-0"></v-col>
//           </v-col>
//
//           <!-- The text of the object. -->
//           <p class="my-0" style="white-space: pre-line" v-show="!row.textIsRemoved" v-if="object.text !== ''"
//             :style="objectText" v-html="$sanitize(replaceObjectText, sanitizeArg)"></p>
//
//           <!-- TODO change word with text field. -->
//           <v-text-field type="number" @change="changeTheWord" v-if="object.textFieldIsOn" placeholder="100" hide-details
//             v-model="object.randomWeight" label="Random Weight" filled></v-text-field>
//
//           <!-- Lists up the addons that the object holds. -->
//           <v-col class="py-0" v-for="addon in object.addons" :key="addon.index">
//             <ObjectAddon :isEditModeOn="isEditModeOn" :addon="addon" :row="row" @addonWasChanged="addon = $event">
//             </ObjectAddon>
//           </v-col>
//         </span>
//       </span>
//
//       <!-- Template 2 - Picture on left side. -->
//       <v-row style="width: 100%" class="ma-0 pa-0" v-else-if="object.template == 2 && window.width > 1000">
//         <!-- The object choice in the preview. -->
//         <v-col class="pa-0 mb-0">
//           <v-tooltip v-if="
//             object.imageSourceTooltip !== '' &&
//             typeof object.imageSourceTooltip !== 'undefined'
//           " top open-delay="1500">
//             <template v-slot:activator="{ on }">
//               <img v-if="object.image.length > 0" v-on="on" :style="object.image != '' ? objectImage : ''"
//                 v-lazy="object.image" />
//             </template>
//             <span>{{ object.imageSourceTooltip }}</span>
//           </v-tooltip>
//
//           <img v-else-if="object.image.length > 0" :style="object.image != '' ? objectImage : ''"
//             v-lazy="object.image" />
//         </v-col>
//
//         <v-col class="pa-1">
//           <h3 :style="objectTitle" v-html="$sanitize(replaceObjectTitleText, sanitizeArg)"></h3>
//
//           <!-- If the choice can be selected multiple times. -->
//           <v-row v-if="object.isSelectableMultiple">
//             <v-spacer></v-spacer>
//             <v-btn :disabled="!checkRequireds(this.object)" icon>
//               <v-icon @click="selectedOneLess(object)" :style="multiChoiceButton" size="x-large">mdi-minus</v-icon>
//             </v-btn>
//
//             <v-spacer></v-spacer>
//             <v-col class="pa-0" :style="multiChoiceText" v-html="selectedThisManyTimesProp"></v-col>
//             <v-spacer></v-spacer>
//
//             <v-btn :disabled="!checkRequireds(this.object)" icon>
//               <v-icon @click="selectedOneMore(object)" :style="multiChoiceButton" size="x-large">mdi-plus</v-icon>
//             </v-btn>
//             <v-spacer></v-spacer>
//           </v-row>
//
//           <!-- Lists up all of the Scores added to the object. -->
//           <div v-for="score in object.scores" :key="score.index">
//             <ObjectScore v-if="score.showScore && checkRequireds(score)" :isEditModeOn="isEditModeOn" :score="score"
//               @scoreWasChanged="score = $event"></ObjectScore>
//           </div>
//
//           <v-col class="pa-0" v-for="required in object.requireds" :key="required.index">
//             <v-col :style="scoreText" v-if="required.showRequired"
//               v-html="$sanitize(getChoiceTitle(required, sanitizeArg))" class="pa-0"></v-col>
//           </v-col>
//
//           <!-- The text of the object. -->
//           <p style="white-space: pre-line" v-if="object.text !== ''" :style="objectText"
//             v-html="$sanitize(replaceObjectText, sanitizeArg)"></p>
//         </v-col>
//
//         <!-- Lists up the addons that the object holds. -->
//         <v-col cols="12" class="pt-0" v-for="addon in object.addons" :key="addon.index">
//           <ObjectAddon :isEditModeOn="isEditModeOn" :addon="addon" :row="row" @addonWasChanged="addon = $event">
//           </ObjectAddon>
//         </v-col>
//       </v-row>
//
//       <!-- Template 3 - Picture on right side. -->
//       <v-row style="width: 100%" class="ma-0 pa-0" v-else-if="object.template == 3 && window.width > 1000">
//         <v-col class="pa-1">
//           <h3 :style="objectTitle" v-html="$sanitize(replaceObjectTitleText, sanitizeArg)"></h3>
//
//           <!-- If the choice can be selected multiple times. -->
//           <v-row v-if="object.isSelectableMultiple">
//             <v-spacer></v-spacer>
//             <v-btn :disabled="!checkRequireds(this.object)" icon>
//               <v-icon @click="selectedOneLess(object)" :style="multiChoiceButton" size="x-large">mdi-minus</v-icon>
//             </v-btn>
//
//             <v-spacer></v-spacer>
//             <v-col class="pa-0" :style="multiChoiceText" v-html="selectedThisManyTimesProp"></v-col>
//             <v-spacer></v-spacer>
//
//             <v-btn :disabled="!checkRequireds(this.object)" icon>
//               <v-icon @click="selectedOneMore(object)" :style="multiChoiceButton" size="x-large">mdi-plus</v-icon>
//             </v-btn>
//             <v-spacer></v-spacer>
//           </v-row>
//
//           <!-- Lists up all of the Scores added to the object. -->
//           <div v-for="score in object.scores" :key="score.index">
//             <ObjectScore v-if="score.showScore && checkRequireds(score)" :isEditModeOn="isEditModeOn" :score="score"
//               @scoreWasChanged="score = $event"></ObjectScore>
//           </div>
//
//           <v-col class="pa-0" v-for="required in object.requireds" :key="required.index">
//             <v-col :style="scoreText" v-if="required.showRequired"
//               v-html="$sanitize(getChoiceTitle(required, sanitizeArg))" class="pa-0"></v-col>
//           </v-col>
//
//           <!-- The text of the object. -->
//           <p style="white-space: pre-line" v-if="object.text !== ''" :style="objectText"
//             v-html="$sanitize(replaceObjectText, sanitizeArg)"></p>
//         </v-col>
//
//         <!-- The object choice in the preview. -->
//         <v-col class="pa-0 mb-0">
//           <v-tooltip v-if="
//             object.imageSourceTooltip !== '' &&
//             typeof object.imageSourceTooltip !== 'undefined'
//           " top open-delay="1500">
//             <template v-slot:activator="{ on }">
//               <img v-if="object.image.length > 0" v-on="on" :style="object.image != '' ? objectImage : ''"
//                 v-lazy="object.image" />
//             </template>
//             <span>{{ object.imageSourceTooltip }}</span>
//           </v-tooltip>
//
//           <img v-else-if="object.image.length > 0" :style="object.image != '' ? objectImage : ''"
//             v-lazy="object.image" />
//         </v-col>
//
//         <!-- Lists up the addons that the object holds. -->
//         <v-col cols="12" class="pt-0" v-for="addon in object.addons" :key="addon.index">
//           <ObjectAddon :isEditModeOn="isEditModeOn" :addon="addon" :row="row" @addonWasChanged="addon = $event">
//           </ObjectAddon>
//         </v-col>
//       </v-row>
//     </span>
//
//     <!-- This is the holder that holds the requirement-component -->
//     <component :is="currentComponent" :row="object" @rowWasChanged="object = $event"
//       @cleanCurrentComponent="currentComponent = $event"></component>
//
//     <span v-if="snackbar">
//       <v-snackbar top v-model="snackbar" :timeout="2000">
//         <div style="text-align: center">{{ text }}</div>
//       </v-snackbar>
//     </span>
//   </span>
// </template>
//
// <script>
// // The Addon under objects.
// import ObjectAddon from "./object/ObjectAddon.vue";
// import ObjectRequirement from "./object/ObjectRequirement.vue";
//
// // The Score under objects.
// import ObjectScore from "./object/ObjectScore.vue";
// // Holds the buttons for adding requirements.
// import AppRequirement from "./row/Requirement.vue";
// // Image Upload.
// import AppImageUpload from "./row/ImageUpload.vue";
// import PictureInput from "vue-picture-input";
//
// import ObjectSettings from "./object/ObjectSettings.vue";
//
// export default {
//   props: {
//     object: Object,
//     objects: Array,
//     isEditModeOn: Boolean,
//     activated: Array,
//     row: Object,
//   },
//   data: function () {
//     return {
//       window: {
//         width: 0,
//         height: 0,
//       },
//       buttonHasBeenPressed: false,
//       snackbar: false,
//       text: "",
//       selectedThisManyTimesProp: 0,
//       multipleUseVariable: 0,
//       templates: [
//         { text: "Image top", value: "1" },
//         { text: "Image left", value: "2" },
//         { text: "Image right", value: "3" },
//       ],
//       pointReqOperators: [
//         { text: "+ More than", value: "1" },
//         { text: "+= More or equal", value: "2" },
//         { text: "= Equal to", value: "3" },
//         { text: "-= Less or equal", value: "4" },
//         { text: "- Less than", value: "5" },
//       ],
//       // The current opened component in the row.
//       currentComponent: "",
//       sanitizeArg: {
//         allowedTags: [
//           "address",
//           "article",
//           "aside",
//           "footer",
//           "header",
//           "h1",
//           "h2",
//           "h3",
//           "h4",
//           "h5",
//           "h6",
//           "hgroup",
//           "main",
//           "nav",
//           "section",
//           "blockquote",
//           "dd",
//           "div",
//           "dl",
//           "dt",
//           "figcaption",
//           "figure",
//           "hr",
//           "li",
//           "main",
//           "ol",
//           "p",
//           "pre",
//           "ul",
//           "a",
//           "abbr",
//           "b",
//           "bdi",
//           "bdo",
//           "br",
//           "cite",
//           "code",
//           "data",
//           "dfn",
//           "em",
//           "i",
//           "kbd",
//           "mark",
//           "q",
//           "rb",
//           "rp",
//           "rt",
//           "rtc",
//           "ruby",
//           "s",
//           "samp",
//           "small",
//           "span",
//           "strong",
//           "sub",
//           "sup",
//           "time",
//           "u",
//           "var",
//           "wbr",
//           "caption",
//           "col",
//           "colgroup",
//           "table",
//           "tbody",
//           "td",
//           "tfoot",
//           "th",
//           "thead",
//           "tr",
//         ],
//         allowedAttributes: {
//           p: ["style"],
//           b: ["style"],
//           span: ["style"],
//           strong: ["style"],
//         },
//         allowedStyles: {
//           "*": {
//             // Match HEX and RGB
//             color: [
//               /^#(0x)?[0-9a-f]+$/i,
//               /^[A-Za-z]+$/,
//               /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
//             ],
//             "text-align": [/^left$/, /^right$/, /^center$/],
//             // Match any number with px, em, or %
//             "font-size": [/^\d+(?:px|em|%)$/],
//           },
//           p: {
//             "font-size": [/^\d+rem$/],
//           },
//         },
//       },
//     };
//   },
//   components: {
//     PictureInput,
//     ObjectAddon,
//     ObjectScore,
//     AppRequirement,
//     AppImageUpload,
//     ObjectRequirement,
//     ObjectSettings,
//   },
//   // Nearly all the computed methods is used for the design of the project.
//   computed: {
//     styling() {
//       if (this.object.isPrivateStyling) {
//         return this.object.styling;
//       } else if (this.row.isPrivateStyling) {
//         return this.row.styling;
//       } else {
//         return this.$store.state.app.styling;
//       }
//     },
//     objectWidths() {
//       return this.$store.state.objectWidths;
//     },
//     // Used to decide the font of the objects title and text.
//     objectTitle() {
//       return (
//         'font-family: "' +
//         this.styling.objectTitle +
//         '";' +
//         "font-size: " +
//         this.styling.objectTitleTextSize +
//         "%;" +
//         "text-align: " +
//         this.styling.objectTitleAlign +
//         ";" +
//         "color: " +
//         this.styling.objectTitleColor +
//         ";"
//       );
//     },
//     multiChoiceText() {
//       return (
//         'font-family: "' +
//         this.styling.multiChoiceTextFont +
//         '";' +
//         "color: " +
//         this.styling.scoreTextColor +
//         ";" +
//         "font-size: " +
//         this.styling.multiChoiceTextSize +
//         "%;"
//       );
//     },
//     multiChoiceButton() {
//       return "color: " + this.styling.scoreTextColor + ";";
//     },
//     objectText() {
//       return (
//         'font-family: "' +
//         this.styling.objectText +
//         '";' +
//         "text-align: " +
//         this.styling.objectTextAlign +
//         ";" +
//         "font-size: " +
//         this.styling.objectTextTextSize +
//         "%;" +
//         "color: " +
//         this.styling.objectTextColor +
//         ";" +
//         "padding: " +
//         this.styling.objectTextPadding +
//         "px;"
//       );
//     },
//     // Used on the div that holds the preview of the object.
//     objectBackground() {
//       // Styles the color of the background, margin and selected color if selected.
//       let style =
//         (this.object.isActive
//           ? ""
//           : 'background-image: url("' +
//           this.styling.objectBackgroundImage +
//           '");background-repeat: repeat;') +
//         (this.styling.objectBgColorIsOn
//           ? "background-color: " + this.styling.objectBgColor + " ;"
//           : "") +
//         "margin:" +
//         this.styling.objectMargin +
//         "px; " +
//         (this.object.isActive ||
//           (this.object.isImageUpload && this.object.image.length > 0)
//           ? "background-color: " +
//           this.styling.selFilterBgColor +
//           " !important;"
//           : "");
//
//       // Border Radius
//       let suffix = this.styling.objectBorderRadiusIsPixels ? "px" : "%";
//
//       if (this.styling.objectGradientIsOn) {
//         style += this.styling.objectGradientIsOn
//           ? ";background-image: linear-gradient(" +
//           this.styling.objectGradient +
//           ");"
//           : "";
//       }
//
//       if (this.object.template == 1 || this.row.choicesShareTemplate) {
//         style +=
//           "border-radius: " +
//           this.styling.objectBorderRadiusTopLeft +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectBorderRadiusTopRight +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectBorderRadiusBottomRight +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectBorderRadiusBottomLeft +
//           +"" +
//           suffix +
//           "; ";
//       } else if (this.object.template == 2) {
//         style +=
//           "border-radius: " +
//           this.styling.objectBorderRadiusTopLeft +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectBorderRadiusBottomLeft +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectBorderRadiusBottomRight +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectBorderRadiusTopRight +
//           +"" +
//           suffix +
//           "; ";
//       } else {
//         style +=
//           "border-radius: " +
//           this.styling.objectBorderRadiusBottomLeft +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectBorderRadiusTopLeft +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectBorderRadiusTopRight +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectBorderRadiusBottomRight +
//           +"" +
//           suffix +
//           "; ";
//       }
//
//       if (this.styling.objectOverflowIsOn) {
//         style += "overflow:hidden;";
//       }
//
//       if (this.styling.objectBorderIsOn) {
//         style +=
//           "border: " +
//           this.styling.objectBorderWidth +
//           "" +
//           "px " +
//           this.styling.objectBorderStyle +
//           " " +
//           this.styling.objectBorderColor +
//           "" +
//           ";";
//       }
//
//       // Styles here the drop-shadow.
//       style += "filter: ";
//       if (this.styling.objectDropShadowIsOn) {
//         style +=
//           "drop-shadow(" +
//           this.styling.objectDropShadowH +
//           "px " +
//           this.styling.objectDropShadowV +
//           "px " +
//           this.styling.objectDropShadowBlur +
//           "px " +
//           this.styling.objectDropShadowColor +
//           ")";
//       }
//
//       // TODO Make this part more efficient.
//
//       // Needs to check if the object have all of the requireds.
//       let hasRequireds = this.checkRequireds(this.object);
//
//       // If the object is selected.
//       if (this.object.isActive && hasRequireds) {
//         style += this.styling.selFilterBlurIsOn
//           ? "blur(" + this.styling.selFilterBlur + "px)"
//           : "";
//         style += this.styling.selFilterBrightIsOn
//           ? "brightness(" + this.styling.selFilterBright + "%)"
//           : "";
//         style += this.styling.selFilterContIsOn
//           ? "contrast(" + this.styling.selFilterCont + "%)"
//           : "";
//         style += this.styling.selFilterGrayIsOn
//           ? "grayscale(" + this.styling.selFilterGray + "%)"
//           : "";
//         style += this.styling.selFilterHueIsOn
//           ? "hue-rotate(" + this.styling.selFilterHue + "deg)"
//           : "";
//         style += this.styling.selFilterInvertIsOn
//           ? "invert(" + this.styling.selFilterInvert + "%)"
//           : "";
//         style += this.styling.selFilterOpacIsOn
//           ? "opacity(" + this.styling.selFilterOpac + "%)"
//           : "";
//         style += this.styling.selFilterSaturIsOn
//           ? "saturate(" + this.styling.selFilterSatur + ")"
//           : "";
//         style += this.styling.selFilterSepiaIsOn
//           ? "sepia(" + this.styling.selFilterSepia + "%)"
//           : "";
//
//         if (this.styling.objectGradientIsOn) {
//           style +=
//             ";background-image: linear-gradient(" +
//             this.styling.objectGradientOnSelect +
//             ")";
//         }
//       } else {
//         // If the object does not have alle of the conditions.
//         if (!hasRequireds) {
//           style += this.styling.reqFilterBlurIsOn
//             ? "blur(" + this.styling.reqFilterBlur + "px)"
//             : "";
//           style += this.styling.reqFilterBrightIsOn
//             ? "brightness(" + this.styling.reqFilterBright + "%)"
//             : "";
//           style += this.styling.reqFilterContIsOn
//             ? "contrast(" + this.styling.reqFilterCont + "%)"
//             : "";
//           style += this.styling.reqFilterGrayIsOn
//             ? "grayscale(" + this.styling.reqFilterGray + "%)"
//             : "";
//           style += this.styling.reqFilterHueIsOn
//             ? "hue-rotate(" + this.styling.reqFilterHue + "deg)"
//             : "";
//           style += this.styling.reqFilterInvertIsOn
//             ? "invert(" + this.styling.reqFilterInvert + "%)"
//             : "";
//           style += this.styling.reqFilterOpacIsOn
//             ? "opacity(" + this.styling.reqFilterOpac + "%)"
//             : "";
//           style += this.styling.reqFilterSaturIsOn
//             ? "saturate(" + this.styling.reqFilterSatur + ")"
//             : "";
//           style += this.styling.reqFilterSepiaIsOn
//             ? "sepia(" + this.styling.reqFilterSepia + "%)"
//             : "";
//
//           style += this.styling.reqBgColorIsOn
//             ? ";background-color: " +
//             this.styling.reqFilterBgColor +
//             " !important"
//             : ";background-color: " +
//             this.styling.objectBgColor +
//             " !important";
//
//           if (this.styling.objectGradientIsOn) {
//             style +=
//               ";background-image: linear-gradient(" +
//               this.styling.objectGradientOnReq +
//               ")";
//           }
//
//           // Turns the object inactive and removes the id from the activated-array.
//           if (this.object.isActive) {
//             this.activateObject(this.object, this.row);
//             // If the choice is tier-based with multiple.
//           } else if (this.object.isSelectableMultiple) {
//             // Will go trough all tiers left to lowest tier.
//             for (
//               let i = 0;
//               i <
//               this.object.numMultipleTimesPluss -
//               this.object.numMultipleTimesMinus;
//               i++
//             )
//               this.selectedOneLess(this.object);
//           }
//
//           if (
//             this.object.multiplyPointtypeIsOnCheck ||
//             this.object.dividePointtypeIsOnCheck
//           ) {
//             this.multiplyOrDivide(this.object);
//           }
//
//           // Is here to make the activated choice selectable.
//           if (this.object.activateOtherChoice) {
//             for (let i = 0; i < this.app.rows.length; i++) {
//               for (let v = 0; v < this.app.rows[i].objects.length; v++) {
//                 if (
//                   this.app.rows[i].objects[v].id ==
//                   this.object.activateThisChoice &&
//                   this.app.rows[i].objects[v].isActive
//                 ) {
//                   this.setFalse(this.app.rows[i].objects[v]);
//                 }
//               }
//             }
//           }
//         }
//       }
//
//       style += ";";
//
//       return style;
//     },
//     findRowTitle() {
//       let rowtitle = "";
//
//       for (var n = 0; n < this.app.rows.length; n++) {
//         if (this.app.rows[n].objects.includes(this.object)) {
//           return this.app.rows[n].title;
//         }
//       }
//
//       return rowtitle;
//     },
//     // Used on the img in the object.
//     objectImage() {
//       let style =
//         "width:" +
//         this.styling.objectImageWidth +
//         "%;margin-top:" +
//         this.styling.objectImageMarginTop +
//         "%;margin-bottom:" +
//         this.styling.objectImageMarginBottom +
//         "%;";
//
//       if (this.styling.objectImgObjectFillIsOn) {
//         style +=
//           "px;object-fit:" +
//           this.styling.objectImgObjectFillStyle +
//           ";height:" +
//           this.row.styling.objectImgObjectFillHeight +
//           "px;";
//       }
//
//       // Border Radius
//       let suffix = this.styling.objectImgBorderRadiusIsPixels ? "px" : "%";
//
//       if (this.object.template == 1 || this.row.choicesShareTemplate) {
//         style +=
//           "border-radius: " +
//           this.styling.objectImgBorderRadiusTopLeft +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectImgBorderRadiusTopRight +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectImgBorderRadiusBottomRight +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectImgBorderRadiusBottomLeft +
//           +"" +
//           suffix +
//           ";";
//       } else if (this.object.template == 2) {
//         style +=
//           "border-radius: " +
//           this.styling.objectImgBorderRadiusTopLeft +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectImgBorderRadiusBottomLeft +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectImgBorderRadiusBottomRight +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectImgBorderRadiusTopRight +
//           +"" +
//           suffix +
//           "; ";
//       } else {
//         style +=
//           "border-radius: " +
//           this.styling.objectImgBorderRadiusBottomLeft +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectImgBorderRadiusTopLeft +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectImgBorderRadiusTopRight +
//           +"" +
//           suffix +
//           " " +
//           this.styling.objectImgBorderRadiusBottomRight +
//           +"" +
//           suffix +
//           "; ";
//       }
//
//       if (this.styling.objectImgOverflowIsOn) {
//         style += "overflow:hidden;";
//       }
//
//       if (this.styling.objectImgBorderIsOn) {
//         style +=
//           "border: " +
//           this.styling.objectImgBorderWidth +
//           "" +
//           "px " +
//           this.styling.objectImgBorderStyle +
//           " " +
//           this.styling.objectImgBorderColor +
//           "" +
//           ";";
//       }
//
//       return style;
//     },
//     scoreText() {
//       return (
//         'font-family: "' +
//         this.styling.scoreText +
//         '";' +
//         "font-size: " +
//         this.styling.scoreTextSize +
//         "%;" +
//         "text-align: " +
//         this.styling.scoreTextAlign +
//         ";" +
//         "color: " +
//         this.styling.scoreTextColor +
//         ";"
//       );
//     },
//     app() {
//       return this.$store.state.app;
//     },
//     replaceObjectText() {
//       let newObjectText = this.object.text;
//       let isPointType = false;
//
//       // TODO Add point type if it is.
//
//       if (typeof this.$store.state.app.words != "undefined") {
//         // Checks if the word is the ID of a point-type.
//         for (let r = 0; r < this.app.words.length; r++) {
//           isPointType = false;
//
//           for (let u = 0; u < this.app.pointTypes.length; u++) {
//             if (this.app.pointTypes[u].id == this.app.words[r].id) {
//               newObjectText = newObjectText.replace(
//                 new RegExp(this.app.words[r].id, "g"),
//                 this.app.pointTypes[u].startingSum
//               );
//               isPointType = true;
//             }
//           } // If its not a point-type.
//           if (!isPointType) {
//             for (let i = 0; i < this.app.words.length; i++) {
//               newObjectText = newObjectText.replace(
//                 new RegExp(this.app.words[i].id, "g"),
//                 this.app.words[i].replaceText
//               );
//             }
//           }
//         }
//       }
//       return newObjectText;
//     },
//     replaceObjectTitleText() {
//       let newObjectText = this.object.title;
//       let isPointType = false;
//
//       // TODO Add point type if it is.
//
//       if (typeof this.$store.state.app.words != "undefined") {
//         // Checks if the word is the ID of a point-type.
//         for (let r = 0; r < this.app.words.length; r++) {
//           isPointType = false;
//           for (let u = 0; u < this.app.pointTypes.length; u++) {
//             if (this.app.pointTypes[u].id == this.app.words[r].id) {
//               newObjectText = newObjectText.replace(
//                 new RegExp(this.app.words[r].id, "g"),
//                 this.app.pointTypes[u].startingSum
//               );
//               isPointType = true;
//             }
//           } // If its not a point-type.
//           if (!isPointType) {
//             for (let i = 0; i < this.app.words.length; i++) {
//               newObjectText = newObjectText.replace(
//                 new RegExp(this.app.words[i].id, "g"),
//                 this.app.words[i].replaceText
//               );
//             }
//           }
//         }
//       }
//
//       return newObjectText;
//     },
//   },
//   created() {
//     window.addEventListener("resize", this.handleResize);
//     this.handleResize();
//     // Fix For legacy multi-choice.
//     if (typeof this.object.multipleUseVariable !== "undefined") {
//       this.selectedThisManyTimesProp = this.object.multipleUseVariable;
//     }
//   },
//   destroyed() {
//     window.removeEventListener("resize", this.handleResize);
//   },
//   methods: {
//     changeTheWord() {
//       // TODO Change word with text field.
//     },
//
//     multiplyOrDivide(object) {
//       // TODO if object Multiplies or divides.
//       // This will divide a point type when activated.
//       let c;
//       if (object.multiplyPointtypeIsOnCheck) {
//         // used when checing if
//         object.multiplyPointtypeIsOnCheck = false;
//         for (c = 0; c < this.app.pointTypes.length; c++) {
//           if (this.app.pointTypes[c].id == object.pointTypeToMultiply) {
//             this.app.pointTypes[c].startingSum -= object.startingSumAtMultiply;
//             //this.app.pointTypes[c].startingSum /= object.multiplyWithThis;
//             console.log("Multiply:" + object.startingSumAtMultiply);
//           }
//         }
//       }
//
//       // This will multiply a point type when activated.
//       if (object.dividePointtypeIsOnCheck) {
//         // used when checing if
//         object.dividePointtypeIsOnCheck = false;
//         for (c = 0; c < this.app.pointTypes.length; c++) {
//           if (this.app.pointTypes[c].id == object.pointTypeToDivide) {
//             this.app.pointTypes[c].startingSum *= object.divideWithThis;
//             console.log("Divide:");
//           }
//         }
//       }
//     },
//     handleResize() {
//       this.window.width = window.innerWidth;
//       this.window.height = window.innerHeight;
//     },
//     setFalse(object) {
//       object.isNotSelectable = false;
//     },
//     /**
//      * Collects the title of the required id in the requirements.
//      * And shows it when showrequired is true.
//      */
//     getChoiceTitle(required) {
//       if (required.showRequired) {
//         let i, n;
//         if (required.type == "id") {
//           for (i = 0; i < this.app.rows.length; i++) {
//             for (n = 0; n < this.app.rows[i].objects.length; n++) {
//               if (required.reqId == this.app.rows[i].objects[n].id) {
//                 return (
//                   required.beforeText +
//                   " " +
//                   this.app.rows[i].objects[n].title +
//                   " " +
//                   required.afterText
//                 );
//               }
//             }
//           }
//         } else if (required.type == "points") {
//           for (i = 0; i < this.app.pointTypes.length; i++) {
//             if (required.reqId == this.app.pointTypes[i].id) {
//               return (
//                 required.beforeText +
//                 " " +
//                 required.reqPoints +
//                 " " +
//                 this.app.pointTypes[i].name +
//                 " " +
//                 required.afterText
//               );
//             }
//           }
//         } else if (required.type == "or") {
//           let listOfOrTitles = "";
//           for (let k = 0; k < required.orRequired.length; k++) {
//             for (i = 0; i < this.app.rows.length; i++) {
//               for (n = 0; n < this.app.rows[i].objects.length; n++) {
//                 if (
//                   required.orRequired[k].req == this.app.rows[i].objects[n].id
//                 ) {
//                   listOfOrTitles += this.app.rows[i].objects[n].title + ", ";
//                 }
//               }
//             }
//           }
//
//           return (
//             required.beforeText +
//             " " +
//             listOfOrTitles +
//             " " +
//             required.afterText
//           );
//         }
//       }
//       return "";
//     },
//     // The Method that will create a new row.
//     createNewAddon() {
//       this.object.addons.push({
//         id: "",
//         title: this.app.defaultAddonTitle,
//         text: this.app.defaultAddonText,
//         template: "",
//         image: "",
//         requireds: [],
//       });
//       console.log(this.object.addons);
//     },
//     // The Method that creates new score.
//     createNewScore() {
//       this.object.scores.push({
//         id: "",
//         value: 0,
//         type: "",
//         requireds: [],
//         beforeText: this.app.defaultBeforePoint,
//         afterText: this.app.defaultAfterPoint,
//         showScore: true, // Shows the score if the checkbox is pressed.
//       });
//     },
//     // Removes a object from a array, the parameter is the objects index and the array that holds it.
//     deleteEvent(index, array) {
//       array.splice(index, 1);
//     },
//     // Will move the object up one in the array that holds it.
//     moveObjectUp() {
//       let index = this.objects.indexOf(this.object);
//       if (index > 0) {
//         let el = this.objects[index];
//         this.$set(this.objects, index, this.objects[index - 1]);
//         this.$set(this.objects, index - 1, el);
//       }
//     },
//     // Will move the object down one in the array that holds it.
//     moveObjectDown() {
//       let index = this.objects.indexOf(this.object);
//       if (index !== -1 && index < this.objects.length - 1) {
//         let el = this.objects[index];
//         this.$set(this.objects, index, this.objects[index + 1]);
//         this.$set(this.objects, index + 1, el);
//       }
//     },
//     // Deletes a row after the index is found.
//     deleteObject() {
//       this.objects.splice(this.objects.indexOf(this.object), 1);
//     },
//     // Checks if the id's and points allow this object to be selected.
//     checkRequireds(object) {
//       return this.$store.getters.checkRequireds(object);
//     },
//     checkPoints(object) {
//       let check = true;
//       // Then make the one that
//
//       for (var o = 0; o < object.scores.length; o++) {
//         if (
//           this.checkRequireds(object.scores[o]) &&
//           !object.scores[o].isActive
//         ) {
//           // Goes trough all of the scores and check which is fits.
//           for (var x = 0; x < this.app.pointTypes.length; x++) {
//             if (
//               this.app.pointTypes[x].id == object.scores[o].id &&
//               this.app.pointTypes[x].belowZeroNotAllowed
//             ) {
//               if (
//                 this.app.pointTypes[x].startingSum -
//                 parseInt(object.scores[o].value) <
//                 0
//               ) {
//                 check = false;
//               }
//             }
//           }
//           // } else {}
//         }
//       }
//
//       return check;
//     },
//     // When someone clicks on a object this process needs to happen.
//     activateObject(object, row) {
//       let hasRequireds = this.checkRequireds(object);
//       let hasPoints = this.checkPoints(object);
//
//       // Will here run trugh all the scores, and check if there is enough
//       // 1. Find the type of points and how many there is.
//       // 2. take the points off, or add.
//
//       // Used to make the activated change when a selected is pressed.
//       if (
//         row.currentChoices + 1 > row.allowedChoices &&
//         !object.isActive &&
//         row.allowedChoices != 0
//       ) {
//         // For each of the objects in the row.
//         // Check if the number of allowed choices allows it.
//         for (var n = 0; n < row.objects.length; n++) {
//           if (
//             row.objects[n].isActive &&
//             row.currentChoices + 1 > row.allowedChoices
//           ) {
//             this.activateObject(row.objects[n], row);
//           }
//         }
//       }
//
//       // If hasRequireds is true, and currentchoices is not above allowedChoices.
//       if (
//         hasRequireds &&
//         hasPoints &&
//         (row.currentChoices < row.allowedChoices || row.allowedChoices == 0)
//       ) {
//         // If the array does not have this id-from before of, turn on.
//         if (!this.activated.includes(object.id)) {
//           // Adds the object-id into the
//
//           // Then make the one that
//           for (var o = 0; o < object.scores.length; o++) {
//             if (
//               this.checkRequireds(object.scores[o]) &&
//               !object.scores[o].isActive
//             ) {
//               // Goes trough all of the scores and check which is fits.
//               for (var x = 0; x < this.app.pointTypes.length; x++) {
//                 if (this.app.pointTypes[x].id == object.scores[o].id) {
//                   this.app.pointTypes[x].startingSum -= parseInt(
//                     object.scores[o].value
//                   );
//                   object.scores[o].isActive = true;
//                 }
//               }
//               // } else {}
//             }
//           }
//
//           // Is the FUNCTIONS, happens when the object is selected.
//           // ------------------------------------------------------
//
//           var i, v, c, m;
//
//           // This activates cleaning if the function is activated.
//           if (object.cleanACtivatedOnSelect) {
//             this.cleanActivated();
//           }
//
//           let array;
//
//           // This will force activate another choice.
//           if (
//             object.activateOtherChoice &&
//             typeof object.activateThisChoice !== "undefined"
//           ) {
//             array = object.activateThisChoice.split(",");
//
//             for (m = 0; m < array.length; m++) {
//               for (i = 0; i < this.app.rows.length; i++) {
//                 for (v = 0; v < this.app.rows[i].objects.length; v++) {
//                   if (
//                     this.app.rows[i].objects[v].id == array[m] &&
//                     !this.app.rows[i].objects[v].isActive
//                   ) {
//                     this.app.rows[i].objects[v].isNotSelectable = true;
//                     this.activateObject(
//                       this.app.rows[i].objects[v],
//                       this.app.rows[i]
//                     );
//                   } else if (
//                     this.app.rows[i].objects[v].id == array[m] &&
//                     this.app.rows[i].objects[v].isActive
//                   ) {
//                     this.app.rows[i].objects[v].isNotSelectable = true;
//                   }
//                 }
//               }
//             }
//           }
//
//           // This will deactivate another choice.
//           if (object.deactivateOtherChoice) {
//             array = object.deactivateThisChoice.split(",");
//
//             for (i = 0; i < array.length; i++) {
//               for (c = 0; c < this.app.rows.length; c++) {
//                 for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                   if (
//                     (this.app.rows[c].objects[m].id == array[i] ||
//                       this.app.rows[c].resultGroupId == array[i]) &&
//                     this.app.rows[c].objects[m].isActive
//                   ) {
//                     //this.app.rows[c].objects[m].isActive = false;
//                     this.activateObject(
//                       this.app.rows[c].objects[m],
//                       this.app.rows[c]
//                     );
//                   }
//                 }
//               }
//
//               // Checks if the id added in one of the groups in feature.
//               //let groupIdArray = this.newActivated.split(",");
//               for (let g = 0; g < this.app.groups.length; g++) {
//                 if (this.app.groups[g].id == array[i]) {
//                   for (c = 0; c < this.app.rows.length; c++) {
//                     for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                       for (
//                         let y = 0;
//                         y < this.app.rows[c].objects[m].groups.length;
//                         y++
//                       ) {
//                         if (
//                           this.app.rows[c].objects[m].groups[y].id ==
//                           array[i] &&
//                           this.app.rows[c].objects[m].isActive
//                         ) {
//                           //this.app.rows[c].objects[m].isActive = false;
//                           this.activateObject(
//                             this.app.rows[c].objects[m],
//                             this.app.rows[c]
//                           );
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//
//           let allChanges = "Scores Updated On: ";
//           // Will go trough all of the scores and see if there is any requirements with this id.
//           this.app.rows.forEach((element) => {
//             element.objects.forEach((objects) => {
//               objects.scores.forEach((scores) => {
//                 scores.requireds.forEach((requireds) => {
//                   if (objects.isActive) {
//                     if (requireds.reqId == object.id) {
//                       if (allChanges.length == 19) {
//                         allChanges += objects.title;
//                       } else {
//                         allChanges += ", " + objects.title;
//                       }
//                       this.activateObject(objects, element);
//                     } else if (
//                       JSON.stringify(requireds).includes('"' + object.id + '"')
//                     ) {
//                       if (allChanges.length == 19) {
//                         allChanges += objects.title;
//                       } else {
//                         allChanges += ", " + objects.title;
//                       }
//                       this.activateObject(objects, element);
//                     }
//                   } else if (objects.isSelectableMultiple) {
//                     if (
//                       JSON.stringify(requireds).includes('"' + object.id + '"')
//                     ) {
//                       console.log("one");
//
//                       if (
//                         allChanges.length == 19 &&
//                         objects.multipleUseVariable > 0
//                       ) {
//                         allChanges += objects.title;
//                       } else if (objects.multipleUseVariable > 0) {
//                         allChanges += ", " + objects.title;
//                       }
//
//                       for (
//                         let i = 0;
//                         i <
//                         objects.numMultipleTimesPluss -
//                         objects.numMultipleTimesMinus;
//                         i++
//                       ) {
//                         this.selectedOneLess(objects);
//                       }
//                     }
//                   }
//                 });
//               });
//             });
//           });
//           if (allChanges !== "Scores Updated On: ") {
//             this.text = allChanges + ".";
//             this.snackbar = true;
//           }
//
//           // This will multiply a point type when activated.
//           if (object.multiplyPointtypeIsOn) {
//             // used when checing if
//             object.multiplyPointtypeIsOnCheck = true;
//             for (c = 0; c < this.app.pointTypes.length; c++) {
//               if (this.app.pointTypes[c].id == object.pointTypeToMultiply) {
//                 if (!object.multiplyPointtypeIsId) {
//                   object.startingSumAtMultiply =
//                     this.app.pointTypes[c].startingSum *
//                     object.multiplyWithThis -
//                     this.app.pointTypes[c].startingSum;
//
//                   this.app.pointTypes[c].startingSum *= object.multiplyWithThis;
//                   // If the multiplyWithThis is a ID
//                 } else {
//                   for (let ca = 0; ca < this.app.pointTypes.length; ca++) {
//                     if (this.app.pointTypes[ca].id == object.multiplyWithThis) {
//                       object.startingSumAtMultiply =
//                         this.app.pointTypes[c].startingSum *
//                         this.app.pointTypes[ca].startingSum -
//                         this.app.pointTypes[c].startingSum;
//                       this.app.pointTypes[c].startingSum *= this.app.pointTypes[
//                         ca
//                       ].startingSum;
//                     }
//                   }
//                 }
//               }
//             }
//           }
//
//           // This will divide a point type when activated.
//           if (object.dividePointtypeIsOn) {
//             // used when checing if
//             object.dividePointtypeIsOnCheck = true;
//             for (c = 0; c < this.app.pointTypes.length; c++) {
//               if (this.app.pointTypes[c].id == object.pointTypeToDivide) {
//                 this.app.pointTypes[c].startingSum /= object.divideWithThis;
//                 console.log("Multiply:");
//               }
//             }
//           }
//
//           // This will change the Allowed Choices of Row.
//           if (object.addToAllowChoice) {
//             for (c = 0; c < this.app.rows.length; c++) {
//               if (object.idOfAllowChoice == this.app.rows[c].id) {
//                 this.app.rows[c].allowedChoices += object.numbAddToAllowChoice;
//
//                 if (isNaN(this.app.rows[c].allowedChoicesChange)) {
//                   this.app.rows[c].allowedChoicesChange = 0;
//                 }
//
//                 this.app.rows[c].allowedChoicesChange +=
//                   object.numbAddToAllowChoice; // Added to keep record.
//
//                 let numActive = 0;
//                 for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                   this.app.rows[c].objects[m].isActive ? numActive++ : "";
//                 }
//
//                 // If there is more active than is allowed, need to turna few off.
//                 if (numActive > this.app.rows[c].allowedChoices) {
//                   let deactivateChoices =
//                     numActive - this.app.rows[c].allowedChoices;
//                   for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                     if (
//                       deactivateChoices > 0 &&
//                       this.app.rows[c].objects[m].isActive
//                     ) {
//                       this.activateObject(
//                         this.app.rows[c].objects[m],
//                         this.app.rows[c]
//                       );
//                       deactivateChoices--;
//                     }
//                   }
//                 }
//               }
//             }
//           }
//
//           // This will divide a point type when activated.
//           if (object.textfieldIsOn) {
//             // used when checing if
//
//             for (c = 0; c < this.app.words.length; c++) {
//               if (this.app.words[c].id == object.idOfTheTextfieldWord) {
//                 this.app.words[c].replaceText = object.wordChangeSelect;
//               }
//             }
//           }
//
//           this.activated.push(object.id);
//           row.currentChoices += 1;
//
//           // Deletes the the id from the array.
//         } else {
//           for (let i = 0; i < object.scores.length; i++) {
//             if (
//               (this.checkRequireds(object.scores[i]) &&
//                 object.scores[i].isActive) ||
//               object.scores[i].isActive
//             ) {
//               // Goes trough all of the scores and check which is fits.
//               for (let x = 0; x < this.app.pointTypes.length; x++) {
//                 if (this.app.pointTypes[x].id == object.scores[i].id) {
//                   this.app.pointTypes[x].startingSum += parseInt(
//                     object.scores[i].value
//                   );
//                   object.scores[i].isActive = false;
//                 }
//               }
//             }
//           }
//
//           // Is the FUNCTIONS, happens when the object is deselected.
//           // ------------------------------------------------------
//
//           let array;
//           // This will force activate another choice.
//           if (
//             object.activateOtherChoice &&
//             typeof object.activateThisChoice !== "undefined"
//           ) {
//             array = object.activateThisChoice.split(",");
//
//             for (m = 0; m < array.length; m++) {
//               // This will force activate another choice.
//
//               for (i = 0; i < this.app.rows.length; i++) {
//                 for (v = 0; v < this.app.rows[i].objects.length; v++) {
//                   if (
//                     this.app.rows[i].objects[v].id == array[m] &&
//                     this.app.rows[i].objects[v].isActive
//                   ) {
//                     this.app.rows[i].objects[v].isNotSelectable = false;
//                     this.activateObject(
//                       this.app.rows[i].objects[v],
//                       this.app.rows[i]
//                     );
//                   } else {
//                     this.app.rows[i].objects[v].isNotSelectable = false;
//                   }
//                 }
//               }
//             }
//           }
//
//           // This will deactivate another choice.
//           if (object.deactivateOtherChoice) {
//             array = object.deactivateThisChoice.split(",");
//
//             for (i = 0; i < array.length; i++) {
//               for (c = 0; c < this.app.rows.length; c++) {
//                 for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                   if (
//                     (this.app.rows[c].objects[m].id == array[i] ||
//                       this.app.rows[c].resultGroupId == array[i]) &&
//                     this.app.rows[c].objects[m].isActive
//                   ) {
//                     //this.app.rows[c].objects[m].isActive = false;
//                     this.activateObject(
//                       this.app.rows[c].objects[m],
//                       this.app.rows[c]
//                     );
//                   }
//                 }
//               }
//
//               // Checks if the id added in one of the groups in feature.
//               //let groupIdArray = this.newActivated.split(",");
//               for (let g = 0; g < this.app.groups.length; g++) {
//                 if (this.app.groups[g].id == array[i]) {
//                   for (c = 0; c < this.app.rows.length; c++) {
//                     for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                       for (
//                         let y = 0;
//                         y < this.app.rows[c].objects[m].groups.length;
//                         y++
//                       ) {
//                         if (
//                           this.app.rows[c].objects[m].groups[y].id ==
//                           array[i] &&
//                           this.app.rows[c].objects[m].isActive
//                         ) {
//                           //this.app.rows[c].objects[m].isActive = false;
//                           this.activateObject(
//                             this.app.rows[c].objects[m],
//                             this.app.rows[c]
//                           );
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//
//           let allChanges = "Scores Updated On: ";
//           // Will go trough all of the scores and see if there is any requirements with this id.
//           this.app.rows.forEach((element) => {
//             element.objects.forEach((objects) => {
//               objects.scores.forEach((scores) => {
//                 scores.requireds.forEach((requireds) => {
//                   if (objects.isActive) {
//                     if (requireds.reqId == object.id) {
//                       if (allChanges.length == 19) {
//                         allChanges += objects.title;
//                       } else {
//                         allChanges += ", " + objects.title;
//                       }
//                       this.activateObject(objects, element);
//                     } else if (
//                       JSON.stringify(requireds).includes('"' + object.id + '"')
//                     ) {
//                       if (allChanges.length == 19) {
//                         allChanges += objects.title;
//                       } else {
//                         allChanges += ", " + objects.title;
//                       }
//                       this.activateObject(objects, element);
//                     }
//                   } else if (objects.isSelectableMultiple) {
//                     if (
//                       JSON.stringify(requireds).includes('"' + object.id + '"')
//                     ) {
//                       console.log("one");
//
//                       if (
//                         allChanges.length == 19 &&
//                         objects.multipleUseVariable > 0
//                       ) {
//                         allChanges += objects.title;
//                       } else if (objects.multipleUseVariable > 0) {
//                         allChanges += ", " + objects.title;
//                       }
//
//                       for (
//                         let i = 0;
//                         i <
//                         objects.numMultipleTimesPluss -
//                         objects.numMultipleTimesMinus;
//                         i++
//                       ) {
//                         this.selectedOneLess(objects);
//                       }
//                     }
//                   }
//                 });
//               });
//             });
//           });
//           if (allChanges !== "Scores Updated On: ") {
//             this.text = allChanges + ".";
//             this.snackbar = true;
//           }
//
//           // This will divide a point type when activated.
//           if (object.multiplyPointtypeIsOnCheck) {
//             // used when checing if
//             object.multiplyPointtypeIsOnCheck = false;
//             for (c = 0; c < this.app.pointTypes.length; c++) {
//               if (this.app.pointTypes[c].id == object.pointTypeToMultiply) {
//                 this.app.pointTypes[c].startingSum -=
//                   object.startingSumAtMultiply;
//                 //this.app.pointTypes[c].startingSum /= object.multiplyWithThis;
//                 console.log("Multiply:" + object.startingSumAtMultiply);
//               }
//             }
//           }
//
//           // This will multiply a point type when activated.
//           if (object.dividePointtypeIsOnCheck) {
//             // used when checing if
//             object.dividePointtypeIsOnCheck = false;
//             for (c = 0; c < this.app.pointTypes.length; c++) {
//               if (this.app.pointTypes[c].id == object.pointTypeToDivide) {
//                 this.app.pointTypes[c].startingSum *= object.divideWithThis;
//                 console.log("Multiply:");
//               }
//             }
//           }
//
//           // This will divide a point type when activated.
//           if (object.textfieldIsOn) {
//             // used when checing if
//
//             for (c = 0; c < this.app.words.length; c++) {
//               if (this.app.words[c].id == object.idOfTheTextfieldWord) {
//                 this.app.words[c].replaceText = object.wordChangeDeselect;
//               }
//             }
//           }
//
//           // This will change the Allowed Choices of Row.
//           if (object.addToAllowChoice) {
//             for (c = 0; c < this.app.rows.length; c++) {
//               if (object.idOfAllowChoice == this.app.rows[c].id) {
//                 this.app.rows[c].allowedChoices -= object.numbAddToAllowChoice;
//                 this.app.rows[c].allowedChoicesChange -=
//                   object.numbAddToAllowChoice; // Added to keep record.
//
//                 let numActive = 0;
//                 for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                   this.app.rows[c].objects[m].isActive ? numActive++ : "";
//                 }
//
//                 // If there is more active than is allowed, need to turna few off.
//                 if (numActive > this.app.rows[c].allowedChoices) {
//                   let deactivateChoices =
//                     numActive - this.app.rows[c].allowedChoices;
//                   for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                     if (
//                       deactivateChoices > 0 &&
//                       this.app.rows[c].objects[m].isActive
//                     ) {
//                       this.activateObject(
//                         this.app.rows[c].objects[m],
//                         this.app.rows[c]
//                       );
//                       deactivateChoices--;
//                     }
//                   }
//                 }
//               }
//             }
//           }
//
//           // Delete the id from the activated array
//           this.activated.splice(this.activated.indexOf(object.id), 1);
//           row.currentChoices -= 1;
//         }
//
//         // Switches the isActive and updates the object.
//         object.isActive = !object.isActive;
//         this.updateActivated();
//
//         // If the object.id is in the activated-array, but required is not there.
//         // Turns the object off after removing the points.
//       } else if (this.activated.includes(object.id)) {
//         // Removes this id from the activated array.
//         this.activated.splice(this.activated.indexOf(object.id), 1);
//
//         for (let i = 0; i < object.scores.length; i++) {
//           if (
//             (this.checkRequireds(object.scores[i]) &&
//               object.scores[i].isActive) ||
//             object.scores[i].isActive
//           ) {
//             // Goes trough all of the scores and check which is fits.
//             for (let x = 0; x < this.app.pointTypes.length; x++) {
//               if (this.app.pointTypes[x].id == object.scores[i].id) {
//                 this.app.pointTypes[x].startingSum += parseInt(
//                   object.scores[i].value
//                 );
//                 object.scores[i].isActive = false;
//               }
//             }
//           }
//         }
//
//         // Is the FUNCTIONS, happens when the object is selected.
//         // ------------------------------------------------------
//
//         // This will force activate another choice.
//         if (
//           object.activateOtherChoice &&
//           typeof object.activateThisChoice !== "undefined"
//         ) {
//           let array = object.activateThisChoice.split(",");
//
//           for (m = 0; m < array.length; m++) {
//             // This will force activate another choice.
//
//             for (i = 0; i < this.app.rows.length; i++) {
//               for (v = 0; v < this.app.rows[i].objects.length; v++) {
//                 if (
//                   this.app.rows[i].objects[v].id == array[m] &&
//                   this.app.rows[i].objects[v].isActive
//                 ) {
//                   this.app.rows[i].objects[v].isNotSelectable = false;
//                   this.activateObject(
//                     this.app.rows[i].objects[v],
//                     this.app.rows[i]
//                   );
//                 } else {
//                   this.app.rows[i].objects[v].isNotSelectable = false;
//                 }
//               }
//             }
//           }
//         }
//
//         let allChanges = "Scores Updated On: ";
//         // Will go trough all of the scores and see if there is any requirements with this id.
//         this.app.rows.forEach((element) => {
//           element.objects.forEach((objects) => {
//             objects.scores.forEach((scores) => {
//               scores.requireds.forEach((requireds) => {
//                 if (objects.isActive) {
//                   if (requireds.reqId == object.id) {
//                     if (allChanges.length == 19) {
//                       allChanges += objects.title;
//                     } else {
//                       allChanges += ", " + objects.title;
//                     }
//                     this.activateObject(objects, element);
//                   } else if (
//                     JSON.stringify(requireds).includes('"' + object.id + '"')
//                   ) {
//                     if (allChanges.length == 19) {
//                       allChanges += objects.title;
//                     } else {
//                       allChanges += ", " + objects.title;
//                     }
//                     this.activateObject(objects, element);
//                   }
//                 } else if (objects.isSelectableMultiple) {
//                   if (
//                     JSON.stringify(requireds).includes('"' + object.id + '"')
//                   ) {
//                     console.log("one");
//
//                     if (
//                       allChanges.length == 19 &&
//                       objects.multipleUseVariable > 0
//                     ) {
//                       allChanges += objects.title;
//                     } else if (objects.multipleUseVariable > 0) {
//                       allChanges += ", " + objects.title;
//                     }
//
//                     for (
//                       let i = 0;
//                       i <
//                       objects.numMultipleTimesPluss -
//                       objects.numMultipleTimesMinus;
//                       i++
//                     ) {
//                       this.selectedOneLess(objects);
//                     }
//                   }
//                 }
//               });
//             });
//           });
//         });
//         if (allChanges !== "Scores Updated On: ") {
//           this.text = allChanges + ".";
//           this.snackbar = true;
//         }
//
//         // This will divide a point type when activated.
//         if (object.textfieldIsOn) {
//           // used when checing if
//
//           for (c = 0; c < this.app.words.length; c++) {
//             if (this.app.words[c].id == object.idOfTheTextfieldWord) {
//               this.app.words[c].replaceText = object.wordChangeDeselect;
//             }
//           }
//         }
//
//         // This will change the Allowed Choices of Row.
//         if (object.addToAllowChoice) {
//           for (c = 0; c < this.app.rows.length; c++) {
//             if (object.idOfAllowChoice == this.app.rows[c].id) {
//               this.app.rows[c].allowedChoices -= object.numbAddToAllowChoice;
//               this.app.rows[c].allowedChoicesChange -=
//                 object.numbAddToAllowChoice; // Added to keep record.
//
//               let numActive = 0;
//               for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                 this.app.rows[c].objects[m].isActive ? numActive++ : "";
//               }
//
//               // If there is more active than is allowed, need to turna few off.
//               if (numActive > this.app.rows[c].allowedChoices) {
//                 let deactivateChoices =
//                   numActive - this.app.rows[c].allowedChoices;
//                 for (m = 0; m < this.app.rows[c].objects.length; m++) {
//                   if (
//                     deactivateChoices > 0 &&
//                     this.app.rows[c].objects[m].isActive
//                   ) {
//                     this.activateObject(
//                       this.app.rows[c].objects[m],
//                       this.app.rows[c]
//                     );
//                     deactivateChoices--;
//                   }
//                 }
//               }
//             }
//           }
//         }
//
//         // Switches the isActive and updates the object.
//         object.isActive = !object.isActive;
//         this.updateActivated();
//         row.currentChoices -= 1;
//       } else {
//         // Does not have the required, nothing happens.
//       }
//     },
//     // Updates the the props in the object.
//     updateObject() {
//       this.$emit("objectWasChanged", this.object);
//     },
//     // used when the - in a multiple is pressed.
//     selectedOneMore(object) {
//       let isLessThanLimit = true;
//
//       // If the multiple choice uses its own variable.
//       if (object.isMultipleUseVariable) {
//         object.multipleUseVariable =
//           typeof object.multipleUseVariable === "undefined"
//             ? 0
//             : object.multipleUseVariable;
//
//         if (object.numMultipleTimesPluss > object.multipleUseVariable) {
//           object.multipleUseVariable++;
//
//           this.selectedThisManyTimesProp = object.multipleUseVariable;
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
//             if (
//               this.app.pointTypes[x].id == object.scores[o].id &&
//               this.checkRequireds(object.scores[o])
//             ) {
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
//       // If the multiple choice uses its own variable.
//       if (object.isMultipleUseVariable) {
//         object.multipleUseVariable =
//           typeof object.multipleUseVariable === "undefined"
//             ? 0
//             : object.multipleUseVariable;
//
//         if (object.numMultipleTimesMinus < object.multipleUseVariable) {
//           object.multipleUseVariable--;
//           this.selectedThisManyTimesProp = object.multipleUseVariable;
//         } else {
//           isLessThanLimit = false;
//         }
//       } else {
//         for (var n = 0; n < this.app.pointTypes.length; n++) {
//           if (this.app.pointTypes[n].id == object.multipleScoreId) {
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
//             console.log(object.multipleUseVariable);
//
//             if (
//               this.app.pointTypes[x].id == object.scores[i].id &&
//               this.checkRequireds(object.scores[i])
//             ) {
//               this.app.pointTypes[x].startingSum += parseInt(
//                 object.scores[i].value
//               );
//             }
//           }
//         }
//       }
//     },
//     // Clones a choice and places it on the end of the row.
//     cloneObject() {
//       //this.row.objects.push(JSON.parse(JSON.stringify(this.object)));
//
//       this.row.objects.splice(
//         this.row.objects.indexOf(this.object) + 1,
//         0,
//         JSON.parse(JSON.stringify(this.object))
//       );
//
//       var text = "";
//       var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
//
//       for (var o = 0; o < 4; o++)
//         text += charset.charAt(Math.floor(Math.random() * charset.length));
//
//       this.row.objects[this.row.objects.indexOf(this.object) + 1].id = text;
//     },
//     // Updates the list of activateds.
//     updateActivated() {
//       this.$emit("activatedWasChanged", this.activated);
//     },
//     // Adds a choice or row to a group.
//     addObjectToGroup() {
//       // array exists and is not empty
//       this.object.groups.push({
//         id: "",
//       });
//     },
//     // Cleans the activated array.
//     cleanActivated() {
//       this.$store.commit({
//         type: "cleanActivated",
//       });
//     },
//   },
// };
// </script>
//
// <style scoped>
// .btn {
//   margin-top: 5px;
//   margin-bottom: 5px;
//   font-size: small;
// }
//
// .row {
//   padding: 10px;
// }
//
// h3 {
//   text-align: center;
// }
//
// .active {
//   -webkit-filter: grayscale(100%);
//   filter: grayscale(100%);
// }
// </style>
