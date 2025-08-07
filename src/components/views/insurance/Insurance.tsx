import React, { useEffect, useState } from "react";
import { Header, Logo, HeaderMenu, UserNameSpan, Card, Chip, AppointmentInfo, AppointInfoIcon, PatientCTA } from "./InsuranceStyles";
import { BiUserPin } from "react-icons/bi";
import CardComponent from "../../common/Card/CardComponent";
import TextField from "../../common/Forms/Textfield/Textfield";
import { doGet, doPost } from "../../../services/api-working";

import { TfiReload } from "react-icons/tfi";
import { BiHistory } from "react-icons/bi";
import { BiFilter } from "react-icons/bi";
import { LuStethoscope } from "react-icons/lu";
import { MdNotes } from "react-icons/md";

import withLoader from "../../common/Loader/LoaderComponent";
import { CiCreditCard2, CiDesktop, CiMedicalCase, CiUser, CiViewTimeline, CiWifiOn } from "react-icons/ci";
import { CgFileDocument } from "react-icons/cg";
import { Link } from "react-router-dom";
import {FormData} from './data';
import FormCreator from "../../common/FormCreator/FormCreator";


const Insurance = (props: any) => {

  /*********************
   * STATE VARIABLES
   *******************/
  const user_info = JSON.parse(sessionStorage.getItem('user_info') || '');
  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState([]);
  const [appData, setAppData] = useState([]);
  const { setLoading } = props;
  //const { patientsData: {mutation: patientData, data}, } = useDashboardApi();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    doGet('users').then((res: any) => {
      if (res.success) {
        setUserData(res.data);
      }
    })

  }
  const getApplications = () => {

  }
  useEffect(() => {

  }, [userData]);

  return (
    <div className="main-content">
      <div className="page-wrap">
        <div className="page-title">
          <div className="container">
            <div className="container__row">
              <div className="container__col-6 flex-column">
                <p className="txt-32 thick">Insurance</p>
                <span className="txt-13 normal">Lorem ipsum iset dule.</span>
              </div>
              {/* <div className="container__col-6 justify-end">
                 <Link to="/createform" className="btn btn-sm btn-primary">Create a new record</Link>
              </div> */}
            </div>
          </div>
        </div>
        <div>
                <FormCreator 
                    formdata={FormData}
                    layout="horizontal"
                />
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

const WithInsurance = withLoader(Insurance);
export default WithInsurance;
