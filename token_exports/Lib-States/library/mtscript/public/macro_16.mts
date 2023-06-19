[h: selectedTokenList = getSelected()]
[h, if(selectedTokenList != ""), code: {
	[macro("Get Selection State List@Lib:States"): selectedTokenList]
	[h: stateList = macro.return]
};
{
	[h: stateList = ""]
}]
[h: stateNames = listSort(json.fields(stateList), "A+")]

[h, switch(listCount(selectedTokenList)), code:
	case 0: {
		[h: selectionName = "No tokens selected"]
	};
	case 1: {
		[h: selectionName = getName(selectedTokenList)]
	};
	default: {
			[h: selectionName = "Multiple"]
	};
]

[h: processorLink = macroLinkText("Process Edit Token States@Lib:States")]
[dialog("Token States", "width=400; height=400; closebutton=0;"): {
	<html>
		<head>
			<link rel="stylesheet" type="text/css" href="Edit States CSS@Lib:States">
			<link rel='onChangeSelection' type='macro' href='[r:macroLinkText("Edit Token States@Lib:States")]'>
		</head>
		<body>
			<h1>[r: selectionName]</h1>
			<hr>
			<form action="[r:processorLink]" method="json">
				<table>
					[foreach(state, stateNames, ""), code: {
						[h: idList = json.get(stateList, state)]
						<tr>
							<td width=16>
								<input type="hidden" name="[r:state]" value="[r:idList]">
								<input type="checkbox" name="[r:state]" value="" checked="checked">
							</td>
							<td>
								[r:state]
							</td>
						</tr>
					}]
				</table>
				<table class="input-buttons">
					<tr>
						[h: 'We put ":" at the beginning of these button names because it is a character we do not allow in state names' ]
						<td align=center><input type="submit" name=":submit" value="Save"></td>
						<td align=center><input type="submit" name=":cancel" value="Cancel"></td>
					</tr>
					
					<tr><td colspan=2 class="footnote" align=center>Uncheck states to remove them from the selected tokens.</td></tr>
				</table>
			</form>
		</body>
	</html>
}]