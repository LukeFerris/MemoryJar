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

export default function VideoSelector({ onFileUploaded, fileIdentifier }) {

    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [uploadUrl, setUploadUrl] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

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

        setIsProcessing(true);
        let uploadUrl = await getUploadUrl(fileIdentifier);
        await upload(uploadUrl, file[0]);
        setIsLoading(false);
        setIsProcessing(false);
        onFileUploaded(fileIdentifier);
    }

    return (
        <React.Fragment>
            {isProcessing ?
                <Button
                    disabled={true}
                    variant="contained"
                    className={classes.button}
                    startIcon={<VideocamOutlinedIcon />}
                >
                    Working..
                </Button>
                :
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
            }
        </React.Fragment>
    );
}