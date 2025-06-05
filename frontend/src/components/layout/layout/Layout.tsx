import { useContext } from 'react';
import Login from '../../auth/login/Login';
import Header from '../header/Header';
import Routing from '../routing/Routing';
import './Layout.css'
import { AuthContext } from '../../auth/auth/Auth';
import { useNavigate } from 'react-router-dom';

function Layout(): JSX.Element {

    const navigate = useNavigate();
    const { jwt } = useContext(AuthContext)!
    const isLoggedIn: boolean = !!jwt

    return (
        <>
            {isLoggedIn ? 
                <div className='Layout'>
                    <header>
                        <Header />
                    </header>
                    <main className="main-container">
                        <Routing />

                        <button className="fab" onClick={() => navigate('/add-appointment')}>
                            +
                        </button>
                    </main>
                </div>
            : 
                <Login />
            }
        </>
    )
}

export default Layout;