import  { useEffect, useState } from "react";
import { Container, PostForm } from "../component/index";
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
        <div className="w-screen bg-accent">
          <Container>
            <PostForm post={post} />
          </Container>
        </div>
      ) : (
        <>Some thing went wrong page is not responsing</>
      )}
    </>
  );
}

export default EditPost;
