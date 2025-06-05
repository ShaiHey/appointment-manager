import { useForm } from 'react-hook-form';
import './Login.css'
import LoginModel from '../../../models/user/Login';
import auth from '../../../services/auth';
import { useContext } from 'react';
import { AuthContext } from '../auth/Auth';
import { ToastContainer, toast } from 'react-toastify';

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<LoginModel>()
    const { newLogin } = useContext(AuthContext)!

    async function submit(login: LoginModel) {
        await auth.login(login)
            .then(userJwt => newLogin(userJwt))
            .catch(error => {
                toast.error(error.response?.data || error.message);
            })
    }

    return (
        <div className='Login'>
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" placeholder="Enter your email" type="email" {...register('email')} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" placeholder="Enter your password" type="password" {...register('password')} />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;