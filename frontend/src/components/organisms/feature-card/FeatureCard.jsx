import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import PropTypes from 'prop-types';

import FormInputField from '../../molecules/form-input-field';
import FormSelectField from '../../molecules/form-select-field';
import * as Customer from '../../../utils/customer';
import EditAndRemoveHeader from '../../molecules/edit-and-remove-header';
import FormCheckboxField from '../../molecules/form-checkbox-field';

const FeatureCard = ({
  id, isNew, displayName, customerIds,
  description, technicalName, active, expiresOn,
  inverted, onSubmit, onCancel, invalid
}) => {

  const [isEditable, setIsEditable] = useState(isNew);
  const disableEditing = () => !isNew && setIsEditable(false);
  const submitForm = e => {
    onSubmit(e) && disableEditing();
  };
  const cancelForm = () => {
    disableEditing();
    if (onCancel) onCancel();
  };

  return (
    <div>
      <div className='card card-width mb-3'>
        {!isNew && <EditAndRemoveHeader headerText={displayName ? `${id} - ${displayName}` : id}
          onEdit={() => setIsEditable(true)} size={3} className='d-flex justify-content-between' />}
        <div className="card-body">
          <Form noValidate onSubmit={submitForm}>
            {isNew && (
              <FormInputField label="Technical Name" inputType="text" value={technicalName} name="technicalName"
                placeholder="Technical name" className="mb-3" invalidMessage={invalid.technicalName} />
            )}
            {isEditable && (
              <React.Fragment>
                <FormInputField label="Display Name" inputType="text" value={displayName} disabled={!isEditable}
                  name="displayName" placeholder="Display name" className="mb-3" />
                <input type="hidden" name="technicalName" value={technicalName} />
              </React.Fragment>
            )}
            <FormInputField label="Description" inputType="textarea" value={description} name="description" disabled={!isEditable} inputProps={{ rows: 3 }} />
            <FormSelectField label="Customers" name="customerIds" value={customerIds} name="customerIds" className="mb-3"
              disabled={!isEditable} placeholder="Add customers here..." options={Customer.getCustomerIds()}
              invalidMessage={invalid.customerIds} />
            <Form.Group className="mb-3">
              <Form.Label>Expires On</Form.Label>
              <Datetime inputProps={{ name: 'expiresOn', disabled: !isEditable }} initialValue={expiresOn} utc={true} dateFormat="YYYY-MM-DDT" timeFormat="HH:mm:ss" />
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <FormCheckboxField className="text-start" name="active" label="Active" disabled={!isEditable} value={active} />
              </Col>
              <Col>
                <FormCheckboxField className="text-start" name="inverted" label="Inverted" disabled={!isEditable} value={inverted} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="primary" type="submit" disabled={!isEditable}>Submit</Button>
              </Col>
              {isEditable && (
                <Col>
                  <Button variant="outline" type="button" onClick={cancelForm}>Cancel</Button>
                </Col>)}
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

FeatureCard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.object.isRequired,
  active: PropTypes.bool,
  customerIds: PropTypes.array,
  description: PropTypes.string,
  displayName: PropTypes.string,
  expiresOn: PropTypes.string,
  id: PropTypes.string,
  inverted: PropTypes.bool,
  isNew: PropTypes.bool,
  onCancel: PropTypes.func,
  technicalName: PropTypes.string,
};

FeatureCard.defaultProps = {
  invalid: {}
};

export default FeatureCard;
