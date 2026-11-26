const Validator =  {
    required: (value:any) => {
        console.log('into Required method');
        //console.log(value);
        if(value === '' || value === null) {
            return true;
        } else {
            return false;
        }
        
    },
    validateInput: (validators:any, value:any) => {
        console.log(validators);
        for(let validator of validators) {
           // console.log(validator['check']);
            let error = validator['check'](value);
         //   console.log(error);
            return error;
        }
    }
}
export default Validator;