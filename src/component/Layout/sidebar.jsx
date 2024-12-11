// import React from 'react'
// import { useNavigate } from 'react-router-dom';

// const Login = ({ setAuth }) => {
//   const navigate = useNavigate();
//   return (
//     <>
//       <div className="w-full h-screen flex justify-center items-center">
//         <div className="w-1/4 h-5/4 bg-gray-100">
//           <h1 className='flex justify-center p-2 text-2xl font-medium text-gray-700'>Login Form</h1>
//           <div className="w-full  h-5/6 flex flex-col gap-4">
//             <label htmlFor="username" className='text-1xl '> User Name</label>
//             <input type="text" name="username" id="" className='p-2 rounded-md outline-none' required placeholder='Enter your User Name' />
//             <label htmlFor="password" className='text-1xl '>Password</label>
//             <input type="password" name="Password" id="" className='p-2 rounded-md outline-none' required placeholder='Password' />
//             <p>Don't have Account? <span className='hover:text-blue-500 cursor-pointer'
//             onClick={() => {
//               setAuth("signup")
//             }}
//             >Signup</span> </p>
//             <div className='flex justify-center'>
//             <button className='p-2 bg-blue-500 w-32 rounded-md text-xl'
//             onClick={() => {
//               navigate("/index")
//             }}
//             >Login </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// };

// export default Login;
