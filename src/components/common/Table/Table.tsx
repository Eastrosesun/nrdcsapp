import React, { useCallback, useMemo, useState } from "react";
import { Table, TableCell, TableHead, TableRow, PaginationWrapper, PaginationItem } from './TableStyles';
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const TableGrid = (props:any) => {
    const { data, columns } = props;
    console.log(data);
    console.log(columns);
    const pageSize = 10;
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(data.length/pageSize);
    const [filteredData, setFilteredData] = useState<any>(data.slice(pageNum - 1, pageNum * pageSize))

    const setPageNumber = (num: number) => {
        console.log(num);
        console.log('into setPageNumber');  
        //console.log((num - 1) * pageSize);
        //console.log(num * pageSize);
        setFilteredData(data.slice((num-1) * pageSize, num * pageSize));
    }
    return (
        <>
            <Table>
                {buildTable(filteredData, columns, pageNum, pageSize)}
            </Table>
            {/* <Pagination
                key="pagination"
                totalPages = {totalPages}
                data={filteredData}
                pageSize={pageSize}
                pageName={pageNum}
                //setPageSize={(num) => setPageNum(num)}
                handlePageNum={setPageNumber}
            /> */}
        </>
    )
}

const buildTable = (filteredData: [], columns: any[], pageNum: number, pageSize: number) => {
    /* let colKeys = columns.map((column) => {
        return Object.values(column)[0];
    }); */
    return (
        <>
            <TableHead>
                {
                    columns.map((column) => {
                        return isVisible(column.visible) ? <TableCell key={column.id}>{column.name}</TableCell> : <></>
                    })
                }
            </TableHead>
            {
                buildRows(filteredData, columns, pageNum, pageSize)
            }
        </>
    )
}

const buildRows = (data:[], columns:any, pageNum:number, pageSize:number) => {
    console.log('data');
    console.log(data);
    /* for(let i = pageNum; i < pageSize; i++) {
        console.log('iiiii', i);
        return(
            <TableRow key={data[i]}>
            {
                columns.map((column) => {
                    console.log(column);
                    return isVisible(column.visible) ? <TableCell key={column.id}>{data[i][column.id]}</TableCell> : <></>
                })
            }
            </TableRow>
        )
    } */
    {
        return (
            data.map((item:any, index:number) => (
                <>
                    <TableRow key={`${index}`}>
                        {
                            columns.map((column:any) => {
                                console.log(column.type);
                                //return isVisible(column.visible) ? <TableCell key={item[column.id]}>{item[column.id]}</TableCell> : <></>
                                return column.type === 'icon' ?   <TableCell><span  className='icon'><HiOutlineClipboardDocumentList /></span></TableCell > :<TableCell >{item[column.id]}</TableCell>

                            })
                        }
                    </TableRow>
                </>
            )))
    }

}
const isVisible = (input:boolean) => {
    return input;
}

/* const Pagination = ({ totalPages:any, filteredData:[], pageSize:number, pageNum:number, handlePageNum }) => {
    return (
        <>
            <PaginationWrapper>
                {
                    [1,2,3].map((item, index) => {
                        return (
                            <PaginationItem
                                key={index}
                                onClick={() => handlePageNum(index+1)}
                            >{index + 1}</PaginationItem>
                        )
                    })
                }
            </PaginationWrapper>
        </>
    )
} */
export default TableGrid;

