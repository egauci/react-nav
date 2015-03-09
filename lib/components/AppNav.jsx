'use strict';

import React from 'react/addons';

let prevSel = null;

let NavList = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.arrayOf(React.PropTypes.object),
    expanded: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      expanded: true,
      children: [],
      selected: false
    }
  },
  getInitialState() {
    return {
      expanded: this.props.expanded,
      selected: prevSel ? false : this.props.selected
    };
  },
  handleExpClick() {
    this.setState({expanded: !this.state.expanded});
  },
  handleItemClick(e) {
    if (!this.state.selected) {
      if (prevSel) {
        prevSel.setState({selected: false});
      }
      prevSel = this;
    }
    this.setState({selected: !this.state.selected});
  },
  componentDidMount() {
    if (this.state.selected) {
      prevSel = this;
    }
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
              return <NavList label={itm.label} children={itm.children} selected={itm.selected} />
            })}
          </ul>
        </li>
      );
    } else {
      let divCls = 'clickableItem';
      divCls += this.state.selected ? ' selected' : '';
      return (
        <li><div className={divCls} onClick={this.handleItemClick}>{this.props.label}</div></li>
      );
    }
  }
});

export default React.createClass({
  propTypes: {
    expanded: React.PropTypes.bool,
    nodes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
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
      {this.props.nodes.map(function(itm) {
        return <NavList label={itm.label} children={itm.children} selected={itm.selected} />
      })}
      </ul>
    </nav>
    );
  }
});
