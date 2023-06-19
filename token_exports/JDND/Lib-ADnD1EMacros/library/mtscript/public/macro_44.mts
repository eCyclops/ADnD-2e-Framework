[nextLevel = getProperty("XPNeeded")]
[myXP = getProperty("XP")]
[if(myXP < nextLevel): abort(0)]

[nonProficient = -2]
[if(theLevel>0):proficientWeapons = 3 + ceil(divide(theLevel,3));proficientWeapons=1]

[switch(theLevel), code:
	case 1: {
		[nextLevel = 2000]
		[title = "Veteran"]
		[hitDice = 1]
		[hitDie = "d10"]
		[hitPoints = 0]
		[attacksPer = 1]
	}
	case 2: {
		[nextLevel = 4000]
		[title = "Warrior"]
		[hitDice = 2]
		[hitDie = "d10"]
		[hitPoints = 0]
		[attacksPer = 1]
	}
	case 3: {
		[nextLevel = 8000]
		[title = "Swordsman"]
		[hitDice = 3]
		[hitDie = "d10"]
		[hitPoints = 0]
		[attacksPer = 1]
	}
	case 4: {
		[nextLevel = 18000]
		[title = "Hero"]
		[hitDice = 4]
		[hitDie = "d10"]
		[hitPoints = 0]
		[attacksPer = 1]
	}
	case 5: {
		[nextLevel = 35000]
		[title = "Swashbuckler"]
		[hitDice = 5]
		[hitDie = "d10"]
		[hitPoints = 0]
		[attacksPer = 1]
	}
	case 6: {
		[nextLevel = 70000]
		[title = "Myrmidon"]
		[hitDice = 6]
		[hitDie = "d10"]
		[hitPoints = 0]
		[attacksPer = 1]
	}
	case 7: {
		[nextLevel = 125000]
		[title = "Champion"]
		[hitDice = 7]
		[hitDie = "d10"]
		[hitPoints = 0]
		[attacksPer = 1.5]
	}
	case 8: {
		[nextLevel = 250000]
		[title = "Superhero"]
		[hitDice = 8]
		[hitDie = "d10"]
		[hitPoints = 0]
		[attacksPer = 1.5]
	}
	case 9: {
		[nextLevel = 500000]
		[title = "Lord"]
		[hitDice = 9]
		[hitDie = "d10"]
		[hitPoints = 0]
		[attacksPer = 1.5]
	}
]
[if(theLevel > 9), code:{
	[nextLevel = nextLevel + 250000]
	[title = title]
	[hidDice = 9]
	[hitDie = "d10"]
	[hitPoints = hitPoints + 3]
	[if(theLevel > 12): attacksPer = 2; attacksPer = 1.5]
}]
