import React, { useState } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';

import FeatureCard from '../../organisms/feature-card';
import FeatureList from '../../organisms/feature-list';

const Home = () => {

  const [isNewFeature, setIsNewFeature] = useState(false);

  const handleClose = () => setIsNewFeature(false);
  const handleShow = () => setIsNewFeature(true);

  return (
    <div>
      <Row className="justify-content-center my-3">
        <Col sm="5" md="3">
          <Button variant="primary" type="button" onClick={handleShow} >
            Add new feature
          </Button>
          <Modal show={isNewFeature} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>New feature</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FeatureCard onSubmit={handleClose} onCancel={handleClose} />
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
      <FeatureList />
    </div>
  );
};

export default Home;
