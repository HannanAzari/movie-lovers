import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from "./components/Form/Form";
import movie from './components/images/movie5.png'
import useStyles from './styles';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return ( 
        <Container maxidth='lg'>
            <AppBar className={classes.appBar} position="static" color="primary">
                <Typography className={classes.heading} varient='h1' align='center'>MOVIE LOVERS</Typography>
                <img className={classes.image} src={movie} alt='memories' height='60' />

            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container flex='true' justifyContent='space-between' alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>

                </Container>
            </Grow>
        </Container>
     );
}
 
export default App;