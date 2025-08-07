import styled from 'styled-components';

export const SideNavContainer = styled.div`
    display:flex;
    width: 90px;
    top: 50px;
    padding: 30px 10px 10px 10px;
    position: fixed;
   background: #ffda5a ;
    /*  border-right: 1px solid #dfdfdf; */
    justify-content: center;
    align-content: stretch;
    height: 100%;
    flex-wrap: wrap;
    box-shadow: 4px 7px 6px #f2d366;
`
export const LogoImage = styled.img `
    margin-bottom: 32px;
    width: 70%;
    height: auto;
    align-self: center;
`;
export const Logo = styled.h1`
    font-size: 1.5rem;
    padding:10px;
    margin:0;
    color: #666;
`
export const HeaderMenu = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: center;
`

export const SideMenu = styled.ul`
    font-size: 0.7rem;
    text-transform: uppercase;
    text-align: center;
    font-weight: 500;
    flex:1;
    & li {
        display:flex;
        justify-content: center;
        margin-bottom: 30px;
        color: #000;
    }
    & svg {
       font-size: 18px; 
       color: #000;
    }

    & a { 
        font-size: 10px;
        display: flex;
        flex-direction: column;
        align-items: center; 
        color: #000;
        font-weight: 800;

        & span {
            margin-top:5px;
        }
    }
`