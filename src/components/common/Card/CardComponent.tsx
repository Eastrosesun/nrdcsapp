import React, { useEffect } from "react"; 
import { CardContainer } from "./CardComponentStyles";

const CardComponent = (props: any) => {

   const {data} = props;
   return (
        <CardContainer>
            {/* <p>{data.}</p> */}
        </CardContainer>
   )
}

export default CardComponent;