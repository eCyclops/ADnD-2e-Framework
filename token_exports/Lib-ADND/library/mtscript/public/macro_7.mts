[h: mySelected = getStrProp(arg(0),"mySelected")]
[h: assert(!(mySelected==''),"You have to select ONE token for the teleport location of the PCs."+getMacroName()+"@"+getMacroLocation(),0)]

<!-- This will find ALL PC tokens on any map in the campaign and move it to the currently selected token -->
[h: activeId = mySelected ]
[h: assert(listCount(mySelected)==1, "You have to select ONE token for the teleport location of the PCs.",0)]

[h: currentMap = getCurrentMapName()]
[h: cond = json.set("{}", "pc", 1)]
[h: pcTokensToTeleport = ""]
[h: allMapNames = getVisibleMapNames()]
[foreach(aMap,allMapNames,""),code: {
	[h: setCurrentMap(aMap)]
	[h: ids = getTokens("json", cond)]
	[h,foreach(id, ids,""): pcTokensToTeleport = json.set(pcTokensToTeleport,id,json.set("{}","name",getName(id),"map",aMap,"tokenID",id))]
}]
[h:setCurrentMap(currentMap)]

[h: checkBoxForm = "<table border=1 cellpadding=5 valign=center width=100%><caption>Teleport Player Tokens</caption><table border=1 cellpadding=5 valign=center width=100%><caption>Select PCs To Teleport</caption>"]

[h: count = 0]
[h: loopCount = 1]
[h: checkBoxForm = concat(checkBoxForm,strformat("<tr>"))]
[foreach(pc,pcTokensToTeleport,""), code :{
	[h: pcJSON = json.get(pcTokensToTeleport,pc)]
	[h: pcName = json.get(pcJSON,"name")]
	[h: pcMap = json.get(pcJSON,"map")]
	[h: tokenID = json.get(pcJSON,"tokenID")]
	[h: checkBoxForm = concat(checkBoxForm,strformat("<td><table border=0><td>%{pcName} from %{pcMap}</td><td><input type='checkbox' name='tokenID_%{tokenID}' value='%{tokenID}'></td></table></td>"))]

	[h: loopCount = loopCount + 1]
	[h,if(loopCount>=5):checkBoxForm = concat(checkBoxForm,strformat("</tr><tr>"))]
	[h,if(loopCount>=5):loopCount = 1]

	[h: count = count + 1]

}]
[h: checkBoxForm = concat(checkBoxForm,strformat("</tr></table></table>"))]

[h: processorLink = macroLinkText("Teleport_gatherTokenList_formProcess@this", "none")]

[frame("Teleport_gatherTokenList","width=600;height=400"): {
<html>
<body>

<form action="[r:processorLink]" method="json">
<input type="hidden" name="mySelected" value="[r: mySelected]">

	[r: checkBoxForm]

<input type="submit" name="myForm_btn" value="Okay">
</form>

</body>
</html>
}]