<!-- this needs to be run by Manage Main -->

[h: tableName = getStrProp(arg(0),"tableName")]
[h: currentSkills = getLibProperty(tableName,"Lib:Skills")]

[frame("Skill Management"): {
<html>
<head>
<link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND>
<title>Prof/Skills</title>
</head>
<body>
	[r: macroLink("Proficiencies", "list@Lib:Skills:Macros","none","tableName=Profs;")],[r: macroLink("Weapon Proficiencies", "list@Lib:Skills:Macros","none","tableName=Profs_Combat;")], [r: macroLink("Skills", "list@Lib:Skills:Macros","none","tableName=Skills;")]<br>
<hr>

[if(!json.isEmpty(currentSkills) && json.type(currentSkills) == "OBJECT"), code :{
	[macro("list_tables@Lib:Skills:Macros"):"tableName="+tableName+";"]
};{ 
	[r: tableName] is empty<br>
}]

[h: args = "name=Unknown;tableName="+tableName+";"]
<hr>[r: macroLink("add",'edit@Lib:Skills:Macros','none',args)]

</body>
</html>
}]