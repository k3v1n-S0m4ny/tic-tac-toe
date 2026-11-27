# Tournament mode

Add a best-of-5 tournament mode for two human players on one screen. Everything stays in `index.html` (vanilla HTML/CSS/JS, no build step).

## Rules

- **Format:** first to **3 wins**. This is "best of 5" counting only decisive games.
- **Draws** don't count toward the score. The game is replayed, and there is **no cap** on the number of replays.
- **First move alternates every game**, including after a draw. Player 1 (the first name field) starts game 1.
- **X always moves first** (as in the existing code). Whoever starts a game plays X that game, so each player's symbol and colour swap from game to game.
- **Clinching:** the tournament ends as soon as a player reaches 3 wins. No remaining games are played.

## Menu and setup

- Add a third radio option to the existing menu: **"Tournament (two players)"**. It is for humans only; there is no computer opponent in tournaments.
- Selecting it shows two name inputs (Player 1, Player 2) inside the menu.
- The name fields are wrapped in a `<form>`, so **Enter starts the tournament**. Handle `submit` in JS with `preventDefault`.
- Names are trimmed. **Blank names fall back to "Player 1" / "Player 2".**
- There is **no max length**. Long names are truncated in the UI with CSS ellipsis, and the full name is shown in a `title` tooltip.
- **Duplicate names are allowed.** Fixed sides and colours are enough to tell players apart.
- Names are not remembered between sessions.

## Flow

1. **Setup:** the player enters names and presses Start.
2. **Interstitial** (before every game, including game 1): for example *"Game 3 — Bob plays X and goes first"*, with a **Continue** button.
3. **Game:** the scoreboard sits above the board, and the status line reads e.g. *"Bob (X) to play"*.
4. **Game over:** the finished board stays visible with the result (e.g. *"Alice wins game 3"* / *"Draw — replaying"*). The winning line is highlighted. A **Next game** button replaces "Play again" in tournament mode and leads to the next interstitial.
5. **Tournament over:** shown as soon as someone reaches 3 wins (see the end screen below).

## Scoreboard

A compact single row:

```
  Alice  X   2  —  1   O  Bob
  ^^^^^ (to move)
      Game 4 · first to 3
```

- **Fixed sides:** Player 1 is always on the left and Player 2 always on the right. Only the X/O badge and its colour (`--x` hot pink / `--o` teal) swap between games.
- Each side shows the name, this game's symbol badge in that symbol's colour, and the win count.
- The player whose turn it is gets highlighted.
- **"Game N" counts every game played, draws included.** "Game 7" is possible and expected.
- There is no draw counter, no game-history pips, and no special messaging for draw streaks.

## End screen

- Announces the tournament winner and the final score (e.g. *"Alice wins the tournament 3–1"*).
- Primary button: **Rematch** starts a new best-of-5 with the same names. The **loser of the previous tournament moves first** in game 1 of the rematch, and alternation continues from there.
- Secondary, visually quieter **"Back to menu"** link.
- There is no game-by-game summary and no celebration animation.

## Quitting mid-tournament

- A **"Quit tournament"** control is visible during the interstitials and during play.
- Clicking it shows an **in-page confirmation** (*"Quit? The score will be lost."* with Quit / Cancel). Native `confirm()` is not used. Confirming returns to the menu and discards all state.

## Persistence

- None. A refresh or closed tab loses the tournament. Nothing goes to localStorage.

## Changes to existing modes

- **Winning-line highlight applies to all modes** ("vs computer" and "two players" as well). `winner()` needs to expose which line won, e.g. by returning `{ who, line }` or adding a helper, and `render()` adds a class (such as `.cell.win`) to those three cells.
- Otherwise the existing modes are unchanged.

## Implementation notes

- Tournament state is held in one object, e.g.
  `{ names: [p1, p2], wins: [0, 0], gameNumber, starter: 0|1 }`.
  The player playing X in a given game is `starter`, and the player playing O is `1 - starter`.
- `starter` flips after every game, decisive or drawn.
- The mapping from symbol to player index is derived per game. The board logic keeps using 'X'/'O' unchanged.
- Rematch: set `starter = loserIndex` and reset `wins` and `gameNumber`.
- Sections to add: name fields (inside the menu), the scoreboard, the interstitial, the end screen, and the quit confirmation. Toggle visibility with the `hidden` attribute, which already uses the `[hidden] { display: none !important }` rule.

## Out of scope

- Sound effects (covered by `sounds-spec.md`).
- Tournaments against the computer.
- Saving or resuming progress, and remembering names.
- Configurable series length.
- Accessibility work beyond Enter-to-submit (no aria-live announcements and no focus management for now).
