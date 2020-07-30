//import clashApi from 'clash-of-clans-api';

// const client = clashApi({
//     token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQzZTUyMTUwLWJjODMtNDMwNi05ZWUxLWE0ZWQyZGJmZjU5OSIsImlhdCI6MTU5NTc3MjI0OCwic3ViIjoiZGV2ZWxvcGVyL2QwNDhlNjI1LTE0MjUtYzU2Yy01NTViLWY1MTIyMmZiNDAyZiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjYwLjI0MS4yMjkuMjM2Il0sInR5cGUiOiJjbGllbnQifV19.NCgihYBBP8e55BpViHcqR5U4ng2OJKTiZVyiPpOY0t_xVQxI-8PI1MH5KQvwpjZh9Y9NpHz-4tSOC0u9p_GjTA"
// });
const fetch = require('node-fetch')

const API_ENDPOINT = 'https://api.clashofclans.com/v1/clans/%2392UY2UCR'

exports.handler = async () => {
  let response
  try {
    response = await fetch(API_ENDPOINT)
    // handle response
    console.log(response.JSON.stringify({data: response}))

  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

  

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response
    })
  }
}