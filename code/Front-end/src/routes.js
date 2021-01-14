import CandidateInfo from "./components/CandidatesInfo";
import CreateTest from "./components/createTest";
import TestQuestions from "./components/Questions";
import AddQuestions from "./components/AddQuestion";
import DraftTest from "./components/DraftTest";
import DesignedTest from "./components/DesignedTest";
import ComposeEmail from "./components/compose";
import TestEditing from "./components/EditTest";
import Feedback from "./components/feedback";
import EditProfile from "./components/EditProfile";
import Test from "./components/TestShow";
import attempt from "./components/AttemptedTest";
//This file is used in Organization Portal component to render other child components of organization portal

const dashboardRoutes = [
  {
    path: "/candidateInfo",
    name: "Candidate Information",
    component: CandidateInfo,
    layout: "/user",
    icon: "nav-icon fas fa-users",
  },
  {
    path: "/createTest",
    name: "Create Test",
    component: CreateTest,
    layout: "/user",
    icon: "nav-icon fas fa-edit",
  },
  {
    path: "/questions",
    name: "TestQuestions",
    component: TestQuestions,
    layout: "/user",
    icon: "",
  },
  {
    path: "/addquestions",
    name: "TestQuestions",
    component: AddQuestions,
    layout: "/user",
    icon: "",
  },
  {
    path: "/draftTest",
    name: "Draft Tests",
    component: DraftTest,
    layout: "/user",
    icon: "nav-icon fas fa-book",
  },
  {
    path: "/designedTest",
    name: "Published Tests",
    component: DesignedTest,
    layout: "/user",
    icon: "nav-icon fas fa-file",
  },
  {
    path: "/compose",
    name: "Compose-Email",
    component: ComposeEmail,
    layout: "/user",
    icon: "",
  },
  {
    path: "/testEditing",
    name: "Edit-Test",
    component: TestEditing,
    layout: "/user",
    icon: "",
  },
  {
    path: "/feedback",
    name: "feedback",
    component: Feedback,
    layout: "/user",
    icon: "",
  },
  {
    path: "/EditProfile",
    name: "Edit-Your-Profile",
    component: EditProfile,
    layout: "/user",
    icon: "",
  },
  {
    path: "/displayTest",
    name: "Dislay-Test-Page",
    component: Test,
    layout: "/user",
    icon: "",
  },
  {
    path: "/attemptedTest",
    name: "Dislay-Candidate-Test",
    component: attempt,
    layout: "/user",
    icon: "",
  },
];

export default dashboardRoutes;
