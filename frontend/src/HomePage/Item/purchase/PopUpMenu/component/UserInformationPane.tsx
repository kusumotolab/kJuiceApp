import { Member } from "types";

type Props = {
  selectedMember: Member | null;
};

function UserInformationPane({ selectedMember }: Props) {
  return (
    <div>
      {selectedMember == null ? "hoge" : selectedMember.name}さん
    </div>
  );
}

export { UserInformationPane };
