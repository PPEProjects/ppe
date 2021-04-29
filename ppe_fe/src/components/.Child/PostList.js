import React, { Component } from "react";
import { Link } from "react-router-dom";
import Ajax from "../.Tools/Ajax";
import moment from "moment";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  set_state(obj) {
    this.setState(obj);
  }

  async componentDidMount() {
    let posts = await Ajax.get(`/posts`);
    this.setState({
      posts: posts?.data?.posts ?? [],
    });
  }

  render() {
    let { posts } = this.state;
    return (
      <React.Fragment>
        {posts.map((post, key) => (
          <Link to={`/Post/${post.id}`} className="lg:col-span-6 col-span-12">
            <section
              href="about_us.php"
              className="flex py-1 px-2 hover:border-blue-500 border border-transparent overflow-hidden"
            >
              <figure className="flex items-center">
                <div className="w-20">
                  <div className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                    <img
                      alt=""
                      src={post.image}
                      className="absolute h-full w-full object-cover"
                    />
                  </div>
                </div>
              </figure>
              <div className="ml-3">
                <h3 className="truncate-2y text-lg leading-6">{post.title}</h3>
                <p className="truncate-2y font-light text-gray-800 leading-5 mt-1 whitespace-pre-line">
                  {post.description}
                </p>
              </div>
            </section>
          </Link>
        ))}
      </React.Fragment>
    );
  }
}

export default PostList;
