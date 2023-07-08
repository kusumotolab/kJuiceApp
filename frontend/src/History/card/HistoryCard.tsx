import { Td, Tr } from "@chakra-ui/react";
import { History } from "types";
import { CancelButton } from "./cancell/CancelButton";
import { DateFormatter } from "util/DateFormatter";

type Props = {
  history: History;
  updateHistory: () => void;
};

function HistoryCard({ history, updateHistory }: Props) {
  return (
    <Tr>
      <Td>{DateFormatter.convertDateFormat(history.date)}</Td>
      <Td>{history.itemName}</Td>
      <Td>{history.price}円</Td>
      <Td>
        <CancelButton updateHistory={updateHistory} history={history} />
      </Td>
    </Tr>
  );
}

export { HistoryCard };
