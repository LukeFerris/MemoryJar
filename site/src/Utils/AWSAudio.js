import axios from 'axios';
import API from '../Utils/API';

let audioConstraints = {
    audio: true
};

export const GetUploadUrl = async (audio_clip_id) => {
    let uploadUrl = await API.get('/?audio_clip_id=' + audio_clip_id).then((result) => {
        console.log('result is: ' + JSON.stringify(result.data));
        return result.data.uploadURL;
    });
    return uploadUrl;
}

export const GetAudioCapture = async (uploadUrl, memory_id, audio_clip_id, complete) => {

    let promise = new Promise(function (resolve, reject) {
        console.log('checking for audio access');
        navigator.mediaDevices.getUserMedia(audioConstraints)
            .then((stream) => {
                console.log('found.. configuring recorder');
                let recorder = new MediaRecorder(stream);
                resolve(recorder);

                console.log('adding event handler to process audio');
                recorder.addEventListener('dataavailable', async function (e) {

                    console.log('type is: ' + e.data.type);

                    // we need an array to build the blow from (must be iterable)
                    let dataArray = [e.data];

                    /*
                        here we create a blob from the stream data that we have received.
                    */
                    var blob = new Blob(dataArray, {
                        type: 'audio/webm'
                    });

                    await Upload(uploadUrl, blob, memory_id, audio_clip_id);
                    complete(audio_clip_id);
                });
            });
    });

    return promise;
};

export const Upload = async (uploadUrl, blob, memory_id, audio_clip_id) => {
    console.log('uploading to S3 using uploadUrl: ' + uploadUrl);

    var options = {
        headers: {
            'Content-Type': 'audio/webm'
        }
    };

    // upload the file
    await axios.put(uploadUrl, blob, options);

    console.log('making registration request to: ' + process.env.REACT_APP_REGISTER_AUDIO_API);

    // now register it
    return await axios.put(process.env.REACT_APP_REGISTER_AUDIO_API, {
        "memory_id": memory_id, "audio_clip_id": audio_clip_id
    })
}

/*
      The MediaRecorder method start(), which is part of the MediaStream Recording API,
      begins recording media into one or more Blob objects. 
      You can record the entire duration of the media into a single Blob (or until you call requestData()),
      or you can specify the number of milliseconds to record at a time. 
      Then, each time that amount of media has been recorded, an event will be delivered to let you act upon the recorded media, 
      while a new Blob is created to record the next slice of the media
  */
export const StartRecording = (recorder) => {

    /*
        1800000 is the number of milliseconds to record into each Blob. 
        If this parameter isn't included, the entire media duration is recorded into a single Blob unless the requestData() 
        method is called to obtain the Blob and trigger the creation of a new Blob into which the media continues to be recorded.
    */
    /*
    PLEASE NOTE YOU CAN CHANGE THIS PARAM OF 1800000 but the size should be greater then or equal to 5MB. 
    As for multipart upload the minimum breakdown of the file should be 5MB 
    */
    console.log('Starting record..');
    recorder.start(900000);

}

/*
    When the stop() method is invoked, the UA queues a task that runs the following steps:
    1 - If MediaRecorder.state is "inactive", raise a DOM InvalidState error and terminate these steps. 
    If the MediaRecorder.state is not "inactive", continue on to the next step.
    2 - Set the MediaRecorder.state to "inactive" and stop capturing media.
    3 - Raise a dataavailable event containing the Blob of data that has been gathered.
    4 - Raise a stop event.
*/
export const StopRecording = (recorder) => {

    console.log('stopping record..');
    recorder.stop();
}

/*
    When a MediaRecorder object’s pause()method is called, the browser queues a task that runs the below steps:
    1 - If MediaRecorder.state is "inactive", raise a DOM InvalidState error and terminate these steps. If not, continue to the next step.
    2 - Set MediaRecorder.state to "paused".
    3 - Stop gathering data into the current Blob, but keep it available so that recording can be resumed later on.
    4 - Raise a pause event.
*/
function pauseRecording(recorder) {
    recorder.pause();
}


/*
    When the resume() method is invoked, the browser queues a task that runs the following steps:
    1 - If MediaRecorder.state is "inactive", raise a DOM InvalidState error and terminate these steps. If MediaRecorder.state is not "inactive", continue to the next step.
    2 - Set MediaRecorder.state to "recording".
    3 - Continue gathering data into the current Blob.
    4 - Raise a resume event.
*/
function resumeRecording(recorder) {

    recorder.resume();

}