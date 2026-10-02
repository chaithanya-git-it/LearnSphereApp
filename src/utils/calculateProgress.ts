import { Lesson } from '../models/Lesson';

/**
 * Calculates the progress percentage of a course based on completed lessons.
 * Formula: Math.round((completedCount / totalCount) * 100)
 * Handles empty lesson arrays safely by returning 0%.
 *
 * @param lessons Array of Lesson objects
 * @returns Integer percentage between 0 and 100
 */
export const calculateProgress = (lessons: Lesson[]): number => {
  if (!lessons || lessons.length === 0) {
    return 0;
  }

  const completedCount = lessons.filter(lesson => lesson.completed).length;
  const percentage = (completedCount / lessons.length) * 100;

  return Math.round(percentage);
};
