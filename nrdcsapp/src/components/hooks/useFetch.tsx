import {useState} from "react";

const DEFAULT_FETCH_OPTIONS = {};

type UseFetchProps = {
    url: String;
    method: "GET" | "POST" | "PUT" | "DELETE"
};

type CommonFetch = {
    input?: {[index: string]: any};
    fetchOptions?: RequestInit;
}

export function useFetch<T> ({ url, method }: UseFetchProps) {
    console.log(url);
    console.log(method);
    const [data, setData] = useState<T | null>(null);
    const commonFetch = async({input, fetchOptions = {}}:CommonFetch) => {
        /* const response = await fetch(url, {
            method,
            ...DEFAULT_FETCH_OPTIONS, // this should be defined as a const in a separate file
            ...fetchOptions, // this allows you to override any default fetch options on a case by case basis
            body: JSON.stringify(input),
        }); */
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST', // Set method here
        });
        const data = await response.json();
        setData(data);
    }

    return {commonFetch, data};
}