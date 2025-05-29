// styles
import "./Modal.css";

const Modal = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal_content_instructions">{children}</div>
    </div>
  );
};

const SideModal = ({ children }) => {
  return <div className="modal_fixed_right">{children}</div>;
};

export { Modal, SideModal };