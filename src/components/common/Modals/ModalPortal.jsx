import reactDom from 'react-dom';

const ModalPortal = ({ children }) => {
  const element = document.getElementById('modal');
  return reactDom.createPortal(children, element);
};

export default ModalPortal;
