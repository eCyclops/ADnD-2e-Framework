[h: INT = getProperty("Intelligence", getSelected())]
[h: WIS = getProperty("Wisdom", getSelected())]
[h: CHA = getProperty("Charisma", getSelected())]

[h: mod = 0]
[h: bonus = 0]

[h: INTmod = math.max(0, INT-12)]
[h, if(INTmod > 4): bonus = bonus+1]

[h: WISmod = math.max(0, WIS-12)]
[h, if(WISmod > 4): bonus = bonus+1]

[h: CHAmod = math.max(0, CHA-12)]
[h, if(CHAmod > 4): bonus = bonus+1]

[h: mod = INTmod + WISmod + CHAmod]

[h, if(bonus == 2): mod = mod*2]

[h, if(bonus == 3): mod = mod*4]

Your psionic strength is [r: d100 + mod]