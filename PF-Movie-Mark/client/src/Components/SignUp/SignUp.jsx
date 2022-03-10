import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../Actions';
import styles from './SignUp.module.css';

const SignUp = () => {
    const [input,setInput] = useState({
        name:'',
        lastName:'',
        email:'',
        password:'',
    })
    const [error,setError] = useState({
        name:false,
        lastName:false,
        email:false,
        password:false,
    })
    const [allowed,setAllowed] = useState(false);
    
    const history = useNavigate();
    const dispatch = useDispatch();

    function validate_email(str){
        let pattern =  new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        return !!pattern.test(str);
    }

    function validate_name(str){
        let pattern = new RegExp("\[A-Z\]\[a-z\]{1,}"); //CAMBIAR REGEXP.... NO deberia aceptar espacios en blanco porque rompe... El back rompe con Jose Maria!
        return !!pattern.test(str);
    }

    function validate_password(str){
        let pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
        return !!pattern.test(str);
    }

    function validate(ipname,ipvalue){
        if(ipname==="name"){
            (validate_name(ipvalue)===true)?setError({...error,name:false}):setError({...error,name:true})
        }
        if(ipname==="lastName"){
            (validate_name(ipvalue)===true)?setError({...error,lastName:false}):setError({...error,lastName:true})
        }
        if(ipname==="email"){
            (validate_email(ipvalue)===true)?setError({...error,email:false}):setError({...error,email:true})
        }
        if(ipname==="password"){
            (validate_password(ipvalue)===true)?setError({...error,password:false}):setError({...error,password:true})
        }
        if(error.email===true || error.lastName===true || error.name===true || error.password===true){
            setAllowed(false); //No permitido, tengo errores
        } 
        else setAllowed(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(allowed===true){
            dispatch(createUser(input))
            .then(()=>{
                history('/login');
                window.location.reload();
                setInput({
                    name:'',
                    lastName:'',
                    email:'',
                    password:'',
                })
            })
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        validate(e.target.name,e.target.value);
    }

    return(
        <div className={styles.page}>
            <form onSubmit={e=>handleSubmit(e)}>
                <input className={styles.input}
                value={input.name} type='text' name='name' placeholder="Name" onChange={e=>handleChange(e)}>
                </input>

                <input className={styles.input}
                value={input.lastName} type='text' name='lastName' placeholder="Last Name" onChange={e=>handleChange(e)}>
                </input>

                <input className={styles.input}
                value={input.email} type='text' name='email' placeholder="Email" onChange={e=>handleChange(e)}>
                </input>

                <input className={styles.input}
                value={input.password} type='password' name='password' placeholder="Password" onChange={e=>handleChange(e)}>
                </input>

                <div>
                    {input.name.trim()===''||
                    input.lastName.trim()===''||
                    input.email.trim()===''||
                    input.password.trim()===''?<button disabled type="submit">Sign up</button>:<button type="submit">Sign up</button>}
                </div>
                <div>
                    <p>Do you have an account?</p>
                    <Link to={'/login'}>
                        <button>Login</button>
                    </Link>
                </div>
    
                <div>
                    {error.name===true && input.name.trim()!==''?<p>Name not valid</p>:<></>}
                    {error.lastName===true && input.lastName.trim()!==''?<p>Last Name not valid</p>:<></>}
                    {error.email===true && input.email.trim()!==''?<p>Email not valid</p>:<></>}
                    {error.password===true && input.password.trim()!==''?<p>Minimum eight characters, at least one letter and one number</p>:<></>}
                </div>
            </form>
        </div>
    )
}

export default SignUp; 