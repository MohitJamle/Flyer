import React from "react";
import DragableElement from "../Paper-Components/DragableElement";
import "./Paper.css";

const Paper = ({
  data,
  onDelete,
  paperBackground,
  TextColor,
  backgroundColor,
  openEditor,
  paperRef,
}) => {
  const styles = {
    paper: {
      width: "35vw",
      height: "45.7vw",
      minHeight: "457px",
      minWidth: "350px",
      overflow: " hidden",
      margin: "auto",
      backgroundColor: "#fff",
      boxShadow: "0px 0px 100px 5px rgba(0, 0, 0, 0.168)",
      position: "relative",
      color: "#000",
      backgroundRepeat: " no-repeat",
      backgroundSize: " 100% 100%",
      backgroundColor: `${backgroundColor}`,
      backgroundImage: `url(${paperBackground})`,
      color: TextColor,
    },
  };

  return (
    <div className="paper" style={styles.paper} ref={paperRef}>
      {data?.map((ele, key) => {
        if (ele.type === "text") {
          return (
            <DragableElement
              id={"myTextEditor"}
              type={ele.type}
              key={key}
              paperRef={paperRef}
              onDelete={() => onDelete(ele, key)}
              openEditor={() => openEditor(ele.html, key)}
            >
              <div dangerouslySetInnerHTML={{ __html: ele.html }} />
            </DragableElement>
          );
        } else if (ele.type === "Image") {
          return (
            <DragableElement
              key={key}
              type={ele.type}
              paperRef={paperRef}
              openEditor={() => {}}
              onDelete={() => onDelete(ele, key)}
            >
              {ele.html}
            </DragableElement>
          );
        }
        return <></>;
      })}
    </div>
  );
};

export default Paper;
