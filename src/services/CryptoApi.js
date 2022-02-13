import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": "9d6f7ff228msh6a00c4e58bfc434p1b4a15jsn01f85cbc80ff"
}
const baseUrl = "https://coinranking1.p.rapidapi.com"
const createRequest = (url) => ({url, headers : cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath : 'cryptoApi',
    baseQuery : fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos : builder.query({
            query : (count) => createRequest(`/coins?limit=${count}`)
        })
    })
})
export const {useGetCryptosQuery} = cryptoApi;