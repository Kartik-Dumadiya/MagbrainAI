import React from "react";
import SigninForm from "../components/SigninForm";
import OAuthButton from "../components/OAuthButton";
import { FaGoogle, FaGithub, FaDropbox } from "react-icons/fa";
import { Link } from "react-router-dom";

const SigninPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex">
        {/* Left Section */}
        <div className="w-1/2 bg-gradient-to-t from-blue-500 to-purple-500 text-white flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-bold">Hello, Friend!</h1>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="underline hover:text-blue-200 transition"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">Sign In</h2>

          {/* OAuth Buttons */}
          <div className="flex space-x-4 mb-6">
            <OAuthButton icon={<FaGoogle />} label="Google" />
            <OAuthButton icon={<FaGithub />} label="GitHub" />
            <OAuthButton icon={<FaDropbox />} label="Dropbox" />
          </div>

          <p className="text-center text-gray-500 mb-4">
            or use your email to sign in
          </p>

          {/* Signin Form */}
          <SigninForm />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;