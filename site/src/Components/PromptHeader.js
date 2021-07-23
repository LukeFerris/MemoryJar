import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Grid, Menu, MenuItem, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// project imports
import MainCard from '../ui-component/cards/MainCard';
import TotalIncomeCard from '../ui-component/cards/Skeleton/TotalIncomeCard';
import Recorder from './Recorder';

// assets
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import PictureAsPdfTwoToneIcon from '@material-ui/icons/PictureAsPdfOutlined';
import AddIcon from '@material-ui/icons/Add';
import MicNoneIcon from '@material-ui/icons/MicNone';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import PermCameraMicOutlinedIcon from '@material-ui/icons/PermCameraMicOutlined';
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
    }
}));

//-----------------------|| DASHBOARD - TOTAL INCOME LIGHT CARD ||-----------------------//

const PromptHeader = ({ isLoading, addEnabled, question, onFileUploaded, promptId }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [recordingEnabled, setRecordingEnabled] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
    };

    const handleAudioClick = () => {
        setRecordingEnabled(true);
        setAnchorEl(null);
    }

    const handleEndAudioCapture = (promptId, fileIdentifier) => {
        setRecordingEnabled(false);
        onFileUploaded(promptId, fileIdentifier);
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
                                recordingEnabled ?
                                    <Recorder fileIdentifier={uuidv4()} onFileUploaded={(fileIdentifier) => handleEndAudioCapture(promptId, fileIdentifier)} />
                                    :
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
                                <MenuItem disabled onClick={handleClose}>
                                    <AddAPhotoOutlinedIcon fontSize="inherit" className={classes.menuItem} /> Image
                                </MenuItem>
                                <MenuItem disabled onClick={handleClose}>
                                    <PermCameraMicOutlinedIcon fontSize="inherit" className={classes.menuItem} /> Voice note over Image
                                </MenuItem>
                                <MenuItem disabled onClick={handleClose}>
                                    <VideocamOutlinedIcon fontSize="inherit" className={classes.menuItem} /> Video
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </MainCard>
            )
            }
        </React.Fragment >
    );
};

export default PromptHeader;
