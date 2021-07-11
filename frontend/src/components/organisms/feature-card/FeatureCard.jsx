import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { PencilSquare, XSquare } from 'react-bootstrap-icons';
import Datetime from 'react-datetime';

import CreatableMulti from './CreatableMulti';
import * as Customer from '../../../utils/customer';

import PropTypes from 'prop-types';

const FeatureCard = ({
  id, isNew, displayName, customerIds,
  description, technicalName, active, expiresOn,
  inverted, onSubmit, onCancel
}) => {

  const [formDisplayName, setDisplayName] = useState(displayName);
  useEffect(() => setDisplayName(displayName), [displayName]);
  const [formDescription, setDescription] = useState(description);
  useEffect(() => setDescription(description), [description]);
  const [formCustomerIds, setCustomerIds] = useState(customerIds);
  useEffect(() => setCustomerIds(customerIds), [customerIds]);
  const [isActive, setIsActive] = useState(active);
  useEffect(() => setIsActive(active), [active]);
  const [isInverted, setIsInverted] = useState(inverted);
  useEffect(() => setIsInverted(inverted), [inverted]);
  const [isEditable, setIsEditable] = useState(isNew);

  return (
    <div>
      <div className='card card-width mb-3'>
        {!isNew &&
          <div className='card-header'>
            <Row>
              <Col>{id}{displayName && ` - ${displayName}`}</Col>
              <Col sm={2} xs={2} className='d-inline-flex'>
                <a href="javascript:void(0)" role="button" onClick={() => setIsEditable(true)}><PencilSquare /></a>
                <a href="javascript:void(0)" role="button"><XSquare color="red" /></a>
              </Col>
            </Row>
          </div>
        }
        <div className="card-body">
          <Form onSubmit={e => {
            onSubmit(e);
            if (!isNew) {
              setIsEditable(false);
            }
          }}>
            {isNew && (
              <Form.Group className="mb-3">
                <Form.Label>Technical Name</Form.Label>
                <Form.Control type="text" placeholder="Technical name" name="technicalName" value={technicalName} />
              </Form.Group>)}
            {isEditable && (
              <Form.Group className="mb-3">
                <Form.Label>Display Name</Form.Label>
                <Form.Control type="text" placeholder="Display name" name="displayName" disabled={!isEditable} value={formDisplayName} onChange={e => setDisplayName(e.target.value)} />
                <input type="hidden" name="technicalName" value={technicalName} />
              </Form.Group>)}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={formDescription} name="description" disabled={!isEditable} onChange={e => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Customers</Form.Label>
              <CreatableMulti name="customerIds" disabled={!isEditable} value={formCustomerIds} onChange={e => setCustomerIds(e)} placeholder="Add customers here..." options={Customer.getCustomerIds()} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expires On</Form.Label>
              <Datetime inputProps={{name: 'expiresOn', disabled: !isEditable }} initialValue={expiresOn} utc={true} dateFormat="YYYY-MM-DDT" timeFormat="HH:mm:ss" />
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Group className="text-start">
                  <Form.Check type="checkbox" name="active" label="Active" disabled={!isEditable} checked={isActive} value={isActive} onChange={() => setIsActive(!isActive)} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="text-start">
                  <Form.Check type="checkbox" name="inverted" label="Inverted" disabled={!isEditable} checked={isInverted} value={isInverted} onChange={() => setIsInverted(!isInverted)} />
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
                  <Button variant="outline" type="button" onClick={() => {
                    if (!isNew) {
                      setIsEditable(false);
                    }
                    if (onCancel) onCancel();
                  }}>
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
