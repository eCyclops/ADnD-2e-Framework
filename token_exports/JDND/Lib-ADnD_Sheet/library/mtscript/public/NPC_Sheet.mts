[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: myName = getName(myID)]

[h: thisFrameName = strformat('NPC:%{myName}:%{myID}')]

[h: formLink = macroLinkText('closeFormWindow@Lib:ADND',"none")]

[h: sourceJSON = getNPCJSON(getProperty("MonsterSourceName",myID))]
[h: sourceNPCToolTipTXT = getNPCToolTipTxt( decode( getProperty("MonsterSourceName",myID) ),sourceJSON ) ]
[h: myNameToolTip = toolTipIt(sourceNPCToolTipTXT,myName)]

[h: args = strformat("myID=%{myID}; magicType=Arcane; vancianType=Memorized;")]
[h, if(hasMemorizedSpells(args)): 
	arcaneSpellText = getNPCSpellWindow( args );
	arcaneSpellText = macroLink(toolTipIt('Memorize arcane spells.','+arcane'), 'Learn_Menu@Lib:Spells:Macros','none',args)]

[h: args = strformat("myID=%{myID}; magicType=Divine; vancianType=Memorized;")]
[h, if(hasMemorizedSpells(args)): 
	divineSpellText = getNPCSpellWindow( args );
	divineSpellText = macroLink(toolTipIt('Memorize divine spells.','+divine'), 'Learn_Menu@Lib:Spells:Macros','none',args)]

[h: combatWindow = getNPCCombatWindow(myID)]

[h: rollInitiativeLink =  macroLink("Roll Initiative",'DO_Initiative@Lib:Initiative','none',strformat("myID=%{myID};"),myID)]
[h: multiAttackLink =  macroLink("Multiple Weapons",'getMultiWeaponSelectionForm@Lib:ADND','none',strformat("myID=%{myID};"),myID)]
[h: multiAttackToolTip = toolTipIt("Attack with mutiple weapons. Claw/Claw/Bite, Longsword/Shortsword, Dagger/Dagger all in one sequence.",multiAttackLink)]

[h: activeWeaponsTxt = profsSheet_activeWeapons( strformat('myID=%{myID};') )]

[h: thacoWindow = getTHACOWindow(getProperty("THACO",myID))]

[h: '<!-- FRAME STARTS -->']
[frame(thisFrameName,'width=400; height=400; '): {
	<html>
		<head>
			<title>[r: myName]</title>
			<link rel=stylesheet type=text/css href=CharSheet_css@Lib:Sheet>
			<meta name="input" content="true">
		</head>
		
		<body>
				<table width=100%>
					
					<!--Combat-->
					<tr>
						<td>
							<table width=100%>
								[r: getNPCCombatWindow(myID)]
							</table>
						</td>
					</tr>
					
					<!--Weapons-->
					<tr>
						<td>
							<table width=100%>
								<tr>
									<td align=left>
										[r: rollInitiativeLink], or attack with [r: multiAttackToolTip]
									</td>
								</tr>
								<table width=100%>
									<tr>
										<table width=100%>
											<tr class="headerRow"><td align="center">Attacks</td></tr>
											[r: activeWeaponsTxt]
										</table>
									</tr>
								</table>
							</table>
						</td>
					</tr>
					
					<!--Spells-->
					<tr>
						<td>
							<table width=100%>
								<caption>Spells</caption>
								<tr>
									<td>
										[r: arcaneSpellText]
									</td>
								</tr>
								<tr>
									<td>
										[r: divineSpellText]
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr valign="bottom">
						<td>
							[macro("CharSheet_Dice_Links@this"): strformat("myID=%{myID};")]
						</td>
					</tr>
					<tr>
						<td align=center>
							<form method="json" name="simpleDialogFrame" action="{formLink}">
							<input type="hidden" name="frameName" value="{thisFrameName}"></input>
							<input type="submit"  name="Done" value="Done"></input>
							</form>
						</td>
					</tr>
				</table>
		</body>
	</html>
}]