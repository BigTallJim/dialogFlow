/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.helloGCS = function(event, context) {
    const fileName = event && event.name ? event.name : 'testData.txt';
    const {Storage} = require('@google-cloud/storage');
    const dialogflow = require('dialogflow');
    const sessionClient = new dialogflow.SessionsClient();
    const storage = new Storage();
    const bucket = storage.bucket('jl_intent_analysis_upload_bucket1');
    const remoteFile = bucket.file(fileName);
    const textFile = remoteFile.createReadStream();
    let  buf = '';
    // console.log(`textFile: `,textFile);
    
    // Option 1 using readStream
    // --------------------------
    console.log("Running Option 1c")
    remoteFile.createReadStream().on('data', function(d) {
      console.log("Data", d);
      buf += d;
    }).on('response', function(response) {
      console.log(`response:`, response);
    }).on('error', function(err) {
      console.log(`Readstream Error`, err);  
    }).on('end', function() {
      console.log("End4");
      console.log("End5");
      detectTextIntent(buf.split('\n'));
      // detectTextIntent(['xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxtest file for intent']);
    }).on('finish', function() {
      console.log("Finish");
    }).on('close', function() {
      console.log("Close");
    })
  
    // Option 2 using download
    //------------------------
    // console.log("Running Option 2")
    // remoteFile.download(function(err, contents) {
    //   console.log("file err: ", err);  
    //   console.log("file data: ", contents);
    //   detectTextIntent(contents.toString().split('\n'))   
    // });
  
  
    // console.log(`  Event ${context.eventId}`);
    // console.log(`  Event Type: ${context.eventType}`);
    // console.log(`  Bucket: ${file.bucket}`);
    console. log(`  File: ${fileName}`);
    // console.log(`  Metageneration: ${file.metageneration}`);
    // console.log(`  Created: ${file.timeCreated}`);
    // console.log(`  Updated: ${file.updated}`);
  
  
    // function detectTextIntentDummy(queries) {
    //   console.log("Came in dummy function4");
    //   console.log("In detectTextIntent");
    //   console.log("dialog", dialogflow);
    //   const projectId = 'jlcategorisation-minvfh';
    //   const sessionId = 'JLSessionID';
    //   const languageCode = 'en';
    //   const sessionClient = new dialogflow.SessionsClient();
    //   // executeQueries(projectId, sessionId, queries, languageCode, sessionClient);
    // }
  
    function detectTextIntent(queries) {
      console.log("In detectTextIntent");
      const projectId = 'jlcategorisation-minvfh';
      const sessionId = 'JLSessionID';
      const languageCode = 'en';
      console.log("detectIntent 2");
      // const sessionClient = new dialogflow.SessionsClient();
      console.log("detectIntent 3");
      executeQueries(projectId, sessionId, queries, languageCode, sessionClient);
    // [END dialogflow_detect_intent_text]
    }
  
    async function executeQueries(projectId, sessionId, queries, languageCode, sessionClient) {
      // Keeping the context across queries let's us simulate an ongoing conversation with the bot
      console.log("came in executeQueries")
      let context;
      let intentResponse;
  
      for (const query of queries) {
        try {
          // console.log(`Sending Query: ${query}`);
          console.log("came here 3", query)
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