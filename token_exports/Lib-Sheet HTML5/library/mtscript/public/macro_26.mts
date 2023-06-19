[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: d4Link =  macroLink("d4","Dice_Simple_Roll@Lib:ADND","none",strformat('myID=%{myID}; dSize=4;'),myID)]
[h: d6Link =  macroLink("d6","Dice_Simple_Roll@Lib:ADND","none",strformat('myID=%{myID}; dSize=6;'),myID)]
[h: d8Link =  macroLink("d8","Dice_Simple_Roll@Lib:ADND","none",strformat('myID=%{myID}; dSize=8;'),myID)]
[h: d10Link =  macroLink("d10","Dice_Simple_Roll@Lib:ADND","none",strformat('myID=%{myID}; dSize=10;'),myID)]
[h: d12Link =  macroLink("d12","Dice_Simple_Roll@Lib:ADND","none",strformat('myID=%{myID}; dSize=12;'),myID)]
[h: d20Link =  macroLink("d20","Dice_Simple_Roll@Lib:ADND","none",strformat('myID=%{myID}; dSize=20;'),myID)]
[h: d100Link =  macroLink("d100","Dice_Simple_Roll@Lib:ADND","none",strformat('myID=%{myID}; dSize=100;'),myID)]

[h: diceCustomTip = toolTipIt("Roll a custom size dice.","Custom")]
[h: diceLink =  macroLink(diceCustomTip,"Dice_Simple_Roll@Lib:ADND","none",strformat('myID=%{myID}; '),myID)]

[h: args = strformat("myID=%{myID};")]

<div class="dice">
  <ul>
    <li class="headerTab">[r: d4Link]</li>
    <li class="headerTab">[r: d6Link]</li>
    <li class="headerTab">[r: d8Link]</li>
    <li class="headerTab">[r: d10Link]</li>
    <li class="headerTab">[r: d12Link]</li>
    <li class="headerTab">[r: d20Link]</li>
    <li class="headerTab">[r: d100Link]</li>
    <li class="headerTab">[r: diceLink]</li>
  </ul>
<div>