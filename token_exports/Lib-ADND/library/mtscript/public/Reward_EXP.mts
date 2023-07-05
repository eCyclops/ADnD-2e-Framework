[h: pcList = getStrProp(arg(0),"pcList","")]
[h: assert(!(pcList==''),"pcList is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: pcCount = listCount(pcList)]
[h: pcNames = ""]
[h, foreach(id,pcList,""): pcNames = listAppend(pcNames,getName(id))]

[h: expList = getLibProperty("LOG_EXP","Lib:ADND")]

[h: totalEXP = 0]
[foreach(Item,expList,""), code : {
	Name:{json.get(item,"Name")}<br>
	XP:{json.get(item,"EXP")}<br>
	[h: totalEXP = totalEXP + json.get(item,"EXP")]
}]
Total EXP From Adventure & Kills LOG  = [r: totalEXP].<br>

[h: perUserEXP = round(totalEXP/pcCount)]

[h:status = input(
	strformat("seperator|<html><b>--- PCs:%{pcNames}:%{pcCount} ---</b></html> | | LABEL | SPAN=TRUE"),
	strformat("junkVar|%{totalEXP} | Total EXP from Kills | LABEL"),
	strformat("perUserEXP|%{perUserEXP} | EXP per user for adventure & kills"),
	strformat("perUserBonus| 0 | Additional EXP per user?")
)]
[H: abort(status)]
[h: pcTotalEXP = perUserEXP + perUserbonus]
[h, foreach(pcToken,pcList,""), code :{
	[h: owners = getOwners(",",pcToken)]
	[h: tokenName = getName(pcToken)]

	[h:currentEXP = getProperty("EXP_Awarded",pcToken)]
	[h, if (currentEXP == ""): currentEXP = 0]
	[h: awardedEXP = currentEXP + pcTotalEXP]
	[h: setProperty("EXP_Awarded",(awardedEXP),pcToken)]
	[h:realXP = getProperty("XP",pcToken)]
	[if(isNumber(realXP)), code :{
		[h: setProperty("XP",(realXP+pcTotalEXP),pcToken)]
		[h: newXP = realXP + pcTotalEXP]
	};{
		[h: newXP = realXP]
		[h: errorTxt = getName(pcToken)+strformat(" XP field isn't a number (%{realXP}).<br>")]
		[h: broadcast(errorTxt,"gm")]

	}]
	[h: logIt(strformat("EXP_Awarded: %{pcTotalEXP}, new Total: %{newXP}"),pcToken)]

	[h: gmessg = strformat("%{tokenName} gained %{pcTotalEXP} experience, total XP %{newXP}. Lifetime awarded by DM is %{awardedEXP}.<br>")]
	[h: broadcast(gmessg,"gm")]

	[h: messg = strformat("%{tokenName} gained %{pcTotalEXP} experience, total XP %{newXP}. <br>")]
	[h,if(owners != ''): broadcast(messg,owners)]
}]

[h: curHistory = getLibProperty("History_EXP","Lib:ADND")]
[h: setLibProperty("History_EXP",curHistory+totalEXP,"Lib:ADND")]
[h: setLibProperty("LOG_EXP","","Lib:ADND")]

