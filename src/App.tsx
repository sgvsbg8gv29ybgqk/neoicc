import { useState } from "react";
import { Button } from "./components/ui/button";
import Information from "./components/Information";
import ImageCYOA from "./components/ImageCYOA";
import { ScrollArea } from "./components/ui/scroll-area";

function IndexComponent({
  setComponent,
}: {
  setComponent: (
    component: "appImageCyoa" | "appImageCyoaViewer" | "appInformation",
  ) => void;
}) {
  return (
    <main className="prose mx-auto h-screen">
      <div className="flex h-screen flex-col justify-center">
        <h1 className="mb-0 text-5xl">Interactive CYOA Creator</h1>
        <h6>Work in progress by MeanDelay</h6>
        <div className="my-8 flex flex-col gap-y-2">
          <Button type="button" onClick={() => setComponent("appImageCyoa")}>
            Open Image-CYOA Creator
          </Button>
          <Button
            type="button"
            onClick={() => setComponent("appImageCyoaViewer")}
          >
            Open Image-CYOA Viewer
          </Button>
          <Button type="button" onClick={() => setComponent("appInformation")}>
            Help And Instructions
          </Button>
        </div>
        <div className="flex flex-row justify-end">
          <span>Update: 28.02.2021</span>
        </div>
        <span>TODO:</span>
        <ScrollArea className="not-prose max-h-96 text-xs">
          <p>imageCYOA/Row</p>
          <p>imageCYOA/Object</p>
          <p>imageCYOA/object/ObjectAddon</p>
          <p>imageCYOA/row/Requirement</p>
          <p>imageCYOA/object/ObjectRequirement</p>
          <p>imageCYOA/object/ObjectScore</p>
          <p>imageCYOA/object/ObjectSettings</p>
          <p>imageCYOA/style/Filter</p>
          <p>imageCYOA/style/Text</p>
          <p>imageCYOA/style/ObjectImage</p>
          <p>imageCYOA/style/RowImage</p>
          <p>imageCYOA/style/Background</p>
          <p>imageCYOA/style/ObjectDesign</p>
          <p>imageCYOA/style/RowDesign</p>
          <p>imageCYOA/style/PointBar</p>
          <p>imageCYOA/row/RowSettings</p>
          <p>imageCYOA/row/ButtonSettings</p>
          <p>imageCYOA/row/ObjectList</p>
          <p>imageCYOA/Design</p>
          <p>imageCYOA/style/Backpack</p>
          <p>imageCYOA/style/MultiChoice</p>
          <p>imageCYOA/Feature</p>
          <p>imageCYOA/features/Points</p>
          <p>imageCYOA/features/Symbols</p>
          <p>imageCYOA/features/Variables</p>
          <p>imageCYOA/features/Groups</p>
          <p>imageCYOA/features/Templates</p>
          <p>standardcyoa/Backpack</p>
          <p>imageCYOA/features/Defaults</p>
          <p>imageCYOA/features/Words</p>
          <p>imageCYOA/features/IdSearch</p>
          <p>imageCYOA/RowList</p>
          <p>imageCYOA/styleNew/Filter</p>
          <p>imageCYOA/styleNew/Background</p>
          <p>imageCYOA/styleNew/Backpack</p>
          <p>imageCYOA/styleNew/MultiChoice</p>
          <p>imageCYOA/styleNew/ObjectDesign</p>
          <p>imageCYOA/styleNew/ObjectImage</p>
          <p>imageCYOA/styleNew/PointBar</p>
          <p>imageCYOA/styleNew/RowDesign</p>
          <p>imageCYOA/styleNew/RowImage</p>
          <p>imageCYOA/styleNew/Text</p>
        </ScrollArea>
      </div>
    </main>
  );
}

function App() {
  const [currentComponent, setCurrentComponent] = useState<
    "index" | "appImageCyoa" | "appImageCyoaViewer" | "appInformation"
  >("index");

  if (currentComponent === "index") {
    return <IndexComponent setComponent={setCurrentComponent} />;
  } else if (currentComponent === "appImageCyoa") {
    return <ImageCYOA onBack={() => setCurrentComponent("index")} isCreator />;
  } else if (currentComponent === "appImageCyoaViewer") {
    return (
      <ImageCYOA
        onBack={() => setCurrentComponent("index")}
        isCreator={false}
      />
    );
  } else if (currentComponent === "appInformation") {
    return <Information onBack={() => setCurrentComponent("index")} />;
  }
}

export default App;
