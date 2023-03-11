import React, { useState } from "react";
import styled from "styled-components";
import IconSetting from "./IconSetting/IconSetting";

function UserSetting() {
  return (
    <UserSettingPane>
      <IconSetting></IconSetting>
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
`


export default UserSetting;
