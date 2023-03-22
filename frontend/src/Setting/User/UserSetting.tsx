import React from "react";
import styled from "styled-components";
import IconSetting from "./IconSetting/IconSetting";

function UserSetting() {
  return (
    <UserSettingPane>
      <IconSetting />
    </UserSettingPane>
  );
}

const UserSettingPane = styled.div`
    background-color: #DDFFDD;
    position:absolute;
    top:6em;
    bottom:0em;
    left:0em;
    right:0em;
    font-size:1em;
`


export default UserSetting;