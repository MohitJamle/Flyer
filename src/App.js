import { useState } from "react";
import "./App.css";
import Sidebar from "./assets/Components/Sidebar/Sidebar";
import Home from "./assets/Components/app/Home/Home";
import TextEditor from "./assets/Components/app/Editor/TextEditor/TextEditor";
import ImageEditor from "./assets/Components/app/Editor/ImageEditor/ImageEditor";
import BackgroundImageEditor from "./assets/Components/app/Editor/BackgroundImageEditor/BackgroundImageEditor";
import ColorPicker from "./assets/Components/app/Editor/ColorPicker";
import * as htmlToImage from "html-to-image";
import { useRef } from "react";

function App() {
  const [data, setData] = useState([]);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [showBackgroundImageEditor, setShowBackgroundImageEditor] =
    useState(false);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [paperBackground, setpaperBackground] = useState("");
  const [TextColor, setTextColor] = useState("#000");
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState(false);
  const paperRef = useRef(null);

  const onSubmit = (object) => {
    console.log(object);
    if (object) {
      setData([...data, object]);
    }
  };

  const onDelete = (t, I) => {
    console.log("deleted", I);
    setData(() => {
      return data.filter((text, i) => {
        return i !== I;
      });
    });
  };

  function closeMenu() {
    setShowTextEditor(false);
    setShowBackgroundImageEditor(false);
    setShowImageEditor(false);
    setShowTextColorPicker(false);
    setShowBackgroundColorPicker(false);
  }

  const downloadImage = async () => {
    if (!paperRef.current) return;
    const dataUrl = await htmlToImage.toPng(paperRef.current);

    // download image
    const link = document.createElement("a");
    link.download = "html-to-img.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="App">
      <div className="sidebar">
        <Sidebar
          downloadImage={downloadImage}
          setShowBackgroundImageEditor={() => {
            closeMenu();
            setShowBackgroundImageEditor(!showBackgroundImageEditor);
          }}
          setShowImageEditor={() => {
            closeMenu();
            setShowImageEditor(!showImageEditor);
          }}
          setShowTextEditor={() => {
            closeMenu();
            setShowTextEditor(!showTextEditor);
          }}
          setShowTextColorPicker={() => {
            closeMenu();
            setShowTextColorPicker(!showTextColorPicker);
          }}
          setShowBackgroundColorPicker={() => {
            closeMenu();
            setShowBackgroundColorPicker(!showBackgroundColorPicker);
          }}
        />
      </div>
      <div className="app">
        <div className="options">
          {showTextEditor && (
            <TextEditor
              onSubmit={onSubmit}
              onCancel={() => setShowTextEditor(false)}
            />
          )}
          {showBackgroundImageEditor && (
            <BackgroundImageEditor
              onCancel={() => setShowBackgroundImageEditor(false)}
              setpaperBackground={setpaperBackground}
            />
          )}
          {showImageEditor && (
            <ImageEditor
              onCancel={() => setShowImageEditor(false)}
              onSubmit={onSubmit}
              paperBackground={paperBackground}
              setpaperBackground={setpaperBackground}
            />
          )}
          {showBackgroundColorPicker && (
            <ColorPicker
              color={backgroundColor}
              setColor={setBackgroundColor}
              onClose={() => setShowBackgroundColorPicker(false)}
            />
          )}
          {showTextColorPicker && (
            <ColorPicker
              color={TextColor}
              setColor={setTextColor}
              onClose={() => setShowTextColorPicker(false)}
            />
          )}
        </div>
        <Home
          setData={setData}
          TextColor={TextColor}
          backgroundColor={backgroundColor}
          paperBackground={paperBackground}
          data={data}
          onDelete={onDelete}
          paperRef={paperRef}
        />
      </div>
    </div>
  );
}

export default App;
