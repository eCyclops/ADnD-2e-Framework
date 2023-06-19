[h: firstDice = 3]
[h: secondDice = 18]
[h: remainder = ""]


diceRoll = [strformat('%{firstDice}-%{secondDice}')]<br>
fV=[fV = floor(secondDice/firstDice)]<br>
[h: diffFV = fV-(secondDice/firstDice)]
[if(diffFV != 0), code :{
	bV=[bV = secondDice - (firstDice*fV)]<br>
	sD=[sD = secondDice - bV]<br>
	oD=[if(bV == 1):
		oD = firstDice - (bV);
		oD = firstDice - (bV + fV)]<br>
	oD=[if(fV == 1):oD = 1]<br>
	bonus=[bonus = bV]<br>
	
	[newRoll = strformat('%{oD}d%{sD}+%{bonus}')]<br>
};{
		sD=[sD = divide(secondDice,firstDice)]<br>
		[newRoll = strformat('%{firstDice}d%{sD}%{remainder}')]<br>
}]

==============================<br>

[newSecond = divide(secondDice,firstDice)]
floor=[if(floor(newSecond) == newSecond): newRoll = strformat('%{firstDice}d%{newSecond}')]<br>

bonus=[if(firstDice < secondDice): 
	bonus = (firstDice - 1);
	bonus = (secondDice -1)]<br>
highestDiff=[if(firstDice > secondDice):
	hDiff = (firstDice - bonus);
	hDiff = (secondDice - bonus)]<br>

1--[newRoll = strformat('1d%{hDiff}+%{bonus}')]<br>

bonus=[bonus=min(firstDice, secondDice)-1]<br>
highestDiff=[hDiff = max(firstDice, secondDice) - bonus]<br>

2--[newRoll = strformat('1d%{hDiff}+%{bonus}')]<br>

