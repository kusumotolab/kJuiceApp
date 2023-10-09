import { Backend } from "util/Backend";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TItemAddFormInput = {
  itemId: string;
  itemName: string;
  sellingPrice: number;
  costPrice: number;
  category: string;
};

const schema = z.object({
  itemId: z
    .string()
    .min(1, { message: "商品IDを入力してください" })
    .regex(/^[a-z0-9_-]+$/, { message: "使用できない文字が含まれています" }),
  itemName: z.string().min(1, { message: "商品名を入力してください" }),
  sellingPrice: z
    .number({ invalid_type_error: "定価を入力してください" })
    .int({ message: "0以上の整数を入力してください" })
    .nonnegative("0以上の整数を入力してください"),
  costPrice: z
    .number({ invalid_type_error: "原価を入力してください" })
    .int()
    .nonnegative("0以上の整数を入力してください"),
  category: z.string(),
});
type Schema = z.infer<typeof schema>;

type ItemAddPaneProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ItemAddPane({ isOpen ,onClose }: ItemAddPaneProps) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const toast = useToast();

  async function onSubmit(data: TItemAddFormInput) {
    try {
      await addItem(data);
      reset();
      showToast("商品を追加しました", "success");
    } catch (e) {
      showToast("商品の追加に失敗しました", "error");
    }
  }

  function showToast(title: string, status: "success" | "error") {
    toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  }

  async function addItem(data: TItemAddFormInput) {
    const { itemId, itemName, sellingPrice, costPrice, category } = data;

    if (
      !(await Backend.addItem(
        itemId,
        itemName,
        sellingPrice,
        costPrice,
        category,
      ))
    ) {
      throw new Error();
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>商品を追加</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>アイコン（未実装）</FormLabel>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.itemId)}>
                <FormLabel htmlFor="itemId">商品ID</FormLabel>
                <Input id="itemId" {...register("itemId")} />
                <FormHelperText>
                  利用可能な文字: 英字小文字 (a-z), 数字 (0-9), アンダーバー
                  (_), ハイフン (-)
                </FormHelperText>
                <FormErrorMessage>
                  {errors.itemId && String(errors.itemId.message)}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.itemName)}>
                <FormLabel htmlFor="itemName">商品名</FormLabel>
                <Input id="itemName" {...register("itemName")} />
                <FormErrorMessage>
                  {errors.itemName && String(errors.itemName.message)}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.sellingPrice)}>
                <FormLabel htmlFor="sellingPrice">定価</FormLabel>
                <InputGroup>
                  <Input
                    id="sellingPrice"
                    type="number"
                    {...register("sellingPrice", { valueAsNumber: true })}
                  />
                  <InputRightAddon>円</InputRightAddon>
                </InputGroup>
                <FormErrorMessage>
                  {errors.sellingPrice && String(errors.sellingPrice.message)}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.costPrice)}>
                <FormLabel htmlFor="costPrice">原価</FormLabel>
                <InputGroup>
                  <Input
                    id="costPrice"
                    type="number"
                    {...register("costPrice", { valueAsNumber: true })}
                  />
                  <InputRightAddon>円</InputRightAddon>
                </InputGroup>
                <FormErrorMessage>
                  {errors.costPrice && String(errors.costPrice.message)}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>カテゴリ</FormLabel>
                <Select id="category" {...register("category")}>
                  <option value="juice">Juice</option>
                  <option value="food">Food</option>
                </Select>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Box mt={8}>
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                追加
              </Button>
            </Box>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export { ItemAddPane };
