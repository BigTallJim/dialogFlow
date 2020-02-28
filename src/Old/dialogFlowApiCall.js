async function dialogFlowApiCall(queryText){
  const url = "https://api.dialogflow.com/v2/detectIntent?"
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer c6af6782cbfd4ac092e861875590c7ea");
  var requestOptions = {method: 'GET',headers: myHeaders,redirect: 'follow'};
    // var requestOptions = {headers: myHeaders};


  let params = `?v=20150910`;
  params += `&lang=en`;
  params += `&sessionId=123jim456`;
  params += `&query=${queryText}`;
  let resp = await fetch(`${url}${params}`, requestOptions);
  const text = await resp.text();
  return text;
}