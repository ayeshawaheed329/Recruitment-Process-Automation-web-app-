import React, { Component } from "react";
import axios from "axios"; // axios is used to get data from backend API live on horooko
import $ from "jquery";

class showTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }
  componentDidMount() {
    var _this = this;

    const id = localStorage.getItem("viewTest");
    console.log("attempt id", id);
    const token = localStorage.getItem("accessToken");
    // console.log(token);

    let api =
      "https://firstbackendnodejs.herokuapp.com/api/attempts/result/" + id;
    axios
      .get(api, {
        headers: {
          "x-auth-token": `${token}`,
        },
      })
      .then((Response) => {
        console.log("Data Found", Response.data.QuestionAnswer);
        _this.setState({
          questions: Response.data.QuestionAnswer,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  render() {
    const questionList = this.state.questions.map((question, index) => {
      return (
        <form
          onSubmit={(e) => this.saveChanges(e)}
          class="post "
          id={question._id}
        >
          <div class="row ml-2">
            <span>{index + 1} </span>
            <p class="ml-2">{question.question}</p>
          </div>

          <div class="row ml-2">
            <div class="col">
              <span>A . </span>
              <p class="ml-2" style={{ display: "inline" }}>
                {question.a}
              </p>
            </div>
            <div class="col">
              <span>B . </span>
              <p class="ml-2" style={{ display: "inline" }}>
                {question.b}
              </p>
            </div>
          </div>
          <div class="row ml-2">
            <div class="col">
              <span>C . </span>
              <p class="ml-2" style={{ display: "inline" }}>
                {question.c}
              </p>
            </div>
            <div class="col">
              <span>D . </span>
              <p class="ml-2" style={{ display: "inline" }}>
                {question.d}
              </p>
            </div>
          </div>

          <div class="row ml-2 mt-2">
            <div class="col">
              <span style={{ color: "#28395a", fontWeight: "bold" }}>
                {" "}
                Correct Answer :{" "}
              </span>
              <p class="ml-2" style={{ display: "inline" }}>
                {question.answer}
              </p>
            </div>
          </div>
          <div class="row ml-2">
            <div class="col">
              {question.answer === question.candidateanswer ? (
                <div>
                  <span style={{ color: "#3CB371", fontWeight: "bold" }}>
                    {" "}
                    Candidate Answer :{" "}
                  </span>
                  <p
                    class="ml-2"
                    style={{
                      display: "inline",
                      color: "#3CB371",
                      fontWeight: "bold",
                    }}
                  >
                    {question.candidateanswer}
                  </p>
                </div>
              ) : (
                <div>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {" "}
                    Candidate Answer :{" "}
                  </span>
                  <p
                    class="ml-2"
                    style={{
                      display: "inline",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {question.candidateanswer}
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>
      );
    });
    return (
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Test Detail</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li class="breadcrumb-item ">Draft Test</li>
                  <li class="breadcrumb-item active">View</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section class="content">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Question with Options</h3>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12 col-md-12  order-2 order-md-1">
                  <div class="row">
                    <div class="col-12">{questionList}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default showTest;
