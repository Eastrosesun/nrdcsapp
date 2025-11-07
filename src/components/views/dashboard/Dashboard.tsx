import React, { useEffect, useState } from "react";
import { Header, Logo, HeaderMenu, UserNameSpan, Stats, Chip, AppointmentInfo, AppointInfoIcon, PatientCTA, Table, TableHead, TableCell, TableRow, Filters } from "./DashboardStyles";
import CardComponent from "../../common/Card/CardComponent";
import TextField from "../../common/Forms/Textfield/Textfield";
import { doGet, doPost } from "../../../services/api-working";
import { collection, getDocs, where, addDoc, Timestamp, query, orderBy, onSnapshot, setDoc, doc, QuerySnapshot } from 'firebase/firestore'; 
import { db, user } from '../../../Firebase';


import { BiUserPin } from "react-icons/bi";
import { TfiReload } from "react-icons/tfi";
import { BiHistory } from "react-icons/bi";
import { BiFilter } from "react-icons/bi";
import { LuStethoscope } from "react-icons/lu";
import { MdNotes } from "react-icons/md";
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

const monthOptions:any = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const searchPayLoadObj:any = { start_date: ''}

const Dashboard = (props: any) => {

  /*********************
   * STATE VARIABLES
   *******************/
  //const user_info = JSON.parse(sessionStorage.getItem('user_info') || '');
  const [search, setSearch] = useState('');
  const [orderData, setOrderData] = useState<any>([]);
  const [appData, setAppData] = useState([]);
  const { setLoading } = props;

  const [searchPayLoad, setSearchPayLoad] = useState(searchPayLoadObj);

  //const { patientsData: {mutation: patientData, data}, } = useDashboardApi();

  useEffect(() => {
    // getUsers();
    getOrdersFromFirebase();
  }, []);

  const getUsers = () => {
    doGet('users').then((res: any) => {
      if (res.success) {
        setOrderData(res.data);
      }
    })

  }
  const getApplications = () => {

  }
  /********************
   * GET ORDERS FROM FIREBASE
   * 
   */
  const getOrdersFromFirebase = async () => {
   
    const q = query(collection(db, 'nrdcs'));
    const fetchedOrders:any = [];
    const orders = onSnapshot(q, (QuerySnapshot) => {
      console.log('orders snapshot');
      console.log(QuerySnapshot);
      QuerySnapshot.forEach((order) => {
        return fetchedOrders.push({...order.data(), id: order.id});
      })

      /* fetchedOrders.map((row:any) => {
        row['startdate'] = row.order_start_date.toDate().getDate();
        row['startmonth'] = monthOptions[row.order_start_date.toDate().getMonth()];
        row['startyear'] = row.order_start_date.toDate().getYear();
  
        row['createdate'] = row.created_date.toDate().getDate();
        row['createmonth'] = monthOptions[row.created_date.toDate().getMonth()];
        row['createyear'] = row.created_date.toDate().getYear();
      }) */

      
      console.log(fetchedOrders);
      setOrderData(fetchedOrders);
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
  
  //const ordersRef = db.collection('nrdcs');
  const ordersRef = collection(db, "nrdcs");
  const queryFireStore =  query(ordersRef, where("customer_name", ">=", 'Dinesh'), where("customer_name", "<=", '~'));

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

  const handleChangeSelect = (data: any) => {
    console.log(data);
  }
  useEffect(() => {
  }, [orderData]);

  const handleDateChange = (date: any, id: any) => {
    console.log(date);
    setSearchPayLoad({[id]: date});
  }

  useEffect(() => {
    console.log(searchPayLoad);
  }, [searchPayLoad]);

  return (
    <div className="main-content">
      <div className="page-wrap">
        <div className="page-title">
          <div className="container">
            <div className="container__row">
              <div className="container__col-6 flex-column   m-r-10">
                {/* <p className="txt-18 thick">Good Afternoon</p>
                {
                  <span className="txt-20 thickest">{user_info.first_name}</span>
                } */}
                <span className="txt-20 thick">Dashboard</span>
              </div>
              <div className="container__col-6 justify-end">
                <Link to="/createform" className="btn btn-sm btn-primary">Create a new record</Link>
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
            <div className="container__col-12  flex-column maxis-space-between">
              {/*  <TableGrid
                      data={orderData}
                      columns={columns}
                    ></TableGrid> 
              */}
              <Filters style={{display: 'none'}}>
                <div>
                  <TextField
                    label="Customer Name, Location, Phone, Email"
                    id="query"
                    placeholder="Customer Name, Location, Phone, Email"
                    type="text"
                  />
                </div>
                <div>
                  {/* <TextField
                    label=""
                    id="query"
                    placeholder="Date"
                    type="text"
                  /> */}
                 {/*  <DatePicker
                      id='search_date'
                      className="form-control"
                      selected={searchPayLoad.start_date}
                      onChange={(e:any) => handleDateChange(e)}
                  />   */}
                  <TextField
                      type="daterange"
                      id="order_date"
                      label="Order Start Date"
                      placeholder="Order Date"
                      onChange={handleDateChange} 
                  />
                </div>
                {/* <div>
                  <TextField
                    label=""
                    id="query"
                    placeholder="Date"
                    type="text"
                  />
                </div> */}
                <div>
                  <Selectbox 
                    label="Select Order Status"
                    id="orderStatus"
                    placeholder="Select Order Status"
                    selection="single"
                    isRequired="true"
                    onChange={handleChangeSelect}
                    selectedValues={[]}
                    options={orderOptions} />
                </div>
                {/* <div>
                  <Select options={paymentOptions} />
                </div> */}
                <div>
                  <label></label>
                  <button className="btn btn-sm btn-primary" onClick={handleSearch}><FaSearch /></button></div>
              </Filters>
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
                  orderData.map((order:any)=> {
                    return <div key={order.order_number}>
                    <TableRow >
                      <TableCell>{order.order_number.slice(order.order_number.length-4, order.order_number)}</TableCell>
                      <TableCell>
                        <p className="date">
                          <span className="month">{order.startmonth}</span>
                          <span className="day">{order.startdate}</span>
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="txt-14 thick">{order.customer_name}</p>
                        <p className="txt-12 mid-grey">{order.customer_phone}</p>
                      </TableCell>
                      <TableCell className="txt-14 thick">&#8377;{order.total_amount}</TableCell> 
                      <TableCell className="txt-14 thick">
                        {
                          order.nature_of_sample.length &&
                          order.nature_of_sample.map((sample: any, index: Number) => { 
                            return `${sample.label} ${order.nature_of_sample.length -1 === index? '' : ',' } `; 
                          })
                        }
                        </TableCell> 
                      <TableCell className="chip green">{order.payment_status[0] ? order.payment_status[0].label: ''}</TableCell>
                      <TableCell className="chip error">{order.order_status[0] ? order.order_status[0].label: ''}</TableCell>
                      <TableCell>
                        <div className="actions">
                          <button className="btn skyblue"><IoEyeOutline /></button>
                          <Link to='/createform' state={{ action: 'edit', orderDetails: order }} className="btn lightgreen"><RiPencilLine /></Link>
                          <button className="btn lightred"><RiDeleteBin6Line /></button>
                        </div>
                      </TableCell>
                    </TableRow>
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
