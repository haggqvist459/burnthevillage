import { useState } from 'react'


function PlayerObject (props) {

  const [playerObject, setPlayerObject] = useState();

  async function setPlayerData() {
    fetch('https://australia-southeast1-burnthevillage.cloudfunctions.net/playerByTag/', {
      method: "GET",
      headers: {
        playerTag: props.playerTag,
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setPlayerObject(json);
      })
  }

  try {

    setPlayerData()
    .then(() => {
      return playerObject;
    });

  } catch (error) {
    return error;
  }
}


export default PlayerObject;