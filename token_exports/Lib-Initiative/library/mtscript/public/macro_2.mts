[h: assert(isGM(),"This is a DM command.",0)]

[h: closeFrame("Initiative")]

[h: removeAllFromInitiative()]

[h: '<!-- Ends the encounter and removes all from the initiative tables and resets rounds/last initiative.-->']
[h: auraGroup = getLibProperty("_auraGroup","Lib:ADND")]
[h: auraName = getLibProperty("_auraName","Lib:ADND")]
[h: colorInitiative = getLibProperty("_colorInitiative ","Lib:ADND")]

[h: setLibProperty("myInitiativeList","{}","Lib:ADND")]
[h: setLibProperty("LastInitiative",-100,"Lib:ADND")]
[h: setLibProperty("LastRound",1,"Lib:ADND")]
[h: setInitiativeRound(1)]

[h: cond = json.set("{}", "visible", 1)]
[h: ids = getTokens("json", cond)]
[h, foreach(id, ids,""), code :{

	[h, if (isNumber(id)), code :{
		[h: brokenName = getName(id)]
		[broadcast(strformat("Maptools Bug: Token ID corrupted. We cannot use this token, ID: %{id} (%{brokenName}).<br> Copy it to new token if you want to use this token and a new ID will be created."),"gm")]
	};{
		[h, if(getHalo(id) == colorInitiative): setHalo("None",id)]
		[h, token(id): setLight(auraGroup,auraName,0) ]
		[h: setState("FailedSave",0,id)]
		[h: setState("Green",0,id)]
		[h: setState("Orange",0,id)]
		[h: setState("Struck",0,id)]
		[h: setState("Red",0,id)]
		[h: setProperty("ActionType","",id)]
	}]
}]

[h: broadcast("The encounter has been resolved.</b>")]
