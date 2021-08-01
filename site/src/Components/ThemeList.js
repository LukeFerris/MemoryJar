import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { useToken } from './useToken';
import StoryHeader from './StoryHeader';
import Theme from './Theme';
import { v4 as uuidv4 } from 'uuid';

export default function ThemeList() {

  const [themeData, setThemeData] = useState([{ "themeId": "51a39d89-5d86-477a-93f4-7a9fddb52975", "themeName": "School Years", "prompts": [{ "promptId": "c0b8aead-637a-46fa-9603-fa728ed37ecf", "themeId": "51a39d89-5d86-477a-93f4-7a9fddb52975", "promptQuestion": "What was your first school like?", "createdTimeStamp": "2021-07-19T12:27:24.751905" }, { "promptId": "6005de42-ee70-45a5-8434-89a997d9a497", "themeId": "51a39d89-5d86-477a-93f4-7a9fddb52975", "promptQuestion": "Can you remember your first day?", "createdTimeStamp": "2021-07-19T12:27:24.909986" }, { "promptId": "a1377c10-7be2-484d-ad0b-af7dd274acef", "themeId": "51a39d89-5d86-477a-93f4-7a9fddb52975", "promptQuestion": "Did anyone bully you?", "createdTimeStamp": "2021-07-19T12:27:25.115664" }, { "promptId": "d7b5a477-a477-4be3-91df-6581ba5495bb", "themeId": "51a39d89-5d86-477a-93f4-7a9fddb52975", "promptQuestion": "What were the teachers like?", "createdTimeStamp": "2021-07-19T12:27:25.334788" }] }, { "themeId": "144f22dd-d01e-4ad1-aa15-7628b9297daa", "themeName": "Children", "prompts": [{ "promptId": "5342b2d4-80f1-461b-9b5f-cf8e9d72b219", "themeId": "144f22dd-d01e-4ad1-aa15-7628b9297daa", "promptQuestion": "What was it like the day your child was born?", "createdTimeStamp": "2021-07-19T12:27:25.545259" }, { "promptId": "64b5c787-061d-416b-ae92-4655e0233db3", "themeId": "144f22dd-d01e-4ad1-aa15-7628b9297daa", "promptQuestion": "How did you get to the hospital?", "createdTimeStamp": "2021-07-19T12:27:25.741267" }] }]);
  const [userData, setUserData] = useState([]);
  const [mergedData, setMergedData] = useState([{
    "themeId": "144f22dd-d01e-4ad1-aa15-7628b9297daa",
    "themeName": "Children",
    "prompts": [
      {
        "promptId": "5342b2d4-80f1-461b-9b5f-cf8e9d72b219",
        "themeId": "144f22dd-d01e-4ad1-aa15-7628b9297daa",
        "promptQuestion": "What was it like the day your child was born?",
        "createdTimeStamp": "2021-07-19T12:27:25.545259",
        "mediaItems": [
          {
            "mediaItemId": "58cbe2fb-0642-4e45-9750-78492c2ceac2",
            "createdTimeStamp": "2021-07-22 16:41:01.128013",
            "memoryId": "57d0a1ac-23b3-438f-8754-9e4655037b75",
            "userId": "28201b76-9c2b-406e-a755-7d0c9dbc41fe",
            "promptId": "5342b2d4-80f1-461b-9b5f-cf8e9d72b219"
          },
          {
            "mediaItemId": "05879c90-b262-40a1-9613-2369e1c8be55",
            "createdTimeStamp": "2021-07-23 09:57:33.637893",
            "memoryId": "57d0a1ac-23b3-438f-8754-9e4655037b75",
            "userId": "28201b76-9c2b-406e-a755-7d0c9dbc41fe",
            "promptId": "5342b2d4-80f1-461b-9b5f-cf8e9d72b219"
          }
        ]
      },
      {
        "promptId": "64b5c787-061d-416b-ae92-4655e0233db3",
        "themeId": "144f22dd-d01e-4ad1-aa15-7628b9297daa",
        "promptQuestion": "How did you get to the hospital?",
        "createdTimeStamp": "2021-07-19T12:27:25.741267",
        "mediaItems": [
          {
            "mediaItemId": "e661ba82-9227-4af6-b5ad-dda7cb8b5f14",
            "createdTimeStamp": "2021-07-22 16:41:48.575224",
            "memoryId": "57d0a1ac-23b3-438f-8754-9e4655037b75",
            "userId": "28201b76-9c2b-406e-a755-7d0c9dbc41fe",
            "promptId": "64b5c787-061d-416b-ae92-4655e0233db3"
          }
        ]
      }
    ],
    "progress": 100
  }]);
  const [uploadedFiles, setUploadedFiles] = useState({ openAfterRefreshId: null });
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);
  const [chapterCount, setChapterCount] = useState(6);

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
        let themeDataResult = result.data.records.sort((a, b) => (a.createdTimeStamp < b.createdTimeStamp) ? 1 : -1);
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

      let grandTotalPrompts = 0;
      let grandCompletedCount = 0;
      setChapterCount(themeData.length);

      for (let i = 0; i < themeData.length; i++) {
        // for each theme, see if any of the returned items match the prompts
        mergedData[i].prompts.map(prompt => {
          prompt.mediaItems = userData.filter(userPrompt => userPrompt.promptId == prompt.promptId)
        });

        // console.log(mergedData);

        const completedCount = mergedData[i].prompts.filter((obj) => obj.mediaItems.length > 0).length;
        const totalPrompts = mergedData[i].prompts.length;
        grandTotalPrompts += totalPrompts;
        grandCompletedCount += completedCount;
        mergedData[i].progress = (completedCount / totalPrompts) * 100;
      }

      setMergedData(mergedData);
      setStoryProgress((grandCompletedCount / grandTotalPrompts) * 100);
    };

    let themeData = await fetchThemeData();
    let userData = await fetchUserData();
    mergeData(themeData, userData);
    setIsUploading(false);
    setIsLoading(false);
  }, [uploadedFiles]);

  const autoImageOpened = () => {
    setUploadedFiles({ openAfterRefreshId: null });
  };

  const itemDeleted = async (mediaItemId) =>
  {
    console.log('deleting item: ' + mediaItemId);
   
   
    await axios.delete(process.env.REACT_APP_REGISTER_AUDIO_API + '/' + mediaItemId,
      {
        headers: {
          Authorization: token.jwtToken
        }
      })

    let uploadedFiles = {
      "mediaItemId": mediaItemId, "changed": uuidv4()
    };
  
    setUploadedFiles(uploadedFiles);
    
  }

  const complete = async (promptId, mediaItemId, mediaItemType, relatedMediaItemId = null, autoOpen = false) => {

    console.log('making registration request to: ' + process.env.REACT_APP_REGISTER_AUDIO_API);
    console.log('Prompt: ' + promptId);
    console.log('Media type: ' + mediaItemType);
    console.log('Related media item:' + relatedMediaItemId);
    setIsUploading(true);

    // now register it
    await axios.put(process.env.REACT_APP_REGISTER_AUDIO_API, {
      "mediaItemId": mediaItemId, "promptId": promptId, "mediaType": mediaItemType, "relatedMediaItemId": relatedMediaItemId
    },
      {
        headers: {
          Authorization: token.jwtToken
        }
      })

    let uploadedFiles = {
      "mediaItemId": mediaItemId, "promptId": promptId, "mediaType": mediaItemType, "relatedMediaItemId": relatedMediaItemId
    };

    if (autoOpen) {
      console.log('Autoopen reuquested');
      uploadedFiles.openAfterRefreshId = mediaItemId;
    }

    setUploadedFiles(uploadedFiles);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <StoryHeader isLoading={isLoading} progress={storyProgress} chapters={chapterCount} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} style={{paddingTop:10}}>
        {mergedData.length > 0 && mergedData.map((theme) => (
          <Theme key={theme.themeId} theme={theme} isLoading={isLoading} onItemDeleted={itemDeleted} autoImageOpened={autoImageOpened} openAfterRefreshId={uploadedFiles.openAfterRefreshId} uploading={isUploading} onFileUploaded={complete}  />
        ))
        }
      </Grid>
    </Grid >
  );
}