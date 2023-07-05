<!-- Saving throw table for Clerics, Druids, and Bards-->
[h: theLevel = arg(0)]

[h, switch(theLevel):
    case 1: theSaves = '{
            "breathSave": 16,
            "petrifySave": 13,
            "poisonSave": 10,
            "spellSave": 15,
            "wandSave": 14}';
    case 2: theSaves = '{
            "breathSave": 16,
            "petrifySave": 13,
            "poisonSave": 10,
            "spellSave": 15,
            "wandSave": 14}';
    case 3: theSaves = '{
            "breathSave": 16,
            "petrifySave": 13,
            "poisonSave": 10,
            "spellSave": 15,
            "wandSave": 14}';
    
    case 4: theSaves = '{
            "breathSave": 15,
            "petrifySave": 12,
            "poisonSave": 9,
            "spellSave": 14,
            "wandSave": 13}';
    case 5: theSaves = '{
            "breathSave": 15,
            "petrifySave": 12,
            "poisonSave": 9,
            "spellSave": 14,
            "wandSave": 13}';
    case 6: theSaves = '{
            "breathSave": 15,
            "petrifySave": 12,
            "poisonSave": 9,
            "spellSave": 14,
            "wandSave": 13}';
    
    case 7: theSaves = '{
            "breathSave": 13,
            "petrifySave": 10,
            "poisonSave": 7,
            "spellSave": 12,
            "wandSave": 11}';
    case 8: theSaves = '{
            "breathSave": 13,
            "petrifySave": 10,
            "poisonSave": 7,
            "spellSave": 12,
            "wandSave": 11}';
    case 9: theSaves = '{
            "breathSave": 13,
            "petrifySave": 10,
            "poisonSave": 7,
            "spellSave": 12,
            "wandSave": 11}';

    case 10: theSaves = '{
            "breathSave": 12,
            "petrifySave": 9,
            "poisonSave": 6,
            "spellSave": 11,
            "wandSave": 10}';
    case 11: theSaves = '{
            "breathSave": 12,
            "petrifySave": 9,
            "poisonSave": 6,
            "spellSave": 11,
            "wandSave": 10}';
    case 12: theSaves = '{
            "breathSave": 12,
            "petrifySave": 9,
            "poisonSave": 6,
            "spellSave": 11,
            "wandSave": 10}';

    case 13: theSaves = '{
            "breathSave": 11,
            "petrifySave": 8,
            "poisonSave": 5,
            "spellSave": 10,
            "wandSave": 9}';
    case 14: theSaves = '{
            "breathSave": 11,
            "petrifySave": 8,
            "poisonSave": 5,
            "spellSave": 10,
            "wandSave": 9}';
    case 15: theSaves = '{
            "breathSave": 11,
            "petrifySave": 8,
            "poisonSave": 5,
            "spellSave": 10,
            "wandSave": 9}';

    case 16: theSaves = '{
            "breathSave": 10,
            "petrifySave": 7,
            "poisonSave": 4,
            "spellSave": 9,
            "wandSave": 8}';
    case 17: theSaves = '{
            "breathSave": 10,
            "petrifySave": 7,
            "poisonSave": 4,
            "spellSave": 9,
            "wandSave": 8}';
    case 18: theSaves = '{
            "breathSave": 10,
            "petrifySave": 7,
            "poisonSave": 4,
            "spellSave": 9,
            "wandSave": 8}';

<!-- Saving throws for Level 19 or higher -->
    case default: theSaves = '{
            "breathSave": 8,
            "petrifySave": 5,
            "poisonSave": 2,
            "spellSave": 7,
            "wandSave": 6}']

[r: theSaves]