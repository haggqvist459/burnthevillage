import { CLAN_BY_TAG, LOCAL_CLAN, LOCAL_CLAN_TAG, LOCAL_CLAN_MEMBERS } from './cloudConstants';

export default async function ClanByTag() {

  console.log('clan fetch init');
  var clanTag = '';

  //check clanTag in localStorage, throw error if empty
  if (localStorage.getItem(LOCAL_CLAN_TAG)) {
    clanTag = localStorage.getItem(LOCAL_CLAN_TAG);
    console.log('tag passed from localStorage: ' + clanTag);
  }
  else {
    console.log('no tag was passed');
    return;
  }

  //fetch cloudfunction
  async function getClan() {

    try {
      console.log('fetching clan.. ');
      await fetch(CLAN_BY_TAG, {
        method: "GET",
        headers: {
          clanTag: clanTag,
        }
      }).then(function (result) {
        //turn return result from fetch to json
        return result.json();
      })
      .then(function(result) {
        console.log('clan fetch complete, results: ');
        console.log(result);

        //update localstorage clan
        localStorage.removeItem(LOCAL_CLAN);
        localStorage.setItem(LOCAL_CLAN, JSON.stringify(result));

        //update localstorage member array
        localStorage.removeItem(LOCAL_CLAN_MEMBERS);
        let memberList = [];
        result.memberList.forEach(element => {
          memberList.push(element);
        });
        localStorage.setItem(LOCAL_CLAN_MEMBERS, JSON.stringify(memberList));
      })
    } catch (error) {
      console.log(error);
    }
  }

  try {
    return await getClan().then(() => {
      console.log('clan fetch exit');
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

