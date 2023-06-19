[h: INT = getProperty("Intelligence", getSelected())]
[h: WIS = getProperty("Wisdom", getSelected())]
[h: CHA = getProperty("Charisma", getSelected())]

[h: tryIt = false]

[h, if((INT > 15) || (WIS > 15) || (CHA > 15)): tryIt = true]

[h: mod = 0]

[h, if(INT > 16): mod = mod + (INT - 16)*2.5]
[h, if(WIS > 16): mod = mod + (WIS - 16)*1.5]
[h, if(CHA > 16): mod = mod + (CHA - 16)*0.5]

[h: mod = round(mod)]

[h: theChance = d100+mod]

[r, if(tryIt): strformat("Your chance of Psionics is %d", theChance);"You are not Psionic."]