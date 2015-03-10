'use strict';

import React from 'react';
import AppNav from './components/AppNav.jsx!';
import data from './data';

var appNav;

function selChanged(selId) {
  data.selId = selId;
  appNav.setProps({mdata: data});
}

appNav = React.render(<AppNav expanded={true} mdata={data} selChanged={selChanged} />, document.getElementById('navCtr'));
