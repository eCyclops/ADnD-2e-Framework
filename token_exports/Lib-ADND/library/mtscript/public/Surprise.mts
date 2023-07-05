[h, macro("Get Surprise Target Numbers@Lib:ADND"): ""]
[h: surpriseRolls = macro.return]

[h: surprisedTable = ""]
[h: notSurprisedTable = ""]
[h, forEach(tokenID, surpriseRolls), code: {
  [h: tokenName = getName(tokenID)]
  [h: surpriseTarget = json.get(json.get(surpriseRolls, tokenID), "target")]
  [h: surpriseDice = json.get(json.get(surpriseRolls, tokenID), "dice")]
  [h: surpriseDiceRoll = json.get(json.get(surpriseRolls, tokenID), "roll")]

  [h: diceResultTable = strformat("
    <table bgcolor=black cellspacing=1 cellpadding=3>
      <tr style='font-weight:bold'>
        <td bgcolor=#d4d4d4>Dice</td>
        <td align=right bgcolor=#d4d4d4>Result</td>
      </tr>
      <tr>
        <td bgcolor=white>%{surpriseDice}</td>
        <td align=right bgcolor=white>%{surpriseDiceRoll}</td>
      </tr>
    </table>")]
  [h: diceResultTooltip = toolTipIt(diceResultTable,surpriseDiceRoll)]

  [h, if(surpriseDiceRoll > surpriseTarget), code: {
    [h: notSurprisedTable = concat(notSurprisedTable, strformat("
      <tr>
        <td bgcolor='#4CC417'>%{tokenName}</td>
        <td bgcolor='#4CC417'>%{diceResultTooltip}</td>
        <td bgcolor='#4CC417'>%{surpriseTarget}</td>
        <td bgcolor='#4CC417'>No</td>
      </tr>
    "))]
  };
  {
    [h: surprisedTable = concat(surprisedTable, strformat("
      <tr>
        <td bgcolor='#CCCC00'>%{tokenName}</td>
        <td bgcolor='#CCCC00'>%{diceResultTooltip}</td>
        <td bgcolor='#CCCC00'>%{surpriseTarget}</td>
        <td bgcolor='#CCCC00'>Yes</td>
      </tr>
    "))]
  }]
}]

[h: outTxt = strformat("
<table cellpadding=0 bgcolor=black width=100%>
  <tr>
    <td bgcolor='#c1cdcd'>
      <table border=0 width=100%>
        <tr>
          <td align=center bgcolor='#c1cdcd'>
            Surprise Results
          </td>
        </tr>
        <tr>
          <td>
            <table bgcolor=black cellspacing=1 cellpadding=2 width=100%>
              <tr bgcolor='#c1cdcd'>
                <td><b>Name</b></td>
                <td><b>Roll</b></td>
                <td><b>Target</b></td>
                <td><b>Surprised</b></td>
              </tr>
              %{notSurprisedTable}
              %{surprisedTable}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>"))]

[h: broadcast(outTxt,"gm")]