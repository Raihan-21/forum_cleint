import './navbar.css'
import { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
const Navbar = () => {
    const history = useHistory()
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const currentUser = useSelector(state => state.currentUser)
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const logout = async () => {
        const res = await fetch('/api/logout')
        const data = await res.json()
        if(data.result){
            dispatch({type: 'logout'})
            history.push('/discussions')
        }
    }
    const Auth = () => {
        if(!isLoggedIn){
            return <div className="auth-status">
                        <Link className="menu" to="/discussions">Home</Link>
                        <Link className="menu" to="/login">Login</Link>
                        <Link className="menu" to="/signup">Signup</Link>
                    </div>
        }
        else{
            return <div className="auth-status">
                <Link className="menu" to="/discussions">Home</Link>
                <div className="menu">Hi, {currentUser.username}</div>
                <button onClick={logout} className="menu">Logout</button>
            </div>
        }
    }
    const submit = (e) => {
        e.preventDefault()
        history.push(`/discussions?search=${search}`)

    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/auth')
            const data = await res.json()
            if(data.result){
                dispatch({type: 'login', payload: {email: data.result.email, username: data.result.fullname}})
            }
        }
        fetchData()
    }, [])
    return ( 
        <div className="navbar" id="navbar">
            <Link to="/"><h1>Stuck!</h1>  </Link>
            <form onSubmit={e => submit(e)}>
                <input onChange={e => setSearch(e.target.value)}></input>
                <button type="submit" className="search" ><img src="/images/magnifying-glass.png"></img></button>
            </form>
            {Auth()}
        </div>
     );
}
 
export default Navbar;