import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div></div>
            <div style={{textAlign: 'center'}}>
                <Link to={"/"} className='title-link'>
                    <h1>Faves List</h1>
                </Link>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'right', paddingRight: '1.2rem'}}>
                <Link to={"/create"}>
                    <button>Create Character</button>
                </Link>
            </div>
        </div>
    )
};

export default Navbar;