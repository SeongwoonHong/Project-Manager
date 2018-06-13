/* eslint-disable */
import React from 'react';

import WithClickOutside from 'components/withHOC/WithClickOutside';

const ClickOutside = ({ children }) => children;

const ClickOutsideWrapper = WithClickOutside(ClickOutside);

export default ClickOutsideWrapper;

