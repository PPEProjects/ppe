import { combineReducers } from "redux";
import usersReducer from "./users";
import detailsReducer from "./details";
import coursesReducer from "./courses";
import syllabusesReducer from "./syllabuses";
import projectsReducer from "./projects";
import tasksReducer from "./tasks";
import releasesReducer from "./releases";
import companiesReducer from "./companies";
import jobsReducer from "./jobs";
import reviewsReducer from "./reviews";
import postsReducer from "./posts";
import commentsReducer from "./comments";
import sidebarReducer from "./sidebar";
import filterReducer from "./filter";
import filesReducer from "./files";
import formReducer from "./form";
import classesReducer from "./classes";
import schoolsReducer from "./schools";

const rootReducer = combineReducers({
  schools: schoolsReducer,
  classes: classesReducer,
  form: formReducer,
  files: filesReducer,
  filter: filterReducer,
  sidebar: sidebarReducer,
  users: usersReducer,
  details: detailsReducer,
  courses: coursesReducer,
  syllabuses: syllabusesReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
  releases: releasesReducer,
  companies: companiesReducer,
  jobs: jobsReducer,
  reviews: reviewsReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

export default rootReducer;
