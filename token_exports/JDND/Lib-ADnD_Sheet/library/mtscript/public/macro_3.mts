[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: d4image = strformat('<img height=45 width=45 src="asset://ca6ef53527678e981264cf63e1ed0414"/></img>')]
[h: d4Link =  macroLink(d4image,"Dice_Simple_Roll@Lib:Sheet","none",strformat('myID=%{myID}; dSize=4;'),myID)]

[h: d6image = strformat('<img height=45 width=45 src="asset://477b40fdf089bf04100987f6859a07ea"/></img>')]
[h: d6Link =  macroLink(d6image,"Dice_Simple_Roll@Lib:Sheet","none",strformat('myID=%{myID}; dSize=6;'),myID)]

[h: d8image = strformat('<img height=45 width=45 src="asset://ad8f11bb06fca6e003554fd6132917a4"/></img>')]
[h: d8Link =  macroLink(d8image,"Dice_Simple_Roll@Lib:Sheet","none",strformat('myID=%{myID}; dSize=8;'),myID)]

[h: d10image = strformat('<img height=45 width=45 src="asset://f070c522b16a3262ec56333856227771"/></img>')]
[h: d10Link =  macroLink(d10image,"Dice_Simple_Roll@Lib:Sheet","none",strformat('myID=%{myID}; dSize=10;'),myID)]

[h: d12image = strformat('<img height=45 width=45 src="asset://703c465ff86f437c43367dac73890bb8"/></img>')]
[h: d12Link =  macroLink(d12image,"Dice_Simple_Roll@Lib:Sheet","none",strformat('myID=%{myID}; dSize=12;'),myID)]

[h: d20image = strformat('<img height=45 width=45 src="asset://2fa2924e10cb74bd8cb4ffa30b2cbf03"/></img>')]
[h: d20Link =  macroLink(d20image,"Dice_Simple_Roll@Lib:Sheet","none",strformat('myID=%{myID}; dSize=20;'),myID)]

[h: diceCustomTip = toolTipIt("Roll a custom size dice.","Custom Roll")]
[h: diceLink =  macroLink(diceCustomTip,"Dice_Simple_Roll@Lib:Sheet","none",strformat('myID=%{myID}; '),myID)]

[h: args = strformat("myID=%{myID};")]
<table width="100%">
  <tr><td class="headerRow">Dice Bag</td></tr>
    <tr><td>
      <table align=center>
        <tr valign=top>
          <td valign=top><table><tr><th>d4</th></tr><td>[r: d4Link]</td></table></td>
        	<td valign=top><table><tr><th>d6</th></tr><td>[r: d6Link]</td></table></td>
        	<td valign=top><table><tr><th>d8</th></tr><td>[r: d8Link]</td></table></td>
        </tr>
        <tr>
        	<td valign=top><table><tr><th>d10</th></tr><td>[r: d10Link]</td></table></td>
        	<td valign=top><table><tr><th>d12</th></tr><td>[r: d12Link]</td></table></td>
        	<td valign=top><table><tr><th>d20</th></tr><td>[r: d20Link]</td></table></td>
        </tr>
      </table>
    </td></tr>
  <tr><td align=center>[r: diceLink]</td></tr>
</table>