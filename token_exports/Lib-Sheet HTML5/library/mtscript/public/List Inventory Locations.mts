[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: currentDB = getProperty("Equipment_List",myID)]
[h: locationNames = json.sort(json.fields(currentDB, "json"))]

[foreach(location, locationNames, ""), code :{
  [h: locJSON = json.get(currentDB,location)]
  <div>[r: location]</div>
}]