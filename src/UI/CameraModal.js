
import Webcam from "react-webcam";
import React from "react";
import { Button,Modal } from "react-bootstrap";

const CameraModal = () => {
  const [show, setShow] = React.useState(false);
  const [userMedia, setUserMedia] = React.useState(false);

  const handleShow = React.useCallback(() => setShow(true), [setShow]);

  const handleClose = React.useCallback(
    () => {
      setShow(false);
      setUserMedia(false);
    },
    [setShow, setUserMedia]
  );

  const handleOnUserMedia = React.useCallback(() => setUserMedia(true), [
    setUserMedia
  ]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch Modal Webcam
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        dialogClassName={`my-modal my-modal--${userMedia ? "show" : "hide"}`}
      >
        <Modal.Header>
          <Modal.Title>React Webcam Modal Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Webcam
            audio={false}
            onUserMedia={handleOnUserMedia}
            onUserMediaError={handleOnUserMedia}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CameraModal;