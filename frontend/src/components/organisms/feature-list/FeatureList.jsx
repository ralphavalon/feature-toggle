import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col } from 'react-bootstrap';

import FeatureCard from '../feature-card';

const FeatureList = ({ features }) => {

  return (
    <Row>
      {
        features.map(feature => {
          return (
            <Col className="col-sm-5 col-md-3" key={feature.id}>
              <FeatureCard
                key={feature.id}
                id={feature.id}
                displayName={feature.displayName}
                technicalName={feature.technicalName}
                description={feature.description}
                expiresOn={feature.expiresOn}
                active={feature.active}
                inverted={feature.inverted}
                customerIds={feature.customerIds} />
            </Col>
          );
        })
      }
    </Row>
  );
};

FeatureList.propTypes = {
  features: PropTypes.array.isRequired,
};

export default FeatureList;
