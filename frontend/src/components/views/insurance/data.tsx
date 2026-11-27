export const FormData = [{
    id:"policyName",
    label: "Policy Name",
    type: "text",
    required: true,
    value: '',
    placeholder: "Enter Policy Name",
    rules: {

    },

},
{
    id:"policyNumber",
    label: "Policy Number",
    type: "text",
    required: true,
    value: '',
    placeholder: "Enter Policy Number",
    rules: {

    },
    
}, 
{
    id:"sumAssured",
    label: "Sum Assured",
    type: "text",
    required: true,
    value: '',
    placeholder: "Enter Sum Assured",
    rules: {

    },
    
}, 
{
    id:"frequency",
    label: "Frequency",
    type: "select",
    lov: [
        {label: '3 Months', value: 90},
        {label: '6 Months', value: 180},
        {label: '1 Year', value: 365}
    ],
    value: 180,
    required: true,
    placeholder: "Select Frequency",
    rules: {

    },
    
},
{
    id:"active",
    label: "Status",
    type: "radio",
    lov: [
        {label: 'Active', value: 1},
        {label: 'Inactive', value: 0}
    ],
    value: 1,
    required: true,
    placeholder: "Select Frequency",
    rules: {

    },
    
},
{
    id:"nominee",
    label: "Nominee",
    type: "text",
    required: true,
    placeholder: "Enter Nominee",
    value: "Preethi",
    rules: {

    },
    
},
{
    id:"vendor",
    label: "Vendor",
    type: "text",
    required: true,
    placeholder: "Enter Vendor Name",
    value: "Care",
    rules: {

    },
    
},
{
    id:"policyDescription",
    label: "Policy description",
    type: "longtext",
    required: true,
    placeholder: "Enter Policy Description",
    rules: {

    },
    
},
{
    id:"policyStartDate",
    label: "Start Date",
    type: "date",
    required: true,
    value:"2023-06-28",
    placeholder: "Policy Start Date",
    rules: {

    },
    
},
{
    id:"policyEndDate",
    label: "End Date",
    type: "date",
    required: true,
    value:"2024-06-27",
    placeholder: "Policy End Date",
    rules: {

    },
    
},
{
    id:"policyPremiumPaidYear",
    label: "Policy Premium Year Paid",
    type: "date",
    required: true,
    value:"",
    placeholder: "Policy Premium Year Paid",
    rules: {

    }
    
},
{
    id:"policyPremiumAmount",
    label: "Policy Premium Amount",
    type: "text",
    required: true,
    placeholder: "Policy Premium Amount",
    value: "",
    rules: {

    },
    
}];