'use strict';

import React from 'react';

// NavItem is an item in the menu. It instantiates its
// children if it has any.
let NavItem = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    selChanged: React.PropTypes.func.isRequired,
    id: React.PropTypes.string.isRequired,
    selId: React.PropTypes.string.isRequired,
    children: React.PropTypes.arrayOf(React.PropTypes.object),
    expanded: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      expanded: true,
      children: [],
      selId: ''
    }
  },
  getInitialState() {
    return {
      expanded: this.props.expanded
    };
  },
  handleExpClick() { // toggle expanded
    this.setState({expanded: !this.state.expanded});
  },
  handleItemClick(e) {
    this.props.selChanged(this.props.id);
  },
  render() {
    if (this.props.children.length > 0) {
      // this item has children, render it as a group
      let btnCls = this.state.expanded ? 'fa fa-chevron-up' : 'fa fa-chevron-up fa-rotate-180';
      return (
        <li className={this.state.expanded ? '' : 'collapsed'}>
          <div>
            {this.props.label}
            <span className={this.state.expanded ? 'gc' : 'gc collapsed'} onClick={this.handleExpClick}>
              <i className={btnCls}></i>
            </span>
          </div>
          {/* now instantiate the children */}
          <ul>
            {this.props.children.map(function(itm) {
              return <NavItem label={itm.label} children={itm.children} key={itm.id} id={itm.id} selId={this.props.selId} selChanged={this.props.selChanged} />
            }, this)}
          </ul>
        </li>
      );
    } else {
      // this item has no children. It is a clickable leaf item
      let divCls = 'clickableItem';
      if (this.props.id === this.props.selId) {
        divCls += ' selected';
      }
      return (
        <li><div className={divCls} onClick={this.handleItemClick}>{this.props.label}</div></li>
      );
    }
  }
});

// the exported class is the AppNav
export default React.createClass({
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
        return <NavItem label={itm.label} children={itm.children} key={itm.id} id={itm.id} selId={this.props.mdata.selId} selChanged={this.props.selChanged} />
      }, this)}
      </ul>
    </nav>
    );
  }
});
