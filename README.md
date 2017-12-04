# AI Assessment project

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

| Param | Description |
| -- | -- |
| `--a` | Square ponlynomial 'a' parameter. Default is 1 |
| `--b` | Square ponlynomial 'b' parameter. Default is 1 |
| `--c` | Square ponlynomial 'c' parameter. Default is 1 |
| `-s`, `--subjects` | Number of subjects in population. Default is 10 |
| `-p`, `--populations` | Number of populations (How many iterations of population there will be. Default is 15) |
| `-m`, `--mutation` | Mutation probability. Range from 0-1 (0.3 by default) |
| `-o`, `--crossover` | Crossover probability. Range from 0-1 (0.85 by default) |
| `-r`, `--runs` | How many times algorithm should run. Each result is saved to CSV as separate line |
