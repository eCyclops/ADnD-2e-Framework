[h:assert(isGM(),"This is a DM command.",0)]

[h: incJSON = arg(0)]
[h: assert(!json.isEmpty(incJSON),"incoming JSON is invalid "+getMacroName()+"@"+getMacroLocation())]
[h: tokenID = json.get(incJSON,"tokenID")]
[h: assert(!(tokenID==''),"tokenID is invalid "+getMacroName()+"@"+getMacroLocation())]
[h: assert(!startsWith(getName(tokenID),"Lib:"),"You cannot initialize a library token.",0)]

[h: viewLetter = json.get(incJSON,"viewLetter")]
[h,if(viewLetter == ''): viewLetter = 'a'; incJSON = json.remove(incJSON,"viewLetter")]

[h: searchField = '']
[h,if(searchField != ''): incJSON = json.remove(incJSON,"searchField")]

[h: selectedTokens = json.get(incJSON,"selectedTokens")]

[h: formParseLink = macroLinkText('spawnCreatureParse@Lib:MM:Macros',"none")]

[h: preResultsTxt = '']
[h: preResultsTxt = concat(preResultsTxt,strformat("<html><head><title>Monster Spawn</title><link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND></head><body>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat('<form method="json" name="spawnCreatureMain" action="%{formParseLink}">'))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE width=100% BORDER=1 CELLPADDING=1 BORDERCOLOR=#000000 BORDERCOLORLIGHT=#000000 BORDERCOLORDARK=#000000>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TR>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TD VALIGN=TOP BGCOLOR=#F0F0F0>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE width =100% >"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<caption>Monster Spawn</caption>"))]

[h: charEntries = '']
[h: idxTag_Prefix = getLibProperty('MonsterIDXTag','Lib:MM')]
[h: findMatch = strformat('(?i)%{idxTag_Prefix}')]
[h: entries = getMatchingLibProperties(findMatch+'..*','Lib:MM')]
[h, foreach(entry,entries,""), code :{
	[h: len = length(entry)-1]
	[h: lastChar = substring(entry,len,len+1)]
	[h, if (!listContains(charEntries,lastChar)): charEntries = listAppend(charEntries,lastChar)]
}]

[h: charSelect = strformat("<table width=100% align=center border=0 cellpadding=1><caption>Index Select</caption><tr>")]
[h, foreach(letter,charEntries,""), code :{
	[h: args = json.set("{}","tokenID",tokenID,"viewLetter",letter,"selectedTokens",selectedTokens,"searchField",searchField) ]
	[h: link = macroLink(upper(letter),'Spawn Creature Main@Lib:MM:Macros','none',args)]
	[h,if(letter == viewLetter):charSelect = concat(charSelect,strformat("<td>[%{viewLetter}]</td>")); charSelect = concat(charSelect,strformat("<td>%{link}</td>")) ]
	[h, if (!listContains(charEntries,lastChar)): charEntries = listAppend(charEntries,lastChar)]
}]

[h: searchLink = macroLink("search","findMonster@Lib:MM:Macros","none",strformat("searchType=spawn; tokenID=%{tokenID}; selectedTokens=%{selectedTokens};") )]
[h: searchLinkToolTip = toolTipIt("Search for creature by matching parts of the name.",searchLink)]

[h: charSelect = concat(charSelect,strformat("<td>%{searchLinkToolTip}</td></tr></table>"))]
[h: charSelectHTML = strformat("<table border=0 cellpadding=1 align=center><td>%{charSelect}</td></table>"))]


[h:spawnCreature =  macroLink(strformat("Spawn Generic Creature"),"spawnCreature@Lib:MM:Macros","none",json.set("{}","name","generic creature","tokenID",tokenID,"selectedTokens",selectedTokens))]

[h: endResultsTxt = '']
[h: endResultsTxt = concat(endResultsTxt,strformat("</body></html></table></td></tr><tr><td align=center>%{spawnCreature}</td></tr></table>"))]

[h: outTxt = '']
[h: class = "oddRow"]
[h: outTxt = concat(outTxt,strformat("<table width=100%><caption><b>Select Creature To Initialize Token</b></caption><tr class=%{class}>")))]

[h: pTag_Prefix = getLibProperty("PropertyTag","Lib:MM")]
[h: idxTag = strformat('%{idxTag_Prefix}.%{viewLetter}')]
[h: idxJSON = getLibProperty(idxTag,"Lib:MM")]
[h: idxAllJSON = 'SEARCH IS DISABLED']
[h, if(searchField != ''), code :{
	[h: idxJSON = idxAllJSON]
	[h, foreach(entry,idxJSON,""), code :{
		[h: findID = strfind(entry, strformat('(?i)(%{searchField})'))]
		[h,if(getFindFound(findID) == 0):idxJSON = json.remove(idxJSON,entry)]
	}]
}]

[h, if(json.isEmpty(idxJSON)), code : {
	[h: outTxt = concat(outTxt,strformat('<td>There are NO creatures in the database.</td>'))]
};{
	[h: monsterList = json.sort(json.fields(idxJSON, 'json'))]
	[h: loopCount = 0]
	[h, foreach(monster, monsterList,''), code : {
		[h: spawnTHIS = json.set("{}","name",monster,"tokenID",tokenID,"selectedTokens",selectedTokens)]
		[h: 'spawnLink =  macroLink(monster,"spawnCreature@Lib:MM:Macros","none",spawnTHIS)']
		[h: spawnLink =  macroLink(monster,"spawnAsk@Lib:MM:Macros","none",spawnTHIS)]
		[h: 'npcToolTip = toolTipIt(getNPCToolTipTxt(monster),spawnLink)']
		[h: 'sourceLink = macroLink('?','viewMonsterEntry@Lib:MM:Macros','none',strformat("sourceName=%{monster}; "))']
		[h: 'npcToolTip = toolTipIt(strformat("View %{monster} details."),sourceLink)']
		[h: npcToolTip = toolTipIt("Click for options to spawn or view details of creature.",spawnLink)]
		[h:outTxt = concat(outTxt,strformat("<td>%{npcToolTip}</td>"))]

		[h: loopCount = loopCount +1]
		[h, if(loopCount >= 4): class = if(class=="oddRow", "evenRow", "oddRow")]
		[h, if(loopCount >= 4): outTxt = concat(outTxt,strformat("</tr><tr class=%{class}>"))]
		[h, if(loopCount >= 4): loopCount=0]
	}]
}]

[h: outTxt = concat(outTxt,strformat("</tr></table>"))]

[frame("Monster_Spawn_Management"): {

	[r: preResultsTxt]
	[r: charSelectHTML]

	[r: outTxt]

	[r: endResultsTxt]

}]
