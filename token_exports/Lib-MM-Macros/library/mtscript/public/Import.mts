
[frame("MonsterImport", "input=0"): {
<html>
<head>
<link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND>
<meta name="input" content="true">
</head>
<body>
<form method="json" name="monsterImport" action="[r:macroLinkText('importParse@Lib:MM:Macros',"all")]">
<p align=center>Paste Creature Details.</p>
<table>
	<td valign=top>
	<table>
		<tr><th>Fields Checked For</th></tr>
		<tr><td>Climate/Terrain:</td></tr>
		<tr><td>Frequency:</td></tr>
		<tr><td>Organization:</td></tr>
		<tr><td>Activity Cycle:</td></tr>
		<tr><td>Diet:</td></tr>
		<tr><td>Intelligence:</td></tr>
		<tr><td>Treasure:</td></tr>
		<tr><td>Alignment:</td></tr>
		<tr><td>No. Appearing:</td></tr>
		<tr><td>Armor Class:</td></tr>
		<tr><td>Movement:</td></tr>
		<tr><td>Hit Dice:</td></tr>
		<tr><td>THAC0:</td></tr>
		<tr><td>No. of Attacks:</td></tr>
		<tr><td>Damage/Attack:</td></tr>
		<tr><td>Special Attacks:</td></tr>
		<tr><td>Special Defenses:</td></tr>
		<tr><td>Magic Resistance:</td></tr>
		<tr><td>Size:</td></tr>
		<tr><td>Morale:</td></tr>
		<tr><td>XP Value:</td></tr>
		<tr><td>(remainder is description)</td></tr>
	</table>
	</td>

	<td valign=top>
	<table>
	<tr><td></td><td><textarea rows="40" cols="80" name='TextBox' ></textarea></td></tr>
	</table>
	</td>

<tr>
<td>
	<input type='radio' name='impType' value='1' checked>1</input><input type='radio' name='impType' value='2'>2</input><input type='radio' name='impType' value='3'>3</input><input type='radio' name='impType' value='4'>4</input><input type='radio' name='impType' value='5'>5</input><input type='radio' name='impType' value='6'>6</input><input type='radio' name='impType' value='7'>7</input><input type='radio' name='impType' value='8'>8</input><input type='radio' name='impType' value='9'>9</input><input type='radio' name='impType' value='10'>10</input>

</td>
</tr>
</table>
	<input type="submit"  name="Save" value="Save"> </input>
</form>
<p>
</body>
</html>
}]