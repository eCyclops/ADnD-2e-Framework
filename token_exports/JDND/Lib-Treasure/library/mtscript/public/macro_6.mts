[h: gemBaseValue = gemBase()]

[h: gemBaseValue = macro.return]

[r: "Base gem value is "+gemBaseValue+".<br>"]

[h: gemFinalValue = gemVariation(gemBaseValue)]

[r: "Actual gem value is "+gemFinalValue]

[h: macro.return = gemFinalValue]