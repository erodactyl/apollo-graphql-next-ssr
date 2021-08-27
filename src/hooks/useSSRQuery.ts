import { useRef } from 'react';
import {
  useQuery,
  useApolloClient,
  DocumentNode,
  QueryResult,
  QueryHookOptions,
  TypedDocumentNode,
} from '@apollo/client';

interface IOptions<Q, V> extends QueryHookOptions<Q, V> {
  initialData?: QueryResult<Q, V>['data'];
}

function useSSRQuery<Query, Variables>(
  query: DocumentNode | TypedDocumentNode<Query, Variables>,
  options: IOptions<Query, Variables> = {},
): QueryResult<Query, Variables> {
  const { initialData, ...restOptions } = options;

  const client = useApolloClient();
  const alreadyWrittenRef = useRef<boolean | null>(null);
  addDataToCache();

  return useQuery<Query, Variables>(query, restOptions);

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
      const existingData = client.readQuery<Query, Variables>({
        query,
        variables: options.variables,
      });
      alreadyWrittenRef.current = Boolean(existingData);
    }
    return alreadyWrittenRef.current;
  }
}

export default useSSRQuery;
