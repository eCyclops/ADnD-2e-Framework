[h, macro("Legacy@this"): "addStateToToken@Lib:States"]

[h: assert(getSelected()!='',"You must select token(s) to use this command.",0)]

[h: statesList = getTokenStates()]
[h: statesList = listSort(statesList,"A")]

[h: time_day = 1440]
[h: time_hour = 60]
[h: time_turn = 10]

[H: status = input(
		"stateID | " + statesList + " | Select State icon | LIST | SELECT=0",
		"name| Sleep | Name of effect",
		"seperator|<html><b>--- Duration ---</b></html>||LABEL|SPAN=TRUE",
		"duration| 1 | Rounds",
		"durationTurn| 0 | Turns",
		"durationHour| 0 | Hours",
		"durationDay| 0 | Days",
		"seperator|<html><b>--- Effects ---</b></html>||LABEL|SPAN=TRUE",
		"toHitAdjustment| 0 | To Hit adjustment for people hitting me",
		"dmgAdjustment| 0 | Damage adjustment for people hitting me",
        "seperator|<html><b>--- Hide ---</b></html>||LABEL|SPAN=TRUE",
        "hideState| 0 | Hide state updates from player?|CHECK"
)]
[H: abort(status)]

[h: stateID = listGet(statesList,stateID)]

[h: assert(isNumber(eval(string(durationDay))),"The day input value was not a number.",0)]
[h: assert(isNumber(eval(string(durationHour))),"The hour input value was not a number.",0)]
[h: assert(isNumber(eval(string(durationTurn))),"The turn input value was not a number.",0)]
[h: assert(isNumber(eval(string(duration))),"The duration input value was not a number.",0)]

[h: duration = (durationDay*time_day)+(durationHour*time_hour)+(durationTurn*time_turn)+duration]

[h: statesJSON = getLibProperty("tokensStates","Lib:States")]

[h: currentSelections = getSelected()]
[foreach(id,currentSelections,""), code :{
	[h: thisDuration = eval(string(duration))]
	[h: addThisJSON = "{}"]
	[h: tokenName = getName(id)]
	[h: addThisJSON = json.set(addThisJSON,"tokenID",id)]
	[h: addThisJSON = json.set(addThisJSON,"name",name)]
	[h: addThisJSON = json.set(addThisJSON,"stateID",stateID)]
	[h: addThisJSON = json.set(addThisJSON,"hideState",hideState)]
	[h: addThisJSON = json.set(addThisJSON,"duration",thisDuration)]
	[h: statesJSON = json.append(statesJSON,addThisJSON)]
	[h: setState(stateID,1,id)]
    [h: addStateTXT = strformat('%{name} (icon:%{stateID}) effect added to %{tokenName} for %{thisDuration} round(s).<br>')]
	[h,if(hideState):
        broadcast("DM: "+addStateTXT,"gm");
        showIt(addStateTXT,id,"save",0)]

	[h: currentTokenText = getProperty("States",id)]
	[h: stateString = strformat('%{name}(%{thisDuration})')]

	[h, if (length(currentTokenText)>0): 
			setProperty("States",strformat('%{stateString};%{currentTokenText}'), id);
			setProperty("States",stateString, id)]		

}]

[h: setLibProperty("tokensStates",statesJSON,"Lib:States")]
