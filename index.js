// @flow
import { createWriteStream } from 'fs';
import csv from 'fast-csv';
import minimist from 'minimist';
import { times, mean } from 'lodash';
import type { TargetFunctionType } from './src/utils';
import runner from './src/index';

type SquarePolynomialType = (a: number, b: number, c: number, x: number) => number;

const argv = minimist(process.argv.slice(2), {
  default: {
    a: 1,
    b: 1,
    c: 1,
    subjects: 10,
    populations: 15,
    runs: 100,
    crossover: 0.85,
    mutation: 0.3,
  },
  alias: {
    subjects: ['s'],
    populations: ['p'],
    runs: ['r'],
    crossover: ['o'],
    mutation: ['m'],
  },
});

const squarePolynomial: SquarePolynomialType = (a, b, c, x) => (a * (x ** 2)) + (b * x) + c;

const targetFn: TargetFunctionType = (subject) => {
  const params = ['a', 'b', 'c'].map(param => parseInt(argv[param] || 1, 10));
  return squarePolynomial(...params, subject.value);
};

const csvFile = csv.createWriteStream();
const file = createWriteStream('results.csv');
csvFile.pipe(file);

const values = [];
const {
  subjects,
  populations,
  runs,
  mutation,
  crossover,
} = argv;

times(parseInt(runs, 10), () => {
  const max = runner(
    parseInt(subjects, 10),
    parseInt(populations, 10),
    parseFloat(crossover),
    parseFloat(mutation),
    targetFn,
  );

  const maxTarget = targetFn(max);
  values.push(max.value);
  csvFile.write([max.value, max.binaryValue, maxTarget]);
  process.stdout.write(`${max.value}\n`);
});

process.stdout.write(`Mean ${mean(values)}\n`);

csvFile.end();
file.end();