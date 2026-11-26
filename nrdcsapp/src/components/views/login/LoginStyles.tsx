import styled from 'styled-components';
import mainImg from '../../../assets/images/mainImg.png';
import nrdcslogo from '../../../assets/images/nrdcs-logo.png';
/* import ../../../../CSS/_colors.scss; */

/* $primarycolor: #ee2737; */

export const LoginWrapper = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: linear-gradient(to right, #fffbf0 2%, #fff2f1 37%);
    background-image: linear-gradient(45deg,#ffda5a 0,#ffc600 100%);
    background: -webkit-linear-gradient(120deg, #1cdcd9 0%, #1c8180 100%);
    /* background-image: linear-gradient(180deg,#333 0,#000 100%); */
`
export const LoginContainer = styled.div` 
    display:flex;
    width: 50%;
    border-radius: 8px;
    background: #fff;
    box-shadow: 2px 3px 4pxrgb(244, 195, 21);
`
export const LoginForm = styled.div`
    padding: 20px; 
    flex: 1.5;
`
export const LoginImage = styled.div` 
    flex: 1;
    background: #f0ead5;
    border-radius: 8px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0; 
    background-image: url(${nrdcslogo});
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
`

export const LoginTitle = styled.div`
    text-align:center;
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
    color: #000;
`