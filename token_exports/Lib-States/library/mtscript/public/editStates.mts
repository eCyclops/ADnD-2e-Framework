[h, macro("Legacy@this"): "editStates@Lib:States"]

[h: statesJSON = getLibProperty("tokensStates","Lib:States")]

[h: assert(json.length(statesJSON),"There are no states currently.<br>",0)]

[h: statesList = ""]
[h, foreach(stateJSON,statesJSON,""), code :{
	[h: id = json.get(stateJSON,"tokenID")]
	[h, if(findToken(id) != ''): tokenExists = 1; tokenExists = 0]
	[h: duration = json.get(stateJSON,"duration")]
	[h: stateID = json.get(stateJSON,"stateID")]
	[h: name = json.get(stateJSON,"name")]
	[h, if(tokenExists == 1): tokenName = getName(id); tokenName = "UNKNOWN"]
	[h: listID = json.indexOf(statesJSON,stateJSON)]
	[h: statesList = listAppend(statesList,strformat('%{listID}:%{tokenName}:%{name}'))]
}]

[h: deleteStateInput = strformat("stateID | %{statesList} | Select State to Remove | LIST | SELECT=0")]

[H: status = input(
		deleteStateInput
)]
[H: abort(status)]

[h: deleteState(stateID)]
