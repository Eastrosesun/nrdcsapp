
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, db, user } from '../../../Firebase';

const auth = getAuth(app);
const useFirebaseLogin = async (username: string, password: string) => {
   try {
        const user = await signInWithEmailAndPassword(auth, username, password);
        //sessionStorage.setItem('userLoggedIn', 'true');
        /* sessionStorage.setItem('userLoggedIn', 'true');
                    sessionStorage.setItem('user_info', JSON.stringify(res.data[0])); */
        console.log('user.user');
        console.log(user.user);
        sessionStorage.setItem('userLoggedIn', 'true');
        return {success: true, user:user};
    } catch (error) {
        console.log('err')
        return {success: false, error:error};
    }

   /*const signInWithEmailAndPassword = () => {} */
}

export default useFirebaseLogin;