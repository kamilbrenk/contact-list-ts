import React, { useState, useCallback } from "react";
import fetchApiData from "./api";
import { useFetcher } from "./hooks/useFetcher";
import PersonInfo from "./PersonInfo";
import Loader from "./Loader";

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
  const [selected, setSelected] = useState<string[]>([]);
  const { data, isLoading, isError, useAgain } = useFetcher<ApiDataType>(fetchApiData, []);

  const handleClick = useCallback((id) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(selectedId => selectedId !== id);
      }

      const newSelected = [...prevSelected, id];
      const uniqueSelected = [...new Set(newSelected)];

      return uniqueSelected;
    })
  }, []);

  const sortBySelected = useCallback((contactA, contactB) => {
    if (selected.includes(contactA.id)) {
      return -1;
    }

    if (selected.includes(contactB.id)) {
      return 0;
    }

    return 1;
  }, [selected]);

  return (
    <div className="App">
      <div className="App__selected">Selected contacts: {selected.length}</div>
      <div className="App__list">
        {data.sort(sortBySelected).map((personInfo) => (
          // @ts-ignore
          <PersonInfo key={personInfo.id} data={personInfo} isSelected={selected.includes(personInfo.id)} onClick={handleClick} />
        ))}
        <div className="App__status">
          {isError && <p className="App__errorText">Something went wrong and API is unavailable. Please, try again.</p>}
          {isLoading ? <Loader /> : <button className="App_loadMore" onClick={useAgain}>Load more</button>}
        </div>
      </div>
    </div>
  );
}

export default App;
