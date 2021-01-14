import React, { Component } from "react";

import axios from "axios"; // axios is used to get data from backend API live on horooko

import { withRouter } from "react-router-dom";
import { Input } from "reactstrap";

class createTest extends Component {
  //This function is the start to create a test . Ask organization to enter no of question and for the position test is desinging
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      pwd: "",
      logo: "",
      flag: true,
    };
  }

  componentDidMount() {
    // var _this = this;

    const token = localStorage.getItem("accessToken");
    console.log(token);

    let api = "https://firstbackendnodejs.herokuapp.com/api/users";
    axios
      .get(api, {
        headers: {
          "x-auth-token": `${token}`,
        },
      })
      .then((Response) => {
        console.log(Response.data);
        this.setState({
          name: Response.data.name,
          email: Response.data.email,
          logo: Response.data.logo,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  submit(event) {
    event.preventDefault();
    const { name, email, password, logo } = this.state;
    const token = localStorage.getItem("accessToken");

    let body = { name, email, password, logo };

    console.log("body");
    console.log(body);

    axios
      .put("https://firstbackendnodejs.herokuapp.com/api/users", body, {
        headers: {
          "x-auth-token": `${token}`,
        },
      })
      .then((Response) => {
        console.log(Response);
        window.location.reload();
      })
      .catch((error) => {
        console.log("In error");
        console.log(error.response);
      });
  }

  showTestWindow() {
    return (
      <div class="content-wrapper ">
        <section class="content-header ">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Edit Profile</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li class="breadcrumb-item active">Edit Profile</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <div class="d-flex justify-content-center">
          <section class="content w-50 ">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-12">
                  <div class="card card-primary">
                    <div
                      class="card-header"
                      style={{ backgroundColor: "#28395a" }}
                    >
                      <h3 class="card-title">Edit your profile</h3>
                    </div>

                    <form
                      role="form"
                      onSubmit={(event) => {
                        this.submit(event);
                      }}
                    >
                      <div class="card-body">
                        <div class="form-group">
                          <label for="exampleInputEmail1">
                            Organization Name
                          </label>
                          <textarea
                            id="exampleInputEmail1"
                            class="form-control ProfileTxT"
                            name={this.state.name}
                            defaultValue={this.state.name}
                            onChange={(event) =>
                              this.setState({ name: event.target.value })
                            }
                          ></textarea>
                        </div>

                        <div class="form-group">
                          <label for="exampleInputEmail1">
                            Organization Email
                          </label>
                          <textarea
                            id="exampleInputEmail1 "
                            class="form-control ProfileTxT"
                            name={this.state.email}
                            defaultValue={this.state.email}
                            onChange={(event) =>
                              this.setState({ email: event.target.value })
                            }
                          ></textarea>
                        </div>

                        <div class="form-group">
                          <label for="exampleInputEmail1">
                            Organization Logo URL
                          </label>
                          <textarea
                            id="exampleInputEmail1"
                            class="form-control ProfileLogo"
                            name={this.state.logo}
                            defaultValue={this.state.logo}
                            onChange={(event) =>
                              this.setState({ logo: event.target.value })
                            }
                          ></textarea>
                        </div>

                        <div class="form-group">
                          <label for="exampleInputEmail1">
                            Organization Password
                          </label>
                          <Input
                            type="password"
                            id="exampleInputEmail1"
                            class="form-control ProfileTxT"
                            placeholder="If you want to change password, Type new password here !"
                            onChange={(event) =>
                              this.setState({ password: event.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div class="card-footer">
                        <button type="submit" class="obtn portalbtn">
                          Submit
                        </button>{" "}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
  render() {
    return <React.Fragment>{this.showTestWindow()}</React.Fragment>;
  }
}

export default withRouter(createTest);
