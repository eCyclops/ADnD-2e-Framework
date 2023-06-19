[macro("askTypeLevel@this"):""]
[h: args = macro.return]

[h: dbTag = getStrProp(args,"dbTag")]

[h: SpellDBIdx = getStrProp(args,"SpellDBIdx")]
[h: schoolNames = getStrProp(args,"schoolNames")]
[h: magicType = getStrProp(args,"magicType")]
[h: levelSpell = getStrProp(args,"levelSpell")]

[h: spellList = getLibProperty(SpellDBIdx,"Lib:Spells")]

[foreach(item,spellList,"<br>"), code :{ 
	[h: obj = getLibProperty(dbTag+item,"Lib:Spells")]
	<br>* [r:item]<br>
	[foreach(item2,obj,", "), code :{
		[r:item2]:[r: json.get(obj,item2)]
	}]

}]

