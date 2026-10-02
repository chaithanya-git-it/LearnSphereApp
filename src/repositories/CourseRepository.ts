import { Course } from '../models/Course';
import { CourseApi } from '../services/CourseApi';
import { StorageService } from '../services/StorageService';
import { calculateProgress } from '../utils/calculateProgress';

export interface FetchCoursesResult {
  courses: Course[];
  isOffline: boolean;
}

/**
 * Fetches courses from remote API. If remote fails, falls back to local cache.
 */
export const getCourses = async (
  forceRefresh: boolean = false
): Promise<FetchCoursesResult> => {
  try {
    const remoteCourses = await CourseApi.fetchCoursesRemote();
    const cached = await StorageService.getCachedCourses();

    let finalCourses = remoteCourses;
    if (cached && cached.length > 0 && !forceRefresh) {
      finalCourses = remoteCourses.map(remoteCourse => {
        const cachedCourse = cached.find(c => c.id === remoteCourse.id);
        if (cachedCourse && cachedCourse.lessons) {
          const updatedProgress = calculateProgress(cachedCourse.lessons);
          return {
            ...remoteCourse,
            lessons: cachedCourse.lessons,
            progress: updatedProgress,
          };
        }
        return remoteCourse;
      });
    }

    await StorageService.saveCourses(finalCourses);
    return { courses: finalCourses, isOffline: false };
  } catch (remoteError) {
    const cachedCourses = await StorageService.getCachedCourses();
    if (cachedCourses && cachedCourses.length > 0) {
      return { courses: cachedCourses, isOffline: true };
    }

    throw new Error(
      'Unable to load courses. Please check your connection or disable simulated offline failure.'
    );
  }
};

/**
 * Updates lesson completion status and recalculates course progress.
 * Persists updated dataset to AsyncStorage.
 */
export const updateLessonStatus = async (
  courseId: number,
  lessonId: string,
  completed: boolean
): Promise<Course[]> => {
  const cached = await StorageService.getCachedCourses();
  const currentCourses = cached || (await CourseApi.fetchCoursesRemote());

  const updatedCourses = currentCourses.map(course => {
    if (course.id === courseId) {
      const updatedLessons = course.lessons.map(lesson => {
        if (lesson.id === lessonId) {
          return { ...lesson, completed };
        }
        return lesson;
      });

      const newProgress = calculateProgress(updatedLessons);

      return {
        ...course,
        lessons: updatedLessons,
        progress: newProgress,
      };
    }
    return course;
  });

  await StorageService.saveCourses(updatedCourses);
  return updatedCourses;
};

export const CourseRepository = {
  getCourses,
  updateLessonStatus,
};
