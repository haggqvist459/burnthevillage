import { LOCAL_CLAN_TAG, CURRENT_WAR, LOCAL_CURRENT_WAR } from './cloudConstants';

export default async function CurrentWar() {

    var clanTag = '';

    if (localStorage.getItem(LOCAL_CLAN_TAG)) {
        clanTag = JSON.parse(localStorage.getItem(LOCAL_CLAN_TAG)).slice(1);
        console.log('tag passed from localStorage: ' + clanTag);
    }
    else {
        console.log('no tag was passed');
        throw new Error('no tag was passed');
    }


    async function getClan() {

        try {
          await fetch(CURRENT_WAR, {
            method: "GET",
            headers: {
              clanTag: clanTag,
            }
          }).then(function (result) {
            return result.json();
          })
          .then(function(result) {            
            console.log(result);
            localStorage.removeItem(LOCAL_CURRENT_WAR);
            localStorage.setItem(LOCAL_CURRENT_WAR, JSON.stringify(result));
          })
        } catch (error) {
          console.log(error);
        }
      }
    
      try {
        return await getClan().then(() => {
          console.log('fetch completed');
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
}