import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from "../../actions/posts";

//GET THE CURRENRT ID

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFiles: ''
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, postData)); 
            
        } else {
            dispatch(createPost(postData));
            
        }
        clear();
        
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFiles: ''
        })
    }

    return ( 
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing Your Post': 'Share Your Love Movie'}</Typography>
            <TextField name="creator" variant="outlined" label='Creator' fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
            <TextField name="title" variant="outlined" label='Name of the movie' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
            <TextField name="message" variant="outlined" label='Director' fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
            <TextField name="tags" variant="outlined" label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
            <div className={classes.fileInput}><FileBase64 multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFiles: base64})} /></div>
            <Button className={classes.buttonSubmit} varient='contained' color='primary' size='large' type='submit' fullWidth>submit</Button>
            <Button  varient='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>

            </form>

        </Paper>
     );
}
 
export default Form;