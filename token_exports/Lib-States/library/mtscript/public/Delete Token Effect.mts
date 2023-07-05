[h: delete_id = json.get(arg(0), "delete_id")]
[h: delete_name = json.get(arg(0), "delete_name")]
[h: delete_duration = json.get(arg(0), "delete_duration")]

[h: effectsList = getProperty("stateEffects", delete_id)]
[h, for(i, json.length(effectsList) - 1, -1, -1, ""), code: {
	[h: effect = json.get(effectsList,i)]
	[h, if(json.get(effect,"name") == delete_name && json.get(effect,"duration") == delete_duration), code: {
		[h: effectsList = json.remove(effectsList,i)]
	}]
}]
[h: setProperty("stateEffects",effectsList,delete_id)]