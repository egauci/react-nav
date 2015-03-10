'use strict';

import React from 'react';
import NavItem from './NavItem.jsx!';

// the exported class is the AppNav
let AppNav = React.createClass({
  propTypes: {
    expanded: React.PropTypes.bool,     // initial state
    mdata: React.PropTypes.object.isRequired, // selection and nodes
    selChanged: React.PropTypes.func.isRequired // callback for selection change
  },
  getDefaultProps() {
    return {
      expanded: false
    };
  },
  getInitialState() {
    return {
      expanded: this.props.expanded
    };
  },
  handleClick() {
    this.setState({expanded: !this.state.expanded});
  },
  render() {
    let btnCls, btnTitle;
    if (this.state.expanded) {
      btnCls = 'fa fa-hand-o-left fa-border';
      btnTitle = 'Collapse'
    } else {
      btnCls = 'fa-flip-horizontal fa fa-hand-o-left fa-border';
      btnTitle = 'Expand'
    }
    return (
    <nav className={this.state.expanded ? '' : 'collapsed'}>
      <div className="expCtrl" role="button" title={btnTitle}>
        <i className={btnCls} onClick={this.handleClick}></i>
      </div>
      <ul>
      {this.props.mdata.nodes.map(function(itm) {
        return <NavItem label={itm.label} children={itm.children}
        key={itm.id} id={itm.id} selId={this.props.mdata.selId}
        selChanged={this.props.selChanged} />
      }, this)}
      </ul>
    </nav>
    );
  }
});

export default AppNav;
