[h: '<!-- Check if we canceled -->']
[h: canceled = json.get(arg(0),":cancel")]
[h, if(canceled == "Cancel"), code: {
	[h: closeDialog("Token States")]
	[h: abort(0)]
}]

[h: stateList = json.remove(arg(0), ":submit")]

[h: '<!-- Delete any states we unchecked -->']
[h, foreach(stateName, stateList), code: {
	[h: idList = json.get(stateList, stateName)]
	[h, foreach(tokenID, idList), code: {
		[h, macro("Delete State@Lib:States"): json.set("{}", "id", tokenID, "name", stateName)]
	}]
}]

[h: closeDialog("Token States")]