[h: statePresetName = arg(0)]
[h: statePresetList = getLibProperty("tokenStatePresets")]
[h: statePresetList = json.remove(statePresetList, statePresetName)]
[h: setLibProperty("tokenStatePresets", statePresetList)]

[h: statePresetListOpen =  isDialogVisible("State Presets")]
[h, if(statePresetListOpen == 1), code: {
	[macro("Edit State Presets@Lib:States"): ""]
}]