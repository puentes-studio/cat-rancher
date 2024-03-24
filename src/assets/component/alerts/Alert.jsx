import PropTypes from "prop-types";
import Modal from "react-modal";
import "./Alert.css";

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

AlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AlertModal;
