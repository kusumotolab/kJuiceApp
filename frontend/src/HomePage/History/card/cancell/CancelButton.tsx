import { Button } from "@chakra-ui/react";
import { History } from "types";
import { Backend } from "util/Backend";

type Props = {
  history: History;
  updateHistory: () => void;
};

function CancelButton({ history, updateHistory }: Props) {
  async function postRecall(history: History) {
    if (!(await Backend.recall(history.historyId)))
      console.error("postRecall: failed");
  }

  return (
    <Button
      colorScheme="red"
      onClick={async () => {
        await postRecall(history);
        updateHistory();
      }}
    >
      キャンセル
    </Button>
  );
}

export { CancelButton };
