import React, { useEffect, useRef } from "react";
import "./DragableElement.css";

const styles = {
  textContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    cursor: "move",
    "-webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
    border: "1px dashed transparent",
    wordWrap: "break-word",
  },
  content: {
    maxWidth: " 100%",
    maxWeight: "100%",
    width: "auto",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
  },
};

function DragableElement(props) {
  const { paperRef, onDelete } = props;
  const textRef = useRef();
  const isClicked = useRef(false);

  useEffect(() => {
    if (!textRef.current || !paperRef.current) return;
    const text = textRef.current;
    const paper = paperRef.current;

    const onMouseDown = (e) => {
      isClicked.current = true;
    };
    const onMouseUp = (e) => {
      isClicked.current = false;
    };

    const onMouseMove = (e) => {
      if (isClicked.current) {
        const computedStyle = window.getComputedStyle(text);
        let top = parseInt(computedStyle.top);
        let left = parseInt(computedStyle.left);

        //For top Bottom
        if (
          top + e.movementY > 0 &&
          top + e.movementY < paper.offsetHeight - text.offsetHeight + 1
        ) {
          text.style.top = `${top + e.movementY}px`;
        }
        //For Left Right
        if (
          left + e.movementX > 0 &&
          left + e.movementX < paper.offsetWidth - text.offsetWidth + 1
        ) {
          text.style.left = `${left + e.movementX}px`;
        }
      }
    };
    // drag start
    text.addEventListener("mousedown", onMouseDown);
    // drag end
    document.addEventListener("mouseup", onMouseUp);
    // onPaper
    paper.addEventListener("mousemove", onMouseMove);
    paper.addEventListener("mouseleave", onMouseUp);

    return () => {
      // drag start
      text.removeEventListener("mousedown", onMouseDown);
      // drag end
      document.removeEventListener("mouseup", onMouseUp);
      // onPaper
      paper.removeEventListener("mousemove", onMouseMove);
      paper.removeEventListener("mouseleave", onMouseUp);
    };
  }, []);
  const Resizeing = useRef(false);
  const Right = useRef();
  const Bottom = useRef();

  useEffect(() => {
    if (!Right.current || !Bottom.current || !paperRef.current) return;
    const paper = paperRef.current;
    const resizebleEle = textRef.current;
    const styles = window.getComputedStyle(resizebleEle);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;

    // Right Resize
    const onMouseMoveRightResize = (e) => {
      if (!Resizeing.current) return;
      isClicked.current = false;
      const dx = e.clientX - x;
      x = e.clientX;
      width = width + dx;
      resizebleEle.style.width = `${width}px`;
    };

    const onMouseDownRightResize = (e) => {
      Resizeing.current = true;
      x = e.clientX;
      resizebleEle.style.right = null;
      paper.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };
    const onMouseUpRightResize = (e) => {
      // console.log(e)
      Resizeing.current = false;
      paper.removeEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };
    // Bottom Resize

    const onMouseMoveBottomResize = (e) => {
      if (!Resizeing.current) return;
      isClicked.current = false;
      const dy = e.clientY - y;
      y = e.clientY;
      height = height + dy;
      resizebleEle.style.height = `${height}px`;
    };

    const onMouseDownBottomResize = (e) => {
      Resizeing.current = true;
      y = e.clientY;
      resizebleEle.style.Bottom = null;
      paper.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };
    const onMouseUpBottomResize = (e) => {
      // console.log(e)
      Resizeing.current = false;
      paper.removeEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };

    // Adding Listner
    const resizerRight = Right.current;
    const resizerBottom = Bottom.current;
    resizerRight.addEventListener("mousedown", onMouseDownRightResize);
    resizerRight.addEventListener("mouseup", onMouseUpRightResize);
    resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);
    resizerBottom.addEventListener("mouseup", onMouseUpBottomResize);

    return () => {
      resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
      resizerRight.removeEventListener("mouseup", onMouseUpRightResize);
      paper.removeEventListener("mouseleave", onMouseUpRightResize);
    };
  }, []);

  return (
    <div
      className="textContainer"
      style={styles.textContainer}
      height={100}
      width={100}
      ref={textRef}
      onDoubleClick={props.openEditor}
    >
      <div className="delete" onClick={props.onDelete}>
        ❌
      </div>
      <div
        style={styles.content}
        className={`content ${props.type == "text" ? "ql-editor" : ""}`}
        id={props.id}
      >
        {props.children}
      </div>
      <div>
        <div className="resizer resizer_r" ref={Right}></div>
        <div className="resizer resizer_b" ref={Bottom}></div>
      </div>
    </div>
  );
}

export default DragableElement;
