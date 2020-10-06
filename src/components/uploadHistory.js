import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, CardActionArea, CardMedia, GridList, Button, Badge } from '@material-ui/core';
import '../sass/index.scss';
import { DynamicFeed } from '@material-ui/icons';

function UploadHistory({ uploads }) {

    const { uploadHistory } = useSelector(state => state.user);
    const [state, setState] = useState({
        uiState: {
            mounted: false,
            refreshing: false,
            currentList: 'uploadHistory'
        },
        list: {
            content: uploads,
        }
    })

    useEffect(() => {

        if (!state.uiState.mounted) {
            if (uploads) {
                setState({
                    ...state,
                    uiState: {
                        ...state.uiState,
                        mounted: true,
                    },
                    list: {
                        content: uploads,
                    }
                })
                console.log('list content: ', state.list.content);
            }
            else {
                setState({
                    ...state,
                })
            }
        }
        else if (state.uiState.refreshing) {
            setState({
                ...state,
                uiState: {
                    ...state.uiState,
                    refreshing: false,
                }
            })
        }
    }, [state, uploads])

    function toggleMatches({ uploadItem }) {
        console.log('toggling to matches: ', uploadItem)
        if (state.uiState.currentList === 'uploadHistory') {
            setState({
                ...state,
                uiState: {
                    ...state.uiState,
                    refreshing: true,
                    currentList: 'uploadMatches'
                },
                list: {
                    content: uploadItem.uploadMatches
                }
            })
        }
        else if (state.uiState.currentList === 'uploadMatches') {
            setState({
                ...state,
                uiState: {
                    ...state.uiState,
                    refreshing: true,
                    currentList: 'viewMatch'
                },
                list: {
                    content: uploadItem
                }
            })
        }
    }

    function toggleHistory() {
        setState({
            ...state,
            uiState: {
                ...state.uiState,
                refreshing: true,
                currentList: 'uploadHistory'
            },
            list: {
                content: uploadHistory
            }
        })
    }

    function GetCell(item, index) {

        return (
            <Grid>
                {state.uiState.currentList === "uploadHistory" ?
                    <Grid container direction={'row'} justify={'center'}>
                        <Typography>{item.createdAt}</Typography>
                        {item.uploadMatches.length > 0 ?
                            <Badge badgeContent={item.uploadMatches.length} color="secondary">
                                <DynamicFeed color="primary" style={{ paddingLeft: '10' }} />
                            </Badge>
                            :
                            <Badge badgeContent={"0"} color="secondary">
                                <DynamicFeed color="primary" style={{ paddingLeft: '10' }} />
                            </Badge>
                        }

                    </Grid>
                    :
                    null
                }

                {state.uiState.currentList === "uploadMatches" ?
                    <Grid container direction={'row'} justify={'center'}>
                        <Typography>{item.matchPercentage}%</Typography>
                    </Grid>
                    :
                    null
                }

                <Grid>
                {state.uiState.currentList === "uploadMatches" || state.uiState.currentList === "uploadHistory" ? 
                <CardActionArea style={{ margin: '10px' }} onClick={() => toggleMatches({ uploadItem: item })}>
                        <CardMedia
                            style={{ height: '140px' }}
                            component="img"
                            alt={"bucket base"}
                            image={item.imageUrl}
                        />
                    </CardActionArea>
                :
                null
                }
                  
                </Grid>
            </Grid>
        )
    }

    function ViewMatch() {
        return (
            <Grid container direction={'row'} justify={'space-around'}>
                <Grid container direction={'row'} item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <CardActionArea style={{ marginRight: '10px' }}>
                        <CardMedia
                            style={{ maxHeight: '120px' }}
                            component="img"
                            alt={"bucket base"}
                            image={state.list.content.imageUrl}
                        />
                    </CardActionArea>
                </Grid>
                <Grid container direction={'row'} item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Grid container direction={'row'} item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography>matches: {state.list.content.matchPercentage}%</Typography>
                    </Grid>
                    <Typography>YouTube: link placeholder</Typography>
                </Grid>
            </Grid>
        )
    }

    return (

        <Grid>
            {uploadHistory && uploadHistory ?
                <Grid>
                    {state.uiState.currentList === 'uploadHistory' || state.uiState.currentList === 'uploadMatches' ?
                        <GridList cellHeight={120} style={{ height: '50vh', width: '100%', border: '1px', borderColor: 'black' }}>

                            {state.uiState.currentList && state.uiState.currentList === "uploadHistory" ?
                                <Grid container direction={'row'} justify={'center'} item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    {state.list.content && state.list.content.map((item, index) => {
                                        return (
                                            <Grid key={index} container direction={"column"} justify={"space-between"} style={{ marginBottom: '10px', padding: '10px' }} item xs={5} sm={5} md={5} lg={5} xl={5}>
                                                {GetCell(item, index)}
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                                :
                                null
                            }

                            {state.uiState.currentList && state.uiState.currentList === "uploadMatches" ?
                                <Grid container direction={'row'} justify={'center'} item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    {state.list.content && state.list.content.map((item, index) => {
                                        return (
                                            <Grid key={index} container direction={"column"} justify={"space-between"} style={{ marginBottom: '10px', padding: '10px' }} item xs={5} sm={5} md={5} lg={5} xl={5}>
                                                {GetCell(item, index)}
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                                :
                                null
                            }

                        </GridList>
                        :
                        null
                    }

                    {state.uiState.currentList === 'viewMatch' ?
                        <Grid>
                            <ViewMatch />

                        </Grid>
                        :
                        null
                    }

                </Grid>
                :
                <Grid container justify={'center'}>
                    <Typography>no uploads</Typography>
                </Grid>
            }

            {state.uiState.currentList === "uploadMatches" || state.uiState.currentList === "viewMatch" ?
                <Grid container direction={'row'} justify={'center'} style={{ marginTop: '30px' }}>
                    <Button style={{ textTransform: 'none', padding: '0' }} onClick={toggleHistory}>
                        <Typography variant="h6">return to history</Typography>
                    </Button>
                </Grid>
                :
                null
            }
        </Grid>

    )
}


export default UploadHistory;