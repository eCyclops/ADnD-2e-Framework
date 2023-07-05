[H: numArgs = argCount()]
[h, if (numArgs < 1): advanceRounds=0; advanceRounds = arg(0)]

[h: advanceTurn = 0]
[h: advanceHour = 0]
[h: advanceDay = 0]

[h:topicInput = strformat('seperator|<html><b>--- Enter Time to Advance ---</b></html>||LABEL|SPAN=TRUE')]
[h: timeAdvanceInput = strformat("advanceRounds| %{advanceRounds} | Round count")]
[h: timeAdvanceInputTurn = strformat("advanceTurn| 0 | Turn count")]
[h: timeAdvanceInputHour = strformat("advanceHour| 0 | Hour count")]
[h: timeAdvanceInputDay = strformat("advanceDay| 0 | Day count")]

[h: time_day = 1440]
[h: time_hour = 60]
[h: time_turn = 10]

[H, if(numArgs < 1): status = input(
		topicInput,
		timeAdvanceInput,
		timeAdvanceInputTurn,
		timeAdvanceInputHour,
		timeAdvanceInputDay
); status=1]
[H: abort(status)]
[h: assert(isNumber(advanceDay),"The day input value was not a number.",0)]
[h: assert(isNumber(advanceHour),"The hour input value was not a number.",0)]
[h: assert(isNumber(advanceTurn),"The turn input value was not a number.",0)]
[h: assert(isNumber(advanceRounds),"The round input value was not a number.",0)]

[h: advanceRounds = (advanceDay*time_day)+(advanceHour*time_hour)+(advanceTurn*time_turn)+advanceRounds]

[h: statesJSON = getLibProperty("tokensStates","Lib:States")]
[h: 'assert(json.length(statesJSON),"DM: There are no states currently that need time advancement.<br>",0)']

[h: tokensStatesTextJSON = "{}"]
[h: updatedStatesJSON = "[]"]
[h, foreach(stateJSON,statesJSON,""), code :{
	[h: addThisJSON = "{}"]
	[h: id = json.get(stateJSON,"tokenID")]
	[h, if(findToken(id) != ''): tokenExists = 1; tokenExists = 0]

	[h: duration = json.get(stateJSON,"duration")]
	[h: stateID = json.get(stateJSON,"stateID")]
	[h: name = json.get(stateJSON,"name")]
    [h: hideState = json.get(stateJSON,"hideState")]
	[h: newDuration = duration - advanceRounds]
	[h: entryID = json.indexOf(statesJSON,stateJSON)]
	[h, if(tokenExists == 1): tokenName = getName(id); tokenName = "UNKNOWN"]
	
	[h: stateString = strformat('%{name}(%{newDuration})')]

	[if (!tokenExists):
		broadcast(strformat('DM: TokenID: %{id} is missing/not on current map but had state, removing from list. <br>'),"gm")]
	
	[h, if(tokenExists == 1): currentTokenText = json.get(tokensStatesTextJSON,id);currentTokenText ='' ]

	[h, if (newDuration <= 0 && tokenExists == 1), code :{
        [h, if (length(currentTokenText)<=0): tokensStatesTextJSON = json.set(tokensStatesTextJSON,id, "")]
		[h: setState(stateID,0,id)]	
        [h: stateFadesTXT = strformat('** %{name} (icon:%{stateID}) effect fades from %{tokenName}.<br>')]
		[h,if(hideState != ""): 
            broadcast("DM: "+stateFadesTXT,"gm");
            showIt(stateFadesTXT,id,"save",0)]
	};{}]

	[h, if (newDuration > 0 && tokenExists == 1), code :{
		[h, if (length(currentTokenText)>0): 
			tokensStatesTextJSON = json.set(tokensStatesTextJSON,id, strformat('%{stateString};%{currentTokenText}'));
			tokensStatesTextJSON = json.set(tokensStatesTextJSON,id, stateString)]		

		[h: addThisJSON = json.set(addThisJSON,"tokenID",id)]
		[h: addThisJSON = json.set(addThisJSON,"name",name)]
		[h: addThisJSON = json.set(addThisJSON,"stateID",stateID)]
		[h: addThisJSON = json.set(addThisJSON,"hideState",hideState)]
		[h: addThisJSON = json.set(addThisJSON,"duration",newDuration)]
		[h: setState(stateID,1,id)]	
        [h: statePersistsTXT = strformat('* %{name} (icon:%{stateID}) effect persists on %{tokenName} for %{newDuration} more round(s).<br>')]
   		[h,if(hideState != ""): 
            broadcast("DM: "+statePersistsTXT,"gm");
            showIt(statePersistsTXT,id,"save",0)]
		[h: updatedStatesJSON = json.append(updatedStatesJSON,addThisJSON)]
	};{}]

	[h: 'Update the effect duration']
	[h, if(tokenExists == 1), code: {
		[h, macro("updateEffectDuration@Lib:States"): json.set("{}","id",id,"name",name,"duration",duration,"newDuration",newDuration)]
	}]
	
}]


[h: setLibProperty("tokensStates",updatedStatesJSON,"Lib:States")]

[h: 'flip though all tokens with states and set property so player/npcs can see list']
[foreach(tokenID, tokensStatesTextJSON,""), code :{
	[h, if(findToken(id) != ''): tokenExists = 1; tokenExists = 0]
	[h: stateTxt = json.get(tokensStatesTextJSON,tokenID)]
	[h: setProperty("States",stateTxt,tokenID)]
}]


[h, if (advanceRounds>0), code :{
	[h: currentLifeTimeRounds = getLibProperty("lifeTimeRounds","Lib:ADND")]
	[h: newLifeTime = currentLifeTimeRounds+advanceRounds]
	[h: setLibProperty("lifeTimeRounds",newLifeTime,"Lib:ADND")]
	[h: timeString = getLifeTimePassedReadable()]
	[broadcast(strformat('DM: Time advanced by %{advanceRounds} round(s). Lifetime round count is %{timeString}.<br>'),"gm")]
 };{}]
