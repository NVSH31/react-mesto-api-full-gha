import React, { useEffect} from "react";

const Popup = ({isOpen, onClose, popupType, children}) => {
  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <section
      className={`popup ${popupType} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlay}
    >
      <div className="popup__container">
        <button type="button" className="popup__close-icon" onClick={onClose} ></button>
        {children}
      </div>
    </section>
  );
}

export default Popup;
