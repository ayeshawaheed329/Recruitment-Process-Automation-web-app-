import React, { Component } from "react";
import axios from "axios"; // axios is used to get data from backend API live on horooko
import $ from "jquery";

class editTest extends Component {
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
        console.log("Data received", Response.data);
        _this.setState({
          questions: Response.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  saveChanges(event) {
    event.preventDefault();
    console.log(event.target.id);
    const id = event.target.id;
    const token = localStorage.getItem("accessToken");

    let obj = {
      text:
        event.target.elements.question.value === ""
          ? event.target.elements.question.name
          : event.target.elements.question.value,
      answer:
        event.target.elements.correct.value === ""
          ? event.target.elements.correct.name
          : event.target.elements.correct.value,
      option1:
        event.target.elements.option1.value === ""
          ? event.target.elements.option1.name
          : event.target.elements.option1.value,
      option2:
        event.target.elements.option2.value === ""
          ? event.target.elements.option2.name
          : event.target.elements.option2.value,

      option3:
        event.target.elements.option3.value === ""
          ? event.target.elements.option3.name
          : event.target.elements.option3.value,

      option4:
        event.target.elements.option4.value === ""
          ? event.target.elements.option4.name
          : event.target.elements.option4.value,
    };

    if (
      !(
        obj.answer == "A" ||
        obj.answer == "a" ||
        obj.answer == "B" ||
        obj.answer == "b" ||
        obj.answer == "C" ||
        obj.answer == "c" ||
        obj.answer == "D" ||
        obj.answer == "d"
      )
    ) {
      alert("Answer must be one of the given options");
    } else {
      console.log("obj", obj);
      const api =
        "https://firstbackendnodejs.herokuapp.com/api/questions/" + id;
      axios
        .put(api, obj, {
          headers: {
            "x-auth-token": `${token}`,
          },
        })
        .then((Response) => {
          console.log("done");
          console.log(Response);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }
  delete(event) {
    let id = event.target.id;
    console.log("id ", id);
    const token = localStorage.getItem("accessToken");
    console.log(token);
    let api = "https://firstbackendnodejs.herokuapp.com/api/questions/" + id;
    axios
      .delete(api, {
        headers: {
          "x-auth-token": `${token}`,
        },
      })
      .then((Response) => {
        console.log(Response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  chckBtn(event) {
    event.preventDefault();
    this.saveChanges(event);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.saveChanges(event);
  }
  handleAlternate(event) {
    this.delete(event);
  }
  newQuestion() {
    this.props.history.push("addquestions");
  }
  render() {
    const questionList = this.state.questions.map((question, index) => {
      return (
        <form
          onSubmit={this.handleSubmit.bind(this)}
          class="post "
          id={question._id}
        >
          <div class="mb-0">
            <span class="float-left mb-0">{index + 1}</span>
            <textarea
              id="option3"
              class="float-right editForm "
              name={question.text}
              id="question"
            >
              {question.text}
            </textarea>
          </div>
          <div class="row mt-2 mb-0">
            <div class="col mb-0 ">
              <span class="float-left mb-0">A</span>
              <textarea
                id="option1"
                class="float-right ediFormOptions mb-0"
                name={question.option1}
                id="option1"
              >
                {question.option1}
              </textarea>
            </div>
            <div class="col mb-0 ">
              <span class="float-left mb-0">B. </span>
              <textarea
                id="option2"
                class="float-right ediFormOptions mb-0"
                name={question.option2}
                id="option2"
              >
                {question.option2}
              </textarea>
            </div>
          </div>
          <div class="row mt-0">
            <div class="col mt-0">
              <span class="float-left mt-0">C. </span>
              <textarea
                id="option3"
                class="float-right ediFormOptions mt-0"
                name={question.option3}
              >
                {question.option3}
              </textarea>
            </div>
            <div class="col mt-0">
              <span class="float-left mt-0">D. </span>
              <textarea
                id="option4"
                class="float-right ediFormOptions mt-0"
                name={question.option4}
              >
                {question.option4}
              </textarea>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-sm-6 col-md-2 correctAns mt-1">
              Correct Answer:
            </div>
            <div className="col-sm-6 col-md-8">
              <select
                class=" w-75 form-control"
                id="correct"
                name={question.answer}
              >
                <option selected hidden>
                  {question.answer}
                </option>
                {question.answer != "A" ? (
                  <option value="A">A</option>
                ) : (
                  <div></div>
                )}

                {question.answer != "B" ? (
                  <option value="B">B</option>
                ) : (
                  <div></div>
                )}
                {question.answer != "C" ? (
                  <option value="C">C</option>
                ) : (
                  <div></div>
                )}
                {question.answer != "D" ? (
                  <option value="D">D</option>
                ) : (
                  <div></div>
                )}
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col col-sm-2  ml-auto mr-0 ">
              <button
                id="save"
                type="submit"
                class="obtn btn-block bttns float-right"
                value="save"
              >
                Save
              </button>
            </div>
            <div class="col col-sm-2 ml-0 mr-0 ">
              <button
                type="button"
                id={question._id}
                class="obtn btn-block bttns "
                onClick={this.handleAlternate.bind(this)}
              >
                Delete
              </button>
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
              <button
                type="button"
                class="ml-auto obtn portalbtn w-25"
                onClick={() => {
                  this.newQuestion();
                }}
              >
                Add Question
              </button>
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

export default editTest;
