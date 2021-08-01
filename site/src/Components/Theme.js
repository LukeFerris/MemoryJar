import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

// project imports
import MainCard from '../ui-component/cards/MainCard';
import TotalIncomeCard from '../ui-component/cards/Skeleton/TotalIncomeCard';
import ThemeHeader from './ThemeHeader';
import Prompt from './Prompt';

// assets

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

const Theme = ({ isLoading, theme, onItemDeleted, autoImageOpened, openAfterRefreshId, isUploading, onFileUploaded }) => {
    const classes = useStyles();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <React.Fragment>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <MainCard className={classes.card} contentClass={classes.content} style={{ cursor: 'pointer', border: 'none', backgroundColor: 'transparent' }}>
                    <Grid container key={theme.themeId}>
                        <Grid item xs={12}>
                            <ThemeHeader isLoading={isLoading} title={theme.themeName} progress={theme.progress} onExpand={() => setIsExpanded(!isExpanded)} />
                        </Grid>
                        { isExpanded &&
                            <Grid container style={{ marginTop: 2, marginBottom: 30 }} spacing={4}>
                                {theme.prompts && theme.prompts.map((prompt) => (
                                    <Grid item key={prompt.promptId} xs={12} sm={12} md={12}>
                                        <Prompt onItemDeleted={onItemDeleted} autoImageOpened={autoImageOpened} openAfterRefreshId={openAfterRefreshId} uploading={isUploading} isLoading={isLoading} addEnabled="true" question={prompt.promptQuestion} prompt={prompt} onFileUploaded={(promptId, fileIdentifier, mediaItemType, relatedMediaItemId, autoOpen) => onFileUploaded(promptId, fileIdentifier, mediaItemType, relatedMediaItemId, autoOpen)} />
                                    </Grid>
                                ))}
                            </Grid>
                        }
                    </Grid>
                </MainCard>
            )}
        </React.Fragment>
    );
};

export default Theme;
