import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom"; //react router dom library is used to switch between components

import Header from "./LandingPage";
import Signup from "./Signup";
import Signin from "./Signin";
import ForgetPasswordEmail from "./ForgetPassEmail";
import ForgetPasswordCode from "./ForgetPassCode";
import SetNewPassword from "./ResetPassword";
import OrganizationPortal from "./OrganizationPortal";
import StartTest from "./TestStart";
import Test from "./CandidateTest";
/*
This is main component which is rendered inside app.js
This component renders 3 main components and their sub/child components

1 => Landing Page
2 => Signup/Signin (Forget password and reset password)
3 => Organization Portal (


*/
class Main extends Component {
  render() {
    //Following each function render a component of project
    const homePage = () => {
      return <Header />;
    };
    const signupPage = () => {
      return <Signup />;
    };
    const signinPage = () => {
      return <Signin />;
    };
    const forgetPassEmail = () => {
      return <ForgetPasswordEmail />;
    };
    const forgetPassCode = () => {
      return <ForgetPasswordCode />;
    };
    const setNewPassword = () => {
      return <SetNewPassword />;
    };
    const organPortal = () => {
      return <OrganizationPortal />;
    };
    const startTestInfo = () => {
      return <StartTest />;
    };
    const startTest = () => {
      return <Test />;
    };
    return (
      <Switch>
        {/* Switch between components based on passed parameters */}
        <Route path="/home" component={homePage} />
        <Route exact path="/signup" component={signupPage} />
        <Route exact path="/signin" component={signinPage} />
        <Route exact path="/forgetPassword" component={forgetPassEmail} />
        <Route exact path="/forgetPassCode" component={forgetPassCode} />
        <Route exact path="/resetPassword" component={setNewPassword} />
        <Route exact path="/StartCandidateTest" component={startTestInfo} />
        <Route exact path="/StartTest" component={startTest} />
        <Route path="/user" component={organPortal} />

        <Redirect to="/home" />
      </Switch>
    );
  }
}

export default Main;
