[h: '<!-- this parses rolls like 3-18+1 and turns them into 3d6+1 -->']

[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(DiceString). "+getMacroName()+"@"+getMacroLocation())]

[H: damage = arg(0) ]

[h: diceRoll = '1d1']
[h:strID = strfind(damage,"^(\\d+)\\-(\\d+)(.*)?")] 
[h: findCnt = getFindCount(strID)]
[h, if(findCnt > 0), code :{
	[firstDice = getGroup(strID,1,1)]
	[secondDice = getGroup(strID,1,2)]
	[remainder = getGroup(strID,1,3)]
	[if(isNumber(remainder)), code: {
		[if(remainder > 0):
			remainder = strformat('\\+%{remainder}')]
	};{}]
	[if(firstDice > 1), code :{
		[newSecond = divide(secondDice,firstDice)]
		[if(floor(newSecond) == newSecond): evenSplit = 1; evenSplit = 0]

		[bonus=min(firstDice, secondDice)-1]
		[hDiff = max(firstDice, secondDice) - bonus]

		[if(evenSplit):diceRoll = strformat('%{firstDice}d%{newSecond}%{remainder}');
			diceRoll = strformat('1d%{hDiff}+%{bonus}%{remainder}')]
	};{
		[diceRoll = strformat('%{firstDice}d%{secondDice}%{remainder}')]
	}]
};{
	[diceRoll = damage]
}]

[h: macro.return = diceRoll]
