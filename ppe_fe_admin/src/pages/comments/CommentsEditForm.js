import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../../slices/users";
import Ajax from "../../components/Ajax";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import FormFooter from "../../components/FormFooter";
import FormUploadFile from "../../components/FormUploadFile";
import { Button, Input, Select, Textarea } from "../../components/Form";
import { detailsSelector, setDetailData } from "../../slices/details";

const CommentsEditForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(usersSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [chooses, setChooses] = useState({});
  const { isShow, mode, comment } = useSelector(detailsSelector);

  useEffect(() => {
    fetchData();
    async function fetchData() {
      let res = await Ajax.get(`/posts`);
      setPosts(res.data?.posts);
    }
  }, [dispatch]);

  const commentSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.put(`/comments/${comment.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    Alert({ t: `Save success`, c: [] });
    window.location.reload();
  };

  const handleChooses = (e, id) => {
    e.preventDefault();
    if (chooses[id]) {
      delete chooses[id];
    } else {
      chooses[id] = id;
    }
    setChooses(chooses);
  };

  return (
    <form onSubmit={(e) => commentSAVE(e)}>
      <main className="w-full max-w-3xl mx-auto rounded max-h-64 overflow-y-auto my-3">
      
        <section
          className={`${
            show !== 1 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 `}
        >
         

          
          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Posts</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Select
           
            name={`post_id`}
            ids={posts.map(({ id }) => id)}
            values={posts.map(({ title }) => title)}
            value={comment.post_id}
          />
         </label>
        
        <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Content</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Textarea
         
            name={`content`}
            placeholder={`Enter a content about your comment`}
            value={comment.content}
          />
         </label>
       
           <label className="block mt-4">
                      <div className="flex"><span className="block font-medium">Image</span><b className="text-red-600 ml-1"> (*)</b></div>
                    
         </label>
         <FormUploadFile files={comment.files.images} handle_first={true}/>
        </section>
      </main>

      <FormFooter
       tabNumber={1}
       show={show}
        onShowMinus={() => setShow(show - 1)}
        onShowPlus={() => setShow(show + 1)}
      />
    </form>
  );
};

export default CommentsEditForm;
