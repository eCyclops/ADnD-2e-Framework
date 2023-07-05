[h: charClass = lower(json.get(arg(0), "charClass"))]
[h: charLevel = json.get(arg(0), "charLevel")]

[h, if(listContains(charClass, "thief") > 0 || listContains(charClass, "assassin") > 0), CODE: {
  [h, macro("Thief Skill Table@Lib:ADnD1EMacros"): charLevel]
};
{
  [h, macro("Monk Skill Table@Lib:ADnD1EMacros"): charLevel]
}]