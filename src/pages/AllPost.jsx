import React from "react";
import { Container, Navigation, PostCard } from "../component/index";
import { useSelector } from "react-redux";
function AllPost() {
  const posts = useSelector((state) => state.posts.posts);
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

export default AllPost;
