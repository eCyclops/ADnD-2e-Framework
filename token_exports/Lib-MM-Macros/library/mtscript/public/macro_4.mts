[h: npcJSON = arg(0)]
[h: viewLetter = json.get(npcJSON,"viewLetter")]

[h: npcJSON = json.remove(npcJSON,"save")]

[h: addAttack = json.get(npcJSON,"AddAttack")]
[h,if(addAttack != ''): npcJSON = json.remove(npcJSON,"AddAttack")]

[h: editAttackNumber = -1]
[h, foreach(editAtk,npcJSON,""), code :{
	[if( startsWith(editAtk,"EditAttack.") ), code :{
		[h: findString = strformat( "\^(?i).*\\.(.*)(\$)" )]
		[h: id = strfind(editAtk, findString)]
		[h, if(getFindCount(id)>0): editAttackNumber = getGroup(id, 1, 1);editAttackNumber = -1]
		[h: npcJSON = json.remove(npcJSON,editAtk)]
	};{}]
}]

[h, foreach(key,npcJSON,""), code :{
	[npcJSON = json.set(npcJSON,key,encode(json.get(npcJSON,key)) )]
}]

[h: newEntry = json.contains(npcJSON,"newEntry")]
[h: deleteEntry = json.contains(npcJSON,"delete")]

[h,if(newEntry): npcJSON = json.remove(npcJSON,"newEntry")]
[h,if(deleteEntry): npcJSON = json.remove(npcJSON,"delete")]

[h, if(addAttack != ''), code :{
	[h: npcJSON = addWeaponToNPC(npcJSON,'1d6')]
	[h: thisTag = json.get(npcJSON,'thisTag')]
	[h: npcJSON = json.remove(npcJSON,'thisTag')]
	[r: editNPCWeapon(npcJSON,thisTag)]
};{
}]

[h, if(editAttackNumber != -1), code :{
	[h:thisTag = strformat('attack.%{editAttackNumber}')]
	[r: editNPCWeapon(npcJSON,thisTag)]
};{}]

[h, if(editAttackNumber == -1 && addAttack == ''), code :{
	[h: closeFrame("EditMonsterFrame")]

	[if(deleteEntry), code :{
		[macro("delete@Lib:MM:Macros"):npcJSON]
	};{
		[macro("add@Lib:MM:Macros"):npcJSON]
	}]

	[if(!isFrameVisible("Monster_DB_Management")), code :{
		[macro("Manage Main@Lib:MM:Macros"):strformat('viewLetter=%{viewLetter};')]
	};{}]
};{}]

