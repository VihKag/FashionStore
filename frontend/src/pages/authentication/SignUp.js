import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import login from "../../assets/login.jpg";
import fashion from "../../assets/fashion-store.png";
import HeaderClient from "../../components/header/HeaderClient";
import { UserContext } from "../../contexts/UserContext";
import CheckEmailModal from "../../components/modal/CheckEmailModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showCheckEmailModal, setShowCheckEmailModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signUp } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const signUpData = {
      name,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    const newErrors = {};

    // Validate name
    if (!name) {
      newErrors.name = "Name is required";
    }

    // Validate email
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
    } else if (
      password.length < 6 ||
      !/\d/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password)
    ) {
      newErrors.password =
        "Password must be at least 6 characters and contain at least one number, one lowercase letter, and one uppercase letter";
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await signUp(signUpData);
      console.log(response);
      if (response.status === 200) {
        setShowCheckEmailModal(true); // Hiển thị modal
      } else {
        setMessage(response.data.message);
        // Nếu bạn muốn ẩn modal khi có lỗi
        setShowCheckEmailModal(false);
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);
        // Nếu bạn muốn ẩn modal khi có lỗi
        setShowCheckEmailModal(false);
      }
    }
  };
  const getInputClasses = (fieldName) => {
    const defaultClasses =
      "w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-blue-500 focus-visible:shadow-none";
    const errorClass = errors[fieldName] ? "border-red-500" : "";
    const valueClass =
      errors[fieldName] && getFieldValue(fieldName) ? "border-red-500" : "";

    return `${defaultClasses} ${errorClass} ${valueClass}`;
  };

  const getFieldValue = (fieldName) => {
    switch (fieldName) {
      case "name":
        return name;
      case "email":
        return email;
      case "password":
        return password;
      case "confirmPassword":
        return confirmPassword;
      default:
        return "";
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <HeaderClient />
      <div className=" bg-white shadow-default p-10 items-center justify-center h-screen select-none">
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

          <div className="lg:w-1/2 lg:block border-stroke xl:w-1/2 xl:border-l-2 w-full justify-center p-4">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-3xl font-bold text-black sm:text-title-xl2">
                Sign In to FashionStore
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your user name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={getInputClasses("name")}
                    />
                    {errors.name && (
                      <p className="text-red-500">{errors.name}</p>
                    )}
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                            fill=""
                          />
                          <path
                            d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={getInputClasses("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email}</p>
                    )}
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={getInputClasses("password")}
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password}</p>
                    )}
                    <span
                      className="absolute right-4 top-4 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="text-gray-400"
                      />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black">
                    Re-type Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={getInputClasses("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500">{errors.confirmPassword}</p>
                    )}
                    <span
                      className="absolute right-4 top-4 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="text-gray-400"
                      />
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Sign Up"
                    className="w-full cursor-pointer rounded-lg border border-blue-500 bg-blue-500 p-4 text-white font-bold transition hover:bg-opacity-90"
                  />
                </div>
                {message && <p>{message}</p>}
                <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 font-bold">
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
                  Sign up with Google
                </button>

                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{" "}
                    <Link to="/signin" className="text-blue-500 font-bold">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <CheckEmailModal
        show={showCheckEmailModal}
        onClose={() => setShowCheckEmailModal(false)}
      />
    </>
  );
};

export default SignUp;
