[h: tableName = getStrProp(arg(0),"tableName")]
[h: skill = getStrProp(arg(0),"name")]

[h: currentProfs = getLibProperty(tableName,"Lib:Skills")]
[h: setLibProperty(tableName,json.remove(currentProfs,skill),"Lib:Skills")]

[h: outTxt = strformat("Removed %{skill}.<br>")]
[broadcast(outTxt,"gm")]

[h, if(isFrameVisible("Skill Management")), code :{
	[macro("list@Lib:Skills:Macros"):"tableName="+tableName+";"]
};{}]