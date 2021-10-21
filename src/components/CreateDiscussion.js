import { useState, useEffect } from "react";
import {useHistory, Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux';
const CreateDiscussion = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const currentUser = useSelector(state => state.currentUser)
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const [values, setValues] = useState({
        category: '',
        content: '',
        title: ''
    })
    const [errors, setErrors] = useState({
        category: '',
        content: '',
        title: ''
    })

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
    const submit = async (e) => {
        e.preventDefault()
        if(checkValue()){
            try {
                const res = await fetch('/api/create', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({user_email: currentUser.email, title: values.title, category: values.category, content: values.content})
                })
                const data = await res.json()
                console.log(data.result)
                history.push('/discussions')
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        const controller = new AbortController()
        const fetchData = async () => {
            try{
                const res = await fetch('/api/categories')
                const data = await res.json()
                setCategories(data.result)
            }
            catch(err){
              console.log(err)
            }
          }
      fetchData()
      return () => controller.abort()
    }, [])
    if(!isLoggedIn){
        //  history.push('/login')
        return <Redirect push to="/login" />
    }
    return ( 
        <div className="container" id="create">
            <form onSubmit={e => submit(e)} className="content">
                <h1>Ask your question</h1>
                <div className={`input-container ${errors.title ? 'error' : ''}`}>
                    <label>Title</label>
                    <input className="input" onChange={e => setValues({...values, title: e.target.value})}></input>
                    <div>{errors.title}</div>
                </div>
                <div className={`input-container ${errors.category ? 'error' : ''}`}>
                <label>Categories</label>
                    <select className="input" onChange={e => setValues({...values, category: e.target.value})}>
                    {categories && categories.map(category => {
                        return <option key={category._id} value={category.name}>{category.name}</option>
                    })}
                    </select>
                    <div>{errors.category}</div>
                </div>


                <div className={`input-container ${errors.content ? 'error' : ''}`}>
                    <label>Content</label>
                    <textarea className="input" onChange={e => setValues({...values, content: e.target.value})}></textarea>
                    <div>{errors.content}</div>
                </div>

                <button type="submit" className="submit">Post</button>
            </form>
        </div>
     );
}
 
export default CreateDiscussion;