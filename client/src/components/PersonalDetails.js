import React, { Component } from "react";
import { navigate } from "@reach/router";
import axios from "axios";
import { Header, Footer } from "./HeaderAndFooter";

export class PersonalDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      firstname: "",
      middlename: "",
      lastname: "",
      salutation_title: "",
      national_id: "",
      date_of_birth: "",
      home_county: "",
      sub_county: "",
      ward: "",
      location: "",
      sub_location: "",
      phone: "",
      postal_address: "",
      postal_code: "",
    };
    this.registerApplicant = this.registerApplicant.bind(this);
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value.toUpperCase().replace(/'/g, ""),
    });
  };

  registerApplicant() {
    const {
      email,
      firstname,
      lastname,
      salutation_title,
      national_id,
      date_of_birth,
      phone,
      location,
    } = this.state;
    if (
      !email ||
      !firstname ||
      !lastname ||
      !salutation_title ||
      !national_id ||
      !date_of_birth ||
      !phone ||
      !location
    ) {
      alert(
        "The following field are mandatory  email,firstname,lastname,salutation_title,national_id,date_of_birth,phone,location"
      );
    } else {
      axios.post(`/personal-data`, { data: this.state }).then((res) => {
        this.props.setApplicantId(res.data.applicantId);
        sessionStorage.setItem("applicantId", res.data.applicantId);
        navigate("/other-personal-details", {
          state: { applicantId: res.data.applicantId },
        }).catch((err) => {
          console.log(err.message);
        });
      });
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="main-wrapper">
          <h3>1. Personal Details of the Applicant </h3>
          <div className="input-wrapper">
            <span>Email address</span>
            <input
              type="email"
              name="email"
              placeholder="Your answer"
              onChange={this.changeHandler}
              value={this.state.email}
              required
            />
          </div>
          <div className="input-wrapper">
            <span>Firstname</span>
            <input
              type="text"
              name="firstname"
              placeholder="Your answer"
              onChange={this.changeHandler}
              value={this.state.firstname}
              required
            />
          </div>
          <div className="input-wrapper">
            <span>Middlename</span>
            <input
              type="text"
              name="middlename"
              placeholder="Your answer"
              value={this.state.middlename}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className="input-wrapper">
            <span>Lastname</span>
            <input
              type="text"
              name="lastname"
              placeholder="Your answer"
              value={this.state.lastname}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className="input-wrapper">
            <span>Salutations title (Mr. Mrs. Miss. Ms. e.t.c)</span>
            <input
              type="text"
              name="salutation_title"
              placeholder="Your answer"
              value={this.state.salutation_title}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className="input-wrapper">
            <span>National ID.</span>
            <input
              type="text"
              name="national_id"
              placeholder="Your answer"
              onChange={this.changeHandler}
              value={this.state.national_id}
              required
            />
          </div>
          <div className="input-wrapper">
            <span>Phone No</span>
            <input
              type="tel"
              name="phone"
              placeholder="Your answer"
              value={this.state.phone}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className="input-wrapper">
            <span>Date of Birth.</span>
            <input
              type="date"
              name="date_of_birth"
              placeholder="Your answer"
              value={this.state.date_of_birth}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className="input-wrapper">
            <span>Home County.</span>
            <input
              type="text"
              name="home_county"
              placeholder="Your answer"
              value={this.state.home_county}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className="input-wrapper">
            <span>Sub-County .</span>
            <input
              type="text"
              name="sub_county"
              placeholder="Your answer"
              onChange={this.changeHandler}
              value={this.state.sub_county}
              required
            />
          </div>
          <div className="input-wrapper">
            <span>Ward.</span>
            <input
              type="text"
              name="ward"
              placeholder="Your answer"
              onChange={this.changeHandler}
              value={this.state.ward}
              required
            />
          </div>
          <div className="input-wrapper">
            <span>Location.</span>
            <input
              type="text"
              name="location"
              placeholder="Your answer"
              value={this.state.location}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className="input-wrapper">
            <span>Sub-Location.</span>
            <input
              type="text"
              name="sub_location"
              placeholder="Your answer"
              value={this.state.sub_location}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className="input-wrapper">
            <span>Postal address.</span>
            <input
              type="address"
              name="postal_address"
              placeholder="Your answer"
              value={this.state.postal_address}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className="input-wrapper">
            <span>Postal Code</span>
            <input
              type="text"
              name="postal_code"
              placeholder="Your answer"
              value={this.state.postal_code}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className="button-wrapper">
            <button onClick={this.registerApplicant}>Next</button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default PersonalDetails;
