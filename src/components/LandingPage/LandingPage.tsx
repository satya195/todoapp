import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signUpActive, setSignUpActive] = useState(false);
  const [signUpname, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUPconfirmPassword, setSignUpConfirmPassword] = useState('');

  const handleBacktoLoginApp = () => {
    setSignUpActive(false);
  }
  const handleSignUp = () => {
  console.log("write api here");
  }
  const handleSignUpNameChange = (signUpname:any) => {
      setSignUpName(signUpname);
  }
  const handleSignUpEmailChange = (signUpEmail:any) => {
      setSignUpEmail(signUpEmail);
  }
  const handleSignUpPasswordChange = (signUpPassword:any) => {
      setSignUpPassword(signUpPassword);
  }
  const handleSignUpConfirmPasswordChange = (signUPconfirmPassword:any) => {
      setSignUpConfirmPassword(signUPconfirmPassword);
    }

  
  const handleLoginApp = () => {
    console.log("write api here");
    navigate('/todo');
  }
  const handleSignUpApp = () => {
    setSignUpActive(true);
  }
  const handleEmailChange = (email:any) => {
    setEmail(email);
  }
  const handlePasswordChange = (Password:any) => {
    setPassword(Password);
  }
  useEffect(() => {
    const container = document.querySelector('.content') as HTMLElement;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const offsetX = (clientX - centerX) / centerX;
      const offsetY = (clientY - centerY) / centerY;

      const rotateX = offsetY * 25; // Rotate effect on Y-axis
      const rotateY = -offsetX * 25; // Rotate effect on X-axis

      container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  return (
    <>
      <div className="landingPage-container">
        <div className="background-animation"></div>
        <div className='content-box'>
            <div className="content">
            <h1 className="main-heading">Welcome to <span className='project-name'>TaskSphere</span></h1>
            {signUpActive ? ( <>  <p className="quote">Sign up soon, as a world of productvity awaits you</p>
            <p className="quote">Be the change!!</p></>) : ( <><p className="quote">Productivity is never an accident. It is always the result of commitment to excellence</p>
              <p className="quote">Your next big achievement starts with a single task</p></>)}
         
     
            </div>
            {signUpActive ? (  <div className='btn-box'>
          <input 
              type="text" 
              className="input-field-name" 
              placeholder="please enter your name" 
              value={signUpname} 
              onChange={(e) => handleSignUpNameChange(e.target.value)}
            />
            <input 
              type="text" 
              className="input-field-email" 
              placeholder="please enter your Email" 
              value={signUpEmail} 
              onChange={(e) => handleSignUpEmailChange(e.target.value)}
            />
            <input 
              type="password" 
              className="input-field-password" 
              placeholder="please enter your Password" 
              value={signUpPassword} 
              onChange={(e) => handleSignUpPasswordChange(e.target.value)}
            />
            <input 
              type="password" 
              className="input-field-confirmPassword" 
              placeholder="please confirm your Password" 
              value={signUPconfirmPassword} 
              onChange={(e) => handleSignUpConfirmPasswordChange(e.target.value)}
            />
            <div className='login-signup-box'>
                <button className='signUp-btn' onClick={handleSignUp}>SignUp</button>
                <button className='login-btn' onClick={handleBacktoLoginApp}>Back to SignIn</button>      
            </div>
          </div>) : (     <div className='btn-box'>
              <input 
                type="text" 
                className="input-field-email" 
                placeholder="please enter your Email" 
                value={email} 
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              <input 
                type="password" 
                className="input-field-password" 
                placeholder="please enter your Password" 
                value={password} 
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              <div className='login-signup-box'>
              <button className='login-btn' onClick={handleLoginApp}>SignIn</button>
              <button className='signUp-btn' onClick={handleSignUpApp}>SignUp</button>
              </div>
            </div>)}
        </div>
      </div>
    </>
  );
};

export default LandingPage;