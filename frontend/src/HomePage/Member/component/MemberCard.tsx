import React, { useEffect, useState } from "react";
import Button from "../../../component/Button";
import DefaultIcon from "./../../../image/userimg/defaultimg.png";

import { useSpring, animated } from "react-spring";
import styled from "styled-components";

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

function MemberCard({selected,member,setSelectedMember,key}) {

  const [userIcon,setUserIcon] = useState("");

  useEffect(() => {
    fetchBase64Img(setUserIcon,member.name);
  }, []);


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
              src={userIcon===""?DefaultIcon:userIcon} />
            
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
  object-fit:cover;
  height: 1em;
  width: 1em;
  padding-left: auto;
  margin-right: 0.5em;
  margin-left: 0.5em;
  border-radius: 50%;
`;

export default MemberCard;
