import Modal from "react-modal";
import "./Alert.css";

// Set app element for accessibility
Modal.setAppElement("#root");

const AlertModal = ({ isOpen, message, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className="alert-container">
        <p className="alert-message">{message}</p>
        <button className="close-alert-button" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default AlertModal;
