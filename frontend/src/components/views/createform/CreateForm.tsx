import React, { useEffect, useState } from "react";
/* import { Header, Logo, HeaderMenu, UserNameSpan, Card, Chip, AppointmentInfo, AppointInfoIcon, PatientCTA } from "./DashboardStyles"; */
import { BiUserPin } from "react-icons/bi";
import CardComponent from "../../common/Card/CardComponent";
import TextField from "../../common/Forms/Textfield/Textfield";
import { doGet, doPost } from "../../../services/api-working";
import moment from 'moment';
import { getFirestore, collection, setDoc, getDocs, where, addDoc, Timestamp, query, orderBy, onSnapshot, doc, serverTimestamp, getDoc, updateDoc } from 'firebase/firestore';
import { db, user } from '../../../Firebase';


import { TfiReload } from "react-icons/tfi";
import { BiHistory } from "react-icons/bi";
import { BiFilter } from "react-icons/bi";
import { LuStethoscope } from "react-icons/lu";
import { MdNotes } from "react-icons/md";

import withLoader from "../../common/Loader/LoaderComponent";
import { CiCreditCard2, CiDesktop, CiMedicalCase, CiUser, CiViewTimeline, CiWifiOn } from "react-icons/ci";
import { CgFileDocument } from "react-icons/cg";
import { Link } from "react-router-dom";
import Select from "../../common/Forms/SelectBox/SelectBox";
import Selectbox from "../../common/Forms/SelectBox/SelectBox";
import { FaMinus, FaPlus } from "react-icons/fa";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { useLocation } from 'react-router-dom';
import Validator from "../../util/Validator";
import { FaChevronLeft } from "react-icons/fa";
import { GoChevronLeft } from "react-icons/go";
import ToasterComponent from "../../common/Toaster/Toaster";
import { Table, TableCell, TableHead, TableRow } from "../dashboard/DashboardStyles";




/**********************************
 *  LOVs AND DEFAULTS
**********************************/
const samplesLOV = [
  { value: '', label: 'Nature of sample' },
  { value: '1', label: 'Limestone' },
  { value: '2', label: 'Iron Ore' },
  { value: '3', label: 'Bauxite' },
  { value: '4', label: 'Water' }
]
const analysisLOV = [
  { value: '', label: 'Type of Analysis' },
  { value: '1', label: 'Lio' },
  { value: '2', label: 'Sio' },
  { value: '3', label: 'Cao' },
  { value: '4', label: 'Mgo' },
  { value: '5', label: 'Fe2O' },
  { value: '6', label: 'Potability/Construction' }
]
const orderStatuses = [
  { value: '', label: 'Order Status' },
  { value: '1', label: 'Created' },
  { value: '2', label: 'In Progress' },
  { value: '3', label: 'Reports Ready' },
  { value: '4', label: 'Delivered' }
]

const paymentModes = [
  { value: '', label: 'Payment Mode' },
  { value: '1', label: 'UPI' },
  { value: '2', label: 'Cheque' },
  { value: '3', label: 'Cash' }
]
const paymentStatus = [
  { value: '', label: 'Payment Status' },
  { value: '1', label: 'NO PAYMENT' },
  { value: '2', label: 'Partial Payment' },
  { value: '3', label: 'Full Payment' }
]

//const payLoadObj: any = { order_start_date: '', order_status: '', customer: {first_name: 'Dinesh', last_name: 'G', email_address:'dinesh.garimella78@gmail.com', phone_number: '9885122317', address1:"Nagole, Hyderabad", address2: "", city: "Hyderabad", state: "Telangana"}, nature_of_sample: '', type_of_analysis: '', chargeable_value: '1500', gst: '230', total_amount: '1730', payment_mode: '', payment_status: '', payment_status_display: '' };

const payLoadObj: any = {
  "order_number": "NRDCS202607301135",
  "order_created_date": "2026-02-01",
  "order_status": 1,
  "customer_id": 34,
  "type_of_analysis": [
    "Bauxite"
  ],
  "nature_of_sample": [
    "Cao"
  ],
  "order_completion_date": null,
  "chargeable_value": 2000,
  "gst": 100,
  "total_amount": 2100,
  "payment_mode": [
    "UPI",
    "Cash"
  ],
  "payment_status": 1,
  "payment_status_display": "NO PAYMENT",
  "order_status_display": "CREATED",
  "date_created": "2026-07-30",
  "date_modified": "2026-07-30",
  "created_by": 1,
  "modified_by": 1,
  "customer_first_name": "Yashwanth",
  "customer_last_name": "P",
  "customer_phone_number": "90000000000",
  "customer_email_address": "yashwanth.p@gmail.com",
  "customer_address1": "Kondapur",
  "customer_address2": "",
  "customer_city": "Hyderabad",
  "customer_state": "Telangana",
  "customer_zip": "500068",
  "customer_date_created": "2026-07-30",
  "customer_date_modified": "2026-07-30"
};

const requiredFields = ['order_status', 'first_name', 'phone_number', 'email_address', 'address1', 'nature_of_sample', 'type_of_analysis', 'payment_status', 'payment_mode'];

const priceMatrix = [
  { value: '1', label: 'Limestone', basePrice: 100 },
  { value: '2', label: 'Iron Ore', basePrice: 200 },
  { value: '3', label: 'Bauxite', basePrice: 300 },
  { value: '4', label: 'Water', basePrice: 400 },
  { value: '5', label: 'lio', basePrice: 10 },
  { value: '6', label: 'sio', basePrice: 20 },
  { value: '7', label: 'cao', basePrice: 30 },
  { value: '8', label: 'mgo', basePrice: 40 },
  { value: '9', label: 'fe2o', basePrice: 50 },
  { value: '10', label: 'mgo', basePrice: 60 },
  { value: '11', label: 'potability', basePrice: 70 }
]

//let formErrors:any = {};
/**********************************
  * MAIN COMPONENT
**********************************/
const CreateForm = (props: any) => {
  const location = useLocation();
  const { action, orderDetails } = location.state || { action: '', orderDetails: payLoadObj }
  console.log('location.state', location.state);
  console.log('action', action);
  console.log('orderDetails', orderDetails);

  /*********************
   * STATE VARIABLES
   *******************/
  const user_info = sessionStorage.getItem('user_info') ? JSON.parse(sessionStorage.getItem('user_info') || '') : '';
  const [userData, setUserData] = useState([]);
  const [samplesInfo, setSamplesInfo] = useState([{ nature: '', analysis: '' }]);
  //PROPS FROM withLoader COMPONENT
  const { setLoading } = props;
  //const { patientsData: {mutation: patientData, data}, } = useDashboardApi();
  const [payLoad, setPayLoad] = useState(orderDetails);
  const [formErrors, setFormErrors] = useState<any>({});
  const [showPreview, setshowPreview] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [orderNumber, setOrderNumber] = useState<any>('');
  const [count, setCount] = useState(0);
  const [pageLabel, setPageLabel] = useState({ pageTitle: action === 'edit' ? 'Edit Order' : 'Create Order', buttonLabel: action === 'edit' ? 'Save Order' : 'Create Order' })

  const [toastList, setToastList] = useState<any>([]);

  /* const [isFormValid, setIsFormValid] = useState(false) */

  /**********************************
   *  HANDLE COMPONENT ON MOUNT
  **********************************/
  useEffect(() => {
    todaysDate();
    if (action) {
      setPayLoad(orderDetails);
    }
    console.log('action => ', action);
    console.log('payLoad => ', payLoad);
  }, []);

  const todaysDate = () => {
    return moment().format('DD/MM/yyyy');
  }

  /***************************
   * HANDLE TEXTFIELD CHANGE
   ***************************/
  const handleTextFieldChange = (e: any, id: any) => {
    console.log('handleTextFieldChange');
    console.log(e);
    /* console.log(Timestamp.fromDate(e).seconds); */
    /* console.log(e.toString());  */
    /* console.log(Timestamp.fromDate(e)); */
    if (e && e.target && e.target.id) {
      const { id, value } = e.target;
      console.log(id);
      console.log(value);
      setPayLoad({ ...payLoad, [id]: value });
      console.log(Object.keys(formErrors))
      Object.keys(formErrors).filter((key) => {
        if (key === id) delete formErrors[key];
        if (formErrors === id) delete formErrors[key];
      });

    } else { //DATE FIELD 
      //setPayLoad({ ...payLoad, 'order_start_date': Timestamp.fromDate(e).seconds});
      setPayLoad({ ...payLoad, 'order_start_date': e });
      if (formErrors === 'order_start_date') delete formErrors['order_start_date'];
    }
    /* console.log('formErrors');
    console.log(formErrors); */
    setFormErrors(formErrors);
  }

  /***************************
   * HANDLE SELECT CHANGE
   ***************************/
  const handleChangeSelect = (id: any, value: any) => {
    console.log('id, value')
    console.log(id)
    console.log(value)
    console.log("*** payLoad ***")
    console.log(payLoad)
    setPayLoad({ ...payLoad, [id]: value });
    //checkValidation();
  }

  useEffect(() => {
    //console.log('payLoad', payLoad);
  }, [payLoad]);

  /***************************
  * CALCULATE PRICE
  ***************************/
  /* const calculateOrderPrice = () => {
   let natureOfSample = ;
   let typeOfAnalysis = ;
 } */

  const handleAddRow = () => {
    setSamplesInfo((prevState) => ([...prevState, { nature: '', analysis: '' }]))
  }
  /**********************************
   *  CHECK FORM VALIDATION
  **********************************/
  const checkValidation = async () => {
    let errors: any = {};
    requiredFields.forEach((field: any) => {
      console.log('*** payLoad ***');
      console.log(payLoad.customer);
      console.log(field, payLoad[field as keyof {}]);
      if (!payLoad[field as keyof {}]) {
        console.log('field', field)
        errors[field as keyof {}] = ''; //payLoad[field as keyof {}];
      }
      if (!payLoad.customer[field as keyof {}]) {
        console.log('customer', field)
        errors[field as keyof {}] = ''; //payLoad[field as keyof {}];
      }
    });
    console.log("checkValidation form errors");
    console.log(errors);
    setFormErrors(errors);
    //let isFormValid = await
    console.log('check validation');
    //Object.keys(formErrors).length > 0 ? setIsFormValid(false): setIsFormValid(true);
    //return Object.keys(errors).length > 0 ? false : true;
    /* formErrors = errors;
    console.log('formErrors');
    console.log(formErrors); */
    return errors;

  }
  useEffect(() => {
    console.log("formErrors");
    console.log(formErrors);
  }, [formErrors]);

  /**********************************
   *  GENERATE ORDER NUMBER
  **********************************/
  const generateOrderNumber = () => {
    let order_date = new Date();
    let year = order_date.getFullYear();
    let month = order_date.getMonth();
    let date = order_date.getDate();
    let hours = order_date.getHours();
    let minutes = order_date.getMinutes();
    let seconds = order_date.getSeconds();
    let order_num = `${year}${getDoubleDigits(month)}${getDoubleDigits(date)}${getDoubleDigits(hours)}${getDoubleDigits(date)}${getDoubleDigits(minutes)}${getDoubleDigits(seconds)}`;
    console.log(order_num);
    //setOrderNumber(order_num);
    return order_num;
  }

  const getDoubleDigits = (val: any) => {
    if (val < 10) {
      return `0${val}`;
    } else {
      return val;
    }
  }

  /***************************
   * SET TOASTERS
   ***************************/
  const setToaster = () => {
    console.log('setToaster');
    let toast = {
      id: Date.now(),
      title: 'Title',
      message: 'This is toaster'
    }
    setToastList((prevState: any) => {
      return [...prevState, toast]
    })
  }
  const closeToaster = (id: any) => {
    console.log('closeToaster', id)
    setToastList((prevState: any) => {
      return prevState.filter((toast: any) => toast.id !== id)
    })
  }
  /**********************************
   *  HANDLE ORDERFORM SUBMIT
  **********************************/
  const handleSubmitForm = async () => {
    console.log('handleSubmitForm');
    setLoading(true);
    //generateOrderNumber()
    //setApiResponse('success');
    //let errors = await checkValidation();
    //setFormErrors(errors);
    // console.log('onSubmit', isFormValid)
    /* if (isFormValid) {
      addOrder()
    } */
    console.log('updated Payload');
    console.log(payLoad);
    console.log(action)
    //console.log(errors);
    /*  console.log(action); */
    /* if(action === 'edit') {
       updateOrder()
    } else {
     let isFormValid = await checkValidation();
     console.log('isFormValid');
     console.log(isFormValid);
     console.log(payLoad);
    } */
    doPost('orders-api/orders/', payLoad).then(
      (res) => {
        let toast: any = {
          id: Date.now(),
        }
        console.log(res);
        toast['type'] = res.success ? 'success' : 'error'
        toast['message'] = res.message;

        //setToastList((prevState: any) => [...prevState, toast])
        setApiResponse(res)

        setLoading(false);
      },
      (err) => {
        console.log(err);
        setLoading(false);
      },
    )
  }
  /**********************************
   *  ADD ORDER TO FIREBASE
  **********************************/
  /****** FIREBASE: DOCUMENT ADD  */
  const addOrder = async () => {
    console.log('addOrder');
    setLoading(true);

    const dbRef = collection(db, 'nrdcs');
    try {
      /* console.log(payLoad);
      console.log(payLoad.order_date); */
      const docRef = await addDoc(collection(db, 'nrdcs'), {
        order_number: generateOrderNumber(),
        order_start_date: payLoad.order_start_date,
        order_status: payLoad.order_status,
        customer_name: payLoad.customer_name,
        customer_phone: payLoad.customer_phone,
        customer_email: payLoad.customer_email,
        customer_location: payLoad.customer_location,
        nature_of_sample: payLoad.nature_of_sample,
        type_of_analysis: payLoad.type_of_analysis,
        payment_status: payLoad.payment_status,
        payment_mode: payLoad.payment_mode,
        chargeable_value: payLoad.chargeable_value,
        gst: payLoad.gst,
        total_amount: payLoad.total_amount,
        order_completed_date: '',
        created_by: 1,
        created_date: serverTimestamp(),
        modified_date: serverTimestamp()
        //order_start_date: serverTimestamp(),//Timestamp.fromDate(new Date()),
      });
      /* console.log('docRef');
      console.log(docRef); */
      const docSnap = await getDoc(docRef);
      console.log(docSnap.exists());
      /* docRef.then((doc) => {
        console.log(doc)
      }) */
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  /**********************************
   *  UPDATE EXISTING ORDER IN FIREBASE
  **********************************/
  /****** FIREBASE: DOCUMENT UPDATE  */
  const updateOrder = async () => {
    return
    /* console.log('INTO UPDATE');
    console.log(payLoad); */
    //setLoading(true);

    /*  console.log(payLoad.id);
     console.log('Firebase Timestamp');
     console.log(payLoad.order_start_date);
     console.log('Timestamp conversion');
     const timeStamp = payLoad.order_start_date.seconds;
     const fetchedDate = new Date(timeStamp);
     console.log(fetchedDate) */
    // console.log(new Date(payLoad.order_start_date))
    // console.log(Timestamp.fromDate(payLoad.order_start_date));
    //  console.log(Timestamp.fromMillis(1749570650).toDate());

    /* console.log(Timestamp.fromDate(payLoad.order_start_date)); */


    //const dbRef = collection(db, 'nrdcs');
    try {
      //console.log(payLoad);
      const docRef = doc(db, 'nrdcs', payLoad.id);
      await updateDoc(docRef, {
        order_number: payLoad.order_number,
        order_start_date: payLoad.order_start_date, //payLoad.order_start_date,
        order_status: payLoad.order_status,
        customer_name: payLoad.customer_name,
        customer_phone: payLoad.customer_phone,
        customer_email: payLoad.customer_email,
        customer_location: payLoad.customer_location,
        nature_of_sample: payLoad.nature_of_sample,
        type_of_analysis: payLoad.type_of_analysis,
        payment_status: payLoad.payment_status,
        payment_mode: payLoad.payment_mode,
        chargeable_value: payLoad.chargeable_value,
        gst: payLoad.gst,
        total_amount: payLoad.total_amount,
        order_completed_date: payLoad.order_completed_date,
        created_by: 1,
        created_date: payLoad.created_date,
        modified_date: serverTimestamp()
        //order_start_date: serverTimestamp(),//Timestamp.fromDate(new Date()),
      });
      console.log('docRef');
      console.log(docRef);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.exists());
      /* docRef.then((doc) => {
        console.log(doc)
      }) */
      setLoading(false);
    } catch (error) {
      // setLoading(false);
      console.log(error);
    }
  }

  return (

    <div className="main-content">

      <div className="page-wrap">
        <div className="toaster-container">
          {
            toastList.map((toast: any) => {
              return <ToasterComponent data={toast} onClose={closeToaster} />
            })
          }
        </div>


        {/* {
          apiResponse === 'success' ?
            <>Success - New Order has been created</> :
          apiResponse === 'error' ?
            <>Error - There is a problem with your request</> :
            <></>
        } */}



        <div className="container flex-column pad-20" style={{ borderRadius: '8px', background: "#fff", padding: "16px", border: "1px solid #dedede", boxShadow: "0 1px 2px rgba(56, 65, 74, 0.15)" }}>
          <div className="container__col-6 flex-column m-r-10">
            <p className="page-title"><Link to="/dashboard"><GoChevronLeft /></Link> {pageLabel.pageTitle}</p>
            {/* <span className="txt-13 normal">Lorem ipsum iset dule.</span> */}
          </div>
          {
            apiResponse && apiResponse.success &&
            <>
              <div className="container flex-column pad-20">
                <div style={{ 'fontSize': '60px', display: 'block', color: '#16cd16', textAlign: 'center' }}><IoIosCheckmarkCircleOutline /></div>

                <div style={{ 'fontSize': '20px', display: 'block', textAlign: 'center' }}>
                  {
                    action === '' ?
                      <div>
                        New Order <strong>&nbsp;{apiResponse.data.order_number}&nbsp;</strong> has been created.

                        <div style={{"width": "80%", margin:"20px auto", "minWidth": "960px"}}>
                          <Table>
                            <TableHead>
                              <TableCell>SR. NO</TableCell>
                              <TableCell>ORDER DATE</TableCell>
                              <TableCell>CUSTOMER</TableCell>
                              <TableCell>EMAIL ADDRESS</TableCell>
                              <TableCell>ORDER AMOUNT</TableCell>
                              <TableCell>ORDER SAMPLES</TableCell>
                              <TableCell>PAYMENT STATUS</TableCell>
                              <TableCell>ORDER STATUS</TableCell>
                            </TableHead>
                            <TableHead>
                              {/*  <Link to='/createform' state={{ action: 'edit', orderDetails: order }} className="btn lightgreen"> */}
                              <TableRow>{apiResponse.data.id} </TableRow>
                              <TableRow>{apiResponse.data.order_created_date} </TableRow>
                              <TableRow>{apiResponse.data.customer.first_name} {apiResponse.data.customer.last_name}</TableRow> 
                              <TableRow>{apiResponse.data.customer_email_address}</TableRow> 
                              <TableRow>{apiResponse.data.total_amount}</TableRow> 
                             {/*  <TableRow>
                                <TableCell>
                                  {
                                    apiResponse.data.nature_of_sample.length &&
                                    apiResponse.data.nature_of_sample.map((sample: any, index: Number) => {
                                      return `${sample} ${apiResponse.data.nature_of_sample.length - 1 === index ? '' : ','} `;
                                    })
                                  }
                                </TableCell>
                              </TableRow>   */}
                              <TableRow>
                                  <p className="thick txt-16">{apiResponse.data.customer_first_name} {apiResponse.data.customer_last_name}</p>
                              </TableRow>
                              <TableRow>
                                  <p className="txt-12 mid-grey normal">{apiResponse.data.customer_phone_number}</p>
                                </TableRow>
                                <TableRow>
                                  <p className="txt-12 mid-grey normal">{apiResponse.data.customer_email_address}</p>
                                </TableRow>
                                <TableRow>&#8377;{apiResponse.data.total_amount}</TableRow>
                                <TableRow>
                                  {
                                    apiResponse.data.nature_of_sample.length &&
                                    apiResponse.data.nature_of_sample.map((sample: any, index: Number) => {
                                      return `${sample} ${apiResponse.data.nature_of_sample.length - 1 === index ? '' : ','} `;
                                    })
                                  }
                                </TableRow>
                                <TableRow className="chip green">{apiResponse.data.payment_status_display}</TableRow>
                                <TableRow className="chip error">{apiResponse.data.order_status_display}</TableRow>
 
                              {/* </Link> */}
                            </TableHead>
                          </Table>
                        </div>
                      </div> :
                      <div>
                        Order <strong>&nbsp;{apiResponse.data.order_number}&nbsp;</strong> has been updated.
                      </div>

                  }
                  <Link to="/dashboard">Go to Dashboard</Link>
                </div>
              </div>
            </>

          }
          {
            apiResponse && !apiResponse.success &&
            <div className="container flex-row pad-20" style={{ 'alignItems': 'center', background: '#fff3f5', color: '#de1333', 'margin': '0 0 20px 0' }}>
              <div style={{ 'marginRight': '10px', 'fontSize': '30px', display: 'flex', color: '#de1333', textAlign: 'center' }}><RxCrossCircled /> </div>
              <div style={{ 'fontSize': '20px', display: 'block', textAlign: 'center' }}> Error - {apiResponse.message}
              </div>
            </div>
          }
          {
            apiResponse === null &&
            <div className="container__row gap-20">
              <div className="container__col-8 flex-column ">
                <div className="container__row   gap-10 ">
                  <div className="container__col-12 flex-column">
                    <div className="container__col-12">
                      <p className="form-section-title">Order Information</p>
                    </div>
                    <div className="container__col-12 gap-10">
                      <div className={formErrors['customer_name'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                        {/* <TextField
                        type="date"
                        id="todayDate"
                        label="Order Date"
                        placeholder="Order Date"
                        onChange={handleTextFieldChange}
                      /> */}
                        {/* <Calendar 
                      onChange={handleTextFieldChange} />  */}
                        <div style={{ width: '100%' }}>
                          {/*  <DatePicker
                          id="todayDate"
                          className="form-control"
                          selected={payLoad.orderDate}
                          onChange={handleTextFieldChange} //only when value has changed
                        /> */}
                          <TextField
                            type="datex"
                            id="order_date"
                            label="Order Date"
                            placeholder="Order Date"
                            onChange={handleTextFieldChange}
                          />
                        </div>
                      </div>
                      {/* <div className={formErrors['order_status'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                        <Selectbox
                          label="Order Status"
                          id="order_status"
                          placeholder="Order Status"
                          selection="single"
                          isRequired="true"
                          selectedValues={payLoad.order_status || []}
                          onChange={handleChangeSelect}
                          options={orderStatuses} />
                      </div> */}
                    </div>
                  </div>
                  {/* CUSTOMER DETAILS */}
                  <div className="container__row   gap-10 ">
                    <div className="container__col-12 flex-column">
                      <div className="container__col-12">
                        <p className="form-section-title">Customer Information</p>
                      </div>
                      <div className="container__col-12 gap-10">
                        <div className={formErrors['customer_name'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                          <TextField
                            type="text"
                            id="customer_first_name"
                            label="Customer First Name"
                            placeholder="Customer First Name"
                            value={payLoad?.customer_first_name || ''}
                            validators={
                              [{ check: Validator.required, message: 'This field is required.' }]
                            }
                            onChange={handleTextFieldChange}
                          />
                        </div>
                        <div className={formErrors['customer_name'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                          <TextField
                            type="text"
                            id="customer_last_name"
                            label="Customer Last Name"
                            placeholder="Customer Last Name"
                            value={payLoad?.customer_last_name || ''}
                            validators={
                              [{ check: Validator.required, message: 'This field is required.' }]
                            }
                            onChange={handleTextFieldChange}
                          />
                        </div>
                      </div>
                      <div className="container__col-12 gap-10">
                        <div className={formErrors['customer_phone'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                          <TextField
                            type="text"
                            id="customer_phone_number"
                            label="Customer Phone"
                            placeholder="Customer Phone"
                            value={payLoad?.customer_phone_number || ''}
                            onChange={handleTextFieldChange}
                          />
                        </div>
                        <div className={formErrors['customer_email'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6 m-b-20'}>
                          <TextField
                            type="text"
                            id="customer_email_address"
                            label="Customer Email"
                            placeholder="Customer Email"
                            value={payLoad?.customer_email_address || ''}
                            onChange={handleTextFieldChange}
                          />
                        </div>
                      </div>
                      <div className="container__col-12  gap-10">
                        <div className={formErrors['customer_email'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6 m-b-20'}>
                          <TextField
                            type="text"
                            id="customer_address1"
                            label="Customer Address 1"
                            placeholder="Customer Address1"
                            value={payLoad?.customer_address1 || ''}
                            onChange={handleTextFieldChange}
                          />
                        </div>
                        <div className={formErrors['customer_email'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6 m-b-20'}>
                          <TextField
                            type="text"
                            id="customer_address2"
                            label="Customer Address 2"
                            placeholder="Customer Address 2"
                            value={payLoad?.customer_address2 || ''}
                            onChange={handleTextFieldChange}
                          />
                        </div>
                      </div>
                      <div className="container__col-12  gap-10">
                        <div className={formErrors['customer_email'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6 m-b-20'}>
                          <TextField
                            type="text"
                            id="customer_city"
                            label="City"
                            placeholder="City"
                            value={payLoad?.customer_city || ''}
                            onChange={handleTextFieldChange}
                          />
                        </div>
                        <div className={formErrors['customer_email'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6 m-b-20'}>
                          <TextField
                            type="text"
                            id="customer_state"
                            label="State"
                            placeholder="State"
                            value={payLoad?.customer_state || ''}
                            onChange={handleTextFieldChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div><hr />

                <div className="container__row gap-10">
                  <div className="container__col-12 flex-column">
                    {/* SAMPLES INFORMATION NEW */}
                    <div className="container__col-12">
                      <p className="form-section-title">Samples Information</p>
                    </div>
                    <div className="container__col-12 gap-10">
                      <div className={formErrors['nature_of_sample'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                        <Selectbox
                          label="Nature of the sample"
                          id="nature_of_sample"
                          placeholder="Nature of the sample"
                          selection="multi"
                          isRequired="true"
                          onChange={handleChangeSelect}
                          selectedValues={orderDetails.nature_of_sample || []}
                          options={samplesLOV} />
                      </div>
                      <div className={formErrors['typeo_of_analysis'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>

                        <Selectbox
                          label="Type of Analysis"
                          id="type_of_analysis"
                          placeholder="Type of Analysis"
                          selection="multi"
                          isRequired="true"
                          onChange={handleChangeSelect}
                          selectedValues={payLoad.type_of_analysis || []}
                          options={analysisLOV} />
                      </div>
                    </div>
                  </div>
                </div> <hr />
                <div className="container__row gap-10  m-b-20">
                  <div className="container__col-12 flex-column">
                    {/* PAYMENT INFORMATION */}
                    <div className="container__col-12">
                      <p className="form-section-title">Payment Information</p>
                    </div>
                    <div className="container__col-12 gap-10">
                      <div className={formErrors['payment_status'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                        <Selectbox
                          label="Payment Status"
                          id="payment_status"
                          placeholder="Payment Status"
                          selection="single"
                          isRequired="true"
                          onChange={handleChangeSelect}
                          selectedValues={payLoad.payment_status || ''}
                          options={paymentStatus} />
                      </div>
                      <div className={formErrors['payment_mode'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>

                        {
                          /* (payLoad.payment_mode && !payLoad.payment_mode.includes('No Payment')) && */
                          <Selectbox
                            label="Payment Mode"
                            id="payment_mode"
                            placeholder="Payment Mode"
                            selection="mutiple"
                            isRequired="true"
                            selectedValues={payLoad.payment_mode || []}
                            onChange={handleChangeSelect}
                            options={paymentModes} />
                        }

                      </div>
                    </div>
                    <div className="container__col-12 gap-10">
                      <div className={formErrors['chargeable_value'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                        <TextField
                          label="Chargeable value"
                          id="chargeable_value"
                          placeholder="Chargeable value"
                          value={payLoad.chargeable_value || ''}
                          onChange={handleTextFieldChange}
                        />
                      </div>
                      <div className={formErrors['gst'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                        <TextField
                          label="GST"
                          id="gst"
                          placeholder="GST"
                          value={payLoad.gst || ''}
                          onChange={handleTextFieldChange}
                        />
                      </div>
                    </div>
                    <div className="container__col-12 gap-10">
                      <div className={formErrors['total_amount'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                        <TextField
                          label="Total Amount (CV + GST)"
                          id="total_amount"
                          placeholder="Total Amount"
                          value={payLoad.total_amount || ''}
                          onChange={handleTextFieldChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container__row ">
                  <div className="container__col-12  gap-10">
                    {/* <div className="container__col-6">
                    <button className="btn btn-block btn-lg btn-outlined" onClick={handleSubmitForm}>Preview Order</button>
                  </div>
                  <div className="container__col-6">
                    <button className="btn btn-block btn-lg btn-primary" onClick={handleSubmitForm}>Create Order</button>
                  </div> */}
                    <button className="btn btn-block btn-lg btn-primary" onClick={handleSubmitForm}>{pageLabel.buttonLabel}</button>

                    {/* <button className="btn btn-primary" style={{width: '220px'}} onClick={setToaster}>Create Toaster</button> */}
                  </div>
                </div>

              </div>
              <div className="container__col-4 flex-column">
                {
                  showPreview &&
                  <>
                    <p className="form-section-title">Order Preview</p>
                    <div className="orderPreview">
                      <p>
                        <label>Customer Name</label>
                        <span>{payLoad.customerName}</span>
                      </p>
                      <p>
                        <label>Customer Phone</label>
                        <span>{payLoad.customerPhone}</span>
                      </p>
                      <p>
                        <label>Customer Email</label>
                        <span>{payLoad.customerEmail}</span>
                      </p>
                    </div>
                  </>
                }

              </div>
            </div>
          }
        </div>


      </div>
    </div>

  );
};

const WithCreateForm = withLoader(CreateForm);
export default WithCreateForm;


{/* {
            samplesInfo.map((row) => {
              return (
                <div className="container__row  gap-10">
                  <div className="container__col-3">
                    <Selectbox
                      label="Nature of the sample"
                      id="orderStatus"
                      placeholder="Nature of the sample"
                      selection="single"
                      isRequired="true"
                      onChange={handleChangeSelect}
                      options={samplesLOV} />
                  </div>
                  <div className="container__col-3">
                    <Selectbox
                      label="Type of Analsyis"
                      id="orderStatus"
                      placeholder="Type of Analsyis"
                      selection="single"
                      isRequired="true"
                      onChange={handleChangeSelect}
                      options={analysisLOV} />
                  </div>
                  <div className="container__col-1">
                    <button onClick={handleAddRow} className="btn btn-outlined btn-sm"><FaPlus /></button>&nbsp;
                    <button className="btn btn-outlined btn-sm"><FaMinus /></button>
                  </div>
                </div>
              )
            })
          } */}
