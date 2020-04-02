'use strict';

const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket('jl_intent_analysis_upload_bucket1');
const remoteFile = bucket.file('testData.txt');
const textFile = remoteFile.createReadStream();
var  buf = '';

textFile.on('data', function(d) {
  buf += d;
}).on('end', function() {
  console.log(buf.toString().split('\n'));
  console.log("End");
});     
