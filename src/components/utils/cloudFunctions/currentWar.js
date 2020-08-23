import { localConstants, cloudConstants } from '../constants';
export default async function CurrentWar() {

  console.log('war fetch init');
  var clanTag = '';

  if (localStorage.getItem(localConstants.LOCAL_CLAN_TAG)) {
    clanTag = localStorage.getItem(localConstants.LOCAL_CLAN_TAG);
    console.log('tag passed from localStorage: ' + clanTag);
  }
  else {
    console.log('no tag was passed');
    return;
  }


  async function getClan() {

    try {
      console.log('fetching current war.. ');
      await fetch(cloudConstants.CURRENT_WAR, {
        method: "GET",
        headers: {
          clanTag: clanTag,
        }
      }).then(function (result) {
        return result.json();
      })
        .then(function (result) {
          console.log('current war fetch complete, results: ');
          console.log(result);
          localStorage.removeItem(localConstants.LOCAL_CURRENT_WAR);
          localStorage.setItem(localConstants.LOCAL_CURRENT_WAR, JSON.stringify(result));
        })
    } catch (error) {
      console.log(error);
    }
  }

  try {
    return await getClan().then(() => {
      console.log('war fetch exit');
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}