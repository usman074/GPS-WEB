import React from "react";
import { Button } from "../index";
import { HeaderWrapper } from "./style";
import { UploadOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { useLocation, useHistory } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const {pathname} = location;
  const history = useHistory()
  const changeScreen = (name)=> {
    console.log(name)
    history.replace(name)
  }
  
  return (
    <HeaderWrapper>
      <Space size={90}>
        <Button name="Dashboard" className={`header-buttons ${pathname === '/dashboard'? 'active': ''}`}  clickEvent={()=> changeScreen('/dashboard')} />
        <Button name="Interval" className={`header-buttons ${pathname === '/interval'? 'active': ''}`} clickEvent={()=> changeScreen('/interval')}/>
        <Button name="Settings" className={`header-buttons ${pathname === '/settings/user' || pathname === '/settings/language' || pathname === '/settings/terms'? 'active': ''}`} clickEvent={()=> changeScreen('/settings/user')}/>
      </Space>
      <span>
        <UploadOutlined style={{color: 'red'}} /> <p>Log Out</p>
      </span>
    </HeaderWrapper>
  );
};
