import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "./Loading";
export default function Post() {
  const postId = useParams();
  const [user, setUser] = useState();
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState();
  const navigate = useNavigate();
  async function fetchPost() {
    try {
      const [postResponse, commentResponse] = await Promise.all([
        fetch(
          `https://blogapi-aye4d6a2h6breqcg.francecentral-01.azurewebsites.net/posts/${postId.id}`
        ),
        fetch(
          `https://blogapi-aye4d6a2h6breqcg.francecentral-01.azurewebsites.net/posts/${postId.id}/comments`
        ),
      ]);
      if (!postResponse.ok || !commentResponse.ok) {
        throw new Error("Connection error");
      }
      const postData = await postResponse.json();
      const commentData = await commentResponse.json();
      setPost(postData);
      setComments(commentData);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }
  async function sendComment(e) {
    e.preventDefault();
    try {
      const sendComment = await fetch(
        `https://blogapi-aye4d6a2h6breqcg.francecentral-01.azurewebsites.net/posts/${postId.id}/comments`,
        {
          method: "POST",
          body: JSON.stringify(newComment),
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-type": "application/json",
          },
        }
      );
      navigate(0);
    } catch (err) {
      return console.error(err);
    }
  }
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("accessToken")));
    fetchPost();
  }, []);
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <PostSection>
            <PostTitle>{post.title}</PostTitle>
            <PostDetails>
              {post.formattedDate} @ {post.author.username}
            </PostDetails>
            <PostText>{post.text}</PostText>
          </PostSection>
          Comments:
          {comments.map((comment) => {
            return (
              <li key={comment._id}>
                <CommentSection>
                  <CommentText>
                    <span style={{ fontWeight: "bold" }}>
                      {comment.author.username}:
                    </span>{" "}
                    {comment.text}
                  </CommentText>
                </CommentSection>
              </li>
            );
          })}
          {user ? (
            <>
              <form method="post" onSubmit={sendComment}>
                <AddComentSection>
                  <input
                    type="text"
                    name="text"
                    id="text"
                    onChange={(e) => setNewComment({ text: e.target.value })}
                  />
                  <input type="submit" value="Send" />
                </AddComentSection>
              </form>
            </>
          ) : (
            <AddComentSection>
              <p>
                You must be <Link to="/login">logged in</Link> to add a comment
              </p>
            </AddComentSection>
          )}
        </>
      )}
    </>
  );
}
const PostSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px;
  width: 40%;
  min-height: 60vh;
  border: 1px solid #e3caa5;
  border-radius: 20px;
  gap: 5px;
  &:hover {
    background: #f2e9d3;
  }
  @media only screen and (max-width: 600px) {
    & {
      width: 60%;
    }
    & input {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`;
const PostTitle = styled.h1`
  font-size: 1.6rem;
`;
const PostDetails = styled.p`
  font-style: italic;
  font-weight: 100;
  font-family: Cormorant, serif;
  font-size: 1.1rem;
`;
const PostText = styled.p`
  font-size: 1rem;
  margin: 10px;
  word-wrap: break-word;
`;
const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 10px;
  padding-left: 40px;
  padding-right: 40px;
  border: 1px solid #e3caa5;
  border-radius: 20px;
  gap: 5px;
  &:hover {
    background: #f2e9d3;
  }
`;
const CommentText = styled.p`
  word-wrap: break-word;
  width: 22vw;
  overflow: hidden;
`;
const AddComentSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  border: 1px solid #e3caa5;
  border-radius: 20px;
  gap: 10px;
  padding-left: 20px;
  padding-right: 20px;

  input {
    height: 36px;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 10px;
    background: #e3caa5;
    border: 1px solid white;
    outline: none;
  }
  input:focus,
  input:hover {
    background: #d1ba98;
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {
    & {
      gap: 0;
      padding: 0;
      margin: 10px;
    }
    & input {
      padding-left: 10px;
      padding-right: 10px;
      margin-left: 5px;
      margin-right: 5px;
    }
  }
`;
