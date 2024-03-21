import React, { useEffect, useState } from "react";
import service from "../aapwrite/config";
import { useDebounce } from "../custom hook/useDebounce";
import { Query } from "appwrite";
import { Container, Navigation } from "../component/index";
import { Link } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import searchicon from "../assets/loupe.png";
import Loading from "./Loading.jsx";

function Search() {
  const [value, setvalue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([]);
  const searchDebounce = useDebounce(value);
  useEffect(() => {
    setIsLoading(true);
    console.log(searchDebounce);
    if (searchDebounce !== "") {
      console.log(searchDebounce);

      service
        .getPosts([Query.startsWith("title", searchDebounce)])
        .then((posts) => {
          if (posts) {
            console.log(posts);
            setResult(posts?.documents);
          }
          console.log(posts);
        })
        .catch((error) => {
          alert(error);
        });
    }
    setIsLoading(false);
  }, [searchDebounce]);

  return (
    <Container>
      <Navigation />
      <div className="rounded-2xl flex items-center justify-center bg-primary my-12 h-40 shadow-[0_10px_20px_rgba(0,_0,_0,_0.7)] hover:-translate-y-1">
        <div className="rounded-2xl h-16 overflow-hidden bg-secondary flex w-[70%] ">
          <div className="bg-secondary  border-r-4 border-text  overflow-hidden px-7  py-2">
            <img src={searchicon} className="h-12 h-12" alt="search icon" />
          </div>
          <input
            type="text"
            placeholder="Search Your Blog . . ."
            className="h-full placeholder:text-text  bg-secondary text-text flex-grow py-5 px-5 text-3xl font-extrabold border-none outline-none"
            onChange={(e) => {
              setvalue(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="w-full my-4 space-x-7">
        {isLoading && <Loading />}
        {!isLoading &&
          result.map((value, index) => (
            <Link
              key={index}
              to={`/post/${value.$id}`}
              className="w-full block px-4 py-5 bg-primary rounded-xl shadow-[0_10px_20px_rgba(0,_0,_0,_0.7)] hover:-translate-y-1 overflow-hidden "
            >
              <h1 className="mx-5 text-2xl font-extrabold text-text my-3">
                {value?.title}
              </h1>
              <h2 className="mx-5 text-xl font-bold text-text my-3">
                {value?.name}
              </h2>
              <p className="px-5 h-12 overflow-hidden  font-semibold line-clamp-2 text-text ">
                {HTMLReactParser(value?.content)}
              </p>
            </Link>
          ))}
      </div>
    </Container>
  );
}

export default Search;
