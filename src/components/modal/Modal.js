// styles
import "./Modal.css";

const Modal = ({ children }) => {

    return (
        <div className='modal'>
            <div className='modal_content_instructions'>
                {children}
            </div>
        </div>
    )
}

export { Modal };