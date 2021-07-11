import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import CustomerToFeature from '../../organisms/customer-to-features';
import FeatureCard from '../../organisms/feature-card';
import FeatureList from '../../organisms/feature-list';

const Home = () => {

  const [isNewFeature, setIsNewFeature] = useState(false);
  const [isAddToFeatureEnabled, setIsAddToFeatureEnabled] = useState(false);

  return (
    <div>
      <Row>
        <Col className="col-sm-5 col-md-3">
          <Button variant="primary" type="button" onClick={() => setIsNewFeature(true)} >
            Add new feature
          </Button>
          {
            isNewFeature && <FeatureCard onSubmit={() => setIsNewFeature(false)} onCancel={() => setIsNewFeature(false)} />
          }
        </Col>
        <Col className="col-sm-5 col-md-3">
          <Button variant="primary" type="button" onClick={() => setIsAddToFeatureEnabled(true)} >
            Add customer to features
          </Button>
          {
            isAddToFeatureEnabled && <CustomerToFeature onSubmit={() => setIsAddToFeatureEnabled(false)} onCancel={() => setIsAddToFeatureEnabled(false)} />
          }
        </Col>
      </Row>
      <FeatureList />
    </div>
  );
};

Home.propTypes = {
  features: PropTypes.array.isRequired,
};

export default Home;
