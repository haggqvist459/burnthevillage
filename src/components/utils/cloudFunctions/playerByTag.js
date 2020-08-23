import { localConstants, cloudConstants } from '../constants';

export default async function PlayerByTag() {

  console.log('player fetch init');
  var playerTag = '';

  if (localStorage.getItem(localConstants.PLAYER_TAG)) {
    playerTag = localStorage.getItem(localConstants.PLAYER_TAG);
    console.log('tag passed from localStorage: ' + playerTag);
  }
  else {
    console.log('no tag in session');
    throw new Error('no tag was passed');
  }

  async function getPlayer() {

    try {
      console.log('fetching player.. ');
      await fetch(cloudConstants.PLAYER_BY_TAG, {
        method: "GET",
        headers: {
          playerTag: playerTag,
        }
      }).then(function (result) {
        return result.json();
      })
        .then(function (result) {
          console.log('player fetch complete, results: ');
          console.log(result);

          localStorage.removeItem(localConstants.PLAYER);
          localStorage.setItem(localConstants.PLAYER, JSON.stringify(result));

          localStorage.removeItem(localConstants.CLAN_TAG)
          if (result.clan) {
            let tag = result.clan.tag;
            localStorage.setItem(localConstants.CLAN_TAG, tag.slice(1));
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  try {
    return await getPlayer().then(() => {
      console.log('player fetch exit');
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}