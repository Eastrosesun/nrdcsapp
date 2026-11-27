
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const ToasterComponent = (props: any) => {
    const {data, onClose, type} = props;
    useEffect(() => {
        /* let timer = setInterval(()=> {
            console.log('toaster')
        }, 1000) */

        setTimeout(() => {
            //clearInterval(timer);
            console.log('timer stopped', data)
            document.getElementById(`${data.id}`)?.classList.remove('show')
            document.getElementById(`${data.id}`)?.classList.add('hide')
            onClose(data.id)
        }, 10000)
        
    }, [])
    return(
        <>
            <div onClick={ onClose } className = {data.type==='success' ? 'toaster-container__toast show success' : 'toaster-container__toast show error'} id={data.id}>
                <span className='toaster-container__toast__message'>{data.message}</span>
                <span className='toaster-container__toast__close-btn'><IoClose /></span>
            </div>
        </>
    )
}

export default ToasterComponent