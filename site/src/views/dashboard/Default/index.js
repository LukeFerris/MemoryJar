import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import ThemeList from '../../../Components/ThemeList';
import config from '../../../config';

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={config.gridSpacing}>
            <Grid item xs={12}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <ThemeList />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
