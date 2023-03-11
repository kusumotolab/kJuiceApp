import React, { useRef, useState } from "react";

import styled from "styled-components";

function FileSelect({ onFileInputChange }) {
  const [passwordPaneVisible, setPasswordPaneVisible] = useState(true);
  const inputRef = useRef(null);

  function iconChangeButtonClicked(e: React.MouseEvent<HTMLElement>){
    inputRef.current.click();
  }

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={onFileInputChange}
        hidden
        ref={inputRef}
      />
      <ImageSelectButton onClick={iconChangeButtonClicked}>
        画像を選択する
      </ImageSelectButton>
    </div>
  );
}

const ImageSelectButton = styled.button`
    background-color:white;
    margin: 10px 0;
`


export default FileSelect;
