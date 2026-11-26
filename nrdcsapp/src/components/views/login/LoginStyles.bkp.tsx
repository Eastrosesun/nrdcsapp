import styled from 'styled-components';
import mainImg from '../../../assets/images/mainImg.png';
import vilogo from '../../../assets/images/Vi-Logo.png';
/* import ../../../../CSS/_colors.scss; */

/* $primarycolor: #ee2737; */

export const LoginWrapper = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #ee2737;
    background-image: linear-gradient(to right, #fffbf0 2%, #fff2f1 37%);
    background-image: linear-gradient(180deg,#eb3745 0,rgba(177,0,14,1) 100%);
`
export const LoginContainer = styled.div` 
    display:flex;
    width: 50%;
    border-radius: 8px;
    background: #fff;
    box-shadow: 2px 3px 4px rgba(177,0,14,1) ;
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
    background-image: url(${vilogo});
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