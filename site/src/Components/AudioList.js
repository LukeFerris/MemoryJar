import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import AudioItem from '../Components/AudioItem';
import Recorder from '../Components/Recorder';
import useToken from '../Components/useToken';

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

  const { token } = useToken();

  useEffect(() => {

    const fetchData = async () => {
      const result = await axios(
        process.env.REACT_APP_REGISTER_AUDIO_API,
        {
          headers: {
            Authorization: token.jwtToken
          }
        }
      );

      setData(result.data.records.sort((a, b) => (a.created_time_stamp < b.created_time_stamp) ? 1 : -1));
    };

    fetchData();
  }, [uploadedFiles]);

  const complete = async (memoryId, audioClipId) => {
    console.log('making registration request to: ' + process.env.REACT_APP_REGISTER_AUDIO_API);

    // now register it
    await axios.put(process.env.REACT_APP_REGISTER_AUDIO_API, {
      "memory_id": memoryId, "audio_clip_id": audioClipId, "user_id": token.payload.sub
    })

    setUploadedFiles(uploadedFiles.concat({
      "memory_id": memoryId, "audio_clip_id": audioClipId, "user_id": token.payload.sub
    }));
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={12}>
        <Recorder onFileUploaded={complete} />
      </Grid>
      {data.map((audioClip) => (
        <Grid item key={audioClip.audio_clip_id} xs={12} sm={6} md={4}>
          <AudioItem audioClipId={audioClip.audio_clip_id} />
        </Grid>
      ))}
    </Grid>
  );
}