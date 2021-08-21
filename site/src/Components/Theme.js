import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useMixpanel } from 'react-mixpanel-browser';

// material-ui
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

// project imports
import MainCard from '../ui-component/cards/MainCard';
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

const Theme = ({ isLoading, onThemeUpdated, theme, onItemDeleted, autoImageOpened, openAfterRefreshId, onFileUploaded }) => {
    const classes = useStyles();
    const [isExpanded, setIsExpanded] = useState(false);
    const mixpanel = useMixpanel();
    const expand = () =>
    {
        if (!isExpanded)
        {
            mixpanel.track('Expands Theme', {
                'ThemeId': theme.themeId,
                'ThemeName': theme.themeName
            });
        }

        setIsExpanded(!isExpanded);
    }
    return (
        <React.Fragment>
            {isLoading ? (
                <div>
                    <ThemeHeader key='a' isLoading={true} />
                    <ThemeHeader key='b' isLoading={true} />
                    <ThemeHeader key='c' isLoading={true} />
                </div>
            ) : (
                <MainCard className={classes.card} contentClass={classes.content} style={{ cursor: 'pointer', border: 'none', backgroundColor: 'transparent' }}>
                    <Grid container key={theme.themeId}>
                        <Grid item xs={12}>
                            <ThemeHeader isLoading={isLoading} title={theme.themeName} progress={theme.progress} onExpand={expand} />
                        </Grid>
                        { isExpanded &&
                            <Grid container style={{ marginTop: 2, marginBottom: 30 }} spacing={4}>
                                {theme.prompts && theme.prompts.map((prompt) => (
                                    <Grid item key={prompt.promptId} xs={12} sm={12} md={12}>
                                        <Prompt onPromptUpdated={onThemeUpdated} onItemDeleted={onItemDeleted} autoImageOpened={autoImageOpened} openAfterRefreshId={openAfterRefreshId} isLoading={isLoading} question={prompt.promptQuestion} prompt={prompt} onFileUploaded={(promptId, fileIdentifier, mediaItemType, relatedMediaItemId, autoOpen) => onFileUploaded(promptId, fileIdentifier, mediaItemType, relatedMediaItemId, autoOpen)} />
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
