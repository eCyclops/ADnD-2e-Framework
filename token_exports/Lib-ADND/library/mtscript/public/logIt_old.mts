[h: previous = ""]

[token("Lib:ADND"): previous = getGMNotes()]

[H: CRLF = decode("%0D%0A")]﻿

[H, token("Lib:ADND"): setGMNotes(strformat("%{previous}%{arg(0)}%{CRLF}"))]
Logging [r: arg(0)].<br>
After: ([r: getGMNotes()]).<br>
