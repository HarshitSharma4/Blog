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
      {post ? (
        <Container>
          <PostForm post={post} />
        </Container>
      ) : (
        <>Some thing went wrong page is not responsing</>
      )}
    </>
  );
}

export default EditPost;
