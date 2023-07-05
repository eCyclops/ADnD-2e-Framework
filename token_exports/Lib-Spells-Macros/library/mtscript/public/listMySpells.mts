[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: magicType  = getStrProp(arg(0), "magicType")]
[h: vancianType  = getStrProp(arg(0), "vancianType")]
[h: tagProp = add(magicType,"_"+vancianType)]


[h: my_spells = getProperty(tagProp,myID)]
[h,if(!json.isEmpty(my_spells)):
	my_spells_sorted = json.sort(json.fields(my_spells, 'json'));
	my_spells_sorted = '{}']

[macro("getAllScribedSpells@Lib:Equipment:Macros"):strformat("myID=%{myID};")]
[h: myScribedSpells = macro.return]

[h: args = strformat("myID=%{myID}; magicType=%{magicType};vancianType=%{vancianType}")]

[h: txtOut = ""]

[h: class = "oddRow"]
[foreach(Item, my_spells_sorted,""), code :{
	[h: memorizeChecks = '']
	[h: spellInfo = json.get(my_spells,Item)]
	[h: count = json.get(spellInfo,"count")]
	[h: level = json.get(spellInfo,"level")]

	[h: 'tipTxt = getShowSpellToolTip(strformat("magicType=%{magicType}; Name=%{Item};"))']
	[h,if(vancianType == "Memorized"):
		tipTxt = strformat('Click to cast/read.');
		tipTxt = strformat('Click to memorize/forget/read.');]
	
	[h: spellToolTipTxt = toolTipIt(tipTxt,strformat("Level %{level}: %{Item}"))]

	[h: linkAskMemorizeOrForget = macroLink(spellToolTipTxt,
		'askMemorizeOrForget@Lib:Spells:Macros','none',strformat("%{args}; Name=%{Item}; Level=%{level};"))]

	[h: linkCast = macroLink(spellToolTipTxt,'castSpellAsk@Lib:Spells:Macros','none',strformat("%{args}; Name=%{Item};"))]

	[h,if(magicType == "Arcane" && vancianType == "Known" && !listContains(myScribedSpells,Item)):
						memorizeChecks = strformat(" [not in books]");
						memorizeChecks = '']

	[h,if(vancianType == "Memorized"): 
		txtOut = txtOut + strformat("<tr class=%{class}><td border=0>%{linkCast} x %{count}</td></tr>");
		txtOut = txtOut + strformat("<tr class=%{class}><td>%{linkAskMemorizeOrForget}%{memorizeChecks}</td></tr>")]

	[h: class = if(class=="oddRow", "evenRow", "oddRow")]
}]

[h, if (vancianType == 'Memorized'): 
		typeName = "memorize";
		typeName = "learn"]
[h: typeNameToolTip =  toolTipIt(strformat("Click to %{typeName} more spells."),"+"+typeName)]

[h: doMoreLink = macroLink(typeNameToolTip, 'Learn_Menu@Lib:Spells:Macros','none',strformat("myID=%{myID}; magicType=%{magicType}; vancianType=%{vancianType};"))]


[h: doMoreTxt = strformat("<tr><td align=center>%{doMoreLink}</td></tr>")]

[h, if(json.isEmpty(my_spells)):txtOut = "None "+vancianType+"."]

[h, if (vancianType == 'Memorized'):
	whatCanIDo = 'Click on spell name to<br>* cast spell <br>* read spell.';
	whatCanIDo = 'Click on spell name to<br>* memorize spell<br>* forget spell<br>* read description of spell.']
[h: whatCanIDoToolTip =  toolTipIt(whatCanIDo,vancianType)]
[h: finalOutTXT = strformat('<TABLE border=1 width=100%><caption>%{whatCanIDoToolTip}</caption>%{txtOut}</table><table width=100% >%{doMoreTxt}</table>')]

[h: macro.return = finalOutTXT]



