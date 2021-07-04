import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import AudioImage from '../Components/Audio.png';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import Recorder from '../Components/Recorder';

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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  }
}));

export default function AudioList() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
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

  const complete = async (memoryId, audioClipId) => {
    console.log('making registration request to: ' + process.env.REACT_APP_REGISTER_AUDIO_API);

    // now register it
    await axios.put(process.env.REACT_APP_REGISTER_AUDIO_API, {
      "memory_id": memoryId, "audio_clip_id": audioClipId
    })

    setUploadedFiles(uploadedFiles.concat({
      "memory_id": memoryId, "audio_clip_id": audioClipId
    }));
  };

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
              <Recorder onFileUploaded={complete} />
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

                    <p>
                      <b>Created: </b> {audioClip.created_time_stamp}<br />
                      <b>Memory:</b> {audioClip.memory_id}<br />
                      <b>Audio Clip:</b> {audioClip.audio_clip_id}<br />
                    </p>

                    <audio src={'https://' + process.env.REACT_APP_AUDIO_LIBRARY_URL + '/' + audioClip.audio_clip_id + '.mp4'} controls />
                  </CardContent>
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