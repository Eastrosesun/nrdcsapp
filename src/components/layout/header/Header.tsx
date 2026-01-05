import React, { useEffect } from "react";
import { Header, Logo, HeaderMenu, UserNameSpan, HeaderTitle, HeaderMenuItem, HeaderWrapper, HeaderSubMenu, HeaderRow } from "./HeaderStyles";
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
        <HeaderRow>
          <Logo>
            <Link to='/dashboard'><img src={nrdcslogo} /></Link>
            <span>NRDCS</span>
          </Logo>
          <HeaderMenu>
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
        </HeaderMenu>
        </HeaderRow>
        <HeaderRow>
          <HeaderSubMenu>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/">Reports</Link></li>
              <li><Link to="/">Advanced Search</Link></li>
            </ul>
          </HeaderSubMenu>
        </HeaderRow>
      </HeaderWrapper>
    </Header>
  )
};

export default AppHeader;