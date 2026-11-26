import React, { useEffect, useState } from "react";
import { Header, Logo, HeaderMenu, UserNameSpan, Stats, Chip, AppointmentInfo, AppointInfoIcon, PatientCTA, Table, TableHead, TableCell, TableRow, Filters } from "./DashboardStyles";
import CardComponent from "../../common/Card/CardComponent";
import TextField from "../../common/Forms/Textfield/Textfield";
import { doGet, doPost } from "../../../services/api-working";
import { collection, getDocs, where, addDoc, Timestamp, query, orderBy, onSnapshot, setDoc, doc, QuerySnapshot } from 'firebase/firestore';
import { db, user } from '../../../Firebase';
import moment from 'moment';

import { BiUserPin } from "react-icons/bi";
import { TfiReload } from "react-icons/tfi";
import { BiHistory } from "react-icons/bi";
import { BiFilter } from "react-icons/bi";
import { LuStethoscope } from "react-icons/lu";
import { MdNotes, MdOutlineNotes } from "react-icons/md";
import { IoEyeOutline, IoPencil } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { RiDeleteBin6Line, RiPencilLine } from "react-icons/ri";
import { FaEdit, FaSearch } from "react-icons/fa";
import Select from 'react-select';

import withLoader from "../../common/Loader/LoaderComponent";
import { CiCreditCard2, CiDesktop, CiMedicalCase, CiUser, CiViewTimeline, CiWifiOn } from "react-icons/ci";
import { CgFileDocument } from "react-icons/cg";
import { Link } from "react-router-dom";
import data from './data';
import TableGrid from "../../common/Table/Table";
import Selectbox from "../../common/Forms/SelectBox/SelectBox";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
/* import { addOrders, getOrdersFromDB } from '../../../redux/slices/OrdersSlice'; */
import { AppDispatch } from "../../../redux/store";
import { useAppDispatch } from "../../../redux/hooks/useDispatch";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getOrdersFromDB } from "../../../redux/slices/ordersSlice";

const columns = [
  { id: "sr_no", name: "SR No.", visible: true },
  { id: "customer_name", name: "Customer Name", visible: true },
  { id: "phone", name: "Phone", visible: true },
  /* {id:"email", name: "Email", visible: false}, */
  { id: "order_date", name: "Order Date", visible: true },
  { id: "order_delivery_date", name: "Delivery Date", visible: true },
  /* { id: "order_details", name: "Order Details", visible: true, type: "icon", icon: "order" }, */
  { id: "order_status", name: "Order Status", visible: true },
  { id: "payment_status", name: "Payment Status", visible: true },
  /*  { id: "created_by", name: "Order Status", visible: true },
   { id: "created_date", name: "Created Date", visible: true },
   { id: "modified_date", name: "Modified Date", visible: true }, */

]
const orderOptions = [
  { value: '', label: 'Order Status' },
  { value: '1', label: 'Draft' },
  { value: '2', label: 'In Progress' },
  { value: '3', label: 'Report Ready' },
  { value: '4', label: 'Delivered' }
]
const paymentOptions = [
  { value: '1', label: 'Full Paid' },
  { value: '2', label: 'Partially Paid' },
  { value: '3', label: 'Full Due' }
]

const monthOptions: any = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const searchPayLoadObj: any = { date_range: '', order_status:[] }
//export const useAppDispatch = () => useDispatch<AppDispatch>();

const Dashboard = (props: any) => {

  //const dispatch = useAppDispatch<AppDispatch>();
  //const dispatch = useAppDispatch();



  /*********************
   * STATE VARIABLES
   *******************/
  //const user_info = JSON.parse(sessionStorage.getItem('user_info') || '');
  const [search, setSearch] = useState('');
  //const [orderData, setOrderData] = useState<any>([]);
  // Use useSelector to extract data, status, and error from the store
  const ordersData = useSelector((state:any) => state.orders.allOrders);
   /*  ordersData.map((row: any) => {
        row['startdate'] = moment(row.order_created_date).date();
        row['startmonth'] = moment(row.order_created_date).month();
        row['startyear'] = moment(row.order_created_date).year();
        console.log("ordersData")
  console.log(ordersData)
  }) */
  
  const [appData, setAppData] = useState([]);
  const { setLoading } = props;

  const [searchPayLoad, setSearchPayLoad] = useState(searchPayLoadObj);
  const [faker, setFaker] = useState(false)


  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
 
  //const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  useEffect(() => {
    console.log('here...')
    dispatch(getOrdersFromDB());// Trigger the thunk on component mount
  }, []);

  /********************
   * GET ORDERS FROM DB
   * 
   */
  /* const getOrdersFromDB = async () => {
    let res = await doGet('orders-api/orders/');
  } */
  /********************
   * GET ORDERS FROM FIREBASE
   * 
   */
  const getOrdersFromFirebase = async () => {

    const q = query(collection(db, 'nrdcs'));
    const fetchedOrders: any = [];
    const orders = onSnapshot(q, (QuerySnapshot) => {
      console.log('orders snapshot');
      console.log(QuerySnapshot);
      QuerySnapshot.forEach((order) => {
        return fetchedOrders.push({ ...order.data(), id: order.id });
      })
      setFaker(!faker);

      /* fetchedOrders.map((row:any) => {
        row['startdate'] = row.order_start_date.toDate().getDate();
        row['startmonth'] = monthOptions[row.order_start_date.toDate().getMonth()];
        row['startyear'] = row.order_start_date.toDate().getYear();
  
        row['createdate'] = row.created_date.toDate().getDate();
        row['createmonth'] = monthOptions[row.created_date.toDate().getMonth()];
        row['createyear'] = row.created_date.toDate().getYear();
      }) */


      console.log(fetchedOrders);
      //setOrderData(fetchedOrders);
    });

    console.log('orders');
    console.log(orders);

    /* console.log(data[0].order_start_date.toDate().toLocaleString());
    console.log(data[0].order_start_date.toDate().getDate());
    console.log(data[0].order_start_date.toDate().getMonth());
    console.log(data[0].order_start_date.toDate().getYear()); */
  }
  /********************
    * SEARCH ORDERS IN FIREBASE
    * 
    */
  const handleSearch = async () => {
    console.log('handleSearch')
    //const ordersRef = db.collection('nrdcs');
    const ordersRef = collection(db, "nrdcs");
    const queryFireStore = query(ordersRef, where("customer_name", ">=", 'Dinesh'), where("customer_name", "<=", '~'));

    /*
      .where("dbField1", ">=", searchString)
      .where("dbField1", "<=", searchString + "\uf8ff");
    */

    console.log('queryFireStore');
    console.log(queryFireStore);


    const querySnapshot = await getDocs(queryFireStore);
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      //console.log(`${doc.id} => ${doc.data()}`);
      console.log(doc.data())
    });
    //const snapshot = await q.where('capital', '==', true).get();
    //const fetchedOrders:any = [];
    /*  snapshot.forEach(doc => {
       console.log(doc.id, '=>', doc.data())
     }) */

  }
  /***************************
   * HANDLE SELECT CHANGE
   ***************************/
  const handleSelectChange = (id: any, selectedOption: any) => {
    console.log('handleChangeSelect');
    console.log(id);
    console.log(selectedOption);
    console.log(searchPayLoadObj)
    setSearchPayLoad({[id] : selectedOption})
    //console.log(...searchPayLoadObj['order_status'])
  }
  /***************************
   * HANDLE TEXTFIELD CHANGE
   ***************************/
  const handleTextFieldChange = (e:any) => {
    const {id, value} = e.target;
    setSearchPayLoad({ [id]: value });
  }

  /***************************
   * HANDLE DATE RANGE CHANGE
   ***************************/
  const handleDateChange = (date: any, id: any) => {
    console.log(date);
    setSearchPayLoad({ [id]: date });
  }

  useEffect(() => {
    console.log("searchPayLoad");
    console.log(searchPayLoad);
  }, [searchPayLoad]);

  return (
    <div className="main-content">
      <div className="page-wrap">
        <div className="container">
          <div className="container__row maxis-space-between">
            <div className="container__col-3">
              <div className="card card-animate">
                <div className="card-content">
                  <div className="container__row">
                    <div className="container__col-6 flex-column">
                      <span className="txt-12 normal">IN-PROGRESS ORDERS</span>
                      <span className="txt-24 thick">56</span>
                    </div>
                    <div className="container__col-6 justify-end">
                      <span className="card-icon teal">
                        <span className=" txt-20 normal">
                          <IoEyeOutline />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container__col-3">
              <div className="card card-animate">
                <div className="card-content">
                  <div className="container__row">
                    <div className="container__col-6 flex-column">
                      <span className="txt-12 normal">IN-PROGRESS ORDERS</span>
                      <span className="txt-24 thick">110</span>
                    </div>
                    <div className="container__col-6 justify-end">
                      <span className="card-icon duskorange">
                        <span className=" txt-20 normal">
                          <IoEyeOutline />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container__col-3">
              <div className="card card-animate">
                <div className="card-content">
                  <div className="container__row">
                    <div className="container__col-6 flex-column">
                      <span className="txt-12 normal">IN-PROGRESS ORDERS</span>
                      <span className="txt-24 thick">110</span>
                    </div>
                    <div className="container__col-6 justify-end">
                      <span className="card-icon pastelblue">
                        <span className=" txt-20 normal">
                          <IoEyeOutline />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container__col-3">
              <div className="card card-animate">
                <div className="card-content">
                  <div className="container__row">
                    <div className="container__col-6 flex-column">
                      <span className="txt-12 normal">IN-PROGRESS ORDERS</span>
                      <span className="txt-24 thick">110</span>
                    </div>
                    <div className="container__col-6 justify-end">
                      <span className="card-icon lilac">
                        <span className=" txt-20 normal">
                          <IoEyeOutline />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div><br />
        <div className="page-title">
          <div className="container">
            <div className="container__row">
              {/* <div className="container__col-6 flex-column   m-r-10">
                <p className="txt-18 thick">Good Afternoon</p>
                {
                  <span className="txt-20 thickest">{user_info.first_name}</span>
                }
                <span className="txt-20 nromal">Dashboard</span>
              </div> */}
              <div className="container__col-6 justify-end">
                {/* <Link to="/createform" className="btn btn-sm btn-primary">Create a new record</Link> */}
                {/* <div className="container__row">
                  <div className="container__col-12  gap-10 maxis-space-between">
                    <div className="container__col-3">

                      <Stats>
                        <div className="hd">
                          <div className="patient-img">
                            <CiDesktop />
                          </div>
                          <div className="patient-info">
                            <p>14</p>
                            <span>Orders</span>
                          </div>
                        </div>
                      </Stats>
                    </div>
                    <div className="container__col-3">
                      <Stats>
                        <div className="hd">
                          <div className="patient-img">
                            <CiUser />
                          </div>
                          <div className="patient-info">
                            <p>12</p>
                            <span>Customers</span>
                          </div>
                        </div>
                      </Stats>
                    </div>
                    <div className="container__col-3">
                      <Stats>
                        <div className="hd">
                          <div className="patient-img">
                            <CiViewTimeline />
                          </div>
                          <div className="patient-info">
                            <p>23</p>
                            <span>Delivered</span>
                          </div>
                        </div>
                      </Stats>
                    </div>
                    <div className="container__col-3">
                      <Stats>
                        <div className="hd">
                          <div className="patient-img">
                            <CiCreditCard2 />
                          </div>
                          <div className="patient-info">
                            <p>6500</p>
                            <span>Amount</span>
                          </div>
                        </div>
                      </Stats>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="container__row">
            {/* <div className="container__col-12  flex-column maxis-space-between"
              style={{  borderRadius: '8px', background: "#fff", padding:"16px", border: "1px solid #dedede", boxShadow: "0 1px 2px rgba(56, 65, 74, 0.15)" }}> */}
            <div className="container__col-12  flex-column maxis-space-between card">
              <Filters>
                <div className="container__col-3">
                  <TextField
                    label="Customer Name, Location, Phone, Email"
                    id="query"
                    placeholder="Customer Name, Location, Phone, Email"
                    type="text"
                    value={searchPayLoad.query}
                    onChange={handleTextFieldChange}
                    size="md"
                  />
                </div>
                <div className="container__col-3">
                  {/* <TextField
                    label=""
                    id="query"
                    placeholder="Date"
                    type="text"
                    size="sm"
                  /> */}
                  {/* <DatePicker
                    id='search_date'
                    className="form-control"
                    selected={searchPayLoad.start_date}
                  /> */}
                  <TextField
                    type="daterange"
                    id="order_date_range"
                    label="Order Start Date"
                    placeholder="Order Date"
                    onChange={handleDateChange}
                    size="md"
                  />
                </div>
                {/* <div className="container__col-3">
                  <TextField
                    label=""
                    id="query"
                    placeholder="Date"
                    type="text"
                    size="sm"
                  />
                </div> */}
                <div className="container__col-3">
                  <Selectbox
                    label="Select Order Status"
                    id="orderStatus"
                    placeholder="Select Order Status"
                    selection="multi"
                    isRequired="true"
                    onChange={handleSelectChange}
                    selectedValues={[]}
                    options={orderOptions}
                    size="md"
                   />
                </div>
                <div>
                  <label>&nbsp;</label>
                  <button className="btn btn-lg btn-primary" onClick={handleSearch}><FaSearch /></button>
                </div>
              </Filters>
              <div className="card-content">
                <Table>
                  <TableHead>
                    <TableCell>SR. NO</TableCell>
                    <TableCell>ORDER DATE</TableCell>
                    <TableCell>CUSTOMER</TableCell>
                    <TableCell>ORDER AMOUNT</TableCell>
                    <TableCell>ORDER SAMPLES</TableCell>
                    <TableCell>PAYMENT STATUS</TableCell>
                    <TableCell>ORDER STATUS</TableCell>
                    <TableCell>ACTIONS</TableCell>
                  </TableHead>
                  {
                    ordersData.map((order: any) => {
                      return <div key={order.id}>
                       {/*  <Link to='/createform' state={{ action: 'edit', orderDetails: order }} className="btn lightgreen"> */}
                        <TableRow >
                          {/* <TableCell>{order.order_number.slice(order.order_number.length - 4, order.order_number)}</TableCell> */}
                          <TableCell>{order.id}</TableCell>
                          <TableCell>
                            <p className="date">
                              <span className="month">{order.startmonth}</span>
                              <span className="day">{order.startdate}</span>
                            </p>
                          </TableCell>
                          <TableCell>
                            <p className="thick txt-16">{order.customer_first_name} {order.customer_last_name}</p>
                            <p className="txt-12 mid-grey normal">{order.customer_phone_number}</p>
                            <p className="txt-12 mid-grey normal">{order.customer_email_address}</p>
                          </TableCell>
                          <TableCell>&#8377;{order.total_amount}</TableCell>
                          <TableCell>
                            {
                              order.nature_of_sample.length &&
                              order.nature_of_sample.map((sample: any, index: Number) => {
                                return `${sample} ${order.nature_of_sample.length - 1 === index ? '' : ','} `;
                              })
                            }
                          </TableCell>
                          {/*  <TableCell className="chip green">{order.payment_status[0] ? order.payment_status[0].label : ''}</TableCell>
                          <TableCell className="chip error">{order.order_status[0] ? order.order_status[0].label : ''}</TableCell> */}
                          <TableCell className="chip green">{order.payment_status_display}</TableCell>
                          <TableCell className="chip error">{order.order_status_display}</TableCell>
                          <TableCell>
                            <div className="actions">
                              <button className="btn skyblue"><IoEyeOutline /></button>
                              <Link to='/createform' state={{ action: 'edit', orderDetails: order }} className="btn lightgreen"><RiPencilLine /></Link>
                              <button className="btn lightred"><RiDeleteBin6Line /></button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {/* </Link> */}
                      </div>
                    })

                  }


                  {/* <TableRow>
                    <TableCell>9214</TableCell>
                    <TableCell>
                      <p className="date">
                        <span className="month">JAN</span>
                        <span className="day">23</span>
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="txt-14 thick">Venkat Rao</p>
                      <p className="txt-12 mid-grey">989-645-6617</p>
                    </TableCell>
                    <TableCell className="chip error">Partially Paid</TableCell>
                    <TableCell className="chip green">28 Jan, 2025</TableCell>
                    <TableCell className="chip pink">28 Jan, 2025</TableCell>
                    <TableCell>28 Jan, 2025</TableCell>
                    <TableCell>
                      <div className="actions">
                        <button className="btn skyblue"><IoEyeOutline /></button>
                        <button className="btn lightgreen"><FaCheck /></button>
                        <button className="btn lightred"><RiDeleteBin6Line /></button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>9216</TableCell>
                    <TableCell>
                      <p className="date">
                        <span className="month">JAN</span>
                        <span className="day">23</span>
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="txt-14 thick">Srinivasulu Prodduturi</p>
                      <p className="txt-12 mid-grey">989-645-6617</p>
                    </TableCell>
                    <TableCell className="chip error">Partially Paid</TableCell>
                    <TableCell className="chip green">28 Jan, 2025</TableCell>
                    <TableCell className="chip pink">28 Jan, 2025</TableCell>
                    <TableCell>28 Jan, 2025</TableCell>
                    <TableCell>
                      <div className="actions">
                        <button className="btn skyblue"><IoEyeOutline /></button>
                        <button className="btn lightgreen"><FaCheck /></button>
                        <button className="btn lightred"><RiDeleteBin6Line /></button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>9216</TableCell>
                    <TableCell>
                      <p className="date">
                        <span className="month">JAN</span>
                        <span className="day">23</span>
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="txt-14 thick">Srinivasulu Prodduturi</p>
                      <p className="txt-12 mid-grey">989-645-6617</p>
                    </TableCell>
                    <TableCell className="chip error">Partially Paid</TableCell>
                    <TableCell className="chip green">28 Jan, 2025</TableCell>
                    <TableCell className="chip pink">28 Jan, 2025</TableCell>
                    <TableCell>28 Jan, 2025</TableCell>
                    <TableCell>
                      <div className="actions">
                        <button className="btn skyblue"><IoEyeOutline /></button>
                        <button className="btn lightgreen"><FaCheck /></button>
                        <button className="btn lightred"><RiDeleteBin6Line /></button>
                      </div>
                    </TableCell>
                  </TableRow> */}
                </Table>
              </div>
            </div>
            {/* <div className="container__col-2  gap-10 maxis-space-between">
              Right rail
            </div> */}
          </div>
        </div>
        {/* <div className="container pad-20">
          <div className="container__row">
            <div className="container__col-12  gap-10 maxis-space-between">
              <div className="container__col-3">
                <div className="card">
                  <div className="card-content">
                    <Card>
                      <div className="hd">
                        <div className="patient-img">
                          <CiDesktop />
                        </div>
                        <div className="patient-info">
                          <p>4</p>
                          <span>Applications</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
              <div className="container__col-3">
                <div className="card">
                  <div className="card-content">
                  <Card>
                      <div className="hd">
                        <div className="patient-img">
                          <CiUser />
                        </div>
                        <div className="patient-info">
                          <p>10</p>
                          <span>Users</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
              <div className="container__col-3">
                <div className="card">
                  <div className="card-content">
                  <Card>
                      <div className="hd">
                        <div className="patient-img">
                          <CiViewTimeline />
                        </div>
                        <div className="patient-info">
                          <p>23</p>
                          <span>Timesheets</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
              <div className="container__col-3">
                <div className="card">
                  <div className="card-content">
                    <Card>
                      <div className="hd">
                       <div className="patient-img">
                          <CiCreditCard2 />
                        </div>
                        <div className="patient-info">
                          <p>14</p>
                          <span>Identity</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

const WithDashboard = withLoader(Dashboard);
export default WithDashboard;
