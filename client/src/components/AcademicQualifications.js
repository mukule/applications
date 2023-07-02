import axios from "axios";
import React, { Component } from "react";
import { navigate } from "@reach/router";
import { Header, Footer } from "./HeaderAndFooter";

export class AcademicQualifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qualifications: [
        "SELECT",
        "DOCTORATE",
        "MASTERS",
        "BACHELORS",
        "HIGHER DIPLOMA",
        "DIPLOMA",
        "CERTIFICATE",
        "KCSE CERTIFICATE",
        "KCPE CERTIFICATE",
      ],
      dateFrom: "",
      dateTo: "",
      institution: "",
      attainment: "",
      savedQualifications: [],
      applicantId:
        this.props.applicantId || sessionStorage.getItem("applicantId"),
      specialization: "",
      next: false,
    };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value.toUpperCase() });
  };

  componentDidMount() {
    this.loadSavedQualifications();
  }

  addQulification = () => {
    const { dateFrom, dateTo, institution, attainment, specialization } =
      this.state;
    !dateFrom || !dateTo || !institution || !attainment || !specialization
      ? alert("All fields are mandatory")
      : axios
          .post(`/academic-qualifications`, { data: this.state })
          .then((res) => {
            //fetch data saved
            //clear state variables
            console.log(res.data);
            this.setState({
              dateFrom: "",
              dateTo: "",
              institution: "",
              attainment: "",
              next: true,
            });
            this.loadSavedQualifications();
          });
  };

  loadSavedQualifications = () => {
    if (!this.state.applicantId) {
      return;
    } else {
      axios
        .get(`/academic-qualifications/${this.state.applicantId}`)
        .then((res) => {
          this.setState({ savedQualifications: res.data });
        })
        .catch((err) => console.log(err.message));
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="main-wrapper">
          <h3>3. Academic Qualifications. (Starting with the Highest)</h3>
          <div className="input-wrapper">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <label htmlFor="date-from">From: </label>
              <input
                type="number"
                name="dateFrom"
                id="date-from"
                placeholder="year"
                value={this.state.dateFrom}
                onChange={this.changeHandler}
                min={1800}
              />
              <label htmlFor="date-to">To: </label>
              <input
                type="number"
                name="dateTo"
                id="date-to"
                placeholder="year"
                value={this.state.dateTo}
                onChange={this.changeHandler}
                min={1800}
              />
            </div>
          </div>
          <div className="input-wrapper">
            <label htmlFor="institution">University/ High School </label>
            <input
              type="text"
              name="institution"
              id="institution"
              value={this.state.institution}
              onChange={this.changeHandler}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="attainment">
              Award/Attainment (e.g. Masters, Bachelors, Degree, KCSE){" "}
            </label>
            <select
              name="attainment"
              id="attainment"
              onChange={(e) =>
                this.setState({ [e.target.name]: e.target.value })
              }
              value={this.state.attainment}
            >
              {this.state.qualifications.map((q, i) => (
                <option key={i} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>
          <div className="input-wrapper">
            <label htmlFor="specialization">
              Specialization (eg BCom Accounting)
            </label>
            <input
              type="text"
              name="specialization"
              id="specialization"
              onChange={this.changeHandler}
              value={this.state.specialization}
            />
          </div>
          <div className="button-wrapper">
            <button onClick={this.addQulification}>Add</button>
            {!this.state.next ? null : (
              <button
                onClick={() =>
                  navigate("/certifications", {
                    state: { applicantId: this.state.applicantId },
                  })
                }
              >
                Next
              </button>
            )}
          </div>
          <div className="input-wrapper" style={{ width: "100%" }}>
            <table>
              <thead>
                <th>Start</th>
                <th>End</th>
                <th>Institution</th>
                <th>Attainment</th>
                <th>Specialization</th>
              </thead>
              <tbody>
                {this.state.savedQualifications.map((q, i) => (
                  <tr key={i} style={{ width: "100%" }}>
                    <td>{q.dateFrom}</td>
                    <td>{q.dateTo}</td>
                    <td>{q.institution}</td>
                    <td>{q.attainment}</td>
                    <td>{q.specialization}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default AcademicQualifications;
