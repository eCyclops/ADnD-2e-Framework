[h: editPresetState = arg(0)]
[h, if(editPresetState == "custom"), code: {
	[h: autoApply = 1]
	[h: editPresetState = ""]
};
{
	[h: autoApply = 0]
}]
[h, if(autoApply == 0): processorLink = macroLinkText("Process Add Preset Form@Lib:States"); processorLink = macroLinkText("Apply State@Lib:States")]

[h, if(editPresetState == ""), code: {
	[h: defaultPresetName = "Stunned"]
	[h: defaultPresetImage = "Nothing"]
	[h: defaultPresetRounds = 1]
	[h: defaultPresetTurns = 0]
	[h: defaultPresetHours = 0]
	[h: defaultPresetDays = 0]
	[h: defaultPresetToHit = 0]
	[h: defaultPresetToDmg = 0]
	[h: defaultPresetMyToHit = 0]
	[h: defaultPresetMyToDmg = 0]
	
	[h: showDeletePresetButton = "false"]
};
{
	[h: statePresetJSON = json.get(getLibProperty("tokenStatePresets"), editPresetState)]
	[h: defaultPresetName = editPresetState]
	[h: defaultPresetImage = json.get(statePresetJSON,"stateImage")]
	[h: defaultPresetRounds = json.get(statePresetJSON,"duration")]
	[h: defaultPresetTurns = json.get(statePresetJSON,"durationTurn")]
	[h: defaultPresetHours = json.get(statePresetJSON,"durationHour")]
	[h: defaultPresetDays = json.get(statePresetJSON,"durationDays")]
	[h: defaultPresetToHit = json.get(statePresetJSON,"toHit")]
	[h: defaultPresetToDmg = json.get(statePresetJSON,"toDmg")]
	[h: defaultPresetMyToHit = json.get(statePresetJSON,"myToHit")]
	[h: defaultPresetMyToDmg = json.get(statePresetJSON,"myToDmg")]

	[h: showDeletePresetButton = "true"]
}]

[dialog("State Presets","closebutton=0"): {
	<html>
		<head>
			<link rel="stylesheet" type="text/css" href="Edit States CSS@Lib:States">
		</head>
		<body>
			<form action="[r:processorLink]" method="json">
				<input type="hidden" name="editPresetState" value="[r:editPresetState]">
				<input type="hidden" name="autoApply" value="[r:autoApply]">

				<table>
					<tr><td>Name:</td><td><input type="text" name="stateName" value="[r:defaultPresetName]"></td></tr>
					<tr>
						<td>Image:</td>
						<td>
							<select name="stateImage">
								[h: imageStatesList = getTokenStates()]
								[foreach(imageState,imageStatesList,""), code: {
									[h, if(defaultPresetImage == imageState): isSelectedImage = "selected='selected'"; isSelectedImage=""]
									<option [r:isSelectedImage]>[r:imageState]</option>
								}]
							</select>
						</td>
					</tr>
					
					<tr><td colspan=2><b>Default Duration:</b></td></tr>
					<tr><td>Rounds:</td><td><input type="text" name="duration" value="[r:defaultPresetRounds]"></td></tr>
					<tr><td>Turns (10 rounds):</td><td><input type="text" name="durationTurn" value="[r:defaultPresetTurns]"></td></tr>
					<tr><td>Hours:</td><td><input type="text" name="durationHour" value="[r:defaultPresetHours]"></td></tr>
					<tr><td>Days:</td><td><input type="text" name="durationDays" value="[r:defaultPresetDays]"></td></tr>

					<tr><td colspan=2><b>Effects to Rolls Against Target:</b></td></tr>
					<tr><td>To Hit*:</td><td><input type="text" name="toHit" value="[r:defaultPresetToHit]"></td></tr>
					<tr><td>To Damage:</td><td><input type="text" name="toDmg" value="[r:defaultPresetToDmg]"></td></tr>

					<tr><td colspan=2><b>Effects to Target&#39;s Rolls:</b></td></tr>
					<tr><td>To Hit*:</td><td><input type="text" name="myToHit" value="[r:defaultPresetMyToHit]"></td></tr>
					<tr><td>To Damage:</td><td><input type="text" name="myToDmg" value="[r:defaultPresetMyToDmg]"></td></tr>
					<tr><td colspan=2 class="footnote">*To ensure that opponents can always be hit, negative To-Hit values will adjust AC instead of the To-Hit roll.</td></tr>
				</table>
				<table class="input-buttons">
					<tr>
						<td align=center><input type="submit" name="submit" value="Save"></td>
						[if(showDeletePresetButton == "true"), code: {
							<td align=center><input type="submit" name="delete" value="Delete"></td>
						};{}]
						<td align=center><input type="submit" name="cancel" value="Cancel"></td>
					</tr>
				</table>
			</form>
		</body>
	</html>
}]