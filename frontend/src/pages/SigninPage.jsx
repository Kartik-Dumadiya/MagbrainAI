import React, { useState, useRef } from "react";
import SigninForm from "../components/SigninForm";
import { Link } from "react-router-dom";
import googleLight from "../assets/google_light.png";
import googleBold from "../assets/google_bold.png";
import githubLight from "../assets/github_light.png";
import githubBold from "../assets/github_bold.png";
import dropboxLight from "../assets/dropbox_light.png";
import dropboxBold from "../assets/dropbox_bold.png";
import "../transition.css";
import { CSSTransition } from "react-transition-group";

const icons = [
  { id: "google", light: googleLight, bold: googleBold, alt: "Sign in with Google", href: "http://localhost:3000/auth/google" },
  { id: "github", light: githubLight, bold: githubBold, alt: "Sign in with GitHub", href: "http://localhost:3000/auth/github" },
  { id: "dropbox", light: dropboxLight, bold: dropboxBold, alt: "Sign in with Dropbox", href: "http://localhost:3000/auth/dropbox" },
];

const SigninPage = () => {
  const [hovered, setHovered] = useState(null);
  const nodeRef = useRef(null);

  const handleOAuth = (href) => {
    window.open(href, "_self");
  };

  return (
    <CSSTransition in appear timeout={300} classNames="page" nodeRef={nodeRef}>
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-white to-blue-100" ref={nodeRef}>
        <div className="w-full max-w-4xl bg-white rounded-[30px] shadow-2xl overflow-hidden flex h-[500px]">
          <div className="w-1/2 bg-[#5A55B1] text-white flex flex-col items-center justify-center p-8 rounded-r-[100px] h-full">
            <h1 className="text-5xl font-bold">Welcome Back !</h1>
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="underline hover:text-blue-200 transition">
                Create Account
              </Link>
            </p>
          </div>
          <div className="w-1/2 gap-3 flex flex-col items-center justify-start p-15">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Sign In</h2>
            <div className="flex space-x-4 mb-6">
              {icons.map(({ id, light, bold, alt, href }) => (
                <div
                  onClick={() => handleOAuth(href)}
                  key={id}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative border border-gray-300 rounded-xl p-2 hover:border-gray-500 transition-colors duration-300 h-10 w-10 flex items-center justify-center cursor-pointer ${id === "github" && hovered === id ? "bg-black" : ""}`}
                >
                  <img
                    src={light}
                    alt={alt}
                    className={`object-contain transition-opacity ease-in-out ${hovered === id ? "hidden" : "opacity-100"}`}
                  />
                  <img
                    src={bold}
                    alt={alt}
                    className={`object-contain transition-opacity duration-300 ease-in-out ${hovered === id ? "opacity-100" : "hidden"}`}
                  />
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 mb-4">
              or use your email to sign in
            </p>
            <SigninForm />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default SigninPage;