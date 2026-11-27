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
import useLogin from './UseLogin';

const Login = (props: any) => {
    console.log('props => ', props)
    /* interface formInfo {
        username: {value: string, required: boolean};
        password: {value: string, required: boolean};
    } */
    interface formInfo {
        email: { value: string, required: boolean };
        password: { value: string, required: boolean };
    }
    const navigate = useNavigate();
    const requiredFields = ['email', 'password']
    const initialFormValues: any = { email: 'eastrosesun@gmail.com', password: 'welcome' }
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
        //doLoginCHIM();
    }, [])
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
        setErrorMessage('Email and Password are required');
        return Object.keys(errors).length ? false : true;
    }
    useEffect(() => {
        //console.log(errors);
    }, []);

    /***************
     * LOGIN FORM SUBMIT
     */
    const handleSubmit = async () => {
        setLoading(true);
        setIsFormValid(checkFormErrors());
        const auth = getAuth(app);
        const isFormValida = checkFormErrors();
        //const result = useFirebaseLogin(payLoad.username, payLoad.password);
        if(!isFormValida) {
            setLoading(false);
            return;
        }
        const result = await useLogin(payLoad);
        console.log('about to redirect..');
        console.log(result);
        setLoading(false);
       //return;
        if(result.success) {
            navigate('/dashboard');
        } else {
            setErrorMessage(result.message)
            setIsFormValid(false);
        }
    }
     const doLoginCHIM = () => {
        /* let postData = {
            username: "bmadmin",
            password: 'Abc@123',
            client_id:"9928"
        } */
       let formData = new URLSearchParams();
        formData.append("username", "bmadmin");
        formData.append("password", "Abc@123");
        formData.append("client_id", "9928");

         fetch('https://api.prd.brainymed.com/ag/auth/token', {
            method: 'POST', // Specify the method
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Indicate the data type
            },
            body: formData,
         }).then((res) => {
            console.log(res);
         })
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
                        <p className="error pad-20">
                           {errorMessage}
                        </p>
                    }
                    <div className="form-group">
                        <TextField
                            label="Email Address"
                            type="text"
                            id="email"
                            placeholder='Please enter email address'
                            onChange={handleInputChange}
                            validators={
                                [{ check: Validator.required, message: 'This field is required.' }]
                            }
                            value={payLoad.email}
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