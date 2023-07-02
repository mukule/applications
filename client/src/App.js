import React, { Component } from "react";
import AcademicQualifications from "./components/AcademicQualifications";
import { Router } from "@reach/router";
import PersonalDetails from "./components/PersonalDetails";
import JobApplication from "./components/JopApplication";
import OtherPersonalDetails from "./components/OtherPersonalDetails";
import Files from "./components/Files";
import Done from "./components/Done";
import "./App.css";
import Certifications from "./components/Certifications";
import Admin from "./components/Admin";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicantId: "",
      done: false,
    };
  }
  setApplicantId = (id) => {
    this.setState({ applicantId: id });
  };
  setDone = (value) => {
    this.setState({ done: value });
  };
  render() {
    return (
      <>
        {!this.state.done ? (
          <Router>
            <PersonalDetails path="/" setApplicantId={this.setApplicantId} />
            <OtherPersonalDetails
              applicantId={this.state.applicantId}
              path="/other-personal-details"
            />
            <AcademicQualifications
              applicantId={this.state.applicantId}
              path="/academic-qualifications"
            />
            <Certifications
              applicantId={this.state.applicantId}
              path="/certifications"
            />
            <JobApplication
              applicantId={this.state.applicantId}
              path="/job-details"
            />
            <Files
              applicantId={this.state.applicantId}
              setDone={this.setDone}
              path="/file-upload"
            />
            <Admin path="/admin/dashboard" />
          </Router>
        ) : (
          <Done />
        )}
      </>
    );
  }
}

export default App;
