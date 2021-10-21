import { useState, useEffect } from "react";
import { useParams} from "react-router";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const ShowDiscussions = () => {
    const [post, setPost] = useState('')
    const [answers, setAnswers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [answer, setAnswer] = useState('')
    const {id} = useParams()
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const currentUser = useSelector(state => state.currentUser)
    const history = useHistory()
    const submit = async (e) => {
        e.preventDefault()
        if(!isLoggedIn){
            history.push('/login')
        }
        if(!answer){
            setError('Please fill in your answer first!')
        }
        else{
            try {
                const res = await fetch('/api/answer', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({user_email: currentUser, content: answer, post_id: id})
                })
                const data = await res.json()
                console.log(data.result)
                setError('')
            } catch (err) {
                console.log(err)
            }
        }
    }
    useEffect(() => {
        const controller = new AbortController()
        const fetchData = async () => {
            try{
                // setTimeout(async () => {
                    const res = await fetch(`/api/discussions/${id}`)
                    const data = await res.json()
                    setPost(data.post)
                    setAnswers(data.answers)
                    setIsLoading(false)

            }
            catch(err){
              console.log(err)
            }
          }
      fetchData()
      return () => controller.abort()
    }, [id])
    return ( 
        <div className="container">
            {isLoading && <div className="content">Loading...</div>}
            {post && <div className="content">
            <div className="header">
                    <h1>{post.title}</h1>
                    <Link to="/discussions/create"><span>Ask a question</span></Link>
                </div>
                <div className="discussion">
                    <p>{post.content}</p>
                    <div className="bottom">
                        <div className="user">
                            <img src="/images/profile-user.png" alt="profile-img"></img>
                            <span>{post.user_fullname}</span>
                        </div>
                        <div className="like">
                            <img src="/images/like.png" alt="like"></img>
                            <span>{post.like}</span>
                        </div>
                    </div>
                </div>
                <h2 className="answers-count">{answers.length} Answers</h2>
                <div className="answers">
                    {answers && answers.map(answer => {
                        return <div key={answer._id} className="answer">
                                <p>{answer.content}</p> 
                                <div className="bottom">
                                    <div className="user">
                                        <img src="/images/profile-user.png" alt="profile-img"></img>
                                        <span>{answer.user_fullname}</span>
                                    </div>
                                    <div className="like">
                                        <img src="/images/like.png" alt="like"></img>
                                        <span>{post.like}</span>
                                    </div>
                                </div>
                            </div>
                    })}
                    
                </div>
                <h3>Submit your answer</h3>
                <form onSubmit={(e) => submit(e)}>
                    <div className={`input ${error ? 'error' : ''}`}>
                        <textarea onChange={(e) => setAnswer(e.target.value)}></textarea>
                        <div>{error}</div>
                    </div>
                    
                    <button type="submit">Submit</button>
                </form>
            </div>}
        </div>
     );
}
 
export default ShowDiscussions;