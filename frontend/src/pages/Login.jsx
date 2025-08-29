import React, { useContext, useState } from 'react'
import { dataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const {serverUrl, userData, setUserData, getUserData} = useContext(dataContext)
    let navigate = useNavigate()
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(serverUrl+"/api/v1/users/login", {
                email,
                password
            },{
                withCredentials:true
            })

            console.log(res.data);
            setUserData(res.data)
            await getUserData()
            if(userData){
              navigate('/')
            }
            
        } catch (error) {
            console.log("Error: ",error.response.data.message);
            alert(error.response.data.message)
            
        }
    }

  return (
    <div className="w-full h-[100vh] bg-black flex justify-center items-center">
      <div className="w-[90%] max-w-[500px] h-[600px] bg-[#2c5052] rounded flex flex-col gap-5 justify-center items-center">
        <h1 className="text-white text-2xl font-semibold text-center">
          Log In
        </h1>
        <form
          action=""
          onSubmit={handleLogin}
          className="w-full flex flex-col items-center justify-center gap-5"
        >

          <input
            type="email"
            name=""
            id=""
            placeholder="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            className="w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-3 py-1"
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            className="w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-3 py-1"
          />
          <button className="bg-[#007a9f] py-2 px-4 rounded-xl text-white font-semibold cursor-pointer hover:scale-105 duration-150 border-2 border-white">Login</button>
          <p className='text-white'>create an account? <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/signup')}>Sign Up</span></p>
        </form>
      </div>
    </div>
  );
}

export default Login