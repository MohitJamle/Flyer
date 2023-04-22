import { useState } from "react";

function usePrevious(props) {
  const [PreVal, setPreVal] = useState(null);
  const [curVal, setcurVal] = useState(props);

  function setNewVal(newVal) {
    // console.log(newVal, newVal);
    setPreVal(curVal);
    setcurVal(newVal);
  }

  return [PreVal, setNewVal];
}

export default usePrevious;
