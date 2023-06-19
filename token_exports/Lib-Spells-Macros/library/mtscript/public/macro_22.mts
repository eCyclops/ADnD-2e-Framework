[h: name = getStrProp(arg(0),"Name","New Spell")]
[h: viewLevelSpell = getStrProp(arg(0),"viewLevelSpell")]
[h: magicType = getStrProp(arg(0),"magicType")]
[h: newEntry = getStrProp(arg(0),"newEntry",0)]

[h: schoolNamesDISABLE = getLibProperty(magicType+"schools","Lib:Spells")]
[h: schoolNames = getLibProperty("schools","Lib:Spells")]
[h: sphereNames = getLibProperty(magicType+"spheres","Lib:Spells")]

[if(!newEntry), code :{
	[h: spellJson = getSpellJSON(magicType,name)]

	[h: school = decode(json.get(spellJson,'school'))]
	[h: sphere = decode(json.get(spellJson,'sphere'))]
	[h: levelSpell = decode(json.get(spellJson,'level'))]
	[h: range = decode(json.get(spellJson,'range'))]
	[h: duration = decode(json.get(spellJson,'duration'))]
	[h: areaofeffect = decode(json.get(spellJson,'aoe'))]
	[h: casttime = decode(json.get(spellJson,'casttime'))]
	[h: savingthrow = decode(json.get(spellJson,'save'))]
	[h: verbal = json.get(spellJson,'verbal')]
	[h: somatic = json.get(spellJson,'somatic')]
	[h: material = json.get(spellJson,'material')]
	[h: reversible = json.get(spellJson,'reversible')]

	[h: description = decode(json.get(spellJson,'description'))]
};{
	[h: school = "None"]
	[h: sphere = "None"]
	[h: levelSpell = viewLevelSpell]
	[h: range = "1ft / level"]
	[h: duration = "1 round / level"]
	[h: areaofeffect = "target"]
	[h: casttime = viewLevelSpell]
	[h: savingthrow = "negates"]
	[h: verbal = 1]
	[h: somatic = 1]
	[h: material = 1]
	[h: reversible = 0]
	[h: description = "Need short description"]
}]

<!-- dropdowns ->
[h: schoolInput = '<td>Spell School</td><td><select name="school" size="">']
[foundSchool = 0]
[h, foreach(spellSchool, schoolNames,""), code :{
	[if(spellSchool != school), code :{
		[schoolInput = concat(schoolInput,strformat('<option>%{spellSchool}</option>'))]
	};{
		[schoolInput = concat(schoolInput,strformat('<option selected="selected">%{spellSchool}</option>'))]
		[foundSchool = 1]
	}]
}]
[h, if(foundSchool != 1 && school != '' && school != 'None'): schoolInput = concat(schoolInput,strformat('<option selected="selected">%{school}</option>'))]
[h: schoolInput = concat(schoolInput,strformat('</select></td>'))]

[h: loopCount = 0]
[h: sphereInput = '<table border=1 cellpadding=0><caption>Spell Sphere</caption><tr>']
[h, foreach(spellSphere, sphereNames,""), code :{
	[if(listContains(sphere,spellSphere)), code :{
		[sphereInput = concat(sphereInput,strformat('<td><table border=0><td><input type="checkbox" name="sphere.%{spellSphere}" value="%{spellSphere}" checked="checked"></td><td>%{spellSphere}</td></table></td>'))]
	};{
		[sphereInput = concat(sphereInput,strformat('<td><table border=0><td><input type="checkbox" name="sphere.%{spellSphere}" value="%{spellSphere}"></td><td>%{spellSphere}</td></table></td>'))]
	}]
	[loopCount = loopCount + 1]
	[if(loopCount > 4): sphereInput = concat(sphereInput,strformat('</tr><tr>'))]
	[if(loopCount > 4): loopCount = 0]
}]
[h: sphereInput = concat(sphereInput,strformat('</select></td></tr></table>'))]

[h: textInputSize = '50']
[h,if(newEntry):
	nameInput = strformat('<td><b>Name</b></td><td><input type="text" name="name" size="" maxlength="" value="%{name}"></td>');
	nameInput = strformat('<td><b>Name:</b></td><td><i>%{name}</i><input type="hidden" name="name" value="%{name}"></td>')]
[h: nameInput = strformat('<td><b>Name</b></td><td><input type="text" name="name" size="" maxlength="" value="%{name}"></td>')]

[h: magicTypeInput = strformat('<th>Type:</th><td><i>%{magicType}</i><input type="hidden" name="magicType" value="%{magicType}"></td>')]

<!-- text boxes ->
[h: levelSpellInput =	strformat('<td><b>Level</b></td><td><input type="text" name="levelSpell" size="10" maxlength="" value="%{levelSpell}"></td>')]
[h: rangeInput =	strformat('<td><b>Range</b></td><td><input type="text" name="range" size="%{textInputSize}" maxlength="" value="%{range}"></td>')]
[h: durationInput =	strformat('<td><b>Duration</b></td><td><input type="text" name="duration" size="%{textInputSize}" maxlength="" value="%{duration}"></td>')]
[h: areaofeffectInput =	strformat('<td><b>AOE</b></td><td><input type="text" name="areaofeffect" size="%{textInputSize}" maxlength="" value="%{areaofeffect}"></td>')]
[h: casttimeInput = 	strformat('<td><b>Cast time</b></td><td><input type="text" name="casttime" size="%{textInputSize}" maxlength="" value="%{casttime}"></td>')]
[h: savingthrowInput = 	strformat('<td><b>Save</b></td><td><input type="text" name="savingthrow" size="%{textInputSize}" maxlength="" value="%{savingthrow}"></td>')]

<!-- check boxes ->
[h, if(verbal): isChecked = strformat('checked="checked"'); isChecked='']
[h: verbalInput = 	strformat('<table><td><b>Verbal</b></td><td><input type="checkbox" name="verbal" value="true" %{isChecked}></td></table>')]

[h, if(somatic): isChecked = strformat('checked="checked"'); isChecked='']
[h: somaticInput = 	strformat('<table><td><b>Somatic</b></td><td><input type="checkbox" name="somatic" value="true" %{isChecked}></td></table>')]

[h, if(material): isChecked = strformat('checked="checked"'); isChecked='']
[h: materialInput = 	strformat('<table><td><b>Material</b></td><td><input type="checkbox" name="material" value="true" %{isChecked}></td></table>')]

[h, if(reversible == 1): isChecked = strformat('checked="checked"'); isChecked='']
[h: reversibleInput = 	strformat('<table><td><b>Reversible</b></td><td><input type="checkbox" name="reversible" value="true" %{isChecked}></td></table>')]

[h: deleteInput = 	strformat('<table><td><b>Delete?</b></td><td><input type="checkbox" name="delete" value="true"></td></table>')]

<!-- textarea box -->
[h: descriptionInput = strformat('<textarea rows="20" cols="80" name="description">%{description}</textarea>')]


[frame("EditSpellFrame",'width=700; height=1200; '): {
<html>
<head>
<link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND>
<meta name="input" content="true">
</head>
<body>

<form method="json" name="editSpellInput" action="[r:macroLinkText('editFormParse@Lib:Spells:Macros',"none")]">
<table align=left border=0 cellpadding=1>
	<tr><table>[r: nameInput]</table></tr>
	<tr><table>[r: magicTypeInput][r: levelSpellInput][r: schoolInput]</table></tr>
	[r, if(magicType == 'Divine'): "<tr>"+sphereInput+"</tr>"]
	<table>
	<tr>[r: rangeInput]</tr>
	<tr>[r: durationInput]</tr>
	<tr>[r: areaofeffectInput]</tr>
	<tr>[r: casttimeInput]</tr>
	<tr>[r: savingthrowInput]</tr>
	</table>
	<tr><table><td>[r: verbalInput]</td><td>[r: somaticInput]</td><td>[r: materialInput]</td><td>[r:reversibleInput ]</td></table></tr>
	<tr><td>[r: descriptionInput]</td></tr>
	<tr><td align=right>[r: deleteInput]</td></tr>
	<tr><td align=center><input type="submit"  name="Save" value="Save"> </input></td></tr>
</table>
	[r:strformat('<input type="hidden" name="viewLevelSpell" value="%{viewLevelSpell}">')]
	[r:strformat('<input type="hidden" name="newEntry" value="%{newEntry}">')]
</form>

</body>
</html>
}]
