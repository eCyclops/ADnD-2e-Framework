[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]
[h: selectedTokens = getStrProp(macro.args,"selectedTokens",myID)]

[h: checkBoxForm = "<table border=1 cellpadding=5><caption>First TIme Initialization</caption><table border=0 cellpadding=1 align=center><caption>Select Initial Attacks for NPC</caption>"]

[H:myWeapons = getMatchingLibProperties("weapon\\..*","Lib:MM")]
[h: myWeaponsSorted = '']
[h: myWeaponsJSON = '']
[h, foreach(prop,myWeapons,""), code :{
	[weaponProp = getLibProperty(prop,"Lib:MM")]
	[weaponName = getStrProp(weaponProp,"name")]
	[weaponID = getStrProp(weaponProp,"weaponID")]
	[storeThis = json.set("{}","weaponName",weaponName,"weaponID",weaponID,"weaponProp",weaponProp)]
	[myWeaponsJSON = json.set(myWeaponsJSON,weaponName,storeThis)]
}]
[h: myWeaponsSorted = json.sort(json.fields(myWeaponsJSON, 'json'))]

[h: loopCount = 1]
[h: checkBoxForm = concat(checkBoxForm,strformat("<tr><table border=1 cellpadding=0><tr>"))]
[h, foreach(name,myWeaponsSorted,""), code :{
	[h: weaponName = name]
	[h: thisJSON = json.get(myWeaponsJSON,name)]
	[h: weaponProp = json.get(thisJSON,"weaponProp")]
	[h: weaponID = json.get(thisJSON,"weaponID")]
	[h: checkBoxForm = concat(checkBoxForm,strformat("<td><table border=0 cellpadding=0><td><input type='checkbox' name='weapon.%{weaponID}' value='%{weaponName}'></td><td>%{weaponName}</td></table></td>"))]

	[h: loopCount = loopCount + 1]
	[h,if(loopCount>=5):checkBoxForm = concat(checkBoxForm,strformat("</tr><tr>"))]
	[h,if(loopCount>=5):loopCount = 1]

}]
[h: checkBoxForm = concat(checkBoxForm,strformat("</tr></table</tr></table><i>These attacks are sourced from Lib:MM, add/edit to that token for them to be listed here.</i></table>"))]

[h: processorLink = macroLinkText("NPC_Initialization_formProcess@this", "all")]

[frame("NPC_Initialize_FirstTime","width=400;height=800"): {
<html>
<body>

<form action="[r:processorLink]" method="json">
<input type="hidden" name="myID" value="[r: myID]">
<input type="hidden" name="selectedTokens" value="[r: selectedTokens]">

	[r: checkBoxForm]

<input type="submit" name="myForm_btn" value="Okay">
</form>

</body>
</html>
}]

