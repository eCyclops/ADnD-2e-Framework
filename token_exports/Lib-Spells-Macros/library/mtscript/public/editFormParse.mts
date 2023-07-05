[h: magicType = json.get(arg(0),"magicType")]
[h: viewLevelSpell = json.get(arg(0),"viewLevelSpell")]
[h: newEntry = json.get(arg(0),"newEntry")]

[h: name = json.get(arg(0),"name")]
[h: school = encode(json.get(arg(0),"school"))]
[h: levelSpell = encode(json.get(arg(0),"levelSpell"))]
[h: range = encode(json.get(arg(0),"range"))]
[h: duration = encode(json.get(arg(0),"duration"))]
[h: areaofeffect = encode(json.get(arg(0),"areaofeffect"))]
[h: savingthrow = encode(json.get(arg(0),"savingthrow"))]
[h: casttime = encode(json.get(arg(0),"casttime"))]

[h: verbal = encode(json.get(arg(0),"verbal"))]
[h, if(verbal == 'true'): verbal=1;verbal=0]
[h: somatic = encode(json.get(arg(0),"somatic"))]
[h, if(somatic == 'true'): somatic=1;somatic=0]
[h: material = encode(json.get(arg(0),"material"))]
[h, if(material == 'true'): material=1;material=0]
[h: reversible = encode(json.get(arg(0),"reversible"))]
[h, if(reversible == 'true'): reversible=1;reversible=0]

[h: description = encode(json.get(arg(0),"description"))]

[h: deleteThis = json.get(arg(0),"delete")]
[h, if(deleteThis == 'true'): deleteThis=1;deleteThis=0]

[h: sphere = '']
[h, foreach(aSphereCheck,arg(0),""), code :{
	[if( startsWith(aSphereCheck,"sphere.") ), code :{
		[sphereName = json.get(arg(0),aSphereCheck)]
		[sphere = listAppend(sphere,sphereName)]
	};{}]
}]

[h: closeFrame("EditSpellFrame")]

[h: args = strformat("name=%{name}; magicType=%{magicType}; school=%{school}; level=%{levelSpell}; range=%{range}; duration=%{duration}; aoe=%{areaofeffect}; casttime=%{casttime}; save=%{savingthrow}; verbal=%{verbal}; somatic=%{somatic}; material=%{material}; reversible=%{reversible};  sphere=%{sphere}; description=%{description}; newEntry=%{newEntry};")]

[if(deleteThis == 1), code : {
	[macro("delete@Lib:Spells:Macros"):strformat("name=%{name}; magicType=%{magicType}; level=%{levelSpell};")]
};{
	[macro("add@Lib:Spells:Macros"):args]
}]

[if(isFrameVisible("SpellDB_Management")), code :{
	[macro("Manage Main@Lib:Spells:Macros"):strformat("magicType=%{magicType}; viewLevelSpell=%{viewLevelSpell};")]
};{}]