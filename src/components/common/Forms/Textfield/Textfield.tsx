import React, { useEffect, useState } from "react";
import Validator from "../../../util/Validator";
import DatePicker from "react-datepicker";
import { CiCalendar } from "react-icons/ci";


const TextField = ({ label, id, placeholder, type, validators, value, onChange, readonly }: { label?: string, id?: string, placeholder?: string, value?: string, type?: any, validators?: any, onChange?: any, readonly?: boolean }) => {

    //STATE
    const [error, setError] = useState();
    const [startDate, setStartDate] = useState(new Date());
    /* console.log('value => ', value); */
    const handleValidation = (e: any) => {
        const { id, value } = e.target;
        if (validators) {
            setError(Validator.validateInput(validators, value));
            onChange(e);
        }
    }
    const handleDateChange = (date: any) => {
        /* console.log(date); */
        onChange(date);
        setStartDate(date);
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
                            onChange={handleDateChange}
                        />
                        <CiCalendar style={{'position': 'relative', left: '-24px', top: '10px'}}/>
                        </div>:
                        <input
                            key={label}
                            id={id}
                            type={type}
                            placeholder={placeholder}
                            name={id}
                            className="form-control"
                            onChange={onChange}
                            onBlur={handleValidation}
                            defaultValue={value}
                            value={value}
                            disabled={readonly}
                        />
                }



            </div>
        </>
    )
}

export default TextField;