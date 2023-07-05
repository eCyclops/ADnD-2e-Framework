[h: statusBarLabel = getStrProp(macro.args,"label")]
[h: statusBarValue = getStrProp(macro.args,"value")]
[h: statusBarMax = getStrProp(macro.args,"max")]
[h: statusBarColor = getStrProp(macro.args,"color")]
[h: statusBarMacro = getStrProp(macro.args,"macro")]
[h: statusBarMacroOutput = getStrProp(macro.args,"macroOutput")]
[h: statusBarMacroArgs = getStrProp(macro.args,"macroArgs")]

[h, if(statusBarMacro == ""): statusBarClass = "bar"; statusBarClass = "bar interactive"]

<div>
  [h: statusBarWidth = min(100*statusBarValue/statusBarMax, 100)]
  <div class="bar-label">[r:statusBarLabel]</div>
  [h: barHTML = strformat('<div class="%{statusBarClass}"><span style="width:%{statusBarWidth}\%; background-color: RGB(%{statusBarColor});"></span><div class="bar-value">%{statusBarValue}/%{statusBarMax}</div></div>')]
  [if(statusBarMacro != ""), code: {
    [r: macroLink(barHTML, statusBarMacro, statusBarMacroOutput, statusBarMacroArgs)]
  };
  {
    [r: barHTML]
  }]
</div>