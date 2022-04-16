import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {motion, AnimatePresence} from "framer-motion";
import { actionCreators } from '../actions/index';


var axios = require("axios");


function validateusername(x){
    var re = /^[a-zA-Z0-9]+$/;
    if(x === ""){
        alert("username must be filled out");
        return false;
    } else if (re.test(String(x).toLowerCase()) === false){
        alert("username must be valid. Please only use letters and numbers.");
        return false;
    }
    return true;
}

function validatePassword(x){
    var re = /^[a-zA-z0-9][a-zA-Z0-9!_\-*#$]*/;
    if(x === ""){
        alert("Password must be filled out.");
        return false;
    } else if(re.test(x) === false){
        alert("Password is not valid, passwords must start with a letter and can only contain '! _ - * # $'")
    }
    return true;
}

function validateForm(x) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (x === "") {
      alert("email must be filled out");
      
      return false;
    } else if (re.test(String(x).toLowerCase()) === false) {
      alert("email must be valid");
    
      return false;
    }
    return true;
  }

const LoginPage = () => {
    const [userState, setState] = useState({username: "", password: "", email: "", isLogged: false, allUsers: [], wrong: false, isRegistering: false});
    const navigate = useNavigate();
    const dispacth = useDispatch();
    const {setCurrentUser} = bindActionCreators(actionCreators, dispacth);

    useEffect(()=>{
        // const COLOR_SPACE = "black";
        const COLOR_STARS = "#6F86A5";
        const STAR_NUM = 100;
        const STAR_SIZE = 0.004;
        const STAR_SPEED = 0.008;
    
        // Canvas and Context
        let canvas = document.getElementById("loginpage-animation");
        let ctx = canvas.getContext("2d");
        canvas.height = document.documentElement.clientHeight;
        canvas.width = document.documentElement.clientWidth;
    
        // Set up the stars
        let stars = [];
        let starSpeed = STAR_SPEED * 1920;
        let xv = starSpeed * randomSign() * Math.random();
        let yv = Math.sqrt(Math.pow(starSpeed,2) - Math.pow(xv,2)) * randomSign();
    
        for (let i = 0; i < STAR_NUM; i++) {
            let speedMult = Math.random() * 1.5 + 0.5;
            stars[i] = {
                r: Math.random() * STAR_SIZE * 1920 / 2,
                x: Math.floor(Math.random() * 1920),
                y: Math.floor(Math.random() * 1080),
                xv: xv * speedMult,
                yv: yv * speedMult
            }
        }
    
    
        // Set up the animation loop
        let timeDelta, timeLast = 0; //initially
        requestAnimationFrame(loop);
    
    
        function loop(timeNow) {
    
            // Calculate the time difference
            timeDelta = timeNow - timeLast;
            timeLast = timeNow;
    
            // Space background
            var gradient = ctx.createLinearGradient(0,0,1920,1080);
            gradient.addColorStop(0, "#081e3f");
            gradient.addColorStop(0.25, "#003454");
            gradient.addColorStop(0.5, "#004a5d");
            gradient.addColorStop(0.75, "#005e59");
            gradient.addColorStop(1, "#24714d");
            ctx.fillStyle = gradient;
            ctx.fillRect(0,0, 1920, 1080);

            // Draw the stars
            ctx.fillStyle = COLOR_STARS;
            for (let i = 0; i<STAR_NUM; i++) {
                ctx.beginPath();
                ctx.arc(stars[i].x, stars[i].y, stars[i].r, 0, Math.PI * 2);
                ctx.fill();
                
                // Update X position(Stars)
                stars[i].x += stars[i].xv * timeDelta * 0.001;
                // Reposition the star to the other side if it goes off screen
                if (stars[i].x < 0 - stars[i].r) {
                    stars[i].x = 1920 + stars[i].r;
                } else if (stars[i].x > 1920 + stars[i].r) {
                    stars[i].x = 0 - stars[i].r;
                }
    
                // Update X position(Stars)
                stars[i].y += stars[i].yv * timeDelta * 0.001;
                // Reposition the star to the other side if it goes off screen
                if (stars[i].y < 0 - stars[i].r) {
                    stars[i].y = 1080 + stars[i].r;
                } else if (stars[i].y > 1080 + stars[i].r) {
                    stars[i].y = 0 - stars[i].r;
                }
            }
            // Calling next frame
            requestAnimationFrame(loop);
        }
        function randomSign() {
            return Math.random() >= 0.5 ? 1 : -1;
        }
      }, []);

      var labelusername = <div><p style={{color: "crimson", fontWeight:900}}>{userState.wrong ? "username or password is incorrect." : ""}</p><p>USERNAME</p></div>
      var labelPassword = <div><p>PASSWORD</p></div>

    useEffect(()=>{
        axios.get(process.env.REACT_APP_API+"/users").then((data)=>{
            setState((prevState)=>({...prevState, allUsers: [...data.data]}))
        })
    }, []);

    const onTextChangeUsername = (e)=>{
        const text = e.target.value;
        setState((prevState)=>({...prevState, username: text}));
    }

    const onTextChangePassword = (e)=>{
        const text = e.target.value;
        setState((prevState)=>({...prevState, password: text}));
    }

    const onTextChangeEmail = (e)=>{
        const text = e.target.value;
        setState((prevState)=>({...prevState, email: text}));
    }

    const onFormSubmit = (e)=>{
        e.preventDefault();
        if(userState.allUsers.every((ele)=>ele.username.toLowerCase() !== userState.username.toLowerCase() && ele.userPassword !== userState.password)){
            e.target[0].value = "";
            e.target[1].value = "";
            setState((prevState)=>({...prevState, wrong: true}));
        }else{
            userState.allUsers.forEach(ele => {
                if(ele.username.toLowerCase() === userState.username.toLowerCase() && ele.userPassword === userState.password){
                    setState((prevState)=>({...prevState, isLogged: !prevState.isLogged, wrong: false}))
                    setCurrentUser(ele.username, ele.userId);
                    navigate("/home");
                }
            });
        }
    }

    const onFormSubmitRegister = (e)=>{
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;
        const email = e.target[2].value;
        
        if(validateForm(email) && validateusername(username) && validatePassword(password) && userState.allUsers.every((ele)=>ele.username.toLowerCase() !== username.toLowerCase()) && userState.allUsers.every((ele)=>ele.email !== email)){
            axios.post(process.env.REACT_APP_API+"/users", {
                username: username.toLowerCase(),
                userPassword: password,
                email: email
            }).then((response)=>{
                axios.get(process.env.REACT_APP_API+"/users").then((data)=>{
                    setState((prevState)=>({...prevState, allUsers: [...data.data]}))
                    window.location.reload();
                });
            })
        }else if(userState.allUsers.every((ele)=>ele.username.toLowerCase() !== username.toLowerCase()) !== true){
            alert("This username is taken.");
        }else if(userState.allUsers.every((ele)=>ele.email.toLowerCase() !== email.toLowerCase()) !== true){
            alert("This email is taken.");
        }
        e.target[0].value = "";
        e.target[1].value = "";
        e.target[2].value = "";
        setState((prevState)=>({...prevState, isRegistering: false}));

    }

  return (
    <motion.div 
        className='login-page' 
        id="loginpage"
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0, scale: 1.8}}
        transition={{duration: 0.4}}
    >
        <div className='login-wrapper' id="login-wrapper">
            <motion.div 
                className='login-page__header--nonogram'
                initial={{y: -190}}
                animate={{y: 0}}
                transition={{duration: 1}}
            >
                Focus
            </motion.div>
            <motion.div 
                className='login-page__login-section'
                initial={{opacity: 0, scale: 0.9, backgroundColor: "rgba(5, 39, 61, 0)"}}
                animate={{opacity: 1, scale: 1, backgroundColor: "rgba(5, 39, 61, 0.3)"}}
                transition={{duration: 1}}
            >
                <form onSubmit={userState.isRegistering ? onFormSubmitRegister : onFormSubmit} className='login-page__login-section__form'>
                    <div className='login_form-inputs'>
                        <label style={{marginBottom:"0px", color: "white", fontFamily: "Barlow Condensed", paddingLeft: "12px"}}>{labelusername}</label>
                        <input className='login_form-inputs__input' onChange={onTextChangeUsername} style={{resize:"none", borderRadius: "10px", backgroundColor: "#CFE4FF"}} ></input>
                        <label style={{marginBottom:"0px", marginTop: "0px", color: "white", fontFamily: "Barlow Condensed", paddingLeft: "12px"}}>{labelPassword}</label>
                        <input className='login_form-inputs__input' onChange={onTextChangePassword} style={{resize:"none", borderRadius: "10px", backgroundColor: "#CFE4FF", marginBottom: "0px"}} type="password"></input>
                        <AnimatePresence>{userState.isRegistering && <motion.label 
                                                        style={{marginBottom:"0px", marginTop: "0px", color: "white", fontFamily: "Barlow Condensed", paddingLeft: "12px"}}
                                                        initial={{opacity: 0, scale: 0, width:0, height:0}}
                                                        animate={{opacity:1, scale: 1, width: 15, height: 49}}
                                                        exit={{opacity: 0, scale: 0, width: 0, height: 0}}
                                                        transition={{duration: 0.6}}
                                                    >
                                                        <div><p>EMAIL</p></div>
                                                    </motion.label>}</AnimatePresence>
                        <AnimatePresence>{userState.isRegistering && (<motion.input
                                                        className='login_form-inputs__input'
                                                        onChange={onTextChangeEmail} style={{resize:"none", borderRadius: "10px", backgroundColor: "#CFE4FF", marginBottom: "0px"}}
                                                        initial={{opacity: 0, scale: 0, width: 0, height: 0}}
                                                        animate={{opacity:1, scale: 1, width:280, height:18}}
                                                        exit={{opacity: 0, scale: 0, width:0, height:0}}
                                                        transition={{duration: 0.25}}
                                                        >
                                                    </motion.input>)}</AnimatePresence>
                    </div>
                    <div style={{width: "130px", height:"130px", display: "flex", alignItems: "center", justifyContent:"center"}}>
                        <AnimatePresence>
                            {userState.isRegistering ?

                                <motion.button
                                    className='login-page__login-section__button'
                                    initial={{marginTop: 0}}
                                    animate={{marginTop: 150}}
                                    exit={{marginTop: 0}}
                                    transition={{duration: 0.4}}
                                >
                                    REGISTER
                                </motion.button>                                

                                :
                                <motion.button 
                                    className='login-page__login-section__button'
                                    initial={{marginTop: 0}}
                                    animate={{marginTop: 55}}
                                    exit={{marginTop: 0}}
                                    transition={{duration: 0.4}}
                                >
                                    LOGIN
                                </motion.button>
                            }
                        </AnimatePresence>
                    </div>
                </form>
                    <div className='login-page__login-section__clicks'>
                        <p className='register' onClick={()=>{setState((prevState)=>({...prevState, isRegistering: !prevState.isRegistering, wrong: false}))}}>{userState.isRegistering ? "Login" : "Register"}</p>
                        <p className='forgot'>Forgot my password</p>
                        <p className='guest'>Sign in as a guest</p>
                    </div>
            </motion.div>
        </div>
        <canvas id="loginpage-animation">
        </canvas>
    </motion.div>
  )
}

export default LoginPage










