[h: tokenID = json.get(arg(0),"tokenID")]
[h: selectedTokens = json.get(arg(0),"selectedTokens")]
[h: searchField = json.get(arg(0),"searchField")]

[h: args = json.set("{}","tokenID",tokenID,"selectedTokens",selectedTokens,"searchField",searchField)]
[h, macro("Spawn Creature Main@Lib:MM:Macros"): args]
