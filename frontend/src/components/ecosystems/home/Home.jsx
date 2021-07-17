import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import FeatureCard from '../../organisms/feature-card';
import FeatureList from '../../organisms/feature-list';

const Home = () => {

  const [isNewFeature, setIsNewFeature] = useState(false);

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
      </Row>
      <FeatureList />
    </div>
  );
};

export default Home;
