import axios from 'axios';
import { RegisterFormData } from '../components/auth/RegisterForm';
import { env } from '../config/env';

export function registerUser(data: RegisterFormData) {
    console.log(data);
    //return axios.post(env("API_URL") + "/register", data);
}
