[h: targetID = json.get(arg(0), "myID")]
[h: saveType = json.get(arg(0), "saveType")]
[h: charClass = json.get(arg(0), "charClass")]
[h: charLevel = json.get(arg(0), "charLevel")]

[h: outputText = "Sorry, saves don't roll yet."]

<!-- text, tokenID, output type (only applies to NPCs), hide from player (applies to player rolls) -->
[r: showIt(outputText, targetID, "","false")]