[h: currentSelections = getSelected()]
[h: deselectTokens()]
[h, if(listCount(currentSelections)>1): primaryID = listGet(currentSelections,0);primaryID = currentSelections)]

[h: switchToken(primaryID)]
[h: setPropertyType("Monster",primaryID)]

[h: status=input(
	"HP/HD/AC |Main| | TAB", 

	"myHP|"+HP+"|Total Hit Points",
	"HD|"+HD+"|Hit Dice",
	"myTHACO|"+THACO+"|THAC0 (roll to hit AC 0)",
	"AC|"+AC+"|Armor Class",
	"Movement|"+Movement+"|Move Rate",
	"SD|"+SD+" | Special Defenses",
	"SA|"+SA+" | Special Attack",
	"MR|"+MR+" | Magic resistances",
	"Size|"+Size+"|Size of Creature",

	"seperator|<html><b>--- Hit point calculation ---</b></html>||LABEL|SPAN=TRUE",
	"rollHP|1|Roll HP based on HD (do not use this if you want to specify HP).|CHECK",

	"seperator|<html><b>--- Experience ---</b></html>||LABEL|SPAN=TRUE",
	"XP|"+XP+"|Experience Reward",

	"Save Values | Saves | | TAB", 
	"manualSaves| 0 | Manually set saves (if not set set based on HD when initialized).|CHECK",
	"aSave|"+getStrProp(save0,"save")+"|"+getStrProp(save0,"name")+"|TEXT|WIDTH=2", 
	"bSave|"+getStrProp(save1,"save")+"|"+getStrProp(save1,"name")+"|TEXT|WIDTH=2", 
	"cSave|"+getStrProp(save2,"save")+"|"+getStrProp(save2,"name")+"|TEXT|WIDTH=2", 
	"dSave|"+getStrProp(save3,"save")+"|"+getStrProp(save3,"name")+"|TEXT|WIDTH=2", 
	"eSave|"+getStrProp(save4,"save")+"|"+getStrProp(save4,"name")+"|TEXT|WIDTH=2", 

	"Treasure rewards found on NPC| Treasure| | TAB", 
	"seperator|<html><b>--- Treasure Generated on NPC During Initilization  ---</b></html>||LABEL|SPAN=TRUE",
	"Treasure_Type | " + Treasure_Type + " | Treasure Found (can use rolls in value)| PROPS"
)]
[h:abort(status)]

[h:findID = strfind(string(getProperty("HD",primaryID)),"d")]
[h,if(getFindCount(findID)!=0):assert(0,"Hit dice needs to be 0 thru 20 or 1+1, 1-1, 5+6, 9-4 etc...")]
[h: askedTHACOAlready = 0]

[h: fixedAC = getProperty("AC",primaryID)]
[h, if(!isNumber(fixedAC)), code :{
	[h: status=input (
		strformat('fixedAC | %{fixedAC} | AC is not a number, set a proper SINGLE AC value | TEXT | WIDTH=15')
	)]
	[h:abort(status)]
	[h: setProperty("Armor Class",getProperty("AC",primaryID),primaryID)]
	[h: setProperty("AC",fixedAC,primaryID)]
}]

[h: fixedXP = eval(string(getProperty("XP",primaryID)))]
[h, if(!isNumber(fixedXP)), code :{
	[h: status=input (
		strformat('fixedXP | %{fixedXP} | Experience value is not a number, set a proper value | TEXT | WIDTH=15')
	)]
	[h:abort(status)]
	[h: setProperty("XP",fixedXP,primaryID)]
}]

[h: fixedTHACO = getProperty("THACO",primaryID)]
[h, if(!isNumber(fixedTHACO)), code :{
	[h: status=input (
		strformat('fixedTHACO | %{fixedTHACO} | THACO value is not a number, set a proper value | TEXT | WIDTH=15')
	)]
	[h:abort(status)]
	[h: myTHACO = fixedTHACO]
	[h: setProperty("THACO",fixedTHACO,primaryID)]
}]

[h, foreach(id, currentSelections, ""), code :
{
	[h: assert(!isNumber(id), "Maptools Bug: Token ID corrupted. We cannot use this token. Copy it to new token if you want to use this token and a new ID will be created.",0)]
	[h: assert(!startsWith("Lib:",getName(id)),"You cannot initialize the Library tokens!",0)]

	[h: setProperty("NPC_Initialized",1,id)]

	[if(id != primaryID), code : {
		[h: setPropertyType("Monster",id)]
		[h: copyProperties(primaryID,id)]
	};{
	}]

	[h: 'DISABLED, assume the DM is using copy to make the tokens which properly names them']
	[h: 'npcNameUnique = getUnusedName(myTokenName,id)']
	[h: 'setName(npcNameUnique,id)']

	[h: tt = getProperty("Treasure_Type",id)]
	[h: tr = getProperty("Treasure",id)]
	[count(countStrProp(tt),""), code :{
		[h: coinType = indexKeyStrProp(tt, roll.count)]
		[h: coinRoll = getStrProp(tt, coinType, 0)]
		[h: reward = eval(string(coinRoll))]
		[h: tr = setStrProp( tr, coinType, reward) ]
	}]
	[h: setProperty("Treasure",tr,id)]

	[h: NPC_CalcHPandLEVEL(strformat('myID=%{id}; rollHP=%{rollHP};'))]


	[h, if(!rollHP), code: {
		[h, if (isNumber(myHP)): 
			manualHP = myHP;
			manualHP = eval(myHP)]
		[h: setProperty("HP",manualHP,id)]
		[h: setProperty("MaxHP",manualHP,id)]
		<b>[r: getName(id)]</b> manual hitpoint calculation for <i>[r: getProperty("HP",id)]</i> hitpoints.<br>
	};{}]

	[h: thacoTableEntry = table("THACO_Monster",getProperty("Level",id))]
	[h, if(primaryID == id && myTHACO>thacoTableEntry && !askedTHACOAlready), code :{
		[h: status=input(
			"seperator|<html><b>--- THACO Oddity ---</b></html>||LABEL|SPAN=TRUE",
			strformat("seperator|<html>Configured THACO <b>%{myTHACO}</b> is worse than calculated THACO based on HD</html>||LABEL|SPAN=TRUE"),
			strformat("seperator|<html>Calculated THACO based on HD is <b>%{thacoTableEntry}</b></html>||LABEL|SPAN=TRUE"),
			strformat("keepNewTHACO| 1 | Use the HD calculated THACO, %{thacoTableEntry}, instead? |CHECK")
		)]
		[h:abort(status)]
		[h, if(keepNewTHACO): myTHACO = thacoTableEntry]
		[h, if(keepNewTHACO): setProperty("THACO",myTHACO,id)]
		[h: askedTHACOAlready = 1]
	};{}]

	[h, if(primaryID == id && manualSaves), code :{
		[h: save0 = setStrProp(save0,"save",myaSave)]
		[h: save1 = setStrProp(save1,"save",mybSave)]
		[h: save2 = setStrProp(save2,"save",mycSave)]
		[h: save3 = setStrProp(save3,"save",mydSave)]
		[h: save4 = setStrProp(save4,"save",myeSave)]
	};{}]
	[h, if(primaryID == id && !manualSaves), code: {
		[h: saveTableEntry = table("Monster_Saves",getProperty("Level"))]
		[h: save0 = setStrProp(save0,"save",indexValueStrProp(saveTableEntry,0))]
		[h: save1 = setStrProp(save1,"save",indexValueStrProp(saveTableEntry,1))]
		[h: save2 = setStrProp(save2,"save",indexValueStrProp(saveTableEntry,2))]
		[h: save3 = setStrProp(save3,"save",indexValueStrProp(saveTableEntry,3))]
		[h: save4 = setStrProp(save4,"save",indexValueStrProp(saveTableEntry,4))]
	};{}]

	[h: setProperty("THACO",myTHACO,id)]

	[H, token(id): bar.Health=getProperty("HP",id)/getProperty("MaxHP",id)]
	[h: setState("Dying", 0,id)]
	[h: setState("NPCDead", 0,id )]

	[h: bMacro = strformat("[h: args  = 'myID='+currentToken()+';']")]

	[h: command=encode(bMacro+"[h: NPC_Initiative(args)]")]
	[h,if( !hasMacro("Roll Initiative",id) ): 
			createMacro("Roll Initiative", decode(command), strformat('color=olive; fontColor=white; sortBy=1; playerEditable=0; group=0. Combat; minWidth=100;'),";",id)]

	[h: command=encode(bMacro+"[h: PC_Attack(args)]")]
	[h,if(!hasMacro("Attack",id)):createMacro("Attack", decode(command), "color=yellow; fontColor=black; sortBy=2; playerEditable=0; group=0. Combat; minWidth=100;",";",id)]
	
	[h: command=encode(bMacro+"[h: HP_Adjust(args)]")]
	[h,if(!hasMacro("Health",id)):createMacro("Health",  decode(command),"color=red; fontColor=black; sortBy=3; playerEditable=0; group=0. Combat; minWidth=100;",";",id)]

	[h: command=encode(bMacro+"[h: NPC_AbilityCheck(args)]")]
	[h,if(!hasMacro("Ability Check",id)):createMacro("Ability Check",  decode(command), "color=blue; fontColor=white; sortBy=5; playerEditable=0; group=0. Combat; minWidth=100;",";",id)]

	[h: command=encode(bMacro+"[h: DO_Save(args)]")]
	[h,if(!hasMacro("Save",id)):createMacro("Save",  decode(command), "color=navy; fontColor=white; sortBy=6; playerEditable=0; group=0. Combat; minWidth=100;",";",id)]

	[h: command=encode(bMacro+"[macro('Learn_Memorize_Menu@Lib:Spells'):args]")]
	[h: macroName = "Study/Prayer"]
	[h,if(!hasMacro(macroName,id)):createMacro(macroName,decode(command), "color=purple; fontColor=white; sortBy=7; playerEditable=0; group=0. Combat; minWidth=100;",";",id)]

	[h,if(!hasMacro("Sheet",id)):createMacro("Sheet", bMacro+"[h: NPC_Sheet(args)]", "color=orange; fontColor=black; sortBy=1; playerEditable=0; group=1. Creature; minWidth=100;",";",id)]
	[h,if(!hasMacro("Edit",id)):createMacro("Edit", bMacro+"[h: NPC_EDIT(args)]", "color=orange; fontColor=black; sortBy=2; playerEditable=0; group=1. Creature; minWidth=100;",";",id)]


	[H: CRLF = decode("%0D%0A")]﻿
	[h: timeStamp = getTimeStamp()]
	[H, token(id):  setGMNotes(strformat("%{timeStamp} LOG: INITIALIZED%{CRLF}"))]

	[broadcast(getName()+" initialized.<br>","gm")]
}]

[h: selectTokens(currentSelections,0,",")]