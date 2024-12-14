import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div></div>
            <div style={{textAlign: 'center'}}>
                <Link to={"/"}>
                    <h1>Faves List</h1>
                </Link>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'right', paddingRight: '1rem'}}>
                <Link to={"/create"}>
                    <button>Create character</button>
                </Link>
            </div>
        </div>
    )
};

export default Navbar;