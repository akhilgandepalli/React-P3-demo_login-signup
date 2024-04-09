import styles from './Main.module.css'
import { useEffect, useState } from 'react';

const Main = () =>{
    const [action, setAction] = useState('Login');
    const [inputs, setInputs] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const inputUpdate = (e)=>{
        const {name, value} = e.target;
        setInputs(val=>({...val,[name]:value}));
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        // setData(e=>([...e,inputs]))
        setFormErrors(validate(inputs));
        setIsSubmit(true);
    }
    const validate = (values)=>{
        let errors={};
        let emailRegex=/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
        if(action==='Signup'){
            if(!values.username){
                errors.username='Username is required!';
            }
        }
        if(!values.email){
            errors.email='Email is required!';
        }else if(!emailRegex.test(values.email)){
            errors.email='Enter valid email!'
        }
        if(!values.password){
            errors.password='Password is required!';
        }else if(values.password.length < 4 || values.password.length > 11){
            errors.password='Password length must be from 5 to 10';
        }
        return errors;
    }

    useEffect(()=>{
        {Object.keys(formErrors).length === 0 && isSubmit ? console.log(inputs):console.log(formErrors)}
    },[formErrors]);

    useEffect(()=>{
        setFormErrors({});
        setIsSubmit(false);
    },[action])
    useEffect(()=>{
        setInputs({});
    },[isSubmit,formErrors])

    return(
        <div className={`${styles.main}`}>
            {Object.keys(formErrors).length === 0 && isSubmit ?(action==='Login'?<article className={`${styles.popup}`}>Login-In Succesfull!</article>:<article className={`${styles.popup}`}>Sign-In Succesfull!</article>):<></>}
            <div>
                <dir>
                    <button 
                    className={action==='Login'?`${styles.login} active`:`${styles.login}`} 
                    onClick={()=>{setAction('Login')}}>Login</button>
                    <button 
                    className={action==='Signup'?`${styles.signup} active`:`${styles.signup}`} 
                    onClick={()=>{setAction('Signup')}}>Signup</button>
                </dir><hr/>
                <form onSubmit={submitHandler}>
                    {action==='Login'?<></>:
                    <>
                    <input 
                    type="text" 
                    name='username' 
                    onChange={inputUpdate} 
                    value={inputs.username || ""} 
                    placeholder="Name" />
                    <p>&nbsp;{formErrors.username}</p>
                    </>}

                    <input 
                    type="text" 
                    name='email' 
                    onChange={inputUpdate} 
                    value={inputs.email || ""} 
                    placeholder="Email" />
                    <p>&nbsp;{formErrors.email}</p>

                    <input 
                    type="password" 
                    name='password' 
                    onChange={inputUpdate} 
                    value={inputs.password || ""} 
                    placeholder="Password" />
                    <p>&nbsp;{formErrors.password}</p>

                    {action==='Signup'?<><p></p></>:<a href="#">forgot password?</a>}
                    <button className={`${styles.submit}`} type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Main;