import { Course } from '../models/Course';

export const INITIAL_COURSES: Course[] = [
  {
    id: 1,
    title: 'Python Programming',
    instructor: 'John Smith',
    progress: 50,
    lessons: [
      { id: '1-1', title: 'Introduction', completed: true },
      { id: '1-2', title: 'Variables & Data Types', completed: true },
      { id: '1-3', title: 'Functions', completed: false },
      { id: '1-4', title: 'Object-Oriented Programming', completed: false },
    ],
  },
  {
    id: 2,
    title: 'Generative AI',
    instructor: 'Sarah Williams',
    progress: 25,
    lessons: [
      { id: '2-1', title: 'Introduction', completed: true },
      { id: '2-2', title: 'Variables & Data Types', completed: false },
      { id: '2-3', title: 'Functions', completed: false },
      { id: '2-4', title: 'Object-Oriented Programming', completed: false },
    ],
  },
  {
    id: 3,
    title: 'Full Stack Development',
    instructor: 'David Brown',
    progress: 0,
    lessons: [
      { id: '3-1', title: 'Introduction', completed: false },
      { id: '3-2', title: 'Variables & Data Types', completed: false },
      { id: '3-3', title: 'Functions', completed: false },
      { id: '3-4', title: 'Object-Oriented Programming', completed: false },
    ],
  },
];
