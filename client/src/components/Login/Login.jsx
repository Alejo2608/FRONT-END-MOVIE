import { useState } from "react";
import axios from "axios";
import uvR from "../../assets/movie.png"
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3000/login";
			const { data: res } = await axios.post(url, data);
			const id=res.token
			localStorage.setItem("token", JSON.stringify(res.token));
			localStorage.setItem("imgPerfil", JSON.stringify(res.user.imgPerfil));
			localStorage.setItem("username", JSON.stringify(res.user.username));
			localStorage.setItem("rol", JSON.stringify(res.user.rol));
			navigate('/home');
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.messageError);
			}
		}
	};

	return (
		<div className='w-full min-h-screen flex justify-center items-center'>
			<div className='w-full h-[31rem] m-8 grid grid-cols-5 rounded-lg shadow-md shadow-black/20'>
			<div className='col-span-2 flex flex-col bg-black justify-center items-center rounded-l-lg'>
				<h1 className="e">BIENVENIDO</h1>
				<img src={uvR} alt="img_not_fund" className="h-60"/>
			</div>
        	<div className='col-span-3 flex flex-col justify-center items-center rounded-r-lg'>
					<form className='flex flex-col items-center' onSubmit={handleSubmit}>
						<h1 className="e">Inicia Sesion</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className='w-80 p-4 bg-orange-300 my-2 text-sm rounded-lg'
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className='w-80 p-4 bg-orange-300 my-2 text-sm rounded-lg'
						/>
						{error && <div className='w-80 p-4 my-2 text-sm text-white bg-red-500 text-center rounded-lg'>{error}</div>}
						<button type="submit" className='text-white m-2 bg-orange-500 px-3 py-2 w-44 font-bold text-sm rounded-2xl cursor-pointer'>
							Entrar
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;

