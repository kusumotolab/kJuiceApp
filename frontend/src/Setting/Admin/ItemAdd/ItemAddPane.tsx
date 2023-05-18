import { Backend } from "util/Backend";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface IItemAddFormInput {
  itemId: string;
  itemName: string;
  sellingPrice: number;
  costPrice: number;
  grouping: string;
}

function ItemAddPane() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  async function onSubmit(data: IItemAddFormInput) {
    addItem(data);
    reset();
  }

  async function addItem(data: IItemAddFormInput) {
    const { itemId, itemName, sellingPrice, costPrice, grouping } = data;
    if (
      !(await Backend.addItem(
        itemId,
        itemName,
        sellingPrice,
        costPrice,
        grouping
      ))
    )
      console.error("addItem: failed");
  }

  return (
    <Stack spacing={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel htmlFor="itemIcon">アイコン</FormLabel>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.itemId)}>
          <FormLabel htmlFor="itemId">アイテムID</FormLabel>
          <Input
            id="itemId"
            {...register("itemId", {
              required: "必須項目",
              pattern: {
                value: /^[a-z0-9_-]+$/,
                message:
                  "利用可能な文字：アルファベット小文字（a-z）・数字（0-9）・アンダーバー（_）・ハイフン（-）",
              },
            })}
          />
          <FormErrorMessage>
            {errors.itemId && String(errors.itemId.message)}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.itemName)}>
          <FormLabel htmlFor="itemName">商品名</FormLabel>
          <Input
            id="itemName"
            {...register("itemName", {
              required: "必須項目",
            })}
          />
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
              {...register("sellingPrice", {
                required: "必須項目",
              })}
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
              {...register("costPrice", {
                required: "必須項目",
              })}
            />
            <InputRightAddon>円</InputRightAddon>
          </InputGroup>
          <FormErrorMessage>
            {errors.costPrice && String(errors.costPrice.message)}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>カテゴリ</FormLabel>
          <Select id="grouping" {...register("grouping")}>
            <option value="juice">Juice</option>
            <option value="food">Food</option>
          </Select>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          追加
        </Button>
      </form>
    </Stack>
  );
}

export { ItemAddPane };
