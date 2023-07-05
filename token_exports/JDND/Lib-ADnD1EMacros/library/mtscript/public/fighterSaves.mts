<!-- Saving throw table for Fighters, Paladins, Rangers, and 0 Level Halflings and Humans -->
[h: theLevel = arg(0)]

[h, switch(theLevel):
    case 0: theSaves = '{
            "poisonSave": 16,
            "petrifySave": 17,
            "wandSave": 18,
            "breathSave": 20,
            "spellSave": 19}';
            
    case 1: theSaves = '{
            "poisonSave": 14,
            "petrifySave": 15,
            "wandSave": 16,
            "breathSave": 17,
            "spellSave": 17}';
    case 2: theSaves = '{
            "poisonSave": 14,
            "petrifySave": 15,
            "wandSave": 16,
            "breathSave": 17,
            "spellSave": 17}';
            
    case 3: theSaves = '{
            "poisonSave": 13,
            "petrifySave": 14,
            "wandSave": 15,
            "breathSave": 16,
            "spellSave": 16}';
    case 4: theSaves = '{
            "poisonSave": 13,
            "petrifySave": 14,
            "wandSave": 15,
            "breathSave": 16,
            "spellSave": 16}';

    case 5: theSaves = '{
            "poisonSave": 11,
            "petrifySave": 12,
            "wandSave": 13,
            "breathSave": 13,
            "spellSave": 14}';
    case 6: theSaves = '{
            "poisonSave": 11,
            "petrifySave": 12,
            "wandSave": 13,
            "breathSave": 13,
            "spellSave": 14}';
    
    case 7: theSaves = '{
            "poisonSave": 10,
            "petrifySave": 11,
            "wandSave": 12,
            "breathSave": 12,
            "spellSave": 13}';
    case 8: theSaves = '{
            "poisonSave": 10,
            "petrifySave": 11,
            "wandSave": 12,
            "breathSave": 12,
            "spellSave": 13}';

    case 9: theSaves = '{
            "poisonSave": 8,
            "petrifySave": 9,
            "wandSave": 10,
            "breathSave": 9,
            "spellSave": 11}';
    case 10: theSaves = '{
            "poisonSave": 8,
            "petrifySave": 9,
            "wandSave": 10,
            "breathSave": 9,
            "spellSave": 11}';

    case 11: theSaves = '{
            "poisonSave": 7,
            "petrifySave": 8,
            "wandSave": 9,
            "breathSave": 8,
            "spellSave": 10}';
    case 12: theSaves = '{
            "poisonSave": 7,
            "petrifySave": 8,
            "wandSave": 9,
            "breathSave": 8,
            "spellSave": 10}';

    case 13: theSaves = '{
            "poisonSave": 5,
            "petrifySave": 6,
            "wandSave": 7,
            "breathSave": 5,
            "spellSave": 8}';
    case 14: theSaves = '{
            "poisonSave": 5,
            "petrifySave": 6,
            "wandSave": 7,
            "breathSave": 5,
            "spellSave": 8}';

    case 15: theSaves = '{
            "poisonSave": 4,
            "petrifySave": 5,
            "wandSave": 6,
            "breathSave": 4,
            "spellSave": 7}';
    case 16: theSaves = '{
            "poisonSave": 4,
            "petrifySave": 5,
            "wandSave": 6,
            "breathSave": 4,
            "spellSave": 7}';
            
<!-- Saving throws for Level 17 or higher -->
    case default: theSaves = '{
            "poisonSave": 3,
            "petrifySave": 4,
            "wandSave": 5,
            "breathSave": 4,
            "spellSave": 6}']

[r: theSaves]