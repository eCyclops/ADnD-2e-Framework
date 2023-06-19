[h:assert(isGM(),"This is a DM command.",0)]

[h: viewLetter = getStrProp(arg(0),"viewLetter","a")]

[h: preResultsTxt = '']
[h: preResultsTxt = concat(preResultsTxt,strformat("<html><head><title>Monster Management</title><link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND></head><body>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE width=100% BORDER=1 CELLPADDING=1 BORDERCOLOR=#000000 BORDERCOLORLIGHT=#000000 BORDERCOLORDARK=#000000>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TR>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TD VALIGN=TOP BGCOLOR=#F0F0F0>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE width =100% >"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<caption>Monster Management</caption>"))]

[h: charEntries = '']
[h: idxTag_Prefix = getLibProperty('MonsterIDXTag','Lib:MM')]
[h: findMatch = strformat('(?i)%{idxTag_Prefix}')]
[h: entries = getMatchingLibProperties(findMatch+'..*','Lib:MM')]
[foreach(entry,entries,""), code :{
	[h: len = length(entry)-1]
	[h: lastChar = substring(entry,len,len+1)]
	[h, if (!listContains(charEntries,lastChar)): charEntries = listAppend(charEntries,lastChar)]
}]

[h: searchLink = macroLink("search","findMonster@Lib:MM:Macros","none","searchType=edit;")]
[h: searchLinkToolTip = toolTipIt("Search for creature by matching parts of the name.",searchLink)]

[h: charSelect = strformat("<table width=100% align=center border=0 cellpadding=1><caption>View Letter</caption><tr>")]
[h, foreach(letter,charEntries,""), code :{
	[h: args = strformat("viewLetter=%{letter};")]
	[h: link = macroLink(upper(letter),'Manage Main@Lib:MM:Macros','none',args)]
	[h,if(letter == viewLetter):charSelect = concat(charSelect,strformat("<td>[%{viewLetter}]</td>")); charSelect = concat(charSelect,strformat("<td>%{link}</td>")) ]
	[h, if (!listContains(charEntries,lastChar)): charEntries = listAppend(charEntries,lastChar)]
}]
[h: charSelect = concat(charSelect,strformat("<td> or %{searchLinkToolTip}</td></tr></table>"))]
[h: charSelectHTML = strformat("<table border=0 cellpadding=1 align=center><td>%{charSelect}</td></table>"))]

[h:addLink =  macroLink(strformat("+add"),"edit@Lib:MM:Macros","none",json.set("{}","newEntry",1))]
[h:importLink =  macroLink(strformat("+import"),"Import@Lib:MM:Macros","none")]
[h: importToolTip = toolTipIt('Make best effort to import text for NPC from website or book entry.',importLink)]

[h:importFlatLink =  macroLink(strformat("+import flat style"),"Import_Flatfile@Lib:MM:Macros","none")]
[h: importFlatToolTip = toolTipIt('Make best effort to import text using flat file (30 fields, separated by tab) from spreadsheet or DB.',importFlatLink)]

[h: endResultsTxt = '']
[h: endResultsTxt = concat(endResultsTxt,strformat("</body></html></table></td></tr><tr><td align=center>%{addLink}, %{importToolTip}, %{importFlatToolTip}</td></tr></table>"))]

[h: outTxt = '']
[h: class = "oddRow"]
[h: outTxt = concat(outTxt,strformat("<table width=100%><caption>Index of Creatures</caption><tr class=%{class}>")))]

[h: pTag_Prefix = getLibProperty("PropertyTag","Lib:MM")]
[h: idxTagDISABLED = 'MonsterIDX']
[h: idxTag = strformat('%{idxTag_Prefix}.%{viewLetter}')]
[h: idxJSON = getLibProperty(idxTag,"Lib:MM")]
[h, if(json.isEmpty(idxJSON)), code : {
	[h: outTxt = concat(outTxt,strformat('<td>There are NO creatures in the database.</td>'))]
};{
	[h: monsterList = json.sort(json.fields(idxJSON, 'json'))]
	[h: loopCount = 0]
	[h, foreach(monster, monsterList,''), code : {
		[h: pTag = strformat('%{pTag_Prefix}.%{monster}')]
		[h: thisJSON = getLibProperty(pTag,"Lib:MM")]
		[h: thisJSON = json.set(thisJSON,'viewLetter',viewLetter)]
		[h:editLink =  macroLink(monster,"edit@Lib:MM:Macros","none",thisJSON)]
		[h: npcToolTip = editLink] [h: 'DISABLED -> toolTipIt(getNPCToolTipTxt(monster,thisJSON),editLink)]' ]

		[h:outTxt = concat(outTxt,strformat("<td>%{npcToolTip}</td>"))]

		[h: loopCount = loopCount +1]
		[h, if(loopCount >= 4): class = if(class=="oddRow", "evenRow", "oddRow")]
		[h, if(loopCount >= 4): outTxt = concat(outTxt,strformat("</tr><tr class=%{class}>"))]
		[h, if(loopCount >= 4): loopCount=0]
	}]
}]

[h: outTxt = concat(outTxt,strformat("</tr></table>"))]

[frame("Monster_DB_Management"): {

	[r: preResultsTxt]
	[r: charSelectHTML]

	[r: outTxt]

	[r: endResultsTxt]

}]
