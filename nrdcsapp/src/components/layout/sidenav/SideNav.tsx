import React, { useEffect } from "react";
import { BiUserPin } from "react-icons/bi";
import { LogoImage, LogoImageContainer, SideMenu, SideNavContainer } from "./SideNavStyles";
import { RxDashboard } from "react-icons/rx";
import { PiSignIn } from "react-icons/pi";
import { AiOutlineMail } from "react-icons/ai";
import { LiaClipboardCheckSolid, LiaCogSolid, LiaFaxSolid, LiaPowerOffSolid, LiaUserSolid } from "react-icons/lia";
import { CiVoicemail } from "react-icons/ci";
import { CgNotes } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { CiUser } from "react-icons/ci";
import { CgClipboard } from "react-icons/cg";
import { CgVoicemailO } from "react-icons/cg";
import { CgMail } from "react-icons/cg";
import { CgLogIn } from "react-icons/cg";
import { CgUser } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import Logo from '../../../assets/images/nrdcs-logo.png';

import { TfiLayoutGrid2 } from "react-icons/tfi";
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { SlLayers } from "react-icons/sl";



const SideNav = () => {
    return <SideNavContainer>
        <LogoImageContainer>
            <LogoImage src={Logo} />
        </LogoImageContainer>
        
        <SideMenu>
            <li>
                <Link to="/dashboard">
                    <SlLayers />
                    <span>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link to="/insurance">
                    <LiaClipboardCheckSolid /> 
                    Reports
                </Link>
            </li>
            <li>
                <a href="#"><LiaUserSolid /> Users</a>
            </li>
            <li>
                <a href="#"><LiaCogSolid /> Config</a>
            </li>
            <li>
                <a href="#"><LiaPowerOffSolid /> Logout</a>
            </li>
        </SideMenu>
    </SideNavContainer>;
};

export default SideNav;