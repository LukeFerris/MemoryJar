import React, { useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Grid, Menu, MenuItem, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// project imports
import MainCard from '../ui-component/cards/MainCard';
import TotalIncomeCard from '../ui-component/cards/Skeleton/TotalIncomeCard';
import Recorder from './Recorder';
import ImageSelector from './ImageSelector';
import VideoSelector from './VideoSelector';
import MediaItemList from './MediaItemList';

// assets
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import AddIcon from '@material-ui/icons/Add';
import MicNoneIcon from '@material-ui/icons/MicNone';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import PermCameraMicOutlinedIcon from '@material-ui/icons/PermCameraMicOutlined';
import CommentIcon from '@material-ui/icons/Comment';
import { v4 as uuidv4 } from 'uuid';

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
    divider: {
        marginBottom: 10
    }
}));

//-----------------------|| DASHBOARD - TOTAL INCOME LIGHT CARD ||-----------------------//

const Prompt = ({ isLoading, addEnabled, question, onFileUploaded, prompt, uploading, openAfterRefreshId, autoImageOpened, onItemDeleted }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [addMode, setAddMode] = useState(0);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
    };

    const handleAudioClick = () => {
        setAddMode(1);
        setAnchorEl(null);
    }

    const handleImageClick = () => {
        setAddMode(2);
        setAnchorEl(null);
    }

    const handleVideoClick = () => {
        setAddMode(4);
        setAnchorEl(null);
    }

    const handleImageWithNoteClick = () => {
        setAddMode(3);
        setAnchorEl(null);
    }

    const autoItemOpened = () => {
        // ask the parent to remove the request as it's now open
        autoImageOpened();
    }

    const handleEndMediaCapture = (prompt, fileIdentifier, mediaType, autoOpen) => {
        setAddMode(0);
        console.log('Autoopen is set to: ' + autoOpen);
        onFileUploaded(prompt.promptId, fileIdentifier, mediaType, null, autoOpen);
    }

    const audioAddedToImage = (prompt, fileIdentifier, relatedMediaItemId) => {
        onFileUploaded(prompt.promptId, fileIdentifier, 0, relatedMediaItemId);
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
                                addMode == 1 && <Recorder fileIdentifier={uuidv4()} onFileUploaded={(fileIdentifier) => handleEndMediaCapture(prompt, fileIdentifier, 0)} />
                            }
                            {
                                addMode == 2 && <ImageSelector fileIdentifier={uuidv4()} onFileUploaded={(fileIdentifier) => handleEndMediaCapture(prompt, fileIdentifier, 1, false)} />
                            }
                            {
                                addMode == 3 && <ImageSelector fileIdentifier={uuidv4()} onFileUploaded={(fileIdentifier) => handleEndMediaCapture(prompt, fileIdentifier, 1, true)} />
                            }
                            {
                                addMode == 4 && <VideoSelector fileIdentifier={uuidv4()} onFileUploaded={(fileIdentifier) => handleEndMediaCapture(prompt, fileIdentifier, 2, false)} />
                            }
                            {
                                (addMode == 0 && !uploading) &&

                                <Button
                                    variant="contained"
                                    disabled={!addEnabled}
                                    className={classes.button}
                                    onClick={handleClick}
                                    startIcon={<AddIcon />}
                                >
                                    Answer
                                </Button>
                            }
                            {
                                (addMode == 0 && uploading) &&

                                <Button
                                    variant="contained"
                                    disabled={true}
                                    className={classes.button}
                                    onClick={handleClick}
                                    startIcon={<AddIcon />}
                                >
                                    Uploading
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
                        prompt.mediaItems.length > 0 &&
                        <Grid container direction="column" spacing="0" className={classes.audioList}>
                            {
                                prompt.mediaItems &&
                                <div>
                                    <Divider className={classes.divider} />
                                    <MediaItemList onItemDeleted={onItemDeleted} onItemAutoOpened={autoItemOpened} key={prompt.promptId} onAudioAddedToImage={(fileIdentifier, relatedMediaItemId) => audioAddedToImage(prompt, fileIdentifier, relatedMediaItemId)} mediaItems={
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
