import { RegisterFormData } from "../components/auth/RegisterForm";
import { registerUser } from '../api';

class AuthService {
    register(userData: RegisterFormData) {
        return registerUser(userData);
    }
}

export const authService = new AuthService();
