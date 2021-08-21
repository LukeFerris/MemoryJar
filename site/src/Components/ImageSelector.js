import React from 'react';
import Button from '@material-ui/core/Button';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
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

export default function ImageSelector({ onCancel, onImageSelected }) {

    const classes = useStyles();

    const handleImageClick = async (file) => {

        onImageSelected(file[0]);
    }

    return (
        <React.Fragment>
            <div style={{display: "flex", flexDirection: "column"}} >
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