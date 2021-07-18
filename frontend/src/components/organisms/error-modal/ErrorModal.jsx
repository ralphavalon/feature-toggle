import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { StoreContext } from '../../../utils/store';

const ErrorModal = () => {

  const { error: [hasError, setHasError] } = useContext(StoreContext);

  const handleClose = () => setHasError(false);

  return (
    <Modal show={hasError} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Something went wrong!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Unable to complete the request. Please check your data and try again later.</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
