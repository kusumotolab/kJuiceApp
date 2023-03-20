import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import FileSelect from "./FileSelect/FileSelect";

const fetchMemberList = async (setMemberList) => {
  await fetch(
    `${window.location.protocol}//${window.location.host}${window.location.pathname}backend/member`,
    {
      method: "GET",
      mode: "cors",
    }
  )
    .then((res) => res.json())
    .then((members) => {
      setMemberList(
        members.filter((member) => member.active)
      );
    });
};

function setMemberSelectOptionsFromMemberList(
  setMemberSelectOptions,
  memberList
) {
  const options = memberList.map(({name,displayName}) => ({"value": name, "label": displayName}))
  setMemberSelectOptions(options);
}

function IconSetting() {
  const [profileImage, setProfileImage] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [memberList, setMemberList] = useState([
    {
      name: "",
      displayName: "",
      umpayedAmount: 0,
      attribute: "",
      active: false,
    },
  ]);

  const [memberSelectOptions, setMemberSelectOptions] = useState([]);

  useEffect(() => {
    fetchMemberList(setMemberList);
  }, []);

  useEffect(() => {
    setMemberSelectOptionsFromMemberList(setMemberSelectOptions, memberList);
  }, [memberList]);

  const [fileObject,setFileObject] = useState<File>();

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFileObject(e.target.files[0]);

    setProfileImage(window.URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (fileObject: File) => {
    if (typeof fileObject === "undefined") {
        alert("画像が選択されていません");
      return;
    }
    if (userId === "") {
      alert("userIdが指定されていません");
      return;
    }

    const file = new FormData();
    file.append("image", fileObject);
    file.append("userId", userId);

    let url: string = `${window.location.protocol}//${window.location.host}${window.location.pathname}backend/member/image?userId=${userId}`;

    await axios.put(url, file).then(()=>{
      alert("送信に成功しました");
    }).catch(()=>{
      alert("ファイルの送信に失敗しました．ファイルサイズ/ファイル形式を確認してください．ファイルサイズは10MB以下である必要があります．")
    });

  };

  return (
    <IconSettingPane>
      <IconSettingTitle>ユーザアイコンの設定</IconSettingTitle>
      <ImagePreview src={profileImage} />
      <FileSelect onFileInputChange={onFileInputChange} />
      <Select
        options={memberSelectOptions}
        defaultValue={{label:"ユーザを選択してください", value:""}}
        onChange={(target) => {
          setUserId(target.value);
        }}
      />
      <SubmitButton
        onClick={() => {
          handleSubmit(fileObject);
        }}
      >
        送信する
      </SubmitButton>
    </IconSettingPane>
  );
}

const IconSettingPane = styled.div`
  color: greenyellow;
  font-size: 2em;
  color: #303f43;
  margin: 1em 1em;
  background-color: #edeff1;
  border-radius: 0.5em;
  padding: 0.5em;
`;

const ImagePreview = styled.img`
  width: 5em;
  height: 5em;
  border-radius: 2.5em;
  margin: 0.5em 0em;
  border: 1px solid;
`;

const IconSettingTitle = styled.div`
  position: relative;
  border-bottom: 0.1em solid #303f43;
`;

const SubmitButton = styled.button`
    margin:10px 0;
`

export default IconSetting;
