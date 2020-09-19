import React from 'react'
import { Grid, Typography, CardActionArea, CardMedia, GridList } from '@material-ui/core'
import '../sass/index.scss';
function UploadHistory({ uploads }) {
    console.log('props upload, ', uploads)
    function GetCell(item, index) {

        return (
            <Grid>
                <Grid container direction={'row'}>
                    <Typography>{item.createdAt}</Typography>
                </Grid>

                <CardActionArea style={{ maxHeight: '150px' }}>
                    <CardMedia
                        component="img"
                        alt={"bucket base"}
                        image={item.imageUrl}
                    />
                </CardActionArea>

            </Grid>
        )
    }

    return (
        <Grid>
            {uploads !== null ?
                <Grid>
                    {uploads && uploads ? 
                        <GridList cellHeight={'auto'} style={{ height: '30vh', width: '100%', border: '1px', borderColor: 'black' }}>
                        <Grid container direction={'row'} justify={'center'} item xs={12} sm={12} md={12} lg={12} xl={12}>
                            {uploads.map((item, index) => {
                                return (
                                    <Grid key={index} container direction={"column"} justify={"space-between"} style={{ marginBottom: '10px', padding: '10px' }} item xs={5} sm={5} md={5} lg={5} xl={5}>
                                        {GetCell(item, index)}
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </GridList>
                    :
                    <Grid container justify={'center'}>
                        <Typography>no uploads</Typography>
                    </Grid>
                    }
                </Grid>
                :
                <Grid container justify={'center'}>
                    <Typography>loading...</Typography>
                </Grid>
            }
        </Grid>
    )
}


export default UploadHistory;