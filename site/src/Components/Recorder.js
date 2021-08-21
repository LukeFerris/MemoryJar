import vmsg from "vmsg";
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import StopIcon from '@material-ui/icons/Stop';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import { makeStyles } from '@material-ui/styles';

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

export default function Recorder({ onAudioSelected, onCancel, disabled, callToAction = 'Record', cancelable = true }) {

    const classes = useStyles();
    const [isRecording, setIsRecording] = useState(false);

    const record = async () => {

        if (isRecording) {

            const blob = await recorder.stopRecording();
            setIsRecording(false);
            
            onAudioSelected(blob);

        } else {

            try {

                setIsRecording(true);

                await recorder.initAudio();
                await recorder.initWorker();
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
                            {callToAction}
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
                    {cancelable &&
                        <Button
                        variant="contained"
                        disabled={isRecording}
                        className={classes.cancelButton}
                        onClick={onCancel}
                        startIcon={<StopIcon />}
                        >
                            Cancel
                        </Button>
                    }
                </div>
            }
        </React.Fragment>
    );
}