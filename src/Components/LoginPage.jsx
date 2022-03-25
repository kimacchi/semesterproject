import React from 'react';
import { useEffect } from 'react';

const LoginPage = () => {
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
      }, [])


  return (
    <div className='login-page' id="loginpage">
        <div className='login-wrapper' id="login-wrapper">
            <div className='login-page__header--nonogram'>
                NonogramX
            </div>
            <div className='login-page__login-section'>
                <form className='login-page__login-section__form'>
                    <div className='login_form-inputs'>
                        <label style={{marginBottom:"10px", color: "white", fontFamily: "Barlow Condensed", paddingLeft: "12px"}}>USERNAME</label>
                        <input style={{resize:"none", borderRadius: "10px", backgroundColor: "#CFE4FF"}} ></input>
                        <label style={{marginBottom:"10px", marginTop: "20px", color: "white", fontFamily: "Barlow Condensed", paddingLeft: "12px"}}>PASSWORD</label>
                        <input style={{resize:"none", borderRadius: "10px", backgroundColor: "#CFE4FF"}} type="password"></input>
                    </div>
                    <div style={{width: "130px", height:"130px", display: "flex", alignItems: "center", justifyContent:"center"}}>
                        <button className='login-page__login-section__button'>LOGIN</button>
                    </div>
                </form>
                    <div className='login-page__login-section__clicks'>
                        <p className='register'>Register</p>
                        <p className='forgot'>Forgot my password</p>
                        <p className='guest'>Sign in as a guest</p>
                    </div>
            </div>
        </div>
        <canvas id="loginpage-animation">
        </canvas>
    </div>
  )
}

export default LoginPage










