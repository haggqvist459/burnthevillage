import React, { useEffect } from 'react'
import { Grid, Typography, CardActionArea, CardMedia, GridList } from '@material-ui/core'
import { withRouter } from 'react-router';
import '../sass/index.scss';
import { useSelector, useDispatch } from 'react-redux';
import { localConstants } from './utils/constants';
import { userActions } from '../store/actions';


function UploadHistory({ history }) {

    const { uploadHistory } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {

        let displayName = localStorage.getItem(localConstants.DISPLAY_NAME);
        dispatch(userActions.getUploadHistory(displayName));

    }, [dispatch])

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
            {uploadHistory !== null ?
                <Grid>
                    {uploadHistory && uploadHistory.length > 0 ? 
                        <GridList cellHeight={'auto'} style={{ height: '30vh', width: '100%', border: '1px', borderColor: 'black' }}>
                        <Grid container direction={'row'} justify={'center'} item xs={12} sm={12} md={12} lg={12} xl={12}>
                            {uploadHistory && uploadHistory.map((item, index) => {
                                return (
                                    <Grid key={index} container direction={"column"} justify={"space-between"} style={{ marginBottom: '10px', padding: '10px' }} item xs={5} sm={5} md={5} lg={5} xl={5}>
                                        {GetCell(item, index)}
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </GridList>
                    :
                    <Grid>
                        <Typography>no uploads</Typography>
                    </Grid>
                    }
                </Grid>
                :
                <Grid>
                    <Typography>loading...</Typography>
                </Grid>
            }
        </Grid>
    )
}


export default withRouter(UploadHistory);