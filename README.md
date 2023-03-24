# Bug Game

This website serves as a simulator of how species (in our case bugs) with different behavior compete for food and survival. To start the game one must upload a world map file which specifies the environment and two "brain" files which specify the script that the competing bugs will use. These files are explained in detail further below. After 1 round if finished the competitors switch sides to address if the starting environment played a factor. 

## Deployment

To deploy this project is fairly simple since it is a Static Website. All that needs to be done is to download the project and open index.html to view the website on your local machine.

## Visit Website

Currently the website is published and you can view it by clicking [here](https://mmyrtaj.github.io/BugWorld/)!

## Usage
To use this application the user must upload a world map and two bug brain files. The user must also chose how many steps do they want each round to last and if they want logs of the game. During the simulation they have an option to change the amount of steps and the duration of a step (tick) in seconds.

## World Map
A world map is a .txt file that looks like:
```
10
10
##########
#99....33#
#9#.-----#
#.#------#
#..5-----#
#+++++5..#
#++++++#.#
#+++++.#9#
#33....99#
##########
```
**Rules for the map:**

- The first two lines represent the dimension of the world. 
- The other lines must form a rectangle with the dimensions being the same as the one specified.
- The outside border must have the character "#" which denotes a wall.
- Numbers 1-9 denote the amount of food in the cell.
- "+" and "-" denote the bases of the red and black bugs correspondingly
- All bug bases for the same bug must be connected together. (E.g. all "+" must be connected)
- Adjacency is in the form of a hexagonal grid.
- "." denotes an empty space in the world.
- There should be no spaces in the document.

## Bug Brain
A bug brain is a .txt file that looks like:
```
Sense Ahead 1 3 Food ; [0]
Move 2 0 ; [1]
Pickup 8 0 ; [2]
Flip 3 4 5 ; [3]
Turn Left 0 ; [4]
Flip 2 6 7 ; [5]
Turn Right 0 ; [6]
Move 0 3 ; [7]
Sense Ahead 9 11 Home ; [8]
Move 10 8 ; [9]
Drop 0 ; [10]
Flip 3 12 13 ; [11]
Turn Left 8 ; [12]
Flip 2 14 15 ; [13]
Turn Right 8 ; [14]
Move 8 11 ; [15]
```

**Rules for the BugBrain file**
- Everything after a ";" is considered a comment
- Each line must contain a command with an appropriate syntax
- A jump can only be withing the command lines (E.g. You cannot jump to command 16 if there are only 15 commands)
- Words have to be Captialised

Commands are: 
```
sense sensedir s1 s2 cond: check if condition cond is fulfilled in direction sensedir; if yes, go to s1,
otherwise s2.
mark m s: set marker m in current cell, then go to s.
unmark i s: delete marker I, then go to s.
pickup s1 s2: take food from current cell, then go to s1; if no food is available or bug
already carries food then go to s2.
drop s: put food into current cell and go to s.
turn lr s: turn in direction lr (left or right), then go to s.
move s1 s2: advance by once cell in current direction, then go to s1; if cell ahead is
blocked go to s2.
flip p s1 s2: obtain a random number between 0 and p − 1; if zero then go to s1 ,
otherwise go to s2.
direction d s1 s2: if current heading is d then go to s1 , otherwise go to s2.
``` 

Directions:
- Here
- LeftAhead
- RightAhead 
- Ahead

Conditions:
- Friend
- Foe
- FriendWithFood
- FoeWithFood
- Food
- Rock
- Marker
- FoeMarker
- Home
- FoeHome

## Progress Achieved

- Div/page switching
- Map reading and parsing
- Each World Cell is getting the appropriate values assigned
- Maps are checked if they are valid maps
- Bug brain reading and parsing
- Bug brains are checked if they are valid
- Setters/Getters for World and WorldCell

## To Be Added
- Populating the map with bugs
- Game functionality and a tick based progression
- Reading more options from the user
- Logger functionality
- Displaying the map in a hexagonal grid in the GUI
- Keep track of the stats and update the html in real time
