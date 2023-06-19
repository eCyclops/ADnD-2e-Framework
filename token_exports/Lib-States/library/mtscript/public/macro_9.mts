[h: applyStateLink = json.get(arg(0), "applyStateLink")]
[h: statePresetList = json.fields(json.get(arg(0),"presetList"))]
[h: statePresetList = listSort(statePresetList, "A")]

[h: trClass = "oddRow"]
[foreach(statePresetName, statePresetList, "", ","), code: {
	[h: statePresetEditLink = macroLink(statePresetName, "Edit Preset@Lib:States", "none", statePresetName)]

	[h: stateData = json.get(getLibProperty("tokenStatePresets"),statePresetName)]
	[h: stateData = json.set(stateData,"name",statePresetName)]
	[h, if(applyStateLink == "true"): statePresetApplyLink = macroLink("apply", "Apply State@Lib:States", "none", stateData); statePresetApplyLink = ""]
	
	<tr class='[r:trClass]'><td>[r: statePresetEditLink]</td><td align=right>[r: statePresetApplyLink]</td></tr>
	
	[h, if(trClass == "oddRow"): trClass = "evenRow"; trClass = "oddRow"]
}]