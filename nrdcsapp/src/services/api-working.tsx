import axios from "axios";
import React, { useState } from "react";
//const URL = 'http://localhost:8000/';
const URL = 'http://127.0.0.1:8000/';

const readCookie = (name: any) => {
    return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
}
type UseFetchProps = {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE"
};

type CommonFetch = {
    /** the variables that the endpoint expects to receive */
    input?: { [index: string]: any }
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
const post_options: any = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': '7acef562c7bff9fb00af839d463ad7ec20fada55'
    },
}

const get_options: any = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('session_token')}`
    },
}
/******************
 * POST CALL
 *****************/
const doPost = async (endpoint: string, data: any) => {
    try {
        post_options['body'] = JSON.stringify(data);
        const api = await fetch(`${URL}${endpoint}`, post_options);
        const response = await api.json();
        console.log('api response', response);
        return response;
    } catch (error) {
        console.log('Error =>', error);
    }
}

/* const doGet = async <T>(endpoint: string): Promise<T> => {
  const api = await fetch(`${URL}${endpoint}`, get_options);

  if (!api.ok) {
    throw new Error('Network response was not ok');
  }

  return api.json() as Promise<T>;
}; */

async function doGet<T>(endpoint: string): Promise<T> {
    const api = await fetch(`${URL}${endpoint}`, get_options);
   // const response = api.json();
    return api.json();
}

/******************
 * GET CALL
 *****************/
const doGet11 = async (endpoint: string)=> {
    /* try {
        const api = await fetch(`${URL}${endpoint}`, get_options);
        const response = await api.json();
        return response;
    } catch (error) {
            console.log('Error =>', error);
    } */
    const api = await fetch(`${URL}${endpoint}`, get_options);
        const response = await api.json();
        return response;

}
const doCHIMPost = async (endpoint: string, data: any) => {
    try {
        post_options['body'] = JSON.stringify(data);
        const api = await fetch(`${URL}${endpoint}`, post_options);
        const response = await api.json();
        console.log('api response', response);
        return response;
    } catch (error) {
        console.log('Error =>', error);
    }
}

export {doPost, doGet, doCHIMPost};
