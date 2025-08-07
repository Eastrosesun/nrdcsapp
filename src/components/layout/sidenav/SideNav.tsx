import React, { useEffect } from "react";
import { BiUserPin } from "react-icons/bi";
import { LogoImage, SideMenu, SideNavContainer } from "./SideNavStyles";
import { RxDashboard } from "react-icons/rx";
import { PiSignIn } from "react-icons/pi";
import { AiOutlineMail } from "react-icons/ai";
import { LiaFaxSolid } from "react-icons/lia";
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
import Logo from '../../../assets/images/CHIM-logo.png';

import { TfiLayoutGrid2 } from "react-icons/tfi";
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";


const SideNav = () => {
    return <SideNavContainer>
        {/* <LogoImage src={Logo} /> */}
        <SideMenu>
            <li>
                <Link to="/dashboard">
                    <TfiLayoutGrid2 />
                    <span>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link to="/insurance">
                    <CgLogIn /> Insurance
                </Link>
            </li>
            <li>
                <a href="#"><TfiEmail /> Timesheets</a>
            </li>
            <li>
                <a href="#"><LiaFaxSolid /> Identity</a>
            </li>
            <li>
                <a href="#"><CgUser /> Users</a>
            </li>
            <li>
                <a href="#"><CgClipboard /> Logout</a>
            </li>
            {/* <li>
                <a href="#"><CgUser /> User</a>
            </li>
            <li>
                <a href="#"><RxDashboard /> Reports</a>
            </li>
            <li>
                <a href="#"><RxDashboard /> Billing</a>
            </li>
            <li>
                <a href="#"><RxDashboard /> ACO</a>
            </li> */}
        </SideMenu>
    </SideNavContainer>;
};

export default SideNav;