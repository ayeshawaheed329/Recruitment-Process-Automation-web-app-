import React, { Component } from "react";
import axios from "axios"; // axios is used to get data from backend API live on horooko
import Congrats from "../signup-assets/images/done.png";
import tryagain from "../signup-assets/images/try.png";

class compose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: "",
      subject: "",
      notification: false,
      Error: false,
      Errormsg: "",
    };
    this.changeNotify = this.changeNotify.bind(this);
  }

  Send(event) {
    event.preventDefault();
    console.log("state", this.state);
    let msg1 =
      event.target.elements.composetextarea.value === ""
        ? event.target.elements.composetextarea.name
        : event.target.elements.composetextarea.value;

    console.log("your msg ", msg1);
    const testid = localStorage.getItem("sendTest");
    const to = this.state.to;
    const subject = this.state.subject;
    const msg = msg1;
    const link = "https://reconlineayesha.herokuapp.com/StartCandidateTest";

    let body = { testid, to, link, subject, msg };
    const token = localStorage.getItem("accessToken");

    axios
      .post(
        "https://firstbackendnodejs.herokuapp.com/api/attempts/invitation",
        body,
        {
          headers: {
            "x-auth-token": `${token}`,
          },
        }
      )
      .then((Response) => {
        this.setState({ notification: true, Error: false });
        console.log("done");
        document.getElementById("email").value = "";
        document.getElementById("subject").value = "";
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
                    <a href="#">Designed Tests</a>
                  </li>
                  <li class="breadcrumb-item active">Send Invitation</li>
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

                  <form
                    onSubmit={(event) => {
                      this.Send(event);
                    }}
                  >
                    <div class="card-body">
                      <div class="form-group">
                        <input
                          id="email"
                          type="email"
                          class="form-control"
                          placeholder="To:"
                          onChange={(event) => {
                            this.setState({ to: event.target.value });
                          }}
                          required
                        />
                      </div>
                      <div class="form-group">
                        <input
                          id="subject"
                          class="form-control"
                          placeholder="Subject:"
                          onChange={(event) => {
                            this.setState({ subject: event.target.value });
                          }}
                        />
                      </div>
                      <div class="form-group">
                        <textarea
                          id="composetextarea"
                          class="form-control"
                          style={{ height: "300px" }}
                          name="Close all programs, including email 
                          Click on the Link to open the exam link provided in the email from The College.
                          Click  Log In For Your Exam Here at the bottom of the screen.
                          Have your Proctor enter the Username and Password provided in the email from The College and click enter.
                          To begin the exam, click on the link to the appropriate exam listed under Online Assessments."
                          onChange={(event) => {
                            this.setState({ msg: event.target.value });
                          }}
                          defaultValue=" Close all programs, including email 
                          Click on the Link to open the exam link provided in the email from The College.
                          Click  Log In For Your Exam Here at the bottom of the screen.
                          Have your Proctor enter the Username and Password provided in the email from The College and click enter.
                          To begin the exam, click on the link to the appropriate exam listed under Online Assessments."
                        ></textarea>
                      </div>
                    </div>

                    <div class="card-footer">
                      <div class="float-right">
                        <button type="submit" class="obtn portalbtn">
                          <i class="far fa-envelope"></i> Send
                        </button>
                      </div>
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
                    Your Invitation has sent to candidate !
                  </h3>
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

export default compose;
