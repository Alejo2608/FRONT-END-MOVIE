import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react"
import { decodeToken } from "react-jwt";

export default function Form(){
    const navigate=useNavigate()
    const [error,setError]=useState('')
    const [key,setKey]=useState("")
    const [dir,setDir]=useState("")
    const token=localStorage.getItem("token")
    const [data, setData] = useState({
		titulo: "",
        genero:"",
        imagen:null,
        sinopsis:"",
        review:"",
        fechaPubli:"",
        actores:[],
        directores:[],
        franquicia:''
	});
    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
		console.log(data)
	};

    const handleImg = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.files[0] });
		// console.log(data)
	};

    function handleAct(){
        setData({
            ...data,
            actores:[...data.actores]
        })
        if (data.actores.find(i=>i===key)) {
            setError("No puedes agregar 2 actores iguales") 
        }else{
            setData({
                ...data,
                actores:[...data.actores, key]
            })
        }
    }
    function handleDir(){
        setData({
            ...data,
            directores:[...data.directores]
        })
        if (data.directores.find(i=>i===key)) {
            setError("No puedes agregar 2 directores iguales") 
        }else{
            setData({
                ...data,
                directores:[...data.directores, dir]
            })
        }
    }
    const handleArra = ({ currentTarget: input }) => {
        setKey(input.value);
		console.log(key)
	};
    const handleArra2 = ({ currentTarget: input }) => {
        setDir(input.value);
		console.log(key)
	};
    const handleSubmit = async (e) => {
        if (data.imagen===null) {
            e.preventDefault()
            setError("Por favor ingresa la imagen de la pelicula")
        } else if (data.organizador,data.titulo,data.genero,data.fechaPubli,data.review,data.franquicia==="") {
            e.preventDefault()
            setError("Hay campos vacios, todos tienen que llenarse para crear una pelicula")
        }else if (data.actores.length===0) {
            e.preventDefault()
            setError("Por favor agrega los actores de la pelicula")
        }else if (data.directores.length===0) {
            e.preventDefault()
            setError("Por favor agrega los directores de la pelicula")
        }else{
            e.preventDefault();
        console.log(data);
        let body = new FormData()
        data.imagen = data.imagen !== null && (body.append('imagen', data.imagen))
        data.titulo = data.titulo !== '' && (body.append('titulo', data.titulo))
        data.genero = data.genero !== '' && (body.append('genero', data.genero))
        data.sinopsis = data.sinopsis !== '' && (body.append('sinopsis', data.sinopsis))
        data.fechaPubli = data.fechaPubli !== '' && (body.append('fechaPubli', data.fechaPubli))
        data.review = data.review !== '' && (body.append('review', data.review))
        data.actores = data.actores.length !== 0 && (body.append('actores', data.actores))
        data.directores = data.directores.length !== 0 && (body.append('directores', data.directores))
        data.franquicia = data.franquicia !== '' && (body.append('franquicia', data.franquicia))

		try {
			// const url = "http://localhost:3000/movie/create-movies"
			// const { data: res } = await axios.post(url, body,  {
            //     headers: {Authorization: "Bearer " + JSON.parse(token)}
            // });
            // console.log(res)
            navigate('/home')
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 404 &&
				error.response.status <= 500
			) {
				setError(error.response.data.messageError);
			}
		}
        }
        
	};
    useEffect(() => {
        const autenticarUsuario = () => {
            const token = localStorage.getItem("token");
            const rol=localStorage.getItem("rol")
            if(!token){
                navigate("/login");
                return;
            }
        }
        autenticarUsuario()
    },[]) 
    return(
        <div className="flex justify-center m-10 w-98 ...">
            <form className="flex flex-col min-w-[70%] bg-slate-200 p-2 bg-white rounded-lg ..." onSubmit={handleSubmit}>
                <div className="flex justify-center m-2 ...">
                    <h1 className="text-xl font-semibold ...">AÑADE TU PELICULA</h1>
                </div>
                <input 
                type="file" 
                name="imagen"
                onChange={handleImg}
                />
                <div className="m-4 gap-6 grid grid-cols-4  ...">
                <input
					type="text"
					placeholder="Titulo de la pelicula"
					name="titulo"
					onChange={handleChange}
					value={data.titulo}
                    className="h-10 ml-2 col-span-2 bg-slate-100 rounded-lg ..."
				/>
                <input
						type="text"
						placeholder="Genero de la pelicula"
						name="genero"
						onChange={handleChange}
						value={data.genero}
					    
                        className="h-10 col-span-2 mr-2 bg-slate-100 rounded-lg ..."
					/>
                </div>
                <br />
                <div className="text-center place-items-center justify-center">
                    <p className="mt-2">Sinopsis:</p>
                </div>
               <input
					type="text"
					placeholder="Sinopsis de la pelicula"
					name="sinopsis"
					onChange={handleChange}
					value={data.sinopsis}
                    className="h-10 mb-4 bg-slate-100 rounded-lg ..."
				/>
                <div className="grid grid-cols-3 mb-4">
                    <input
                        type="text"
                        placeholder="ACTORES"
                        name="actores"
                        onChange={handleArra}
                        value={key}
                        
                        className="h-10 ml-2 col-span-2 bg-slate-100 rounded-lg mr-4 ..."
                    />
                    <button type="reset" className="bg-blue-700 rounded-lg"  onClick={handleAct}>
                        Agregar
                    </button>
                </div>
                <div className="grid grid-cols-5">
                        {data.actores.map(e=>
                        <div className="flex gap-4 m-4 p-2 my-2 text-sm text-white bg-green-700 text-center rounded-lg justify-center text-center">
                            <p>{e}</p>
                        </div>
                        )}
                    </div>
                <div className="grid grid-cols-3">
                    <input
                        type="text"
                        placeholder="DIRECTORES"
                        name="directores"
                        onChange={handleArra2}
                        value={dir}
                        
                        className="h-10 ml-2 col-span-2 bg-slate-100 rounded-lg mr-4 ..."
                    />
                    <button type="reset" className="bg-blue-700 rounded-lg"  onClick={handleDir}>
                        Agregar
                    </button>
                </div>
                <div className="grid grid-cols-5">
                        {data.directores.map(e=>
                        <div className="flex gap-4 m-4 p-2 my-2 text-sm text-white bg-green-700 text-center rounded-lg justify-center text-center">
                            <p>{e}</p>
                        </div>
                        )}
                    </div>
                <input
					type="date"
					placeholder="Fecha de la pelicula"
					name="fechaPubli"
					onChange={handleChange}
					value={data.fechaPubli}
                    className="h-10 ml-2 m-2 bg-slate-100 rounded-lg ..."
				/>
                <input
					type="text"
					placeholder="Review de la pelicula"
					name="review"
					onChange={handleChange}
					value={data.review}
                    className="h-10 ml-2 m-2 bg-slate-100 rounded-lg ..."
				/>
                <input
					type="text"
					placeholder="Franquicia"
					name="franquicia"
					onChange={handleChange}
					value={data.franquicia}
				    
                    className="h-10 ml-2 m-2 bg-slate-100 rounded-lg ..."
				/>
                {error && <div className='w-98 p-4 my-2 text-sm text-white bg-red-500 text-center rounded-lg justify-center text-center'>{error}</div>}
                <button type="submit" className="m-4 bg-blue-600 h-10 rounded-full text-white font-semibold text-white-500 ...">
					AÑADIR
				</button>
            </form>
        </div>
    )
}