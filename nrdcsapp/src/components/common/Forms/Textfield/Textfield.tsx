import React, { useEffect, useState } from "react";
import Validator from "../../../util/Validator";
import DatePicker from "react-datepicker";
import { CiCalendar } from "react-icons/ci";


const TextField = ({ label, id, placeholder, type, validators, value, onChange, readonly, size='lg' }: { label?: string, id?: string, placeholder?: string, value?: string, type?: any, validators?: any, onChange?: any, readonly?: boolean, size?: string }) => {
    size = size ? size : 'lg';
    //STATE
    const [error, setError] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [fieldValue, setFieldValue] = useState(value)
    
    const handleValidation = (e: any) => {
        const { id, value } = e.target;
        console.log('handleValidation');
        console.log(value);
        console.log(validators);
        if (validators) {
            setError(Validator.validateInput(validators, value));
            setFieldValue(value);
            onChange(e);
        }
        /* setError(Validator.validateInput(validators, value));
        onChange(e); */
    }
    /* useEffect(() => {
        console.log('value => ', value);
        if(value) {
            setFieldValue(value);
        }
    }, [fieldValue]) */
    const handleDateChange = (date: any, id: any) => {
        console.log(id);
        onChange(date, id);
        setStartDate(date);
    }
    const handleDateRangeChange = (dates: any, id: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        onChange(dates, id); 
    }
    const handleTextFieldChange = (e: any) => {
        console.log(e.target.value);
        setFieldValue(e.target.value);
        onChange(e);
    }
    return (
        <>
            <div className={error ? 'form-error' : ''} style={{ width: '100%' }}>
                {label &&
                    <label>{label}</label>
                }
                {
                    type === 'datex' ?
                        <div className="container__col-12 flex-row"> 
                            <DatePicker
                                id={id}
                                className="form-control"
                                selected={startDate}
                                onChange={(e:any) => handleDateChange(e, id)}
                            />  
                        <CiCalendar style={{'position': 'relative', left: '-24px', top: '10px'}}/>
                        </div>:
                        type === 'daterange' ?
                            <DatePicker
                                id={id}
                                className={`form-control ${size} `}
                                selected={startDate}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(e:any) => handleDateRangeChange(e, id)}
                                selectsRange 
                            />  
                        :
                        <input
                            key={label}
                            id={id}
                            type={type}
                            placeholder={placeholder}
                            name={id}
                            className={`form-control ${size} `}
                            onChange={handleTextFieldChange}
                            onBlur={handleValidation}
                            value={fieldValue}
                            disabled={readonly}
                            
                        />
                } 
            </div>
        </>
    )
}

export default TextField;