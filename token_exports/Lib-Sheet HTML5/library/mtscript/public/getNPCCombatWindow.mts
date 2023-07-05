[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(TokenID). "+getMacroName()+"@"+getMacroLocation())]

[H: myID = arg(0) ]

[h: name = getName(myID)]
[h: sourceName = getProperty('MonsterSourceName',myID)]

[h: sourceLink = macroLink(name,'viewMonsterEntry@Lib:MM:Macros','none',strformat("sourceName=%{sourceName}; "),myID)]
[h, if(sourceName != ''): 
	nameToolTip = toolTipIt("Click creature name to view details<br>"+getNPCToolTipTxt(sourceName),sourceLink);
	nameToolTip = name]

[h: hpLink =  macroLink(getProperty('HP',myID) + "/" + getProperty('MaxHP',myID),'HP_Adjust@Lib:ADND','none',strformat("myID=%{myID};"),myID)]
[h: hpLinkToolTip = toolTipIt("Click to adjust health",hpLink)]

[h: rollInitiativeLink =  macroLink("Initiative",'DO_Initiative@Lib:ADND','none',strformat("myID=%{myID};"),myID)]
[h: rollInitToolTip = toolTipIt("Click to roll initiative.",rollInitiativeLink)]

[h: abilityCheck =  macroLink("Ability Check",'NPC_AbilityCheck@Lib:ADND','none',strformat("myID=%{myID};"),myID)]
[h: abilityCheckToolTip = toolTipIt("Make an ability check.",abilityCheck)]

[h: saveLink = macroLink('Save',"DO_Save@Lib:ADND","none",strformat("myID=%{myID}; "),myID)]
[h: saveToolTip = toolTipIt("Make a save check.",saveLink)]

[h: dJSON = '']
[h: dJSON = json.set(dJSON,toolTipIt('Current Hitpoints, click to adjust.','HP'), hpLinkToolTip)]

[h: mac = getProperty('AC',myID)]
[h: dJSON = json.set(dJSON,toolTipIt('Armor Class','AC'), mac)]

[h: mhd = getProperty('HD',myID)]
[h: dJSON = json.set(dJSON,toolTipIt('Hit Dice','HD'), mhd)]

[h: mMove = getProperty('Movement',myID)]
[h: dJSON = json.set(dJSON,toolTipIt('Movement Rate','MV'), mMove)]

[h: msd = getProperty('SD',myID)]
[h: dJSON = json.set(dJSON,toolTipIt('Special Defenses','SD'), msd)]

[h: mmr = getProperty('MR',myID)]
[h: dJSON = json.set(dJSON,toolTipIt('Magic Resistance','MR'), mmr)]

[h: mint = getProperty('Intel',myID)]
[h: dJSON = json.set(dJSON,toolTipIt('Intelligence rating.','Int'), mint)]

[h: dJSON = json.set(dJSON,toolTipIt('Click to roll initiative.','Init'), rollInitToolTip)]
[h: dJSON = json.set(dJSON,'Save', saveToolTip)]
[h: dJSON = json.set(dJSON,'Ability', abilityCheckToolTip)]

[h: mmorale = getProperty('Morale',myID)]
[h: dJSON = json.set(dJSON,toolTipIt('Morale rating.','Morale'), mmorale)]

[h: mnumAtks = getProperty('numAttacks',myID)]
[h: dJSON = json.set(dJSON,toolTipIt('Number of Attacks per round.','#Atks'), mnumAtks)]

[h: mdamage = getProperty('damage',myID)]
[h: dJSON = json.set(dJSON,toolTipIt('Damage of Attacks.','DMG'), mdamage)]

[h: msa = getProperty('SA',myID)]
[h: dJSON = json.set(dJSON,toolTipIt('Special Attacks.','SA'), msa)]

<table width="100%">
	<tr><td><font size="5">[r: nameToolTip]</font></td></tr>
</table>
<hr>
<table width="100%">
	<tr>
		<td>
			<table width="100%">
				<tr>
					<td valign="top" width="50%">
						<table width="100%">
							<tr class="headerRow"><td colspan="2" align="center">Combat</td></tr>
							<tr class="oddRow"><td>Hit Points</td><td align="right">[r: hpLinkToolTip]</td></tr>
							<tr class="evenRow"><td>Movement</td><td align="right">[r: getProperty('Movement',myID)]</td></tr>
							<tr class="oddRow"><td>Attacks per Round</td><td align="right">[r: getProperty('numAttacks',myID)]</td></tr>
							<tr class="evenRow"><td>Special Attacks</td><td align="right">[r: getProperty('SA',myID)]</td></tr>
						</table>
					</td>
					<td valign="top">
						<table width="100%">
							<tr class="headerRow"><td colspan="2" align="center">Defenses</td></tr>
							<tr class="oddRow"><td>Armor Class</td><td align="right">[r: getProperty('AC',myID)]</td></tr>
							<tr class="evenRow"><td>Magic Resistance</td><td align="right">[r: getProperty('MR',myID)]</td></tr>
							<tr class="oddRow"><td>Special Defenses</td><td align="right">[r: getProperty('SD',myID)]</td></tr>
							<tr class="evenRow"><td>Hit Dice</td><td align="right">[r: getProperty('HD',myID)]</td></tr>
						</table>
					</td>
				</tr>
				<tr>
					<td colspan="2" valign="top" width="100%">
						<table width="100%">
							<tr class="headerRow"><td colspan="2" align="center">Checks</td></tr>
							<tr class="oddRow"><td align="center">[r: saveToolTip]</td><td align="center">[r: abilityCheckToolTip]</td></tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>