import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import reclogo from "../assets/img/logo/whitelogo.png";
import { withRouter } from "react-router-dom";

//This components displays the top and side navbar
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: props.routes,
      isNavOpen: false,
      organLogo: "",
    };
  }
  componentDidMount() {
    var _this = this;

    const logo = localStorage.getItem("Organlogo");
    if (logo == null) this.props.history.push("/home");
    _this.setState({ organLogo: logo });
  }
  logOut() {
    localStorage.getItem("accessToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("Organlogo");
    this.props.history.push("/home");
  }
  //Top navbar have toggle button and organization logo
  topnavbar() {
    return (
      <nav
        class="main-header navbar navbar-expand navbar-light"
        style={{ backgroundColor: "#28395a" }}
      >
        <ul class="navbar-nav">
          <li class="nav-item"></li>
        </ul>

        <ul class="ml-auto">
          <NavDropdown
            title={
              <img
                class="organization-logo"
                src={this.state.organLogo}
                alt=""
              />
            }
            id="basic-nav-dropdown"
            style={{ color: "white" }}
          >
            <NavDropdown.Item href="./EditProfile">
              Edit Profile
            </NavDropdown.Item>

            <NavDropdown.Item
              onClick={() => {
                this.logOut();
              }}
            >
              Sign Out
            </NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
        </ul>
      </nav>
    );
  }

  //Side navbar have options/switch to switch
  sidenavbar() {
    let routes = this.state.routes;
    return (
      <aside class="main-sidebar sidebar-dark-primary elevation-4 aside-set">
        <a href="#" class="brand-link">
          <a href="index.html">
            <img class="footer-logo" src={reclogo} alt="" />
          </a>
        </a>

        <div class="sidebar">
          <nav class="mt-2">
            <ul
              class="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {routes.map((prop, key) => {
                return prop.icon === "" ? (
                  <Link to={prop.layout + prop.path} key={key}></Link>
                ) : (
                  <li key={key} class="nav-item has-treeview">
                    <a href="#" class="nav-link w-90 ml-0">
                      <Link to={prop.layout + prop.path} key={key}>
                        <i class={prop.icon}></i>
                        <p>{prop.name}</p>
                      </Link>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
  render() {
    return (
      <React.Fragment>
        {this.topnavbar()}
        {this.sidenavbar()}
      </React.Fragment>
    );
  }
}

export default withRouter(Navbar);
