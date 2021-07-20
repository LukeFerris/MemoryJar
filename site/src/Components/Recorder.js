import vmsg from "vmsg";
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import StopIcon from '@material-ui/icons/Stop';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import API from '../Utils/API';

const uuid = require('uuid')


const recorder = new vmsg.Recorder({
    wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm"
});

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
}));

export default function Recorder({ onFileUploaded, themeId, promptId }) {

    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioClipId, setAudioClipId] = useState(null);
    const [uploadUrl, setUploadUrl] = useState(null);

    const getUploadUrl = async (audioClipId) => {
        console.log('audio clip id is: ' + audioClipId);
        let uploadUrl = await API.get('/?audio_clip_id=' + audioClipId).then((result) => {
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

        setIsLoading(true);

        if (isRecording) {

            const blob = await recorder.stopRecording();
            setIsLoading(false);
            setIsRecording(false);

            await upload(uploadUrl, blob);

            onFileUploaded(themeId, promptId, audioClipId);

        } else {

            try {

                await recorder.initAudio();
                await recorder.initWorker();

                // generate unique id for the audio clip
                const audioClipId = uuid.v4();
                setAudioClipId(audioClipId);

                await getUploadUrl(audioClipId);

                recorder.startRecording();
                setIsLoading(true);
                setIsRecording(true);
            } catch (e) {
                console.error(e);
                setIsLoading(false);
            }
        }
    };

    return (
        <React.Fragment>
            {!isRecording ?
                <Button
                    disabled={isLoading}
                    variant="contained"
                    className={classes.button}
                    onClick={record}
                    startIcon={<KeyboardVoiceIcon />}
                >
                    Record New Clip
                </Button>
                :
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={record}
                    startIcon={<StopIcon />}
                >
                    Stop Recording
                </Button>}
        </React.Fragment>
    );
}