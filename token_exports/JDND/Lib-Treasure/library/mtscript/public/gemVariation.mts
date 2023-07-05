[h: gemValue = arg(0)]
[h: modRoll = "d10"]
[h, if(argCount() > 1): modRoll = arg(1)]

[h: modRoll = eval(modRoll)]

[h, switch(modRoll), code:
	case 1: {
		[if(gemValue >= 500000)                     : gemValue = 1000000]
		[if(gemValue >= 250000 && gemValue < 500000): gemValue =  500000]
		[if(gemValue >= 100000 && gemValue < 250000): gemValue =  250000]
		[if(gemValue >=  50000 && gemValue < 100000): gemValue =  100000]
		[if(gemValue >=  25000 && gemValue <  50000): gemValue =   50000]
		[if(gemValue >=  10000 && gemValue <  25000): gemValue =   25000]
		[if(gemValue >=   5000 && gemValue <  10000): gemValue =   10000]
		[if(gemValue >=   1000 && gemValue <   5000): gemValue =    5000]
		[if(gemValue >=    500 && gemValue <   1000): gemValue =    1000]
		[if(gemValue >=    100 && gemValue <    500): gemValue =     500]
		[if(gemValue >=     50 && gemValue <    100): gemValue =     100]
		[if(gemValue >=     10 && gemValue <     50): gemValue =      50]
		[if(gemValue >=      5 && gemValue <     10): gemValue =      10]
		[if(gemValue >=      1 && gemValue <      5): gemValue =       5]
		[if(gemValue >=    0.5 && gemValue <      1): gemValue =       1]
		[if(gemValue >=   0.25 && gemValue <    0.5): gemValue =     0.5]
		[if(gemValue >=   0.05 && gemValue <   0.25): gemValue =    0.25]
		[gemVariation(gemValue)]
	};
	case 2: { [if(gemValue != 1000000): gemValue = 2*gemValue; gemValue = 1000000] };
	case 3: { [gemValue = gemValue + (gemValue * (0.1 * d6))] };
	case 9: { [gemValue = gemValue - (gemValue * (0.1 * d4))] };
	case 10: {
		[if(gemValue > 500000)                      : gemValue = 500000]
		[if(gemValue > 250000 && gemValue <= 500000): gemValue = 250000]
		[if(gemValue > 100000 && gemValue <= 250000): gemValue = 100000]
		[if(gemValue >  50000 && gemValue <= 100000): gemValue =  50000]
		[if(gemValue >  25000 && gemValue <=  50000): gemValue =  25000]
		[if(gemValue >  10000 && gemValue <=  25000): gemValue =  10000]
		[if(gemValue >   5000 && gemValue <=  10000): gemValue =   5000]
		[if(gemValue >   1000 && gemValue <=   5000): gemValue =   1000]
		[if(gemValue >    500 && gemValue <=   1000): gemValue =    500]
		[if(gemValue >    100 && gemValue <=    500): gemValue =    100]
		[if(gemValue >     50 && gemValue <=    100): gemValue =     50]
		[if(gemValue >     10 && gemValue <=     50): gemValue =     10]
		[if(gemValue >      5 && gemValue <=     10): gemValue =      5]
		[if(gemValue >      1 && gemValue <=      5): gemValue =      1]
		[if(gemValue >    0.5 && gemValue <=      1): gemValue =    0.5]
		[if(gemValue >   0.25 && gemValue <=    0.5): gemValue =   0.25]
		[if(gemValue >   0.05 && gemValue <=   0.25): gemValue =   0.05]
		[gemVariation(gemValue)]
	};
	default: { [""] }
]

[h: macro.return = gemValue]