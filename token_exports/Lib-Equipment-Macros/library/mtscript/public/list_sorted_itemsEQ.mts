[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: currentDB = getProperty("Equipment_List",myID)]
[h: itemNames = json.sort(json.fields(currentDB, 'json'))]

[h: itemTag = getLibProperty("ItemTag","Lib:Equipment")+"_"]


[h: containerList = 'Carried,Stored']
[h, foreach(itemName,currentDB,""), code :{
	[h: itemJSON = json.get(currentDB,itemName)]
	[h: sourceName = json.get(itemJSON,"itemSource")]
	[h: sourceProperty = getLibProperty(itemTag+sourceName,"Lib:Equipment")]
	[h, if(length(sourceProperty)>0): sourceJSON = json.get(sourceProperty,sourceName);sourceJSON = "{}"]


	[if( !json.isEmpty(sourceJSON) && json.type(sourceJSON) == "OBJECT"): emptySource = 0;emptySource = 1]
	[if( !emptySource && json.get(sourceJSON,"isContainer")==1 && !listContains(containerList,itemName)  ):
		containerList = listAppend(containerList,itemName)]
}]


[h: sortedInventoryList = ""]
[foreach(bag, containerList, ""), code :{
	[h,if(bag != "Carried" && bag != "Stored"): sortedInventoryList = listAppend(sortedInventoryList, bag)]

	[foreach(item, itemNames, ""), code :{
		[h: thisJSON = json.get(currentDB,item)]
		[h: myLocation = json.get(thisJSON,"itemLocation")]
		
		[h: sourceName = json.get(thisJSON,"itemSource")]

		[h: sourceProperty = getLibProperty(itemTag+sourceName,"Lib:Equipment")]
		[h, if(length(sourceProperty)>0): sourceJSON = json.get(sourceProperty,sourceName);sourceJSON = "{}"]

		[h: isContainer = json.get(sourceJSON,"isContainer")]

		[h, if (myLocation == bag && !isContainer): sortedInventoryList = listAppend(sortedInventoryList, item)]
		[h, if ( listFind(containerList,myLocation) == -1): sortedInventoryList = listAppend(sortedInventoryList, item)]
	}]
}]


[r: updateEquipedAdjustments(strformat("myID=%{myID};"))]

[h: outTxt = ""]
[h: outTxt = strformat("<tr class=headerRow>")]
[h: outTxt = concat(outTxt,strformat("<td align=left>Item</td>"))]
[h: outTxt = concat(outTxt,strformat("<td align=center>Count</td>"))]
[h: outTxt = concat(outTxt,strformat("<td align=center>Weight</td>"))]
[h: outTxt = concat(outTxt,strformat("<td align=center>Misc</td>"))]
[h: outTxt = concat(outTxt,strformat("<td align=center>Location</td>"))]
[h: outTxt = concat(outTxt,strformat("</tr>"))]

[h: totalWeight = 0]
[h: class = "oddRow"]
[h, foreach(prop, sortedInventoryList, ""), code :{
	[h: miscTxt = '']
	[h: thisJSON = json.get(currentDB,prop)]
	[h: myBookID = json.get(thisJSON,"bookID")]
	[h: myLocation = json.get(thisJSON,"itemLocation")]
	[h: myCount = json.get(thisJSON,"itemQuantity")]
	[h: myCatagory = json.get(thisJSON,"itemCatagory")]
	[h: mySource = json.get(thisJSON,"itemSource")]
	[h: myValue = json.get(thisJSON,"itemValue")]
	[h: myNotes = json.get(thisJSON,"itemNotes")]
	[h: myNotes = decode(replace(myNotes,'%0A','<br>'))]
	[h: gmNotes = json.get(thisJSON,"itemNotesGM")]
	[h: gmNotes = decode(replace(gmNotes,'%0A','<br>'))]

	
	[h: myValueToolTip = toolTipIt('The value of this item if sold to a reasonable merchat.',myValue)]
	[h: sourceProperty = getLibProperty(itemTag+mySource,"Lib:Equipment")]
	[h, if(length(sourceProperty)>0): sourceJSON = json.get(sourceProperty,mySource);sourceJSON = "{}"]
	[h, if(length(sourceProperty)<=0): noSOURCE = 1; noSOURCE = 0]

	[h: myDescription = decode(json.get(sourceJSON,"description"))]
	[h: isContainer = json.get(sourceJSON,"isContainer")]
	[h: containerMax = json.get(sourceJSON,"max_weight_carried")]

	[h: hasCharges = json.get(sourceJSON,"hasCharges")]
	[h: myShortName = decode(json.get(sourceJSON,"shortName"))]


	[h: armorType = json.get(sourceJSON,"armorType")]
	[h: weaponType = json.get(sourceJSON,"weaponType")]
	[h: weaponSize = json.get(sourceJSON,"weaponSize")]
	[h: weaponSizeToolTip = toolTipIt('Weapon Size',weaponSize)]

	[h: rangeShort = json.get(sourceJSON,"rangeShort")]
	[h: rangeMedium = json.get(sourceJSON,"rangeMedium")]
	[h: rangeLong = json.get(sourceJSON,"rangeLong")]
	[h: rangeTxt = strformat('%{rangeShort}/%{rangeMedium}/%{rangeLong}')]
	[h: rangeTxtToolTip = toolTipIt('Range of missile weapon, Short/Medium/Long',rangeTxt)]

	[h, if (json.isEmpty(sourceJSON)): 
		myWeight = 0; 
		myWeight = json.get(sourceJSON,"weight")*mycount]
	[h: '<!-- ADD WEIGHT REDUCTION CHECK BAGS HERE -->']
	[h: myActualWeight = getItemWeight(myID,prop)]
	
	[h, if(myLocation != "Stored"): totalWeight = totalWeight + myActualWeight]
	[h, if(isContainer && !noSOURCE): myCarriedWeight = getCarriedContainerContentsWeight(prop,myID); myCarriedWeight = 0]
	[h: myCarriedWeightTip = toolTipIt(strformat("Weight of objects in this container. <br>Maximum contained is %{containerMax} pounds."),myCarriedWeight + "/" + containerMax)]
	
	[h: myCharges = json.get(thisJSON,"itemCharges")]
	[h, if(myCatagory == "Ammo" || myCatagory == "Goods"): myCharges = myCount]

	[h: myArgs = strformat("myID=%{myID};item=%{prop}; catagory=%{myCatagory};")]

	[h: chargesLink = macroLink(myCharges,'PC_Use_Charge@Lib:Equipment:Macros','none',myArgs,myID)]
	[h: deleteLink = macroLink('x','deleteEQ@Lib:Equipment:Macros','none',myArgs,myID)]
	[h: deleteLinkTT = toolTipIt("Drop item from equipment list.",deleteLink)]

	[h: editLink = macroLink(prop,'PC_Edit@Lib:Equipment:Macros','none',myArgs,myID)]
	[h: readLink = macroLink('read','PC_Read@Lib:Equipment:Macros','none',strformat("myID=%{myID}; bookName=%{prop}; bookID=%{myBookID}"),myID)]

	[h: outTxt = concat(outTxt,strformat("<tr class=%{class}>"))]

	[h: noteLink = macroLink('+n','noteEQ@Lib:Equipment:Macros','none',myArgs,myID)]
	[h: noteLinkTT = toolTipIt("Add note/special information to item.",noteLink)]

	[h, if (length(myNotes)>0): 
		notesDetails = strformat('<tr><td><table border=0 width=100%><caption>Notes</caption>%{myNotes}</table></td></tr>');
		notesDetails = ""]

		[h, if (length(gmNotes)>0 && isGM()): 
			notesDetails = concat(notesDetails, strformat('<tr><td><table border=0 width=100%><caption>GM Notes</caption>%{gmNotes}</table></td></tr>')))]
		
	[h: descriptionToolTip = toolTipIt("<table border=1><tr><td><pre>"+myDescription+"</pre></td></tr>"+notesDetails+"</table>",myShortName)]
	[h: descriptionLink = macroLink(descriptionToolTip,'viewItemDetailsFrame@Lib:Equipment:Macros','none',strformat("name=%{prop}"))]
	[h: descriptionLink = macroLink(descriptionToolTip,'askDetailsOrNote@Lib:Equipment:Macros','none',strformat("myID=%{myID}; item=%{prop}; source=%{mySource}"))]
	[h: editLink = toolTipIt("<table border=1><tr><td><pre>"+myDescription+"</pre></td></tr>"+notesDetails+"</table>",editLink)]
  [h, if(myLocation != "Stored" && myLocation != "Carried"):
	thisItemTxt = strformat("<td>%{deleteLinkTT} - <img height=10 width=10 src='asset://c357e2fcf2aaa44b50a58840141e4af9'/>%{editLink}</td>");
	thisItemTxt = strformat("<td>%{deleteLinkTT} - %{editLink}</td>")]
  [h, if(isContainer && (myLocation == "Stored" || myLocation == "Carried")):
	thisItemTxt = strformat("<td>%{deleteLinkTT} - <img height=10 width=10 src='asset://4a5306ff949f6a162306337d592b7f30'/>%{editLink}</td>")]
  [h: outTxt = concat(outTxt,strformat("%{thisItemTxt}"))]

	[h: outTxt = concat(outTxt,strformat("<td align=center>x%{myCount}</td>"))]
	[h: outTxt = concat(outTxt,strformat("<td align=center>%{myWeight}</td>"))]

	[h,if(myCatagory == "Valuables"): miscTxt = strformat("<td align=center>%{myValueToolTip}</td>")]
	[h,if(myCatagory == "Coin"): miscTxt = strformat("<td align=center>coin: %{myShortName}</td>")]
	[h,if(myCatagory == "Book/Scroll"): miscTxt = strformat("<td align=center>%{readLink}</td>")]
	[h,if(myCatagory == "Armor"): miscTxt = strformat("<td align=center>%{armorType}</td>")]
	[h,if(myCatagory == "Weapon"): miscTxt = strformat("<td align=center>%{weaponSizeToolTip}</td>")]
	[h,if(myCatagory == "Weapon" && weaponType == "Ranged"): miscTxt = strformat("<td align=center>%{rangeTxtToolTip}</td>")]
	[h,if(hasCharges && myCount > 0): miscTxt = strformat("<td align=center>uses: %{chargesLink}</td>")]
	[h,if(isContainer && !noSOURCE): miscTxt = strformat("<td align=center>(%{myCarriedWeightTip})</td>")]

	[h,if(miscTxt == ''):miscTxt = strformat("<td align=center>NA</td>")]
	[h,if(noSOURCE):miscTxt = strformat("<td align=center>ITEM MISSING FROM DATABASE!</td>")]
	[h:outTxt = concat(outTxt,miscTxt)]

	[h: outTxt = concat(outTxt,strformat("<td align=center>%{myLocation}</td>"))]

	[h: outTxt = concat(outTxt,strformat("</tr>"))]

	[h: class = if(class=="oddRow", "evenRow", "oddRow")]

}]


[r: outTxt ]

[h: macro.return = strformat("totalWeight=%{totalWeight};")]
