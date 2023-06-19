[h: assert(getSelected()!='',"You must select token(s) to use this command.",0)]

[h: canceledApplyState = json.get(arg(0),"cancel")]
[h, if(canceledApplyState == "Cancel"), code: {
	[if(isDialogVisible("State Presets")), code: {
		[macro("Edit State Presets@Lib:States"): ""]
	}]
	[h: abort(0)]
}]

[h: stateData = arg(0)]

[h: statesList = getTokenStates()]
[h: statesList = listSort(statesList,"A")]

[h: time_day = 1440]
[h: time_hour = 60]
[h: time_turn = 10]

[h: durationDay = json.get(stateData,"durationDays")]
[h: durationHour = json.get(stateData,"durationHour")]
[h: durationTurn = json.get(stateData,"durationTurn")]
[h: durationRound = json.get(stateData,"duration")]
[h: toHit = json.get(stateData,"toHit")]
[h: toDmg = json.get(stateData,"toDmg")]
[h: myToHit = json.get(stateData,"myToHit")]
[h: myToDmg = json.get(stateData,"myToDmg")]

[h: duration = (durationDay*time_day)+(durationHour*time_hour)+(durationTurn*time_turn)+durationRound]
[h: duration = eval(string(duration))]

[h: statesJSON = getLibProperty("tokensStates","Lib:States")]
[h: currentSelections = getSelected()]
[foreach(id,currentSelections,""), code :{
	[h: tokenName = getName(id)]
	
	[h: name = json.get(stateData,"name")]
	[h, if(name == ""): name = json.get(stateData,"stateName")]
	[h: stateImage = json.get(stateData,"stateImage")]
	[h: hideState = json.get(stateData,"hideState")]

	/* Add this state to the master list of all active states */
	[h: addThisJSON = "{}"]
	[h: addThisJSON = json.set(addThisJSON,"tokenID",id)]
	[h: addThisJSON = json.set(addThisJSON,"name",name)]
	[h: addThisJSON = json.set(addThisJSON,"stateID",stateImage)]
	[h: addThisJSON = json.set(addThisJSON,"hideState",hideState)]
	[h: addThisJSON = json.set(addThisJSON,"duration",duration)]
	[h: statesJSON = json.append(statesJSON,addThisJSON)]

	/* Add this state to the state effects on the token */
	[h: effectsList = getProperty("stateEffects",id)]
	[h, if(json.isEmpty(effectsList)): effectsList = "[]"]
	[h: newEffect = "{}"]
	[h: newEffect = json.set(newEffect,"name",name)]
	[h: newEffect = json.set(newEffect,"duration",duration)]
	[h: newEffect = json.set(newEffect,"toHit",toHit)]
	[h: newEffect = json.set(newEffect,"toDmg",toDmg)]
	[h: newEffect = json.set(newEffect,"myToHit",myToHit)]
	[h: newEffect = json.set(newEffect,"myToDmg",myToDmg)]
	[h: effectsList = json.append(effectsList, newEffect)]
	[h: setProperty("stateEffects", effectsList, id)]
	
	[h: setState(stateImage,1,id)]
    [h: addStateTXT = strformat('%{name} (icon:%{stateImage}) effect added to %{tokenName} for %{duration} round(s).<br>')]
	[h,if(hideState != ""):
        broadcast("DM: "+addStateTXT,"gm");
        showIt(addStateTXT,id,"save",0)]

	[h: currentTokenText = getProperty("States",id)]
	[h: stateString = strformat('%{name}(%{duration})')]

	[h, if (length(currentTokenText)>0): 
			setProperty("States",strformat('%{stateString};%{currentTokenText}'), id);
			setProperty("States",stateString, id)]		

}]

[h: setLibProperty("tokensStates",statesJSON,"Lib:States")]

[h: autoApply = json.get(arg(0),"autoApply")]
[h, if(autoApply == 1), code: {
	[if(isDialogVisible("State Presets")), code: {
		[macro("Edit State Presets@Lib:States"): ""]
	}]
}]
