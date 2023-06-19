[h: finishingMacro = getStrProp(arg(0),"finishingMacro","Reward_EXP")]

<!-- This will find ALL PC tokens on any map in the campaign and move it to the currently selected token -->
[h: cond = json.set("{}", "pc", 1)]
[h: pcTokensList = ""]
[h: ids = getTokens("json", cond)]
[h,foreach(id, ids,""): pcTokensList = json.set(pcTokensList,id,json.set("{}","name",getName(id),"tokenID",id))]

[h: assert(!json.isEmpty(pcTokensList),"No PC tokens on current map.",0)]

[h: checkBoxForm = "<table border=1 cellpadding=5 width=100% valign=center><caption>PC Tokens</caption><table border=1 valign=center width=100% cellpadding=5><caption>Select PCs</caption>"]

[h: count = 0]
[h: loopCount = 1]
[h: checkBoxForm = concat(checkBoxForm,strformat("<tr>"))]
[foreach(pc,pcTokensList,""), code :{
	[h: pcJSON = json.get(pcTokensList,pc)]
	[h: pcName = json.get(pcJSON,"name")]
	[h: tokenID = json.get(pcJSON,"tokenID")]
	[h: checkBoxForm = concat(checkBoxForm,strformat("<td><table border=0><td>%{pcName}</td><td><input type='checkbox' name='tokenID_%{tokenID}' value='%{tokenID}'></td></table></td>"))]

	[h: loopCount = loopCount + 1]
	[h,if(loopCount>=5):checkBoxForm = concat(checkBoxForm,strformat("</tr><tr>"))]
	[h,if(loopCount>=5):loopCount = 1]

	[h: count = count + 1]

}]
[h: checkBoxForm = concat(checkBoxForm,strformat("</tr></table></table>"))]

[h: processorLink = macroLinkText("getPCSelectList_formProcess@this", "none")]

[frame("getPCSelectList","width=600;height=400"): {
<html>
<body>

<form action="[r:processorLink]" method="json">
<input type="hidden" name="finishingMacro" value="[r: finishingMacro]">

	[r: checkBoxForm]

<input type="submit" name="myForm_btn" value="Okay">
</form>

</body>
</html>
}]