import { Box, Image, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import '../styles/Login.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Redux/user/userAction';

const Login = () => {
   const [show, setShow] = useState(false);
   // const [email, setEmail] = useState("");
   // const [password, setPassword] = useState("");
   // const initialValues = { username: "", email: "", password: "" };
   const initialValues = {email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { message } = useSelector(store => store.user)
    console.log(message);
        // -------------------window-size------------------------//
 
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    function getCurrentDimension(){
      return {
            width: window.innerWidth,
            height: window.innerHeight
      }
    }

    useEffect(() => {
          const updateDimension = () => {
                setScreenSize(getCurrentDimension())
          }
          window.addEventListener('resize', updateDimension);
  
      
          return(() => {
              window.removeEventListener('resize', updateDimension);
          })
    }, [screenSize])

    // ------------function calls--------------------//

    const togglePassword = () => {
        setShow(!show);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };
    
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true)
        
    }
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const obj = {
                email: formValues.email,
                password: formValues.password
            }
            dispatch(loginUser(obj, navigate))
        }
      }, [formErrors]);
      const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
          errors.password = "Password is required";
        } /*else if (values.password.length < 4) {
          errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
          errors.password = "Password cannot exceed more than 10 characters";
        }*/
        return errors;
      };
    return (
        <Box>
            <Box className='login-bg'>
                <Image src={"/images/login-bg.jpg"} alt={'login-bg-img'} height={{ sm: "280px", md: "auto", base: "280px", lg: "auto", xl: "auto" }} />
            </Box>
            <Box color={'white'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} position={'absolute'} zIndex={'100'} top={{ sm: "5%", base: "5%", md: "5%", lg: '8%', xl: '8%' }} left={{ sm: "20%", base: "20%", md: "40%", lg: '42%', xl: '42%' }}>
                <Image src='/images/Logo.svg' alt={'icon-img'} width={"120px"} />
                <Text mt={"20px"} fontSize={'18px'}>Online Project Management</Text>
            </Box>
            <Box  display={'flex'} flexDirection={'column'} justifyContent={"center"} alignItems={{ sm: "flex-start", md: "flex-start", base: "flex-start", lg: 'center', xl: 'center' }} width={{ sm: "95%", base: "95%", md: "80%", lg: "35%", xl: "28%" }} padding={'20px'} m={"auto"} position={{ sm: "", base: "", md: "", lg: "absolute", xl: 'absolute' }} zIndex={{ sm: "", base: "", md: "", lg: "100", xl: '100' }} top={{ sm: "", base: "", md: "", lg: '38%', xl: '32%' }} left={{ sm: "", base: "", md: "", lg: '35%', xl: '36%' }} boxShadow={{ sm: "", md: "", base: "", lg: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px', xl: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }} backgroundColor={{ sm: "", md: "", base: "", lg: "white", xl: "white" }} borderRadius={'10px'}>
                <br />
                <Text fontSize={'20px'} mt={'20px'} fontWeight={{ sm: "500", md: "500", base: "500", lg: 'bold', xl: 'bold' }}>Login To Get Started</Text>
                <br />
                <form className='form' onSubmit={handleLoginSubmit}>
                    <label>Email</label>
                    <Input variant="unstyled" name='email' type='email' placeholder='' value={formValues.email} onChange={handleChange} backgroundColor={{ sm: "transparent", md: "transparent", base: "transparent", lg: "white", xl: "white" }} outline="0 !important" border="none" _focus={{ outline: "0 !important", border: "none" }} />
                    <p Text className='error-label' fontSize={'15px'}>{formErrors.email}</p>
                    <br />
                    <label>Password</label>
                    <div className='password-div'>
                        <Input variant="unstyled"  name='password' type={show ? "text" : "password"} placeholder='' value={formValues.password} onChange={handleChange} backgroundColor={{ sm: "transparent", md: "transparent", base: "transparent", lg: "white", xl: "white" }} pl={"5px"} />
                        <span onClick={togglePassword}><img src='/images/hide-password.jpg' alt='icons-img' width={"20px"} /></span>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"5px"}}>
                    <p Text className='error-label' fontSize={'15px'}>{formErrors.password}</p>
                       <span style={{color:"#4871f7", fontSize:"14px"}}>Forgot password?</span>
                    </div>
                    <br />
                    {message === "Invalid User" && screenSize.width<=640 || message === "Invalid Password" && screenSize.width<=640 ? <Text textAlign={'start'} mb={"5px"} fontSize={'15px'} color={'red'}>{message}</Text> : null}
                    <Input type='submit' value={'Login'} cursor={"pointer"} width={{ sm: "100%", md: "100%", base: "100%", lg: "150px", xl: "150px" }} p={{ sm: "0px", md: "0px", base: "0px", lg: "5px 20px", xl: "5px 20px" }} m={{ sm: "", md: "", base: "", lg: "auto", xl: "auto" }} borderRadius={"20px"} backgroundColor={"#4871f7"} color={"white"} />

                    <br />
                </form>
            </Box>
            {message === "Invalid User" && screenSize.width>640 || message === "Invalid Password" && screenSize.width>640 ? <Text textAlign={'center'} mt={{ sm: "10px", md: "10px", base: "10px", lg: "160px", xl: "160px" }} fontSize={'15px'} color={'red'}>{message}</Text> : null}
            <br />
        </Box>
    );
};

export default Login;