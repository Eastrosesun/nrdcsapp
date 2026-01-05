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

export const Stats = styled.div`
    display: flex;
    padding: 10px;
    width: 100%;
    /* border-bottom: 1px solid #dedede; */
    .patient-img {
        width: 30px;
        height: 30px;
        border-radius: 30px;
        overflow: hidden;
        /* background: #fafafa;
        border: 5px solid #dfdfdf; */
        
        & img {
            width: 100%;
        }
        svg {
            font-size: 30px;
        }
    }
    .patient-info {
        flex:1;
        display: flex;
        flex-direction: column;
        padding: 0 0 0 10px;
        p {
            margin:0;
            padding:0;
            font-size: 18px;
            line-height: 16px;
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


export const Table = styled.div`
    margin: 0 0 20px 0;
    display: flex;
    flex: 1 0 0;
    flex-direction: column;
    border: 0px solid #ddd;
    border-top: 0;
    background: #fff; 
    /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    box-shadow: 0 1px 2px rgba(56, 65, 74, 0.15); */
`;

export const TableHead = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 0.8fr 1.5fr 1fr 1fr 1fr 1fr 1fr;
    font-size: 11px;
    text-transform:uppercase; 
    background: #fff;
    padding: 2px 5px;
    justify-content: space-around;
     border-bottom: 1px solid #eee;
    &::last-child {
        border-bottom:0;
    }

    & div {
        color: #666;
        font-weight: 700;
    }
`;
export const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 0.8fr 1.5fr 1fr 1fr 1fr 1fr 1fr;
    font-size: 13px; 
    font-weight: 500;
    padding: 2px 5px;
    justify-content: space-around;
    align-items: center;
     border-bottom: 1px solid #eee;
    &::last-child {
        border-bottom:0;
    }

`;

export const TableCell = styled.div` 
    padding: 8px;
    width: auto;
    font-weight: 500;
    text-overflow: ellipsis;
    .date {
        padding: 5px 0;
        width: 50px;
        color: #000;
        background: #f8f8f8;
        .day {
            text-align:center;
            display: block;
            font-size: 18px;
            font-weight: 600;
        }
        .month { 
            text-align:center;
            display: block;
            font-size: 11px;
            font-weight: 600;
        }
    }

    .actions {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;

        .btn {
            padding: 8px;
            font-size: 14px;
            width: 30px;
            height: 30px;
            border-radius: 30px;
        }
        .skyblue {
            color:#035181;
            background: #d4fef9;
            border: 0;
            box-shadow: none;
        }
        .lightgreen {
            color:rgb(1, 187, 88);
            background: #d8feea;
            border: 0;
            box-shadow: none;
        }
        .lightred {
            color:#e23838;
            background: #fff0f0;
            border: 0;
            box-shadow: none;
        }
    }
    
    &.chip {
        font-size:9px;
        display: flex;
        justify-content: center;
        align-items: center;
         
        height: 18px;
        padding: 5px 2px;
        font-weight: 600;
       
        text-transform: uppercase;
        border-radius: 16px;
        
        &.error {
            color: #ed3248;
            background: #fdd;
        }
        &.green {
            color:#068053;
            background: #bdf4e0;
        }
            &.pink {
            color:#fe205f;
            background: #f8f0f6;
        }
    }
    & .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        color: rgb(248, 58, 24);
        background:rgb(255, 238, 222);
        border-radius: 32px;
    }
`;

export const Filters = styled.div`

    position: relative;
    top: 1px;
    gap:10px;
    padding: 10px;
    font-size: 12px;
    display: flex;
    display:none;
    grid-template-columns: 1fr 1fr 0.5fr ;
    background: #f9fbfc;
    /* grid-template-columns: 1.2fr 0.8fr 0.8fr 1fr 0.5fr 0.2fr; */
    /* ;
    border: 1px solid #ddd; */
` 