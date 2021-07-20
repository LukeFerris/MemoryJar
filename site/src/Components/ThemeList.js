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
        let merged = themeData.map(theme => Object.assign(theme, result.data.records.find(prompt => prompt.prompt_id == theme.theme_id)));
        setUserData(merged);
      }
      else {
        console.log('no results returned');
      }
    };

    fetchThemeData();
    fetchUserData();
  }, [uploadedFiles]);

  const complete = async (memoryId, promptId, audioClipId) => {
    console.log('making registration request to: ' + process.env.REACT_APP_REGISTER_AUDIO_API);

    // now register it
    await axios.put(process.env.REACT_APP_REGISTER_AUDIO_API, {
      "memory_id": memoryId, "audio_clip_id": audioClipId, "prompt_id": promptId
    },
      {
        headers: {
          Authorization: token.jwtToken
        }
      })

    setUploadedFiles(uploadedFiles.concat({
      "memory_id": memoryId, "audio_clip_id": audioClipId, "prompt_id": promptId
    }));
  };

  return (
    <Grid container spacing={4}>
      {themeData.length > 0 ? themeData.map((theme) => (
        <Grid item xs={12}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <ThemeHeader isLoading={false} title={theme.theme_name} />
          </Grid>
          {theme.prompts.length > 0 ? theme.prompts.map((prompt) => (
            <Grid item key={prompt.prompt_id} xs={12} sm={6} md={4}>
              <h5>{prompt.prompt_question}</h5>
              {
                prompt.audio_clip_id ?
                  <AudioItem audioClipId={prompt.audio_clip_id} />
                  :
                  <Recorder prompt_id={prompt.prompt_id} onFileUploaded={complete} />
              }
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