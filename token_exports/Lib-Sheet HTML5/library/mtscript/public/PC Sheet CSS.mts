body {
  margin: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  font-size: 16px;
}

#content {
	flex: 1;
	padding: 10px;
}

hr {
    border: 0;
    height: 1px;
    background-color: #d1d1d1;
}

/* Divs that should go next to each other when possible */
.columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: -10px;
}

.columns > div {
  min-width: 150px;
  margin: 10px;
}

.stretch {
  flex-grow: 1;
}

/* Character name and alignment */
.name-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: baseline;
  margin: -3px;
}

.name-container > .name, .alignment {
  margin: 3px;
}

.name {
  
}

.alignment {
  font-size: 12px;
  font-style: italic;
  color: #383838;
}

/* Tables */
table {
  width: 100%;
}

tr:nth-child(even) {
  background-color: #F0F0F0;
}

th {
  background-color: #40703c;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
}

.headerRowDivine {
  background-color: #3c4970;
  color: #FFFFFF;
  font-size: 12;
  font-weight: bold;
}

/* Navigation Header and Dice Links */
nav, footer {
  width: 100%;
  background-color: #333333;
}

nav ul, footer ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333333;
  list-style-type: none;
}

nav li, footer li {
  flex: auto;
  text-align: center;
}

nav li a, footer li a {
  text-decoration: none;
  color: white;
  display: block;
  font-size: 14px;
  line-height: 26px;
  padding: 0 10px;
}

nav li:hover, footer li:hover {
  background-color: #111111;
}

.currentHeaderTab {
  background-color: #40703c;
  color: #FFFFFF;
}

/* Status bars */
.bar { 
	height: 16px;
  box-sizing: border-box;
  overflow: hidden;
	position: relative;
	background-color: #555;
	border-radius: 3px;
  border: 1px solid black;
  margin: 10px 0;
}

.bar span {
  display: block;
  height: 100%;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}

.bar-label {
  float: left;
  font-size: 14px;
  text-align: right;
  margin-right: 2px;
  clear: left;
}

.bar-value {
  display: block;
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: white;
}

span.bar-xp {
  background-color: #75a8ff;
}

.bar.interactive:hover {
  border: 2px solid black;
  background-color: #3b3b3b;
}