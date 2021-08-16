import { gql, useLazyQuery, useQuery } from "@apollo/client";
import type { NextPage, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import { client as mainClient } from "./_app";
import useSSRQuery from "./_helpers/useSSRQuery";

const GET_RATES = gql`
  query GetRates($currency: String!) {
    rates(currency: $currency) {
      currency
      rate
      name
    }
  }
`;

interface Props {
  initialData: any;
  variables: any;
}

const Currency: NextPage<Props> = ({ initialData, variables }) => {
  const { data, refetch, client } = useSSRQuery(
    GET_RATES,
    { variables },
    initialData
  );

  console.log(data);

  return (
    <div>
      {data?.rates.map((rate) => (
        <React.Fragment key={rate.currency}>
          <h1>{rate.name}</h1>
          <h2>{rate.rate}</h2>
        </React.Fragment>
      ))}
    </div>
  );
};

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const variables = { currency: params!.currencyName };
  const rates = await mainClient.query({
    query: GET_RATES,
    variables,
  });
  return {
    props: {
      variables,
      initialData: rates.data,
    },
  };
}

export default Currency;
