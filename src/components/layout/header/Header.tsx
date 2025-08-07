import React, { useEffect } from "react";
import { Header, Logo, HeaderMenu, UserNameSpan, HeaderTitle, HeaderMenuItem, HeaderWrapper } from "./HeaderStyles";
import { BiUserPin } from "react-icons/bi";
import { CiBoxList, CiPower } from "react-icons/ci";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { RiUser3Line } from "react-icons/ri";

import { Link } from "react-router-dom";
import nrdcslogo from '../../../assets/images/nrdcs-logo.png';

const AppHeader = () => {
  return (
    <Header>
      <HeaderWrapper>
      <Logo><Link to='/dashboard'><img src={nrdcslogo} /></Link></Logo>
      <HeaderTitle>National Resources Development Co-operative Society Ltd.</HeaderTitle>
      <HeaderMenu>
       {/*  <Link to={`/dashboard`}>
          <HeaderMenuItem>
            <MdOutlinePlaylistAddCheck></MdOutlinePlaylistAddCheck>
            <span className="bubble">45</span>
          </HeaderMenuItem>
        </Link>
        <Link to={`/dashboard`}>
          <HeaderMenuItem>
            <HiOutlineChatBubbleLeftRight></HiOutlineChatBubbleLeftRight>
            <span className="bubble">45</span>
          </HeaderMenuItem>
        </Link> */}

        <Link to={`/dashboard`}>
          <HeaderMenuItem>
            <RiUser3Line></RiUser3Line> 
          </HeaderMenuItem>
        </Link>
        <Link to={`/login`}>
          <HeaderMenuItem>
          <CiPower></CiPower>
          </HeaderMenuItem>
        </Link>
        
        {/* <UserNameSpan>John Doe</UserNameSpan> */}
      </HeaderMenu>
      </HeaderWrapper>
    </Header>
  )
};

export default AppHeader;