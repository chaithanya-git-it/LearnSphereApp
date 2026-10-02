import { calculateProgress } from '../src/utils/calculateProgress';
import { Lesson } from '../src/models/Lesson';

describe('calculateProgress', () => {
  it('returns 0% when no lessons are completed', () => {
    const lessons: Lesson[] = [
      { id: '1', title: 'Intro', completed: false },
      { id: '2', title: 'Variables', completed: false },
      { id: '3', title: 'Functions', completed: false },
      { id: '4', title: 'OOP', completed: false },
    ];
    expect(calculateProgress(lessons)).toBe(0);
  });

  it('returns 50% when half the lessons are completed', () => {
    const lessons: Lesson[] = [
      { id: '1', title: 'Intro', completed: true },
      { id: '2', title: 'Variables', completed: true },
      { id: '3', title: 'Functions', completed: false },
      { id: '4', title: 'OOP', completed: false },
    ];
    expect(calculateProgress(lessons)).toBe(50);
  });

  it('returns 100% when all lessons are completed', () => {
    const lessons: Lesson[] = [
      { id: '1', title: 'Intro', completed: true },
      { id: '2', title: 'Variables', completed: true },
      { id: '3', title: 'Functions', completed: true },
      { id: '4', title: 'OOP', completed: true },
    ];
    expect(calculateProgress(lessons)).toBe(100);
  });

  it('returns 0% safely when the lesson array is empty', () => {
    const lessons: Lesson[] = [];
    expect(calculateProgress(lessons)).toBe(0);
  });
});
