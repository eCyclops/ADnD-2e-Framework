[h: timeStr = getLifeTimePassed()]

[h: days = getStrProp(timeStr,"days")]
[h: hours = getStrProp(timeStr,"hours")]
[h: turns = getStrProp(timeStr,"turns")]
[h: rounds = getStrProp(timeStr,"rounds")]

[h, if (days>0), code :{
	[if (days > 1): 
		days = days+" days ";
		days = days+" day "]

};{
	[days = '']
}]

[h, if (hours>0), code :{
	[if (hours > 1): 
		hours = hours+" hours ";
		hours = hours+" hour "]

};{
	[hours = '']
}]

[h, if (turns>0), code :{
	[if (turns > 1): 
		turns = turns+" turns ";
		turns = turns+" turn "]

};{
	[turns = '']
}]

[h, if (rounds>0), code :{
	[if (rounds > 1): 
		rounds = rounds+" rounds ";
		rounds = rounds+" round "]

};{
	[rounds = '']
}]

[h: macro.return = strformat('%{days}%{hours}%{turns}%{rounds}')]