#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wednesday July 05 2023

@author eCyclops
"""

#Import necessary python components

import argparse
import re
import os
import pathlib

parser = argparse.ArgumentParser(description="Copy list of renamed scripts and name them back again. Look for stompable names.")
# parser.add_argument("bookname", help="Name of the book we're extracting")
# may just want to process the 'macro_script_map.txt' in the current directory

nowHere = os.getcwd()

with open (nowHere+"macro_script_map.txt", "r") as namesList:
    for line in namesList:
        oldFile, newFile = line.split(" => ")
        newPath = "library/mtscript/public/"+newFile+".mts"
        if(os.path.exists(newPath) and os.path.isfile(newPath)):
            print("File "+newPath+" already exists.")
        else:
            os.rename("library/mtscript/public/"+oldFile,newPath,)