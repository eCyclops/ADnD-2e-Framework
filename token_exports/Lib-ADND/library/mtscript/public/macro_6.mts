[h: myID = getStrProp(arg(0),"myID")]
[h: sName = getStrProp(arg(0), "Name")]
[h: sSave = getStrProp(arg(0), "Save")]

[h: currentSelections = getSelected()]
[h: assert(!(myID=='' && !isGM()),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]
[h, if(listContains(currentSelections,myID) == 0): listInsert(currentSelections,0,myID)]
[h, if(myID != ''): currentSelections = myID]

[h: abilityList = "None, Dexterity, Constitution, Intelligence, Wisdom"] 

[h: styleTxt = getLibProperty("styleTxt_noColor", "Lib:ADND")]
[h: sColor = "#F5F6CE"]

[h: outTxt = ""]
[h: outTxt = concat(outTxt,strformat("<body bgcolor=%{sColor}>"))]
[h: outTxt = concat(outTxt,strformat("<table %{styleTxt}><tr><td nowrap>"))]

[h: outTxt = concat(outTxt,strformat("<table border=1 cellpadding=1 width=100%><caption>Save Check</caption>"))]
[h: outTxt = concat(outTxt,strformat("<tr><td><b>Name</b></td><td><b>Versus</b></td><td><b>Target</b></td><td><b>Roll</b></td><td><b>Result</b></td></tr>"))]


[foreach(id,currentSelections,""), code :{
	[h: switchToken(id)]
	
	[h:	setState("FailedSave",0,id)]
	[h: setState("Orange",0,id)]
	[h:	setState("Green",0,id)]

	[h: abilityID = 'None']
	[h, if(!isNPC(id)): 
		abilityInput = strformat("abilityID | %{abilityList} | Ability bonus to apply to this save | RADIO | SELECT=0 ORIENT=V VALUE=STRING");
		abilityInput = strformat("junkvar| NA | Ability Modifier | LABEL"),]

	[H: saveList = ""]
	[H,COUNT(5): saveList = listAppend(saveList, getStrProp(getProperty(strformat("save%{roll.count}"),id), "name"))]

	[h: modInput = strformat("saveAdjustment| 0 |Situational Save Modifier")]
	[h: overRideInput = strformat("overRide | 0 | Override d20 roll with 1-20 value")]
	[h: sepLine = strformat("seperator|<html><b>--- Override ---</b></html>||LABEL|SPAN=TRUE")]
	[h: selectSaveInput = strformat("saveID | %{saveList} | Select Save Type | LIST | SELECT=0")]

	[h, if(sName != "" && sSave == ""), code :{
		[h: saveID = listFind(saveList,sName)]
		[h: thisSaveProp = getProperty(strformat("save%{saveID}"),id)]
		[h: sSave = getStrProp(thisSaveProp,"save")]
	};{}]
	
	[h,if (sName != "" &&  sSave != "" ), code : {
		[h: status=input(
			strformat("junkvar|%{sName} (%{sSave}) | Save Versus| LABEL"),
			abilityInput,
			modInput,
			sepLine,
			overRideInput
		)]
		[h:abort(status)]
	};{
	[H: status = input(
		selectSaveInput,
		abilityInput,
		modInput,
		sepLine,
		overRideInput
	)]
	[H: abort(status)]
		[h: saveProp = getProperty(strformat("save%{saveID}"),id)]
		[h: sName = getStrProp(saveProp,"name")]
		[h: sSave = getStrProp(saveProp,"save")]
	}]

	[h, if(abilityID != 'None'), code :{
		[h: abilityMod = getStrProp(getProperty("Attribute_"+abilityID,id),"save adjustment",0)]
	};{
		[h: abilityMod = 0]
	}]

	[h: rolledSave = 1d20]
	[h,if(overRide>0 && overRide<=20):finalCheck=overRide;finalCheck = rolledSave+saveAdjustment+abilityMod]

	[h:saveRollToolTip = toolTipIt(strformat("1d20 + Modifiers + Ability Modifiers, %{rolledSave}+%{saveAdjustment}+%{abilityMod}=%{finalCheck}"),finalCheck)]

	[h,if(overRide > 0 && !isGM()):
		overRidedToolTip = toolTipIt( strformat("Dice roll overrode with %{overRide}") , "<font color=red>OVERRIDE</font>");
		overRidedToolTip = ""]

	[h: sColor = ""]
	[h: sResult = "BAZINGA"]

	[h, if((finalCheck)>=sSave), code : 
	{
		[h: sColor = "#4CC417"]
		[h: sResult = "SAVED!"]
	};
	{
		[h: sColor = "#CCCC00"]
		[h: sResult = "FAILED!"]
	}]

	[h, if (startsWith(sResult, "FAILED") && isNPC(id)):setState("FailedSave",1,id)]
	[h, if (startsWith(sResult, "FAILED") && isNPC(id)):setState("Orange",1,id)]
	[h, if (!startsWith(sResult, "FAILED") && isNPC(id)):setState("Green",1,id)]

	[h: myName = getName(id)]

	[h: outTxt = concat(outTxt,
		strformat("<tr bgcolor=%{sColor}><td>%{myName}</td><td>%{sName}</td><td align=center>%{sSave}</td><td align=center>%{overRidedToolTip}%{saveRollToolTip}</td><td>%{sResult}</td></tr>"))]
		
	[h: sSave = ""]
	[h: lastID = id]
	}]


[h: outTxt = concat(outTxt,strformat("</table>"))]
[h: outTxt = concat(outTxt,strformat("</td></tr></table></body>"))]

[h, if(isGM()): myID = lastID]
[r: showIt(outTxt,myID,"save",1)]
