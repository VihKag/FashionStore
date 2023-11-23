import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const showSuccessToast = (message) => {
  toast.success(message, toastOptions);
};

const showErrorToast = (message) => {
  toast.error(message, toastOptions);
};
export {showErrorToast, showSuccessToast};
