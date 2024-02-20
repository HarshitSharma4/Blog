import React, { useEffect, useState } from "react";
import service from "../aapwrite/config";
import { useDebounce } from "../custom hook/useDebounce";
import { Query } from "appwrite";
import { Container } from "../component/index";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { IoMdArrowRoundBack } from "react-icons/io";
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
      <div className="w-[90%]  m-auto flex justify-center items-center gap-3">
        <Link to={`/`}>
          <IoMdArrowRoundBack className="h-[3.5rem] w-[3.5rem]  border-2 border-text text-primary bg-accent rounded-[100%]" />
        </Link>
        <div className=" rounded-full flex-grow flex items-center overflow-hidden justify-start border-2 border-text">
          <div className="flex items-center justify-center p-3 bg-accent rounded-full">
            <FaSearch className="h-7 w-7 rounded-[100%] bg-accent text-primary" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="h-6 flex-grow outline-none px-5 text-2xl font-extrabold text-text"
            onChange={(e) => {
              setvalue(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="w-[90%] mx-auto my-4">
        {isLoading && <h1 className="text-xl">Loading</h1>}
        {!isLoading &&
          result.map((value, index) => (
            <Link
              key={index}
              to={`/post/${value.$id}`}
              className="w-[95%] pb-3 my-4"
            >
              <h1 className="px-5 text-2xl bg-accent  rounded-t-lg font-extrabold text-text py-3">
                {value?.title}
              </h1>
              <p className="px-5 h-12 overflow-hidden bg-accent  rounded-b-lg font-semibold line-clamp-2 text-text ">
                {" "}
                {HTMLReactParser(value?.content)}
              </p>
            </Link>
          ))}
      </div>
    </Container>
  );
}

export default Search;
