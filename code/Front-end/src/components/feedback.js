import React, { Component } from "react";
import axios from "axios"; // axios is used to get data from backend API live on horooko
import Congrats from "../signup-assets/images/done.png";
import tryagain from "../signup-assets/images/try.png";

class feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: "",
      subject: "",
      msg: "",
      notification: false,
      Error: false,
      Errormsg: "",
    };
    this.changeNotify = this.changeNotify.bind(this);
  }

  Send() {
    console.log(this.state);

    const candidID = localStorage.getItem("feedbackID");

    console.log(candidID);
    const subject = this.state.subject;
    const msg = this.state.msg;

    let body = { subject, msg };
    let api =
      "https://firstbackendnodejs.herokuapp.com/api/attempts/feedback/" +
      candidID;
    const token = localStorage.getItem("accessToken");
    console.log(token);
    console.log(body);
    axios
      .post(api, body, {
        headers: {
          "x-auth-token": `${token}`,
        },
      })
      .then((Response) => {
        this.setState({ notification: true, Error: false });
        console.log("done");
      })
      .catch((error) => {
        console.log("In error");
        console.log(error.response);
        this.setState({
          notification: true,
          Error: true,
          Errormsg: "try again !",
        });
      });
  }

  //this function is used to compose email from organization portal either to send test invitation to candidates or to give feedback
  composeEmail() {
    return (
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Compose</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <a href="#">Candidate's Attempt Data</a>
                  </li>
                  <li class="breadcrumb-item active">Feedback</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="card card-primary card-outline">
                  <div class="card-header">
                    <h3 class="card-title">Compose New Message</h3>
                  </div>

                  <div class="card-body">
                    <div class="form-group">
                      <input
                        class="form-control"
                        placeholder="Subject:"
                        onChange={(event) => {
                          this.setState({ subject: event.target.value });
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <textarea
                        id="compose-textarea"
                        class="form-control"
                        style={{ height: "300px" }}
                        onChange={(event) => {
                          this.setState({ msg: event.target.value });
                        }}
                      >
                        Write feedback here !
                      </textarea>
                    </div>
                  </div>

                  <div class="card-footer">
                    <div class="float-right">
                      <button
                        type="submit"
                        class="obtn portalbtn"
                        onClick={(e) => this.Send(e)}
                      >
                        <i class="far fa-envelope"></i> Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
                  <h3 class="mt-4 mb-5">Feedback has sent !</h3>
                </div>
              )}
            </div>
          </div>
        );
      } else return <div></div>;
    };

    return (
      <React.Fragment>
        {/*The above has rendered here */}
        {this.composeEmail()}
        {showModal()}
      </React.Fragment>
    );
  }
}

export default feedback;
