import React, { useEffect } from "react";
import { Header, Logo, HeaderMenu, UserNameSpan, HeaderTitle, HeaderMenuItem, HeaderWrapper, HeaderSubMenu, HeaderRow } from "./HeaderStyles";
import { BiUserPin } from "react-icons/bi";
import { CiBoxList, CiMenuFries, CiPower } from "react-icons/ci";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { HiBars3CenterLeft, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { RiUser3Line } from "react-icons/ri";

import { Link } from "react-router-dom";
import nrdcslogo from '../../../assets/images/nrdcs-logo.png';

const AppHeader = () => {
  return (
    <Header>
      <HeaderWrapper>
        <HeaderRow>
          <HeaderMenu>
            <Link to={`/login`}>
              <h1>NRDCS</h1>
              {/* <HeaderMenuItem>
                <HiBars3CenterLeft></HiBars3CenterLeft>
                <h1>NRDCS</h1>
              </HeaderMenuItem> */}
            </Link>
          </HeaderMenu>
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
        {/* <HeaderRow>
          <HeaderSubMenu>
            <ul>
              <li>NRDCS Dashboard</li>
            </ul>
          </HeaderSubMenu>
        </HeaderRow> */}
      </HeaderWrapper>
    </Header>
  )
};

export default AppHeader;