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
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useItemsDispatch } from "contexts/ItemsContext";
import { ItemId } from "types";

type TItemAddFormInput = {
  itemId: ItemId;
  itemName: string;
  sellingPrice: number;
  costPrice: number;
  category: string;
};

const schema = z.object({
  itemId: z
    .string()
    .min(1, { message: "アイテムIDを入力してください" })
    .regex(/^[a-z0-9_-]+$/, { message: "使用できない文字が含まれています" }),
  itemName: z.string().min(1, { message: "アイテム名を入力してください" }),
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

function ItemAddPane() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const toast = useToast();
  const dispatch = useItemsDispatch();

  async function onSubmit(data: TItemAddFormInput) {
    try {
      await handleAddItem(data);
      reset();
      showToast("アイテムを追加しました", "success");
    } catch (e) {
      showToast("アイテムの追加に失敗しました", "error");
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

  async function handleAddItem(data: TItemAddFormInput) {
    const { itemId, itemName, sellingPrice, costPrice, category } = data;

    if (
      !(await Backend.addItem(
        itemId,
        itemName,
        sellingPrice,
        costPrice,
        category
      ))
    ) {
      throw new Error("addItem: failed");
    }

    dispatch({
      type: "added",
      id: itemId,
      name: itemName,
      sellingPrice: sellingPrice,
      costPrice: costPrice,
      category: category,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>アイコン（未実装）</FormLabel>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.itemId)}>
          <FormLabel htmlFor="itemId">アイテムID</FormLabel>
          <Input id="itemId" {...register("itemId")} />
          <FormHelperText>
            利用可能な文字: 英字小文字 (a-z), 数字 (0-9), アンダーバー (_),
            ハイフン (-)
          </FormHelperText>
          <FormErrorMessage>
            {errors.itemId && String(errors.itemId.message)}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.itemName)}>
          <FormLabel htmlFor="itemName">アイテム名</FormLabel>
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
      <Box mt={8}>
        <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
          追加
        </Button>
      </Box>
    </form>
  );
}

export { ItemAddPane };
