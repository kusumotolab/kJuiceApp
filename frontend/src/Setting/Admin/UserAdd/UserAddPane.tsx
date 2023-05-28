import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Stack,
  FormHelperText,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Backend } from "util/Backend";
import { z } from "zod";

type IUserAddFormInput = {
  userId: string;
  userName: string;
  attribute: string;
}

const schema = z.object({
  userId: z
    .string()
    .min(1, { message: "ユーザIDを入力してください" })
    .regex(/^[a-z0-9_-]+$/, { message: "使用できない文字が含まれています" }),
  userName: z.string().min(1, { message: "ユーザ名を入力してください" }),
  attribute: z.string(),
});
type Schema = z.infer<typeof schema>;

function UserAddPane() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: IUserAddFormInput) {
    addUser(data);
    reset();
  }

  async function addUser(data: IUserAddFormInput) {
    const { userId, userName, attribute } = data;
    if (!(await Backend.addMember(userId, userName, attribute)))
      console.error("addUser: failed");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>アイコン（未実装）</FormLabel>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.userId)}>
          <FormLabel htmlFor="userId">ユーザID</FormLabel>
          <Input id="userId" {...register("userId")} />
          <FormHelperText>
            利用可能な文字: 英字小文字 (a-z), 数字 (0-9), アンダーバー (_),
            ハイフン (-)
          </FormHelperText>
          <FormErrorMessage>
            {errors.userId && String(errors.userId.message)}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.userName)}>
          <FormLabel htmlFor="userName">ユーザ名</FormLabel>
          <Input id="userName" {...register("userName")} />
          <FormErrorMessage>
            {errors.userName && String(errors.userName.message)}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>属性</FormLabel>
          <Select id="attribute" {...register("attribute")}>
            <option value="teacher">先生</option>
            <option value="m2">M2</option>
            <option value="m1">M1</option>
            <option value="b4">B4</option>
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

export { UserAddPane };
