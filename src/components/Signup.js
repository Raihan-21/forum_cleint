import { useState } from "react";
import { useHistory } from 'react-router-dom'
const Signup = () => {
    const [values, setValues] = useState({
        email: '',
        fullname: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        email: '',
        fullname: '',
        password: ''
    })
    const changeValue = (name, value) => {
        setValues({...values, [name]: value})
    }
    const history = useHistory()
    const checkValue = () => {
        return Object.keys(values).map(key => {
                    if(!values[key]){
                        setErrors(prevState => ({...prevState, [key]: `${key} field must not be empty`}))
                    }
                    else{
                        setErrors(prevState => ({...prevState, [key]: ``}))
                    }
                    return key
                }).every(key => values[key])
    }
    const submit = async (e) => {
        e.preventDefault()
        if(checkValue()){
            try {
                const res = await fetch('https://forum-fullstack.herokuapp.com/api/signup', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(values)
                })
                const data = await res.json()
                if(data.result){
                    setValues({email: '', fullname: '', password: ''})
                    history.push('/login')
                }
                else{
                    setErrors({...errors, email: 'This email has been taken'})
                    setValues({...values, password: ''})
                    console.log(data.error)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    return ( 
        <div className="container auth signup">
            <form onSubmit={e => submit(e)}>
                <h1>Signup</h1>
                <div className={ `input-container ${errors.email ? 'error' : ''}`}>
                    <label>Email</label>
                    <input className="input" value={values.email} onChange={e => changeValue('email', e.target.value)}></input>
                    <div >{errors.email}</div>
                </div>
                <div className={ `input-container ${errors.fullname ? 'error' : ''}`}>
                    <label>Name</label>
                    <input className="input" value={values.fullname} onChange={e => changeValue('fullname', e.target.value)}></input>
                    <div >{errors.fullname}</div>
                </div>
                <div className={ `input-container ${errors.password ? 'error' : ''}`}>
                    <label>Password</label>
                    <input className="input" value={values.password} type="password"  onChange={e => changeValue('password', e.target.value)}></input>
                    <div >{errors.password}</div>
                </div>
                <button type="submit" className="submit">Login</button>
            </form>
        </div>
     );
}
 
export default Signup;