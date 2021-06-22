import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import GamesIcon from '@material-ui/icons/Games';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { GetAudioStream, StartRecording, StopRecording } from '../Utils/AWSAudio';
import API from '../Utils/API';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        forefront.studio
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  loadingProgress: {
    marginBottom: theme.spacing(1)
  },
  appBar: {
    backgroundColor: '#000'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  score: {
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  scoreRed: {
    backgroundColor: '#e53935'
  },
  scoreGreen: {
    backgroundColor: '#4CAF50'
  },
  scoreOrange: {
    backgroundColor: '#FB8C00'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  sentimentIcon: {
    paddingLeft: theme.spacing(0.5)
  }
}));

export default function AudioList() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [uploadUrl, setUploadUrl] = useState(null);
  const [fileId, setFileId] = useState(null);

  async function StartAudioCapture()
  {
    let recorder = await GetAudioStream(uploadUrl);
    console.log("Recorder set to: " + recorder);
    setRecorder(recorder);
  }

  async function GetUploadUrl()
  {
    API.get('/').then((result) => 
    {
      console.log('result is: ' + JSON.stringify(result.data));
      setUploadUrl(result.data.uploadURL);
      setFileId(result.data.id);
    });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar>
          <GamesIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Memory Jar
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={12}>
            <Button size="small" color="primary" onClick={GetUploadUrl}>
            Get Upload URL
            </Button>
            <Button size="small" color="primary" onClick={StartAudioCapture}>
            Get Audio
            </Button>
            <Button size="small" color="primary" onClick={() => { StartRecording(recorder); }}>
            Start
            </Button>
            <Button size="small" color="primary" onClick={() => { StopRecording(); }}>
            Stop
            </Button>
          </Grid>
          <Grid item key='loading' xs={12} sm={6} md={12}>

            { loading ? <Grid container direction="column" alignItems="center">
              <Grid item>
                <CircularProgress className={classes.loadingProgress} />
              </Grid>
              <Grid item>
              <Typography variant="h6" color="inherit" noWrap>
                Speak wise one..
                </Typography>
              </Grid>
            </Grid> : null }
              
          </Grid>
            
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      { !loading ? <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Memory Jar
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Get in touch: <a href="mailto: escape@forefront.studio" target="new">escape@forefront.studio</a>
        </Typography>
        <Copyright />
      </footer> : null }
      {/* End footer */}
    </React.Fragment>
  );
}