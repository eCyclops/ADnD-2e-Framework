[h: name = getStrProp(arg(0),"name")]
[h: name = lower(name)]

[h: magicType = getStrProp(arg(0),"magicType")]
[h: school = getStrProp(arg(0),"school")]
[h: level = getStrProp(arg(0),"level")]
[h: range = getStrProp(arg(0),"range")]
[h: duration = getStrProp(arg(0),"duration")]
[h: aoe = getStrProp(arg(0),"aoe")]
[h: casttime = getStrProp(arg(0),"casttime")]
[h: save = getStrProp(arg(0),"save")]
[h: verbal = getStrProp(arg(0),"verbal")]
[h: somatic = getStrProp(arg(0),"somatic")]
[h: material = getStrProp(arg(0),"material")]
[h: description = getStrProp(arg(0),"description")]
[h: reversible = getStrProp(arg(0),"reversible")]

[h: sphere = getStrProp(arg(0),"sphere")]

[h: newEntry = getStrProp(arg(0),"newEntry",0)]

[h: spellDBIdx = add(magicType,level)]
[h: tag_prefix = getLibProperty("ItemTag","Lib:Spells")]
[h: spellTag = strformat("%{tag_prefix}.%{magicType}.%{name}")]

<!-- so we dont have same name in various cases -->
[h: name = lower(name)]

<!-- check that the spell name doesn't exist already if DB exists -->
[h: updateTxt = "Added"]
[if(getLibProperty(SpellDBIdx,"Lib:Spells")!=""), code : {
	[h: testObj = json.get(getLibProperty(SpellDBIdx,"Lib:Spells"), name)]
	[h,if( !json.isEmpty(testObj) ): updateTxt = "Updated"]
	[h,if(newEntry): assert(json.isEmpty(testObj),name+"  already exists in the spell database.")]
};{}]

<!-- build var to store at idx tag point -->
[h: itemStore = json.set("{}",	
		"name",name,
		"type",magicType,
		"school",school,
		"level",level,
		"range",range,
		"duration",duration,
		"aoe",aoe,
		"casttime",casttime,
		"save",save, 
		"verbal",verbal,
		"somatic",somatic,
		"material",material,
		"reversible",reversible,
		"sphere",sphere,
		"description",description
)]

<!-- add index item using name as pointer -> 
[h: setLibProperty(SpellDBIdx,json.set(getLibProperty(SpellDBIdx,"Lib:Spells"),name,level),"Lib:Spells")]

<!-- store in private property "item_tag.Divine.spell name", you wont ever see this on the Token btw -->
[h: setLibProperty(spellTag,ItemStore,"Lib:Spells")]

[h: outTxt = strformat("%{updateTxt} level %{level} %{magicType} spell as %{name}.<br>")]
[broadcast(outTxt,"gm")]
