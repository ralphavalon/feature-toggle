import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { PencilSquare, XSquare } from 'react-bootstrap-icons';

import CreatableMulti from './CreatableMulti';

import PropTypes from 'prop-types';

const FeatureCard = ({ id, displayName, description, className }) => {

  const [isEditable, setIsEditable] = useState(false);

  return (
    <div className="col-sm-4">
      <div className={`card card-width mb-3 ${className}`}>
        <div className="card-header">
          <Row>
            <Col>{id} - {displayName}</Col>
            <Col sm={2} xs={2}>
              <a href="#" role="button" onClick={() => setIsEditable(true)}><PencilSquare /></a>
              <a href="#" role="button"><XSquare color="red" /></a>
            </Col>
          </Row>
        </div>
        <div className="card-body">
          <Form>
            {isEditable && (
              <Form.Group controlId="exampleForm.ControlTextarea1" className="mb-3">
                <Form.Label>Display Name</Form.Label>
                <Form.Control type="text" placeholder="Display name" disabled={!isEditable} />
              </Form.Group>)}
            <Form.Group controlId="exampleForm.ControlTextarea1" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={description} disabled={!isEditable} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1" className="mb-3">
              <Form.Label>Customers</Form.Label>
              <CreatableMulti disabled={!isEditable} />
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formBasicCheckbox" className="text-start">
                  <Form.Check type="checkbox" label="Active" disabled={!isEditable} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicCheckbox" className="text-start">
                  <Form.Check type="checkbox" label="Inverted" disabled={!isEditable} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="primary" type="submit" disabled={!isEditable}>
                  Submit
                </Button>
              </Col>
              {isEditable && (
                <Col>
                  <Button variant="outline" type="button" onClick={() => setIsEditable(false)}>
                    Cancel
                  </Button>
                </Col>)}
            </Row>

          </Form>
        </div>
      </div>
    </div>
  );
};

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default FeatureCard;
