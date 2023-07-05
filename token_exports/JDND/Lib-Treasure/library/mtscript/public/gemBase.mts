[h: initialRoll = d100]

[h, if (initialRoll <26): baseValue = 10]
[h, if (initialRoll >25 && initialRoll <51): baseValue = 50]
[h, if (initialRoll >50 && initialRoll < 71): baseValue = 100]
[h, if (initialRoll >70 && initialRoll < 91): baseValue = 500]
[h, if (initialRoll >90 && initialRoll < 100): baseValue = 1000]
[h, if (initialRoll == 100): baseValue = 5000]
[macro.return=baseValue]