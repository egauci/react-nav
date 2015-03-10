'use strict';

import React from 'react/addons';

let NavList = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    selChanged: React.PropTypes.function.isRequired,
    id: React.PropTypes.function.isRequired,
    selId: React.PropTypes.function.isRequired,
    children: React.PropTypes.arrayOf(React.PropTypes.object),
    expanded: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      expanded: true,
      children: [],
      selItem: ''
    }
  },
  getInitialState() {
    return {
      expanded: this.props.expanded
    };
  },
  handleExpClick() {
    this.setState({expanded: !this.state.expanded});
  },
  handleItemClick(e) {
    this.props.selChanged(this.props.id);
  },
  render() {
    if (this.props.children.length > 0) {
      let btnCls = this.state.expanded ? 'fa fa-chevron-up' : 'fa fa-chevron-up fa-rotate-180';
      return (
        <li className={this.state.expanded ? '' : 'collapsed'}>
          <div>
            {this.props.label}
            <span className={this.state.expanded ? 'gc' : 'gc collapsed'} onClick={this.handleExpClick}>
              <i className={btnCls}></i>
            </span>
          </div>
          <ul>
            {this.props.children.map(function(itm) {
              return <NavList label={itm.label} children={itm.children} id={itm.id} selItem={this.props.selItem} selChanged={this.props.selChanged} />
            })}
          </ul>
        </li>
      );
    } else {
      let divCls = 'clickableItem';
      if (this.id === this.props.selItem) {
        divCls += ' selected';
      }
      return (
        <li><div className={divCls} onClick={this.handleItemClick}>{this.props.label}</div></li>
      );
    }
  }
});

export default React.createClass({
  propTypes: {
    expanded: React.PropTypes.bool,
    mdata: React.PropTypes.object.isRequired,
    selChanged: React.PropTypes.function.isRequired
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
    let btnCls = this.state.expanded ? "fa fa-hand-o-left fa-border" : "fa-flip-horizontal fa fa-hand-o-left fa-border";
    return (
    <nav className={this.state.expanded ? '' : 'collapsed'}>
      <div className="expCtrl">
        <i className={btnCls} onClick={this.handleClick}></i>
      </div>
      <ul>
      {this.props.mdata.nodes.map(function(itm) {
        return <NavList label={itm.label} children={itm.children} id={itm.id} selItem={this.props.mdata.selItem} selChanged={this.props.selChanged} />
      })}
      </ul>
    </nav>
    );
  }
});
