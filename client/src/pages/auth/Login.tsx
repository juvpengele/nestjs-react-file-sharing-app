import { FC } from 'react';
import { Link } from 'react-router-dom';

const Login: FC = () => {
    return (
        <div>
            <h1 className="text-5xl font-semibold">Login</h1>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Login;