import styled from 'styled-components';
import '../../../scss/_colors.scss';

export const Header = styled.div`
    display:flex;
    height: 80px;
    width: calc(100% - 0);  
    border-bottom: 0 solid #dfdfdf;
    justify-content: space-between;
    align-items: center; 
    width: 100%; 
    background: -webkit-linear-gradient(120deg, #1cdcd9 0%, #1c8180 100%);
    margin: 0 auto;
    /* padding: 0  40px; */ 
    z-index:100; 
`
export const HeaderWrapper = styled.div`
    display:flex;
    height: 80px;
    width: calc(100% - 0);  
    border-bottom: 0 solid #dfdfdf;
    justify-content: space-between;
    align-items: center;
    width: 1134px;  
    margin: 0 auto;
    padding: 0  40px; 
    z-index:100; 
`
export const Logo = styled.h1` 
    margin:0; 
    padding:0;
    display:flex;
    align-items: center;
    & img {
        width: 60px;
        height: 60px;
    }
`
export const HeaderTitle = styled.div`
    align-items: center;
    font-size: 24px;
    font-weight: 300;
   color: #fff;
`
export const HeaderMenu = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-content: center;
`

export const UserNameSpan = styled.div`
    font-size: 0.9rem;
    font-weight: 500;
`

export const HeaderMenuItem = styled.span`
    font-size: 20px;
    display: inline-block;
    width: 32px;
    height: 32px;
    color: #ffc600;
    background: #000;
    border-radius: 32px;
    padding: 6px 7px;
    position: relative;

    .bubble {
        position: absolute;
        display:grid;
        justify-content: center;
        top: 0;
        right: 0;
        font-size: 8px;
        font-weight: 700;
        color: #fff;
        padding: 2px 4px;
        width: 16px;
        height: 16px;
        border-radius: 16px;
        background: #eb3162;
    }
`
export const BrandLogo = styled.img`
    margin: 10px 0 20px 0;
    width:52px;
    height: 48px;
`