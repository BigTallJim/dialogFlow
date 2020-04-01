

'use strict';
const BIGQUERY = require('@google-cloud/bigquery');

function addToBigQuery() {

    const projectId = 'jlcategorisation-minvfh'; 
    const datasetId = "dialogflow_output";
    const tableId = "JLDialogflow_results";
    const bigquery = new BIGQUERY({
      projectId: projectId
    });
   const rows = [{queryString: "James testing BigQuery"}];
  
   bigquery
  .dataset(datasetId)
  .table(tableId)
  .insert(rows)
  .then(() => {
    console.log(`Inserted ${rows.length} rows`);
  })
  .catch(err => {
    if (err && err.name === 'PartialFailureError') {
      if (err.errors && err.errors.length > 0) {
        console.log('Insert errors:');
        err.errors.forEach(err => console.error(err));
      }
    } else {
      console.error('ERROR:', err);
    }
  });
}

addToBigQuery();