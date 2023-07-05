[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[h: abilitiesIMG = strformat('<img height=15 width=15 src="asset://21f199b0fe4a2995ade2c0d3dae7294e"/></img>')]
[h: personalIMG = strformat('<img height=15 width=15 src="asset://eb6903ebea9ed4081a04bbfe903fdb67"/></img>')]

<div class="name-container">
  <h2 class="name">[r: getName(myID)]</h2><p class="alignment">[r: getStrProp(getProperty("Character_Details",myID),"Alignment")]</p>
</div>

<hr>

<div class="columns">
  <div>Level [r: getStrProp(getProperty("Character_Details",myID),"Level")] [r: getStrProp(getProperty("Character_Details",myID),"Race")] [r: getStrProp(getProperty("Character_Details",myID),"Class")]</div>

  <!-- Status Bars -->
  <div class="stretch">
    <!-- HP Bar -->
    <div>
      [h: HP = getProperty("HP", myID)]
      [h: MaxHP = getProperty("MaxHP", myID)]
      [h: barWidth = min(100*HP/MaxHP, 100)]
      [h, if(barWidth < 25): barColor="245, 10, 10"; barColor="247, 149, 12"]
      [h, if(barWidth > 50): barColor="34, 191, 37"]
      [h: hpMacroArgs = strformat("myID=%{myID}; page=General;")]
      [r, macro("Mod:Status Bar@this"): strformat("label=HP:; value=%{HP}; max=%{MaxHP}; color=%{barColor}; macro=HP_Adjust@Lib:ADND; macroOutput=none; macroArgs=%{hpMacroArgs};")]
    </div>

    <!-- XP Bar -->
    <div>
      [h: XP = getProperty("XP", myID)]
      [h: XPNeeded = getProperty("XPNeeded", myID)]
      [r, macro("Mod:Status Bar@this"): strformat("label=XP:; value=%{XP}; max=%{XPNeeded}; color=%{barColor};")]
    </div>
  </div>
</div>

<div class="columns">
  <div class="stretch">
    [r, macro("Mod:Ability Scores@this"): myID]
  </div>
  <div class="stretch">
    [r, macro("Mod:PC:Appearance@this"): myID]
  </div>
</div>