[h: tokenID = json.get(arg(0), "id")]
[h: stateName = json.get(arg(0), "name")]

[h: allActiveStates = getLibProperty("tokensStates","Lib:States")]

[h, for(i, json.length(allActiveStates) - 1, -1, -1, ""), code: {
  [h: stateData = json.get(allActiveStates, i)]
  [h: delete_id = json.get(stateData, "tokenID")]
  [h: delete_name = json.get(stateData, "name")]
  
  [h, if(delete_id == tokenID && delete_name == stateName), code: {
    [h: delete_duration = json.get(stateData,"duration")]
    [h: delete_stateID = json.get(stateData,"stateID")]
    [h: delete_tokenName = getName(delete_id)]

    [h: 'remove the state from the list of active states']
    [h: allActiveStates = json.remove(allActiveStates, i)]
    [h: setLibProperty("tokensStates", allActiveStates, "Lib:States")]
    
    [h: 'remove the state icon from the token']
    [h: setState(delete_stateID, 0, delete_id)]

    [h: 'Remove the effects of the state from the token']
    [h, macro("Delete Token Effect@Lib:States"): json.set("{}", "delete_id", delete_ID, "delete_name", delete_name, "delete_duration", delete_duration)]

    [h: 'Report the deleted states']
    [h: showIt(strformat('%{delete_name} (icon:%{delete_stateID}) affect fades from %{delete_tokenName}.<br>'),delete_id,"save",0)]
  }]
}]