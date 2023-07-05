[h, macro("Legacy@this"): "addState@Lib:States"]

[h: '<!-- add/Update a state from list of token states at index -->']
[H: numArgs = argCount()]
[h: assert(!(numArgs<2),"To few arguments to function "+getMacroName()+"(index,addJSON). "+getMacroName()+"@"+getMacroLocation())]

[H: stateID = arg(0) ]
[H: addJSON = arg(1) ]

[h: statesJSON = getLibProperty("tokensStates","Lib:States")]
[h: statesJSON = json.set(statesJSON,stateID,addJSON)]

[h: add_id = json.get(addJSON,"tokenID")]
[h: add_duration = json.get(addJSON,"duration")]
[h: add_stateID = json.get(addJSON,"stateID")]
[h: add_hideState = json.get(addJSON,"hideState")]
[h: add_name = json.get(addJSON,"name")]
[h: add_tokenName = getName(add_id)]

[h: setState(add_stateID,1,add_id)]

[h: showIt(strformat('* %{add_name} (icon:%{add_stateID} hide:%{add_hideState}) effect persists on %{add_tokenName} for %{add_duration} more round(s).<br>'),add_id,"save",0)]

[h: setLibProperty("tokensStates",statesJSON,"Lib:States")]