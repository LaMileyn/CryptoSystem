import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const cryptoHeaders = {
    "x-bingapis-sdk": "true",
    "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
    "x-rapidapi-key" : "9d6f7ff228msh6a00c4e58bfc434p1b4a15jsn01f85cbc80ff"
}
const baseUrl = "https://bing-news-search1.p.rapidapi.com"

const createRequest = url => ({url,headers : cryptoHeaders})

export const cryptoNewsApi = createApi({
    reducerPath : "cryptoNews",
    baseQuery : fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getCryptosNews : builder.query({
            query : ({newsCategory,count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })


})

export const {useGetCryptosNewsQuery} = cryptoNewsApi