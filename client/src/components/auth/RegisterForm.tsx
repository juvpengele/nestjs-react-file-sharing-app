import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { authService } from "../../services/AuthService";

const validationSchema = Yup.object({
  name: Yup.string().required('Name field is required'),
  email: Yup.string().required('Email field is required').email('Please provide a valid email'),
  password: Yup.string().required('Password is required').min(8, 'Password should have at least 8 characters')
});

export interface RegisterFormData {
  name: string,
  email: string,
  password: string,
}

function RegisterForm() {

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit: SubmitHandler<RegisterFormData> = async (formData: RegisterFormData) => {


    try {
      const response = await authService.register(formData);
    } catch (error) {

    }
  }

  return (
    <div className="flex-1 flex items-center h-full w-full lg:w-1/2 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-5xl font-semibold">Register</h1>
        <p className="text-gray-400 mt-4 mb-12">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eveniet
          reprehenderit obcaecati temporibus quisquam, illo nemo,
        </p>
        <div className="my-4 flex  justify-between">
          <label htmlFor="">Name</label>
          <div className="flex flex-col">
            <input type="text" className="form-input" {...register('name', { required: true})} />
            <small className="text-red-600">{ errors.name?.message }</small>
          </div>
        </div>
        <div className="my-4 flex justify-between">
          <label htmlFor="">Email</label>
          <div className="flex flex-col">
            <input type="email" className="form-input" {...register('email', { required: true,}) }/>
            <small className="text-red-600">{ errors.email?.message }</small>
          </div>
        </div>
        <div className="my-4 flex justify-between">
          <label htmlFor="">Password</label>
          <div className="flex flex-col">
            <input type="password" className="form-input" {...register('password', { required: true, minLength: 6 })}/>
            <small className="text-red-600">{ errors.password?.message }</small>
          </div>
        </div>
        <div className="flex justify-end my-2">
          <button className="btn btn--green">Register</button>
        </div>
        <hr className="my-6"/>
        <div className="text-center my-8">
            Vous avez déjà un compte ? 
            <Link to="/login" className="text-blue-600  ml-1">Connectez-vous</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
