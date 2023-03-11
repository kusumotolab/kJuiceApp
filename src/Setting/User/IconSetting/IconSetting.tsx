import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";

const fetchMemberList = async (setMemberList) =>{
    const inputdata = await fetch(`${window.location.protocol}//${window.location.host}${window.location.pathname}backend/member`, {
        method: 'GET',
        mode: 'cors'
    })
    .then(res => res.json())
    .then(members => {
        setMemberList(members.filter((member) => {
            return member.active;
        }));
    });
}

const fetchBase64Img = async (setBase64Img, userId: string) => {
  const inputdata = await fetch(
    `${window.location.protocol}//${window.location.host}${window.location.pathname}backend/member/image?name=${userId}`,
    {
      method: "GET",
      mode: "cors",
    }
  )
    .then((res) => res.text())
    .then((items) => {
      setBase64Img(items);
    });
};

function setMemberSelectOptionsFromMemberList(setMemberSelectOptions, memberList){
    let ret = [];
    console.log(memberList);
    console.log(memberList[0]);
    for(let member in memberList){
        let tmp = {
            value: memberList[member]["name"],
            label: memberList[member]["displayName"]
        }
        console.log(member);
        ret.push(tmp)
    }
    console.log(ret);
    setMemberSelectOptions(ret);
}


function IconSetting() {
  const [profileImage, setProfileImage] = useState("");
  const [image, setImage] = useState<FileList>();
  const [base64Img, setBase64Img] = useState<string>();

  const [userId, setUserId] = useState<string>("");

  const [memberList,setMemberList] = useState([{name:"",displayName:"",umpayedAmount:0,attribute:"m1",active:false}]);

  const [memberSelectOptions, setMemberSelectOptions] = useState([]);

  useEffect(() => {
    fetchMemberList(setMemberList);
  },[])

  useEffect(() => {
    setMemberSelectOptionsFromMemberList(setMemberSelectOptions,memberList);
  },[memberList])

  let fileObject: File;

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    fileObject = e.target.files[0];
    setProfileImage(window.URL.createObjectURL(fileObject));

    handleSubmit(fileObject);
  };

  const onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async (fileObject: File) => {
    if (fileObject == undefined) {
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
        <IconSettingTitle>
            ユーザアイコンの設定
        </IconSettingTitle>
        <ImagePreview src={profileImage} />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onFileInputChange}
        />
        <Select options={memberSelectOptions}/>
        <button
          onClick={() => {
            console.log(userId);
            if (userId == "") {
              return;
            }
            fetchBase64Img(setBase64Img, userId);
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
  color:#303F43;
  margin: 1em 1em;
  background-color: #EDEFF1;
  border-radius: .5em;
  padding: .5em;
`;

const ImagePreview = styled.img`
  width: 5em;
  height: 5em;
  border-radius: 2.5em;
  margin: .5em 0em;
  border: 1px solid;
`;

const IconSettingTitle = styled.div`
  position:relative;
  border-bottom: .1em solid #303F43;
`

export default IconSetting;
