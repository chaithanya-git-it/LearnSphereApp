import AsyncStorage from '@react-native-async-storage/async-storage';
import { Course } from '../models/Course';

const STORAGE_KEY_COURSES = '@learnsphere_courses_v1';

/**
 * Persists courses array to local AsyncStorage.
 */
export const saveCourses = async (courses: Course[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(courses);
    await AsyncStorage.setItem(STORAGE_KEY_COURSES, jsonValue);
  } catch (error) {
    console.error('Error saving courses to AsyncStorage:', error);
    throw new Error('Failed to save data locally.');
  }
};

/**
 * Retrieves cached courses from local AsyncStorage.
 * Returns null if cache is empty or corrupted.
 */
export const getCachedCourses = async (): Promise<Course[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY_COURSES);
    if (!jsonValue) {
      return null;
    }
    const data = JSON.parse(jsonValue);
    if (Array.isArray(data)) {
      return data as Course[];
    }
    return null;
  } catch (error) {
    console.error('Error reading courses from AsyncStorage:', error);
    return null;
  }
};

/**
 * Clears cached courses.
 */
export const clearCache = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY_COURSES);
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

export const StorageService = {
  saveCourses,
  getCachedCourses,
  clearCache,
};
