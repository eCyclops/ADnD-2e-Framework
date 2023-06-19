
[frame("MonsterImportFlat", "input=0"): {
<html>
<head>
<link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND>
<meta name="input" content="true">
</head>
<body>
<form method="json" name="monsterImport" action="[r:macroLinkText('importParse_Flatfile@Lib:MM:Macros',"all")]">
<p align=center>Paste Creature Details. One creature on each line. Each field is separated by <b>TAB</b>. </p>


<table>
	<table border=1 cellpadding=0>
		<th>name</th>
		<th>type</th>
		<th>climate</th>
		<th>terrain</th>
		<th>frequency</th>
		<th>organization</th>
		<th>activity</th>
		<th>diet</th>
		<th>intel</th>
		<th>%inLair</th>
		<th>treasure</th>
		<th>alignment</th>
		<th>#appear</th>
		<th>ac</th>
		<th>move</th>
		<th>HD</th>
		<th>THACO</th>
		<th>#attacks</th>
		<th>damage</th>
		<th>spec.attk</th>
		<th>spec.def</th>
		<th>magic res.</th>
		<th>size</th>
		<th>morale</th>
		<th>psionic</th>
		<th>psion-power</th>
		<th>level</th>
		<th>xp</th>
		<th>source</th>
		<th>edition</th>
	</table>

	<tr>
	<td valign=left>
	</td>
	</tr>

	<tr>
	<td valign=left>
	<table>
	<tr><td></td><td><textarea rows="40" cols="140" name='TextBox' ></textarea></td></tr>
	</table>
	</td>
	</tr>

<tr>
<td>
	<input type='radio' name='impType' value='1' checked>1</input><input type='radio' name='impType' value='2'>2</input><input type='radio' name='impType' value='3'>3</input><input type='radio' name='impType' value='4'>4</input>

</td>
</tr>
</table>
	<input type="submit"  name="Save" value="Save"> </input>
</form>
<p>
</body>
</html>
}]