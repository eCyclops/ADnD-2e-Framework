[h: importText = json.get(arg(0), "TextBox")]
[h: magicType = json.get(arg(0), "impType")]

[h: tag_prefix = getLibProperty("ItemTag","Lib:Spells")]

[h: closeFrame("SpellImport")]

<!-- Get The text blocks in imports -->
[h: text = encode(importText)]
[r, foreach(line,text, "", "%0A"), code: {
	[h: decodedLine = decode(line)]

[h:verbal = 0]
[h:somatic = 0]
[h:material = 0]

   <!-- process each line -->
<!-- name|level|school|range|duration|aoe|components|casttime|save -->
	[h: thisSpellString = stringToList(line, encode("|"))]
	[h: name = decode(listGet(thisSpellString,0))]
	[h: level = decode(listGet(thisSpellString,1))]
	[h: school = decode(listGet(thisSpellString,2))]
	[h: range = decode(listGet(thisSpellString,3))]
	[h: duration = decode(listGet(thisSpellString,4))]
	[h: aoe = decode(listGet(thisSpellString,5))]
	[h: components = listGet(thisSpellString,6)]
		[h: vsm = decode(stringToList(components,","))]
		[h: verbal = listContains(vsm,"V")]
		[h: somatic = listContains(vsm,"S")]
		[h: material = listContains(vsm,"M")]
	[h: casttime = decode(listGet(thisSpellString,7))]
	[h: savingthrow = decode(listGet(thisSpellString,8))]

[if(decodedLine != ''), code : {
Name=[r: name], level=[r: level], school=[r: school], range=[r: range], duration=[r: duration], aoe=[r: aoe], cast time=[r: casttime], save=[r: savingthrow], components=
[if(verbal):"V "][if(somatic):" S "][if(material):" M"], type=[r: magicType]<br>

[h: spellDBIdx = add(magicType,level)]
[h: dbTag = tag_prefix+"."+magicType+"."]

[h: args = 
"name="+name+";"+
"SpellDBIdx="+SpellDBIdx+";"+
"magicType="+magicType+";"+
"school="+school+";"+
"level="+level+";"+
"range="+range+";"+
"duration="+duration+";"+
"aoe="+aoe+";"+
"casttime="+casttime+";"+
"save="+savingthrow+";"+
"verbal="+verbal+";"+
"somatic="+somatic+";"+
"material="+material+";"+
"description=Need brief description.;"+
"dbTag="+dbTag+";"
]

[macro("addSpellToDB@Lib:Spells:Macros"):args]
}]

}]