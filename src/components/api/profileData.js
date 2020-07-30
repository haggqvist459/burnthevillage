import React from 'react';
import clashApi from 'clash-of-clans-api';

const client = clashApi({
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQzZTUyMTUwLWJjODMtNDMwNi05ZWUxLWE0ZWQyZGJmZjU5OSIsImlhdCI6MTU5NTc3MjI0OCwic3ViIjoiZGV2ZWxvcGVyL2QwNDhlNjI1LTE0MjUtYzU2Yy01NTViLWY1MTIyMmZiNDAyZiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjYwLjI0MS4yMjkuMjM2Il0sInR5cGUiOiJjbGllbnQifV19.NCgihYBBP8e55BpViHcqR5U4ng2OJKTiZVyiPpOY0t_xVQxI-8PI1MH5KQvwpjZh9Y9NpHz-4tSOC0u9p_GjTA"
  });

function getData() {
    //fetch here
    let playerTag = "LVPQ2R8R2"
    client
    .fetch("https://api.clashofclans.com/v1/players/" + playerTag)
    .then(response => response.json())
    .then(data => console.log(data))

    // fetch("https://api.clashofclans.com/v1/players/" + playerTag)
    //     .then(res => res.json())
    //     .then(
    //         (result) => {
    //             console.log(result);
    //             return result;
    //         },
    //         // Note: it's important to handle errors here
    //         // instead of a catch() block so that we don't swallow
    //         // exceptions from actual bugs in components.
    //         (error) => {
    //             console.log("error");
    //         }
    //     )

}

export const ProfileData = () => {

    let profile = getData();

    if (profile != null) {
        return profile;
    }
    else {
        return "error";
    }
}