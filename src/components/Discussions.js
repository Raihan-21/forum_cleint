import { useState, useEffect } from "react";
import {Link, useLocation} from 'react-router-dom'
import Sidebar from './Sidebar'
const Discussions = () => {
    const [posts, setPosts] = useState([])
    const [menu, setMenu] = useState('all')
    const [filteredPosts, setFilteredPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()
    const changeMenu = (category) => {
        setMenu(category)
    }
    useEffect(() => {
        setIsLoading(true)
        const controller = new AbortController()
        const fetchData = async () => {
            try{
                setTimeout(async () => {
                    const res = await fetch('https://forum-fullstack.herokuapp.com/api/discussions')
                    const data = await res.json()
                    const query = new URLSearchParams(location.search)
                    if(query.get("search")){
                        const match = data.result.filter(post => {
                            return post.title.toLowerCase().includes(query.get("search")) || post.content.toLowerCase().includes(query.get("search"))
                        })
                        setPosts(match)
                        setFilteredPosts(match)
                    }
                    else{
                        setPosts(data.result)
                        setFilteredPosts(data.result)
                    }
                    setIsLoading(false)
                }, 500)

            }
            catch(err){
              console.log(err)
            }
          }
      fetchData()
      return () => controller.abort()
    }, [location.search])
    useEffect(() => {
        if(menu === 'all'){
            setFilteredPosts(posts)
        }
        else{
            const filtered =  posts.filter(post => {
                return post.category === menu
                })
            setFilteredPosts(filtered)
        }
    }, [posts, menu])


    return ( 
        <div className="container container-discussions">
            <Sidebar menu={menu} changeMenu={changeMenu} />
            <div className="content posts">
                <div className="header">
                    <h1>Discussions</h1>
                    <Link to="/discussions/create"><span>Ask a question</span></Link>
                </div>
                
                {isLoading && <div className="content">Loading...</div>}
                {filteredPosts && filteredPosts.map(post => {
                    return <div className="discussion" key={post._id}>
                                <Link to={`/discussions/${post._id}`}><h3>{post.title}</h3></Link> 
                                <p>{post.content}</p>
                                <div className="bottom">
                                    <p>asked by {post.fullname}</p>
                                    <div className="like">
                                        <img src="/images/like.png" alt="profile-img"></img>
                                        <span className="like-count">{post.like}</span>
                                        <img src="/images/comment.png" alt="like"></img>
                                        <span>{post.answers}</span>
                                    </div>
                                </div>
                            </div>
                })}
            </div>
        </div>
     );
}
 
export default Discussions;