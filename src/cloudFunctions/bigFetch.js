import { LOCAL_CLAN, LOCAL_CLAN_MEMBERS, LOCAL_PLAYER_TAG, BIG_FETCH, LOCAL_CURRENT_WAR } from './cloudConstants';

export default async function BigFetch() {

  var playerTag = '';

  if (localStorage.getItem(LOCAL_PLAYER_TAG)) {
    playerTag = localStorage.getItem(LOCAL_PLAYER_TAG);
    console.log('tag passed from localStorage: ' + playerTag);
  }
  else {
    console.log('no tag was passed');
    throw new Error('no tag was passed');
  }

  async function fetchData() {

    try {
      await fetch(BIG_FETCH, {
        method: "GET",
        headers: {
          playerTag: playerTag,
        }
      }).then(function (result) {
        return result.json();
      })
      .then(function(result) {
        
        console.log(result);

        localStorage.removeItem(LOCAL_CLAN);
        localStorage.setItem(LOCAL_CLAN, JSON.stringify(result.clan));

        localStorage.removeItem(LOCAL_CLAN_MEMBERS);
        let members = [];
        result.clan.memberList.forEach(element => {
          members.push(element);
        });
        localStorage.setItem(LOCAL_CLAN_MEMBERS, JSON.stringify(members));

        localStorage.removeItem(LOCAL_CURRENT_WAR);
        localStorage.setItem(LOCAL_CURRENT_WAR, result.currentWar);
      })
    } catch (error) {
      console.log(error);
    }
  }

  try {
    return await fetchData().then(() => {
      console.log('big fetch completed');
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

