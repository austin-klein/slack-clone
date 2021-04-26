import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';


const Login = ({ history }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            history.push('/main');
        }
    }, [history]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const { data } = await axios.post('/login', { username, password }, config);

            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', username);

            history.push('/Main Room');
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError('');
            }, 4000);
        }
    }

    return (
        <div>
            <form className="login-form" onSubmit={submitHandler}>
                {error && <span>{error}</span>}
                <h1>Login</h1>
                <div className="group">
                    <input required type="text" id="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="group">
                    <input required type="password" placeholder="Enter Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit'>Submit</button><br />
                <span>Don't have an account? <Link to='/register'>Register</Link></span>
            </form>
        </div>
    )

}

export default Login;