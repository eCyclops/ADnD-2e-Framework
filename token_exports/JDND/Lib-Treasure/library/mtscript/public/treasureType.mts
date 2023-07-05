[h: treasureTypeCode = arg(0)]
[h: cp = 0]
[h: sp = 0]
[h: ep = 0]
[h: gp = 0]
[h: pp = 0]
[h: gem = 0]
[h: jew = 0]
[h: mm = "no maps or magic"]

[h: initialRoll = d100]

[h, switch(treasureTypeCode), code:
	case "A": {
		[if(initialRoll<=25): cp=1d6;0]
		[if(initialRoll<=30): sp=1d6;0]
		[if(initialRoll<=35): ep=1d6;0]
		[if(initialRoll<=40): gp=1d10;0]
		[if(initialRoll<=25): pp=1d4;0]
		[if(initialRoll<=60): gem=4d10;0]
		[if(initialRoll<=50): jew=3d10;0]
		[if(initialRoll<=30): mm=3+ " of any magic or map";"no maps or magic"]
	};
	case "B": {
		[if(initialRoll<=50): cp=1d8;0]
		[if(initialRoll<=25): sp=1d6;0]
		[if(initialRoll<=25): ep=1d4;0]
		[if(initialRoll<=25): gp=1d3;0]

		[if(initialRoll<=30): gem=1d8;0]
		[if(initialRoll<=20): jew=1d4;0]
		[if(initialRoll<=10): mm=1+" sword, armor, or misc. weapon";"no maps or magic"]
	};
	case "C": {
		[if(initialRoll<=20): cp=1d12;0]
		[if(initialRoll<=30): sp=1d6;0]
		[if(initialRoll<=10): ep=1d4;0]


		[if(initialRoll<=25): gem=1d6;0]
		[if(initialRoll<=20): jew=1d3;0]
		[if(initialRoll<=10): mm=2+" of any magic or map";"no maps or magic"]
	};
	case "D": {
		[if(initialRoll<=10): cp=1d8;0]
		[if(initialRoll<=15): sp=1d12;0]
		[if(initialRoll<=15): ep=1d8;0]
		[if(initialRoll<=50): gp=1d6;0]

		[if(initialRoll<=30): gem=1d10;0]
		[if(initialRoll<=25): jew=1d6;0]
		[if(initialRoll<=15): mm=2+" of any magic or map and 1 potion";"no maps or magic"]
	};
	case "E": {
		[if(initialRoll<=05): cp=1d10;0]
		[if(initialRoll<=25): sp=1d12;0]
		[if(initialRoll<=25): ep=1d6;0]
		[if(initialRoll<=25): gp=1d8;0]

		[if(initialRoll<=15): gem=1d12;0]
		[if(initialRoll<=10): jew=1d8;0]
		[if(initialRoll<=25): mm=3+" of any magic or map and 1 scroll";"no maps or magic"]
	};
	case "F": {

		[if(initialRoll<=10): sp=1d20;0]
		[if(initialRoll<=15): ep=1d12;0]
		[if(initialRoll<=40): gp=1d10;0]
		[if(initialRoll<=35): pp=1d8;0]
		[if(initialRoll<=20): gem=3d10;0]
		[if(initialRoll<=10): jew=1d10;0]
		[if(initialRoll<=30): mm=3+" of any magic or map except swords or misc. weapons and 1 potion and 1 scroll"]
	};
	case "G": {


		
		[if(initialRoll<=50): gp=1d10;0]
		[if(initialRoll<=50): pp=1d4;0]
		[if(initialRoll<=30): gem=4d10;0]
		[if(initialRoll<=25): jew=3d10;0]
		[if(initialRoll<=35): mm=4+" of any magic or map and 1 scroll"]
	};
	case "H": {
		[if(initialRoll<=25): cp=5d6;0]
		[if(initialRoll<=40): sp=1d100;0]
		[if(initialRoll<=40): ep=10d4;0]
		[if(initialRoll<=55): gp=10d6;0]
		[if(initialRoll<=25): pp=5d10;0]
		[if(initialRoll<=50): gem=1d100;0]
		[if(initialRoll<=50): jew=10d4;0]
		[if(initialRoll<=15): mm=4+ " of any magic or map plus 1 potion and 1 scroll";"no maps or magic"]
	};
	case "I": {


		
		
		[if(initialRoll<=30): pp=3d6;0]
		[if(initialRoll<=55): gem=2d10;0]
		[if(initialRoll<=50): jew=1d12;0]
		[if(initialRoll<=15): mm=1+ " of any magic or map";"no maps or magic"]
	};
	case "J": {
		[cp=3d8]


	
	
	
	
	
	};
	case "K": {

		[sp=3d6]






	};
	case "L": {


		[ep=2d6]





	};
	case "M": {



		[gp=2d4]




	};
	case "N": {




		[pp=1d6]



	};
	case "O": {
		[if(initialRoll<=25): cp=1d4;0]
		[if(initialRoll<=20): sp=1d3;0]






	};
	case "P": {

		[if(initialRoll<=30): sp=1d6;0]
		[if(initialRoll<=25): ep=1d2;0]





	};
	case "Q": {





		[if(initialRoll<=50): gem=1d4;0]


	};
	case "R": {



		[if(initialRoll<=40): gp=2d4;0]
		[if(initialRoll<=50): pp=10d6;0]
		[if(initialRoll<=55): gem=4d8;0]
		[if(initialRoll<=45): jew=1d12;0]

	};
	case "S": {







		[if(initialRoll<=40): mm=2d4+ " potions";"no maps or magic"]
	};
	case "T": {







		[if(initialRoll<=50): mm=1d4+ " scrolls";"no maps or magic"]
	};
	case "U": {





		[if(initialRoll<=90): gem=10d8;0]
		[if(initialRoll<=80): jew=5d6;0]
		[if(initialRoll<=70): mm=1+ " of each magic, excluding potions and scrolls";"no maps or magic"]
	};
	case "V": {







		[if(initialRoll<=85): mm=2+ " of each magic, excluding potions and scrolls";"no maps or magic"]
	};
	case "W": {



		[if(initialRoll<=60): gp=5d6;0]
		[if(initialRoll<=15): pp=1d8;0]
		[if(initialRoll<=60): gem=10d8;0]
		[if(initialRoll<=50): jew=5d8;0]
		[if(initialRoll<=55): mm=1+ " map";"no maps or magic"]
	};
	case "X": {







		[if(initialRoll<=60): mm=1+ " misc magic and 1 potion";"no maps or magic"]
	};
	case "Y": {



		[if(initialRoll<=70): gp=2d6;0]




	};
	case "Z": {
		[if(initialRoll<=20): cp=1d3;0]
		[if(initialRoll<=25): sp=1d4;0]
		[if(initialRoll<=25): ep=1d4;0]
		[if(initialRoll<=30): gp=1d4;0]
		[if(initialRoll<=30): pp=1d6;0]
		[if(initialRoll<=55): gem=10d6;0]
		[if(initialRoll<=50): jew=5d6;0]
		[if(initialRoll<=50): mm=3+ " of any magic";"no maps or magic"]
	};
	default: {
		[g: "Must enter a letter."]
	}
]
[h: cp = cp*1000]
[h: sp = sp*1000]
[h: ep = ep*1000]
[h: gp = gp*1000]
[h: pp = pp*100]

[r: strformat("%{cp} copper pieces, %{sp} silver pieces, %{ep} electrum pieces, %{gp} gold pieces, %{pp} platinum pieces, %{gem} gems, %{jew} pieces of jewelry, and %{mm}.")]