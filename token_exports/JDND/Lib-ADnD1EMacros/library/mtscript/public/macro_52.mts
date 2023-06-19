* {
	box-sizing: border-box;
}

body {
	font-size: 16px;
	padding: 0.5rem;
	color:white;
}

div {
	padding: 0;
	margin: 0;
}

.hidden {
	display: none;
}

:not(.multiple-selected) .hide-for-single {
	display: none;
}

.multiple-selected .hide-for-multiple {
	display: none;	
}

.player-token {
	display:flex;
	align-items: middle;	
	color:white;
}
.player-token.hidden {
	display: none;
}

.player-token__image {
	margin-right: 0.75rem;
	margin-top: 0.75rem;
}

.player-token__content {
	width: 200px;
}

.multiple-selected .player-token__content h2 {
	
}

.player-token__content.player-dead h2 {
	text-decoration: line-through;
	color: gray;
}
h1.player-header,
.player-token__content h1 {
	font-family: 'Times', 'Helvetica', serif;
	font-size: 1rem;
	text-transform: uppercase;
	margin: 0;
	text-shadow: 1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black;	
}

.player-token__content h2 {
	font-family: 'Times', 'Helvetica', serif;
	font-size: 3rem;
	margin: 0;
	color: white;
	white-space: nowrap;
	text-shadow: 2px 2px 0 black, -2px 2px 0 black, 2px -2px 0 black, -2px -2px 0 black;
}

.multiple-selected .player-token__content h2 {
	font-size: 1.5rem;
}

.player-token__content__hp {
	position:relative;
	background-color: rgba( 0, 0, 0, 0.5);
	border: 2px solid black
}

.player-token__content__hp__bar {
	height:1.5rem;
	background-color: green;
}

.player-token__content__hp__value {
	position: absolute; 
	top: 0;
	padding: 0.25rem 0 0 0.25rem;
	color: white;	
}

.player-token__content__death_saves {
	position: absolute; 
	top: 0;
	padding: 0 0 0 0.25rem;
}	