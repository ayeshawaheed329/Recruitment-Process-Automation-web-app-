import React, { Component } from "react";
import "../signup-assets/css/main.css";

import bgImg from "../signup-assets/images/bg-01.jpg";
import { Link } from "react-router-dom";

import axios from "axios"; // axios is used to get data from backend API live on horooko

import { withRouter } from "react-router-dom";
import tryagain from "../signup-assets/images/try.png";

class forgetPasswordCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      notification: false,
      Error: false,
      Errormsg: "",
    };
    this.changeNotify = this.changeNotify.bind(this);
  }
  /*This is function show siginform ask to enter a code sent to email 
    in order to reset password and verify account */

  verify(event) {
    const code = this.state.code;

    let body = { code };

    event.preventDefault();
    axios
      .post(
        "https://firstbackendnodejs.herokuapp.com/api/password/verifycode",
        body
      )
      .then((Response) => {
        console.log(Response.data);
        localStorage.setItem("emailID", Response.data._id);
        this.props.history.push("/resetPassword");
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
  signinForm() {
    return (
      <div class="container-contact100">
        <div class="wrap-contact100">
          <form
            class="contact100-form validate-form"
            onSubmit={(event) => {
              this.verify(event);
            }}
          >
            <span class="contact100-form-title">Reset Password</span>

            <div
              class="wrap-input100 validate-input mb-2"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <label class="label-input100" for="email">
                Code
              </label>
              <input
                id="email"
                class="input100"
                type="text"
                name="code"
                placeholder="Enter code sent to organization's email"
                onChange={(event) => {
                  this.setState({ code: event.target.value }); //Onchange Set organization'email to state
                }}
                required
              />
              <span class="focus-input100"></span>
            </div>

            <div class="container-contact100-form-btn mt-4">
              <button class="contact100-form-btn"> Verify</button>
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
            {/*} <div class="contact100-form-social flex-c-m">
                            <a href="#" class="contact100-form-social-item flex-c-m bg1 m-r-5">
                                <i class="fa fa-facebook-f" aria-hidden="true"></i>
                            </a>

                            <a href="#" class="contact100-form-social-item flex-c-m bg2 m-r-5">
                                <i class="fa fa-twitter" aria-hidden="true"></i>
                            </a>

                            <a href="#" class="contact100-form-social-item flex-c-m bg3">
                                <i class="fa fa-youtube-play" aria-hidden="true"></i>
                            </a>
        </div> */}
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

              <div>
                <img
                  class="CongartsImg text-center mb-5"
                  src={tryagain}
                  alt="Try again"
                />
                <h4>{this.state.Errormsg}</h4>{" "}
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

export default withRouter(forgetPasswordCode);
