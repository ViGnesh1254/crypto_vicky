import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const API_KEY = " e3506324f0msh4d613bf71ba8e15p16268fjsn5154ece8734c"; 
const API_HOST = "coinranking1.p.rapidapi.com";
const BASE_URL = "https://coinranking1.p.rapidapi.com";


console.log("🔑 API Key:", API_KEY);
console.log("🌍 API URL:", BASE_URL);


if (!API_KEY) {
  throw new Error("🚨 API Key is missing! Please check your .env file.");
}


const cryptoApiHeaders = {
  "X-RapidAPI-Key": API_KEY,
  "X-RapidAPI-Host": API_HOST,
};


const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
  }),
});

// ✅ Export Hooks for Fetching Data
export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
