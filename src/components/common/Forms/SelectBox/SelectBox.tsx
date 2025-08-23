import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";

/* import Select from 'react-select'; */


const Selectbox = React.memo((props: any) => {
    const { selection, label, options, selectedValues, id, onChange } = props;
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
                    /> :
                    <Multi
                        label={label}
                        id={id}
                        options={options}
                        onselection={toggleMenu} 
                        onChange={onChange}
                        selectedValues={selectedValues}
                    />
            } 
        </>

    )
});

const Single = (props: any) => {
    //const { label, options, selection, id } = { ...props.props };
    const { label, options,  id, selectedValues, onChange } = props;
    const [isOpen, setIsOpen] = useState(false);
   // const [selectedOptions, setSelectedOptions] = useState([] as string[]);
   const [selectedOptions, setSelectedOptions] = useState<any>(props.selectedValues);
   const selectBox = useRef<any>();
    console.log('props')
    console.log(props)
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
        console.log('option');
        console.log(option);
        //if (option.value === '') return;
       /*  if (selectedOptions.includes(option.label)) {
            setSelectedOptions((prevState) => (prevState.filter(item => item !== option.label)));
        } else { 
           setSelectedOptions((prevState) => ({...prevState, ...option})); 
        } */
        //  setSelectedOptions([option.label]);
        setSelectedOptions([option]);
        toggleMenu();
    }
    useEffect(() => {
        console.log('selectedOptions Single ....');
        console.log(selectedOptions);
        console.log(id);
        onChange(id, selectedOptions);
    }, [selectedOptions]);

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
            <div className="select-container">
            <div className="select-header" onClick={toggleMenu}>
                    {
                        selectedOptions.length ?
                        selectedOptions.map((option: any) => {
                            return (<span className="chip" key={option.value}>{option.label}</span>)
                        }) :
                        <>{label}</>
                    }
                </div>
                {
                    isOpen &&
                    <div className="select-options" ref={selectBox}>
                        {
                            options.map((option: any) => {
                                return <span id={id} className="menu-options" key={option.label} onClick={() => { handleSelectOptions(option) }}>
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
    const { label, options, selection, id, selectedValues, onChange } = props;
    const [isOpen, setIsOpen] = useState(false);
    /* const [selectedOptions, setSelectedOptions] = useState<any>([{value:2, label: 'Iron Ore'}]); */
    const [selectedOptions, setSelectedOptions] = useState<any>(props.selectedValues);
    const selectBox = useRef<any>();
   /*  console.log('multi');
    console.log(props);
    console.log(selectedValues); */

    /**********************************
    *  HANDLE COMPONENT ON MOUNT
    **********************************/
    useEffect(() => {
        window.addEventListener('click', (e: any) => {
            e.stopPropagation();
            if (!e.target.classList.contains('chip') && !e.target.classList.contains('menu-options') && !e.target.classList.contains('select-header')) setIsOpen(false)
        });

    }, []);
    /* useEffect(() => {
        console.log('selectedValues')
        console.log(selectedValues)
        if (selectedValues) {
            setSelectedOptions(selectedValues);
            renderSelectedChips();
        }
        renderSelectedChips();
    }, [selectedValues]); */

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }


    const handleSelectOptions = (option: any) => {
        console.log("handleSelectOptions");
        if (option.value === "") return;
        setSelectedOptions((prevState: any) => {
            const [index, isExists]: any = doesObjectExists(prevState, option);
            console.log("isExists");
            console.log(isExists);
            if (isExists) {
                // if (index < 0) return;
                prevState.splice(index, 1);
                console.log("prevState");
                console.log(prevState);
                console.log(prevState.indexOf(option));
                return prevState;
                //return [...prevState, prevState.splice(prevState.indexOf(option), 1)];
            } else {
                return [...prevState, option];
            }
        }); 
        toggleMenu();
    };
    

     useEffect(() => {  
         console.log('selectedOptions useEffect...');
         console.log(selectedOptions); 
        onChange(id, selectedOptions);
     }, [selectedOptions]);
     const doesObjectExists = (prevState: any, option: any) => {
        let exists = false;

        for (let x in prevState) {
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
            return (<span className="chip" key={option.value}>{option.label}</span>)
        })
    }
    return (
        <div key={id} style={{ width: '100%' }}>
            <label>{label}</label>
            <div className="select-container">
                <div className="select-header" onClick={toggleMenu}>
                    {
                        selectedOptions.length ?
                            selectedOptions.map((option: any) => {
                                return (<span className="chip" key={option.value}>{option.label}</span>)
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