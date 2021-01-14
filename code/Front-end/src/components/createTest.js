import React, { Component } from "react";

import axios from "axios"; // axios is used to get data from backend API live on horooko

import { withRouter } from "react-router-dom";

class createTest extends Component {
  //This function is the start to create a test . Ask organization to enter no of question and for the position test is desinging
  constructor(props) {
    super(props);
    this.state = {
      position: "",
    };
  }

  startTest(event) {
    const { position } = this.state;

    let body = { position };
    const token = localStorage.getItem("accessToken");
    console.log("Header", token);
    console.warn(this.state);
    event.preventDefault();
    axios
      .post("https://firstbackendnodejs.herokuapp.com/api/tests", body, {
        headers: {
          "x-auth-token": `${token}`,
        },
      })
      .then((Response) => {
        localStorage.setItem("testID", Response.data._id);
        this.props.history.push("questions");
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  showTestWindow() {
    return (
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Create New Test</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li class="breadcrumb-item active">Create Test</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="card card-primary">
                  <div
                    class="card-header"
                    style={{ backgroundColor: "#28395a" }}
                  >
                    <h3 class="card-title">Initiate Test</h3>
                  </div>

                  <form
                    role="form"
                    onSubmit={(event) => {
                      this.startTest(event);
                    }}
                  >
                    <div class="card-body">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Position</label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          placeholder="Enter designation for which you're creating test"
                          onChange={(event) => {
                            this.setState({ position: event.target.value }); //Onchange Set organization'email to state
                          }}
                          required
                        />
                      </div>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="exampleCheck1"
                          required
                        />
                        <label class="form-check-label" for="exampleCheck1">
                          Are you sure you want to create test ?
                        </label>
                      </div>
                    </div>

                    <div class="card-footer">
                      <button type="submit" class="obtn portalbtn">
                        Start
                      </button>{" "}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  render() {
    return <React.Fragment>{this.showTestWindow()}</React.Fragment>;
  }
}

export default withRouter(createTest);
