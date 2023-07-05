[H: numArgs = argCount()]
[h: assert(!(numArgs<3),"To few arguments to function "+getMacroName()+"(value, name,propertyName,lineInputLength). "+getMacroName()+"@"+getMacroLocation())]

[H: value = arg(0) ]
[H: name = arg(1) ]
[H: propertyName = arg(2) ]

[h,if(numArgs == 4): lineSize = 25; lineSize = 15]

[h: thisInput = strformat('<td><b>%{name}</b></td><td><input type="text" name="%{propertyName}" size="%{lineSize}" maxlength="300" value="%{value}"></td>')]

[h: macro.return = thisInput]

