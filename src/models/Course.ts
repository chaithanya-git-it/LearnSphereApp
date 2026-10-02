import { Lesson } from './Lesson';

export interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  lessons: Lesson[];
}
