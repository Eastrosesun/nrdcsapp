import React, { useEffect, useState } from "react";
import TextField from "../Forms/Textfield/Textfield";

const FormCreator = (props: any) => {

    const { formdata, layout } = props;
    console.log(layout);
    return (

        <div className="container">
            <div className="container__row">
                <div className={layout =='horizontal' ? 'container__col-12  gap-10 maxis-space-between' : 'container__col-12 flex-column gap-10 maxis-space-between'}> 
                    {
                        formdata.length &&
                        formdata.map((item: any, index: Number) => {
                            return <div className="container__col-3 flex-column">
                                <div className="form-group">
                                <TextField
                                    id={item.id}
                                    label={item.label}
                                    type={item.type}
                                    placeholder={item.placeholder}
                                />
                            </div>
                            </div>
                        })

                    } 
                </div>
            </div>
        </div>


    )
}

export default FormCreator