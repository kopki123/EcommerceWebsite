import React from "react";
import styled from "styled-components";

export const ShowErrMsg = ({ msg }) => {
  return (
    <ShowMessage color="red">
      <p>{msg}</p>
    </ShowMessage>
  );
};

export const ShowSuccessMsg = ({ msg }) => {
  return (
    <ShowMessage color="green">
      <p>{msg}</p>
    </ShowMessage>
  );
};

const ShowMessage = styled.div`
  text-align: center;
  margin: 1.5rem 0 auto 0;
  font-size: 0.5rem;
  color: ${(props) =>
    props.color === "red" ? "rgb(247, 12, 12)" : "rgb(10, 158, 10)"};
`;
