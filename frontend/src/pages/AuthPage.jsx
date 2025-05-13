import React from "react";
import SignupForm from "../components/SignupForm";
import OAuthButton from "../components/OAuthButton";
import { FaGoogle, FaGithub, FaDropbox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  // Simulate OAuth Login
  const handleOAuthLogin = (provider) => {
    window.location.href = `http://localhost:5000/auth/${provider}`;
  };

  // Simulate saving the JWT token after signup
  const handleSignupSuccess = (token) => {
    localStorage.setItem("token", token); // Save JWT token in localStorage
    navigate("/dashboard"); // Redirect to dashboard
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex">
        {/* Left Section */}
        <div className="w-1/2 bg-gradient-to-t from-blue-500 to-purple-500 text-white flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="mt-4 text-center">
            Enter your personal details to use all of the site's features.
          </p>
          <button
            className="mt-6 px-6 py-2 border border-white rounded-full hover:bg-white hover:text-blue-500 transition"
            onClick={() => navigate("/dashboard")}
          >
            SIGN IN
          </button>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">Create Account</h2>

          {/* OAuth Buttons */}
          <div className="flex space-x-4 mb-6">
            <OAuthButton
              icon={<FaGoogle />}
              label="Google"
              onClick={() => handleOAuthLogin("google")}
            />
            <OAuthButton
              icon={<FaGithub />}
              label="GitHub"
              onClick={() => handleOAuthLogin("github")}
            />
            <OAuthButton
              icon={<FaDropbox />}
              label="Dropbox"
              onClick={() => handleOAuthLogin("dropbox")}
            />
          </div>

          <p className="text-center text-gray-500 mb-4">
            or use your email for registration
          </p>

          {/* Signup Form */}
          <SignupForm onSignupSuccess={handleSignupSuccess} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;