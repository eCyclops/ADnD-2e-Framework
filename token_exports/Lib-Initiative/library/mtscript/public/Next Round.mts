[h: cfgSettings = getLibProperty("CFGSettings", "Lib:ADND")]
[h: initiativeOnce = getStrProp(cfgSettings,"initiativeOnce","0")]

[h: '<!-- clear all failed save flags and current initiative halos/auras -->']
[h, macro("Clear Initiative Flags@Lib:Initiative"): ""]

[h: newInitiativeRound = getInitiativeRound() + 1]

[h, if(!initiativeOnce): removeAllFromInitiative()]
[h, if(!initiativeOnce): newRoundTxt = "Everyone Roll Initiative" ; newRoundTxt = "Initiative recycled for new Round!" ]

[h: setInitiativeRound(newInitiativeRound)]
[h: updateStates("1")]

[h: styleTxt = getLibProperty("styleTxt_NoColor", "Lib:ADND")]

[h: outTxt = strformat("
    <table  %{styleTxt} bgcolor=black width=100% cellpadding=1>
      <tr>
        <table bgcolor=yellow width=100% border=0>
          <tr>
            <td align=center style='font-size: medium;'>Round %{newInitiativeRound}</td>
          </tr>
          <tr>
            <td align=center><b>%{newRoundTxt}</b></td>
          </tr>
        </table>
      </tr>
    </table>"))]
[h: broadcast(outTxt)]