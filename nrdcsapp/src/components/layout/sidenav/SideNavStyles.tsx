import styled from 'styled-components';

export const SideNavContainer = styled.div`
    display:flex;
    flex-direction: column;
    width: 150px;
    height: 100%;
    padding: 20px 10px 10px 10px;
    position: fixed;
    justify-content: center;
    align-content: stretch;
    /* flex-wrap: wrap; */
    z-index: 1000;
    background: #1b2430 ;
`
export const LogoImageContainer = styled.div `
    display: flex;
    margin-bottom: 30px;
    justify-content: center;
`;
export const LogoImage = styled.img `
    width: 60%;
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
    font-size: 1rem;
    /* text-transform: uppercase; */
    text-align: center;
    font-weight: 400;
    flex:1;
    & li {
        display:flex;
        justify-content: center;
        margin-bottom: 30px;
        color: #198754;
        color: #dde5ed;
    }
    & svg {
       font-size: 28px; 
       color: #dde5ed;
    }

    & a { 
        font-size: 15px;
        display: flex;
        flex-direction: column;
        align-items: center; 
        color: #dde5ed;
        font-weight: 400;

        & span {
            margin-top:5px;
        }
    }
`