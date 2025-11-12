"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signup, googleLogin } from "../utils/api";
import Joi from "joi";

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
});

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ 
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    
    const { error } = registerSchema.validate({ firstName, lastName, username, email, password, confirmPassword }, { abortEarly: false });
    if (error) {
      const formattedErrors = error.details.reduce<Record<string, string>>((acc, curr) => {
        acc[curr.path[0] as string] = curr.message;
        return acc;
      }, {});      
      setErrors(formattedErrors);
      return;
    }

    try {
      const data = await signup(firstName, lastName, username, email, password);
      document.cookie = `token=${data.token}; path=/; secure; HttpOnly`;
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const data = await googleLogin();
      document.cookie = `token=${data.token}; path=/; secure; HttpOnly`;
      router.push("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[450px]">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl text-gray-400 cursor-pointer hover:text-gray-600 transition" onClick={() => router.push("/login")}>Log in</h2>
          <h2 className="text-2xl font-semibold text-gray-600 border-b-2 border-gray-400 pb-1">Sign up</h2>
        </div>

        <button onClick={handleGoogleSignup} className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 p-3 rounded-md hover:bg-gray-100 transition mb-4">
          <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex space-x-2">
            <input type="text" placeholder="First name" className="w-1/2 p-3 border rounded-md" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <input type="text" placeholder="Last name" className="w-1/2 p-3 border rounded-md" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

          <input type="text" placeholder="Username" className="w-full p-3 border rounded-md" value={username} onChange={(e) => setUsername(e.target.value)} required />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full p-3 border rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" className="absolute right-3 top-3" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <div className="relative">
            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" className="w-full p-3 border rounded-md" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="button" className="absolute right-3 top-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff /> : <Eye />}</button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">Signup</button>
        </form>
      </div>
    </div>
  );
}
