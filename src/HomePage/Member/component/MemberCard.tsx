import React, { useEffect, useRef, useState } from "react";
import Button from "../../../component/Button";
import DefaultIcon from "./../../../image/userimg/defaultimg.png";

import { useSpring, animated } from "react-spring";
import { isAbsolute } from "node:path/win32";
import styled from "styled-components";
import axios from "axios";

const default_member_card_color: string = "#303030";
const selected_member_card_color: string = "#303030";
const font_color: string = "white";


const fetchBase64Img = async (setBase64Img,userId:string) => {
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

const handleSubmit = async (fileObject:File,userId: string) => {
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

function MemberCard({selected,member,setSelectedMember,key}) {

  const [userIcon,setUserIcon] = useState("");
  const [profileImage,setProfileImage] = useState("");

  const inputRef = useRef(null);
  let fileObject: File;


  useEffect(() => {
    fetchBase64Img(setUserIcon,member.name);
  }, []);
  

  function userIconClicked(e: React.MouseEvent<HTMLElement>){
    inputRef.current.click();
  }

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return;
    fileObject = e.target.files[0];
    setProfileImage(window.URL.createObjectURL(fileObject));

    handleSubmit(fileObject,member.name);
  };

  const styles = useSpring({
    opacity: selected ? 1 : 0,
  });

  return (
    <MemberCardPane>
      <SelectedMemberCard as={animated.div} style={styles}></SelectedMemberCard>
      <Button
        color={
          selected
            ? selected_member_card_color
            : default_member_card_color
        }
        height="15%"
        width="100%"
        onClick={() => {
          setSelectedMember(member);
        }}
        radius=".3em"
        border="greenyellow"
        fontColor={font_color}
        children={
          <MemberCardChildren>
            <MemberCardImage 
              src={userIcon==""?DefaultIcon:userIcon} 
              onClick={userIconClicked}/>
            <input type="file" ref={inputRef} hidden multiple accept="image/*" onChange={onFileInputChange}/>
            
            <MemberCardChildrenContent>
              <span>{member.displayName}</span>
            </MemberCardChildrenContent>
          </MemberCardChildren>
        }
        fontSize="3em"
      />
    </MemberCardPane>
  );
}

const SelectedMemberCard = styled.div`
  position: absolute;
  width: 1em;
  background-color: greenyellow;
  top: -0.2em;
  left: -0.2em;
  bottom: -0.2em;
`;

const MemberCardPane = styled.div`
  position: relative;
  background-color: rgb(47, 47, 47);
  border: 0.2em solid greenyellow;
  margin: 1em 0.3em;
  border-top-color: transparent;
  border-right-color: transparent;
`;

const MemberCardChildren = styled.div`
  height: 1.5em;
  text-align: left;
  display: flex;
  align-items: center;
  padding-top: 0em;
`;

const MemberCardChildrenContent = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 60% 40%;
  font-size: 1em;
`;

const MemberCardImage = styled.img`
  overflow: hidden;
  height: 1em;
  width: 1em;
  padding-left: auto;
  margin-right: 0.5em;
  margin-left: 0.5em;
  border-radius: 50%;
`;

export default MemberCard;
