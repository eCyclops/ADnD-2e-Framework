[h: theStrength = arg(0)]
[h, switch(theStrength):
case 3 : myStrength = json.set("{}", "hitAdj", -3, "damAdj", -1, "weightAdj", -350, "openDoors", "[1]", "liftBend", 0);
case 4: myStrength = '{ "hitAdj": -2, "damAdj": -1, "weightAdj": -250, "openDoors": "[1]", "liftBend": 0}';
case 5: myStrength = '{ "hitAdj": -2, "damAdj": -1, "weightAdj": -250, "openDoors": "[1]", "liftBend": 0}';
case 6: myStrength = '{ "hitAdj": -1, "damAdj": 0, "weightAdj": -150, "openDoors": "[1]", "liftBend": 0}';
case 7: myStrength = '{ "hitAdj": -1, "damAdj": 0, "weightAdj": -150, "openDoors": "[1]", "liftBend": 0}';
case 8: myStrength = '{ "hitAdj": 0, "damAdj": 0, "weightAdj": 0, "openDoors": "[1,2]", "liftBend": 1}';
case 9: myStrength = '{ "hitAdj": 0, "damAdj": 0, "weightAdj": 0, "openDoors": "[1,2]", "liftBend": 1}';
case 10: myStrength = '{ "hitAdj": 0, "damAdj": 0, "weightAdj": 0, "openDoors": "[1,2]", "liftBend": 2}';
case 11: myStrength = '{ "hitAdj": 0, "damAdj": 0, "weightAdj": 0, "openDoors": "[1,2]", "liftBend": 2}';
case 12: myStrength = '{ "hitAdj": 0, "damAdj": 0, "weightAdj": 100, "openDoors": "[1,2]", "liftBend": 4}';
case 13: myStrength = '{ "hitAdj": 0, "damAdj": 0, "weightAdj": 100, "openDoors": "[1,2]", "liftBend": 4}';
case 14: myStrength = '{ "hitAdj": 0, "damAdj": 0, "weightAdj": 200, "openDoors": "[1,2]", "liftBend": 7}';
case 15: myStrength = '{ "hitAdj": 0, "damAdj": 0, "weightAdj": 200, "openDoors": "[1,2]", "liftBend": 7}';
case 16: myStrength = '{ "hitAdj": 0, "damAdj": 1, "weightAdj": 350, "openDoors": "[1,2,3]", "liftBend": 10}';
case 17: myStrength = '{ "hitAdj": 1, "damAdj": 1, "weightAdj": 500, "openDoors": "[1,2,3]", "liftBend": 13}';
case 18: myStrength = '{ "hitAdj": 1, "damAdj": 2, "weightAdj": 750, "openDoors": "[1,2,3]", "liftBend": 16}';
default: myStrength = '{ "hitAdj": -5, "damAdj": -5, "weightAdj": -500, "openDoors": "[0]", "liftBend": 0}']
[r:myStrength]