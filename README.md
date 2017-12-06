# AI Assessment project

[![Build Status](https://travis-ci.org/Skysplit/studies-ea.svg?branch=master)](https://travis-ci.org/Skysplit/studies-ea)

This is simple evolutionary algorithm made for AI assessment.

It tries to find the best `x` value for square polynomial result `ax^2 + bx + c`.

## Setup

You need **NodeJS**.
Recommended version is `8.9` but most probably any other version that can handle babel and file writing will be fine.
Also **npm** with version at least `5` (or higher) is recommended due to `package-lock.json` support.

To setup project, in your project folder simply run

```bash
npm install
```

### Linter

If you want to check if your code follows nice style guides, in your project folder run

```bash
npm run lint
```

This will run linter, and warn you about some ugly code or bad practices!

### Tests

Starting tests is done by

```
npm test
```

You can run tests in CI mode (this will run in single process and generate coverage)

```bash
npm run test:ci
```

You can also run tests watcher (it waits for changes in files)

```
npm run test:watch
````

## Usage

You can run program once using

```bash
npm start
```

or you can set watch mode (dev mode) by running

```bash
npm run dev
```

While in dev mode, typing `rs` will trigger server restart and values will be recalculated.

### Running with params

To run project with params, you have to add additional `--` to your script command, like below:

```bash
npm start -- --a=1 --b=2 --c=3 -r=10
```

### Input parameters

| Param | Description | Type | Default |
| -- | -- | -- | -- |
| `--a` | Square ponlynomial 'a' parameter. | number | 1 |
| `--b` | Square ponlynomial 'b' parameter. | number | 1 |
| `--c` | Square ponlynomial 'c' parameter. | number | 1 |
| `-s`, `--subjects` | Number of subjects in population. | number | 10 |
| `-p`, `--populations` | Number of populations (How many iterations of population there will be.) | number | 15 |
| `-m`, `--mutation` | Mutation probability. Range from 0-1 | number (float) | 0.3 |
| `-o`, `--crossover` | Crossover probability. Range from 0-1 | number (float) | 0.85  |
| `-r`, `--runs` | How many times algorithm should run. Each result is saved to CSV as separate line | number | 100 |
