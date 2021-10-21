import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import './index.css'
const Explore = () => {
    return ( 
        <div className="container">
            <Sidebar />
            <div className="content">
                <div className="header">
                    <h1>Categories</h1>
                    <Link to="/discussions/create"><span>Ask a question</span></Link>
                </div>
                <div className="categories">
                    <Link to="/discussions/categories/node.js">
                    <div className="category">
                        <div>
                            <h2>Node.JS</h2>
                            <p>Explore discussions all about Node.js!</p>
                        </div>

                        <div>
                            <h3>Last Topic</h3>
                            <div></div>
                        </div>
                    </div>
                    </Link>
                    <Link to="/discussions/categories/laravel">
                    <div className="category">
                        <div>
                            <h2>Laravel</h2>
                            <p>Explore discussions all about Laravel!</p>
                        </div>

                        <div>
                            <h3>Last Topic</h3>
                            <div></div>
                        </div>
                    </div></Link>


                </div>
            </div>
        </div>
     );
}
 
export default Explore;