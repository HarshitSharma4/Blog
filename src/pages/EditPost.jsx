import React, { useEffect, useState } from "react";
import { Container, Navigation, PostForm } from "../component/index";
import { useNavigate, useParams } from "react-router-dom";
import service from "../aapwrite/config";
function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navgate = useNavigate();
  useEffect(() => {
    service.getPost(slug).then(
      (post) => {
        if (post) setPost(post);
        else navgate("/");
      },
      [slug, navgate]
    );
  });
  return (
    <>
      <Navigation />
      {post ? (
        <Container>
          <PostForm post={post} />
        </Container>
      ) : null}
    </>
  );
}

export default EditPost;
