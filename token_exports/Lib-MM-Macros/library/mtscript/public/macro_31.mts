[h: '<!-- get npc tooltip html then run toolTipIT() on it. Load "Name" or use provided JSON -->']
[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(Name,[npcJSON]). "+getMacroName()+"@"+getMacroLocation())]

[H: name = arg(0) ]
[h, if(numArgs==2):
	npcTxt = getNPCDetailsTxt(name,arg(1));
	npcTxt = getNPCDetailsTxt(name)]

[h: toolTip = '<head><link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND></head><body><table>']

[h: toolTip = concat(toolTip,strformat('%{npcTxt}'))]

[h: toolTip = concat(toolTip,strformat('</table>'))]

[h: macro.return = toolTip]

