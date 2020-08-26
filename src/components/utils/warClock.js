import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";


const calculateTimeLeft = (startTime) => {
  //let year = new Date().getFullYear();
  const difference = +startTime - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

function Timer(props) {

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.startTime));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(props.startTime));
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, index) => {
    if (!timeLeft[interval]) {
      return;
    }
    timerComponents.push(
      <Typography key={index}>
        {timeLeft[interval]} {interval}{" "}
      </Typography>
    );
  });
  return (
    <Grid>
       {timerComponents.length ? timerComponents : <Typography>preparations over!</Typography>}
    </Grid>
  );
}

export default Timer;