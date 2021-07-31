import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

// material-ui
import { ButtonBase } from '@material-ui/core';

// project imports
import config from './../../../config';
import Leaf from '../../../assets/images/Leaf.png';
import Logo from '../../../assets/images/fullLogo.png';

//-----------------------|| MAIN LOGO ||-----------------------//

const LogoSection = () => {
    return (
        <ButtonBase disableRipple component={Link} to={config.defaultPath}>
            <img src={Logo} />
            {/* <img src={Logo} />   */}
        </ButtonBase>
    );
};

export default LogoSection;
