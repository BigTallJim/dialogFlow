// API call to PizzaBot

'use strict';

function detectTextIntent(queries) {

  const projectId = 'jlcategorisation-minvfh';
  const sessionId = 'JLSessionID';
  const languageCode = 'en';
  const dialogflow = require('dialogflow');
  const sessionClient = new dialogflow.SessionsClient();

  async function detectIntent(
    projectId,
    sessionId,
    query,
    contexts,
    languageCode
  ) {
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

  async function executeQueries(projectId, sessionId, queries, languageCode) {
    // Keeping the context across queries let's us simulate an ongoing conversation with the bot
    let context;
    let intentResponse;
    for (const query of queries) {
      try {
        // console.log(`Sending Query: ${query}`);
        intentResponse = await detectIntent(
          projectId,
          query.substring(0,38),
          query.substring(38,294),
          context,
          languageCode
        );
        // console.log('Detected intent');
        // console.log(
        //   `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
        // );
        // Use the context from this response for next queries
        context = intentResponse.queryResult.outputContexts;
      } catch (error) {
        console.log(error);
      }
    }
  }
  executeQueries(projectId, sessionId, queries, languageCode);
  // [END dialogflow_detect_intent_text]
}

const fs = require('fs');

var dataArray = fs.readFileSync('./customerCommentsLong.txt')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines

detectTextIntent(dataArray)
