[h: jewelValue = arg(0)]
[h: modRoll = "d10"]
[h, if(argCount() > 1): modRoll = arg(1)]

[h: modRoll  = eval(modRoll)]
[h: modRoll2 = 1d8]

[h, while (modRoll == 1), code: {
	[switch(jewelValue):
		case "100d10": jewelValue = "200d6";
		case "200d6":  jewelValue = "300d6";
		case "300d6":  jewelValue = "500d6";
		case "500d6":  jewelValue = "1000d6";
		case "1000d6": jewelValue = "2000d4";
		case "2000d4": jewelValue = "2000d6";
		case "2000d6": jewelValue = "12000"]
	[modRoll = d10]
	}
]

[h: valueMod = 0]

[h, if(modRoll2 == 1), code: {
	[valueMod = 5000]
	[modRoll3 = d6]
	[while(modRoll3 == 1), code: {
		[valueMod = valueMod * 2]
		[modRoll3 = if(valueMod >= 640000,6,d6)]
	}]
}]

[h, if(matches(jewelValue, ".*000.*")): jewelValue = eval(jewelValue) + valueMod; jewelValue = eval(jewelValue)]

[h: macro.return = jewelValue]