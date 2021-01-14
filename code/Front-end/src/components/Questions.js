import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // axios is used to get data from backend API live on horooko

import { withRouter } from "react-router-dom";

class questionPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      answer: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    };
  }
  saveQuestion(event, flag) {
    const { text, answer, option1, option2, option3, option4 } = this.state;

    if (
      option1 !== option2 &&
      option1 !== option3 &&
      option1 !== option4 &&
      option2 !== option3 &&
      option2 !== option4 &&
      option3 !== option4
    ) {
      const testid = localStorage.getItem("testID");
      let body = { testid, text, answer, option1, option2, option3, option4 };

      const token = localStorage.getItem("accessToken");

      event.preventDefault();
      console.warn(this.state);

      axios
        .post("https://firstbackendnodejs.herokuapp.com/api/questions", body, {
          headers: {
            "x-auth-token": `${token}`,
          },
        })
        .then((Response) => {
          console.log("done");
          console.log(Response);
          if (flag) {
            this.props.history.push("draftTest");
          } else {
            document.getElementById("question").value = "";
            document.getElementById("option1").value = "";
            document.getElementById("option2").value = "";
            document.getElementById("option3").value = "";
            document.getElementById("option4").value = "";
            document.getElementById("answer").value = "";
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      alert("Options Can not be same ");
    }
  }
  ResetForm() {
    document.getElementById("questionForm").reset();
  }
  submit(event) {
    event.preventDefault();
    this.saveQuestion(event, true);
  }
  InputQuestions() {
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
                    <h3 class="card-title"> Enter Test Questions </h3>
                  </div>

                  <form
                    role="form"
                    id="questionForm"
                    onSubmit={(event) => {
                      this.submit(event);
                    }}
                  >
                    <div class="card-body">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Question</label>
                        <input
                          type="text"
                          class="form-control"
                          id="question"
                          placeholder="Enter a question"
                          onChange={(event) => {
                            this.setState({ text: event.target.value }); //Onchange Set organization'email to state
                          }}
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Options</label>
                        <div class="row">
                          <div class="col">
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span
                                  class="input-group-text"
                                  id="basic-addon1"
                                >
                                  A
                                </span>
                              </div>
                              <input
                                type="text"
                                class="form-control "
                                id="option1"
                                placeholder="Enter Option A"
                                onChange={(event) => {
                                  this.setState({
                                    option1: event.target.value,
                                  }); //Onchange Set organization'email to state
                                }}
                                required
                              />
                            </div>
                          </div>
                          <div class="col">
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span
                                  class="input-group-text"
                                  id="basic-addon1"
                                >
                                  B
                                </span>
                              </div>
                              <input
                                type="text"
                                class="form-control"
                                id="option2"
                                placeholder="Enter Option B"
                                onChange={(event) => {
                                  this.setState({
                                    option2: event.target.value,
                                  }); //Onchange Set organization'email to state
                                }}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row mt-2">
                          <div class="col">
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span
                                  class="input-group-text"
                                  id="basic-addon1"
                                >
                                  C
                                </span>
                              </div>
                              <input
                                type="text"
                                class="form-control"
                                id="option3"
                                placeholder="Enter Option C"
                                onChange={(event) => {
                                  this.setState({
                                    option3: event.target.value,
                                  }); //Onchange Set organization'email to state
                                }}
                                required
                              />
                            </div>
                          </div>
                          <div class="col">
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span
                                  class="input-group-text"
                                  id="basic-addon1"
                                >
                                  D
                                </span>
                              </div>
                              <input
                                type="text"
                                class="form-control"
                                id="option4"
                                placeholder="Enter Option D"
                                onChange={(event) => {
                                  this.setState({
                                    option4: event.target.value,
                                  }); //Onchange Set organization'email to state
                                }}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div class="row mt-2">
                          <div class="col col-sm-6 ">
                            <label>Correct Option </label>
                            <select
                              class=" w-100 form-control"
                              id="answer"
                              name="answer"
                              onChange={(event) => {
                                this.setState({ answer: event.target.value }); //Onchange Set organization'email to state
                              }}
                              title="Select correct option"
                              required
                            >
                              <option disabled="disabled" selected="selected">
                                Select correct option.
                              </option>
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                              <option value="D">D</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="card-footer">
                      <button type="submit" class="obtn portalbtn ml-2">
                        Submit
                      </button>

                      <button
                        class="obtn portalbtn"
                        type="button"
                        onClick={(event) => {
                          this.saveQuestion(event, false);
                        }}
                      >
                        Next Question
                      </button>
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
    return <React.Fragment>{this.InputQuestions()}</React.Fragment>;
  }
}

export default withRouter(questionPaper);
