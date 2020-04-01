This only works in Node.js
This needs you to set Environment Variables for this to work:

First you need to create one: https://cloud.google.com/dialogflow/docs/quick/setup

Then you need to export it, here are the ones I've created for my Pizza test, and the JL one.
export GOOGLE_APPLICATION_CREDENTIALS="/Users/bigjim/Downloads/PizzaBotTest-bb3b90b25386.json"
or
export GOOGLE_APPLICATION_CREDENTIALS="/Users/bigjim/Downloads/JLCategorisation-1ba7b408ef4b.json"

Notes
To enable an intent to link through to a fulfillment you need to do the following

1. Enable WebHooks for the intent
2. Set the intentMap in the index.js on the Fulfillment link to include a link to the function you want to run. In this case they are all pointing to record_intent as i want them to all log in the same way.

Use Dialogflow to edit the intents and entities: https://dialogflow.cloud.google.com/#/agent/1dc27e74-f1e3-4f6e-a24f-a5d01768da8f/fulfillment
Use Google Cloud Console/Datastore to view output: https://console.cloud.google.com/datastore/entities;kind=log_text;ns=__$DEFAULT$__/query/kind?authuser=1&project=jlcategorisation-minvfh&supportedpurview=project
Use firebse console to view logs: https://console.firebase.google.com/u/0/project/jlcategorisation-minvfh/functions/logs?pli=1

Tasks to get file out of a storage bucket for processing

1. Create a Google Storage Bucket
2. Use Cloud Functions to add a trigger to the Storage Bucket which will run a Node.js program when something is added to the bucket
3. Install "npm install --save @google-cloud/storage" to enable your program to read the files in the cloud storage.

New key generated to access cloud storage

export GOOGLE_APPLICATION_CREDENTIALS="/Users/bigjim/Downloads/JLCategorisation-c9807f00093e.json"
