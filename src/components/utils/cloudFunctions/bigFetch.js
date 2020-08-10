import { local_constants, gcloud_constants } from '../constants';

export default async function BigFetch() {

  var playerTag = '';

  if (localStorage.getItem(local_constants.LOCAL_PLAYER_TAG)) {
    playerTag = localStorage.getItem(local_constants.LOCAL_PLAYER_TAG);
    console.log('tag passed from localStorage: ' + playerTag);
  }
  else {
    console.log('no tag was passed');
    throw new Error('no tag was passed');
  }

  async function fetchData() {

    try {
      await fetch(gcloud_constants.BIG_FETCH, {
        method: "GET",
        headers: {
          playerTag: playerTag,
        }
      }).then(function (result) {
        return result.json();
      })
      .then(function(result) {
        
        console.log(result);

        localStorage.removeItem(local_constants.LOCAL_CLAN);
        localStorage.setItem(local_constants.LOCAL_CLAN, JSON.stringify(result.clan));

        localStorage.removeItem(local_constants.LOCAL_CLAN_MEMBERS);
        let members = [];
        result.clan.memberList.forEach(element => {
          members.push(element);
        });
        localStorage.setItem(local_constants.LOCAL_CLAN_MEMBERS, JSON.stringify(members));

        localStorage.removeItem(local_constants.LOCAL_CURRENT_WAR);
        localStorage.setItem(local_constants.LOCAL_CURRENT_WAR, result.currentWar);
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

