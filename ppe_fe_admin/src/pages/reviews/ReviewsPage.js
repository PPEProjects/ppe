import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  reviewsSelector,
  getReviews,
  deleteReviews,
} from "../../slices/reviews";
import { setDetailData } from "../../slices/details";
// import Ajax from "../../components/Ajax";
import { setFormData, setFormSelects, formSelector } from "../../slices/form";
import { InputIcon, Button } from "../../components/Form";
import { companiesSelector, getCompaniesObj } from "../../slices/companies";
import ReviewsDetailPage from "./ReviewsDetailPage";
// import { sidebarSelector } from "../../slices/sidebar";
import { filterSelector } from "../../slices/filter";
// import { setSidebarData } from "../../slices/sidebar";
import Filter from "../../components/Filter";
import { Link, useLocation } from "react-router-dom";
import Language from "../../components/Language";
import Search from "../../components/Search";
const ReviewsPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  // const { url, opens } = useSelector(sidebarSelector);
  const { filterOpen } = useSelector(filterSelector);
  const { selects } = useSelector(formSelector);
  const { review, reviews, status } = useSelector(reviewsSelector);
  const { companiesObj } = useSelector(companiesSelector);
  const [mode, setMode] = useState(`grid`);
  const [type, setType] = useState(``);
  const [search, setSearch] = useState(``);
  const [reviewsSearch, setUsersSearch] = useState(reviews);
  useEffect(() => {
    setUsersSearch(Search(`title`, search, reviews));
  }, [search, reviews]);

  useEffect(() => {
    setType(new URL(window.location.href).searchParams.get("type") ?? ``);
    dispatch(getCompaniesObj());
    dispatch(getReviews(filterOpen));
    // let url = window.location.href;

    // dispatch(setSidebarData({ url: url }));
  }, [dispatch, location.pathname, location.search, filterOpen]);

  const handleOnclick = (review) => {
    dispatch(
      setDetailData({
        isShow: true,
        review: review,
        company: companiesObj[review.company_id],
      })
    );
  };

  const renderMain = () => {
    return (
      <aside className="w-full">
        <div className="grid grid-cols-12 gap-4 mx-6 ">
          <div className="col-span-12 flex items-center justify-between mt-6 ">
            <h1 className="text-xl font-bold">Reviews</h1>
          </div>
          <Filter />

          <div className="col-span-9 ">
            <section className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3">
              <div className="flex items-center justify-between mx-4">
                <div className="">
                  <b className="">{reviews?.length}</b>
                  <p className="text-gray-600">
                    {reviews?.length === 0 || reviews?.length === 1
                      ? "Review"
                      : "Reviews"}
                  </p>
                </div>
                <div className="flex ">
                  <Link
                    to={`/ReviewsCreatePage`}
                    className="bg-indigo-700 text-white h-10 px-2 rounded hover:opacity-75 flex items-center justify-center ml-3"
                  >
                    <span className="mx-2">Add reviews</span>
                  </Link>
                </div>
              </div>
              <div className="px-4 border-t mt-2 ">
                <InputIcon
                  placeholder="Search All reviews"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="px-4 mt-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Button
                    type={`button`}
                    title={`${Object.keys(selects).length} Selected`}
                    onClick={() => {
                      dispatch(setFormSelects("all", reviews));
                    }}
                    className={`bg-gray-300 text-gray-800`}
                  />
                  <Button
                    type={`button`}
                    title={`x ${Object.keys(selects).length} Select All`}
                    onClick={() => {
                      console.log("1");
                      dispatch(setFormSelects("all", reviews));
                    }}
                    className={`bg-gray-300 hidden text-gray-800 `}
                  />

                  <Button
                    type={`button`}
                    disabled={Object.keys(selects).length === 0}
                    title={`Delete`}
                    className={`bg-gray-300 text-gray-800 mx-2`}
                    onClick={(e) => dispatch(deleteReviews())}
                  />
                </div>
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setMode(`grid`)}
                    className={`${
                      mode === `grid` ? `bg-gray-200` : ``
                    } text-gray-800 h-10 w-10 rounded hover:opacity-75 flex items-center justify-center `}
                  >
                    <i className="material-icons">widgets</i>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode(`table`)}
                    className={`${
                      mode === `table` ? `bg-gray-200` : ``
                    } text-gray-800 h-10 w-10 rounded hover:opacity-75 flex items-center justify-center `}
                  >
                    <i className="material-icons">menu</i>
                  </button>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3 mt-4 ">
              <div>
                {reviewsSearch?.length === 0 && status !== `loading` && (
                  <div>
                    <h2 className="text-2xl text-center	font-light">
                      Not data found
                    </h2>
                  </div>
                )}
              </div>
              {status === `loading` && (
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    className="h-10 w-32 rounded hover:opacity-75 flex items-center justify-center spinner overflow-hidden"
                  ></button>
                </div>
              )}
              {status === `success` && mode === `grid` && (
                <div className=" grid grid-cols-12 gap-3 mx-3 ">
                  {reviewsSearch.map((review, key) => (
                    <div className="col-span-3" key={key}>
                      <div className="block relative border hover:border-indigo-700 rounded-md overflow-hidden group">
                        <button
                          type="button"
                          onClick={() => dispatch(setFormSelects(review.id))}
                          className="group-hover:block border border-indigo-700 absolute top-0 right-0 z-20 mt-2 mr-2 bg-white text-gray-600 h-6 w-6 rounded-full hover:opacity-75 hover:bg-white hover:text-blue-700 flex items-center justify-center"
                        >
                          {selects[review.id] && (
                            <i className="text-xl material-icons">done</i>
                          )}
                        </button>

                        <div
                          className="mx-2"
                          onClick={(e) => handleOnclick(review)}
                        >
                          <h1 className="truncate-2y text-sm leading-5 font-semibold">
                            {review.name}
                          </h1>
                        </div>
                        <div
                          className="w-full pb-1x1 relative bg-gray-300"
                          onClick={(e) => handleOnclick(review)}
                        >
                          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black-30 z-10 flex items-center justify-center">
                            <h3 className="text-white font-black mx-2 truncate-2y">
                              {companiesObj[review?.company_id]?.name}
                            </h3>
                          </div>
                          <img
                            alt=""
                            src={companiesObj[review?.company_id]?.image}
                            className="absolute h-full w-full object-cover"
                          />
                        </div>
                        <div
                          className="mx-2 my-2"
                          onClick={(e) => handleOnclick(review)}
                        >
                          <h2 className="truncate-2y text-sm leading-5 font-semibold">
                            {review.title}
                          </h2>
                          <div className={`text-gray-500 text-xs truncate`}>
                            <p className="">
                              Created at: {moment(review.created_at).fromNow()}
                            </p>
                            <p className="">
                              Updated at: {moment(review.created_at).fromNow()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {status === `success` && mode === `table` && (
                <table className=" table-auto text-sm w-full">
                  {reviewsSearch.length != 0 && (
                    <thead className="border-black border-b ">
                      <tr className="">
                        <td className="px-2 py-1"></td>
                        <td className="px-2 py-1">ID</td>
                        <td className="px-2 py-1"> Title</td>
                        <td className="px-2 py-1"> Content</td>
                      </tr>
                    </thead>
                  )}
                  <tbody className="text-gray-600 border-gray-500 border-b overflow-hidden">
                    {reviewsSearch.map((review, key) => (
                      <tr className="cursor-pointer" key={key}>
                        <td className="px-2 py-1 ">
                          <button
                            type="button"
                            onClick={() => dispatch(setFormSelects(review.id))}
                            className="overflow-hidden group border rounded-md bg-white text-gray-600 h-6 w-6 hover:border-indigo-500 relative"
                          >
                            {selects[review.id] && (
                              <i className="group-hover:block  text-xl material-icons absolute absolute-x absolute-y">
                                done
                              </i>
                            )}
                          </button>
                        </td>
                        <td
                          className="px-2 py-1  cursor-pointer"
                          onClick={(e) => handleOnclick(review)}
                        >
                          <p className="w-10 truncate">{review.id}</p>
                        </td>
                        <td
                          className="px-2 py-1  cursor-pointer"
                          onClick={(e) => handleOnclick(review)}
                        >
                          {review.title}
                        </td>
                        <td
                          className="px-2 py-1  cursor-pointer"
                          onClick={(e) => handleOnclick(review)}
                        >
                          {review.content}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </div>
        </div>
      </aside>
    );
  };
  return (
    <React.Fragment>
      <ReviewsDetailPage />
      {renderMain()}
    </React.Fragment>
  );
};
export default ReviewsPage;
