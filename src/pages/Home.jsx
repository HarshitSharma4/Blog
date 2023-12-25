import React from "react";
import { Navigation, Footer, PostCard, Container } from "../component/index";
import AddPostBar from "../component/common/AddPostBar";
import { useSelector } from "react-redux";
function Home() {
  const posts = useSelector((state) => state.posts.posts);

  return (
    <Container className="min-h-screen">
      <Navigation />
      <AddPostBar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
        {posts &&
          posts.map((post, key) => (
            <PostCard
              key={key}
              $id={post.$id}
              title={post.title}
              featureImage={post.featureImage}
              content={post.content}
            />
          ))}
      </div>
      <Footer />
    </Container>
  );
}

export default Home;
