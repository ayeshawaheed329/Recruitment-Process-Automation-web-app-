import React, { Component } from "react";
import { Link } from "react-router-dom"; //In this file react router is used to move to sign in page and move back to landing page

import "../signup-assets/css/main.css"; //CSS file for styling components

//The following are assets used in the components
import bgImg from "../signup-assets/images/bg-01.jpg";
import Congrats from "../signup-assets/images/congrats.png";
import tryagain from "../signup-assets/images/try.png";

import axios from "axios"; // axios is used to get data from backend API live on horooko

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      logo: "",
      notification: false,
      Error: false,
      Errormsg: "",
    };
    this.changeNotify = this.changeNotify.bind(this);
  }

  /*This function is used for backend (data binding ) purpose. It keep data from state and send it to API */
  signup(event) {
    event.preventDefault();
    const { name, email, password, logo } = this.state;

    let body = { name, email, password, logo };

    console.warn(this.state);

    axios
      .post("https://firstbackendnodejs.herokuapp.com/api/users", body)
      .then((Response) => {
        this.setState({ notification: true, Error: false });
        console.log(Response);
      })
      .catch((error) => {
        console.log("In error");
        console.log(error.response);
        this.setState({
          notification: true,
          Error: true,
          Errormsg: error.response.data,
        });
      });
  }

  //The following function has complete HTML CSS design for signup form
  signupForm() {
    return (
      <div class="container-contact100">
        <div class="wrap-contact100">
          <form
            class="contact100-form validate-form"
            onSubmit={(event) => {
              this.signup(event);
            }}
          >
            <span class="contact100-form-title">Sign Up</span>

            <div
              class="wrap-input100 validate-input"
              data-validate="Name is required"
            >
              <label class="label-input100">Organization's name</label>
              <input
                id="name"
                class="input100"
                type="text"
                name="name"
                placeholder="Enter organization's name..."
                onChange={(event) => {
                  this.setState({ name: event.target.value });
                }}
                required
              />
              <span class="focus-input100"></span>
            </div>

            <div
              class="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <label class="label-input100">organization's email Address</label>
              <input
                id="email"
                class="input100"
                type="email"
                name="email"
                placeholder="Enter organization's email Address.."
                onChange={(event) => {
                  this.setState({ email: event.target.value });
                }}
                required
              />
              <span class="focus-input100"></span>
            </div>
            <div class="wrap-input100 validate-input">
              <label class="label-input100">Password</label>
              <input
                id="password"
                class="input100"
                type="password"
                name="password"
                placeholder="Enter password..."
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
                required
              />
              <span class="focus-input100"></span>
            </div>
            <div class="wrap-input100 validate-input">
              <label class="label-input100">Logo</label>
              <input
                id="logo"
                class="input100"
                type="text"
                name="logo"
                placeholder="Upload logo URL..."
                onChange={(event) => {
                  this.setState({ logo: event.target.value });
                }}
                required
              />
              <span class="focus-input100"></span>
            </div>

            <div class="container-contact100-form-btn">
              <button class="contact100-form-btn" type="submit">
                Sign Up
              </button>
            </div>

            <div class="text-center mt-3">
              Already have an account ?{" "}
              <Link class="smallLink" to="signin">
                {" "}
                Sign In
              </Link>
            </div>
            <div class="text-center mt-3">
              {" "}
              <Link to="home" class="smallLink">
                Go Back
              </Link>
            </div>
            {/*}   <div class="contact100-form-social flex-c-m">
                            <a href="#" class="contact100-form-social-item flex-c-m bg1 m-r-5">
                                <i class="fa fa-facebook-f" aria-hidden="true"></i>
                            </a>

                            <a href="#" class="contact100-form-social-item flex-c-m bg2 m-r-5">
                                <i class="fa fa-twitter" aria-hidden="true"></i>
                            </a>

                            <a href="#" class="contact100-form-social-item flex-c-m bg3">
                                <i class="fa fa-youtube-play" aria-hidden="true"></i>
                            </a>
        </div>*/}
          </form>

          <div
            class="contact100-more flex-col-c-m"
            style={{ backgroundImage: "url(" + bgImg + ")" }}
          ></div>
        </div>
      </div>
    );
  }

  //This function is to close the Modal that popup after Loged In to system
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
                    class="CongartsImg text-center"
                    src={Congrats}
                    alt="congratulations"
                  />
                  <h4 class="mt-4">
                    Now you can successfully login to our system
                  </h4>
                  <Link to="signin">
                    <button class="contact100-form-btn mt-4 ">Sign In</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        );
      } else return <div></div>;
    };
    return (
      <div>
        {this.signupForm()}
        {showModal()}
      </div>
    );
  }
}

export default Signup;
