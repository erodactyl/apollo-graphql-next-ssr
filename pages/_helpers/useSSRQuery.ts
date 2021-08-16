import { useEffect } from "react"
import { useQuery, DocumentNode, QueryHookOptions , OperationVariables} from "@apollo/client"

const useSSRQuery = (query: DocumentNode, options: QueryHookOptions<any, OperationVariables>, initialData: any) => {
  const res = useQuery(query, {
    ...options, fetchPolicy: 'cache-only', nextFetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    res.client.writeQuery({ query, variables: options.variables, data: initialData });
  }, [])

  return res
}

export default useSSRQuery;
