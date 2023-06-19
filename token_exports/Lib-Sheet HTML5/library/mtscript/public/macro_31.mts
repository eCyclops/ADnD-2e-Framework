[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: rollHP = getStrProp(macro.args,"rollHP")]
[h: HDString = getProperty("HD",myID)]

[h: HDMatchString = "\^(\\d+)([+\\-])?(\\d+d\\d+|\\d+)?\$"]

[h: locID = strfind(HDString,HDMatchString)]
[h, while(getFindCount(locID)<=0), code :{

	[h: status=input (
		strformat("seperator | <html><b>--- Invalid HitDice '%{HDString}'---</b></html> | | LABEL | SPAN=TRUE"),
		strformat("HDString | %{HDString} | Enter new HD value. (needs to be # or #-# or #+#) | TEXT | WIDTH=15")
	)]
	[h:abort(status)]
	[h: locID = strfind(HDString,HDMatchString)]
}]

[if(getFindCount(locID)>0),CODE :
{
	[h:numDice =  getGroup(locID, 1, 1)]

	<!-- this is a + or a minus -->
	[h:myHDModifier = getGroup(locID, 1, 2)]

	<!-- this is a value to add/subtract from hp -->
	[h:myHPAdjustment = getGroup(locID, 1, 3)]

	[h,if(myHDModifier == ""): myHPCalcRoll = string(numDice+"d8"); myHPCalcRoll=string(numDice)+"d8"+string(myHDModifier)+string(myHPAdjustment)]

	<!-- roll MaxHP value -->
	[h:setProperty("MaxHP",eval(myHPCalcRoll),myID)]

	<!-- never less than 1 HP -->
	[h,if(getProperty("MaxHP",myID) <= 0):setProperty("MaxHP",1,myID)]
	[h:setProperty("HP",getProperty("MaxHP",myID),myID)]

	<!-- calc effect level for stuff like save/combat tables 0-20 -->
	[h: myLevel = 0]
	[h: LevelAdjustment = 0]
	<!-- 1-4, 4-8 get +1 -->
	[h, if(isNumber(myHPAdjustment)): num=myHPAdjustment;num = -1]
	[h,while(num>0), code :{
		[h: num = num-4]
		[h: LevelAdjustment = LevelAdjustment+1]
	}]
	[h,if(myHPAdjustment != '' && isNumber(myHPAdjustment)), code :{
		[h,if(myHDModifier == '-'): myLevel = -LevelAdjustment)]
		[h,if(myHDModifier == '+'): myLevel = LevelAdjustment)]
	}]

	[h:myLevel = myLevel + numDice]
	[h,if(myLevel <0):myLevel = 0)]
	[h,if(myLevel >20):myLevel = 20)]

	[h:setProperty("Level", myLevel,myID)]
	[h: name = getName(myID)]
	[h: myHP = getProperty("HP",myID)]
	[h, if(rollHP), code :{
		[h: broadcast(strformat('Generated %{name} effective level is %{myLevel} and has %{myHP} hitpoints.<br>'),"gm")]
	};{
		[h: broadcast(strformat('Generated %{name} effective level is %{myLevel}.<br>'),"gm")]
	}]
};
{
	[h: broadcast("Unable to parse HD field. Should be 1-20 or 1-1 or 1+1 or 3-1 or 5+5<br>","gm")]
}]	

