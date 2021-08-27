import { useRef } from "react";
import * as Apollo from '@apollo/client';
import {
  useQuery,
  DocumentNode,
  QueryResult,
  useApolloClient,
} from "@apollo/client";

interface IOptions<Q, V> extends Apollo.QueryHookOptions<Q, V> {
  initialData?: QueryResult<Q, V>["data"];
}

function useSSRQuery<Query, Variables>(
  query: DocumentNode,
  options: IOptions<Query, Variables> = {}
): Apollo.QueryResult<Query, Variables> {
  const { initialData, ...restOptions } = options;

  const client = useApolloClient();
  const alreadyWrittenRef = useRef<boolean | null>(null);
  addDataToCache();

  const res = useQuery<Query, Variables>(query, restOptions);

  return res;

  function addDataToCache() {
    /** Add initial data to cache only if it doens't already exist */
    if (!getAlreadyWritten()) {
      if (initialData) {
        client.writeQuery<Query, Variables>({
          query,
          variables: options?.variables,
          data: initialData,
        });
      }
      alreadyWrittenRef.current = true;
    }
  }

  /** Create object lazily to skip reading the query on every execution
   *  https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
   */
  function getAlreadyWritten() {
    if (alreadyWrittenRef.current === null) {
      const existingData = client.readQuery<Query>({
        query,
        variables: options.variables,
      });
      alreadyWrittenRef.current = Boolean(existingData);
    }
    return alreadyWrittenRef.current;
  }
}

export default useSSRQuery;
