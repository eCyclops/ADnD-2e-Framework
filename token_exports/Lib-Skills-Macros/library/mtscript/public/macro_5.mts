[h: typeList = "Proficiency, Weapon Proficiency, Skill, Language"]
[h: status=input(
	"profChoice|"+typeList+"|Select type to add|LIST|SELECT=0 VALUE=STRING"
)]
[h:abort(status)]

[h: tableName = 'Profs']
[h: skill = 'Unknown']

[if(profChoice == 'Proficiency'), code :{
	[h: tableName = "Profs"]
};{}]

[if(profChoice == 'Weapon Proficiency'), code :{
	[h: tableName = "Profs_Combat"]
};{}]

[if(profChoice == 'Skill'), code :{
	[h: tableName = "Skills"]
};{}]

[if(profChoice == 'Language'), code :{
	[h: tableName = "Languages"]
};{}]

[h: args = "name="+skill+";tableName="+tableName+";"]

[macro("edit@Lib:Skills:Macros"):args]

[g: getName()+" has updated items in the Skills library."]