import styled from "styled-components";

export const Table = styled.div`
    margin: 20px 0;
    display: flex;
    flex: 1 0 0;
    flex-direction: column;
    border: 1px solid #eee;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 3px #0000001a, 0 1px 3px #0000000f;
    box-shadow: 4px 8px 10px #0000001a,0 1px 3px #0000000f;
`;

export const TableHead = styled.div`
    display: flex;
    font-size: 12px;
    text-transform:uppercase;
    color: #666;
    font-weight: 600;
    background: #fafafa;
    padding: 2px 5px;
    justify-content: space-around;
    
`;
export const TableRow = styled.div`
    display: flex;
    font-size: 13px; 
    font-weight: 500;
    padding: 2px 5px;
    justify-content: space-around;
`;

export const TableCell = styled.div`
    display: flex;
    /* flex: 1 0 0; */
    padding: 12px 8px;
    width: auto;
    width: 150px;
    font-weight: 500;
    text-overflow: ellipsis;
    border-bottom: 1px solid #eee;
    &::last-child {
        border-bottom:0;
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
export const PaginationWrapper = styled.div`
    margin: 20px 0;
    display: flex;
    flex: 1 0 0;
    flex-direction: row;
    padding:10px;
    justify-content:center;
    background: #fff;
    box-shadow: 0 1px 3px #0000001a, 0 1px 3px #0000000f;
`;

export const PaginationItem = styled.div`
    margin: 0 20px;
    width: 20px;
    height:20px;
    padding:10px;
    text-align:center;
    font-weight: 700;
    background: #fff;
    border:1px solid #ddd;
    cursor:pointer;
    &active:
    
`;
