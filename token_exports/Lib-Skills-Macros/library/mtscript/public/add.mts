[h: tableName = getStrProp(arg(0),"tableName")]
[h: skill = getStrProp(arg(0),"name")]
[h: storeThis = ""]

[if(tableName == 'Profs'), code : {
	[h: abilitySource = getStrProp(arg(0),"abilitySource")]
	[h: baseModifier = getStrProp(arg(0),"baseModifier")]
	[h: storeThis = json.set("{}","abilitySource",abilitySource,"baseModifier",baseModifier)]
};{}]

[if(tableName == 'Skills'), code : {
	[h: storeThis = json.set("{}","name",skill)]
};{}]

[if(tableName == 'Profs_Combat'), code : {
	[h: weaponType = getStrProp(arg(0),"weaponType")]
	[h: storeThis = json.set("{}","weaponType",weaponType)]
};{}]

[h: currentSkills = getLibProperty(tableName,"Lib:Skills")]
[h, if(!json.isEmpty(currentSkills) && json.type(currentSkills) == "OBJECT"):testObj = json.get(currentSkills,skill);testObj = '']
[h, if(!json.isEmpty(testObj) && json.type(testObj) == "OBJECT"):isEdit = 1;isEdit = 0]

[h: setLibProperty(tableName,json.set(currentSkills,skill,storeThis),"Lib:Skills")]

[h, if(isEdit == 1): updateTxt = "Changed"; updateTxt = "Added"]
[h: outTxt = strformat("%{updateTxt} %{skill}.<br>")]
[broadcast(outTxt,"gm")]


[h, if(isFrameVisible("Skill Management")), code :{
	[macro("list@Lib:Skills:Macros"):"tableName="+tableName+";"]
};{}]