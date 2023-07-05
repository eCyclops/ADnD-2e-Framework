[h: unknownMacroName = getMacroName()]
[h: calledLibraryName = getMacroLocation()]

[broadcast(strformat("Macro '%{unknownMacroName}' not found on %{calledLibraryName}"))]