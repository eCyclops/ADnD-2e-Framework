[h: assert(isGM(),"This is a DM command.",0)]

[h: '<!-- Load campaign initiative settings -->']
[h: cfgSettings = getLibProperty("CFGSettings", "Lib:ADND")]
[h: initiativeOnce = getStrProp(cfgSettings,"initiativeOnce","0")]
[h: autoLoadNPCSheet = getStrProp(cfgSettings,"autoLoadNPCSheet","1")]
[h: auraGroup = getLibProperty("_auraGroup","Lib:ADND")]
[h: auraName = getLibProperty("_auraName","Lib:ADND")]
[h: colorInitiative = getLibProperty("_colorInitiative ","Lib:ADND")]

[h: styleTxt = getLibProperty("styleTxt_NoColor", "Lib:ADND")]

[if( initiativeSize() < 1 ), code :{
	[h: assert(0,"No tokens have rolled initiative yet.<br>",0)]
};{}]

[h: '<!-- clear all failed save flags and current initiative halos/auras -->']
[h, macro("Clear Initiative Flags@Lib:Initiative"): ""]

[h: '<!-- Check if we are at the end of the round and move to the next if we are Otherwise, increment the initiative -->']
[h, if(getCurrentInitiative() + 1 == initiativeSize()), code:{
	[h, macro("Next Round@Lib:Initiative"): ""]
};{
	[h: nextInitiative()]
  [h: whoWent = '']
  [h: whoWent = getInitiativeToken()]
  [h: currentInitiative = getInitiative(whoWent)]
  [h: currentInitiative = -currentInitiative]
  [h: currentRound = getInitiativeRound()]
  [h, if(whoWent != ''), code :{
  	[h: whoWentName = getName(whoWent)]

  	[h: '<!-- putting this link into the output will make the players output goto the right PC and enter screen on it. -->']
  	[h: whoWentLink = macroLink(whoWentName,"goto_wrapper@Lib:ADND","none",strformat("targetID=%{whoWent}; "))]

  	[h: 'testing disabling link and goto for npcs since the goto command below should force the DM to it. This way pcs dont get view  shifted on npcs']
  	[h, if( isNPC(whoWent)): whoWentLink = whoWentName)]

  	[h: actionType = getProperty("ActionType",whoWent)]
  	[h: setHalo(colorInitiative,whoWent)]
  	[h, token(whoWent): setLight(auraGroup,auraName,1) ]

  	[h: outTxt = strformat("
		<table %{styleTxt} bgcolor=black cellpadding=2 cellspacing=2 width=100%>
			<tr><td bgcolor=yellow colspan=3 align=center>%{whoWentLink} has initiative!</td></tr>
			<tr>
				<td align=center bgcolor=white width=15%><b>Initiative:</b> %{currentInitiative}</td>
				<td align=center bgcolor=white><b>Action:</b> %{actionType}</td>
				<td align=center bgcolor=white width=15%><b>Round:</b> %{currentRound}</td>
			</tr>
  	</table>")]
  	
  	[h: 'show output based on privacy settings for initiative']
  	[r: showIt(outTxt,whoWent,"initiative",0)]

  	[h: npcSheetFrame = strformat('NPC:'+getName(whoWent)+':%{whoWent}')]

  	[h, if( isNPC(whoWent)): curHP = getProperty("HP",whoWent);curHP = 0 )]
  	[h, if( isNPC(whoWent) && autoLoadNPCSheet && curHP > 0): NPC_Sheet( strformat("myID=%{whoWent}; ") )]

  	[h: 'this will only center the screen on the mob for the person running the macro, the DM.']
  	[h: goto(whoWent)]
  };{}]

  [h: checkPCTokensRolledInit("Remaining")]
}]