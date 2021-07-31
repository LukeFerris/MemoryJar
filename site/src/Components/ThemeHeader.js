import PropTypes from 'prop-types';
import React, {useState} from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Grid, Menu, MenuItem, Typography } from '@material-ui/core';
import LinearWithValueLabel from './LineProgressWithLabel';
import Button from '@material-ui/core/Button';

// project imports
import MainCard from '../ui-component/cards/MainCard';
import SkeletonEarningCard from '../ui-component/cards/Skeleton/EarningCard';

// assets
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PictureAsPdfTwoToneIcon from '@material-ui/icons/PictureAsPdfOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
        }
    },
    content: {
        padding: '20px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.secondary[800],
        marginTop: '8px'
    },
    avatarRight: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary[200],
        zIndex: 1
    },
    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px'
    },
    subHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        color: theme.palette.secondary[200]
    },
    avatarCircle: {
        cursor: 'pointer',
        ...theme.typography.smallAvatar,
        backgroundColor: theme.palette.secondary[200],
        color: theme.palette.secondary.dark
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    },
    menuItem: {
        marginRight: '14px',
        fontSize: '1.25rem'
    },
    expandButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'white',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: 'transparent',
        border: 'none',
        color: 'white',
        boxShadow: 'none',
        },
    }
}));

//===========================|| DASHBOARD DEFAULT - EARNING CARD ||===========================//

const ThemeHeader = ({ isLoading, title, progress, onExpand }) => {
    const classes = useStyles();
    const [isExpanded, setIsExpanded] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const expand = (event) => {

        var x = event.clientX, y = event.clientY,
        elementMouseIsOver = document.elementFromPoint(x, y);
        if (elementMouseIsOver.className.toString().indexOf('SVGAnimatedString') == -1)
        {
            if (elementMouseIsOver.className.toString().indexOf('MuiBackdrop-invisible') == -1 && 
            elementMouseIsOver.className.toString().indexOf('MuiMenuItem-root') == -1)
            {
            console.log('not primary menu button click')
                setIsExpanded(!isExpanded);
                onExpand();
            }
        }
    }
    return (
        <React.Fragment>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <MainCard border={false} onClick={expand} className={classes.card} contentClass={classes.content}>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <BookmarkIcon />
                                </Grid>
                                <Grid item>
                                    <Avatar
                                        variant="rounded"
                                        className={classes.avatarRight}
                                        aria-controls="menu-earning-card"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <MoreHorizIcon fontSize="inherit" />
                                    </Avatar>
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
                                        <MenuItem onClick={handleClose}>
                                            <PictureAsPdfTwoToneIcon fontSize="inherit" className={classes.menuItem} /> Download
                                        </MenuItem>
                                    </Menu>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography className={classes.cardHeading}>{title}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <LinearWithValueLabel value={progress} />
                        </Grid>
                        <Grid justifyContent="center" container sx={{ mb: 1.25 }}>
                                    
                            <Button
                                disabled={false}
                                variant="contained"
                                className={classes.expandButton}
                                startIcon={isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            >
                                    { isExpanded ? <span>Collapse</span> : <span>Expand Chapter</span> }
                            </Button>
                                
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </React.Fragment>
    );
};

ThemeHeader.propTypes = {
    isLoading: PropTypes.bool
};

export default ThemeHeader;
