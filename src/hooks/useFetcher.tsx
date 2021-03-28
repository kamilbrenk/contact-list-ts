import { useState, useEffect, useReducer, useCallback } from "react";

type StateType = {
  isLoading: boolean,
  isError: boolean,
  data: unknown[],
};

type ActionType =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: unknown[] }
  | { type: 'FETCH_FAILURE' };

const dataFetchReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: [
          ...state.data,
          ...action.payload,
        ],
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export function useFetcher<D>(fetcher: () => Promise<unknown[]>, initialData: unknown[]) {
  const [fetchCount, setFetchCount] = useState(0);
  const useAgain = useCallback(() => {
    setFetchCount(prevCount => prevCount + 1);
  }, [setFetchCount]);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
 
  useEffect(() => {
    let didCancel = false;
 
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
 
      try {
        const payload = await fetcher();
 
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };
 
    fetchData();
 
    return () => {
      didCancel = true;
    };
  }, [fetcher, fetchCount]);
 
  // return state;
  return {
    ...state,
    useAgain
  };
};
