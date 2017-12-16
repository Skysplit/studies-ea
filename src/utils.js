// @flow
import { inRange, random } from 'lodash';
import { Subject } from './subject';

export type CombineSubjectsType = (first: Subject, second: Subject, cutPoint: number) => [
  Subject,
  Subject
];

export type TargetFunctionType = (subject: Subject) => number;

export type EventOccuredType = (chance: number) => boolean;

export type CheckFateType = () => number;

export const combineSubjects: CombineSubjectsType = (first, second, cutPoint) => {
  const parts = [first, second].map(value => [
    value.binaryValue.substring(0, cutPoint),
    value.binaryValue.substring(cutPoint),
  ]);

  const binaryValues = [
    `${parts[0][0]}${parts[1][1]}`,
    `${parts[1][0]}${parts[0][1]}`,
  ];

  const [firstValue, secondValue] = binaryValues.map(value => Subject.fromBinaryString(value));

  return [firstValue, secondValue];
};

export const checkFate: CheckFateType = () => random(0, 1, true);

export const eventOccured: EventOccuredType = chance => inRange(checkFate(), 0, chance);

