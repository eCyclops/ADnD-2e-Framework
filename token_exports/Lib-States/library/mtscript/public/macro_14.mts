[h: tokenID = json.get(arg(0),"id")]
[h: name = json.get(arg(0),"name")]
[h: duration = json.get(arg(0),"duration")]
[h: newDuration = json.get(arg(0),"newDuration")]

[h: effectsList = getProperty("stateEffects",tokenID)]
[h, for(i, json.length(effectsList) - 1, -1, -1, ""), code: {
	[h: effect = json.get(effectsList,i)]
	[h, if(json.get(effect,"name") == name && json.get(effect,"duration") == duration), code: {
    [h: effect = json.set(effect,"duration",newDuration)]
		[h: effectsList = json.set(effectsList,i,effect)]
    [h, if(newDuration <= 0): effectsList = json.remove(effectsList,i)]
	}]
}]

[h: setProperty("stateEffects",effectsList,tokenID)]
