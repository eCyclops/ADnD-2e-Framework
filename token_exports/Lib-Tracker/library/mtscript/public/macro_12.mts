[h: token = arg(0)]

[h: tokenMap = listGet(getTokenMap(token),0)]
[h, if(tokenMap != getCurrentMapName()): displayMap = strformat("<span class='map-name'>(%{tokenMap})</span>"); displayMap = ""]

[if(tokenMap != ""), code: {
  [h, if(getSelected() != ""), code: {
    [h: teleportLinkText = macroLinkText("Teleport@Lib:Tracker", "none", token)]
    [h: teleportLink = strformat("<a href='%{teleportLinkText}' title='Teleport to selected token'>Teleport</a>")]
  };
  {
    [h: teleportLink = ""]
  }]

  [h: playerVisibleTokens = getLibProperty("playerVisibleTrackedTokens", "Lib:Tracker")]
  [h, if(listFind(playerVisibleTokens, token) == -1), code: {
    [h: visibilityIcon = "hidden-icon"]
    [h: borderClass = "hidden"]
  };
  {
    [h: visibilityIcon = "visible-icon"]
    [h: borderClass = "visible"]
  }]
  
  [h: tokenHP = getProperty("HP", token, tokenMap)]
  [h: tokenMaxHP = getProperty("MaxHP", token, tokenMap)]
  
  [h, if(isNumber(tokenHP) && isNumber(tokenMaxHP)): isCharacter = 1; isCharacter = 0]

  [if(isCharacter), code: {
    [h: tokenMaxHP = max(tokenMaxHP,1)]
    [h: healthbarWidth = min(100*(tokenHP/tokenMaxHP), 100)]
    [h, if(healthbarWidth < 25): healthbarColor = "#f50a0a"; healthbarColor = "#f7950c"]
    [h, if(healthbarWidth > 50): healthbarColor = "#22bf25"]
    [h: healthbarStyle = strformat("width:%{healthbarWidth}\%; height: 100\%; background-color: %{healthbarColor};")]

    <div class="tracked-token [r: borderClass]">
      <div class="token-image">
        <img src="[r: getTokenImage(50, token, tokenMap)]"></img>
      </div>
      <div class="token-data">
        <h1>[r: getName(token, tokenMap)] [r: displayMap]</h1>
        <div class="health-container">
          <div class="health-label">[r:tokenHP]/[r:tokenMaxHP]</div>
          <div class="health-bg"><div style="[r:healthbarStyle]"></div></div>
        </div>
        <ul class="stat-display">
          <li>Move: [r:getProperty("AdjustedMove", token, tokenMap)]</li>
          <li>AC: [r:getProperty("AC", token, tokenMap)]</li>
        </ul>
      </div>

      <div class="controls">
        <a href='[r: macroLinkText("Find@Lib:Tracker", "none", token)]' title='Center view on this token'>Find</a>
        <a href='[r: macroLinkText("CharSheet@Lib:Sheet", "none", "myID="+token+";")]' title='Open character sheet'>Sheet</a>
        [r: teleportLink]
        <a class="right-button" href='[r: macroLinkText("HP_Adjust@Lib:ADND", "none", strformat("myID=%{token};"))]' title='Adjust health'>Health</a>
      </div>
      
      <div class="stop-tracking" title="Remove from tracker">[r: macroLink("X", "Remove from Tracker@Lib:Tracker", "none", token)]</div>

      <div class="visibility-control" title="Hide/Show to players">[r: macrolink("<svg class='icon " + visibilityIcon + "'><use xlink:href='#" + visibilityIcon + "' /></svg>", "Change Player Visibility@Lib:Tracker", "none", token)]</div>
    </div>
  };
  {
    <div class="tracked-token [r: borderClass]">
      <div class="token-image">
        <img src="[r: getTokenImage(50, token, tokenMap)]"></img>
      </div>
      <div class="token-data">
        <div>[r: getName(token, tokenMap)] [r: displayMap]</div>
      </div>

      <div class="controls">
        <a href='[r: macroLinkText("Find@Lib:Tracker", "none", token)]' title='Center view on this token'>Find</a>
        [r: teleportLink]
      </div>
      
      <div class="stop-tracking">[r: macroLink("X", "Remove from Tracker@Lib:Tracker", "none", token)]</div>

      <div class="visibility-control" title="Hide/Show to players">[r: macrolink("<svg class='icon " + visibilityIcon + "'><use xlink:href='#" + visibilityIcon + "' /></svg>", "Change Player Visibility@Lib:Tracker", "none", token)]</div>
    </div>
  }]
};
{
  [h, macro("Missing Track@Lib:Tracker"): token]
}]
