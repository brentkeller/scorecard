Scorecard app

# Info

Node version: 14+

# Data Structure

Game
ID
Type (Yahtzee, simple, etc.)
Players[]
Date?
Notes?

Player (interface)
ID
Name
DisplayOrder?

Player subclasses will have their own data needs

Player
YahtzeePlayer extends Player
BasicPlayer extends Player

Game
YahzteeGame extends Game (Players: YahtzeePlayer[])
BasicGame extends Game (Players: BasicPlayer[])

# Ideas

Create a generic Game object that can be the base for any game
GameContext is also generic, allows providing a React Context for a given game, most likely provided within a shell for that game type?

Allow creating a new game with the same settings as another game but without the scores

Replace react-spring animations with framer motion?

Game types
Yahtzee - specific calculator and scoresheet
Basic numeric scores by round - Enter score for the round, track the sum
Phase 10 - Score per round, track the sum, separate incremental "level" that may or may not increment each round
Bowling?

# Work List

Add XO for linting? https://github.com/xojs/xo

Need to update the date on each save to track most recent game (per type)

Create logo & favicon
List players on game card

Game page

- Add link back to home from game page
- Change "players" button to a menu, allow resetting the game or going home

PWA
https://create-react-app.dev/docs/making-a-progressive-web-app/
https://create-react-app.dev/docs/custom-templates/
https://github.com/cra-template/pwa/tree/master/packages/cra-template-pwa-typescript

# Next steps

Add proper generic support for useGame
https://mparavano.medium.com/building-react-components-with-typescript-generics-a28608dafb38

https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase#polymorphic-components-eg-with-as-props

https://blog.rsuter.com/how-to-instantiate-a-generic-type-in-typescript/

https://javascript.tutorialink.com/typescript-type-of-subclasses-of-an-abstract-generic-class/

https://stackoverflow.com/questions/68227370/enforce-typeof-baseclass-when-base-class-is-generic
