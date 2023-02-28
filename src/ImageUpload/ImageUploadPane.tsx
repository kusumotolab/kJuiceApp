import React, { useState } from "react";

// ローカルフォルダから画像を選択し，画面に出力できるようにする．
function ImageUploadPane(): JSX.Element{

    const [profileImage,setProfileImage] = useState('default-profile.png');

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;

        const fileObject = e.target.files[0];

        setProfileImage(window.URL.createObjectURL(fileObject));
    };

    return(
        <div className="flex justify-center items-center mt-8">
        <img src={profileImage} className="h-32 w-32 rounded-full" />
        <input type="file" accept="image/*" onChange={onFileInputChange} className="pl-4" />
      </div>
    )
}

export default ImageUploadPane;