import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function Information({ onBack }: { onBack: () => void }) {
  const changelog = [
    {
      date: "03.03.2021",
      changes: [
        "Small fix for the download image button in the viewer, should work now.",
      ],
    },
    {
      date: "28.02.2021",
      changes: [
        "There is now a button at the top of the backpack-dialog, which will allow a user to download an image of it. There are some problems with the aspect of images in it.",
        "A new switch has been added in the Choices Functions. This will add to or remove from the number of allowed choices to press in a row.",
        "Moved the button settings into a dialog, and the button can now add a random sum between two numbers into a point-type.",
        "Choices can now be completely by the if it uses its own private styling. hidden filter",
        "A lot of work has been put into making the score-calculation work better.",
        "Lots and lots of bugfixes.",
      ],
    },
    {
      date: "30.01.2021",
      changes: [
        "Force and unselect functions on choices can now use the ID's of other choices like this: ID,ID,ID (No spaces).",
        "Choices can now be aligned in five different ways, Start, Center, End, Space-Around, and Space-Between.",
        "The numbers in the point bar can now switch colors depending on whether it's negative or positive, the color can be changed in design.",
        "The design of choices can now be designed separately from all the other choices in a row, with the Gear placed beside the delete-button.",
        "Added a button that deselects all choices at the top of the creator, going back to the main menu will no longer do it.",
        "Made some changes to the side-menu, which should now be easier to use and work better on smaller screens.",
        "Added a switch under the button on the rows that will only let it select choices that aren't selected from before off.",
        "There are a lot more Choice Widths to chose between, with most of them placed between 1 and 2 per row.",
        "Added gradient-backgrounds to Rows and Choices, can be found in the design menus 'Manage Choice Design' and 'Manage Row Design', some know-how is needed to use them so there is a link underneath it that can be of help.",
        "Made some new switches in rows placed in backpacks, one that removes the text of the choices placed there, another that shows the title of the row it is originally placed in above its image.",
      ],
    },
    {
      date: "12.01.2021",
      changes: [
        "Choices that have Scores with Requirements will now be turned off automatically when the Requirement loses its conditions. This only works with 'Selected' and 'Non-selected' choice requirements for now.",
        "Large update for the Point-types. + and - can now be placed automatically with a switch in the Point Types dialog and can be inverted. Colors can be set for both positive and negative numbers. Icons can be uploaded and added for each Point-Type, and the size and placement of these can be adjusted.",
        "Multi-Choices should now appear in the summary-rows that normally go into where selected choices are when Groups are used.",
        "Rows now have a switch that will make a result-row of choices be the same template and width.",
        "Object-fit has been added to images on choices and can be found in 'Manage Choice Design'. The options that can be selected are Fill, Contain, Cover, Scale-down, and None. The image container's height for each row can be found in its 'Row Settings' and leaving it empty will make no changes.",
        "Rows now have a switch that says 'Deselects choices when Row lack requirements'. Turning this on will deselect any choices within the row if one or more of the row's requirements is lost.",
        "Background on Multi-Choices will now show the correct color after the first time it has been selected. You might need to clone a choice and delete the original if it does not work, just move the Id to the next one.",
        "Background on Multi-Choices will now show the correct color after the first time it has been selected. You might need to clone a previously made choice and delete the original if it does not work, just move the Id to the next one.",
      ],
    },
    {
      date: "05.01.2021",
      changes: [
        "User-uploaded images should now work with the choice import/export feature, but you should probably ask any players to use the external URL, as the sizes of the strings will be massive.",
        "Made some changes to the menu and placed it on the side but the old menu can still be used with the lowest button. Hover over a button to see what it does.",
        "Choices that can be selected multiple times should now work with the choice import/export feature.",
        "Added a few premade Design Templates to the list, these can be found in features.",
        "Cloning choices will now work as it is supposed to, and not change the ID of the last choice in the row.",
        "The ID of groups can now be placed in the 'Will make another choice unselected' to turn off multiple choices at once.",
        "Rows can now be cloned in the same way as choices with a button placed next to the 'Delete Row'-button.",
        "Projects can now be loaded into the Viewer by placing the project-file in the top folder of the Viewer and if it has the name 'project'. But doing it this way will only show your CYOA successfully when the Viewer is uploaded on a web-page, and not on your own computer. Updated 'Help and Instructions'",
      ],
    },
    {
      date: "05.12.2020",
      changes: [
        "Fixed Equal in requirements, should now work as it is supposed to do.",
        "Rows can now take half the screen, by pressing the 'Half of the screen?'-switch.",
        "There has been added a confirmation dialog that asks for confirmation when a row is being deleted.",
        "At the bottom of the Functions section of every choice, you can now check a box that will allow a player to add a picture of their choosing onto it.",
        "Added a list of IDs and names in a new Feature dialog, should make it easier to find out which choice an id belongs to.",
        "Inline styling is now possible to use in all text, can be used to style things like the color of text-parts.",
      ],
    },
    {
      date: "30.8.2020",
      changes: [
        "Changed words so that the sum of a point type can be shown in the text, on rows, choices, and add-ons. To do this, the id of the point-type should be pretty unique, and be identical to the id of the Word.",
        "Changed the addons so that they will show themself below instead of the side when images are placed to the right or left on choices.",
        "Cloning a choice will now place it next to the original rather than at the bottom, to make it easier to place new choices in large rows.",
        "Added 'Equal or More' in comparison-requirements between two point-types.",
        "The function that allows for a choice to be selected multiple times does no longer need a point-type, but without using one the number of times it has been pressed will not be possible to use in a requirement.",
      ],
    },
    {
      date: "26.7.2020",
      changes: [
        "Images can now be stored separately from the JSON file and can be done when your project is not too large, is it too large some images might not load when placed on the net. Just be careful not to overwrite your project file when you do it.",
        "Changeable words have now been added to features and whenever the ID of such a word is placed in the CYOA then it will be replaced by something else, choices can now change what that something else is when selected and deselected in Functions.",
        "The annoying white line at the bottom of the page that is seen when 'Download Image' is used has been removed.",
        "Deleting a point-type will now delete the correct one instead of the last one.",
        "In features, the 'show import choices' switch can now be found in 'Manage backpack and choice import'.",
        "In features -> point types, one can now decide if the point-types is allowed to go lower than zero or not.",
        "In features, there is a new button for image compression where all images can be compressed at once. Good if you, for example, need a project file that can be placed on services with size limits.",
      ],
    },
    {
      date: "12.7.2020",
      changes: [
        "Did some work on Multiplying points, will work a little better now, and point-types can be multiplied with other point-types.",
        "The design-dialogs have been moved so it is above the rows and not in front of it, which should make it easier to use.",
        "Addons now have a button that will add an image to them, these images are styled in the same way as the object-images.",
        "Row-backgrounds should now work as they are supposed too when private styles are used.",
        "Added Point-to-Point comparison, but only 'Bigger than' and 'Equal to' for now, will add more later. Can be found in requirements like the others.",
      ],
    },
    {
      date: "12.6.2020",
      changes: [
        "Added a new dialog in features that show some of the symbols that people can use in the text, just copy and paste it in where you want it.",
        "I'm planning to remake the design part of the creator so that changes are made in a sidebar instead, rather than in a dialog, so changes can be seen in realtime.",
        "Fixed the in private styling, should work now. filter",
        "Update: 20.5.2020",
        "By using the ID of a Group in the 'Will make another choice unselected' every choice in the will be deselected. group",
      ],
    },
    {
      date: "7.5.2020",
      changes: [
        "<b>A choice can now be selected multiple times</b>, by checking the 'This choice can be selected multiple times' in a choice's functions. You need to make a point-type to add to it, and then it can be used for requirements in other choices. And the points can be by writing anything into the 'Id needed to activate' hidden",
        "By checking the 'Will make other choices unselected', the choice with <b>the specified id will be deselected</b> when this choice is clicked on. Very useful when that choice is the requirement to a score in another choice, as the player needs to click the choice to right the score otherwise.",
        "A button has been placed in Defaults that will <b>make the Id of the choices and rows into their titles</b>, as long as the titles are longer than two letters and not the default title.",
        "Besides the 'Delete this choice' symbol in a choice, a new symbol that <b>makes a copy of the choice</b> can be found. The copy will be placed at the end of the row.",
        "Made some more changes to the point-bar, and the text will <b>shrink on smaller screens</b>, making it easier to read on phones and tablets.",
        "Images will now load in as the player moves down on the screen, not sure if this will better load-times, but hopefully, it will",
      ],
    },
    {
      date: "28.4.2020",
      changes: [
        "The Point-bar should work better, but to keep it mobile-friendly the text-size on it needs to be small. Requirements can now be added to requirements, via the small symbol above it. This should work both on rows and objects. Made the Viewer work better for small screens, mainly making it so that choices changes to 2 per row on a small screen and 1 per row on even smaller screens.",
        "Fixed bugs: The cropper bloated the images, projects should be a lot smaller now. A problem with loading in builds happened with the last update, should be now. Other: If you have an older project, it might not work correctly after the last update. Selecting and unselecting all choices, and then resetting the starting sums of on points should fix it. Uploaded a new Viewer. fixed",
      ],
    },
    {
      date: "18.4.2020",
      changes: [
        "Changed score so that people can now choose 'More than', 'Equal To', and 'Less or Equal to' besides 'Less than' and 'More or Equal to'. The Viewer has also been and should work now fixed",
      ],
    },
    {
      date: "13.4.2020",
      changes: [
        "<b>Requirements can now be added to scores</b>, works best if the choice also has the requirement for now, as the choice will not be un-selected by itself. <br /> <br /> <b>Multiplier and divider</b> added to functions, but there are still some things that need to be done for it to work correctly, at the moment it messes with the score.",
        "<b>In the image section, a tooltip can now be added.</b> This will be revealed when someone hovers over an image for longer than 1.5 seconds. <br /> <br /> <b>Weighted dice rolls</b> can be created when a button is pressed, but only works when one choice is to be selected.",
        "<b>A choice can now force another choice to be selected</b>, but at the moment it works badly if multiple of the choices activates the same choice, or if the target has requirements attached.",
        "If your project stops working because of the update, or if you have any thoughts of features to add or other constructive feedback, then feel free to send a message to MeanDelay on Reddit.",
      ],
    },
    {
      date: "19/20.02.2020",
      changes: [
        "Added Groups to features, these can be attached to a row in its settings, or an object. Groups work as rows, in that they create a connection between choices. <br /><br /> It can currently only be used in Result-rows, to choose which choices will be listed if active. But will be used for more later. Projects started before this update will have trouble using Groups, can be by moving text and images over to a new project, or making changes to the project file. fixed",
      ],
    },
    {
      date: "18.02.2020",
      changes: ["Changed the image dialog so that it makes more sense."],
    },
    {
      date: "17.02.2020",
      changes: [
        "Creators can now choose between different fonts in the Text-design dialog, will add more thematic ones later.",
      ],
    },
    {
      date: "16.02.2020",
      changes: [
        "Whenever a user presses the button to leave the Creator or Viewer all choices will be deselected, and it will go back to default. will make it so this happens when the project is saved too later.",
      ],
    },
    {
      date: "15.02.2020",
      changes: [
        "Fixed a problem with selected choices in row, any input was read as a String instead of an Integer.",
      ],
    },
    {
      date: "14.02.2020",
      changes: [
        "Added a list over the choices in each row, this can be used to drag objects up and down.",
      ],
    },
    {
      date: "13.02.2020",
      changes: [
        "Added text-alignment settings in the Text-design dialog, the Viewer will be updated in a few days.",
      ],
    },
    {
      date: "12.02.2020",
      changes: [
        "Added image capture on the viewer in the creator, creators can now download images of their projects. static",
      ],
    },
    {
      date: "11.02.2020",
      changes: [
        "Added a way for people to copy/move objects from one row to another in row-settings.",
        "Redesigned the choices in edit-mode.",
        "When someone click on more than what allowed-choices allow the first selected will be unselected.",
      ],
    },
    {
      date: "10.02.2020",
      changes: [
        "Started writing this changelog and added it to the help section of the page.",
        "Made the viewer and creator more responsive. The choices should default to 1 in width if the screen becomes too small. <br /> The row in edit-mode have been changed to better fit a small screen. <br /> The image dialog is now easier to use on a small screen. <br /> Bar on top is now responsive.<br />",
        "Sanitizes now the output of various texts to hinder the rendering of malicious script tags. The Viewer has been updated.",
        "Started working on the ‘Help’ section, is currently a mess and became more of a FAQ than a tutorial, will finish it another day.",
      ],
    },
  ];
  const tips = [
    {
      title: "How should I go about creating a CYOA with this?",
      content: [
        'First off, after figuring out what you want to make a CYOA about, find a color palette that fits the theme, you can use a <a href="https://color.adobe.com/nb/create/">Color theme generator</a> if you need help. Placing a repeating image in the background that fits the theme is always a good idea.',
        "Create the point system if you have one, it's not necessary, you can always go for the 'select x from each row' type of Cyoa. Now create the rows you have planned before-hand, give them names, and add any choices you have planned.",
      ],
    },
    {
      title: "What is a requirement and how do I Create one?",
      content: [
        "A requirement is something that can be created on both rows and objects and will decide if the row is visible, or if the object can be activated.",
        "A requirement can be added to a row by pressing the key+ symbol in the right corner, and on the object by pressing the button that says 'Requirement'.",
        "When one of these buttons is pressed you a dialog opens up where you have to choose what condition you'll want.",
        "1. The first one will let the user activate the choice if the choice with the id is already activated.",
        "2. The second will let the user activate the choice only if the choice the id belongs to is not already pressed.",
        "3. The third will only let the choice be activated if the selected point type is less than the value you write in.",
        "4. The fourth will only let the choice be activated if the selected point type is equal or more to the value you write in.",
        "More than one of these requirements can be added to each row and object.",
      ],
    },
    {
      title: "What is a Pointtype and how do I create one?",
      content: [
        "A point-type is a system where you can create some type of valuta, be it gold points, XP or just points, that the player can spend and earn trough their choices. These can be created in the dialog that pops up when you press the 'Feature' button in the top menu and can be added to choices by pressing the 'Score' button on a choice.",
        "In the 'Point Type' select you choose the point-type you have created, the value which needs to be in the negative if you want it to give the player points, and the text that will be shown before and after.",
        "If the 'Show Score?' checkbox is unchecked then the value and text will not show on the object, in case you want to write it in the text or you want it to be hidden.",
      ],
    },
    {
      title: "How do I load and save my project?",
      content: [
        "In the upper right corner of the creator and the creator-viewer, you'll see a button named 'Load/Save Project'. Pressing this button will lead you to a dialog where you can find a text field that says 'Load Game' and a button that say 'Save Game'.",
        "Pressing on the text field will take you to the explorer where you have to find your project, and clicking on the button will take you to the explorer where you'll need to choose where to store it and what name to give it.",
      ],
    },
    {
      title: "How do I change the design of my project?",
      content: [
        "If you look at the top bar in the image designer you'll see a button named 'Modify Design', click on this and a dialog with a lot of buttons will show itself. Each of these buttons will open another dialog where you can make changes to the design of whatever is written on it.",
        "An example will be that the 'Manage Filters' button will let you change the look of the deactivated and activated filters, and the 'Text' button will let you change the color, size, and font of the different texts on the page.",
        "Each row can have different designs if you press the Coq in the left corner of the row and flips the switch 'Use private styling?' in the dialog that pops up. Now the styling of the row will be whatever you change in the buttons that show up under.",
      ],
    },
    {
      title: "What is variables used for?",
      content: [
        "At this point, variables can only be used with button rows and can be attached to a button when it is created. Clicking a button with a variable attached to it will push the id of the variable into the array where the ids of selected choices lie. This makes it possible to use the id in requirements for rows and objects.",
      ],
    },

    {
      title: "What is allowed choices and selected choices?",

      content: [
        "In the edit-mode of the row, there is a text field that says 'Allowed Choices' and a text field that says 'Selected Choices'. The 'Allowed Choices' decides how many choices that the player can select at one time, write 1 in the text field and the user may only choose one. If there is no limit then let it stay 0.",
        "The 'Selected Choices' will show how many that is currently selected, and should normally be 0, if it is something else and none is selected then some wonky shit has happened, and you can clear it by changing the value to 0.",
      ],
    },
    {
      title: "What does the three switches on a row do?",
      content: [
        "The three switches in the row when it is on edit-mode changes how the rows operate when pressed.",
        "The upper-most one named 'Button?' will switch the image of the row out with a button, which in turn can be used to activate or deactivate variables, whose ids can be used in requirements.",
        "The middle button named 'Selected Choices?' can be used to make the row show all choices that have been selected, good to use at the end of the project to let the player see the choices they have made. A private row design should be used to make filters invisible.",
        "The third button will make it impossible for a player to change any of the choices, if one is selected then it will stay selected and visa versa. Good to use when the user should be given information or story, and not choices.",
      ],
    },
    {
      title: "What is an Addon?",
      content: [
        "An Addon is going to be a smaller choice in the choices but is currently only an under title and undertext of the choice it is attached to.",
      ],
    },
    {
      title: "What is the image cropper and compressor?",
      content: [
        "The image cropper and compressor can be found when someone presses the 'Change Image'-button on either a row or a choice and will open up in its own dialog.",
        "The cropper lets you change the height and width aspect of your image, and cut off parts that you don't need. To change the aspect you'll have to change the value of the two text fields, and then press the 'Change Aspect'-button. To crop the image you need to press the 'Crop Image'-button.",
        "The compressor cuts down the size of the image at the cost of its quality, which everyone should do to keep the project file small and thus the same with the bandwidth and storage cost. The image quality and the image scale text field shows the percentage to cut down to in quality and scale.",
        "Cutting down to 40sih percent quality will make little difference in most cases, but shave off up to 60-70 percent of the image file size. visible",
      ],
    },
  ];

  return (
    <main className="prose mx-auto mt-8">
      <div className="flex flex-row items-center gap-x-4">
        <Button variant="outline" onClick={onBack} type="button" size="icon">
          <ChevronLeft />
        </Button>
        <h1 className="mb-0">Information</h1>
      </div>
      <Accordion type="single" collapsible className="not-prose mt-4 w-full">
        <AccordionItem value="item-1" className="rounded-t border">
          <AccordionTrigger className="rounded-t p-2">
            CHANGELOG
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-2 border-t p-2">
            {changelog.map(({ date, changes }) => (
              <Accordion
                key={date}
                type="single"
                collapsible
                className="not-prose w-full"
              >
                <AccordionItem value="item-1" className="rounded border">
                  <AccordionTrigger className="rounded-t p-2">
                    {date}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-y-2 border-t p-4">
                    {changes.map((change, index) => (
                      <p
                        key={index}
                        dangerouslySetInnerHTML={{ __html: change }}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-x">
          <AccordionTrigger className="rounded-t p-2">
            How do I show off my CYOA?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-2 border-t p-2">
            <p>1. Host it yourself on a free hosting service.</p>
            <p>Either</p>
            <p>
              A. Download the Viewer from the link below, open the JSON file of
              the project and the app.XXXXXXX.js file in notepad. Then copy all
              from your project and place it in the gap between
              <b>
                {"{"}state:{"{"}app:
              </b>{" "}
              and <b>{"}"},getters:</b> near the bottom of the smallest .js file
              in the js folder.
            </p>
            <p>OR</p>
            <p>
              B. Download the Viewer from the link below, get your project file,
              make sure the project file is named 'project', place it next to
              the index.html file in the Viewer. If you do it this way then it
              will not work unless it's uploaded onto a hosting service, but
              when its there all you need is to replace the project file to
              update your project, it's the better solution.
            </p>
            <p>Then</p>
            <p>
              Create a user on Neocities or another free hosting service, move
              to the 'Edit your page' part of the site and upload the Viewer,
              anyone that enters the page will now see the Cyoa.
            </p>
            <p>
              <a href="https://mega.nz/file/iiQHxSIA#Wr93LFgqkvOMnwsT9ZWCHWxZTD0qaZ6WA2p2VTCLSEU">
                Viewer 1.8
              </a>
              <br />
              https://mega.nz/file/iiQHxSIA#Wr93LFgqkvOMnwsT9ZWCHWxZTD0qaZ6WA2p2VTCLSEU
              <br />
            </p>
            <p className="text-blue-400">
              <a href="https://mega.nz/file/T2RCiLTS#oBZGhSpY4z2ieYJtW-cJ16WcvnLmF6AtlCfy0kx9xXA">
                1.7,
              </a>
              <a href="https://mega.nz/file/zjoQyJiI#R3bDIDWcRLeSkQHICTaqXeMkH8CpIhOhityluCbn7hU">
                1.6,
              </a>
              <a href="https://mega.nz/file/3zgSBAIK#tQqFHI7ffZoMoWmaK0uu4YglAPhhuSdzDla6Atsd9Ko">
                1.5,
              </a>
              <a href="https://mega.nz/file/XmgCFKCB#Ij2DU93EHFKKBvb8Y9LjhGO3CiPaFmGH8_oaLT_EdTM">
                1.4,
              </a>
              <a href="https://mega.nz/file/32gAib4b#8rgL6A-AxA2ekUSqPeiYaDEfOm6rz_Qvl90Vlc5nAs4">
                1.3,
              </a>
              <a href="https://mega.nz/file/b6YTGYaI#A3wlyNHGlMQJkxpbDb4KdjXUoZDzy0BHj23Sr5Tv06E">
                1.2,
              </a>
              <a href="https://mega.nz/file/2q5HETIB#6uazthTwvpBkyK0NrhIlLM0R3QXLRKDUWIUD13l5p9Y">
                1.1,
              </a>
              <a href="https://mega.nz/file/6mA2zSrb#3h4gJlDyK1_mF-Lq3qAyl2xKgdOaPVSm0Hao3Gij0pQ">
                1.0,
              </a>
              <a href="https://mega.nz/file/bqARTACD#OwuSk5wspNTRtXVp7VjkCh7j2Ihd5APIwVIxbO4if08">
                0.9,
              </a>
              <a href="https://mega.nz/file/3q4TQDSC#aqJYwWV84EzhZsz4sJBMa4okA744u_K4LrmMHa3hymI">
                0.8,
              </a>
              <a href="https://mega.nz/file/zqoBHSxJ#nh9eKehc7z4_KSpAqu4Twk7sCj3EUZc_CfiQl4VJggA">
                0.7.1,
              </a>
              <a href="https://mega.nz/file/ezQSSYgB#5I2NoPVcd2NPruFBur-h8qdghCpwXjYEya--qtY206o">
                0.6,
              </a>
              <a href="https://mega.nz/file/K2YRhAoI#fjFfMg3WVCaVXz30vkEOIjEEk0L6KDwYTuJCKsVn0GA">
                0.5,
              </a>
              <a href="https://mega.nz/file/D6RAiQ5K#oUjywoLi5GuRvwlOv72RnB3vcgIpbtbFi_YsGNKz68o">
                0.4.4,
              </a>
              <a href="https://mega.nz/file/2npj1ISB#_P2DBzR-Td2QAv1sW255NGTujOViWqr53FfzRLiIenY">
                0.3,
              </a>
              <a href="https://mega.nz/#!muxRSL6T!bLOpBfKKFxTXksMk8beDKR5DDJ8lP1oWGpejiVeLZiA">
                0.2
              </a>
            </p>
            <p>2. Share the project file.</p>
            <p>
              Upload it to Mega or some other site, and let people download it
              and open it in the creator themselves.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-x">
          <AccordionTrigger className="rounded-t p-2">
            Can I create static Image Cyoa's with this?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-2 border-t p-2">
            <p>
              Yes, yes you can!
              <br />
              In the top menu of the viewer in the creator, you can see a button
              named 'Download image', press this and a download will start. The
              bigger your project is the longer it will take before the download
              starts, and the bigger the file will be.
            </p>
            <p>
              <br />
              Make them big enough and pictures near the bottom will not appear
              on the image, if this happens you should temporarily delete some
              rows and split your project into multiple pictures.
            </p>
            <br />
            <p>
              If your project is very large, then it might be wiser for you to
              download an extension with more options, like
              <a href="https://www.awesomescreenshot.com">Awesome Screenshot</a>
              which you can use to download your project as PDF or only capture
              a part of it.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="border-x border-b">
          <AccordionTrigger className="rounded-t p-2">
            How do I use the Interactive CYOA Creator?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-2 border-t p-2">
            {tips.map(({ title, content }) => (
              <Accordion
                key={title}
                type="single"
                collapsible
                className="not-prose w-full"
              >
                <AccordionItem value="item-1" className="rounded border">
                  <AccordionTrigger className="rounded-t p-2">
                    {title}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-y-2 border-t p-4">
                    {content.map((tip, index) => (
                      <p
                        key={index}
                        dangerouslySetInnerHTML={{ __html: tip }}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
