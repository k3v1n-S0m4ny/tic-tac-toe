# Tic-tac-toe

A browser game: two players, or one player against the computer, plus a best-of-five tournament mode.
Everything runs from index.html. Open it in a browser; there is no build step.

See @SPEC.md for the tournament rules.

## Folders

- index.html: the whole game
- sounds/: sound effects, made with the Web Audio API

## Lessons learned

- The computer's move waits 400 ms on a timer. Cancel that timer when a new game starts, or the board freezes.
