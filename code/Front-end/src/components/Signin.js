import React, { Component } from "react";
import { Link } from "react-router-dom"; //In this file react router is used to move to sign Up page and move back to landing page

import "../signup-assets/css/main.css"; //Styling sheet for styling component

import bgImg from "../signup-assets/images/bg-01.jpg"; //Half screen Image

import axios from "axios"; // axios is used to get data from backend API live on horooko

import { withRouter } from "react-router-dom";
import tryagain from "../signup-assets/images/try.png";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      Error: false,
      Errormsg: "",
    };
    this.changeNotify = this.changeNotify.bind(this);
  }

  /*This function is used for backend (data binding ) purpose. It keep data from state and send it to API */
  signin(event) {
    event.preventDefault();

    const { email, password } = this.state;

    let body = { email, password };

    console.warn(this.state);

    axios
      .post("https://firstbackendnodejs.herokuapp.com/api/auth", body)
      .then((Response) => {
        console.log(Response.data.token);
        // localStorage.setItem('payload', JSON.stringify(Response))
        localStorage.setItem("accessToken", Response.data.token);
        localStorage.setItem("Organlogo", Response.data.logo);

        this.props.history.push("/user");
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({
          Error: true,
          Errormsg: error.response.data.error,
        });
      });
  }
  // This function is use to display signin form
  signinForm() {
    return (
      <div class="container-contact100">
        <div class="wrap-contact100">
          <form
            class="contact100-form validate-form"
            onSubmit={(event) => {
              this.signin(event);
            }}
          >
            <span class="contact100-form-title">Sign In</span>

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
                  this.setState({ email: event.target.value }); //Onchange Set organization'email to state
                }}
                required
              />
              <span class="focus-input100"></span>
            </div>
            <div class="wrap-input100 validate-input">
              <label class="label-input100">Password</label>
              <input
                id="email"
                class="input100"
                type="password"
                name="password"
                placeholder="Enter password..."
                onChange={(event) => {
                  this.setState({ password: event.target.value }); //Onchange set organization state password to inputted data
                }}
                required
              />
              <span class="focus-input100"></span>
            </div>
            <div>
              <Link to="forgetPassword" class="forgetPassword">
                Forget Password?
              </Link>
            </div>

            <div class="container-contact100-form-btn mt-2">
              <button class="contact100-form-btn">Sign In</button>
            </div>

            <div class="text-center mt-5">
              Don't have an account ?{" "}
              <Link class="smallLink" to="signup">
                {" "}
                Sign Up
              </Link>
            </div>
            <div class="text-center mt-3">
              {" "}
              <Link to="home" class="smallLink">
                Go Back
              </Link>
            </div>
          </form>

          <div
            class="contact100-more flex-col-c-m"
            style={{ backgroundImage: "url(" + bgImg + ")" }}
          ></div>
        </div>
      </div>
    );
  }
  changeNotify() {
    console.log(this.state);
    this.setState({
      Error: false,
    });
  }
  render() {
    const showModal = () => {
      console.log("Function called");
      if (this.state.Error) {
        return (
          <div class="modal ">
            <div class="modal-content">
              <button class="ml-auto mr-2" onClick={this.changeNotify}>
                <span class="close ">&times;</span>
              </button>

              <div>
                <img
                  class="CongartsImg text-center"
                  src={tryagain}
                  alt="congratulations"
                />
                <h4 class="mt-4">{this.state.Errormsg}</h4>
                <Link to="signup">
                  <button class="contact100-form-btn mt-4 ">Sign Up</button>
                </Link>
              </div>
            </div>
          </div>
        );
      } else return <div></div>;
    };
    return (
      <div>
        {this.signinForm()}
        {showModal()}
      </div>
    );
  }
}

export default withRouter(Signin);
