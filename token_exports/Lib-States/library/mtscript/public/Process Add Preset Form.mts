[h: '<!-- Check if we canceled and close the edit form if we did -->']
[h: canceledEditPresetState = json.get(arg(0),"cancel")]
[h, if(canceledEditPresetState == "Cancel"), code: {
	[macro("Edit State Presets@Lib:States"): ""]
	[h: abort(0)]
}]

[h: '<!-- Load the name of the state we are editing, if any -->']
[h: editPresetState = json.get(arg(0),"editPresetState")]

[h: '<!-- Check if we deleted the state -->']
[h: deletePresetState = json.get(arg(0),"delete")]
[h, if(deletePresetState == "Delete"), code: {
	[macro("Delete Preset@Lib:States"): editPresetState]
	[h: abort(0)]
}]

[h: '<!-- Load the settings for this state -->']
[h: '<!-- We also force them to be alphanumeric -->']
[h: statePresetName = sanitize(json.get(arg(0),"stateName"))]
[h: statePresetImage = json.get(arg(0),"stateImage")]
[h: statePresetDuration = sanitize(json.get(arg(0),"duration"))]
[h: statePresetDurationTurn = sanitize(json.get(arg(0),"durationTurn"))]
[h: statePresetDurationHour = sanitize(json.get(arg(0),"durationHour"))]
[h: statePresetDurationDays = sanitize(json.get(arg(0),"durationDays"))]
[h: statePresetToHit = sanitize(json.get(arg(0),"toHit"))]
[h: statePresetToDmg = sanitize(json.get(arg(0),"toDmg"))]
[h: statePresetMyToHit = sanitize(json.get(arg(0),"myToHit"))]
[h: statePresetMyToDmg = sanitize(json.get(arg(0),"myToDmg"))]

[h: '<!-- Load the list of all presets -->']
[h: tokenStatePresets = getLibProperty("tokenStatePresets")]

[h: '<!-- If we entered a duplicate name, and we do not already know that we are editing an existing state, ask if we should replace it -->']
[h, if(editPresetState == ""): replaceState = 0; replaceState = 1]
[h, if(json.contains(tokenStatePresets, statePresetName) == 1 && editPresetState == ""), code: {
	[h: replaceState = input("junkVar|That state already exists. Replace it?|Selected Power|LABEL|SPAN=true")]
	[h: abort(replaceState)]
}]

[h: '<!-- Generate the JSON for the state data -->']
[h: newStateJSON = json.set("{}",
	"stateImage",statePresetImage,
	"duration",statePresetDuration,
	"durationTurn",statePresetDurationTurn,
	"durationHour",statePresetDurationHour,
	"durationDays",statePresetDurationDays,
	"toHit",statePresetToHit,
	"toDmg",statePresetToDmg,
	"myToHit",statePresetMyToHit,
	"myToDmg",statePresetMyToDmg
)]

[h: '<!-- If we are editing a state, remove the old version from the master list so we do not get a duplicate if we changed the name -->']
[h, if(editPresetState != ""), code: {
	[h: tokenStatePresets = json.remove(tokenStatePresets,editPresetState)]
}]

[h: '<!-- Add the state to the list of presets -->']
[h: tokenStatePresets = json.set(tokenStatePresets,statePresetName,newStateJSON)]
[h: setLibProperty("tokenStatePresets",tokenStatePresets)]

[h: '<!-- Report if we added or updated a state -->']
[h, if(replaceState == 1): reportAddMessage = "Updated state '" + statePresetName + "'"; reportAddMessage = "Added state '" + statePresetName + "'"]
[h: broadcast(reportAddMessage,"gm-self")]

[h: '<!-- Show the list of presets -->']
[macro("Edit State Presets@Lib:States"): ""]