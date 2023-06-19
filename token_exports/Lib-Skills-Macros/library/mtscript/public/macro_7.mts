<!-- import list of names in a table(), each row just a list of names seperated by commas -->

[h: tableName = "Profs"]
[h: thisList = ""]
[h: count = 1]
[h: thisTableEntry = table(tableName,count)]
[while( length(thisTableEntry) > 0,""), code: { 
 [h: thisList = listAppend(thisList,thisTableEntry,",")]
 [h: count = count +1]
 [h: thisTableEntry = table(tableName,count)]
}]

[h: thisList = listSort(thisList,'A')]

[foreach(skill,thisList,""), code : {
	[h: skill = lower(skill)]
	[h: skill = replace(skill,",",'')]
	[macro("add@Lib:Skills:Macros"):"name="+skill+";"+"tableName=Profs;abilitySource=Intelligence;baseModifier=0;"]
}]