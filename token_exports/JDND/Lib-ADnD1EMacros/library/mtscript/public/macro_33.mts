[h: dieRoll = getStrProp(arg(0),"attackRoll")]
[h: totalHitMod = getStrProp(arg(0),"totalHitMod")]
[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: characterClass = ""]
[h: characterLevel = ""]

[h: isMonster = hasProperty("MonsterSourceName", myID)]
[h: myName = getName(myID)]

[h, switch(isMonster), code:
	case 1: {
		[characterClass = listAppend(characterClass, "Monster")]
		[characterLevel = listAppend(characterLevel, getProperty("HD", myID))]
		[theMonsterLevel = getMonsterLevel(characterLevel)]
		[characterLevel = number(getStrProp(theMonsterLevel,"theLevel"))]
		[levelMod = number(getStrProp(theMonsterLevel,"theMod"))]
		};
	case 0: {
		[myCharacterDetails = getProperty("Character_Details", myID)]
		[characterClass = getStrProp(myCharacterDetails, "Class")]
		[characterClass = stringToList(characterClass, "/")]
		[characterLevel = getStrProp(myCharacterDetails, "Level")]
		[characterLevel = stringToList(characterLevel, "/")]
	} ]

[h: stunMessage = ""]
[h: hitMessage= ""]

[h: index = 0]
[h: size = listCount(characterClass)]
[h: myHitAC = 1000]

[h: attackRoll=dieRoll+totalHitMod]

[h: noClass=0]

[while (index<size, ""), CODE: {
    [h: separateClass = listGet(characterClass, index)]
    [h: separateLevel = number(listGet(characterLevel, index))]
    [h: index = index+1]

    [h, switch(separateClass), CODE:
       case "Ranger": { [hitAC = attackTable.fighter(number(separateLevel), attackRoll)]};
       case "Fighter": { [hitAC = attackTable.fighter(number(separateLevel), attackRoll)]};
       case "Paladin": { [hitAC = attackTable.fighter(number(separateLevel), attackRoll)]};

       case "Cleric": { [hitAC = attackTable.cleric(number(separateLevel), attackRoll)]};
       case "Druid": { [hitAC = attackTable.cleric(number(separateLevel), attackRoll)]};
       case "Monk": {
       	[hitAC = attackTable.cleric(number(separateLevel), attackRoll)]
       	[stunAC = hitAC + 5]
       	[killPercent = 1d100]
       	[killMod = separateLevel - 7]
       	[killMod = if(killMod < 0, 0, killMod)]
       	[killAC = killPercent - killMod]
       	[killMessage = if(killAC >= stunAC && killAC < 11, ' <strong>I rolled a '+killPercent+'%, so the target is killed if it has no better than AC '+killAC+".</strong>","")]
          [stunMessage = if(stunAC > 10, "", "If this was an open-hand attack, I would stun at AC " + stunAC + "." + killMessage)] };

       case "Magic-User": {
			[hitAC = attackTable.magic(separateLevel, attackRoll)]
			};
       case "Illusionist": {
			[hitAC = attackTable.magic(separateLevel, attackRoll)]
			};

       case "Thief": {
			[hitAC = attackTable.thief(separateLevel, attackRoll)]
			};
       case "Assassin": {
			[hitAC = attackTable.thief(separateLevel, attackRoll)]
			};

       case "Monster": {
       		[hitAC = attackTable.monster(separateLevel, attackRoll, levelMod)]
			};

       default: {
			[noClass=1]
			[hitAC = attackTable.fighter(0, attackRoll)]}]
    [h, if(hitAC < myHitAC): myHitAC = hitAC]
   } ]
[h, if(noClass): hitMessage = "Rolling as a Fighter.<br>" + hitMessage]
[h: hitMessage = hitMessage + "My roll of " + attackRoll + " (" + dieRoll + "+" + totalHitMod + ")"]
[h, if(myHitAC > 10): hitMessage=hitMessage+" missed<br>"; hitMessage=hitMessage+" would hit anything up to AC "+myHitAC+"<br>"]
[h: hitMessage] [h: stunMessage]

[h: returnValue = ""]
[h: returnValue = setStrProp(returnValue, "myLevel", characterLevel)]
[h: returnValue = setStrProp(returnValue, "hitMessage", hitMessage)]
[h: returnValue = setStrProp(returnValue, "stunMessage", stunMessage)]
[h: returnValue = setStrProp(returnValue, "myHitAC", myHitAC)]
[h: returnValue = setStrProp(returnValue, "monsterStat", characterClass)]

[macro.return = returnValue]