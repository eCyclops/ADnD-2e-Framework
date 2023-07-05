[h:assert(isGM(),"This is a DM command.",0)]

[h: selectedList = getSelected()]

[h: assert(selectedList !='',"You must select token(s) to use this command.",0)]

[h: '<!-- Load the campaign initiative settings -->']
[h: cfgSettings = getLibProperty("CFGSettings", "Lib:ADND")]
[h: privateMode = getStrProp(cfgSettings,"privatemode","1")]
[h: combatActions = getLibProperty("CombatActions","Lib:ADND")]
[h: cfgSettings = getLibProperty("CFGSettings", "Lib:ADND")]
[h: initSize = getStrProp(cfgSettings,"initiativedice","1")]

[h: '<!-- Prompt user for roll attributes -->']
[h: status=input(
	strformat("sInitiativeAction | %{combatActions} | What type of action this round?|LIST|SELECT=0 VALUE=STRING"),
	"initiativeModifier| 0 | Initiative Modifier",
	"seperator|<html><b>--- Override ---</b></html>||LABEL|SPAN=TRUE",
	strformat("overrideValue | 0 | Override d%{initSize} roll with static value 1-%{initSize}")
)]
[h:abort(status)]

[h: '<!-- Roll initiative for each selected token, using the specified attributes -->']
[h: rolledForPC = "false"]
[h, foreach(myID, selectedList, ""), code: {
	[h: selectedName = getName(myID)]
	[h: args = strformat("myID=%{selectedName}; initiativeAction=%{sInitiativeAction}; initiativeModifier=%{initiativeModifier}; initiativeOverride=%{overrideValue}; initiativeAutoRoll=1;")]
	[h, if (isPC(myID)), code : {
		[h, macro("PC_Initiative@Lib:Initiative"): args] 
		[h: rolledForPC = "true"]
	};
	{
		[h, macro("NPC_Initiative@Lib:Initiative"): args]
	}]
}]

[h: '<!-- Report how many tokens we rolled for, if we rolled for multiple -->']
[h: selectedCount = listCount(selectedList)]
[h, if(selectedCount > 1), code: {
	[h: broadcast(strformat("Initiative rolled for %{selectedCount} tokens."),"gm")]
};{}]

[h: '<!-- If we rolled for a PC token, report any unrolled PC tokens -->']
[h, if (rolledForPC == "true"), code: {
	[h, macro("listPCTokensOutsideInitiative@Lib:Initiative"): ""]
	[h: notFoundList = macro.return]

	[h,if(listCount(notFoundList) > 0): 
		broadcast(strformat("<font color=red>Initiative NOT received from: %{notFoundList}</font><br>"));
		broadcast(strformat("<font color=orange>All PCs have rolled initiative. START ROUND!</font><br>"))
	]
}]