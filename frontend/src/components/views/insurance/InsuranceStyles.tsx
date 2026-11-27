import styled from 'styled-components';

export const Header = styled.div`
    display:flex;
    width: 100%;
    padding: 10px;
    background: #ffffff;
    border-bottom: 1px solid #dedede;
    justify-content: space-between;
`

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

export const UserNameSpan = styled.div`
    font-size: 0.9rem;
    font-weight: 500;
`

export const Card = styled.div`
    display: flex;
    padding: 10px;
    width: 100%;
    border-bottom: 1px solid #dedede;
    .patient-img {
        width: 70px;
        height: 70px;
        border-radius: 70px;
        overflow: hidden;
        /* background: #fafafa;
        border: 5px solid #dfdfdf; */
        
        & img {
            width: 100%;
        }
        svg {
            font-size: 64px;
        }
    }
    .patient-info {
        flex:1;
        display: flex;
        flex-direction: column;
        padding: 10px 0 0 10px;
        p {
            margin:0;
            padding:0;
            font-size: 36px;
            line-height: 30px;
            font-weight: 800;
        }
        & span {
            margin-top: 5px;
            font-size: 12px;
            text-transform:uppercase;
        }
        & span:nth-child(2) {
           
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .hd {
        display: flex;
        width: 100%;
        font-size: 15px;
        font-weight: 600;
    }
`

export const Chip = styled.span`
    display: inline-block;
    border-radius: 20px;
    &.light-blue {
        font-size: 10px;
        font-weight: 800;
        width: 60px;
        padding:5px;
        color: #0667be;
        text-align:center;
        background: #ecf5fc;
    }
    &.light-green {
        font-size: 10px;
        font-weight: 800;
        width: 160px;
        padding:5px 10px;
        color: #91bf03;
        text-overflow: ellipsis;
        overflow:hidden;
        white-space:nowrap;
        text-align:center;
        background: #fafcec;
    }
`

export const AppointmentInfo = styled.div`
    display: grid;
    padding: 10px;
    grid-template-columns: 25% 25% 25% 25%;
    border-bottom: 1px solid #dedede;
`

export const AppointInfoIcon = styled.div` 
    display: grid; 
    align-items: center;
    justify-content: center;
    color: #aaa;
    font-size:11px;
    font-weight: 700;
    text-transform:uppercase;
    
    .icon {
        width: 28px;
        height: 28px;
        border-radius: 28px;
        display: inline-block;
        text-align:center;
    }
    .light-indigo {
        margin-bottom: 5px;
        color: #20aebb;
        display: grid;
        align-items: center;
        justify-content: center;
        background: #dbfcff;
    }
    .light-burgandy {
        margin-bottom: 5px;
        color: #b63874;
        display: grid;
        align-items: center;
        justify-content: center;
        background: #feebf4;
    }
    .light-wheat {
        margin-bottom: 5px;
        color: #df8612;
        display: grid;
        align-items: center;
        justify-content: center;
        background: #fff6e5;
    }
    .light-green {
        margin-bottom: 5px;
        color: #329a47;
        display: grid;
        align-items: center;
        justify-content: center;
        background: #e5ffea;
    }
`

export const PatientCTA = styled.div`
    display: grid;
    padding: 10px;
    grid-template-columns: 25% 25% 25% 25%;
    border-bottom: 1px solid #dedede;

    .icon {
        font-size:16px;
    }
    button {
        display: grid;
        border:0;
        gap: 12px;
        grid-template-rows: 25% 25%;
        font-weight: 600;
        text-align:center;
        color: #aaa;
        font-size:11px;
        justify-items: center;
        align-items: center;
        background: transparent;

        svg {
            font-size: 20px;
        }
    }
`