import React, { useRef, useState } from "react";

import styled from "styled-components";

function FileSelect({ onFileInputChange }) {
  const [passwordPaneVisible, setPasswordPaneVisible] = useState(true);
  const inputRef = useRef(null);


  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={onFileInputChange}
        ref={inputRef}
      />
    </div>
  );
}

export default FileSelect;
