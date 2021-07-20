import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import AudioItem from './AudioItem';
import Recorder from './Recorder';
import useToken from './useToken';
import ThemeHeader from './ThemeHeader';

export default function ThemeList() {

  const [themeData, setThemeData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { token } = useToken();

  useEffect(() => {

    const fetchThemeData = async () => {
      const result = await axios(
        process.env.REACT_APP_THEME_API_URL,
        {
          headers: {
            Authorization: token.jwtToken
          }
        }
      );

      if (result.data.records.length > 0) {
        setThemeData(result.data.records.sort((a, b) => (a.created_time_stamp < b.created_time_stamp) ? 1 : -1));
      }
      else {
        console.log('no results returned');
      }

    };

    const fetchUserData = async () => {
      const result = await axios(
        process.env.REACT_APP_REGISTER_AUDIO_API,
        {
          headers: {
            Authorization: token.jwtToken
          }
        }
      );

      if (result.data.records.length > 0) {
        setUserData(result.data.records);
      }
      else {
        console.log('no results returned');
      }
    };

    fetchThemeData();
    fetchUserData();
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
      {themeData.length > 0 ? themeData.map((theme) => (
        <Grid item xs={12}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <ThemeHeader isLoading={false} />
          </Grid>
          {theme.prompts.length > 0 ? theme.prompts.map((prompt) => (
            <Grid item key={prompt.prompt_id} xs={12} sm={6} md={4}>
              {/* <AudioItem audioClipId={audioClip.audio_clip_id} /> */}
              {prompt.prompt_question}
            </Grid>
          )) : <Grid item xs={12} sm={6} md={12}>
            <p>No prompts for this theme..</p>
          </Grid>}

        </Grid>
      )) :
        <Grid item xs={12} sm={6} md={12}>
          <p>A lot of nothing here.. add a theme!</p>
        </Grid>}
    </Grid>
  );
}