import { useState, useEffect, useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Course } from '../models/Course';
import { CourseRepository } from '../repositories/CourseRepository';

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  const loadCourses = useCallback(
    async (
      isPullRefresh: boolean = false,
      forceRefresh: boolean = false,
      isSilent: boolean = false
    ) => {
      if (isPullRefresh) {
        setRefreshing(true);
      } else if (!isSilent) {
        setLoading(true);
      }
      setError(null);

      try {
        const result = await CourseRepository.getCourses(forceRefresh);
        setCourses(result.courses);
        setIsOffline(result.isOffline);
      } catch (err: any) {
        setError(err.message || 'Failed to load courses.');
        setCourses([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  // Initial load
  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  // Real-time network state listener
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const offline = state.isConnected === false || state.isInternetReachable === false;
      setIsOffline(offline);

      // Silently reload courses based on real-time network transition
      loadCourses(false, !offline, true);
    });

    return () => unsubscribe();
  }, [loadCourses]);

  const toggleLesson = useCallback(
    async (courseId: number, lessonId: string, completed: boolean) => {
      try {
        const updated = await CourseRepository.updateLessonStatus(
          courseId,
          lessonId,
          completed
        );
        setCourses(updated);
      } catch (err: any) {
        console.error('Failed to update lesson status:', err);
      }
    },
    []
  );

  return {
    courses,
    loading,
    refreshing,
    error,
    isOffline,
    refresh: () => loadCourses(true, true),
    retry: () => loadCourses(false, true),
    reloadSilent: () => loadCourses(false, false, true),
    toggleLesson,
  };
};
