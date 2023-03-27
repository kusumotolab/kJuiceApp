import { useRef } from "react";
import styled from "styled-components";

type Props = {
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FileSelect({ onFileInputChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function iconChangeButtonClicked() {
    inputRef.current?.click();
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
  background-color: white;
  margin: 10px 0;
`;
export { FileSelect };
