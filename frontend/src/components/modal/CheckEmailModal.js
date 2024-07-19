import React from 'react';

const CheckEmailModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-gray-600 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Xác nhận email của bạn</h2>
        <p>
          Chúng tôi đã gửi một email xác nhận đến địa chỉ email của bạn. 
          Vui lòng kiểm tra hộp thư và nhấp vào liên kết xác nhận để hoàn tất quá trình đăng ký.
        </p>
        <button 
          onClick={onClose}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Đã hiểu
        </button>
      </div>
    </div>
  );
};

export default CheckEmailModal;