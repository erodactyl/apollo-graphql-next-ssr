import { Fragment, useState } from "react";
import type { NextPage, GetServerSidePropsContext } from "next";
import {
  GetRatesDocument,
  GetRatesQuery,
  GetRatesQueryVariables,
} from "../graphql/graphql";
import { client as mainClient } from "./_app";
import useSSRQuery from "../hooks/useSSRQuery";

interface Props {
  variables: GetRatesQueryVariables;
  initialData: GetRatesQuery;
}

const Currency: NextPage<Props> = ({ variables, initialData }) => {
  const [curr, setCurr] = useState(variables.currency);
  const { data, refetch, loading } = useSSRQuery<
    GetRatesQuery,
    GetRatesQueryVariables
  >(GetRatesDocument, {
    variables,
    initialData,
  });

  return (
    <div>
      <input value={curr} onChange={(e) => setCurr(e.currentTarget.value)} />
      <button onClick={() => refetch({ currency: curr })}>Refetch</button>
      {data?.rates?.map(
        (rate) =>
          rate && (
            <Fragment key={rate.currency}>
              <h1>{rate.name}</h1>
              <h2>{rate.rate}</h2>
            </Fragment>
          )
      )}
    </div>
  );
};

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const variables = { currency: params!.currencyName };
  const rates = await mainClient.query<GetRatesQuery>({
    query: GetRatesDocument,
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
