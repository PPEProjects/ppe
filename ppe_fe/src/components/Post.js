import React, {Component} from "react";
import {Link} from "react-router-dom";
import Header from "./.Dir/Header";
import Ajax from "./.Tools/Ajax";
import JobList from "./.Child/JobList";
import JobSidebar from "./.Child/JobSidebar";
import JobMore from "./.Child/JobMore";
import JobHeaderSlider from "./.Child/JobHeaderSlider";
import moment from "moment";
import PostList from "./.Child/PostList";
import Footer from "./.Dir/Footer";
import {withTranslation} from "react-i18next";
import PostSidebar from "./.Child/ProjectSidebar";
import PostMore from "./.Child/ProjectMore";
import PostMember from "./.Child/ProjectMember";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: `loading`,
            post_id: 0,
            post: {},
            comments: [],
            users: {},
            user: {},
        };
    }

    async componentDidMount() {
        this.setState({status: "loading"});
        let post_id = this.props.match.params.post_id;
        let post = await Ajax.get(`/posts/${post_id}`);

        post = post?.data ?? {};
        let comments = await Ajax.get(`/comments`, {post_id: post.id});
        let users = await Ajax.get(`/users`, {keyBy: `id`});
        let user = await Ajax.get(`/users`, {get_info: `get_info`});
        console.log('user', user)
        this.setState({
            status: `success`,
            post_id: post_id,
            users: users?.data?.users ?? {},
            user: user?.data ?? {},
            post: post,
            comments: comments?.data?.comments ?? {},
        });
    }

    async componentDidUpdate() {
        let {post_id} = this.state;
        if (this.props.match.params.post_id !== post_id) {
            post_id = this.props.match.params.post_id;
            this.setState({post_id: post_id});
            this.componentDidMount();
        }
    }

    set_state(obj) {
        this.setState(obj);
    }

    render() {
        let {status, post_id, post, users, user, comments} = this.state;
        console.log('users', users)

        console.log('comments', comments)
        let descriptions = Object.values(post?.descriptions ?? {});
         let files = Object.values(post?.files?.videos ?? {});
        let {members} = post;
        members = members ?? [];
        let {t} = this.props;

        return (
            <React.Fragment>
                <Header menuId="3" />
                <main className="">
                    <div className="grid grid-cols-12 gap-4 w-full max-w-screen-xl mx-auto lg:px-4 px-4 ">

                        <div className="lg:col-span-8 col-span-12 mt-4 mx-32">

                            <section class="">
                                <h3 class="text-2xl font-semibold">{post?.title}</h3>
                                {descriptions.map((description, key) => (
                                    <div className="" key={key}>
                                        <p className={`${!key ? `text-gray-600` : ``} mt-3`}>
                                            {description.value}
                                        </p>
                                        {(description.files ?? []).map((file, key1) => (
                                            <a
                                                href={post.image}
                                                key={key1}
                                                target={`_blank`}
                                                className="mt-3 block p-2 border border-transparent hover:border-indigo-700"
                                            >
                                                <div className="w-full">
                                                    <div
                                                        className="pb-16x9 relative rounded-sm overflow-hidden bg-gray-300">
                                                        <img
                                                            alt=""
                                                            src={description.files}
                                                            className="absolute h-full w-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <figcaption className="text-center mt-3">
                                                    {post.title}
                                                </figcaption>
                                            </a>
                                        ))}
                                        <div>
                                          {(post.files.videos ?? []).map((file, key) => (
                                               <a
                                                href={post.files.videos}
                                                key={key}
                                                target={`_blank`}
                                                className="mt-3 block p-2 border border-transparent hover:border-indigo-700"
                                            >
                                              <figure class="mt-3">
                                                <div class="w-full">
                                                    <div class="pb-16x9 relative rounded-sm overflow-hidden bg-gray-300">
                                                        <video
                                                            alt=""
                                                            src={post.files.videos}
                                                            className="absolute h-full w-full object-cover"
                                                            controls
                                                        
                                                        />
                                                    </div>
                                                </div>
                                                 <figcaption className="text-center mt-3">
                                                    {post.title}
                                                </figcaption>
                                                
                                            </figure>
                                            </a>
                                          ))}
                                        
                                        </div>
                                    </div>
                                ))}
                            </section>
                            
                            
                            <section className="overflow-auto">
                                <h3 className="text-xl font-semibold mt-3 uppercase">
                                    {t("comments")}
                                </h3>
                                <form className="flex mt-4">
                                    <figure className="">
                                        <div className="w-12">
                                            <div className="pb-1x1 relative rounded-full overflow-hidden bg-gray-300">
                                                <img
                                                    alt=""
                                                    src={user.image}
                                                    className="absolute h-full w-full object-cover"
                                                />
                                            </div>

                                        </div>
                                    </figure>
                                    <div className=" w-full ml-3">
                                        <label
                                            className="block relative"
                                            x-data="{focus: false, value:''}"
                                        >
                      <span
                          className={`'-translate-y-5 text-indigo-700 text-sm': focus||value.length`}
                          className="block absolute top-0 mt-4 bg-white duration-200 ease-in-out transform"
                      >
                        {t("Add a public comment")}
                      </span>
                                            <span
                                                className="{'w-full' : focus}"
                                                className="absolute left-0 right-0 bottom-0 border-b-2 border-indigo-700 w-0 duration-200 ease-in-out transform"
                                            ></span>
                                            <input
                                                x-model="value"
                                                className="{'border-blue-500': focus||value.length}"
                                                type="text"
                                                className="border-b-2 border-gray-400 h-10 w-full mt-2 outline-none"
                                                placeholder="..."
                                            />
                                        </label>
                                        <div className="mt-3 flex justify-end">
                                            <button
                                                type="button"
                                                className="bg-white text-gray-800 h-10 w-32 rounded hover:opacity-75 hover:bg-gray-200 border border-gray-400"
                                            >
                                                <span className="uppercase">{t("cancel")}</span>
                                            </button>

                                            <button
                                                type="button"
                                                className="bg-indigo-700 text-white h-10 w-32 rounded hover:opacity-75 ml-3"
                                            >
                                                <span className="uppercase">{t("comment")}</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <ul className="">
                                    {comments.map((comment, key) => (
                                        <li className="flex mt-4 " key={key}>
                                            <figure className="">
                                                <div className="w-12">
                                                    <div
                                                        className="pb-1x1 relative rounded-full overflow-hidden bg-gray-300">
                                                        <img
                                                            alt=""
                                                            src={users[comment.user_id]?.image}
                                                            className="absolute h-full w-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            </figure>
                                            <div className="ml-3">
                                                <a
                                                    href="#"
                                                    className="mr-1 text-indigo-700 hover:underline"
                                                >
                                                    {users[comment.user_id]?.name}
                                                </a>
                                                <span className="text-gray-600">
                          {moment(comment.created_at).fromNow()}
                        </span>
                                                <p className="mt-2">{comment.content}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        <div className="lg:col-span-4 col-span-12 ">
                            <section className="w-full max-w-screen-xl mx-auto mt-4">
                                <h3 className="flex items-center text-2xl uppercase lg:mx-0 ">
                  <span className="pl-2 pb-1 font-semibold w-full">
                    {t("Projects")}
                  </span>
                                </h3>
                            </section>
                            <section className="w-full max-w-screen-xl mx-auto  text-center">
                                <PostList/>
                            </section>
                        </div>
                    </div>
                </main>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default withTranslation()(Post);
