import { React, useState, useEffect } from 'react';
import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
// Router
import { NavLink, useNavigate } from "react-router-dom";
// Zod
import { z } from "zod";
// API
import * as apiUser from '../api/user'

const LoginPage = () => {
    const [hidePassword, setHidePassword] = useState(true);

    // Backend => API loginUser
    const login = async (email, password) => {
        try {
        const data = await apiUser.loginUser(email,password);
        console.log(data)
        if (data.data.success) {
            // Collect userId in localStorage
            localStorage.setItem("userAccount", data.data.data.id);

            // Navigate to home page
            navigate("/home");
        }
        } catch (e) {
            console.log(e);
            // set error in localStorage when data is not correct
            localStorage.setItem("error", "Email or password is wrong");
            window.location.reload();
        } 
    }

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const userSchema = z.object({
        email: z.string().email("Email is wrong"),
        password: z.string().min(4, "Wrong passwrod")
    });

    const navigate = useNavigate();
    
    const [errors, setErrors] = useState({});
    const [errorText, setErrorText] = useState();

    // When click submit form it will run here and check inputs are email and password
    const handleSubmit = (e) => {
        e.preventDefault();
        const result = userSchema.safeParse(formData);
        if (result.success) {
        console.log("Validation successful:", result.data);
        // API
        login(formData.email, formData.password);
        } else {
        console.log("Validation errors:", result.error.errors);
        setErrorText("")
        const errorMap = {};
        result.error.errors.forEach((err) => {
            errorMap[err.path[0]] = err.message;
        });
        setErrors(errorMap);
        }
    };

    useEffect(() => {
        const savedError = localStorage.getItem("error");
        if (savedError) {
            setErrorText(savedError);
            localStorage.removeItem("error");
        }
    }, []);

  return (
    <>
    <div className='bg-[linear-gradient(to_right,_#FF09DA_0%,_#B8019C_16%,_#46003B_68%)] flex justify-center items-center h-screen'>
    <div className='bg-black/25 flex flex-col items-center w-[600px] p-5 pb-10 border-4 rounded-lg shadow-lg max-sm:w-[360px]'>
        <h1 className='text-[36px] font-bold mb-5 text-white'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-ce w-full max-w-[475px]'>
            <label className='text-[24px] font-bold text-white mb-1'>Email</label>
            {errorText && <span className='text-red-600'>{errorText}</span>}
            {errors.email && <span className='text-red-600'>{errors.email}</span>}
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required placeholder='Enter your username' className='text-[16px] text-white border-b-5 border-white px-3 py-2 mb-3 w-full'/>
            <label className='text-[24px] font-bold text-white mb-1'>Password</label>
            {errors.password && <span className='text-red-600'>{errors.password}</span>}
            <div className='flex items-center mb-3'>
                <input type={hidePassword ? "password" : "text"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required placeholder='Enter your password' className='text-[16px] text-white border-b-5 border-white px-3 py-2 w-full'/>
                {hidePassword ? <LuEyeOff onClick={() => setHidePassword(false)} className='-ml-8 text-white text-[24px] cursor-pointer'/> : <LuEye onClick={() => setHidePassword(true)} className='-ml-8 text-white text-[24px] cursor-pointer'/>}
            </div>
            <div className='flex justify-center'>
                <button type='submit' className='text-[18px] w-[75%] text-black font-bold bg-white my-10 rounded-lg'>
                    <button className='w-full text-[18px] py-2 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-[#FF00C8] hover:to-[#990078] cursor-pointer'>
                        login
                    </button>
                </button>
            </div>
        </form>
        <p className='font-semibold text-[18px] text-white'>Don't have an account <NavLink to={"/register"} className='font-normal font-semibold underline cursor-pointer hover:font-bold'>register</NavLink> here</p>
    </div>
    </div>
    </>
  )
}

export default LoginPage