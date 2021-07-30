import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import IconButton from '@material-ui/core/Button';

// project imports
import MainCard from '../ui-component/cards/MainCard';
import TotalIncomeCard from '../ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import DeleteIcon from '@material-ui/icons/Delete';

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
            // background: 'linear-gradient(210.04deg, ' + theme.palette.warning.dark + ' -50.94%, rgba(144, 202, 249, 0) 83.49%)',
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
    }
}));

//-----------------------|| DASHBOARD - TOTAL INCOME LIGHT CARD ||-----------------------//

const AudioItem = ({ isLoading, mediaItemId, onItemDeleted }) => {
    const classes = useStyles();
    const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

    const onDeleted = () => {
        if (window.confirm("Are you sure you want to delete this item?"))
        {
            onItemDeleted(mediaItemId);
            setIsDeleteEnabled(false);
        }
    }

    return (
        <React.Fragment>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <MainCard className={classes.card} contentClass={classes.content} style={{ border: 'none', backgroundColor: 'transparent' }}>
                    <List className={classes.padding}>
                        <ListItem alignItems="center" disableGutters className={classes.padding}>
                            <ListItemAvatar>
                                <Avatar variant="rounded" className={classes.avatar}>
                                    <GraphicEqIcon fontSize="inherit" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                sx={{
                                    mt: 0.45,
                                    mb: 0.45
                                }}
                                className={classes.padding}
                                primary={
                                    <div style={{display:'flex'}}>
                                <audio style={{ width: '100%', flexGrow: 1, paddingRight:0 }} src={'https://' + process.env.REACT_APP_AUDIO_LIBRARY_URL + '/' + mediaItemId + '.mp4'} controls />
                                {/* <IconButton disabled={!isDeleteEnabled} color="secondary" style={{padding:0, margin:0}}>
                                    <DeleteIcon onClick={onDeleted} />
                                </IconButton> */}
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

export default AudioItem;
