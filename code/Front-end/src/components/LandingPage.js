import React, { Component } from "react";
import { Link } from "react-router-dom"; //react router DOM is used to switch to signup and signin component

//following are .CSS files for icons and styling
import "../assets/css/flaticon.css";
import "../assets/css/myStyle.css";
import "../assets/css/style.css";

import headerLogo from "../assets/img/logo/logo.png";
import workImg from "../assets/img/gallery/how-applybg.png";
import banner from "../assets/img/hero/h1_hero.jpg";
import aboutImg from "../assets/img/service/support-img.jpg";
import footerlogo from "../assets/img/logo/whitelogo.png";
import axios from "axios"; // axios is used to get data from backend API live on horooko
import Congrats from "../signup-assets/images/done.png";
import tryagain from "../signup-assets/images/try.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: null,
      name: null,
      email: null,
      msg: null,
      notification: false,
      Error: false,
      Errormsg: "",
    };
    this.changeNotify = this.changeNotify.bind(this);
  }

  nextPage = (clickedOption) => {
    console.log("here" + clickedOption);
    // this.props.handleEvent(clickedOption);
  };

  //This function shows the navbar of the landing page
  headerDesign() {
    return (
      <nav class="navbar navbar-expand-lg navbar-white navbar-light " id="home">
        <a class="navbar-brand" href="#">
          <img src={headerLogo} />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse " id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto ">
            <li class="nav-item active">
              <a class="nav-link" href="#home">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#aboutUs">
                AboutUs
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#work">
                How It Works
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#contact">
                Contact
              </a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <button class="button navBtn ">
              {" "}
              <Link to="signup" class="routerLink">
                Sign Up{" "}
              </Link>
            </button>
            <button class="button navBtn ">
              {" "}
              <Link to="signin" class="routerLink">
                Sign In{" "}
              </Link>
            </button>
          </form>
        </div>
      </nav>
    );
  }

  //This function display the banner of the landing page
  Sidearea() {
    return (
      <div class="slider-area ">
        <div class="slider-active">
          <div
            class="single-slider slider-height d-flex align-items-center"
            style={{ backgroundImage: "url(" + banner + ")" }}
          >
            <div class="container">
              <div class="row">
                <div class="col-xl-6 col-lg-9 col-md-10">
                  <div class="hero__caption">
                    <h1>We're changing the world with technology </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //About us secttion. Figure and content is imaginary or rough
  AboutUs() {
    return (
      <div class="d-flex justify-content-center w-100" id="aboutUs">
        <div class="support-company-area support-padding fix mt-5 w-75 ">
          <div class="container mt-5">
            <div class="row align-items-center">
              <div class="col-xl-6 col-lg-6">
                <div class="right-caption mr-4">
                  <div class="section-tittle section-tittle2">
                    <span>WHO WE ARE ?</span>
                    <h2>
                      Talented people are getting hired through our platform
                    </h2>
                  </div>
                  <div class="support-caption ">
                    <p class="pera-top">
                      In today's competitive and modern era,The hiring process
                      has evolved.
                    </p>
                    <p>
                      Nowadays when people are being smarter and the trends of
                      work are continuosly evolving, Organizations are now
                      taking real-time tests from the applying candidates in
                      order to select the best. In this regard, We RECONLINE,
                      are providing a platform for all the firms to make the
                      most out of our services and select the best staff for
                      them through our platform
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6">
                <div class="support-location-img" style={{ height: "70%" }}>
                  <img src={aboutImg} alt="" />
                  <div class="support-img-cap text-center">
                    <p>Since</p>
                    <span>2019</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //this function display footer design
  FooterDesign() {
    return (
      <footer>
        <div class="footer-area footer-bg footer-padding">
          <div class="container mt-0">
            <div class="row d-flex justify-content-between mt-0">
              <div class="col-xl-3 col-lg-3 col-md-4 col-sm-5 mt-0">
                <div class="footer-logo mb-20">
                  <a href="index.html">
                    <img class="footer-logo" src={footerlogo} alt="" />
                  </a>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div class="single-footer-caption mb-50">
                  <div class="single-footer-caption mb-30">
                    <div class="footer-tittle">
                      <h4>About Us</h4>
                      <div class="footer-pera">
                        <p>
                          We provide world-class services to the companies.
                          <br />
                          We have been serving 500+ companies{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                <div class="single-footer-caption mb-50">
                  <div class="footer-tittle">
                    <h4>Contact Info</h4>
                    <ul>
                      <li>
                        <p>Address :Plot #177 Shahr e faisal , karachi</p>
                      </li>
                      <li>
                        <a href="#">Phone : +92 15875279</a>
                      </li>
                      <li>
                        <a href="#">Email : info@reconline.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                <div class="single-footer-caption mb-50">
                  <div class="footer-tittle">
                    <h4>Important Link</h4>
                    <ul>
                      <li>
                        <a href="#work">How it work</a>
                      </li>
                      <li>
                        <Link to="signup">Sign up</Link>
                      </li>
                      <li>
                        <Link to="signin">Log In</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  //this  function shows working section
  HowItWork() {
    return (
      <div class="h-25" id="work">
        <div
          class="apply-process-area apply-bg pt-20 pb-50 mt-5 h-75"
          style={{ backgroundImage: "url(" + workImg + ")" }}
        >
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="section-tittle white-text text-center">
                  <span>Register to our platform</span>
                  <h2> How it works</h2>
                </div>
              </div>
            </div>

            <div class="row ">
              <div class="col-lg-4 col-md-6 ">
                <div class="single-process text-center ">
                  <div class="process-ion">
                    <span class="flaticon-search"></span>
                  </div>
                  <div class="process-cap ">
                    <h5>1. Register </h5>
                    <p>
                      Organization have to register itself through filling
                      singup form which require Organization'name , email and
                      password.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="single-process text-center ">
                  <div class="process-ion">
                    <span class="flaticon-curriculum-vitae"></span>
                  </div>
                  <div class="process-cap">
                    <h5>2. Send Invitation </h5>
                    <p>
                      Organization will create tests for its candidates and send
                      invitation link by inputting email address of candidates.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="single-process text-center ">
                  <div class="process-ion">
                    <span class="flaticon-tour"></span>
                  </div>
                  <div class="process-cap">
                    <h5>3. Conduct Test</h5>
                    <p>
                      Organization's designed test link will send to candidates
                      email , by accessing the link candidates can attempt the
                      test.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  Send(event) {
    event.preventDefault();
    console.log(this.state);

    const name = this.state.name;
    const email = this.state.email;
    const subject = this.state.subject;
    const msg = this.state.msg;

    let body = { subject, name, email, msg };
    axios
      .post("https://firstbackendnodejs.herokuapp.com/api/email", body)
      .then((Response) => {
        this.setState({ notification: true, Error: false });
        console.log("done");

        document.getElementById("message").value = "";
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("subject").value = "";
      })
      .catch((error) => {
        console.log("In error");
        console.log(error.response);
        this.setState({
          notification: true,
          Error: true,
          Errormsg: "Sorry ! Could not send.Try again",
        });
      });
  }
  //contactUs form
  ContactUs() {
    return (
      <div
        class="contactForm mx-auto mt-5"
        style={{ width: "40%" }}
        id="contact"
      >
        <h1 class="contact-title text-center">Get in Touch</h1>
        <form
          class="form-contact contact_form"
          id="contactForm"
          onSubmit={(event) => {
            this.Send(event);
          }}
        >
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <textarea
                  class="form-control w-100"
                  name="message"
                  id="message"
                  cols="30"
                  rows="9"
                  onfocus="this.placeholder = ''"
                  onblur="this.placeholder = 'Enter Message'"
                  placeholder=" Enter Message"
                  onChange={(event) => {
                    this.setState({ msg: event.target.value }); //Onchange Set organization'email to state
                  }}
                  required
                ></textarea>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <input
                  class="form-control valid"
                  name="name"
                  id="name"
                  type="text"
                  onfocus="this.placeholder = ''"
                  onblur="this.placeholder = 'Enter your name'"
                  placeholder="Enter your name"
                  onChange={(event) => {
                    this.setState({ name: event.target.value }); //Onchange Set organization'email to state
                  }}
                  required
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <input
                  class="form-control valid"
                  name="email"
                  id="email"
                  type="email"
                  onfocus="this.placeholder = ''"
                  onblur="this.placeholder = 'Enter email address'"
                  placeholder="Email"
                  onChange={(event) => {
                    this.setState({ email: event.target.value }); //Onchange Set organization'email to state
                  }}
                  required
                />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <input
                  class="form-control"
                  name="subject"
                  id="subject"
                  type="text"
                  onfocus="this.placeholder = ''"
                  onblur="this.placeholder = 'Enter Subject'"
                  placeholder="Enter Subject"
                  onChange={(event) => {
                    this.setState({ subject: event.target.value }); //Onchange Set organization'email to state
                  }}
                  required
                />
              </div>
            </div>
          </div>
          <div class="form-group mt-3 d-flex justify-content-center">
            <button type="submit" class="button button-contactForm boxed-btn">
              Send
            </button>
          </div>
        </form>
      </div>
    );
  }
  changeNotify() {
    console.log(this.state);
    this.setState({
      notification: false,
      Error: false,
    });
  }
  render() {
    const showModal = () => {
      console.log("Function called");
      if (this.state.notification) {
        return (
          <div class="modal ">
            <div class="modal-content">
              <button class="ml-auto mr-2" onClick={this.changeNotify}>
                <span class="close ">&times;</span>
              </button>
              {this.state.Error ? (
                <div>
                  <img
                    class="CongartsImg text-center mb-5"
                    src={tryagain}
                    alt="Try again"
                  />
                  <h4>{this.state.Errormsg}</h4>{" "}
                </div>
              ) : (
                <div>
                  <img
                    class="CongartsImg1 text-center mt-5"
                    src={Congrats}
                    alt="congratulations"
                  />
                  <h3 class="mt-4 mb-5">
                    Your message has sent to RecOnline !
                  </h3>
                </div>
              )}
            </div>
          </div>
        );
      } else return <div></div>;
    };

    return (
      <div>
        {/* Above Designed Components rendered below */}
        {this.headerDesign()}
        {this.Sidearea()}
        {this.AboutUs()}
        {this.HowItWork()}
        {this.ContactUs()}
        {this.FooterDesign()}
        {showModal()}
      </div>
    );
  }
}

export default Header;
