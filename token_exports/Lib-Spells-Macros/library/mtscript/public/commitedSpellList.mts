[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

<!-- list memorized or known spells with link to cast or forget spell -->
[h: magicType  = getStrProp(arg(0), "magicType")]
[h: vancianType  = getStrProp(arg(0), "vancianType")]
[h: tagProp = add(magicType,"_"+vancianType)]
[h: my_spells = getProperty(tagProp,myID)]
[h: viewLevelSpell  = getStrProp(arg(0), "viewLevelSpell",1)]
[h: args = strformat("myID=%{myID};magicType=%{magicType}; vancianType=%{vancianType};viewLevelSpell=%{viewLevelSpell};")]

[h: class = "oddRow"]
[h: outTxt = strformat("<table width=100% border=0 cellpadding=3 cellspacing=-1><caption style='font-size:10px'>%{magicType} Spells %{vancianType}</caption><tr class=%{class}>")]

[h: class = "oddRow"]
[h, if(json.isEmpty(my_spells)), code :{
	[h: outTxt = concat(outTxt,strformat("<td>None %{vancianType}</td>"))]
};{
	[h: loopCount = 0]
	[h: my_spells_sorted = json.sort(json.fields(my_spells, 'json'))]
	[foreach(Item, my_spells_sorted,""), code :{
		[h: spellInfo = json.get(my_spells,Item)]
		[h: count = json.get(spellInfo,"count")]
		[h: castLink = macroLink(Item,"castSpell@Lib:Spells:Macros","none",args+"Name="+Item+";")]

		[h: outTxt = concat(outTxt,strformat("<td style='border:1px solid silver'>%{castLink}"))]
		[h, if(count>1): outTxt = concat(outTxt,strformat("x%{count}"))]
		[h: outTxt = concat(outTxt,strformat("</td>"))]

		[h: loopCount = loopCount + 1 ]
		[h, if(loopCount >= 4): outTxt = concat(outTxt,strformat("</tr><tr class=%{class}>"))]
		[h, if(loopCount >= 4): class = if(class=="oddRow", "evenRow", "oddRow")]
		[h, if(loopCount >= 4):loopCount = 0)]
	}]
}]

[h: outTxt = concat(outTxt,strformat("</tr></table>"))]

[r: outTxt]
