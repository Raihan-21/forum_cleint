import { useState} from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
const Login = () => {
    const [login, setLogin] = useState('')
    const history = useHistory()
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })
    const changeValue = (name, value) => {
        setValues({...values, [name]: value})
    }
    const dispatch = useDispatch()
    const checkValue = () => {
        return Object.keys(values).map(key => {
                    if(!values[key]){
                        setErrors(prevState => ({...prevState, [key]: `${key} field must not be empty`}))
                    }
                    else{
                        setErrors(prevState => ({...prevState, [key]: ``}))
                    }
                    return key
                }).every(prop => values[prop])
    }
    const submit = async (e, values) => {
        e.preventDefault()
        if(checkValue()){
            try {
                const res = await fetch('https://forum-fullstack.herokuapp.com/api/login', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(values)
                })
                const data = await res.json()
                if(data.result){
                    dispatch({type: 'login', payload: {email: data.result.email, username: data.result.fullname}})
                    history.push("/discussions")
                }
                else{
                    setLogin(data.error)
                    setValues({...values, password: ''})
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    return ( 
        <div className="container auth login">
            <form onSubmit={e => submit(e, values)}>
                <h1>Login</h1>
                <div className={ `input-container ${errors.email ? 'error' : ''}`}>
                    <label>Email</label>
                    <input className="input" value={values.email}  onChange={e => changeValue('email', e.target.value)}></input>
                    <div >{errors.email}</div>
                </div>
                <div className={ `input-container ${errors.password ? 'error' : ''}`}>
                    <label>Password</label>
                    <input className="input" value={values.password} type="password"  onChange={e => changeValue('password', e.target.value)}></input>
                    <div >{errors.password}</div>
                </div>

                <button type="submit" className="submit">Login</button>
                <div style={{color: "red"}}>{login}</div>
            </form>
        </div>
     );
}
 
export default Login;