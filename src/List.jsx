import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import LoadingComponent from "./Loading";
function List() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  async function fetchData() {
    try {
      const response = await fetch(
        "https://blogapi-aye4d6a2h6breqcg.francecentral-01.azurewebsites.net/posts/"
      );
      if (!response.ok) {
        throw new Error("Connection error");
      }
      const data = await response.json();
      const filteredData = data.filter((blog) => blog.published === true);
      setPosts(filteredData);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <PostList>
        {loading ? (
          <LoadingComponent />
        ) : (
          posts.map((post) => {
            return (
              <li key={post._id}>
                <PostSection>
                  <PostTitle>{post.title}</PostTitle>
                  <PostDetails>
                    {post.formattedDate} @ {post.author.username}
                  </PostDetails>
                  <PostText>{post.text}</PostText>
                  <Link to={post._id}>
                    <PostButton>Read more</PostButton>
                  </Link>
                </PostSection>
              </li>
            );
          })
        )}
      </PostList>
    </>
  );
}
const PostList = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media only screen and (max-width: 600px) {
    & {
      grid-template-columns: 1fr;
    }
  }
`;
const PostSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px;
  max-width: 640px;
  border: 1px solid #e3caa5;
  border-radius: 20px;
  gap: 5px;
  &:hover {
    background: #f2e9d3;
  }
`;
const PostTitle = styled.h1`
  font-size: 1.5rem;
`;
const PostDetails = styled.p`
  font-style: italic;
  font-weight: 100;
  font-family: Cormorant, serif;
  font-size: 1.1rem;
`;
const PostText = styled.p`
  text-align: justify;
  text-justify: inter-word;
  font-size: 1rem;
  margin: 10px;
  word-wrap: break-word;
  min-height: 100px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
`;
const PostButton = styled.button`
  background: transparent;
  border: 1px solid #ad8b73;
  outline: none;
  font-size: 1rem;
  padding: 10px;
  font-family: Cormorant, serif;
  cursor: pointer;
  background: #e3caa5;
  &:hover {
    background: #d1ba98;
  }
`;
export default List;
