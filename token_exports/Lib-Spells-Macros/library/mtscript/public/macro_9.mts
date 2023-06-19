[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]
[h: bookName = getStrProp(arg(0),"bookName")]

[h: magicType  = getStrProp(arg(0), "magicType")]
[h: vancianType  = getStrProp(arg(0), "vancianType", "Memorized")]
[h: spellName = getStrProp(arg(0), "Name")]
[h: spellLevel = getStrProp(arg(0), "Level")]
[h: viewLevelSpell  = getStrProp(arg(0), "viewLevelSpell",1)]

[h: spellProp = add(magicType,"_"+vancianType)]
[h: sk = getProperty(spellProp,myID)]

[h: spellInfo = json.get(sk,spellName)]
[h,if(!json.isEmpty(spellInfo) && json.type(spellInfo) == "OBJECT"): count = json.get(spellInfo,"count");count = 0]
[h: count = count - 1]

[h,if(count<1 || vancianType == "Known" ), code :{
	[setProperty(spellProp,json.remove(sk,spellName),myID)]
};{
	[new_spellInfo = json.set(spellInfo,"count",count)]
	[setProperty(spellProp,json.set(sk,spellName,new_spellInfo),myID)]
}]

[if(vancianType == "Memorized"), code : { 
	[h: castLink = macroLinkText('showSpellText@Lib:Spells:Macros','none','Name='+spellName+';magicType='+magicType))]
	[h: casterName = getName(myID)]

	[h: spellJSON = getSpellJSON(magicType,spellName)]
	[h: range = decode(json.get(spellJSON,"range"))]
	[h: duration = decode(json.get(spellJSON,"duration"))]
	[h: casttime = decode(json.get(spellJSON,"casttime"))]
	[h: aoe = decode(json.get(spellJSON,"aoe"))]
	[h: save = decode(json.get(spellJSON,"save"))]
	[h: verbal = json.get(spellJSON,"verbal")]
	[h: somatic = json.get(spellJSON,"somatic")]
	[h: material = json.get(spellJSON,"material")]

	[h: components = ""]
	[h, if(verbal==1): components = listAppend(components,"V")]
	[h, if(somatic==1): components = listAppend(components,"S")]
	[h, if(material==1): components = listAppend(components,"M")]

	[h, if(bookName == ""), code: {
		[h: castActionText = strformat("%{casterName} <i>casts</i> <b><a style='color:#ffa008' href=%{castLink}>%{spellName}</a></b>")]
	};
	{
		[h: castActionText = strformat("%{casterName} <i>recites</i> <b><a style='color:#ffa008' href=%{castLink}>%{spellName}</a></b> from %{bookName}")]
	}]

	[h: outputColor = "#32628a"]
	[h: outTxt = strformat("
	<table cellspacing=1 cellpadding=3 bgcolor=black width=100%>
    <tr color=white>
      <td colspan=3 align=center bgcolor=%{outputColor}>
				%{castActionText}
			</td>
    </tr>
    <tr color=white>
      <td bgcolor=%{outputColor}><b>Duration</b></td>
			<td bgcolor=%{outputColor}><b>Range</b></td>
			<td bgcolor=%{outputColor}><b>Components</b></td>
    </tr>
    <tr>
      <td bgcolor=white>%{duration}</td>
			<td bgcolor=white>%{range}</td>
			<td bgcolor=white>%{components}</td>
    </tr>
		<tr color=white>
      <td bgcolor=%{outputColor}><b>Casting Time</b></td>
			<td bgcolor=%{outputColor}><b>Area of Effect</b></td>
			<td bgcolor=%{outputColor}><b>Save</b></td>
    </tr>
		<tr>
      <td bgcolor=white>%{casttime}</td>
			<td bgcolor=white>%{aoe}</td>
			<td bgcolor=white>%{save}</td>
    </tr>
	</table>"))]
	
	[r: showIt(outTxt,myID,"all", 0)]

};
{
	[h: outTxt = getName(myID)+strformat(" <i>forgets</i> <b>%{spellName}</b>.")]
	[h: connectedPlayerID = getPlayerName()]
	[broadcast(outTxt,"gm")]
	[broadcast(outTxt,connectedPlayerID)]
}]


[h, if(vancianType == 'Memorized' && isNPC(myID)), code :{
	[macro("NPC_setSpellsMemorized@Lib:Spells:Macros"):strformat("myID=%{myID};vancianType=%{vancianType}; magicType=%{magicType};")]
};{}]


[if(isFrameVisible("Spellbook")), code :{
	[macro("Learn_Menu@Lib:Spells:Macros"):strformat("myID=%{myID}; magicType=%{magicType}; vancianType=%{vancianType}; viewLevelSpell=%{viewLevelSpell};")]
};{}]

[h: pcSheetFrame = strformat('PC:'+getName(myID)+':%{myID}')]
[if(isFrameVisible(pcSheetFrame)), code :{
	[macro("CharSheet@Lib:ADND"):strformat("myID=%{myID}; Page=Spells;")]
};{}]


[h: npcSheetFrame = strformat('NPC:'+getName(myID)+':%{myID}')]
[h, if(isFrameVisible(npcSheetFrame)): 
	NPC_Sheet(strformat("myID=%{myID};"))]
