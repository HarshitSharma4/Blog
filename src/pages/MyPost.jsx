import { useSelector } from "react-redux";
import { Container, Navigation, PostCard } from "../component/index";
import React from "react";

function MyPost() {
  let posts = useSelector((state) => state.posts.posts);
  const userData = useSelector((state) => state.auth.userdata);
  posts = posts.filter((post) => post.userId === userData.$id && post);
  return (
    <Container>
      <Navigation />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
        {posts.map((post, key) => (
          <PostCard
            key={key}
            $id={post.$id}
            title={post.title}
            featureImage={post.featureImage}
            content={post.content}
          />
        ))}
      </div>
    </Container>
  );
}

export default MyPost;
