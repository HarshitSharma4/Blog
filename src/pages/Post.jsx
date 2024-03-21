import React, { useEffect, useState } from "react";
import { Button, Container, Navigation } from "../component/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../aapwrite/config";
import { useDispatch, useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
import { postDelete } from "../store/postSlice";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Loading from "./Loading";
function Post() {
  const [post, setPost] = useState(null);
  const [isAuther, setIsAuther] = useState(false);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navgate = useNavigate();
  const userData = useSelector((state) => state.auth.userdata);
  useEffect(() => {
    setloading(true);
    service.getPost(slug).then((post) => {
      if (post) {
        setPost(post);
        setIsAuther(post.userId === userData.$id);
        setloading(false);
      } else {
        navgate("/post/404");
      }
    });
  }, [slug, navgate]);
  const deletePost = () => {
    service.deleteFile(post.featureImage);
    service
      .deletePost(post.$id)
      .then((responce) => {
        dispatch(postDelete(post.$id));
      })
      .catch((e) => {
        console.log(e);
      });

    navgate("/");
  };
  return (
    <Container>
      <Navigation />
      <div className="border-2 my-5 bg-primary py-7 px-5 border-text shadow-[0_10px_20px_rgba(0,_0,_0,_0.7)] relative rounded-2xl">
        {loading ? (
          <Loading />
        ) : (
          <>
            {" "}
            <h1 className="text-3xl font-extrabold my-4 w-[87%]">
              {post?.title}
            </h1>
            <h2 className="text-xl font-bold my-5">{post?.name}</h2>
            {post && (
              <div className="aspect-video overflow-hidden rounded-2xl">
                <img
                  src={service.getFilePreview(post.featureImage)}
                  alt="blog image"
                  className="h-full object-cover"
                />
              </div>
            )}
            {post && (
              <p className="my-5 text-xl font-semibold leading-5 space-y-5">
                {HTMLReactParser(post.content)}
              </p>
            )}
            {isAuther && (
              <div className="flex gap-7 absolute md:top-10 md:right-10 top-5 right-5">
                <Link to={`/edit-blog/${post.$id}`}>
                  <Button className="bg-text">
                    <FaPencil className="text-accent md:text-2xl text-base" />
                  </Button>
                </Link>
                <Button
                  className="bg-accent"
                  style={{ background: "#E74444" }}
                  onClick={() => {
                    deletePost();
                  }}
                >
                  <MdDelete className="text-text md:text-2xl text-base" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Container>
  );
}

export default Post;
