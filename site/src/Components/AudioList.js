import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import StopIcon from '@material-ui/icons/Stop';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Card from '@material-ui/core/Card';
import AudioImage from '../Components/Audio.png';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { GetAudioCapture, GetUploadUrl, StartRecording, StopRecording } from '../Utils/AWSAudio';
import axios from 'axios';
import AudioPlayer from 'material-ui-audio-player';

const uuid = require('uuid')

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        MemoryJar
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
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [data, setData] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        process.env.REACT_APP_REGISTER_AUDIO_API,
      );


      setData(result.data.records.sort((a, b) => (a.created_time_stamp < b.created_time_stamp) ? 1 : -1));
    };

    fetchData();
  }, [uploadedFiles]);

  function complete(fileId) {
    setUploadedFiles(uploadedFiles.push(fileId));
  }

  function play(e) {
    console.log(e);
  }

  async function StartAudioCapture() {

    // generate unique id for the audio clip
    const audio_clip_id = uuid.v4()

    // generate a unique id for the memory
    const memory_id = uuid.v4();

    // get the upload url
    let uploadUrl = await GetUploadUrl(audio_clip_id);

    console.log('upload url is: ' + uploadUrl);

    // get the audio recorder
    let recorder = await GetAudioCapture(uploadUrl, memory_id, audio_clip_id, complete);
    console.log("Recorder is set");
    setRecorder(recorder);

    // start the recorder
    await StartRecording(recorder);
    setRecording(true);
  }

  async function Stop() {

    await StopRecording(recorder);
    setRecording(false);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Memory Jar
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={12}>
              {!recording ?
                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  onClick={StartAudioCapture}
                  startIcon={<KeyboardVoiceIcon />}
                >
                  Record New Clip
                </Button>
                :
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={Stop}
                  startIcon={<StopIcon />}
                >
                  Stop Recording
                </Button>}
            </Grid>
            <Grid item key='loading' xs={12} sm={6} md={12}>

              {loading ? <Grid container direction="column" alignItems="center">
                <Grid item>
                  <CircularProgress className={classes.loadingProgress} />
                </Grid>
                <Grid item>
                  <Typography variant="h6" color="inherit" noWrap>
                    Speak wise one..
                  </Typography>
                </Grid>
              </Grid> : null}

            </Grid>
            {data.map((audioClip) => (
              <Grid item key={audioClip.audio_clip_id} xs={12} sm={6} md={4}>
                <Card className={classes.card} id={audioClip.audio_clip_id}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={AudioImage}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>

                    <b>Created: </b> {audioClip.created_time_stamp}<br />
                    <b>Memory:</b> {audioClip.memory_id}<br />
                    <b>Audio Clip:</b> {audioClip.audio_clip_id}

                  </CardContent>
                  <AudioPlayer src={'https://' + process.env.REACT_APP_AUDIO_LIBRARY_URL + '/' + audioClip.audio_clip_id + '.mp4'} />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      {!loading ? <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Memory Jar
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Get in touch: <a href="mailto: escape@forefront.studio" target="new">escape@forefront.studio</a>
        </Typography>
        <Copyright />
      </footer> : null}
      {/* End footer */}
    </React.Fragment>
  );
}