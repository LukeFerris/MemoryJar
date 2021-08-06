import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import API from '../Utils/API';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
}));

export default function ImageSelector({ onStartUpload, onFileUploaded, fileIdentifier }) {

    const classes = useStyles();
    const [uploadUrl, setUploadUrl] = useState(null);

    const getUploadUrl = async (mediaItemId) => {
        let uploadUrl = await API.get('/?mediaItemId=' + mediaItemId + '&mediaItemType=1').then((result) => {
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

    const handleImageClick = async (file) => {

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
                startIcon={<AddAPhotoOutlinedIcon />}
            >
                Upload
                <input
                    accept="image/*"
                    type="file"
                    hidden
                    onChange={(e) => handleImageClick(e.target.files)}
                />
            </Button>
        </React.Fragment>
    );
}