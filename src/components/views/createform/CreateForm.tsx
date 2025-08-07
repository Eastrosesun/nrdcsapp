import React, { useEffect, useState } from "react";
/* import { Header, Logo, HeaderMenu, UserNameSpan, Card, Chip, AppointmentInfo, AppointInfoIcon, PatientCTA } from "./DashboardStyles"; */
import { BiUserPin } from "react-icons/bi";
import CardComponent from "../../common/Card/CardComponent";
import TextField from "../../common/Forms/Textfield/Textfield";
import { doGet, doPost } from "../../../services/api-working";
import moment from 'moment';
import { getFirestore, collection, setDoc, getDocs, where, addDoc, Timestamp, query, orderBy, onSnapshot, doc, serverTimestamp, getDoc } from 'firebase/firestore';
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


/**********************************
 *  LOVS AND DEFAULTS
**********************************/
const samplesLOV = [
  { value: '', label: 'Nature of sample' },
  { value: '1', label: 'Limestone' },
  { value: '2', label: 'Iron ore' },
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
  { value: '1', label: 'No Payment' },
  { value: '2', label: 'Partial Payment' },
  { value: '3', label: 'Full Payment' }
]

const payLoadObj: any = { orderDate: '', orderStatus: '', customerName: 'Dinesh G', customerPhone: '9885122317', customerEmail: 'dinesh.garimella78@gmail.com', customerLocation: 'Nagole, Hyderabad', natureOfSample: '', typeOfAnalysis: '', chargeableValue: '1500', gst: '230', totalAmount: '1730', paymentMode: '', paymentStatus: '' };

const requiredFields = ['orderStatus', 'customerName', 'customerPhone', 'customerEmail', 'customerLocation', 'natureOfSample', 'typeOfAnalysis', 'paymentStatus', 'paymentMode']

const priceMatrix = [
  { value: '1', label: 'Limestone', basePrice: 100 },
  { value: '2', label: 'Iron ore', basePrice: 200 },
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
/**********************************
  * MAIN COMPONENT
**********************************/
const CreateForm = (props: any) => {
  const location = useLocation();
  const {action, orderDetails} = location.state || {};
  console.log('action', action);
  console.log('orderDetails', orderDetails);
  
  /*********************
   * STATE VARIABLES
   *******************/
  const user_info = sessionStorage.getItem('user_info') ? JSON.parse(sessionStorage.getItem('user_info') || '') : '';
  const [userData, setUserData] = useState([]);
  const [samplesInfo, setSamplesInfo] = useState([{ nature: '', analysis: '' }]);
  const { setLoading } = props;
  //const { patientsData: {mutation: patientData, data}, } = useDashboardApi();
  const [payLoad, setPayLoad] = useState(payLoadObj);
  const [formErrors, setFormErrors] = useState<any>({});
  const [showPreview, setshowPreview] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>('');
  const [orderNumber, setOrderNumber] = useState<any>('');
  
  /* const [isFormValid, setIsFormValid] = useState(false) */

  /**********************************
   *  HANDLE COMPONENT ON MOUNT
  **********************************/
  useEffect(() => {
    todaysDate();
    console.log('action => ', action);
    if(action) {
      setPayLoad(orderDetails);
    }
  }, []);

  const todaysDate = () => {
    return moment().format('DD/MM/yyyy');
  }
  
  /***************************
   * HANDLE TEXTFIELD CHANGE
   ***************************/
  const handleTextFieldChange = (e: any) => {
    console.log(e);
    if (e && e.id) {
      const { id, value } = e.target;
      setPayLoad({ ...payLoad, [id]: value });
      Object.keys(formErrors).filter((key) => {
        if (key === id) delete formErrors[key];
        if (formErrors === id) delete formErrors[key];
      });

    } else {
      setPayLoad({ ...payLoad, 'orderDate': e });
      if (formErrors === 'orderDate') delete formErrors['orderDate'];
    } 
    setFormErrors(formErrors); 
  }

  /***************************
   * HANDLE SELECT CHANGE
   ***************************/
  const handleChangeSelect = (id: any, value: any) => {
    setPayLoad({ ...payLoad, [id]: value });
    //checkValidation();
  }

  useEffect(() => {
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
      if (!payLoad[field as keyof {}]) {
        errors[field as keyof {}] = payLoad[field as keyof {}];
      }
    });
    console.log(errors);
    console.log(serverTimestamp());
    setFormErrors(errors);
    //let isFormValid = await
    console.log('check validation');
    //Object.keys(formErrors).length > 0 ? setIsFormValid(false): setIsFormValid(true);
    return Object.keys(errors).length > 0 ? false : true;
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
    setOrderNumber(order_num);
    return order_num;
  }

  const getDoubleDigits = (val: any) => {
    if (val < 10) {
      return `0${val}`;
    } else {
      return val;
    }
  }

  /**********************************
   *  HANDLE ORDERFORM SUBMIT
  **********************************/
  const handleSubmitForm = async () => {
    console.log('handleSubmitForm');
    generateOrderNumber()
    setApiResponse('success');
    /* let isFormValid = await checkValidation();
    console.log('onSubmit', isFormValid)
    if (isFormValid) {
      addOrder()
    } */
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
      console.log(payLoad);
      const docRef = await addDoc(collection(db, 'nrdcs'), {
        order_number: generateOrderNumber(),
        order_start_date: payLoad.orderDate,
        order_status: payLoad.orderStatus,
        customer_name: payLoad.customerName,
        customer_phone: payLoad.customerPhone,
        customer_email: payLoad.customerEmail,
        customer_location: payLoad.customerLocation,
        nature_of_sample: payLoad.natureOfSample,
        type_of_analysis: payLoad.typeOfAnalysis,
        payment_status: payLoad.paymentStatus,
        payment_mode: payLoad.paymentMode,
        chargeable_value: payLoad.chargeableValue,
        gst: payLoad.gst,
        total_amount: payLoad.totalAmount,
        order_completed_date: '',
        created_by: 1,
        created_date: serverTimestamp(),
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
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <div className="main-content">
      <div className="page-wrap">
        <div className="page-title">
          <div className="container">
            <div className="container__row">
              <div className="container__col-6 flex-column m-r-10">
                <p className="txt-18 thick">Create an Order</p>
                {/* <span className="txt-13 normal">Lorem ipsum iset dule.</span> */}
              </div>
            </div>
          </div>
        </div>

        {/* {
          apiResponse === 'success' ?
            <>Success - New Order has been created</> :
          apiResponse === 'error' ?
            <>Error - There is a problem with your request</> :
            <></>
        } */}

        <div className="container flex-column pad-20" style={{ background: "#fff", border: "1px solid #ddd" }}>
          {
            apiResponse === 'success' ?
              <div className="container flex-column pad-20"><div style={{ 'fontSize': '60px', display: 'block', color: '#16cd16', textAlign: 'center' }}><IoIosCheckmarkCircleOutline /></div>
                <div style={{ 'fontSize': '20px', display: 'block', textAlign: 'center' }}>
                  New Order <strong>&nbsp;{orderNumber}&nbsp;</strong> has been created.<br /><br />
                  <Link to="/dashboard">Go to Dashboard</Link>
                </div>
              </div> :
              apiResponse === 'error' ?
                <div className="container flex-row pad-20" style={{'alignItems': 'center', background: '#fff3f5', color: '#de1333', 'margin': '0 0 20px 0'}}>
                  <div style={{ 'fontSize': '30px', display: 'flex', color: '#de1333', textAlign: 'center' }}><RxCrossCircled /> </div> 
                  <div style={{ 'fontSize': '20px', display: 'block', textAlign: 'center' }}>Error - There is a problem with your request
                  </div>
                </div> :
                <></>
          }
          {
            (apiResponse === '' || apiResponse === 'error') &&
            <div className="container__row gap-20">
              <div className="container__col-8 flex-column ">
                <div className="container__row   gap-10 ">
                  <div className="container__col-12 flex-column">
                    <div className="container__col-12">
                      <p className="form-section-title">Order Information</p>
                    </div>
                    <div className="container__col-12 gap-10">
                      <div className={formErrors['customerName'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
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
                            id="orderDate"
                            label="Order Date"
                            placeholder="Order Date"
                            onChange={handleTextFieldChange}
                          />
                        </div>
                      </div>
                      <div className={formErrors['orderStatus'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                        <Selectbox
                          label="Order Status"
                          id="orderStatus"
                          placeholder="Order Status"
                          selection="single"
                          isRequired="true"
                          selectedValues={payLoad.order_status || []}
                          onChange={handleChangeSelect}
                          options={orderStatuses} />
                      </div>
                    </div>
                  </div>
                  {/* CUSTOMER DETAILS */}
                  <div className="container__row   gap-10 ">
                    <div className="container__col-12 flex-column">
                      <div className="container__col-12">
                        <p className="form-section-title">Customer Information</p>
                      </div>
                      <div className="container__col-12 gap-10">
                        <div className={formErrors['customerName'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                          <TextField
                            type="text"
                            id="customerName"
                            label="Customer Name"
                            placeholder="Customer Name"
                            value={payLoad.customer_name || ''}
                            onChange={handleTextFieldChange}
                          />
                        </div>
                        <div className={formErrors['customerPhone'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                          <TextField
                            type="text"
                            id="customerPhone"
                            label="Customer Phone"
                            placeholder="Customer Phone"
                            value={payLoad.customer_phone || ''}
                            onChange={handleTextFieldChange}
                          />
                        </div>
                      </div>
                      <div className="container__col-12  gap-10">
                        <div className={formErrors['customerEmail'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6 m-b-20'}>
                          <TextField
                            type="text"
                            id="customerEmail"
                            label="Customer Email"
                            placeholder="Customer Email"
                            value={payLoad.customer_email || ''}
                            onChange={handleTextFieldChange}
                          />
                        </div>
                        <div className={formErrors['customerLocation'] === '' ? 'container__col-6 m-b-20 form-error' : 'container__col-6 m-b-20'}>
                          <TextField
                            type="text"
                            id="customerLocation"
                            label="Customer Location"
                            placeholder="Customer Location"
                            value={payLoad.customer_location || ''}
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
                      <div className={formErrors['natureOfSample'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}> 
                        <Selectbox
                          label="Nature of the sample"
                          id="natureOfSample"
                          placeholder="Nature of the sample"
                          selection="multi"
                          isRequired="true"
                          onChange={handleChangeSelect}
                          selectedValues={payLoad.nature_of_sample || []}
                          options={samplesLOV} />
                      </div>
                      <div className={formErrors['typeOfAnalysis'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>

                        {/* <Selectbox
                          label="Type of Analysis"
                          id="typeOfAnalysis"
                          placeholder="Type of Analysis"
                          selection="multi"
                          isRequired="true"
                          onChange={handleChangeSelect}
                          selectedValues={payLoad.type_of_analysis || []}
                          options={analysisLOV} /> */}
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
                      <div className={formErrors['paymentStatus'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                        <Selectbox
                          label="Payment Status"
                          id="paymentStatus"
                          placeholder="Payment Status"
                          selection="single"
                          isRequired="true"
                          onChange={handleChangeSelect}
                          selectedValues={payLoad.payment_status || []}
                          options={paymentStatus} />
                      </div>
                      <div className={formErrors['paymentMode'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>

                        {
                          (payLoad.paymentStatus && !payLoad.paymentStatus.includes('No Payment')) &&
                          <Selectbox
                            label="Payment Mode"
                            id="paymentMode"
                            placeholder="paymentMode"
                            selection="mutiple"
                            isRequired="true"
                            selectedValues={payLoad.payment_mode || []}
                            onChange={handleChangeSelect}
                            options={paymentModes} />
                        }

                      </div>
                    </div>
                    <div className="container__col-12 gap-10">
                      <div className={formErrors['natureOfSample'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                        <TextField
                          label="Chargeable value"
                          id="chargeableValue"
                          placeholder="Chargeable value" />
                      </div>
                      <div className={formErrors['gst'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                        <TextField
                          label="GST"
                          id="gst"
                          placeholder="GST" />
                      </div>
                    </div>
                    <div className="container__col-12 gap-10">
                      <div className={formErrors['totalAmount'] === '' ? 'container__col-6  m-b-20 form-error' : 'container__col-6  m-b-20'}>
                        <TextField
                          label="Total Amount (CV + GST)"
                          id="totalAmount"
                          placeholder="Total Amount" />
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
                    <button className="btn btn-block btn-lg btn-primary" onClick={handleSubmitForm}>Create Order</button>
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
