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
  handleItemClick() { // item selected, invoke callback
    this.props.selChanged(this.props.id);
  },
  render() {
    if (this.props.children.length > 0) {
      // this item has children, render it as a group
      let btnCls = this.state.expanded ? 'fa fa-chevron-up' : 'fa fa-chevron-up fa-rotate-180';
      let btnTitle = this.state.expanded ? 'Collapse' : 'Expand';
      return (
        <li className={this.state.expanded ? '' : 'collapsed'}>
          <div>
            <span className="gc" onClick={this.handleExpClick} title={btnTitle}>
              <i className={btnCls}></i>
            </span>
            {this.props.label}
          </div>
          {/* now process the children */}
          <ul>
            {this.props.children.map(function(itm) {
              return <NavItem label={itm.label} children={itm.children}
              key={itm.id} id={itm.id} selId={this.props.selId}
              selChanged={this.props.selChanged} />
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

export default NavItem;
