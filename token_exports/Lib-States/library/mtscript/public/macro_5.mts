[h: statePresetList = getLibProperty("tokenStatePresets")]
[h: selectedTokenList = getSelected()]
[h, if(listCount(selectedTokenList) > 0): applyStateLink = "true"; applyStateLink = "false"]

[dialog("State Presets", "width=400; height=400;"): {
	<html>
		<head>
			<link rel="stylesheet" type="text/css" href="Edit States CSS@Lib:States">
			<link rel='onChangeSelection' type='macro' href='[r:macroLinkText("Edit State Presets@Lib:States")]'>
		</head>
		<body>
			[if(applyStateLink == "true"), code: {
				<table>
					<tr><td class="add-custom-state">[r: macroLink("Apply Custom State to Selected","Edit Preset@Lib:States","none","custom")]</td></tr>
				</table>
			};{}]
			<h1>Preset States</h1>
			<hr>
			<table>
				[if(json.isEmpty(statePresetList) == 1), code: {
					<tr align=center class="oddRow"><td>There are no preset states</td></tr>
				};
				{
					[r, macro("List Presets@Lib:States"): json.set("{}", "presetList", statePresetList, "applyStateLink", applyStateLink)]
				}]
			</table>
			<div class="add-link">
				[r: macroLink("Add Preset","Edit Preset@Lib:States")]
			</div>
		</body>
	</html>
}]