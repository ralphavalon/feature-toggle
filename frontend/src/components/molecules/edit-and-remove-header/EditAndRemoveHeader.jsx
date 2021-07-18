import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { PencilSquare, XSquare } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

const EditAndRemoveHeader = ({
  headerText, onEdit, onRemove, size, className
}) => (<div className='card-header'>
  <Row>
    <Col>{headerText}</Col>
    <Col sm={size} xs={size} md={size + 1} className={className}>
      <a href="javascript:void(0)" role="button" onClick={onEdit}><PencilSquare /></a>
      <a href="javascript:void(0)" role="button" onClick={onRemove}><XSquare color="red" /></a>
    </Col>
  </Row>
</div>
);

EditAndRemoveHeader.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default EditAndRemoveHeader;
