import React, { Component } from "react";
import axios from "axios"; // axios is used to get data from backend API live on horooko
import $ from "jquery";

class showTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    };
  }
  componentDidMount() {
    var _this = this;

    const id = localStorage.getItem("editTestId");
    console.log(id);
    const token = localStorage.getItem("accessToken");
    console.log(token);

    let api = "https://firstbackendnodejs.herokuapp.com/api/questions/" + id;
    axios
      .get(api, {
        headers: {
          "x-auth-token": `${token}`,
        },
      })
      .then((Response) => {
        _this.setState({
          questions: Response.data,
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
          <span>{index + 1} </span>

          <input
            placeholder={question.text}
            name={question.text}
            class="editForm"
            id="question"
          />
          <div class="row mt-4">
            <div class="col">
              <span>A. </span>
              <input
                type="text"
                placeholder={question.option1}
                name={question.option1}
                class="ediFormOptions"
                id="option1"
                onChange={(e) => this.setState({ option1: e.target.value })}
              />
            </div>
            <div class="col">
              <span>B. </span>
              <input
                type="text"
                placeholder={question.option2}
                name={question.option2}
                class="ediFormOptions"
                id="option2"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <span>C. </span>
              <input
                type="text"
                placeholder={question.option3}
                name={question.option3}
                class="ediFormOptions"
                id="option3"
              />
            </div>
            <div class="col">
              <span>D. </span>
              <input
                type="text"
                placeholder={question.option4}
                name={question.option4}
                class="ediFormOptions"
                id="option4"
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-sm-6 col-md-2 correctAns mt-1">
              Correct Answer:
            </div>
            <div className="col-sm-6 col-md-8">
              {" "}
              <input
                type="text"
                placeholder={question.answer}
                name={question.answer}
                class="ediFormOptions"
                id="correct"
              />
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
