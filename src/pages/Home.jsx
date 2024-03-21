import React from "react";
import { Navigation, Footer, PostCard, Container } from "../component/index";
import AddPostBar from "../component/common/AddPostBar";
import { useSelector } from "react-redux";
import { useListVertulization } from "../custom hook/useListVertulization";
function Home() {
  const posts = useSelector((state) => state.posts.posts);
  const visibleItems = useListVertulization(posts, 4);
  return (
    <Container className="min-h-screen">
      <Navigation />
      <AddPostBar />

      {visibleItems &&
        visibleItems.map((post, key) => (
          <PostCard
            key={key}
            $id={post.$id}
            title={post.title}
            name={post.name}
            featureImage={post.featureImage}
            content={post.content}
          />
        ))}

      <Footer />
    </Container>
  );
}

export default Home;
