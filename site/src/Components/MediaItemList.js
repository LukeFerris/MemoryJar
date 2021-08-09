import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar } from '@material-ui/core';
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
import AudioIcon from '../assets/images/audioIcon.png';
import VideoIcon from '../assets/images/videoIcon.png';

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
    mediaContainer: {
        height: '12vh',
        flexGrow: 1,
        position: 'relative',
        // minWidth: '10vh'
        maxWidth: '14vh',
        width: '12vh'
    },
    mediaItem: {
        height: '100%',
        objectFit: 'cover',
        maxWidth: '100%',
        minWidth: '100%',
        verticalAlign: 'bottom',
        borderRadius: '10%',
        padding: 5
    },
    audioImageIconOverlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        backgroundColor: 'white',
        width: 40,
        height: 40
    },
    mediaList: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyleType: 'none',
        paddingLeft: 0,
        marginLeft: 0
    },
    audioItem: {
        border: 'solid 1px',
        minHeight: '95%',
        borderRadius: '10%',
        padding: 10
    }
}));

//-----------------------|| DASHBOARD - TOTAL INCOME LIGHT CARD ||-----------------------//

const MediaItemList = ({ isLoading, mediaItems, onAudioAddedToImage, onItemAutoOpened, onItemDeleted }) => {
    const classes = useStyles();
    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        slide: 1
    });
    const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

    useEffect(async () => {

        // look for items that might need autoopening
        let index = mediaItems.findIndex(image => image.autoOpen);
        if (index >= 0) {

            // an image to be auto opened exists
            setLightboxController({
                toggler: !lightboxController.toggler,
                slide: index + 1
            })

            onItemAutoOpened();
        }

    }, [mediaItems]);

    const [recordingDisabled, setRecordingDisabled] = useState(false);
    const getFileType = (mediaType) => 
    {
        if (mediaType == 0) return '.mp4';
        if (mediaType == 1) return '.jpg';
        return '.mp4';
    }
    
    const imageSrc = mediaItems.map(item => 
        item.mediaType == 1 ? 'https://' + process.env.REACT_APP_AUDIO_LIBRARY_URL + '/' + item.mediaItemId + getFileType(item.mediaType)
        :
        item.mediaType == 0 ?
        <audio src={'https://' + process.env.REACT_APP_AUDIO_LIBRARY_URL + '/' + item.mediaItemId + '.mp4'} controls />
        :
        <video src={'https://' + process.env.REACT_APP_AUDIO_LIBRARY_URL + '/' + item.mediaItemId + '.mp4'} controls />
        );

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
                    <ul className={classes.mediaList}>
                    {mediaItems.map((item, index) =>
                        item.mediaType == 1 ?
                        <li key={index} className={classes.mediaContainer}>
                            <img onClick={() => openLightboxOnSlide(index+1)} className={classes.mediaItem} src={'https://' + process.env.REACT_APP_AUDIO_LIBRARY_URL + '/' + item.mediaItemId + '.jpg'} />
                            {item.relatedMediaItemId &&
                                <Avatar variant="rounded" className={classes.audioImageIconOverlay}>
                                    <GraphicEqOutlinedIcon />
                                </Avatar>
                             }
                        </li>
                        :
                        (item.mediaType == 0 && item.relatedMediaItemId == null) ?
                        <li key={index} className={classes.mediaContainer}>
                            <img onClick={() => openLightboxOnSlide(index+1)} src={AudioIcon} className={classes.mediaItem} />
                        </li>
                        :
                        item.mediaType == 2 &&
                        <li key={index} className={classes.mediaContainer}>
                            <img onClick={() => openLightboxOnSlide(index+1)} src={VideoIcon} className={classes.mediaItem} />
                        </li>
                    )}
                    < FsLightbox
                        toggler={lightboxController.toggler}
                        sources={imageSrc}
                        key={mediaItems.length + mediaItems.filter(item => item.relatedMediaItemId).length}
                        slide={lightboxController.slide}
                        disableThumbs={true}
                        captions={mediaItems.map(image =>
                            image.relatedMediaItemId ?
                                <AudioItem onItemDeleted={onItemDeleted} mediaItemId={image.relatedMediaItemId} />
                                :
                                <div>
                                    {image.mediaType != 0 && <Recorder callToAction='Add a voice note' cancelable={false} disabled={recordingDisabled} onFileUploaded={(fileIdentifier) => handleEndAudioCapture(fileIdentifier, image.mediaItemId)} fileIdentifier={uuidv4()} />}
                                    <IconButton disabled={!isDeleteEnabled} color="secondary">
                                        <DeleteIcon onClick={() => onDeleted(image.mediaItemId)} />
                                    </IconButton>
                                </div>
                        )}
                    />
                </ul>
                </MainCard>
            )}
        </React.Fragment>
    );
};

export default MediaItemList;
