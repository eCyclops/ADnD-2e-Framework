[h: theWisdom = arg(0)]
[h, switch(theWisdom):
case 3 : myWisdom = json.set("{}", "saveAdj", -3, "spellBonus", "", "spellFailure", 100);
case 4: myWisdom = '{ "saveAdj": -2, "spellBonus": "", "spellFailure": 100}';
case 5: myWisdom = '{ "saveAdj": -1, "spellBonus": "", "spellFailure": 100}';
case 6: myWisdom = '{ "saveAdj": -1, "spellBonus": "", "spellFailure": 100}';
case 7: myWisdom = '{ "saveAdj": -1, "spellBonus": "", "spellFailure": 100}';
case 8: myWisdom = '{ "saveAdj": 0, "spellBonus": "", "spellFailure": 100}';
case 9: myWisdom = '{ "saveAdj": 0, "spellBonus": "", "spellFailure": 20}';
case 10: myWisdom = '{ "saveAdj": 0, "spellBonus": "", "spellFailure": 15}';
case 11: myWisdom = '{ "saveAdj": 0, "spellBonus": "", "spellFailure": 10}';
case 12: myWisdom = '{ "saveAdj": 0, "spellBonus": "", "spellFailure": 5}';
case 13: myWisdom = '{ "saveAdj": 0, "spellBonus": "[1]", "spellFailure": 0}';
case 14: myWisdom = '{ "saveAdj": 0, "spellBonus": "[2]", "spellFailure": 0}';
case 15: myWisdom = '{ "saveAdj": 1, "spellBonus": "[2,1]", "spellFailure": 0}';
case 16: myWisdom = '{ "saveAdj": 2, "spellBonus": "[2,2]", "spellFailure": 0}';
case 17: myWisdom = '{ "saveAdj": 3, "spellBonus": "[2,2,1]", "spellFailure": 0}';
case 18: myWisdom = '{ "saveAdj": 4, "spellBonus": "[2,2,1,1]", "spellFailure": 0}';
default: myWisdom = '{ "saveAdj": -5, "spellBonus": "", "spellFailure": 100}';
[r:myWisdom]