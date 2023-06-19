[h: tokid =json.get(arg(0),0)]

[h: tName = getName(tokid)]
[h: tXP = getProperty("XP",tokid)]
[h: tTreasure = getProperty("Treasure",tokid)]

[h: lEXP = getLibProperty("LOG_EXP","Lib:ADND")]

[h: lTreasure = getLibProperty("LOG_Treasure","Lib:ADND")]
[h: lootString = ""]
[h, count(countStrProp(tTreasure),""), code :{
	[h: coinType = indexKeyStrProp(tTreasure,roll.count)]
	[h: coinRoll = getStrProp(tTreasure,coinType,0)]
	[h: coinRollLog = getStrProp(lTreasure,coinType,0)]
	[h: rewardLog = coinRoll + coinRollLog]
	[h: lTreasure = setStrProp(lTreasure,coinType,rewardLog)]
	[h: lootString = lootString + coinRoll+ " "+lower(coinType)]
	[h, if(roll.count != countStrProp(tTreasure)):lootString = lootString +", "]
}]
[h: setLibProperty("LOG_Treasure",lTreasure,"Lib:ADND")]

[h: itemStore = json.set("{}","Name",tName,"EXP",tXP)]
[h,if(tXP != '' && tXP>0): setLibProperty("LOG_EXP", json.append(lEXP,itemStore),"Lib:ADND")]

[h: outTxt = '']
[h,if(tXP != ''): outTxt = concat(outTxt,strformat("<br><b>The party has earned <i>%{tXP}</i> experience.</b>"));]
[h,if(lootString!=''): outTxt = concat(outTxt,strformat("<br><b>The party has earned <i>%{lootString}</i> treasure.</b>"));]

[h: logIt(strformat("KILLED %{tName} for %{tXP} party experience."), tokid)]

[h: macro.return = outTxt]


