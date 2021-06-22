import AWS from 'aws-sdk';
import axios from 'axios';
const s3bucketName = 'memoryjarbucket';
const audioPath = '/audio';

const identityPoolId = '';
let recorder;
const dateinfo = new Date();
const timestampData = dateinfo.getTime(); //timestamp used for file uniqueness
let etag = [];
let recordedChunks = [];
let booleanStop = false;
let filename = timestampData.toString() + ".webm"; //unique filename 
let uploadId = ""; // upload id is required in multipart
//To use microphone it shud be {audio: true}
let audioConstraints = {
    audio: true
};
let bucketName = s3bucketName + audioPath;
let s3;
let incr;

export const GetAudioStream = async (uploadUrl) => {

    let promise = new Promise(function(resolve, reject) {
        
        console.log('Getting audio stream');

        AWS.config.region = 'eu-central-1';
        // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        //     IdentityPoolId: identityPoolId,
        // });
        s3 = new AWS.S3();
        incr = 1;

        console.log('checking for audio access');
        navigator.mediaDevices.getUserMedia(audioConstraints)
        .then((stream) => { 
            console.log('found.. configuring recorder');
            recorder = new MediaRecorder(stream); 
            resolve(recorder);

            console.log('adding event handler');
            recorder.addEventListener('dataavailable', function(e) {
                var normalArr = [];
                /*
                    Here we push the stream data to an array for future use.
                */
                recordedChunks.push(e.data);
                normalArr.push(e.data);

                /*
                    here we create a blob from the stream data that we have received.
                */
                var blob = new Blob(normalArr, {
                    type: 'audio/webm'
                });

                /*
                    if the length of recordedChunks is 1 then it means its the 1st part of our data.
                    So we createMultipartUpload which will return an upload id. 
                    Upload id is used to upload the other parts of the stream
                    else.
                    It Uploads a part in a multipart upload.
                */
                if (recordedChunks.length == 1) {
                    // startMultiUpload(blob, filename)
                    Upload(uploadUrl, blob, filename);
                } else {
                    console.log('multipart uploads are not supported');
                    /*
                        incr is basically a part number.
                        Part number of part being uploaded. This is a positive integer between 1 and 10,000.
                    */
                    // incr = incr + 1
                    // continueMultiUpload(blob, incr, uploadId, filename, bucketName);
                }
            })
        });
    });

    return promise;
};

export const Upload = async (uploadUrl, blob, filename) =>
{
    console.log('uploading to S3 using uploadUrl: ' + uploadUrl);

    const result = await axios(uploadUrl, {
        method: "PUT",
        body: blob
    })

    return result;
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
        export const StopRecording = () => {
            
            console.log('stopping record..');
            recorder.stop();
            /*
                Once the recording is stop we change the flag of booleanStop to true.
                which means we have completed the recording and now we can
                Completes a multipart upload by assembling previously uploaded parts.
            */
            booleanStop = true;
        }
    
        /*
            When a MediaRecorder object’s pause()method is called, the browser queues a task that runs the below steps:
            1 - If MediaRecorder.state is "inactive", raise a DOM InvalidState error and terminate these steps. If not, continue to the next step.
            2 - Set MediaRecorder.state to "paused".
            3 - Stop gathering data into the current Blob, but keep it available so that recording can be resumed later on.
            4 - Raise a pause event.
        */
        function pauseRecording(id) {
            recorder.pause();
        }
    
    
        /*
            When the resume() method is invoked, the browser queues a task that runs the following steps:
            1 - If MediaRecorder.state is "inactive", raise a DOM InvalidState error and terminate these steps. If MediaRecorder.state is not "inactive", continue to the next step.
            2 - Set MediaRecorder.state to "recording".
            3 - Continue gathering data into the current Blob.
            4 - Raise a resume event.
        */
        function resumeRecording(id) {
            
            recorder.resume();
            
        }
    
        /*
            Initiates a multipart upload and returns an upload ID.
            Upload id is used to upload the other parts of the stream
        */
        function startMultiUpload(blob, filename) {

            console.log('starting upload');
            var audioBlob = blob;
            var params = {
                Bucket: bucketName,
                Key: filename,
                ContentType: 'audio/webm',
                ACL: 'private',
            };
            s3.createMultipartUpload(params, function(err, data) {
                if (err) {
                    console.log(err, err.stack); // an error occurred
                } else {
                    uploadId = data.UploadId
                    incr = 1;
                    continueMultiUpload(audioBlob, incr, uploadId, filename, bucketName);
                }
            });
        }
    
        /*
            Uploads a part in a multipart upload.
            The following code uploads part of a multipart upload. 
            it specifies a file name for the part data. The Upload ID is same that is returned by the initiate multipart upload. 
        */
        function continueMultiUpload(audioBlob, PartNumber, uploadId, key, bucketName) {
            
            var params = {
                Body: audioBlob,
                Bucket: bucketName,
                Key: key,
                PartNumber: PartNumber,
                UploadId: uploadId
            };
            console.log(params);
            s3.uploadPart(params, function(err, data) {
                if (err) {
                    console.log(err, err.stack)
                } // an error occurred
                else {
                    /*
                        Once the part of data is uploaded we get an Entity tag for the uploaded object(ETag).
                        which is used later when we complete our multipart upload.
                    */
                    etag.push(data.ETag);
                    if (booleanStop == true) {
                        completeMultiUpload();
                    }
                }
            });
        }
    
    
        /*
            Completes a multipart upload by assembling previously uploaded parts.
        */
        function completeMultiUpload() {
            
            var outputTag = [];
            /*
                here we are constructing the Etag data in the required format.
            */
            etag.forEach((data, index) => {
                const obj = {
                    ETag: data,
                    PartNumber: ++index
                };
                outputTag.push(obj);
            });
    
            var params = {
                Bucket: bucketName, // required 
                Key: filename, // required 
                UploadId: uploadId, // required 
                MultipartUpload: {
                    Parts: outputTag
                }
            };
    
            s3.completeMultipartUpload(params, function(err, data) {
                if (err) {
                    console.log(err, err.stack)
                } // an error occurred
                else {
                    // initialize variable back to normal
                    // etag = [], recordedChunks = [];
                    // uploadId = "";
                    // booleanStop = false;
                    alert("we have successfully saved the recording..");
                }
            });
        }