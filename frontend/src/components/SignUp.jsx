import React, { useState } from 'react'

const SignUp = () => {
     const [phoneNumber, setPhoneNumber] = useState('')
      const [password, setPassword] = useState('')
      const [user, setUser] = useState('')
    
     
    
      const handleRegister = () => {
        
        console.log('Navigate to registration')
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();  
               const User ={
                phoneNumber,
                password
               }
               const response = axios(``)
      }
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center p-6">
    <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Sign-Up</h2>
        
        <form onSubmit={handleSubmit}>  
          <div className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input 
                id="phone"
                type="tel" 
                placeholder="Enter Mobile Number" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input 
                id="password"
                type="password" 
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              />
            </div>
            
            <button 
              type="submit"  
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold"
            >
           Sign-Up
            </button>
          </div>
        </form>

        <div className="text-center my-4">
          <span className="text-gray-600">All ready have an account?</span>
        </div>
        
        <button 
          onClick={handleRegister}
          className="w-full bg-yellow-400 text-gray-800 py-3 rounded-lg hover:bg-yellow-500 transition duration-300 font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  </div>
  )
}

export default SignUp