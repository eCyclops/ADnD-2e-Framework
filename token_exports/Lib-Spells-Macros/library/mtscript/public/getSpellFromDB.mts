[if(getStrProp(arg(0),"findThisSpell") == ''), code : {
	[h,macro("askFindSpell@this"):""]
	[h: args = macro.return]
};{
	[h: args=arg(0)]
}]

[h: magicType = getStrProp(args,"magicType")]
[h: findThisSpell = getStrProp(args,"findThisSpell")]

[h: foundLevel = -1 ]
[h: maxCount = 7]
[h,if(magicType == "Arcane"):maxCount = 9;maxCount = 7]

[h,count(maxCount), code : {
	[h: levelSpell = roll.count]
	[h: spellDBIdx = add(magicType,levelSpell)]
	[h: spellList = getLibProperty(spellDBIdx,"Lib:Spells")]
	[h, foreach(Item, spellList,""), if(Item == findThisSpell): foundLevel = levelSpell]
}]

[h,if(foundLevel == -1), code :{
	[h: macro.return = ""]
};{
	[h: propName = add(magicType,foundLevel)]
	[h: foundSpell = findThisSpell]
		
	[h: tag_prefix = getLibProperty("ItemTag","Lib:Spells")]
	[h: spellTag = tag_prefix+"."+magicType+"."+findThisSpell]
	[h: macro.return = "magicType="+magicType+";"+"propName="+propName+";"+"foundSpell="+foundSpell+";"+"foundLevel="+foundLevel+";"+"spellTag="+spellTag+";"]
}]

