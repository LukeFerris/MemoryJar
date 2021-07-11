import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

// material-ui
import { ButtonBase } from '@material-ui/core';

// project imports
import config from './../../../config';
import Logo from './../../../ui-component/Logo';

//-----------------------|| MAIN LOGO ||-----------------------//

const LogoSection = () => {
    return (
        <ButtonBase disableRipple component={Link} to={config.defaultPath}>
            <Typography>Memory Jar</Typography>
        </ButtonBase>
    );
};

export default LogoSection;
