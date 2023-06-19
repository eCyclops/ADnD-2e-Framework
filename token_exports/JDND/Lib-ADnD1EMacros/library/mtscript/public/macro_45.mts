[nextLevel = XPNeeded]
[if (XP !> nextLevel): abort(0)]
<!-- Fighter Levels -->
[switch(theLevel), code:
	case 1: {
		[nextLevel = 2000]
		[title = "Veteran"]
		[hitDice = 1]
		[hitDie = "d10"]
		[hitPoints = 0]
	}
	case 2: {
		[nextLevel = 4000]
		[title = "Warrior"]
		[hitDice = 2]
		[hitDie = "d10"]
		[hitPoints = 0]
	}
	case 3: {
		[nextLevel = 8000]
		[title = "Swordsman"]
		[hitDice = 3]
		[hitDie = "d10"]
		[hitPoints = 0]
	}
	case 4: {
		[nextLevel = 18000]
		[title = "Hero"]
		[hitDice = 4]
		[hitDie = "d10"]
		[hitPoints = 0]
	}
	case 5: {
		[nextLevel = 35000]
		[title = "Swashbuckler"]
		[hitDice = 5]
		[hitDie = "d10"]
		[hitPoints = 0]
	}
	case 6: {
		[nextLevel = 70000]
		[title = "Myrmidon"]
		[hitDice = 6]
		[hitDie = "d10"]
		[hitPoints = 0]
	}
	case 7: {
		[nextLevel = 125000]
		[title = "Champion"]
		[hitDice = 7]
		[hitDie = "d10"]
		[hitPoints = 0]
	}
	case 8: {
		[nextLevel = 250000]
		[title = "Superhero"]
		[hitDice = 8]
		[hitDie = "d10"]
		[hitPoints = 0]
	}
	case 9: {
		[nextLevel = 500000]
		[title = "Lord"]
		[hitDice = 9]
		[hitDie = "d10"]
		[hitPoints = 0]
	}
	]
[if(theLevel > 9), code:{
	[nextLevel = nextLevel + 250000]
	[title = title]
	[hidDice = 9]
	[hitDie = "d10"]
	[hitPoints = hitPoints + 3]
}]
