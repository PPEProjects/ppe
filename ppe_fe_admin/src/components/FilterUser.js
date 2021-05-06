import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterSelector, setFilterData } from "../slices/filter";
import { Select, Checkbox } from "../components/Form";
import { coursesSelector, getCourses } from "../slices/courses";
import { usersSelector, setUserData } from "../slices/users";
import Ajax from "./Ajax";
import Date from "./Date";

const FilterUser = () => {
  const dispatch = useDispatch();
  const { filterOpen } = useSelector(filterSelector);
  const [userType, setUserType] = useState("");
  const [userCourseId, setUserCourseId] = useState("");
  const { courses } = useSelector(coursesSelector);

  useEffect(() => {
    fetchData();
    async function fetchData() {
      let res = await Ajax.get(`/users`, {
        course_id: userCourseId,
        status: filterOpen,
      });
      dispatch(setUserData({ users: res.data.users, course_id: userCourseId }));
    }
  }, [userCourseId]);

  useEffect(() => {
    fetchData();
    async function fetchData() {
      return;
      let res = await Ajax.get(`/users`, {
        types: [userType],
        status: filterOpen,
      });
      dispatch(setUserData({ users: res.data.users, types: [userType] }));
    }
  }, [userType]);

  useEffect(() => {
    dispatch(getCourses(`Activated`));
  }, [dispatch]);

  const handleFilterClick = (e, val) => {
    if (e) {
      e.preventDefault();
    }
    dispatch(setFilterData({ filterOpen: val }));
  };

  return (
    <React.Fragment>
      <section className="border-t mt-1 px-2">
        <div className="mx-2 mt-2">
          <span className="">Select a user set</span>
          <div className="-mt-3">
            <Select
              name={`userType`}
              onChange={(val) => setUserType(val)}
              values={[
                `Admin`,
                `Office leader`,
                `Japanese instructor`,
                `IT project instructor`,
                `Job supporter`,
                `Life supporter`,
                `Japanese learner`,
                `IT project member`,
                `Job hunter`,
              ]}
            />
          </div>
        </div>
        {userType === "Japanese learner" && (
          <div className="block mt-2 mx-2">
            <div className="flex">
              <span className="">Courses</span>
            </div>
            {/* <select
                         name={`userCourseId`}
                        onChange={(val1) => setUserCourseId(val1)}
                        className="h-10 border w-48 pl-2 rounded-lg  mt-2"
                    >
                        <option value="">-</option>
                        {courses.map((course, key) => (
                            <option key={key} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                    </select> */}
            <div className="-mt-3">
              <Select
                onChange={(val1) => setUserCourseId(val1)}
                name={`userCourseId`}
                ids={courses.map(({ id }) => id)}
                values={courses.map(({ name }) => name)}
              />
            </div>
          </div>
        )}

        {userCourseId === null && (
          <div className="mx-2 mt-3">
            <form></form>
          </div>
        )}
        {userCourseId !== `` && (
          <div className="mt-3 mx-2 absolute absolute-0 ml-2 w-48 text-sm	 rounded-lg h-12">
            <Date />
          </div>
        )}
      </section>
    </React.Fragment>
  );
};
export default FilterUser;
