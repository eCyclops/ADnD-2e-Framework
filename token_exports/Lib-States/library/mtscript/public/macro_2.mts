[h, macro("Legacy@this"): "deleteState@Lib:States"]

[h: '<!-- delete a state from list of token states at index -->']
[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(stateIndex). "+getMacroName()+"@"+getMacroLocation())]

[H: stateID = arg(0) ]

[h: statesJSON = getLibProperty("tokensStates","Lib:States")]

[h: deleteJSON = json.get(statesJSON,stateID)]
[h: delete_id = json.get(deleteJSON,"tokenID")]
[h: delete_duration = json.get(deleteJSON,"duration")]
[h: delete_stateID = json.get(deleteJSON,"stateID")]
[h: delete_name = json.get(deleteJSON,"name")]
[h: delete_tokenName = getName(delete_id)]

[h: setState(delete_stateID,0,delete_id)]

[h: statesJSON = json.remove(statesJSON,stateID)]
[h: setLibProperty("tokensStates",statesJSON,"Lib:States")]

[h: effectsList = getProperty("stateEffects",delete_id)]
[h, for(i, json.length(effectsList) - 1, -1, -1, ""), code: {
	[h: effect = json.get(effectsList,i)]
	[h, if(json.get(effect,"name") == delete_name && json.get(effect,"duration") == delete_duration), code: {
		[h: effectsList = json.remove(effectsList,i)]
	}]
}]
[h: setProperty("stateEffects",effectsList,delete_id)]

[h: showIt(strformat('%{delete_name} (icon:%{delete_stateID}) effect fades from %{delete_tokenName}.<br>'),delete_id,"save",0)]
[h: updateStates("0")]