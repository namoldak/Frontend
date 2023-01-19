import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useToast = (message, type) => {
  const config = {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
  };

  switch (type) {
    case 'success':
      return toast.success(message, config);
    case 'error':
      return toast.error(message, config);
    case 'warning':
      return toast.warning(message, config);
    default:
      return toast(message, config);
  }
};

export default useToast;
