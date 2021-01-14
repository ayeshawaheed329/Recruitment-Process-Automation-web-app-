import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "../organizationPortalAssets/dist/css/adminlte.min.css";
import "../organizationPortalAssets/dist/css/style1.css";
import axios from "axios"; // axios is used to get data from backend API live on horooko
import { withRouter } from "react-router-dom";
import tryagain from "../signup-assets/images/try.png";
import Congrats from "../signup-assets/images/congrats.png";

class testStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      code: "",
      notification: false,
      Error: false,
      Errormsg: "",
    };
    this.changeNotify = this.changeNotify.bind(this);
  }
  startTest(event) {
    event.preventDefault();
    console.log(this.state);

    const name = this.state.name;
    const email = this.state.email;
    let code = this.state.code;
    let body = { name, email };
    let api = "https://firstbackendnodejs.herokuapp.com/api/candidates/" + code;
    axios
      .post(api, body)
      .then((Response) => {
        console.log("Done");
        console.log(Response);
        localStorage.setItem("TestCode", Response.data);
        this.props.history.push("/StartTest");
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          notification: true,
          Error: true,
          Errormsg: "You can not access the test !",
        });
      });
  }
  //This function is to close the Modal that popup after Loged In to system
  changeNotify() {
    console.log(this.state);
    this.setState({
      notification: false,
      Error: false,
    });
  }
  infoForm() {
    return (
      <section class="content mb-5">
        <form
          role="form"
          id="quickForm"
          class="w-50 mx-auto mt-5 termForm"
          onSubmit={(event) => {
            this.startTest(event);
          }}
        >
          <div class="card-body pagebody">
            <h4>Dear candidate! </h4>
            <p>please read the instructions carefully</p>
            <p>
              GENERAL INSTRUCTIONS: 1. Make sure you have good interenet
              connection.
            </p>
            <p>
              {" "}
              2. Shut down all the instant messaging tools(skype, AIM, MSN
              messanger) and email programs as they can conflict with
              Blackboard.
            </p>
            <p>3. Once you started your test, you have to complete it</p>
            <p>4. You can not restart yoour test again and again</p>

            <div class="form-group">
              <label for="exampleInputPassword1">Name</label>
              <input
                type="text"
                name="name"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Enter your name "
                onChange={(event) => {
                  this.setState({ name: event.target.value });
                }}
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                name="email"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Enter email"
                onChange={(event) => {
                  this.setState({ email: event.target.value });
                }}
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Test code</label>
              <input
                type="password"
                name="code"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Enter code sent to your email "
                onChange={(event) => {
                  this.setState({ code: event.target.value });
                }}
                required
              />
            </div>
            <div class="form-group mb-0">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  name="terms"
                  class="custom-control-input"
                  id="exampleCheck1"
                  required
                />
                <label class="custom-control-label" for="exampleCheck1">
                  I agree to the{" "}
                  <a href="#" style={{ color: "#28395a" }}>
                    terms and conditions
                  </a>
                  .
                </label>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <button
              type="submit"
              class="obtn btn-primary testSubmit"
              style={{ backgroundColor: "#28395a", color: "white" }}
            >
              Get Started
            </button>

            <p class="mt-1">
              Success consists of going from failure to failure without loss of
              enthusiasm
            </p>
          </div>
        </form>
      </section>
    );
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
                </div>
              )}
            </div>
          </div>
        );
      } else return <div></div>;
    };
    return (
      <body className="wrapper termPge">
        {this.infoForm()} {showModal()}
      </body>
    );
  }
}

export default withRouter(testStart);
