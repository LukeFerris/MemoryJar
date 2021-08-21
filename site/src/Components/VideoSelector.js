import React from 'react';
import Button from '@material-ui/core/Button';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import StopIcon from '@material-ui/icons/Stop';
import { makeStyles } from '@material-ui/styles';

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

export default function VideoSelector({ onVideoSelected, onCancel }) {

    const classes = useStyles();

    const handleVideoClick = async (file) => {

        onVideoSelected(file[0])
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