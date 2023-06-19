body {
	font-size: 13px;
	background-color: white;
	font-family: Arial, sans-serif;
}

hr {
	border: 1px solid black;
}

h1 {
	font-size: 16px;
	font-weight: bold;
	margin: 0 0 2px;
}

.map-name {
	font-size: 10px;
	font-weight: normal;
	font-style: italic;
}

.tracked-token {
	border-radius: 5px;
	padding: 5px;
	display: flex;
	flex-wrap: wrap;
	position: relative;
}

.visible {
	background-color: #f0e4e4;
	border: 1px solid #731414;
}

.hidden {
	background-color: #F0F0F0;
	border: 1px solid #d6d6d6;
}

.token-image {
	flex: 0 0 50px;
	padding-right: 5px;
}

.token-data {
	flex: 1;
}

.stop-tracking a {
	position: absolute;
	font-size: 12px;
	color: #919191;
	top: 2px;
	right: 2px;
	text-decoration: none;
}

.health-container {
	font-size: 13px;
	display: flex;
	align-items: center;
	margin-bottom: 0;
}

.health-label {
	flex: 0 0 auto;
	padding-right: 5px;
	margin-bottom: 2px;
}

.health-bg {
	background-color: #d6d6d6;
	height: 5px;
	flex: 1;
}

.controls {
	flex: 1 1 100%;
	display: flex;
	padding-top: 5px;
}

.controls a.right-button {
	margin-left: auto;
	margin-right: 0;
}

.controls a {
	border-top: 1px solid #dfecf5;
	border-radius: 5px;
	background: #c5cfd6;
	padding: 5.5px 11px;
	box-shadow: rgba(0,0,0,1) 0 1px 0;
	font-size: 14px;
	color: black;
	text-decoration: none;
	vertical-align: middle;
	margin-right: 3px;
}

.controls a:hover {
	background: #9da8b0;
}

.controls a:active {
	position: relative;
	top: 1px;
}

.stat-display {
	font-size: 13px;
	display: flex;
	list-style: none;
	padding: 0;
	margin: 0;
}

.stat-display li {
	padding-right: 10px;
}

.visibility-control {
	display: flex;
	align-items: center;
	position: absolute;
	width: 18px;
	height: 18px;
	top: 2px;
	left: 2px;
	border: 1px solid black;
	border-radius: 9px;
	background-color: white;
}

.icon {
  width: 90%;
  height: 90%;
  display: block;
  margin: auto;
}

.hidden-icon {
  fill: #8a8a8a;
}

.visible-icon {
  fill: black;
}

.hidden-icon:hover {
  fill: #a8a8a8;
}

.visible-icon:hover {
  fill: #404040;
}
