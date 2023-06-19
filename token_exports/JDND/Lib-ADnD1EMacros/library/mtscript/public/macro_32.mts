<!-- Saving throw table for Magic-Users and Illusionists-->
[h: theLevel = arg(0)]

[h, switch(theLevel):
    case 1: theSaves = '{
            "poisonSave": 14,
            "petrifySave": 13,
            "wandSave": 11,
            "breathSave": 15,
            "spellSave": 12}';
    case 2: theSaves = '{
            "poisonSave": 14,
            "petrifySave": 13,
            "wandSave": 11,
            "breathSave": 15,
            "spellSave": 12}';
    case 3: theSaves = '{
            "poisonSave": 14,
            "petrifySave": 13,
            "wandSave": 11,
            "breathSave": 15,
            "spellSave": 12}';
    case 4: theSaves = '{
            "poisonSave": 14,
            "petrifySave": 13,
            "wandSave": 11,
            "breathSave": 15,
            "spellSave": 12}';
    case 5: theSaves = '{
            "poisonSave": 14,
            "petrifySave": 13,
            "wandSave": 11,
            "breathSave": 15,
            "spellSave": 12}';
            
    case 6: theSaves = '{
            "poisonSave": 13,
            "petrifySave": 11,
            "wandSave": 9,
            "breathSave": 13,
            "spellSave": 10}';
    case 7: theSaves = '{
            "poisonSave": 13,
            "petrifySave": 11,
            "wandSave": 9,
            "breathSave": 13,
            "spellSave": 10}';
    case 8: theSaves = '{
            "poisonSave": 13,
            "petrifySave": 11,
            "wandSave": 9,
            "breathSave": 13,
            "spellSave": 10}';
    case 9: theSaves = '{
            "poisonSave": 13,
            "petrifySave": 11,
            "wandSave": 9,
            "breathSave": 13,
            "spellSave": 10}';
    case 10: theSaves = '{
            "poisonSave": 13,
            "petrifySave": 11,
            "wandSave": 9,
            "breathSave": 13,
            "spellSave": 10}';
            
    case 11: theSaves = '{
            "poisonSave": 11,
            "petrifySave": 9,
            "wandSave": 7,
            "breathSave": 11,
            "spellSave": 8}';
    case 12: theSaves = '{
            "poisonSave": 11,
            "petrifySave": 9,
            "wandSave": 7,
            "breathSave": 11,
            "spellSave": 8}';
    case 13: theSaves = '{
            "poisonSave": 11,
            "petrifySave": 9,
            "wandSave": 7,
            "breathSave": 11,
            "spellSave": 8}';
    case 14: theSaves = '{
            "poisonSave": 11,
            "petrifySave": 9,
            "wandSave": 7,
            "breathSave": 11,
            "spellSave": 8}';
    case 15: theSaves = '{
            "poisonSave": 11,
            "petrifySave": 9,
            "wandSave": 7,
            "breathSave": 11,
            "spellSave": 8}';
            
    case 16: theSaves = '{
            "poisonSave": 10,
            "petrifySave": 7,
            "wandSave": 5,
            "breathSave": 9,
            "spellSave": 6}';
    case 17: theSaves= '{
            "poisonSave": 10,
            "petrifySave": 7,
            "wandSave": 5,
            "breathSave": 9,
            "spellSave": 6}';
    case 18: theSaves= '{
            "poisonSave": 10,
            "petrifySave": 7,
            "wandSave": 5,
            "breathSave": 9,
            "spellSave": 6}';
    case 19: theSaves= '{
            "poisonSave": 10,
            "petrifySave": 7,
            "wandSave": 5,
            "breathSave": 9,
            "spellSave": 6}';
    case 20: theSaves= '{
            "poisonSave": 10,
            "petrifySave": 7,
            "wandSave": 5,
            "breathSave": 9,
            "spellSave": 6}';
            
<!-- Saving throws for Level 21 or higher -->
    case default: theSaves = '{
            "poisonSave": 8,
            "petrifySave": 5,
            "wandSave": 3,
            "breathSave": 7,
            "spellSave": 4}']

[r: theSaves]