import { CLAN_BY_TAG, LOCAL_CLAN, LOCAL_CLAN_TAG, LOCAL_CLAN_MEMBERS } from './cloudConstants';

export default async function ClanByTag() {

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
      await fetch(CLAN_BY_TAG, {
        method: "GET",
        headers: {
          clanTag: clanTag,
        }
      }).then(function (result) {
        return result.json();
      })
      .then(function(result) {
        
        console.log(result);

        localStorage.removeItem(LOCAL_CLAN);
        localStorage.setItem(LOCAL_CLAN, JSON.stringify(result));

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
      console.log('fetch completed');
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

