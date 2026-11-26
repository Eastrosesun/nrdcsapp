import React from "react";
const APIServices = () => {

    const api = 'https://jsonplaceholder.typicode.com/';


}
const doPost = async () => {
    const url = 'http://127.0.0.1:8000/checkLogin';
    const payLoad = {
        /* _token: "DGDg4vpEVDlTBQPl331x5P4wieSNNXetXf2znRky", */
        username: 'harshithap',
        password: 'Cup1cake2*'
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        xhrFields: { withCredentials: true },
        /* headers: {
            "access-control-allow-origin": "*",
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Methods': '*',
          }, */
        body: JSON.stringify(payLoad)
    }
    // let res = await fetch(`${api}/${endpoint}`, requestOptions);
    let promise = await fetch(`${url}`, requestOptions);
    let res = await promise.json();
    /*  res.then((res: any) => {
         console.log(res);
         return res;
     }) */

}
const getDashboardData = async () => {
    const url = 'http://127.0.0.1:8000/get_dashboard_data';
    const payLoad = {

        appointmentdate: '2024-09-19',
        searchflag: '',
        dashfilter: '',
        start: 0,
        limit: 7
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'access-control-allow-credentials': true,
            'X-CSRF-TOKEN': "eyJpdiI6IjVCdG9ZR0FrSnk5RUl3bWdubXh0cFE9PSIsInZhbHVlIjoidm56UEZPOG9vTEhjalBMMHgxMStZZ2FvNE5wUld1cEZHYkRMaGowaitUVHRXeFlLcG1DdldtcUI2QkVxRzlJSm5jaS9qQWhKQWo3elZOSkx1dWFoeVNFMHB3clN6c3JNRGpLeVZsRCt0SjlWdEdZSllWOUo1TWlBcW45eVN3ZEwiLCJtYWMiOiIyYTkxZGFmNjE4NzBkN2ZkNGIxNzE5MmFhYmQ5ZDQ0ZjlmOTk5MzJjNGIzN2JkMzNmYmY4N2U3YzVjMDdiMTA2IiwidGFnIjoiIn0%3D",
        },
        //xhrFields: { withCredentials: true },
        credentials: 'include',
        body: JSON.stringify(payLoad)
    }
    // let res = await fetch(`${api}/${endpoint}`, requestOptions);
    let promise = await fetch(`${url}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
            'X-CSRF-TOKEN': "eyJpdiI6IjVCdG9ZR0FrSnk5RUl3bWdubXh0cFE9PSIsInZhbHVlIjoidm56UEZPOG9vTEhjalBMMHgxMStZZ2FvNE5wUld1cEZHYkRMaGowaitUVHRXeFlLcG1DdldtcUI2QkVxRzlJSm5jaS9qQWhKQWo3elZOSkx1dWFoeVNFMHB3clN6c3JNRGpLeVZsRCt0SjlWdEdZSllWOUo1TWlBcW45eVN3ZEwiLCJtYWMiOiIyYTkxZGFmNjE4NzBkN2ZkNGIxNzE5MmFhYmQ5ZDQ0ZjlmOTk5MzJjNGIzN2JkMzNmYmY4N2U3YzVjMDdiMTA2IiwidGFnIjoiIn0%3D",
        },
        body: JSON.stringify(payLoad)
    });
    let res = await promise.json();
    /*  res.then((res: any) => {
         console.log(res);
         return res;
     }) */

}

const cookieCall = async () => {

    const url = 'http://127.0.0.1:8000/sanctum/csrf-cookie';
    let promise = await fetch(`${url}`, {credentials: 'include' });

}
export { doPost, getDashboardData, cookieCall };
//export default APIServices;