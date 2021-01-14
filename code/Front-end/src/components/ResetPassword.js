import React, { Component } from "react";
import "../signup-assets/css/main.css";

import bgImg from "../signup-assets/images/bg-01.jpg";
import { Link } from "react-router-dom";

import axios from "axios"; // axios is used to get data from backend API live on horooko

import { withRouter } from "react-router-dom";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      retypePass: "",
    };
  }
  saveChanges(event) {
    if (this.state.password == this.state.retypePass) {
      const password = this.state.password;
      const id = localStorage.getItem("emailID");

      console.log("ID", id);
      console.log("pass", password);
      let body = { id, password };

      console.warn(this.state);
      event.preventDefault();
      axios
        .post(
          "https://firstbackendnodejs.herokuapp.com/api/password/newpassword",
          body
        )
        .then((Response) => {
          console.log(Response.data);
          this.props.history.push("/signin");
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else alert("Password Does not Match");
  }

  signinForm() {
    return (
      <div class="container-contact100">
        <div class="wrap-contact100">
          <form class="contact100-form validate-form">
            <span class="contact100-form-title">Reset Password</span>

            <div
              class="wrap-input100 validate-input mb-2"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <label class="label-input100" for="newPassword">
                New Password
              </label>
              <input
                id="newPassword"
                class="input100"
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                onChange={(event) => {
                  this.setState({ password: event.target.value }); //Onchange Set organization'email to state
                }}
              />
              <span class="focus-input100"></span>
            </div>
            <div
              class="wrap-input100 validate-input mb-2"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <label class="label-input100" for="retypePass">
                Retype Password
              </label>
              <input
                id="retypePass"
                class="input100"
                type="password"
                name="retypePass"
                placeholder="Retype above entered password"
                onChange={(event) => {
                  this.setState({ retypePass: event.target.value }); //Onchange Set organization'email to state
                }}
              />
              <span class="focus-input100"></span>
            </div>

            <div class="container-contact100-form-btn mt-4">
              <button
                class="contact100-form-btn"
                onClick={(event) => {
                  this.saveChanges(event);
                }}
              >
                {" "}
                Save Changes
              </button>
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
  render() {
    return <div>{this.signinForm()}</div>;
  }
}

export default withRouter(ResetPassword);
