[h: tableName = arg(0)]

[h: assert(!listContains(getTableNames(),tableName),"Table "+tableName+" exists.")]

[r: "Creating table " + tableName]
[h: createTable(tableName,1,1)]

[h, switch(tableName), code:

	case "Jewelry": {
		[addTableEntry(tableName,01,10,"100d10")]
		[addTableEntry(tableName,11,20,"200d6")]
		[addTableEntry(tableName,21,40,"300d6")]
		[addTableEntry(tableName,41,50,"500d6")]
		[addTableEntry(tableName,51,70,"1000d6")]
		[addTableEntry(tableName,71,90,"2000d4")]
		[addTableEntry(tableName,91,100,"2000d6")]
	};
	
	default: {
		[r:"I don't know what %{tableName} is"]
	}
]