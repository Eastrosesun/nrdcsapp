import axios from "axios";
import React, { useState } from "react";
const URL = 'http://localhost:8000/';

const readCookie = (name: any) => {
    return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
}
type UseFetchProps = {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE"
};

type CommonFetch = {
    /** the variables that the endpoint expects to receive */
    input? : {[index: string]: any}
    /** this allows you to override any default fetch options on a 
    case by case basis. think of it like an escape hatch. */
    fetchOptions?: RequestInit;
}

/* const useFetch = ({url, method}: UseFetchProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    
    const commonFetch = async({
        input,
        fetchOptions = {}
    }: CommonFetch) => {
        setIsLoading(true);
    }

} */
const options: any = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }, 
    //credentials: 'include',
}



const doPost = async (endpoint: string, data: any) => {
    /* try {
        options['body'] = JSON.stringify(data);
        return await fetch(`${URL}${endpoint}`, 
            options
        ).then((res:any) => {
            console.log('response..');
            console.log(res);
            return res;
        })
    } catch (error) {
        console.log('Error =>', error);
    } */
    try {
        options['body'] = JSON.stringify(data);
        const api = await fetch(`${URL}${endpoint}`, options);
        const response = await api.json();
        return response;
    } catch (error) {
        console.log('Error =>', error);
    }

}

const doGet = async (endpoint: string) => {
    try {
        const api = await fetch(`${URL}${endpoint}`);
        const response = await api.json();
        return response;
    } catch (error) {
        console.log('Error =>', error);
    }

}
export { doPost, doGet };
