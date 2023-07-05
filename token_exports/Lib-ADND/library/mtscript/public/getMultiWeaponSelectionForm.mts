[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: myName = getName(myID)]
[h: thisFrameName = "Multiple Weapon Selection"]

[h: formTableText = "<table align=center><tr><td>"]

[h: checkBoxForm = strformat("<table border=0 cellpadding=5 align=center><caption>Weapon Selection</caption><table border=0 cellpadding=1 align=center><caption>Select Attacks for %{myName}</caption>")]

[H, token(myID): myWeapons = getMatchingProperties("weapon..*")]
[h: myWeaponsSorted = '']
[h: myWeaponsJSON = '']
[h, foreach(prop,myWeapons,""), code :{
	[weaponProp = getProperty(prop,myID)]
	[weaponName = getStrProp(weaponProp,"name")]
	[weaponID = getStrProp(weaponProp,"weaponID")]
	[storeThis = json.set("{}","weaponName",weaponName,"weaponID",weaponID,"weaponProp",weaponProp)]
	[myWeaponsJSON = json.set(myWeaponsJSON,weaponName,storeThis)]
}]
[h: myWeaponsSorted = json.sort(json.fields(myWeaponsJSON, 'json'))]

[h: lastSet = getProperty("LastMultiAttack",myID)]

[h: loopCount = 1]
[h: checkBoxForm = concat(checkBoxForm,strformat("<tr><table border=1 cellpadding=0><tr>"))]
[h, foreach(name,myWeaponsSorted,""), code :{
	[h: weaponName = name]
	[h: thisJSON = json.get(myWeaponsJSON,name)]
	[h: weaponProp = json.get(thisJSON,"weaponProp")]
	[h: weaponID = json.get(thisJSON,"weaponID")]

	[h, if(listContains(lastSet, weaponID)): isChecked = "checked=checked"; isChecked = ""]
	[h, if(listCount(lastSet) == 0): isChecked = "checked=checked"]

	[h: checkBoxForm = concat(checkBoxForm,
		strformat("<td><table border=0 cellpadding=0><td><input type='checkbox' name='weapon.%{weaponID}' value='%{weaponName}' %{isChecked}></td><td>%{weaponName}</td></table></td>"))]

	[h: loopCount = loopCount + 1]
	[h,if(loopCount>=5):checkBoxForm = concat(checkBoxForm,strformat("</tr><tr>"))]
	[h,if(loopCount>=5):loopCount = 1]

}]
[h: checkBoxForm = concat(checkBoxForm,strformat("</tr></table></tr></table><i>Pick all the weapons you want to use with this attack.</i></table>"))]

[h: formTableText = concat(formTableText,strformat("</td></tr><tr><td align=center><input type='submit' name='myForm_btn' value='Done'></td></tr></table>"))]

[h: processorLink = macroLinkText("getMultiWeaponFormProcess@Lib:ADND", "none")]

[frame(thisFrameName,"width=400;height=400"): {
<html>
<head>
<title>[r: thisFrameName]</title>
<link rel="stylesheet" type="text/css" href="CharSheet_css@Lib:ADND">
</head>
<body>

<form action="[r:processorLink]" method="json">
<input type="hidden" name="myID" value="[r: myID]">

	[r: checkBoxForm]
	[r: formTableText]
</form>

</body>
</html>
}]

