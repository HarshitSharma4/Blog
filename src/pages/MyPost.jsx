import { useSelector } from "react-redux";
import { PostCard } from "../component/index";
import { useEffect, useState } from "react";
import service from "../aapwrite/config";
import { Query } from "appwrite";

function MyPost() {
  const [posts, setPost] = useState([]);
  const userData = useSelector((state) => state.auth.userdata);
  useEffect(() => {
    service
      .getPosts([Query.equal("userId", `${userData.$id}`)])
      .then((res) => {
        setPost(res?.documents);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      {posts.map((post, key) => (
        <PostCard
          key={key}
          $id={post.$id}
          title={post.title}
          featureImage={post.featureImage}
          content={post.content}
        />
      ))}
    </>
  );
}

export default MyPost;
