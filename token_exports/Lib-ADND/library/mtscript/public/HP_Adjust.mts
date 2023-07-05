[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]
[h: sheetPage = getStrProp(arg(0),"page","Combat")]

[h: healthAdjustment = getStrProp(arg(0),"healthAdjustment",0)]

[h: myHP = getProperty("HP",myID)]
[h: myMaxHP = getProperty("MaxHP",myID)]
[h: myName = getName(myID)]

[h, if(healthAdjustment == 0), code :{
	[h:status = input(
		"seperator|<html><b>--- Adjust Your Health ---</b></html>||LABEL|SPAN=TRUE",
		"healthAdjustment| 0 | Enter adjustment"
	)]
	[H: abort(status)]
}]

[h: styleTxt = getLibProperty("styleTxt", "Lib:ADND")]

[h: myHP = myHP + healthAdjustment]
[h, if(myHP > myMaxHP): Overhealed = myHP - myMaxHP;Overhealed = 0)]
[h, if(myHP > myMaxHP): myHP = myMaxHP)]

[h, if(isPC(myID)), code :{
	[token(myID): bar.HealthPC=myHP/myMaxHP]
};{
	[token(myID): bar.Health=myHP/myMaxHP]
}]

[h: setProperty("HP",myHP, myID)]

[h, if(healthAdjustment >0):healthModtxt = "recovers";healthModtxt = "loses")]
[h, if(healthAdjustment >0):healthModcolor = "green";healthModcolor = "red")]

[h: healthAdjustment = abs(healthAdjustment)]

[h: outTxt = strformat("<body bgcolor=%{healthModcolor}><table %{styleTxt} border=1 cellpadding=0 width=150><tr><td align=center bgcolor=%{healthModcolor}><font color=white>%{myName} %{healthModtxt} <b>%{healthAdjustment}</b> hitpoints.</td></tr><tr><td  bgcolor=%{healthModcolor}><font color=white>")]

[h: outTxt = concat(outTxt,strformat("<table border=1 cellpadding=1 width=100%>"))]
[h: outTxt = concat(outTxt,strformat("<tr><td bgcolor=%{healthModcolor}><font color=yellow><b>Current HP</b></font></td><td align=right bgcolor=%{healthModcolor}><font color=yellow><b>Max HP</b></font></td></tr>"))]
[h: outTxt = concat(outTxt,strformat("<tr><td bgcolor=%{healthModcolor}><font color=white>%{myHP}</font></td><td align=right bgcolor=%{healthModcolor}><font color=white>%{myMaxHP}</font></td></tr>"))]
[h, if(Overhealed > 0):outTxtDISABLED = concat(outTxt,strformat("<tr><td bgcolor=%{healthModcolor}><font color=lime>Overhealed</font></td><td  align=right bgcolor=%{healthModcolor}><font color=lime>+%{Overhealed}</font></td></tr>"))]
[h: outTxt = concat(outTxt,strformat("</table></font></td></tr><tr><td  bgcolor=%{healthModcolor}><font color=white>"))]


[h, if(myHP > 0), code: {
	[h, if(getState("Dying",myID) || getState("Dead",myID) || getState("NPCDead",myID)):outTxt = concat(outTxt,strformat("%{myName} recovers from near-death.<br>"))]
	[h: setState("Dying", 0,myID)]
	[h: setState("Dead", 0,myID)]
	[h: setState("NPCDead", 0,myID)]
}]

[h: gmOUT = '']
[h, if(isPC(myID)), code :{
	[h,if(myHP <=0 && myHP >=-10): setState("Dying", 1,myID)]
	[h,if(myHP <=0 && myHP >=-10):outTxt = concat(outTxt,strformat("%{myName} is dying!"))]

	[h,if(myHP <=-10):setState("Dying", 0,myID)]
	[h,if(myHP <=-10):setState("Dead", 1,myID)]
	[h, if(myHP <=-10):outTxt = concat(outTxt,strformat("%{myName} is dead!"))]

};{
	[if(myHP <=0), code :{
		[h: setState("NPCDead", 1,myID)]
		[LOG_KILL(myID)]
		[h: gmOUT = concat(gmOUT,strformat("%{macro.return}"))]
		[h: outTxt = concat(outTxt,strformat("%{myName} is dead!"))]
		[h: npcSheetFrame = strformat('NPC:'+getName(myID)+':%{myID}')]
		[h: closeFrame(npcSheetFrame)]
		[h: setTokenDrawOrder(-1000000, myID)]
	};{
		[h: setTokenDrawOrder(0, myID)]
	}]
}]

[h: outTxt = concat(outTxt,strformat("</font></td></tr></table>"))]

[r: showIt(outTxt,myID,"health", 0)]
[r: showIt(gmOUT,myID,"gm", 0)]

[h: pcSheetFrame = strformat('PC:'+getName(myID)+':%{myID}')]
[if(isFrameVisible(pcSheetFrame)), code :{
	[macro("CharSheet@Lib:ADND"):strformat("myID=%{myID}; Page=%{sheetPage};")]
};{}]


[h: npcSheetFrame = strformat('NPC:'+getName(myID)+':%{myID}')]
[h, if(isFrameVisible(npcSheetFrame)): 
	NPC_Sheet(strformat("myID=%{myID};"))]

[h: updateTrackerLink = macroLinkText("Auto Refresh Tracker@Lib:Tracker","none")]
[h: execLink(updateTrackerLink, 1, "all")]
