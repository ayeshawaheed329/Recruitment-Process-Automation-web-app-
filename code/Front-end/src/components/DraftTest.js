import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // axios is used to get data from backend API live on horooko

class draftTest extends Component {
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
      .get("https://firstbackendnodejs.herokuapp.com/api/tests/draft", {
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
  View(id) {
    localStorage.setItem("editTestId", id);
    this.props.history.push("TestEditing");
  }
  Save(id) {
    console.log(id);
    const token = localStorage.getItem("accessToken");
    console.log(token);
    let api = "https://firstbackendnodejs.herokuapp.com/api/tests/save/" + id;
    let header = {
      headers: {
        "x-auth-token": token,
      },
    };

    axios
      .post(api)
      .then((Response) => {
        console.log("response data header");
        console.log(Response.data.headers);
        this.props.history.push("DesignedTest");
      })
      .catch((error) => {
        console.log(error.response);
      });
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
              className="obtn btn-block bttns"
              onClick={() => {
                this.View(test._id);
              }}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              type="button"
              className="obtn btn-block bttns"
              onClick={() => {
                this.Save(test._id);
              }}
            >
              Save
            </button>
          </td>
          <td>
            <button
              type="button"
              className="obtn btn-block bttns"
              onClick={() => {
                this.Delete(test._id);
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
                <h1>Test Draft</h1>
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

export default draftTest;
