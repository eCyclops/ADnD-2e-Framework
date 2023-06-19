[h: tableName = "SocialClass"]

[h: assert(!listContains(getTableNames(),tableName),"Table "+tableName+" exists.")]

[r: "Creating table " + tableName]
[h: createTable(tableName,1,1)]

[addTableEntry(tableName, 01, 04,listAppend("Lower Lower Class","LLC"))]
[addTableEntry(tableName, 05, 10,listAppend("Middle Lower Class","MLC"))]
[addTableEntry(tableName, 11, 20,listAppend("Upper Lower Class","ULC"))]
[addTableEntry(tableName, 21, 35,listAppend("Lower Middle Class","LMC"))]
[addTableEntry(tableName, 36, 55,listAppend("Middle Middle Class","MMC"))]
[addTableEntry(tableName, 56, 87,listAppend("Upper Middle Class","UMC"))]
[addTableEntry(tableName, 88, 96,listAppend("Lower Upper Class","LUC"))]
[addTableEntry(tableName, 97, 99,listAppend("Middle Upper Class","MUC"))]
[addTableEntry(tableName, 100, 100,listAppend("Upper Upper Class","UUC"))]