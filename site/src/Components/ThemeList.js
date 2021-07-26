import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Recorder from './Recorder';
import useToken from './useToken';
import ThemeHeader from './ThemeHeader';
import Prompt from './Prompt';
import { v4 as uuidv4 } from 'uuid';

export default function ThemeList() {

  const [themeData, setThemeData] = useState([{ "theme_id": "51a39d89-5d86-477a-93f4-7a9fddb52975", "theme_name": "School Years", "prompts": [{ "prompt_id": "c0b8aead-637a-46fa-9603-fa728ed37ecf", "theme_id": "51a39d89-5d86-477a-93f4-7a9fddb52975", "prompt_question": "What was your first school like?", "created_time_stamp": "2021-07-19T12:27:24.751905" }, { "prompt_id": "6005de42-ee70-45a5-8434-89a997d9a497", "theme_id": "51a39d89-5d86-477a-93f4-7a9fddb52975", "prompt_question": "Can you remember your first day?", "created_time_stamp": "2021-07-19T12:27:24.909986" }, { "prompt_id": "a1377c10-7be2-484d-ad0b-af7dd274acef", "theme_id": "51a39d89-5d86-477a-93f4-7a9fddb52975", "prompt_question": "Did anyone bully you?", "created_time_stamp": "2021-07-19T12:27:25.115664" }, { "prompt_id": "d7b5a477-a477-4be3-91df-6581ba5495bb", "theme_id": "51a39d89-5d86-477a-93f4-7a9fddb52975", "prompt_question": "What were the teachers like?", "created_time_stamp": "2021-07-19T12:27:25.334788" }] }, { "theme_id": "144f22dd-d01e-4ad1-aa15-7628b9297daa", "theme_name": "Children", "prompts": [{ "prompt_id": "5342b2d4-80f1-461b-9b5f-cf8e9d72b219", "theme_id": "144f22dd-d01e-4ad1-aa15-7628b9297daa", "prompt_question": "What was it like the day your child was born?", "created_time_stamp": "2021-07-19T12:27:25.545259" }, { "prompt_id": "64b5c787-061d-416b-ae92-4655e0233db3", "theme_id": "144f22dd-d01e-4ad1-aa15-7628b9297daa", "prompt_question": "How did you get to the hospital?", "created_time_stamp": "2021-07-19T12:27:25.741267" }] }]);
  const [userData, setUserData] = useState([]);
  const [mergedData, setMergedData] = useState([{
    "theme_id": "144f22dd-d01e-4ad1-aa15-7628b9297daa",
    "theme_name": "Children",
    "prompts": [
      {
        "prompt_id": "5342b2d4-80f1-461b-9b5f-cf8e9d72b219",
        "theme_id": "144f22dd-d01e-4ad1-aa15-7628b9297daa",
        "prompt_question": "What was it like the day your child was born?",
        "created_time_stamp": "2021-07-19T12:27:25.545259",
        "mediaItems": [
          {
            "audio_clip_id": "58cbe2fb-0642-4e45-9750-78492c2ceac2",
            "created_time_stamp": "2021-07-22 16:41:01.128013",
            "memory_id": "57d0a1ac-23b3-438f-8754-9e4655037b75",
            "user_id": "28201b76-9c2b-406e-a755-7d0c9dbc41fe",
            "prompt_id": "5342b2d4-80f1-461b-9b5f-cf8e9d72b219"
          },
          {
            "audio_clip_id": "05879c90-b262-40a1-9613-2369e1c8be55",
            "created_time_stamp": "2021-07-23 09:57:33.637893",
            "memory_id": "57d0a1ac-23b3-438f-8754-9e4655037b75",
            "user_id": "28201b76-9c2b-406e-a755-7d0c9dbc41fe",
            "prompt_id": "5342b2d4-80f1-461b-9b5f-cf8e9d72b219"
          }
        ]
      },
      {
        "prompt_id": "64b5c787-061d-416b-ae92-4655e0233db3",
        "theme_id": "144f22dd-d01e-4ad1-aa15-7628b9297daa",
        "prompt_question": "How did you get to the hospital?",
        "created_time_stamp": "2021-07-19T12:27:25.741267",
        "mediaItems": [
          {
            "audio_clip_id": "e661ba82-9227-4af6-b5ad-dda7cb8b5f14",
            "created_time_stamp": "2021-07-22 16:41:48.575224",
            "memory_id": "57d0a1ac-23b3-438f-8754-9e4655037b75",
            "user_id": "28201b76-9c2b-406e-a755-7d0c9dbc41fe",
            "prompt_id": "64b5c787-061d-416b-ae92-4655e0233db3"
          }
        ]
      }
    ],
    "progress": 100
  }]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

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
        // mergedData[i].prompts.map(prompt => Object.assign(prompt, userData.find(userPrompt => userPrompt.prompt_id == prompt.prompt_id)));
        mergedData[i].prompts.map(prompt => {
          prompt.mediaItems = userData.filter(userPrompt => userPrompt.prompt_id == prompt.prompt_id)
        });

        console.log(mergedData);

        const completedCount = mergedData[i].prompts.filter((obj) => obj.mediaItems.length > 0).length;
        const totalPrompts = mergedData[i].prompts.length;
        mergedData[i].progress = (completedCount / totalPrompts) * 100;
      }

      setMergedData(mergedData);
    };

    let themeData = await fetchThemeData();
    let userData = await fetchUserData();
    mergeData(themeData, userData);
    setIsUploading(false);
    setIsLoading(false);
  }, [uploadedFiles]);

  const complete = async (promptId, mediaItemId) => {

    console.log('making registration request to: ' + process.env.REACT_APP_REGISTER_AUDIO_API);
    console.log('Prompt: ' + promptId);
    setIsUploading(true);

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
      {mergedData.length > 0 && mergedData.map((theme) => (
        <Grid item xs={12} sm={12} md={12} lg={12} key={theme.theme_id}>
          <Grid item xs={12}>
            <ThemeHeader isLoading={isLoading} title={theme.theme_name} progress={theme.progress} />
          </Grid>
          <Grid container style={{ marginTop: 2 }} spacing={4}>
            {theme.prompts && theme.prompts.map((prompt) => (
              <Grid item key={prompt.prompt_id} xs={12} sm={12} md={12}>
                <Prompt uploading={isUploading} isLoading={isLoading} addEnabled="true" question={prompt.prompt_question} prompt={prompt} onFileUploaded={(promptId, fileIdentifier) => complete(promptId, fileIdentifier)} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))
      }
    </Grid >
  );
}