[h: tokenList = arg(0)]

[h: stateList = "{}"]
[h, foreach(tokenID, tokenList), code: {
  [h: tokenStates = getProperty("stateEffects", tokenID)]
  [h, foreach(stateData, tokenStates), code: {
    [h: name = json.get(stateData, "name")]
    [h: stateTokens = json.get(stateList, name)]
    [h: stateTokens = listAppend(stateTokens, tokenID)]
    [h: stateList = json.set(stateList, name, stateTokens)]
  }]
}]

[h: macro.return = stateList]