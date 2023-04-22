import React, { useState } from "react";
import TextEditor from "../Editor/TextEditor/TextEditor";
import "./Home.css";
import Paper from "./Paper";

function Home({
  data,
  onDelete,
  paperBackground,
  TextColor,
  backgroundColor,
  setData,
  paperRef,
}) {
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [curI, setcurI] = useState(null);
  const [Text, setText] = useState("");
  function openEditor(text, i) {
    setText(text);
    setcurI(i);
    setShowTextEditor(true);
  }

  const onSubmit = (obj) => {
    console.log(obj);
    if (obj) {
      const newData = data.map((t, i) => {
        if (curI.toString() === i.toString()) {
          return obj;
        } else {
          return t;
        }
      });
      console.log("newData", newData);
      setData(newData);
    }
  };
  return (
    <>
      <div className="options">
        {showTextEditor && (
          <TextEditor
            onSubmit={onSubmit}
            edit={true}
            Text={Text}
            onCancel={() => setShowTextEditor(false)}
          />
        )}
      </div>
      <div className="Home">
        <Paper
          data={data}
          onDelete={onDelete}
          TextColor={TextColor}
          openEditor={openEditor}
          paperBackground={paperBackground}
          backgroundColor={backgroundColor}
          paperRef={paperRef}
        />
      </div>
    </>
  );
}

export default Home;
