import { doPost } from "../../../services/api-working"

const endpoint = '/auth/login/';
const useLogin = async (data: any) => {
    try {
        let result = await doPost(endpoint, data)
        console.log('USE LOGIN');
        if(result.success) {
            console.log('success');
            //api_response = Object.assign(result, {success:true}); 
            setAuthUserData.set(result);
            return {success: true};
        }
        if(!result.success) {
            console.log('fail');
            return result;
        }
        return result;
    } catch(error) {
        console.log("LOGIN ERROR =>", error)
    }
}

const setAuthUserData = {
    set: (api_response: any) => {
        sessionStorage.setItem('session_token', api_response.response.session_token)
        sessionStorage.setItem('user_data', JSON.stringify(api_response.response.data))
    },
    get: (item: string) => {
        return sessionStorage.getItem(item)
    },
    remove: (item: string) => {
        return sessionStorage.removeItem(item)
    }
}
export default useLogin;