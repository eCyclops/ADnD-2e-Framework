[H: numArgs = argCount()]
[h: assert(!(numArgs<2),"To few arguments to function "+getMacroName()+"(toolTipText, outputText). "+getMacroName()+"@"+getMacroLocation())]

[H: toolTipText = arg(0) ]
[H: normalOutput = arg(1) ]

[H: toolTipText = strformat("<html>%{toolTipText}</html>") ]
[h: formattedtt = strformat('<span title="%{toolTipText}">%{normalOutput}</span>') ]

[h: macro.return = formattedtt]
