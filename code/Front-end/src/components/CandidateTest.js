import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "../organizationPortalAssets/dist/css/adminlte.min.css";
import "../organizationPortalAssets/dist/css/style1.css";
import logo from "../assets/img/logo/whitelogo.png";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Congrats from "../signup-assets/images/thankyou.png";
import { Link } from "react-router-dom";
class candidateTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      attemptID: "",
      answers: [],
      Error: false,
    };
    this.changeNotify = this.changeNotify.bind(this);
  }

  componentDidMount() {
    var _this = this;

    const code = localStorage.getItem("TestCode");
    console.log("code", code);
    let api =
      "https://firstbackendnodejs.herokuapp.com/api/questions/attempt/" + code;
    axios
      .get(api)
      .then((Response) => {
        console.log("Done");
        console.log(Response.data);
        _this.setState({
          data: Response.data,
          attemptID: Response.data[0]._id,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  navbar() {
    return (
      <section class="content-header" style={{ backgroundColor: "#28395a" }}>
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>
                <img class="testLogo" src={logo} />
              </h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item mt-2 timer"></li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    );
  }
  submit() {
    const Answer = [];
    const check = [];
    const answers = [];

    const temp = this.state.answers.reverse().map((ans) => {
      check.push({
        questionid: ans.questionid,
        candidateanswer: ans.candidateanswer,
      });
    });

    const temp2 = check.map((ans) => {
      if (Answer.indexOf(ans.questionid) == -1) {
        Answer.push(ans.questionid);
        const obj = {
          questionid: ans.questionid,
          candidateanswer: ans.candidateanswer,
        };
        answers.push(obj);
      }
    });

    let body = { answers: answers };
    const code = localStorage.getItem("TestCode");
    console.log(this.state.attemptID);
    console.log("body ", body);
    let api = "https://firstbackendnodejs.herokuapp.com/api/answers/" + code;
    axios
      .post(api, body)
      .then((Response) => {
        console.log("Done");
        this.setState({
          Error: true,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  answers(Qid, Answer) {
    return this.setState({
      answers: this.state.answers.concat({
        questionid: Qid,
        candidateanswer: Answer,
      }),
    });
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
              <div>
                <img
                  class="CongartsImg text-center"
                  src={Congrats}
                  alt="congratulations"
                />
                <h4 class="mt-4">Your test has submitted !</h4>
                <Link to="home">
                  <button class="contact100-form-btn mt-4 ">close</button>
                </Link>
              </div>
            </div>
          </div>
        );
      } else return <div></div>;
    };

    const testQuestions = this.state.data.map((Question) => {
      return (
        <form class="post" key={Question._id}>
          <p>{Question.text}</p>
          <div class="row">
            <label class="radio-inline col ">
              <input
                type="radio"
                value="A"
                name={Question._id}
                onChange={() => {
                  this.answers(Question._id, "A");
                }}
                class="mr-2"
              />
              {Question.option1}
            </label>

            <label class="radio-inline col">
              <input
                type="radio"
                value="B"
                name={Question._id}
                class="mr-2"
                onChange={() => {
                  this.answers(Question._id, "B");
                }}
              />
              {Question.option2}
            </label>
          </div>
          <div class="row">
            <label class="radio-inline col">
              <input
                type="radio"
                value="C"
                name={Question._id}
                class="mr-2"
                onChange={() => {
                  this.answers(Question._id, "C");
                }}
              />
              {Question.option3}
            </label>
            <label class="radio-inline col">
              <input
                type="radio"
                value="D"
                name={Question._id}
                class="mr-2"
                onChange={() => {
                  this.answers(Question._id, "D");
                }}
              />
              {Question.option4}
            </label>
          </div>
        </form>
      );
    });
    return (
      <div className="wrapper">
        {this.navbar()}
        <section class="content">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Select Correct Option</h3>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12 col-md-12  order-2 order-md-1">
                  <div class="row">
                    <div class="col-12">{testQuestions}</div>
                  </div>
                </div>
              </div>
              <div class="row w-50 ml-auto mr-2">
                <div class="col col-sm-6 ml-auto">
                  <button
                    type="button"
                    class="obtn btn-block bttns float-right"
                    onClick={() => {
                      this.submit();
                    }}
                  >
                    Submit
                  </button>
                  {showModal()}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(candidateTest);
