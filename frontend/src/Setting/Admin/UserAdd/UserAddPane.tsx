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
  useToast,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Backend } from "util/Backend";
import { z } from "zod";

type TUserAddFormInput = {
  userId: string;
  userName: string;
  attribute: string;
};

const schema = z.object({
  userId: z
    .string()
    .min(1, { message: "ユーザIDを入力してください" })
    .regex(/^[a-z0-9_-]+$/, { message: "使用できない文字が含まれています" }),
  userName: z.string().min(1, { message: "ユーザ名を入力してください" }),
  attribute: z.string(),
});
type Schema = z.infer<typeof schema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function UserAddPane({ isOpen, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const toast = useToast();

  async function onSubmit(data: TUserAddFormInput) {
    try {
      await addUser(data);
      reset();
      showToast("ユーザを追加しました", "success");
    } catch (e) {
      showToast("ユーザの追加に失敗しました", "error");
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

  async function addUser(data: TUserAddFormInput) {
    const { userId, userName, attribute } = data;

    if (!(await Backend.addMember(userId, userName, attribute))) {
      throw new Error();
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="outside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>利用者の追加</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>アイコン（未実装）</FormLabel>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.userId)}>
                <FormLabel htmlFor="userId">ユーザID</FormLabel>
                <Input id="userId" {...register("userId")} />
                <FormHelperText>
                  利用可能な文字: 英字小文字 (a-z), 数字 (0-9), アンダーバー
                  (_), ハイフン (-)
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

export { UserAddPane };
