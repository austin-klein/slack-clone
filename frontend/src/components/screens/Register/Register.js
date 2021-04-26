import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css'


const Register = ({ history }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
        }

        if (password !== confirmPassword) {
            setPassword('')
            setConfirmPassword('')
            setTimeout(() => {
                setError('');
            }, 4000);
            return setError('Passowords do not match');
        }

        try {
            const { data } = await axios.post('/register', { username, password, image }, config);
            console.log(data);
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
            <form className="register-form" onSubmit={submitHandler}>
                {error && <span>{error}</span>}
                <h1>Register</h1>
                <div className="group">
                    <input required type="text" id="name" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>


                <div className="group">
                    <textarea required type="text" id="image" placeholder="Link to Profile Pic -https://example-image.png" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>

                <div className="group">
                    <input required type="password" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="group">
                    <input required type="password" id="confirmpassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type='submit'>Submit</button>
                <span>Already have an account? <Link to='/login'>Login</Link></span>
            </form>
        </div>
    )

}

export default Register;