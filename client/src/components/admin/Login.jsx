import React, { useState } from 'react'  // Import React and useState hook

const Login = () => {

  // State to store email input value
  const [email, setEmail] = useState('')

  // State to store password input value
  const [password, setPassword] = useState('')
  
  // Function to handle form submission
  const haldleSubmit = (e) =>{
    e.preventDefault()  // Prevent page reload when form submits

    // You can add login logic here (API call, validation, etc.)
    console.log("Email:", email)
    console.log("Password:", password)
  }

  return (
    // Main container - center content vertically and horizontally
    <div className='flex items-center justify-center h-screen'>

      {/* Card container for login form */}
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>

        {/* Header section */}
        <div className='w-full py-6 text-center'>
          <h1 className='text-3xl font-bold'>
            <span className='text-primary'>Admin</span> Login
          </h1>
          <p className='font-light'>
            Enter your credentials to access the admin panel.
          </p>
        </div>

        {/* Form starts here */}
        <form 
          onSubmit={haldleSubmit}  // Call function when form is submitted
          className='mt-6 w-full sm:max-w-md text-gray-600'
        >

          {/* Email input field */}
          <div className='flex flex-col'>
            <label className='font-semibold'>Email</label>

            <input 
              type='email'
              required
              placeholder='your email id'

              // Update email state on input change
              onChange={e => setEmail(e.target.value)}

              // Bind input value with state
              value={email}

              className='border-b-2 border-gray-300 p-2 outline-none mb-6'
            />
          </div>

          {/* Password input field */}
          <div className='flex flex-col'>
            <label className='font-semibold'>Password</label>

            <input 
              type='password'
              required
              placeholder='your password'

              // Update password state on input change
              onChange={e => setPassword(e.target.value)}

              // Bind input value with state
              value={password}

              className='border-b-2 border-gray-300 p-2 outline-none mb-6'
            />
          </div>

          {/* Submit button */}
          <button 
            type='submit' 
            className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90'
          >
            Login
          </button>

        </form>
      </div>
    </div>
  )
}

export default Login  // Export component so it can be used in other files