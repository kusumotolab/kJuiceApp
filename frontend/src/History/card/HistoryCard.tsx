import { Box, Flex, HStack, IconButton, Image, Spacer, Text } from "@chakra-ui/react";
import { History } from "types";
import { DateFormatter } from "util/DateFormatter";
import { Backend } from "util/Backend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type Props = {
  history: History;
  updateHistory: () => void;
};

function HistoryCard({history, updateHistory}: Props) {
  async function postRecall(history: History) {
    if (!(await Backend.recall(history.historyId)))
      console.error("postRecall: failed");
  }

  return (
    <Flex
      _first={{ borderTop: "1px", borderColor: "blackAlpha.200" }}
      borderBottom="1px"
      borderColor="blackAlpha.200"
      justify="space-between"
      alignItems="center"
      px={4}
      py={2}
    >
      <Box boxSize={8}>
        <Image />
      </Box>
      <Box ml={4}>
        <HStack spacing={2} align="center">
          <Text fontSize="xl" fontWeight="bold">
            {history.itemName}
          </Text>
        </HStack>
        <Text textColor="gray">
          {DateFormatter.convertDateFormat(history.date) + ", " + history.price + " 円"}
        </Text>
      </Box>
      <Spacer />
      <IconButton
        variant="unstyled"
        aria-label="購入をキャンセル"
        onClick={async () => {
          await postRecall(history);
          updateHistory();
        }}
        icon={<FontAwesomeIcon icon={faTrash} color="red" />}
      />
    </Flex>
  );
}

export { HistoryCard };
