[h: jewelBaseValue = jewelBase()]

[h: jewelBaseValue = macro.return]

[r: "Base jewelry value is "+jewelBaseValue+".<br>"]

[h: jewelFinalValue = jewelVariation(jewelBaseValue)]

[r: "Actual jewelry value is "+jewelFinalValue]

[h: macro.return = jewelFinalValue]