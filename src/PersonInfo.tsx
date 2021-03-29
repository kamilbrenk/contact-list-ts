import React, { useCallback } from "react";
import classNames from "classnames";

type Props = {
  data: {
    id: string;
    firstNameLastName: string;
    jobTitle: string;
    emailAddress: string;
  };
  isSelected: boolean,
  onClick: (id: string) => string
};

function PersonInfo(props: Props) {
  const {
    data: { id, firstNameLastName, jobTitle, emailAddress },
    isSelected,
    onClick,
  } = props;

  const handleClick = useCallback(() => {
    onClick(id);
  }, [onClick, id]);

  return (
    <button className="PersonInfo__holder" onClick={handleClick}>
      <div className={classNames("PersonInfo", { "PersonInfo__selected": isSelected })}>
        <div className="PersonInfo__firstNameLastName">{firstNameLastName}</div>
        <div className="PersonInfo__jobTitle">{jobTitle}</div>
        <div className="PersonInfo__emailAddress">{emailAddress}</div>
      </div>
    </button>
  );
}

export default PersonInfo;
