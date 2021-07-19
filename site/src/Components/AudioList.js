import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import AudioItem from '../Components/AudioItem';
import Recorder from '../Components/Recorder';
import useToken from '../Components/useToken';

export default function AudioList() {

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

      if (result.data.records.length > 0) {
        setData(result.data.records.sort((a, b) => (a.created_time_stamp < b.created_time_stamp) ? 1 : -1));
      }
      else {
        console.log('no results returned');
      }

    };

    fetchData();
  }, [uploadedFiles]);

  const complete = async (memoryId, audioClipId) => {
    console.log('making registration request to: ' + process.env.REACT_APP_REGISTER_AUDIO_API);

    // now register it
    await axios.put(process.env.REACT_APP_REGISTER_AUDIO_API, {
      "memory_id": memoryId, "audio_clip_id": audioClipId, "user_id": token.payload.sub
    },
      {
        headers: {
          Authorization: token.jwtToken
        }
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
      {data.length > 0 ? data.map((audioClip) => (
        <Grid item key={audioClip.audio_clip_id} xs={12} sm={6} md={4}>
          <AudioItem audioClipId={audioClip.audio_clip_id} />
        </Grid>
      )) :
        <Grid item xs={12} sm={6} md={12}>
          <p>A lot of nothing here.. add a clip!</p>
        </Grid>}
    </Grid>
  );
}