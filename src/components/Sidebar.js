import './sidebar.css'
const Sidebar = ({menu, changeMenu}) => {
    return ( 
        <div className="sidebar">
            <h1>Categories</h1>
            <button onClick={e => changeMenu('all')} className={`filter ${menu === 'all' ? 'active' : ''}`}>All</button>
            <button onClick={e => changeMenu('node.js')} className={`filter ${menu === 'node.js' ? 'active' : ''}`}>Node.js</button>
            <button onClick={e => changeMenu('laravel')} className={`filter ${menu === 'laravel' ? 'active' : ''}`}>Laravel</button>
        </div>
     );
}
 
export default Sidebar;