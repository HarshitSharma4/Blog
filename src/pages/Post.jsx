import React, { useEffect, useState } from "react";
import { Button, Container, Navigation } from "../component/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../aapwrite/config";
import { useDispatch, useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
import { postDelete } from "../store/postSlice";
function Post() {
  const [post, setPost] = useState(null);
  const [isAuther, setIsAuther] = useState(false);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navgate = useNavigate();
  const userData = useSelector((state) => state.auth.userdata);
  useEffect(() => {
    service.getPost(slug).then((post) => {
      if (post) {
        setPost(post);
        setIsAuther(post.userId === userData.$id);
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
      <h1 className="text-3xl font-extrabold my-5">{post?.title}</h1>
      {post && (
        <div className="h-[34rem]">
          <img
            src={service.getFilePreview(post.featureImage)}
            alt="blog image"
            className="h-full object-contain"
          />
        </div>
      )}
      {post && (
        <p className="my-5 text-xl font-semibold leading-5">
          {HTMLReactParser(post.content)}
        </p>
      )}
      {isAuther && (
        <div className="flex gap-7">
          <Link to={`/edit-blog/${post.$id}`}>
            <Button>Edit</Button>
          </Link>
          <Button
            onClick={() => {
              deletePost();
            }}
          >
            Delete
          </Button>
        </div>
      )}
    </Container>
  );
}

export default Post;
