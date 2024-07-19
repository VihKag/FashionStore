import React from 'react';
import { Link } from 'react-router-dom';

const VerificationSuccess = () => {
  return (
    <div className="container mx-auto mt-20 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Xác thực email thành công
            </div>
            <p className="mt-2 text-gray-500">
              Cảm ơn bạn đã xác thực email của mình. Bây giờ bạn có thể đăng nhập trang web của chúng tôi.
            </p>
            <Link
              to="/Signin"
              className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Tiếp tục
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;