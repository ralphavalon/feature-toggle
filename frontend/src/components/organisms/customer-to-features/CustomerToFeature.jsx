import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import PropTypes from 'prop-types';

const CustomerToFeature = ({
  features, onSubmit, onCancel
}) => {

  const showCustomersFromFeatures = () => {
    let customerIds = [];
    features.forEach(f => {
      customerIds = customerIds.concat(f.customerIds.filter((item) => customerIds.indexOf(item) < 0));
    });
    return customerIds.map(id => ({ value: id, label: id }));
  };

  const showFeatures = () => {
    let featureIds = [];
    features.forEach(f => {
      featureIds.push({ value: f.id, label: f.id });
    });
    return featureIds;
  };

  return (
    <div>
      <div className='card card-width mb-3'>
        <div className="card-body">
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Customers</Form.Label>
              <CreatableSelect
                isClearable
                name="customerId"
                options={showCustomersFromFeatures()}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Features</Form.Label>
              <Select
                isMulti
                name="features"
                options={showFeatures()}
              />
            </Form.Group>
            <Row>
              <Col>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
              <Col>
                <Button variant="outline" type="button" onClick={() => {
                  if (onCancel) onCancel();
                }}>
                  Cancel
                </Button>
              </Col>
            </Row>

          </Form>
        </div>
      </div>
    </div>
  );
};

CustomerToFeature.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default CustomerToFeature;
