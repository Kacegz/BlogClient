import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://blogapi-aye4d6a2h6breqcg.francecentral-01.azurewebsites.net/register/",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return setError(data.error);
    }
    navigate("/");
  };

  return (
    <>
      <form onSubmit={submit} method="post">
        <CenteredForm>
          {error ? <ErrorMsg>{error}</ErrorMsg> : ""}
          <label htmlFor="username">
            <p>Username:</p>
          </label>

          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <label htmlFor="password">
            <p>Password:</p>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <label htmlFor="confirm">
            <p>Confirm password</p>
          </label>
          <input
            type="password"
            name="confirm"
            id="confirm"
            onChange={(e) => setUser({ ...user, confirm: e.target.value })}
          />

          <input type="submit" value="Register" />
        </CenteredForm>
      </form>
    </>
  );
}
const CenteredForm = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  gap: 20px;
  border: 1px solid #e3caa5;
  padding: 40px;
  border-radius: 20px;
  input {
    height: 36px;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 4px;
    background: #e3caa5;
    border: 1px solid white;
    outline: none;
  }
  input:focus,
  input:hover {
    background: #d1ba98;
    cursor: pointer;
  }
`;
const ErrorMsg = styled.p`
  font-weight: bold;
  color: red;
`;
