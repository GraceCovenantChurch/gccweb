import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import classnames from 'classnames';
const styles = (typeof CSS !== 'undefined') && require('./Navbar.css');

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      collapsing: false,
      in: false,
      height: 'auto',
    };
  }

  toggle() {
    let collapsed = this.state.collapsed;
    let previousHeight = !collapsed ? `${15 + 40 * 3 + 1}px` : '1px';
    let nextHeight = collapsed ? `${15 + 40 * 3 + 1}px` : '1px'

    this.setState({
      collapsed: !collapsed,
      collapsing: true,
      height: previousHeight,
      in: !collapsed ? false : undefined,
    }, () => {
      process.nextTick(() => {
        this.setState({
          height: nextHeight,
        }, () => {
          setTimeout(() => {
            this.setState({
              collapsing: false,
              height: 'auto',
              in: collapsed ? true : undefined,
            });
          }, 300);
        });
      });
    });
  }

  open() {
    if (this.state.collapsed) {
      this.toggle();
    }
  }

  close() {
    if (!this.state.collapsed) {
      this.toggle();
    }
  }

  render() {
    const navbar = this;
    class NavLink extends Component {
      render() {
        return <Link {...this.props} onClick={() => navbar.close()} />;
      }
    };

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <NavLink className="navbar-brand" to="/">
              <h1 className="sr-only">Grace Covenant Church</h1>
              <img src="/static/images/gcclogo.jpg" />
            </NavLink>
            <button className={classnames('navbar-toggle', {
              collapsed: this.state.collapsed,
            })} type="button" onClick={this.toggle.bind(this)}>
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>

          <div className={classnames('navbar-collapse', {
            in: this.state.in,
            collapsing: this.state.collapsing,
            collapse: !this.state.collapsing,
          })} style={{
            height: this.state.height,
          }}>
            <ul className="nav navbar-nav navbar-right">
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/page">Page</NavLink></li>
              <li><NavLink to="/pages/async">Async Page</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
