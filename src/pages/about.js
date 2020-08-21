import React from 'react';
import { withRouter } from 'react-router';
import '../sass/index.scss';
import { Header, Footer } from '../components';
import { Grid, Typography, CardMedia, Card, CardContent, IconButton, makeStyles, CardActions } from '@material-ui/core';
import { LinkedIn, GitHub } from '@material-ui/icons';
import Tim from '../assets/images/about/abouttim2.png';
import Max from '../assets/images/about/aboutmax2.png';
import Alicia from '../assets/images/about/aboutalicia.png';

const useStyles = makeStyles({
  root: {
    height: '20vh',
    maxWidth: '80vmin',
    margin: 10,
    flexGrow: 1,
  },
  card_content: {
    padding: 0,
    marginTop: 5,
  },
  media: {
    height: '100%',
    flexGrow: 1,
    paddingTop: '2vh',
  },
});

const About = ({ history }) => {

  const classes = useStyles();

  return (

    <Grid className="wrapper">

      <Header />

      <Grid className="content">

        <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
          <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
            <Typography variant="h2">About us</Typography>

            {/* tim */}
            <Card className={classes.root}>

              <Grid container direction={"row"}>
                <Grid item xs={4} sm={6} m={6} l={6} xl={6}>
                  <CardMedia
                    component="img"
                    alt={"portrait"}
                    image={Tim}
                  />
                </Grid>

                <Grid item xs={8} sm={6} m={6} l={6} xl={6} className="about_card_column__to_row">
                  <Grid item m={10} l={6} >
                    <CardContent className={classes.card_content} style={{ padding: '0' }}>
                      <Typography variant="h6">Tim Häggqvist Luotomäki<br></br>developer</Typography>
                    </CardContent>
                  </Grid>
                  <Grid item m={4} l={8}>
                    <CardActions className="about_card_column__icons_to_col">
                      <IconButton>
                        <LinkedIn />
                      </IconButton>
                      <IconButton style={{ marginLeft: '0' }}>
                        <GitHub />
                      </IconButton>
                    </CardActions>
                  </Grid>
                </Grid>
              </Grid>

            </Card>

            {/* max */}
            <Card className={classes.root}>

              <Grid container direction={"row"}>
                <Grid item xs={4} sm={6} m={6} l={6} xl={6}>
                  <CardMedia
                    component="img"
                    alt={"portrait"}
                    image={Max}
                  />
                </Grid>

                <Grid item xs={8} sm={6} m={6} l={6} xl={6} className="about_card_column__to_row">
                  <Grid item m={10} l={6} >
                    <CardContent className={classes.card_content} style={{ padding: '0' }}>
                      <Typography variant="h6">Max Häggqvist Luotomäki<br></br>developer</Typography>
                    </CardContent>
                  </Grid>
                  <Grid item m={4} l={8}>
                    <CardActions className="about_card_column__icons_to_col">
                      <IconButton>
                        <LinkedIn />
                      </IconButton>
                      <IconButton style={{ marginLeft: '0' }}>
                        <GitHub />
                      </IconButton>
                    </CardActions>
                  </Grid>
                </Grid>
              </Grid>

            </Card>

            {/* alicia */}
            <Card className={classes.root}>

              <Grid container direction={"row"}>
                <Grid item xs={4} sm={6} m={6} l={6} xl={6}>
                  <CardMedia
                    component="img"
                    alt={"portrait"}
                    image={Alicia}
                  />
                </Grid>

                <Grid item xs={8} sm={6} m={6} l={6} xl={6} className="about_card_column__to_row">
                  <Grid item m={10} l={6} >
                    <CardContent className={classes.card_content} style={{ padding: '0' }}>
                      <Typography variant="h6">Alicia Häggqvist Luotomäki<br></br>designer</Typography>
                    </CardContent>
                  </Grid>
                  <Grid item m={4} l={8}>
                    <CardActions className="about_card_column__icons_to_col">
                      <IconButton>
                        <LinkedIn />
                      </IconButton>
                      <IconButton style={{ marginLeft: '0' }}>
                        <GitHub />
                      </IconButton>
                    </CardActions>
                  </Grid>
                </Grid>
              </Grid>

            </Card>

          </Grid>
        </Grid>
      </Grid>

      <Footer />

    </Grid>

  )
}

export default withRouter(About);

