import React, { useState, useRef } from 'react';
import { useMixpanel } from 'react-mixpanel-browser';
import axios from "axios";

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Grid, Menu, MenuItem, List, ListItem, ListItemAvatar, ListItemText, Divider, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// project imports
import MainCard from '../ui-component/cards/MainCard';
import TotalIncomeCard from '../ui-component/cards/Skeleton/TotalIncomeCard';
import Recorder from './Recorder';
import ImageSelector from './ImageSelector';
import VideoSelector from './VideoSelector';
import MediaItemList from './MediaItemList';
import LinearWithValueLabel from './LineProgressWithLabel';
import { useToken } from './useToken';

// assets
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import AddIcon from '@material-ui/icons/Add';
import MicNoneIcon from '@material-ui/icons/MicNone';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import PermCameraMicOutlinedIcon from '@material-ui/icons/PermCameraMicOutlined';
import CommentIcon from '@material-ui/icons/Comment';
import { v4 as uuidv4 } from 'uuid';

import base64Converter from '../Utils/base64Converter';

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
            background: 'linear-gradient(210.04deg, ' + theme.palette.warning.dark + ' -50.94%, rgba(144, 202, 249, 0) 83.49%)',
            borderRadius: '50%',
            top: '-30px',
            right: '-180px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: 'linear-gradient(140.9deg, ' + theme.palette.warning.dark + ' -14.02%, rgba(144, 202, 249, 0) 70.50%)',
            borderRadius: '50%',
            top: '-160px',
            right: '-130px'
        }
    },
    content: {
        padding: '16px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.dark
    },
    avatarRight: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        backgroundColor: theme.palette.orange.dark,
        color: theme.palette.secondary[200],
        zIndex: 1
    },
    secondary: {
        color: theme.palette.grey[500],
        marginTop: '5px'
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    },
    menuItem: {
        marginRight: '14px',
        fontSize: '1.25rem'
    },
    audioList: {
        paddingTop: 20
    },
    button: {
        color: 'white'
    },
    cancelButton: {
        backgroundColor: '#c62828',
        marginTop: 5
    },
    divider: {
        marginBottom: 10
    }
}));

//-----------------------|| DASHBOARD - TOTAL INCOME LIGHT CARD ||-----------------------//

const Prompt = ({ isLoading, onPromptUpdated, question, onFileUploaded, prompt, openAfterRefreshId, autoImageOpened, onItemDeleted }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [addMode, setAddMode] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const mixpanel = useMixpanel();
    const uploadProgressRef = useRef(uploadProgress);
    const { token } = useToken();
    uploadProgressRef.current = uploadProgress;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
    };

    const handleAudioClick = () => {
        setAddMode(1);
        setAnchorEl(null);

        mixpanel.track('MediaAdd:Start:Audio', {
            'PromptId': prompt.promptId,
        });
    }

    const handleImageClick = () => {
        setAddMode(2);
        setAnchorEl(null);

        mixpanel.track('MediaAdd:Start:Image', {
            'PromptId': prompt.promptId,
        });
    }

    const handleVideoClick = () => {
        setAddMode(4);
        setAnchorEl(null);

        mixpanel.track('MediaAdd:Start:Video', {
            'PromptId': prompt.promptId,
        });
    }

    const handleCancelClick = () => {
        setAddMode(0);
        setAnchorEl(null);
    }

    const handleImageWithNoteClick = () => {
        setAddMode(3);
        setAnchorEl(null);

        mixpanel.track('MediaAdd:Start:ImageWithNote', {
            'PromptId': prompt.promptId,
        });
    }

    const startUploadProgress = () =>
    {
        mixpanel.track('MediaAdd:Upload', {
            'PromptId': prompt.promptId,
        });

        setAddMode(0);
        console.log('starting upload progress');
        setIsUploading(true);
        setUploadProgress(0);
        updateUploadProgress(0);
    }

    const updateUploadProgress = () =>
    {
        setTimeout(() => {
            let newProgress = uploadProgressRef.current + 10;
            setUploadProgress(newProgress);
            if (newProgress < 100) updateUploadProgress();
        }, 2000);
    }

    const handleItemSelected = async (blob, itemType, autoOpen = false, relatedMediaItemId = null) =>
    {
        startUploadProgress();

        // convert to base 64
        let itemBase64 = await base64Converter(blob);
        console.log('Media item converted to base64 string');
    
        // construct mediaItem
        let mediaItem = {
            mediaItemId: uuidv4(),
            promptId: prompt.promptId,
            mediaType: itemType,
            base64Item: itemBase64,
            relatedMediaItemId: relatedMediaItemId
        };

        console.log('Media item assigned id: ' + mediaItem.mediaItemId);

        // post to API
        console.log('Commencing upload, processing and registration');

        await axios.post(process.env.REACT_APP_MEDIAITEM_API, mediaItem,
        {
            headers: {Authorization: token.jwtToken}
        })

        console.log('Upload is complete for mediaItem: ' + mediaItem.mediaItemId);

        setIsUploading(false);
        setUploadProgress(100);

        mixpanel.track('MediaAdd:Complete', {
            'PromptId': prompt.promptId,
            'MediaItemId': mediaItem.mediaItemId,
            'MediaType': mediaItem.mediaItemType
        });

        onPromptUpdated(mediaItem.mediaItemId, autoOpen);
    }

    return (
        <React.Fragment>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <MainCard className={classes.card} contentClass={classes.content}>
                    <Grid container justifyContent="space-between">
                        <Grid item style={{ maxWidth: '60%' }}>
                            <List className={classes.padding}>
                                <ListItem alignItems="center" disableGutters className={classes.padding}>
                                    <ListItemAvatar>
                                        <Avatar variant="rounded" className={classes.avatar}>
                                            <CheckBoxOutlinedIcon fontSize="inherit" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{
                                            mt: 0.45,
                                            mb: 0.45
                                        }}
                                        className={classes.padding}
                                        primary={question}

                                    />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item style={{ paddingTop: 5 }}>
                                {
                                    addMode == 1 && <Recorder onAudioSelected={(blob) => handleItemSelected(blob, 0)} onCancel={handleCancelClick} />
                                }
                                {
                                    addMode == 2 && <ImageSelector onImageSelected={(blob) => handleItemSelected(blob, 1)} onCancel={handleCancelClick} />
                                }
                                {
                                    addMode == 3 && <ImageSelector onImageSelected={(blob) => handleItemSelected(blob, 1, true)} onCancel={handleCancelClick} />
                                }
                                {
                                    addMode == 4 && <VideoSelector onVideoSelected={(blob) => handleItemSelected(blob, 2)} onCancel={handleCancelClick} />
                                }
                                {
                                    (addMode == 0) &&

                                    <Button
                                        variant="contained"
                                        disabled={isUploading}
                                        className={classes.button}
                                        onClick={handleClick}
                                        startIcon={<AddIcon />}
                                    >
                                        Answer
                                    </Button>
                                }
                            <Menu
                                id="menu-earning-card"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                variant="selectedMenu"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                            >
                                <MenuItem onClick={handleAudioClick}>
                                    <MicNoneIcon fontSize="inherit" className={classes.menuItem} /> Voice Note
                                </MenuItem>
                                <MenuItem onClick={handleImageClick}>
                                    <AddAPhotoOutlinedIcon fontSize="inherit" className={classes.menuItem} /> Image
                                </MenuItem>
                                <MenuItem onClick={handleImageWithNoteClick}>
                                    <PermCameraMicOutlinedIcon fontSize="inherit" className={classes.menuItem} /> Voice note over Image
                                </MenuItem>
                                <MenuItem onClick={handleVideoClick}>
                                    <VideocamOutlinedIcon fontSize="inherit" className={classes.menuItem} /> Video
                                </MenuItem>
                                <MenuItem disabled onClick={handleVideoClick}>
                                    <CommentIcon fontSize="inherit" className={classes.menuItem} /> Text
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                    {
                        isUploading ?
                            <Grid container direction="column" spacing="0" className={classes.audioList}>
                                    <Typography>Uploading:</Typography>
                                    <LinearWithValueLabel value={uploadProgress} />
                            </Grid>
                        :
                        prompt.mediaItems.length > 0 &&
                        <Grid container direction="column" spacing="0" className={classes.audioList}>
                            {           
                                    (prompt.mediaItems && prompt.mediaItems.length > 0) &&
                                        <div>
                                            <Divider className={classes.divider} />
                                                <MediaItemList onItemDeleted={onItemDeleted} key={prompt.promptId} onAudioAddedToImage={(blob, relatedMediaItemId) => handleItemSelected(blob, 0, false, relatedMediaItemId)} mediaItems={
                                                    prompt.mediaItems.map(item => ({ mediaItemId: item.mediaItemId, mediaType: item.mediaType, relatedMediaItemId: item.relatedMediaItemId, autoOpen: item.mediaItemId == openAfterRefreshId }))} />
                                        </div>
                    
                            }
                        </Grid>
                    }
                </MainCard>
            )
            }
        </React.Fragment >
    );
};

export default Prompt;
