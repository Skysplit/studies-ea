// @flow
import { min, sumBy, uniqBy, last } from 'lodash';
import { Subject } from './subject';
import { checkFate, type TargetFunctionType } from './utils';

export type SelectorType = (
  subjects: Array<Subject>,
  targetFunction: TargetFunctionType
) => Array<Subject>;

type SubjectWithTarget = {
  target: number,
  subject: Subject,
}

type NormalizeResultsType = (results: Array<SubjectWithTarget>) => Array<SubjectWithTarget>;

type GetRangeIndexType = (range: Array<number>, value: number) => number;

const normalizeResults: NormalizeResultsType = (subjects) => {
  const minValue = min(subjects.map(subject => subject.target));

  if (minValue > 0) {
    return subjects;
  }

  const value = Math.abs(minValue) + 1;

  return subjects.map(subject => ({
    ...subject,
    target: subject.target + value,
  }));
};

const getRangeIndex: GetRangeIndexType = (range, value) => range.findIndex(match => value < match);

export const selector: SelectorType = (subjects, targetFn) => {
  const targets = uniqBy(subjects, 'value').map(subject => ({
    subject,
    target: targetFn(subject),
  }));

  const normalizedTargets = normalizeResults(targets).sort((first, second) => (
    first.target - second.target
  ));

  const total: number = sumBy(normalizedTargets, 'target');
  const shareRanges = normalizedTargets.reduce(
    (accum, subject) => [
      ...accum,
      (last(accum) || 0) + (subject.target / total),
    ],
    [],
  );

  return subjects.map(() => {
    const fate = checkFate();
    const index = getRangeIndex(shareRanges, fate);
    const { subject } = normalizedTargets[index];

    return new Subject(subject.value);
  });
};


export default selector;
