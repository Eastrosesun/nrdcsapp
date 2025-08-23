 
import React, {useEffect, useState} from "react";
import Spinner from "./Spinner";
const withLoader = (WrappedComponent:any) => { 
    function HoC(props: any) {
        
        /******STATE VARIABLES */
        const [loading, setLoading] = useState(false);
        console.log('....loading....');
        console.log(loading);
        return (
            <>
                {loading && <Spinner /> }
                <WrappedComponent setLoading={setLoading} /> 
            </>
        )
    }
    return HoC;
}

export default withLoader;