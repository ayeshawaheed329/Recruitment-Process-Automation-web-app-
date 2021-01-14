import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // axios is used to get data from backend API live on horooko

class candidateInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    var _this = this;
    const token = localStorage.getItem("accessToken");
    console.log(token);
    axios
      .get("https://firstbackendnodejs.herokuapp.com/api/attempts", {
        headers: {
          "x-auth-token": `${token}`,
        },
      })
      .then((Response) => {
        console.log(Response.data);
        _this.setState({
          data: Response.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  sendFeedback(id) {
    localStorage.setItem("feedbackID", id);
    this.props.history.push("feedback");
  }
  delete(id) {
    console.log(id);
    const token = localStorage.getItem("accessToken");
    console.log(token);
    let api = "https://firstbackendnodejs.herokuapp.com/api/attempts/" + id;
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

  ViewTest(id) {
    localStorage.setItem("viewTest", id);
    this.props.history.push("attemptedTest");
    console.log(id);
  }
  render() {
    const candidates = this.state.data.map((candid) => {
      return (
        <tr key={candid._id}>
          <td>{candid.name}</td>
          <td>{candid.email}</td>
          <td>{candid.totalquestions}</td>
          <td>{candid.correctanswers}</td>
          <td>{(candid.correctanswers / candid.totalquestions) * 100}%</td>
          <td>{candid.position}</td>
          <td>
            <button
              type="button"
              class="obtn btn-block bttns"
              onClick={() => {
                this.sendFeedback(candid._id);
              }}
            >
              Feedback
            </button>
          </td>
          <td>
            <button
              type="button"
              class="obtn btn-block bttns "
              onClick={() => {
                this.ViewTest(candid._id);
              }}
            >
              View Test
            </button>
          </td>
          <td>
            <button
              type="button"
              class="obtn btn-block bttns "
              onClick={() => {
                this.delete(candid._id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Candidates Test's Attempt Information</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li class="breadcrumb-item active">
                    Candidate's Attempt Data
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body  p-0">
                    <table class="table table-hover table-responsive text-nowrap">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Total Qs</th>
                          <th>Correct As</th>
                          <th>Score</th>
                          <th>Position</th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>{candidates}</tbody>
                    </table>
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

export default candidateInfo;
