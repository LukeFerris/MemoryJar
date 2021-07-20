import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
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
                <Grid container spacing={config.gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <ThemeList />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
