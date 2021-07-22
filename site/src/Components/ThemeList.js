import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import AudioItem from './AudioItem';
import Recorder from './Recorder';
import useToken from './useToken';
import ThemeHeader from './ThemeHeader';
import PromptHeader from './PromptHeader';
import { v4 as uuidv4 } from 'uuid';

export default function ThemeList() {

  const [themeData, setThemeData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { token } = useToken();

  useEffect(async () => {


    const fetchThemeData = async () => {
      console.log('fetching theme data');
      const result = await axios(
        process.env.REACT_APP_THEME_API_URL,
        {
          headers: {
            Authorization: token.jwtToken
          }
        }
      );

      if (result.data.records.length > 0) {
        let themeDataResult = result.data.records.sort((a, b) => (a.created_time_stamp < b.created_time_stamp) ? 1 : -1);
        setThemeData(themeDataResult);
        return themeDataResult;
      }
      else {
        console.log('no results returned');
        return [];
      }

    };

    const fetchUserData = async () => {
      console.log('fetching user data');
      const result = await axios(
        process.env.REACT_APP_REGISTER_AUDIO_API,
        {
          headers: {
            Authorization: token.jwtToken
          }
        }
      );

      if (result.data.records.length > 0) {
        console.log(result.data.records.length + ' media items returned for this user.');
        setUserData(result.data.records);
        return result.data.records;
      }
      else {
        console.log('no results returned');
        return [];
      }
    };

    const mergeData = async (themeData, userData) => {
      let mergedData = JSON.parse(JSON.stringify(themeData));

      for (let i = 0; i < themeData.length; i++) {
        // for each theme, see if any of the returned items match the prompts
        mergedData[i].prompts.map(prompt => Object.assign(prompt, userData.find(userPrompt => userPrompt.prompt_id == prompt.prompt_id)));
        const completedCount = mergedData[i].prompts.filter((obj) => obj.audio_clip_id).length;
        const totalPrompts = mergedData[i].prompts.length;
        mergedData[i].progress = (completedCount / totalPrompts) * 100;
      }

      setMergedData(mergedData);
    };

    let themeData = await fetchThemeData();
    let userData = await fetchUserData();
    mergeData(themeData, userData);
  }, [uploadedFiles]);

  const complete = async (promptId, mediaItemId) => {

    console.log('making registration request to: ' + process.env.REACT_APP_REGISTER_AUDIO_API);
    console.log('Prompt: ' + promptId);
    // now register it
    await axios.put(process.env.REACT_APP_REGISTER_AUDIO_API, {
      "mediaItemId": mediaItemId, "mediaType": 1, "promptId": promptId
    },
      {
        headers: {
          Authorization: token.jwtToken
        }
      })

    setUploadedFiles(uploadedFiles.concat({
      "media_item_id": mediaItemId, "prompt_id": promptId
    }));
  };

  return (
    <Grid container spacing={4}>
      {mergedData.length > 0 ? mergedData.map((theme) => (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={12}>
            <ThemeHeader isLoading={false} title={theme.theme_name} progress={theme.progress} />
          </Grid>
          <Grid container style={{ marginTop: 2 }} spacing={4}>
            {theme.prompts.length > 0 ? theme.prompts.map((prompt) => (
              <Grid item key={prompt.prompt_id} xs={12} sm={12} md={12}>
                {
                  prompt.audio_clip_id ?
                    // <AudioItem audioClipId={prompt.audio_clip_id} />
                    <PromptHeader question={prompt.prompt_question} />
                    :
                    <Recorder fileIdentifier={uuidv4()} onFileUploaded={(fileIdentifier) => complete(prompt.prompt_id, fileIdentifier)} />
                }
              </Grid>
            )) : <Grid item xs={12} sm={6} md={12}>
              <p>No prompts for this theme..</p>
            </Grid>}
          </Grid>

        </Grid>
      )) :
        <Grid item xs={12} sm={6} md={12}>
          <p>A lot of nothing here.. add a theme!</p>
        </Grid>
      }
    </Grid >
  );
}