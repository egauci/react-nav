'use strict';

import React from 'react';
import AppNav from './components/AppNav.jsx!';
import data from './data';

React.render(<AppNav expanded={true} nodes={data} />, document.getElementById('navCtr'));
