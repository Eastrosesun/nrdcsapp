import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";

/* import Select from 'react-select'; */


const Selectbox = React.memo((props: any) => {
    let { selection, label, options, selectedValues, id, onChange, size } = props;
    size = size ? size : 'lg';
    const [isOpen, setIsOpen] = useState(false); 
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            {
                selection === 'single' ?
                    <Single
                        label={label}
                        id={id}
                        options={options} 
                        onselection={toggleMenu}
                        onChange={onChange}
                        selectedValues={selectedValues}
                        size = {size}
                    /> :
                    <Multi
                        label={label}
                        id={id}
                        options={options}
                        onselection={toggleMenu} 
                        onChange={onChange}
                        selectedValues={selectedValues}
                        size = {size}
                    />
            } 
        </>

    )
});

const Single = (props: any) => {
    //const { label, options, selection, id } = { ...props.props };
    const { label, options,  id, selectedValues, onChange, size } = props;
    const [isOpen, setIsOpen] = useState(false);
   // const [selectedOptions, setSelectedOptions] = useState([] as string[]);
   const [selectedOptions, setSelectedOptions] = useState<any>(props.selectedValues);
   const selectBox = useRef<any>();
    console.log('props single selectedValues')
    console.log(props.selectedValues)
    /**********************************
    *  HANDLE COMPONENT ON MOUNT
    **********************************/
    useEffect(() => {
        window.addEventListener('click', (e: any) => {
            e.stopPropagation();
            if (!e.target.classList.contains('menu-options') && !e.target.classList.contains('select-header')) setIsOpen(false)
        });
        /* setSelectedOptions(selectedOptions);
         console.log('selectedOptions');
         console.log(selectedOptions); */

    }, []);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    const handleSelectOptions = (option: any) => {
        if (option.value === "") return;
        //if (option.value === '') return;
       /*  if (selectedOptions.includes(option.label)) {
            setSelectedOptions((prevState) => (prevState.filter(item => item !== option.label)));
        } else { 
           setSelectedOptions((prevState) => ({...prevState, ...option})); 
        } */
        //  setSelectedOptions([option.label]);
        //setSelectedOptions([option]);
        setSelectedOptions((prevState: any) => {
            if(selectedOptions.includes(option.label)) {
                prevState.splice(selectedOptions.indexOf(option.label), 1);
                return prevState;
            }
            return [...prevState, option.label];
        })
        toggleMenu();
    }
    useEffect(() => {
        console.log('selectedOptions Single ....');
        console.log(selectedOptions);
        console.log(id);
         
        onChange(id, selectedOptions);
    }, [selectedOptions]);

    const getSelectOption = ()=> {
        console.log('getSelectOption', selectedOptions)
        if(!selectedOptions) return;
        interface OptionItem {
            value: string | number; 
            label: string;
        }
        for(const [key, value] of Object.entries(options)) {
           const optionValue = value as OptionItem;
           const optionLabel = label as OptionItem;
           if(Number(optionValue.value) === Number(selectedOptions)) {
            return options[selectedOptions]['label']
           }
        }
        return "Select";
    }

    /* const renderSelectedOptions = () => {
         
        return selectedOptions.map((option:any) => {
            return (
                <span key={option.label}>{option.label}</span>
            )
        })
    } */

    return (
        <div key={id} style={{ width: '100%' }}>
            <label>{label}</label>
            <div className={`select-container ${size}`}>
                <div className="select-header" onClick={toggleMenu}>
                    {
                        selectedOptions ?
                        <span className="chip">{getSelectOption()}</span>:
                        <>{label}</>

                    }
                </div>
                {
                    isOpen &&
                    <div className="select-options" ref={selectBox}>
                        {
                            options.map((option: any) => {
                                return <span id={option} className="menu-options" key={option.label} onClick={() => { handleSelectOptions(option) }}>
                                    {option.label}
                                </span>
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}
const Multi = (props: any) => {
    const { label, options, selection, id, selectedValues, onChange, size } = props;
    console.log('... selectedValues ...');
    console.log(props.selectedValues);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<any>(props.selectedValues);
    const selectBox = useRef<any>();
    console.log('props multi selectedValues')
    console.log(props.selectedValues)
    /**********************************
    *  HANDLE COMPONENT ON MOUNT
    **********************************/
    useEffect(() => {
        window.addEventListener('click', (e: any) => {
            e.stopPropagation();
            if (!e.target.classList.contains('chip') && !e.target.classList.contains('menu-options') && !e.target.classList.contains('select-header')) setIsOpen(false)
        });
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    const handleSelectOptions = (option: any) => {
        if (option.value === "") return;
        console.log('option', option);
        setSelectedOptions((prevState: any) => {
            if(selectedOptions.includes(option.label)) {
                prevState.splice(selectedOptions.indexOf(option.label), 1);
                return prevState;
            }
            return [...prevState, option.label];
        })
        
        /* setSelectedOptions((prevState: any) => {
            const [index, isExists]: any = doesObjectExists(prevState, option.value);
            console.log("isExists");
            console.log(isExists);
            if (isExists) {
                prevState.splice(index, 1);
                console.log("prevState");
                console.log(prevState);
                console.log(prevState.indexOf(option));
                return prevState;
                //return [...prevState, prevState.splice(prevState.indexOf(option), 1)];
            } else {
                return [...prevState, option];
            }
        });  */
        toggleMenu();
    };
    

     useEffect(() => {
        onChange(id, selectedOptions);
     }, [selectedOptions]);

     const doesObjectExists = (prevState: any, option: any) => {
        let exists = false;
        console.log('doesObjectExists prevState');
        console.log(prevState)
        for (let x in prevState) {
            console.log('X => ', x)
            console.log(prevState[x]);
            console.log(JSON.stringify(prevState[x]) === JSON.stringify(option));
            console.log(JSON.stringify(prevState[x]));
            console.log(JSON.stringify(option));
            if (prevState.hasOwnProperty(x) && JSON.stringify(prevState[x]) === JSON.stringify(option)) {
                exists = true;
                console.log(x);
                return [x, exists];
            }
        }
        return [-1, exists];
    };
    const renderSelectedChips = () => {
        console.log('renderSelectedChips Multi');
        console.log(selectedOptions);
        return selectedOptions.map((option: any) => {
            return (<span className="chip"  key={option.value}>{option.label}</span>)
        })
    }
    return (
        <div key={id} style={{ width: '100%' }}>
            <label>{label}</label>
            <div className={`select-container ${size}`}>
                <div className="select-header" onClick={toggleMenu}>
                    {
                        selectedOptions.length ?
                            selectedOptions.map((option: any) => {
                                return (<span className="chip"  key={option}>{option} X</span>)
                            }) :
                            <>{label}</>
                    }
                </div>
                {/* <div className="select-header">{label}</div> */}
                {
                    isOpen &&
                    <div className="select-options" ref={selectBox}>
                        {
                            options.map((option: any) => {
                                return <span id={option} className="menu-options" key={option.label} onClick={() => { handleSelectOptions(option) }}>{option.label}</span>
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}
export default Selectbox;