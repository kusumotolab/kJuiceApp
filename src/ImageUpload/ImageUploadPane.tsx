import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";



const fetchBase64Img = async (setBase64Img,userId: string) => {
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

  

// ローカルフォルダから画像を選択し，画面に出力できるようにする．
function ImageUploadPane(): JSX.Element{

    const [profileImage,setProfileImage] = useState("");
    const [image,setImage] = useState<FileList>();
    const [base64Img,setBase64Img] = useState<string>();

    const [userId,setUserId] = useState<string>("");

    let fileObject: File;

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        fileObject = e.target.files[0];
        setProfileImage(window.URL.createObjectURL(fileObject));

        handleSubmit(fileObject);

    };

    const onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    }

    const handleSubmit = async (fileObject:File) => {
        if(fileObject == undefined){return;}
        if(userId==""){
            alert("userIdが指定されていません");
            return;
        }

        const file = new FormData();
        file.append('image',fileObject);
        file.append('userId',userId);

        let url: string = `${window.location.protocol}//${window.location.host}${window.location.pathname}backend/member/image/upload?userId=${userId}`;
        
        try{
            await axios.post(url,file)
            .then(function(response){
                console.log(response);
            })
        }catch(error){
            console.log("ファイルのアップに失敗しました");
        }
    }


    return(
        <div className="flex justify-center items-center mt-8">
        <ImagePreview src={profileImage} />
        <input type="file" multiple accept="image/*" onChange={onFileInputChange}/>
        <img src={base64Img} />
        <input type="text" onChange={onTextInputChange} />
        <button
        onClick={() => {
            console.log(userId)
            if( userId == ""){return;}
            fetchBase64Img(setBase64Img,userId);
        }}
        >ロードする</button>
      </div>
    )
}

const ImagePreview = styled.img`
    width:5em;
    height:5em;
`;

export default ImageUploadPane;