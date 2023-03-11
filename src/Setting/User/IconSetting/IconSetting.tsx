import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";

const fetchMemberList = async (setMemberList) => {
  const inputdata = await fetch(
    `${window.location.protocol}//${window.location.host}${window.location.pathname}backend/member`,
    {
      method: "GET",
      mode: "cors",
    }
  )
    .then((res) => res.json())
    .then((members) => {
      setMemberList(
        members.filter((member) => {
          return member.active;
        })
      );
    });
};

const submitIconImage = async (fileObject: File, userId: string) => {
  if (fileObject == undefined) {
    alert("画像ファイルを選択してください")
    return;
  }
  if (userId == "") {
    alert("ユーザを選択してください");
    return;
  }

  const file = new FormData();
  file.append("image", fileObject);
  file.append("userId", userId);

  let url: string = `${window.location.protocol}//${window.location.host}${window.location.pathname}backend/member/image/upload?userId=${userId}`;

  try {
    await axios.post(url, file).then(function(response) {
      console.log(response);
    });
  } catch (error) {
    alert(
      "ファイルの送信に失敗しました．ファイルサイズ/ファイル形式を確認してください．ファイルサイズは10MB以下である必要があります．"
    );
    console.log("ファイルのアップに失敗しました");
  }
};

function setMemberSelectOptionsFromMemberList(
  setMemberSelectOptions,
  memberList
) {
  let ret = [];
  console.log(memberList);
  console.log(memberList[0]);
  for (let member in memberList) {
    let tmp = {
      value: memberList[member]["name"],
      label: memberList[member]["displayName"],
    };
    console.log(member);
    ret.push(tmp);
  }
  console.log(ret);
  setMemberSelectOptions(ret);
}

function IconSetting() {
  const [profileImage, setProfileImage] = useState("");
  const [image, setImage] = useState<FileList>();
  const [base64Img, setBase64Img] = useState<string>();

  const [userId, setUserId] = useState<string>("");

  const [memberList, setMemberList] = useState([
    {
      name: "",
      displayName: "",
      umpayedAmount: 0,
      attribute: "m1",
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

//   let fileObject: File;
  const [fileObject,setFileObject] = useState<File>();

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    // fileObject = e.target.files[0];
    setFileObject(e.target.files[0]);

    setProfileImage(window.URL.createObjectURL(e.target.files[0]));
  };

  const onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async (fileObject: File) => {
    if (fileObject == undefined) {
        alert("画像が選択されていません");
      return;
    }
    if (userId == "") {
      alert("userIdが指定されていません");
      return;
    }

    const file = new FormData();
    file.append("image", fileObject);
    file.append("userId", userId);

    let url: string = `${window.location.protocol}//${window.location.host}${window.location.pathname}backend/member/image/upload?userId=${userId}`;

    try {
      await axios.post(url, file).then(function(response) {
        console.log(response);
      });
    } catch (error) {
      console.log("ファイルのアップに失敗しました");
    }
  };

  return (
    <IconSettingPane>
      <IconSettingTitle>ユーザアイコンの設定</IconSettingTitle>
      <ImagePreview src={profileImage} />
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={onFileInputChange}
      />
      <Select
        options={memberSelectOptions}
        onChange={(target) => {
          setUserId(target.value);
        }}
      />
      <button
        onClick={() => {
          handleSubmit(fileObject);
        }}
      >
        送信する
      </button>
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

export default IconSetting;
