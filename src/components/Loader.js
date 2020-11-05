import React, { Fragment } from "react";
import Spinner from 'react-bootstrap/Spinner';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Loader.css';

const Loader = () => {
  return (
    <Fragment>
      <Spinner animation='border' role='status' variant='primary' className='spinner' />
      <div className='loadingText'> Loading </div>
    </Fragment>
  );
}

export default Loader;