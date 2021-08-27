import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type ExchangeRate = {
  __typename?: 'ExchangeRate';
  currency?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  rates?: Maybe<Array<Maybe<ExchangeRate>>>;
};


export type QueryRatesArgs = {
  currency: Scalars['String'];
};


export type GetRatesQueryVariables = Exact<{
  currency: Scalars['String'];
}>;


export type GetRatesQuery = { __typename?: 'Query', rates?: Maybe<Array<Maybe<{ __typename?: 'ExchangeRate', currency?: Maybe<string>, rate?: Maybe<string>, name?: Maybe<string> }>>> };


export const GetRatesDocument = gql`
    query GetRates($currency: String!) {
  rates(currency: $currency) {
    currency
    rate
    name
  }
}
    `;

/**
 * __useGetRatesQuery__
 *
 * To run a query within a React component, call `useGetRatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRatesQuery({
 *   variables: {
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useGetRatesQuery(baseOptions: Apollo.QueryHookOptions<GetRatesQuery, GetRatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRatesQuery, GetRatesQueryVariables>(GetRatesDocument, options);
      }
export function useGetRatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRatesQuery, GetRatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRatesQuery, GetRatesQueryVariables>(GetRatesDocument, options);
        }
export type GetRatesQueryHookResult = ReturnType<typeof useGetRatesQuery>;
export type GetRatesLazyQueryHookResult = ReturnType<typeof useGetRatesLazyQuery>;
export type GetRatesQueryResult = Apollo.QueryResult<GetRatesQuery, GetRatesQueryVariables>;