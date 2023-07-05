[h, code: {"
	<!-- Configure these property names for your games HP and Max HP properties. 
	If these are not defined in your 'Basic' properties (or in the properties of
	any tokens you select), the overlay will not work.

	The vDisplayBarName should be configured to display to 'GM Only', or players 
	will see the bars. You can make a new bar that is GM only and specify it here. 	-->"
	}]
[h: assert(getCurrentMapName() != "Library", "Not updating partyOverlay on Library Map.", 0)]
[h: vBarValueProp = "HP"]
[h: vBarMaxProp = "MaxHP"]
[h: vHideImageThreshold = 10]
[h: "<!-- This bar should be configured to display to 'GM Only', or players will see the bars. -->"]
[h: vDisplayBarName = "Health"]

[h: vPCs = getPC()]
[h: vTokenCount = listCount(vPCs)]
[h, foreach(vToken, getTokens(), ""), if (listContains(vPCs, vToken) > 0), code: {
	[h: vBarValue = getProperty(vBarValueProp, vToken)]
	[h: vBarMax = getProperty(vBarMaxProp, vToken)]
	[h: vBarMax = if(vBarMax==0, 1, vBarMax)]
	[setBar(vDisplayBarName, vBarValue/vBarMax, vToken)]
	[setBarVisible(vDisplayBarName, 0, vToken)]
};{
	[setBarVisible(vDisplayBarName, 0, vToken)]
}]
[overlay(getMacroName()): {
<html><head>
<link rel="stylesheet" type="text/css" href="PartyOverlayCSS@[r: getMacroLocation()]">
</head><body class="[r, if(vTokenCount > 1): "multiple-selected"]">
[r, foreach(vPC, getPC(), ""), code: {
	[h: vBarValue = getProperty(vBarValueProp, vPC)]
	[h: vBarMax = getProperty(vBarMaxProp, vPC)]
	[h: "<!-- Sometimes we have extra PC tokens (Spiritual Weapon, Flaming Sphere, etc.) - avoid divideByZero errors, and hide these tokens from the overlay-->"]
	[h: vBarMax = if(vBarMax==0, -1, vBarMax)]
	[h: "<!-- special displays for dying/dead states -->"]
	[h: vDying = and(getState("Dying", vPC),!getState("Dead", vPC))]
	[h: vDead = getState("Dead", vPC)]
	[h: vDyingImg = strformat('<img style="height:1rem;margin-left: 0.25rem" alt="Dying!" src="%s"></img>', getStateImage("Dying"))]
	[h: vDeadImg = strformat('<img style="height:1rem;margin-left: 0.25rem" alt="Dead!" src="%s"></img>', getStateImage("Dead"))]
	<div class="player-token [r, if(vBarMax < 0): "hidden"]">		
		<div class="player-token__image [r, if(vTokenCount > vHideImageThreshold): "hidden"]">
			<img src="[r: getTokenImage(if(vTokenCount == 1, 60, 40), vPC)]">
		</div>
		<div class="player-token__content [r, if(vDead): "player-dead"]">
			<h2>[r: getName(vPC)][r, if(vDying): vDyingImg][r, if(vDead): vDeadImg]</h2>
			<div class="player-token__content__hp">
				<div class="player-token__content__hp__bar" 
					style="width:[r: if(vBarValue <= 0, if(vDead, 0, 100), number(vBarValue)/vBarMax * 100)]%;
					[h: vBarRatio = vBarValue / vBarMax]
					[h: vH = max(0, floor(vBarRatio * 120))]
					[h: vS = 75]
					[h: vL = 30]
					[h: vHSL = "hsl(" + vH + ", " + vS + "%, " + vL + "%)"]
					background-color: [r: vHSL];">
				</div>
				[h: vDeathSaves = getProperty("DeathSaves", vPC)]
				[r, if(!vDying): "<!-- Hide when not dying! "]
				<div class="player-token__content__death_saves"><table style="margin-top: 0">
					<tr>
						<td>Saves:</td>
						<td>
							[h: vDeathSuccesses = json.get(vDeathSaves, "Successes")]
							[h, if(isNumber(vDeathSuccesses) == 0): vDeathSuccesses = 0]
							<span style="color:green">[r, for(i, 0, vDeathSuccesses, 1, "&nbsp;"): "&#x2713"]</span>
							[r, for(i, vDeathSuccesses, 3, 1, "&nbsp;"): "&#9675;"]
						</td>
						<td style="padding: 0px 3px;">|</td>
						<td>
							[h: vDeathFails = json.get(vDeathSaves, "Failures")]
							[h, if(isNumber(vDeathFails) == 0): vDeathFails = 0]
							<span style="color:red">[r, for(i, 0, vDeathFails, 1, "&nbsp;"): "&#x2717"]</span>
							[r, for(i, vDeathFails, 3, 1, "&nbsp;"): "&#9675;"]
						</td>
					<td>
				</table></div>
				[r, if(!vDying): "-->"]
				[r, if(!vDead): "<!-- Hide when not dead! "]
				<div class="player-token__content__hp__value">
					<span style="color:gray">Dead</span>
				</div>
				[r, if(!vDead): "-->"]
				<div class="player-token__content__hp__value [r, if(vDying || vDead): "hidden"]">
					[r: vBarValue + " / " + vBarMax]
				</div>
			</div>
		</div>
	</div>
}]
</body></html>
}]