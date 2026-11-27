import React, { useEffect, useState } from "react";
import UIHeader from "../../common/UIComponents/Header/Header";
 


const header1config = {
    title: "Dashboard Widget",
    style: 'default',
    ctaButton: {
      label: 'Submit',
      style: 'primary',
    },
    icons: {
      leftIcon: {
        display: true,
        iconName: 'dashboard'
      },
      rightIcon: {
        display: true,
      },
      badge: {
        display: true,
        type: 'info',
        label: 'INFO'
      }
    }
}

const header2config = {
  title: "Table Header",
  style: 'default',
  ctaButton: {
    label: 'Cancel',
    style: 'outlined',
  },
  icons: {
    leftIcon: {
      display: true,
      iconName: 'dashboard'
    },
    rightIcon: {
      display: true,
    },
    badge: {
      display: true,
      type: 'warning',
      label: 'WARNING'
    }
  }
}

const header3config = {
  title: "User Profile",
  style: 'topRounded',
  ctaButton: {
    label: 'Update Profile',
    style: 'primary',
  },
  icons: {
    leftIcon: {
      display: true,
      iconName: 'dashboard'
    },
    rightIcon: {
      display: true,
    },
    badge: {
      display: true,
      type: 'error',
      label: 'ERROR'
    }
  }
}
const UIComponents = (props: any) => {
  useEffect(() => {
  }, []);
    
  return (
    <div className="main-content">
      <div className="page-wrap">
        <div className="page-title">
          <div className="container">
            <div className="container__row">
              <div className="container__col-6 flex-column   m-r-10"> 
                <span className="txt-20 thick">UI Components</span>
              </div> 
            </div>
          </div>
        </div>
        <div className="container flex-column">
          <h4>Header</h4><hr />

          <UIHeader config={header1config} /><hr />
          <UIHeader config={header2config} /><hr />
          <UIHeader config={header3config} />
        </div>  
      </div>
    </div>
  );
};

//const WithUIComponents = withLoader(UIComponents);
export default UIComponents;
