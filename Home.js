import React from 'react';
import NavBar from '../components/NavBar';

function Home() {
  return (
    <>
    <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <div className="relative px-6 lg:px-8 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl text-gray-600 mb-8">
              Welcome to Your Digital Health Companion
            </h2>
            
            <h4 className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
A comprehensive autism support and healthcare management solution designed to enhance patient care and streamline medical practice efficiency.


            </h4>
            
            <p className="text-md md:text-lg text-gray-500 max-w-xl mx-auto">
            Empower children with personalized progress tracking, expert parenting resources, and seamless doctor consultations—all in one place.

            Experience secure health data management, real-time patient monitoring, and intelligent scheduling to ensure the best care for every child.

            </p>

            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-8 rounded-full" />
          </div>

          
          
          {/* Decorative blob shapes */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </div>
      </div>
    </>
  );
}

export default Home;