import React, { useEffect, useState } from "react";
import './Header.css';
import { RxDotsVertical } from "react-icons/rx";
import { BiDotsVerticalRounded } from "react-icons/bi";

const UIHeader = (props:any) => {
    const {title, style, ctaButton, icons: {leftIcon}, icons: {rightIcon}, icons: {badge} } = props.config;
    return(
        <>
           <div className={style === 'default' ? 'hd-container default' : ctaButton.style==='rounded' ? 'hd-container rounded' : 'hd-container topRounded' }>
                <div className="title">
                    {title}
                    {
                        badge.display && 
                        <span className={ badge.type==='info' ? 'chip info' : badge.type==='warning' ? 'chip warning' : 'chip error'}>{badge.label}</span>
                    }    
                </div>
                <div>
                    {
                        ctaButton.label && <button className={ctaButton.style==='primary' ? 'btn btn-primary' : 'btn btn-outlined' }>{ctaButton.label}</button>
                    }

                    {
                        rightIcon.display && 
                        <span className="context-menu"><BiDotsVerticalRounded /></span>
                    }

                    {/* {
                        rightIcon.display && 
                        <span className="context-menu"><BiDotsVerticalRounded /></span>
                    } */}

                    
                </div>
                 
           </div>
        </>
    )
}

export default UIHeader;