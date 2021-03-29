import React from "react";

type Props = {
  data: {
    firstNameLastName: string;
    jobTitle: string;
    emailAddress: string;
  };
};

function PersonInfo(props: Props) {
  const { data } = props;

  return (
    <div className="PersonInfo">
      <div className="PersonInfo__firstNameLastName">{data.firstNameLastName}</div>
      <div className="PersonInfo__jobTitle">{data.jobTitle}</div>
      <div className="PersonInfo__emailAddress">{data.emailAddress}</div>
    </div>
  );
}

export default PersonInfo;
