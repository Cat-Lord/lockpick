# About

This is a lock picking mini-game inspired by Skyrim. The picking logic is as close to the original as possible. The UI is enhanced with tooltips used mostly for debugging. You might understand the meaning of the UI tooltips more if you have experience with the original Skyrim lock picking. The basic explanation:

- Lockpick HP: the lock pick break. Its remaining usage is determined by health points in the range of 100 (healthy lock pick) to 0 (broken lock pick).
- Lock Progress: Number from 0-100 signalling the amount of progress done on the lock. This number only changes when the cylinder in the center of the lock is being rotated. Achieving 100 means opening the lock and thus beating the game.
- Max Allowed Progress: If you are really close to solving the lock but not there yet, the lock cylinder rotates only partially. This number denotes the currently achievable maximum. It is being populated right when you start picking the lock and it can range from 0 (you are going to fail immediately) through various different numbers based on the difficulty (e.g. 50 meaning you can rotate the lock only by 50%) to 100 (lock is going to be solved with this lock pick rotation).

These values are used for easier development and game-balancing and might get removed later.

## Tech Stack

- Parcel: Bundling for development & production
- Typescript: works well with Parcel

There is also an `http-server` dependency to serve static production builds.

# How to run

Open the terminal and run either

- `npm run parcel`: for a development build

Or create a production build and run it in the `http-server`:

- `npm run build`
- `npm run serve-build`

# Known Bugs

- Leaving the app running for a few minutes can cause serious browser lags. Most likely relevant to required code optimisations mentioned in the section [Future Goals - Code refactoring and optimisation](README.md#code-refactoring-and-optimisation)

# Future Goals

## Introduce lives

Currently you have only one lock pick. This would create a number of remaining lives. If you break a lock pick, you lose a life and get another change.

### Pointing system

According to the number of tries and your accuracy you would see an ending screen with score and statistics.

## Code refactoring and optimisation

Currently the lock is being rendered infinitely and operations could be optimised. Also code could be a bit cleaner.

## Animate breaking of the lock pick

Probably a no-go since it's quite difficult to implement with plain javascript. Might consider a library or a sprite animation.

## Create a mobile version

Mobile version design for a phone screen. There is an option to migrate the solution to a framework (most likely not worth it and an overkill).
