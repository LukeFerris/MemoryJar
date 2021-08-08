import vmsg from "vmsg";
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import StopIcon from '@material-ui/icons/Stop';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import API from '../Utils/API';

const recorder = new vmsg.Recorder({
    wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm"
});

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    disabledButton: {
        backgroundColor: '#AAA !important'
    },
    stopButton: {
        backgroundColor: '#c62828',
        marginTop: 5,
        '&:hover': {
            backgroundColor: '#AC2222'
        }
    },
    cancelButton: {
        backgroundColor: '#c62828',
        marginTop: 5,
        '&:hover': {
            backgroundColor: '#AC2222'
        }
    },

}));

export default function Recorder({ onStartUpload, onFileUploaded, onCancel, fileIdentifier, disabled }) {

    const classes = useStyles();
    const [isRecording, setIsRecording] = useState(false);
    const [uploadUrl, setUploadUrl] = useState(null);

    const getUploadUrl = async (mediaItemId) => {
        let uploadUrl = await API.get('/?mediaItemId=' + mediaItemId + '&mediaItemType=0').then((result) => {
            console.log('result is: ' + JSON.stringify(result.data));
            return result.data.uploadURL;
        });
        setUploadUrl(uploadUrl);
    }

    const upload = async (uploadUrl, blob) => {
        console.log('uploading to S3 using uploadUrl: ' + uploadUrl);

        var options = {
            headers: {
                'Content-Type': 'audio/mp3'
            }
        };

        // upload the file
        await axios.put(uploadUrl, blob, options);
    }

    const record = async () => {

        if (isRecording) {

            const blob = await recorder.stopRecording();
            setIsRecording(false);
            onStartUpload();

            await upload(uploadUrl, blob);
            onFileUploaded(fileIdentifier);

        } else {

            try {

                setIsRecording(true);

                await recorder.initAudio();
                await recorder.initWorker();
                await getUploadUrl(fileIdentifier);

                recorder.startRecording();
                
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <React.Fragment>
            {
                <div style={{display: "flex", flexDirection: "column"}} >
                    { !isRecording ?
                        <Button
                            variant="contained"
                            disabled={disabled}
                            classes={{ disabled: classes.disabledButton }}
                            onClick={record}
                            startIcon={<KeyboardVoiceIcon />}
                        >
                            Record
                        </Button>
                        :
                        <Button
                            variant="contained"
                            className={classes.stopButton}
                            classes={{ disabled: classes.disabledButton }}
                            onClick={record}
                            startIcon={<StopIcon />}
                        >
                            Stop
                        </Button>
                    }
                    <Button
                    variant="contained"
                    disabled={isRecording}
                    className={classes.cancelButton}
                    onClick={onCancel}
                    startIcon={<StopIcon />}
                    >
                        Cancel
                    </Button>
                </div>
            }
        </React.Fragment>
    );
}