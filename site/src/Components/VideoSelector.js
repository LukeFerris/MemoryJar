import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import StopIcon from '@material-ui/icons/Stop';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import API from '../Utils/API';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    cancelButton: {
        backgroundColor: '#c62828',
        marginTop: 5,
        '&:hover': {
            backgroundColor: '#AC2222'
        }
    },
}));

export default function VideoSelector({ onStartUpload, onFileUploaded, onCancel, fileIdentifier }) {

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
            <div style={{display: "flex", flexDirection: "column"}} >
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
                <Button
                variant="contained"
                className={classes.cancelButton}
                onClick={onCancel}
                startIcon={<StopIcon />}
                >
                    Cancel
                </Button>
            </div>
        </React.Fragment>
    );
}