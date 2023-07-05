[h: tag = lower(getLibProperty("ItemTag","Lib:Spells"))]

Getting all matches of [r: tag].*<br>

[h: matches = getMatchingLibProperties(tag+".*","Lib:Spells")]

[foreach(item,matches,","):item]
