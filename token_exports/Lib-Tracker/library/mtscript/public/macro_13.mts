[h: tokenID = arg(0)]

[h: tokenMap = listGet(getTokenMap(tokenID),0)]
[h, if(tokenMap != getCurrentMapName()): displayMap = strformat("<span class='map-name'>(%{tokenMap})</span>"); displayMap = ""]

[h: playerVisibleTokens = getLibProperty("playerVisibleTrackedTokens", "Lib:Tracker")]

[if(tokenMap != "" && listFind(playerVisibleTokens, tokenID) != -1), code: {  
  [h: tokenHP = getProperty("HP", tokenID, tokenMap)]
  [h: tokenMaxHP = getProperty("MaxHP", tokenID, tokenMap)]

  [h: playerOwnedTokens = getOwned()]
  [h, if(listFind(playerOwnedTokens, tokenID) != -1), code: {
    [h: sheetLink = macroLinkText("CharSheet@Lib:Sheet", "none", "myID="+tokenID+";")]
    [h: healthLink = macroLinkText("HP_Adjust@Lib:ADND", "none", strformat("myID=%{tokenID};"))]
    [h: ownedLinks = strformat("
      <a href='%{sheetLink}' title='Open character sheet'>Sheet</a>
      <a class='right-button' href='%{healthLink}' title='Adjust health'>Health</a>")]
  };
  {
    [h: ownedLinks = ""]
  }]
  
  [h, if(isNumber(tokenHP) && isNumber(tokenMaxHP)): isCharacter = 1; isCharacter = 0]

  [if(isCharacter), code: {
    [h: tokenMaxHP = max(tokenMaxHP,1)]
    [h: healthbarWidth = min(100*(tokenHP/tokenMaxHP), 100)]
    [h, if(healthbarWidth < 25): healthbarColor = "#f50a0a"; healthbarColor = "#f7950c"]
    [h, if(healthbarWidth > 50): healthbarColor = "#22bf25"]
    [h: healthbarStyle = strformat("width:%{healthbarWidth}\%; height: 100\%; background-color: %{healthbarColor};")]

    <div class="tracked-token hidden">
      <div class="token-image">
        <img src="[r: getTokenImage(50, tokenID, tokenMap)]"></img>
      </div>
      <div class="token-data">
        <h1>[r: getName(tokenID, tokenMap)] [r: displayMap]</h1>
        <div class="health-container">
          <div class="health-label">[r:tokenHP]/[r:tokenMaxHP]</div>
          <div class="health-bg"><div style="[r:healthbarStyle]"></div></div>
        </div>
        <ul class="stat-display">
          <li>Move: [r:getProperty("AdjustedMove", tokenID, tokenMap)]</li>
          <li>AC: [r:getProperty("AC", tokenID, tokenMap)]</li>
        </ul>
      </div>

      <div class="controls">
        <a href='[r: macroLinkText("Find@Lib:Tracker", "none", tokenID)]' title='Center view on this token'>Find</a>
        [r: ownedLinks]
      </div>
    </div>
  };
  {
    <div class="tracked-token">
      <div class="token-image">
        <img src="[r: getTokenImage(50, tokenID, tokenMap)]"></img>
      </div>
      <div class="token-data">
        <div>[r: getName(tokenID, tokenMap)] [r: displayMap]</div>
      </div>

      <div class="controls">
        <a href='[r: macroLinkText("Find@Lib:Tracker", "none", tokenID)]' title='Center view on this token'>Find</a>
      </div>
    </div>
  }]
};{}]
