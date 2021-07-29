import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, imageListItemClasses, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

// project imports
import MainCard from '../ui-component/cards/MainCard';
import TotalIncomeCard from '../ui-component/cards/Skeleton/TotalIncomeCard';
import FsLightbox from 'fslightbox-react';
import Recorder from './Recorder';
import AudioItem from './AudioItem';
import { v4 as uuidv4 } from 'uuid';
import GraphicEqOutlinedIcon from '@material-ui/icons/GraphicEqOutlined';

// assets
import CropOriginalIcon from '@material-ui/icons/CropOriginal';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            borderRadius: '50%',
            top: '-30px',
            right: '-180px'
        }
    },
    content: {
        paddingTop: '10px !important',
        paddingBottom: '10px !important',
        paddingLeft: '0px',
        paddingRight: '0px',
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.dark
    },
    secondary: {
        color: theme.palette.grey[500],
        marginTop: '5px'
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    imageContainer: {
        display: "inline-block",
        position: "relative"
    },
    audioImageIconOverlay: {
        position: 'absolute',
        right: 20,
        top: 5,
        backgroundColor: 'white',
        width: 30,
        height: 30
    }
}));

//-----------------------|| DASHBOARD - TOTAL INCOME LIGHT CARD ||-----------------------//

const ImageList = ({ isLoading, imageItems, onAudioAddedToImage }) => {
    const classes = useStyles();
    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        slide: 1
    });
    const [recordingDisabled, setRecordingDisabled] = useState(false);

    const imageSrc = imageItems.map(image => 'https://' + process.env.REACT_APP_AUDIO_LIBRARY_URL + '/' + image.mediaItemId + '.jpg');

    const handleEndAudioCapture = async (fileIdentifier, relatedMediaItemId) => {
        setRecordingDisabled(true);
        onAudioAddedToImage(fileIdentifier, relatedMediaItemId);
        setLightboxController({
            toggler: false,
            slide: 1
        });
        setRecordingDisabled(false);
    }

    function openLightboxOnSlide(number) {
        setLightboxController({
            toggler: !lightboxController.toggler,
            slide: number
        });
    }

    return (
        <React.Fragment>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <MainCard className={classes.card} contentClass={classes.content} style={{ border: 'none' }}>
                    <List className={classes.padding}>
                        <ListItem alignItems="center" disableGutters className={classes.padding}>
                            <ListItemAvatar>
                                <Avatar variant="rounded" className={classes.avatar}>
                                    <CropOriginalIcon fontSize="inherit" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                sx={{
                                    mt: 0.45,
                                    mb: 0.45
                                }}
                                className={classes.padding}
                                primary={
                                    <div>
                                        {imageItems.map((image, index) =>
                                            <div className={classes.imageContainer}>
                                                <img key={index} onClick={() => openLightboxOnSlide(index + 1)} style={{ width: 100, paddingRight: 15, cursor: 'pointer' }} src={'https://' + process.env.REACT_APP_AUDIO_LIBRARY_URL + '/' + image.mediaItemId + '.jpg'} />
                                                {image.relatedMediaItemId &&
                                                    <Avatar variant="rounded" className={classes.audioImageIconOverlay}>
                                                        <GraphicEqOutlinedIcon />
                                                    </Avatar>
                                                }
                                            </div>)}
                                        < FsLightbox
                                            toggler={lightboxController.toggler}
                                            sources={imageSrc}
                                            key={imageItems.length + imageItems.filter(item => item.relatedMediaItemId).length}
                                            slide={lightboxController.slide}
                                            captions={imageItems.map(image =>
                                                image.relatedMediaItemId ?
                                                    <AudioItem mediaItemId={image.relatedMediaItemId} />
                                                    :
                                                    <Recorder disabled={recordingDisabled} onFileUploaded={(fileIdentifier) => handleEndAudioCapture(fileIdentifier, image.mediaItemId)} fileIdentifier={uuidv4()} />
                                            )}
                                        />
                                    </div>
                                }

                            />
                        </ListItem>
                    </List>
                </MainCard>
            )}
        </React.Fragment>
    );
};

export default ImageList;
