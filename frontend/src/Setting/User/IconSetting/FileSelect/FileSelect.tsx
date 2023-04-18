import { Button } from "@chakra-ui/react";
import { useRef } from "react";

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
      <Button onClick={iconChangeButtonClicked}>画像を選択</Button>
    </div>
  );
}

export { FileSelect };
