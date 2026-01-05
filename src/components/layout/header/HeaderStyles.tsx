import styled from 'styled-components';
import '../../../scss/_colors.scss';

export const Header = styled.div`
    display:flex;
    border-bottom: 0 solid #dfdfdf;
    justify-content: space-between;
    align-items: center; 
    width: 100%; 
    /* background: -webkit-linear-gradient(120deg, #1cdcd9 0%, #1c8180 100%); */
    background:#fff;
    margin: 0 auto;
    border-top: 4px solid #1c8180;
    /* padding: 0  40px; */ 
    z-index:100; 
    box-shadow: 0 2px 4px rgba(15,34,58,.12);
`
export const HeaderWrapper = styled.div`
    display:flex;
    flex-direction: column;
    border-bottom: 1px solid #dfdfdf;
    justify-content: space-between;
    width: 100%;  
    max-width: 90%;
    margin: 0 auto;
    padding: 0  40px; 
    z-index:100; 
`

export const HeaderRow = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid #dfdfdf;

     a { 
        color: #7b848d; 
    }
`;

export const Logo = styled.h1` 
    margin:0; 
    padding:0;
    display:flex;
    align-items: center;
    color: #000;
    & img {
        width: 60px;
        height: 60px;
    }
    & span {
        color: #000;
        font-size: 24px;
    }
`
export const HeaderTitle = styled.div`
    align-items: center;
    font-size: 24px;
    font-weight: 400;
    
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
    /* color: #ffc600;
    background: #000; */
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

export const HeaderSubMenu = styled.div`
    display: flex;
    width: 100%;
    & ul {
        
        margin:0;
        padding:0;

        li {
            display: inline-block;
            
            a {
                font-size: 14px;
                font-weight: 400;
                color: #495057;
                color: #7b848d;
                display: block;
                padding: 12px 10px;
            }
        }
    }
`