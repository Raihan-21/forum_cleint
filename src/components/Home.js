import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
const Home = () => {
    // const [post, setPost] = useState('')
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try{
    //         const res = await fetch('/home')
    //         const data = await res.json()
    //         setPost(data.result)
    //         }
    //         catch(err){
    //           console.log(err)
    //         }
    //       }
    //   fetchData()
    // }, [])
    return ( 
        <div className="container home">
            <h1 className="animate mt-3" id="homeheader">Stuck!</h1>
            <p className="animate">Join our community!</p>
            <p className="animate">Find a solution for your problems or</p>
            <p className="mb-5 animate">Contribute to others by giving answers!</p>
            <Link to="/discussions" className="link animate">Go to Forum</Link>
        </div>
     );
}
 
export default Home;