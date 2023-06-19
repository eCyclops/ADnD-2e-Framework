[H: numArgs = argCount()]
[h: assert(!(numArgs<2),"To few arguments to function "+getMacroName()+"(StringToLog,TokenID). "+getMacroName()+"@"+getMacroLocation())]

[H: txtToLog = arg(0) ]
[H: myID = arg(1) ]

[H: CRLF = decode("%0D%0A")]﻿

[h: 'tokenName = getName(myID)']
[h: tokenName = myID]

[h, token(tokenName): previous = getGMNotes()]

[h: timeStamp = getTimeStamp()]
[H, token(tokenName): setGMNotes(strformat("%{previous}%{timeStamp} LOG: %{txtToLog}%{CRLF}"))]
