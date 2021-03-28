import React, { useState, useEffect, useCallback } from "react";
import fetchApiData from "./api";
import { useFetcher } from "./hooks/useFetcher";
import PersonInfo from "./PersonInfo";

type PersonType = {
  id: string,
  data: {
    firstNameLastName: string,
    jobTitle: string,
    emailAddress: string,
  };
};

type ApiDataType = {
  isLoading: boolean,
  isError: boolean,
  data: PersonType[],
  useAgain: () => void,
};

function App() {
  const [selected, setSelected] = useState([]);

  const { data, isLoading, isError, useAgain } = useFetcher<ApiDataType>(fetchApiData, []);

  return (
    <div className="App">
      <div className="selected">Selected contacts: {selected.length}</div>
      <div className="list">
        {data.map((personInfo) => (
          // @ts-ignore
          <PersonInfo key={personInfo.id} data={personInfo} />
        ))}
      </div>
      <button className="loadMoreButton" onClick={useAgain}>Load more</button>
    </div>
  );
}

export default App;
