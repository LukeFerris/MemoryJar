import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import API from '../Utils/API';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
}));

export default function VideoSelector({ onStartUpload, onFileUploaded, fileIdentifier }) {

    const classes = useStyles();
    const [uploadUrl, setUploadUrl] = useState(null);

    const getUploadUrl = async (mediaItemId) => {
        let uploadUrl = await API.get('/?mediaItemId=' + mediaItemId + '&mediaItemType=2').then((result) => {
            console.log('result is: ' + JSON.stringify(result.data));
            return result.data.uploadURL;
        });
        setUploadUrl(uploadUrl);
        return uploadUrl;
    }

    const upload = async (uploadUrl, blob) => {
        console.log('uploading to S3 using uploadUrl: ' + uploadUrl);

        var options = {
            headers: {
                'Content-Type': 'image/jpeg'
            }
        };

        // upload the file
        await axios.put(uploadUrl, blob, options);
    }

    const handleVideoClick = async (file) => {

        onStartUpload();
        let uploadUrl = await getUploadUrl(fileIdentifier);
        await upload(uploadUrl, file[0]);
        onFileUploaded(fileIdentifier);
    }

    return (
        <React.Fragment>
            <Button
                variant="contained"
                component="label"
                className={classes.button}
                startIcon={<VideocamOutlinedIcon />}
            >
                Upload
                <input
                    accept="video/*"
                    type="file"
                    hidden
                    onChange={(e) => handleVideoClick(e.target.files)}
                />
            </Button>
        </React.Fragment>
    );
}