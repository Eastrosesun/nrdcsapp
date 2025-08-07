import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";

/* import Select from 'react-select'; */


const Selectbox = (props: any) => {
    const { label, options, selection, id, selectedValues } = props;
    const [isOpen, setIsOpen] = useState(false);
    const selectBox = useRef<any>();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    /* const selectOption = (option:any) => {
        setIsOpen(!isOpen);
        setSelectedOption(option)
    } */
    return (
        <>
            {
                selection === 'single' ?
                    <Single 
                        props={props}
                        onselection={toggleMenu}
                    /> :
                    <Multi
                        props={props}
                        onselection={toggleMenu}
                    />
            }
        </>

    )
}

const Single = (props: any) => {
    const { label, options, selection, id } = { ...props.props };
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([] as string[]);
    const selectBox = useRef<any>();

    /**********************************
    *  HANDLE COMPONENT ON MOUNT
    **********************************/
    useEffect(() => {
        window.addEventListener('click', (e: any) => {
            e.stopPropagation();
            if (!e.target.classList.contains('menu-options') && !e.target.classList.contains('select-header')) setIsOpen(false)
        });
        setSelectedOptions(selectedOptions);
        console.log('selectedOptions');
        console.log(selectedOptions);

    }, []);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    const handleSelectOptions = (option: any) => {
        console.log(option);
        //if (option.value === '') return;
        /* if (selectedOptions.includes(option.label)) {
            setSelectedOptions((prevState) => (prevState.filter(item => item !== option.label)));
        } else {
           setSelectedOptions((prevState) => ([...prevState, option.label])); 
        } */
      //  setSelectedOptions([option.label]);
        toggleMenu();
    }
    useEffect(() => {
        console.log('selectedOptions');
        console.log(selectedOptions);
        props.props.onChange(selectedOptions, id);
       // toggleMenu();
    }, [selectedOptions]);

    const renderSelectedOptions = () => {
        console.log('renderSelectedOptions Single');
        console.log(selectedOptions);
        return selectedOptions.map((option) => { 
            return (
                <span  key={option}>{option}</span>
            )
        })
    }

    return (
        <div key={id} style={{width:'100%'}}>  
            <label>{label}</label>
            <div className="select-container">
                <div className="select-header" onClick={toggleMenu}>
                    {selectedOptions.length ? renderSelectedOptions() : label}
                </div>
                {
                    isOpen &&
                    <div className="select-options" ref={selectBox}>
                        {
                            options.map((option: any) => {
                                return <span id={option.label} className="menu-options" key={option.label} onClick={() => {handleSelectOptions(option)}}> 
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
    const { label, options, selection, id, selectedValues } = { ...props.props };
    const [isOpen, setIsOpen] = useState(false);
    /* const [selectedOptions, setSelectedOptions] = useState(props.props.selectedValues as string[]); */
    //const dropdowns = options.map((option:any) => option.label)
    //const [selectedOptions, setSelectedOptions] = useState<any>(selectedValues.length ? selectedValues : [] as string[]);
    const [selectedOptions, setSelectedOptions] = useState<any>([{value: '2', label: 'Iron Ore'}]);
    const selectBox = useRef<any>();
   // console.log('dropdowns', dropdowns);
    console.log('multi');
    console.log(props); 
    console.log(selectedValues); 
    //if(selectedValues.length) renderSelectedChips() ;

    /**********************************
    *  HANDLE COMPONENT ON MOUNT
    **********************************/
    useEffect(() => {
        window.addEventListener('click', (e: any) => {
            //console.log(e);
            /* console.log(e.target.classList.contains('menu-options'));
            console.log(e.target.classList.contains('select-header')); */
            e.stopPropagation();
            if (!e.target.classList.contains('chip') && !e.target.classList.contains('menu-options') && !e.target.classList.contains('select-header')) setIsOpen(false)
        }); 
        
    }, []);

   /*  useEffect(() => {
        console.log('mult select useEffect', selectedValues);
        console.log('selectedOptions useEffect ...');
        setSelectedOptions(selectedValues);
        console.log(selectedOptions);
    }, [selectedValues]) */

    const toggleMenu = () => {
        /* console.log('toggleMenu');
        console.log(isOpen); */
        setIsOpen(!isOpen);
    } 
    const handleSelectOptions2 = (option: any) => { 
       // console.log(option);
        if (option === '') return;

        if (selectedOptions.includes(option)) {
            setSelectedOptions((prevState:any) => (prevState.filter((item: any) => item !== option)));
        } else {
           setSelectedOptions((prevState:any) => ([...prevState, option])); 
        } 
        /*******
         * IF selectedOptions HAS OPTION ALREADY, DO NOTHING
         * ELSE push options to selectedOptions  
         * 1ST TIME - ADD options to selectedOption 
         */

        
        /* if(selectedOptions.length === 0) { 
            setSelectedOptions((prevState:any) => ([...prevState, option]));
            return;
        } 
        selectedOptions.forEach((item:any) => {
            if(item.label === option.label) {
                setSelectedOptions(selectedOptions.filter((item:any) => item.label !== option.label));  
              //  return arr.filter((item:any) => item.label !== option.label)
            } else {
                setSelectedOptions((prevState:any) => ([...prevState, option]));
            }
            
        }) */
        //setSelectedOptions((prevState:any) => ([...prevState, option])); 
        /* if(selectedOptions.length === 0) { 
            setSelectedOptions((prevState:any) => ([...prevState, option]));
            return;
        } */
        
        /* selectedOptions.forEach((item:any) => {
            console.log(item.label)
            console.log(option.label)
            if(item.label !== option.label) {
               // console.log('if.. ledu item')
                setSelectedOptions((prevState:any) => ([...prevState, option])); 
            } else {
                //console.log('else.. undi item')
                setSelectedOptions(selectedOptions.filter((item:any) => item.label !== option.label)); 
            }
        }) */
        toggleMenu();  
    }

    const handleSelectOptions = (option:any) => {
        console.log("handleSelectOptions");
        if (option.value === "") return; 
        setSelectedOptions((prevState:any) => { 
            const [index, isExists]:any = doesObjectExists(prevState, option);
            console.log("isExists");
            console.log(isExists);
            if (isExists) { 
                if(index < 0) return;
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
      const doesObjectExists = (prevState:any, option:any) => {
        let exists = false;
        for (let x in prevState) {
            console.log('x')
            console.log(x)
          if (prevState.hasOwnProperty(x) && prevState[x] === option) {
            exists = true;
            console.log(x);
            return [x, exists];
          }
        }
        return [-1, exists];
      };

    useEffect(() => {  
        console.log('selectedOptions useEffect...');
        console.log(selectedOptions);
        //props.props.onChange(selectedOptions, id);
    }, [selectedOptions]);

    const renderSelectedChips = () => { 
        console.log('renderSelectedChips Multi');
        console.log(selectedOptions);
        return selectedOptions.map((option:any) => {
            return (<span className="chip" key={option.value}>{option.label}</span>)
        })
    }
    return (
        <div key={id} style={{width:'100%'}}>  
            <label>{label}</label>
            <div className="select-container">
                <div className="select-header" onClick={toggleMenu}> 
                    {/* {selectedOptions.length } */}
                    {selectedOptions.length ? renderSelectedChips() : label}
                   {
                        selectedOptions.map((option:any) => {
                            return (<span className="chip" key={option.value}>{option.label}</span>)
                        })
                    }
                </div>
                {/* <div className="select-header">{label}</div> */}
                {
                    isOpen &&
                    <div className="select-options" ref={selectBox}>
                        {
                            options.map((option: any) => {
                                return <span id={option} className="menu-options" key={option.label} onClick={() => {handleSelectOptions(option)}}>
                                    {/* {
                                        selectedOptions.includes(option) ? <FaCheck /> : ''
                                    } */}
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
export default Selectbox;