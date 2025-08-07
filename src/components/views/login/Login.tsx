import React, { useState, useEffect } from 'react';
import { LoginContainer, LoginForm, LoginImage, LoginTitle, LoginWrapper } from './LoginStyles';
import TextField from '../../common/Forms/Textfield/Textfield';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Validator from '../../util/Validator';
import withLoader from '../../common/Loader/LoaderComponent';
import { doPost } from '../../../services/api-working';
import nrdcslogo from '../../../assets/images/nrdcs-logo.png';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, db, user } from '../../../Firebase';
import useFirebaseLogin from './UseFirebaseLogin';

const Login = (props: any) => {
    console.log('props => ', props)
    /* interface formInfo {
        username: {value: string, required: boolean};
        password: {value: string, required: boolean};
    } */
    interface formInfo {
        username: { value: string, required: boolean };
        password: { value: string, required: boolean };
    }
    const navigate = useNavigate();
    const requiredFields = ['username', 'password']
    const initialFormValues: any = { username: 'jupiter@voidpoint.com', password: 'welcome' }
    const [payLoad, setPayLoad] = useState(initialFormValues);
    const [btnDisabled, setBtnDisabled] = useState(true);
    //const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(true);
    // useState<any | null>(new Set());
    const { setLoading } = props;


    useEffect(() => {
        if (sessionStorage.getItem('userLoggedIn')) {
            //navigate('/dashboard');
        }
    })
    const handleInputChange = (e: any) => {
        console.log(e);
        const { id, value } = e.target;
        console.log(id);
        console.log(value);
        setPayLoad((prevState: object) => Object.assign(prevState, { [id]: value }));
    }
    useEffect(() => {
    }, [payLoad]);

    const checkFormErrors = () => {
        let errors: any = {};
        console.log(requiredFields);
        requiredFields.forEach((field) => {
            if (!payLoad[field]) {
                errors[field] = payLoad[field];
                //Object.assign(errors, {field})
            }
        });
        //setErrors(errors);
        //console.log(Object.keys(errors).length);
        setErrorMessage('Please enter correct email/password');
        return Object.keys(errors).length ? false : true;
    }
    useEffect(() => {
        //console.log(errors);
    }, []);

    const handleSubmit = () => {
        setLoading(true);
        setIsFormValid(checkFormErrors());
        const auth = getAuth(app);
        const result = useFirebaseLogin(payLoad.username, payLoad.password);
        console.log('result');
        console.log(result);
        result.then((res) => {
            console.log('res');
            console.log(res);
            setLoading(false);
            if(res.success) {
                navigate('/dashboard');
            }
            if(!res.success) {
                setErrorMessage('Incorrect email or password, please try again');
                setIsFormValid(false);
            }
        })
        /* signInWithEmailAndPassword(auth, payLoad.username, payLoad.password)
            .then((user) =>{
                console.log('user');
                console.log(user.user.email);
                console.log(user.user);
                console.log('should redirect');
                sessionStorage.setItem('userLoggedIn', 'true');
                
                navigate('/dashboard');
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage('Incorrect email or password, please try again')
                setIsFormValid(false);
            }); */
        /* if (isFormValid) {
            setLoading(true);
            doPost('login', payLoad).then((res: any) => {
                setLoading(false);
                if(res.success) { 
                    sessionStorage.setItem('userLoggedIn', 'true');
                    sessionStorage.setItem('user_info', JSON.stringify(res.data[0]));
                  //  navigate('/dashboard');
                } else {
                    setIsFormValid(false);
                }
            });
        } */
    }
    useEffect(() => {
        
    }, [isFormValid])

    return (
        <LoginWrapper>
            <LoginContainer>
                <LoginForm>
                    <LoginTitle>
                        NRDCS LOGIN
                        {/* <span>Lorem ipsum candyiam</span> */}
                    </LoginTitle>

                    {
                        !isFormValid &&
                        <p className="error">
                            <label>{errorMessage}</label>

                        </p>
                    }
                    <div className="form-group">
                        <TextField
                            label="Email Address"
                            type="text"
                            id="username"
                            placeholder='Please enter email address'
                            onChange={handleInputChange}
                            validators={
                                [{ check: Validator.required, message: 'This field is required.' }]
                            }
                            value={payLoad.username}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            label="Password"
                            type="password"
                            id="password"
                            placeholder='Please enter password'
                            onChange={handleInputChange}
                            validators={
                                [{ check: Validator.required, message: 'This field is required.' }]
                            }
                            value={payLoad.password}
                        />
                    </div>
                    {/* <div className="form-group">
                        <Link to="/" className="txt-12">Forgot Password?</Link>
                    </div> */}
                    <button
                        className="btn btn-block btn-primary"
                        onClick={handleSubmit}
                    >Login</button>
                </LoginForm>
                <LoginImage></LoginImage>
            </LoginContainer>
        </LoginWrapper>
    )

}
const WithLogin = withLoader(Login);
export default WithLogin;