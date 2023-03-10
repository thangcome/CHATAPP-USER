import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute, updateUserRoute } from '../utils/APIRoutes';

function Profile() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: ""
    });
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    useEffect(()=> {
        const setCUser = async ()=>{
            if(!localStorage.getItem("chat-app-user")){
                navigate("/login");
            } else {
                setValues(await JSON.parse(localStorage.getItem("chat-app-user")))
            }
        }
        setCUser().catch(console.error);
    },[])
    // useEffect(()=>{
    //     if(localStorage.getItem("chat-app-user")){
    //         navigate("/")
    //     }
    // },[])

    // const setProfilePicture = async () =>{
    //     if(selectedAvatar===undefined){
    //         toast.error("Please select an avatar",toastOptions);
    //     } else{
    //         const user = await JSON.parse(localStorage.getItem("chat-app-user"));
    //         const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
    //             image:avatars[selectedAvatar]
    //         })
    //         if(data.isSet){
    //             user.isAvatarImageSet = true;
    //             user.avatarImage = data.image;
    //             localStorage.setItem("chat-app-user",JSON.stringify(user));
    //             navigate('/');
    //         } else{
    //             toast.error("Error setting avatar. Please try again",toastOptions);
    //         }
    //     }
    // }
    const handleSubmit =  async (e) =>{
        e.preventDefault();
        if(handleValidation()){
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} = await axios.post(`${updateUserRoute}/${user._id}`,{
                username:values.username,
                email: values.email,
                password: values.password
            });
            if(data.status === false){
                toast.error(data.msg, toastOptions);
            }
            if(data.status === true){
                localStorage.setItem('chat-app-user',JSON.stringify(values));
                navigate('/');
            }
        }
    }

    const handleValidation = () =>{
        const {password,username,email} = values;
        if(username.length<3){
            toast.error(
                "Username should be greater than 3 characters",
                toastOptions
            );
            return false;
        }else if(password.length<8){
            toast.error(
                "Password should be equal or greater than 8 characters",
                toastOptions
            );
            return false;
        } else if(email===""){
            toast.error(
                "Email is required",
                toastOptions
            );
        }
        return true;
    }
    const handleChange = (e) =>{
        setValues({...values,[e.target.name]:e.target.value})
    }
    const clearInput = (e) =>{
        setValues({
            username: "",
            email: "",
            password: ""
        })
    }

    return(
        <>
            <FormContainer>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className='brand'>
                        <img src={Logo} alt="Logo"/>
                        <h1 style={{color:"blue"}}>PROFILE</h1>
                    </div>
                    <input 
                        type="text" 
                        placeholder='Username' 
                        name='username' 
                        value={values.username}
                        onChange={(e)=>handleChange(e)}
                    />
                    <input 
                        type="email" 
                        placeholder='Email' 
                        name='email' 
                        value={values.email}
                        onChange={(e)=>handleChange(e)}
                    />
                    <input 
                        type="password" 
                        placeholder='Password' 
                        name='password' 
                        value={values.password}
                        onChange={(e)=>handleChange(e)}
                    />
                    <button type='submit'>Update User</button>
                    <button type='reset' onClick={()=>clearInput()}>Reset</button>
                    <span>Already? go to <Link to="/">Chat page</Link></span>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
    )
}

const FormContainer = styled.div`
    height:100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img{
            height: 5rem;
        }
        h1{
            color:white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;

        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color:white;
            width: 100%;
            font-size: 1rem;
            &:focus{
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }

        button{
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover{
                background-color: #4e0eff;
            }
        }
        span{
            color:white;
            text-transform: uppercase;
            a {
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
        }       
    }
`;

export default Profile;