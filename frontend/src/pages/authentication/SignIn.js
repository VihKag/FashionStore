/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/login.jpg";
import fashion from "../../assets/fashion-store.png";
import HeaderClient from "../../components/header/HeaderClient";
import { UserContext } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
const SignIn = () => {
  const { signIn, setUser, user, setIsAdmin,handleSignIn } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const signInData = {
      username,
      password,
    };

    try {
      const response = await signIn(signInData);
      if (response) {
        // Handle successful sign-in
        // You can set the user information or token in the global state
        console.log("Sign-in successful:", response);
        setUser({
          username: response.name,
          email: response.email,
          role: response.role,
          image: response.image,
          accessToken: response.accessToken,
        });
        sessionStorage.setItem("login",1);
        handleRedirect(response); // Redirect based on user role
      } else {
        setError("Sign-in failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during sign-in.");
      console.log("Sign-in failed:", error);
    }
  };

  const handleRedirect = (props) => {
    
    if (props.role.includes("ROLE_USER")) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          username: props.name,
          email: props.email,
          image: props.image,
          accessToken: props.accessToken,
        })
      );
      navigate("/");

    } else if (props.role.includes("ROLE_ADMIN")) {

      sessionStorage.setItem(
        "admin",
        JSON.stringify({
          username: props.name,
          email: props.email,
          role: 1,
          image: props.image,
          accessToken: props.accessToken,
        })
      );
      setIsAdmin(true);
      navigate("/admin");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <HeaderClient />
      <div className=" bg-white shadow-default p-10 items-center justify-center h-screen">
        <div className="flex items-center max-w-screen-2xl h-full rounded-sm mx-auto border round-sm">
          <div className="hidden w-full lg:w-1/2 lg:block xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5 flex items-center justify-center" to="/">
                <img
                  src={fashion}
                  alt="SignIn img"
                  className="object-contain w-24 h-24 rounded-full"
                />
                <span className="items-center text-2xl font-bold text-blue-500 m-4">
                  FashionStore
                </span>
              </Link>

              <p className="2xl:px-40 xl:px-20 lg:px-10 text-lg font-poetsen">
                Inspired by everyday life quality comes with modern designs
              </p>

              <span className="mt-15 inline-block w-2/3">
                <img src={login} alt="SignIn img" />
              </span>
            </div>
          </div>

          <div className="w-full lg:w-1/2 lg:block border-stroke xl:w-1/2 xl:border-l-2 p-4">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-3xl font-bold text-black sm:text-title-xl2">
                Sign In to FashionStore
              </h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                  />
                  <span className="absolute right-4 top-4">
                    <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                  </span>
                </div>
              </div>

                <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    autoComplete="on"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="6+ Characters, 1 Capital letter"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                  />
                  <span className="absolute right-4 top-4 cursor-pointer" onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-gray-400" />
                  </span>
                </div>
              </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg border border-blue-500 bg-blue-500 p-4 text-white font-bold transition hover:bg-opacity-90"
                  />
                </div>

                <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 font-bold hover:bg-opacity-50">
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_191_13499)">
                        <path
                          d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_191_13499">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Sign in with Google
                </button>

                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{" "}
                    <Link to="/signup" className="text-blue-500 font-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
