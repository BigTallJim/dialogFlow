
'use strict';

async function helloGCS(event, context){
  console.log(event);
  const fileName = event && event.name ? event.name : 'testData.txt';
  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage();
  const bucket = storage.bucket('jl_intent_analysis_upload_bucket1');
  const remoteFile = bucket.file(fileName);
  const textFile = remoteFile.createReadStream();
  var  buf = '';
  // console.log(`textFile: `,textFile);
  
  // const bucketName='jl_intent_analysis_upload_bucket1';
  // const fileName='file name here';
  // const storage = new Storage.Storage();
  // const file = remoteFile.file(fileName);
  
  await remoteFile.download(async function(err, contents) {
       console.log("file err: "+err);  
       console.log("file data: "+contents);
       await detectTextIntent(contents.toString().split('\n'))   
  });

  console.log(`temp:`,temp);

  // console.log(`  Event ${context.eventId}`);
  // console.log(`  Event Type: ${context.eventType}`);
  // console.log(`  Bucket: ${file.bucket}`);
  // console.log(`  File: ${fileName}`);
  // console.log(`  Metageneration: ${file.metageneration}`);
  // console.log(`  Created: ${file.timeCreated}`);
  // console.log(`  Updated: ${file.updated}`);



  async function detectTextIntent(queries) {
    const projectId = 'jlcategorisation-minvfh';
    const sessionId = 'JLSessionID';
    const languageCode = 'en';
    const dialogflow = require('dialogflow');
    const sessionClient = new dialogflow.SessionsClient();
    executeQueries(projectId, sessionId, queries, languageCode, sessionClient);
  // [END dialogflow_detect_intent_text]
  }

  async function executeQueries(projectId, sessionId, queries, languageCode, sessionClient) {
    // Keeping the context across queries let's us simulate an ongoing conversation with the bot
    console.log("came here 1")
    let context;
    let intentResponse;
    console.log("came here 2")

    for (const query of queries) {
      try {
        // console.log(`Sending Query: ${query}`);
        console.log("came here 3")
        if (query.length > 10){
          intentResponse = await detectIntent(
            projectId,
            query.substring(0,38),
            query.substring(38,294),
            context,
            languageCode,
            sessionClient
            );
          context = intentResponse.queryResult.outputContexts;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function detectIntent(
    projectId,
    sessionId,
    query,
    contexts,
    languageCode,
    sessionClient) {
    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode,
        },
      },
    };

    if (contexts && contexts.length > 0) {
      request.queryParams = {
        contexts: contexts,
      };
    }

    const responses = await sessionClient.detectIntent(request);
    return responses[0];
  }
};


helloGCS(null, null);
