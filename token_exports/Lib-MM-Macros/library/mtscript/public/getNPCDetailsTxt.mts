[h: '<!-- get npc information into a simple table html output for viewing. Load "Name" or use provided JSON -->']
[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(Name,[npcJSON]). "+getMacroName()+"@"+getMacroLocation())]

[H: name = arg(0) ]
[h, if(numArgs==2):
	npcJSON = arg(1);
	npcJSON = getNPCJSON(name)]

[h: '<!-- remove these as we dont want them in the table -->']
[h: npcJSON = json.remove(npcJSON,'Save')]
[h: npcJSON = json.remove(npcJSON,'viewLetter')]
[h: npcJSON = json.remove(npcJSON,'activity_text')]
[h: npcJSON = json.remove(npcJSON,'climate_text')]
[h: npcJSON = json.remove(npcJSON,'thisTag')]


[h: styleTxt = getLibProperty("styleTxt_noColor", "Lib:ADND")]

[h: bgColor = "#FFFFFF"]
[h: outTxt = strformat('<table border=1 cellpadding=0><tr><td><table border=0 cellpadding=0>')]
[foreach(key,npcJSON,""), code :{
	[if(key != 'description' && !startsWith(key,"attack.")), code :{
		[h: data = decode(json.get(npcJSON,key))]
		[h: cKey = capFirst(key)]

		[h: outTxt = concat(outTxt,strformat('<tr bgcolor=%{bgColor}><td>%{cKey}</td><td>%{data}</td></tr>'))]
		[h: bgColor = if(bgColor=="#FFFFFF", "#EEEEAA", "#FFFFFF")]
	};{}]
}]

[h: outTxt = concat(outTxt,strformat('</table></td></tr></table>'))]

[h: macro.return = outTxt]