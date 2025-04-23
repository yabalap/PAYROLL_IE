import '../css/login.css';
import IE_logo from '../assets/IE_logo.svg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            console.log("Login response:", response.data);

            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token); // correct

                if (response.data.user.role === "admin") {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/employee-dashboard');
                }
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Server Error");
            }
        }
    };

    return (
        <div className='LOGINcontainer'>
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <h1 id="company">I & E CONSTRUCTION CORPORATION</h1>
                    {error && <p className='text-red-500'>{error}</p>}
                    
                    <input
                        type='email'
                        placeholder='Enter email'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type='password'
                        placeholder='Enter password'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button id="btnlogin" type="submit">Login</button>
                </form>
            </div>

            <div className="login image-container">
                <img src={IE_logo} alt="Company Logo" className="logo" />
            </div>
        </div>
    );
};

export default Login;
''