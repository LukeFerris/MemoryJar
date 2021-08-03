import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, imageListItemClasses, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import IconButton from '@material-ui/core/Button';

// project imports
import MainCard from '../ui-component/cards/MainCard';
import TotalIncomeCard from '../ui-component/cards/Skeleton/TotalIncomeCard';
import FsLightbox from 'fslightbox-react';
import Recorder from './Recorder';
import AudioItem from './AudioItem';
import { v4 as uuidv4 } from 'uuid';
import GraphicEqOutlinedIcon from '@material-ui/icons/GraphicEqOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

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

const ImageList = ({ isLoading, imageItems, onAudioAddedToImage, onItemAutoOpened, onItemDeleted }) => {
    const classes = useStyles();
    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        slide: 1
    });
    const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

    useEffect(async () => {

        // look for items that might need autoopening
        let index = imageItems.findIndex(image => image.autoOpen);
        if (index >= 0) {

            // an image to be auto opened exists
            setLightboxController({
                toggler: !lightboxController.toggler,
                slide: index + 1
            })

            onItemAutoOpened();
        }

    }, [imageItems]);

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

    const onDeleted = (mediaItemId) =>
    {
        if (window.confirm("Are you sure you want to delete this item?"))
        {
        onItemDeleted(mediaItemId);
        setIsDeleteEnabled(false);
        };
    }

    return (
        <React.Fragment>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <MainCard className={classes.card} contentClass={classes.content} style={{ border: 'none' }}>
                    <div>
                                        {imageItems.map((image, index) =>
                                            <div key={index} className={classes.imageContainer}>
                                                <img key={index} onClick={() => openLightboxOnSlide(index + 1)} style={{ borderRadius: '10%', width: 100, marginRight: 15, cursor: 'pointer' }} src={'https://' + process.env.REACT_APP_AUDIO_LIBRARY_URL + '/' + image.mediaItemId + '.jpg'} />
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
                                            disableThumbs={true}
                                            captions={imageItems.map(image =>
                                                image.relatedMediaItemId ?
                                                    <AudioItem onItemDeleted={onItemDeleted} mediaItemId={image.relatedMediaItemId} />
                                                    :
                                                    <div>
                                                    
                                                    <Recorder disabled={recordingDisabled} onFileUploaded={(fileIdentifier) => handleEndAudioCapture(fileIdentifier, image.mediaItemId)} fileIdentifier={uuidv4()} />
                                                    <IconButton disabled={!isDeleteEnabled} color="secondary">
                                                        <DeleteIcon onClick={() => onDeleted(image.mediaItemId)} />
                                                    </IconButton>
                                                    </div>
                                            )}
                                        />
                                    </div>
                </MainCard>
            )}
        </React.Fragment>
    );
};

export default ImageList;
