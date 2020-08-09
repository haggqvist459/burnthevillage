import { PLAYER_BY_TAG, LOCAL_PLAYER_TAG, LOCAL_PLAYER, LOCAL_CLAN, LOCAL_CLAN_TAG } from './cloudConstants';

export default async function PlayerByTag() {

  var playerTag = '';

  if (localStorage.getItem(LOCAL_PLAYER_TAG)) {
    playerTag = localStorage.getItem(LOCAL_PLAYER_TAG);
    console.log('tag passed from localStorage: ' + playerTag);
  }
  else {
    console.log('no tag in session');
    throw new Error('no tag was passed');
  }

  async function getPlayer() {

    try {
      await fetch(PLAYER_BY_TAG, {
        method: "GET",
        headers: {
          playerTag: playerTag,
        }
      }).then(function (result) {
        return result.json();
      })
      .then(function(result) {

        console.log(result);

        localStorage.removeItem(LOCAL_PLAYER);
        localStorage.setItem(LOCAL_PLAYER, JSON.stringify(result));

        localStorage.removeItem(LOCAL_CLAN);
        localStorage.setItem(LOCAL_CLAN, JSON.stringify(result.clan));

        localStorage.removeItem(LOCAL_CLAN_TAG)
        let tag = JSON.stringify(result.clan.tag);
        localStorage.setItem(LOCAL_CLAN_TAG, tag);
      })
    } catch (error) {
      console.log(error);
    }
  }

  try {
    return await getPlayer().then(() => {
      console.log('fetch completed');
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}