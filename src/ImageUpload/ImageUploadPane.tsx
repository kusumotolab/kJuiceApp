import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

// ローカルフォルダから画像を選択し，画面に出力できるようにする．
function ImageUploadPane(): JSX.Element{

    const [profileImage,setProfileImage] = useState("");
    const [image,setImage] = useState<FileList>();

    let fileObject: File;

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        fileObject = e.target.files[0];
        setProfileImage(window.URL.createObjectURL(fileObject));

        handleSubmit(fileObject);

    };

    const handleSubmit = async (fileObject:File) => {
        if(fileObject == undefined){return;}

        const file = new FormData();
        file.append('image',fileObject);

        let url: string = `${window.location.protocol}//${window.location.host}${window.location.pathname}backend/member/image/upload`;
        
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
        <ImagePreview src={profileImage} className="h-32 w-32 rounded-full" />o
        <input type="file" multiple accept="image/*" onChange={onFileInputChange} className="pl-4" />
        <button>アップロード</button>
      </div>
    )
}

const ImagePreview = styled.img`
    width:5em;
    height:5em;
`;

export default ImageUploadPane;