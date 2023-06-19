<!-- Monster Hit Table
	Monsters use Hit Dice instead of Levels
	These Hit Dice can have modifiers, + or -
	Thus, if we are dealing with a monster, we need to parse the "Level" info more -->

[h: theLevel = arg(0)]
[h: theRoll = arg(1)]
[h: theMod = arg(2)]
[h: ACResult = 999]

<!-- Base AC result -->

[h, if(theRoll <= 19): baseACResult = 21 - theRoll]
[h, if(theRoll == 20): baseACResult = -4]
[h, if(theRoll > 20): baseACResult = 16 - theRoll]

<!--Attack Table for HD 1 -->

[h, if(theLevel == 1), CODE: 
	{[if(theMod < 0):ACResult = baseACResult - 1]
	  [if(theMod == 0): ACResult = baseACResult - 2]
	  [if(theMod >= 1): ACResult = baseACResult -3]}]

<!--Attack Table for HD 2+ to 4+ -->

[h, if(theLevel >= 2 && theLevel <= 4): ACResult = baseACResult -2 - theLevel]

<!--Attack Table for HD 5+ -->

[h, if(theLevel == 5): ACResult = baseACResult -6]

<!--Attack Table for HD 6+ to 8+ -->

[h, if(theLevel >= 6 && theLevel <= 8): ACResult = baseACResult -1 - theLevel]

<!-- Attack Table for HD 9+ -->

[h, if(theLevel ==9): ACResult = baseACResult -9]

<!-- Attack Table for HD 10+ to 12+ -->

[h, if(theLevel >=10 && theLevel <= 12): ACResult = baseACResult - theLevel ]

<!-- Attack Table for HD 13+ -->

[h, if(theLevel == 13): ACResult = baseACResult -12]

<!-- Attack Table for HD 14+ and 15+ -->

[h, if(theLevel == 14 || theLevel == 15): ACResult = baseACResult -13]

<!-- Attack Table for HD 16+ and greater -->

[h, if(theLevel >= 16): ACResult = baseACResult - 14]

<!-- [h: ACResult = if(ACResult < -10,-10,ACResult)] -->

[r: ACResult]