import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // axios is used to get data from backend API live on horooko

class designedTests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    var _this = this;
    const token = localStorage.getItem("accessToken");
    axios
      .get("https://firstbackendnodejs.herokuapp.com/api/tests/final", {
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

  sendEmail(id) {
    localStorage.setItem("sendTest", id);
    this.props.history.push("compose");
  }
  view(id) {
    localStorage.setItem("editTestId", id);
    this.props.history.push("displayTest");
  }
  Delete(id) {
    console.log(id);
    const token = localStorage.getItem("accessToken");
    console.log(token);
    let api = "https://firstbackendnodejs.herokuapp.com/api/tests/" + id;
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
  render() {
    const testList = this.state.data.map((test, index) => {
      return (
        <tr key={test._id}>
          <td>{index + 1}</td>
          <td>{test.position}</td>
          <td>{test.totalquestion}</td>
          <td>{test.date}</td>
          <td>
            <button
              type="button"
              class="obtn btn-block bttns"
              onClick={() => this.view(test._id)}
            >
              View
            </button>
          </td>

          <td>
            <button
              type="button"
              class="obtn btn-block bttns"
              onClick={() => this.Delete(test._id)}
            >
              Delete
            </button>
          </td>
          <td>
            <button
              type="button"
              class="obtn btn-block bttns"
              onClick={() => this.sendEmail(test._id)}
            >
              Send Invitation
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
                <h1>Published Tests</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li class="breadcrumb-item active">Draft Tests</li>
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
                  <div class="card-body table-responsive p-0">
                    <table class="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Position</th>
                          <th>Total Questions</th>
                          <th>Date</th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>{testList}</tbody>
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

export default designedTests;
