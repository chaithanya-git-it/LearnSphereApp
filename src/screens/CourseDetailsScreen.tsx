import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  CourseDetailsScreenRouteProp,
  CourseDetailsScreenNavigationProp,
} from '../navigation/types';
import { useCourses } from '../hooks/useCourses';
import { ProgressBar } from '../components/ProgressBar';
import { LessonItem } from '../components/LessonItem';
import { Lesson } from '../models/Lesson';

export const CourseDetailsScreen: React.FC = () => {
  const route = useRoute<CourseDetailsScreenRouteProp>();
  const navigation = useNavigation<CourseDetailsScreenNavigationProp>();
  const { courseId } = route.params;

  const { courses, loading, toggleLesson } = useCourses();

  const course = courses.find(c => c.id === courseId);

  if (loading && !course) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      </SafeAreaView>
    );
  }

  if (!course) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorTitle}>Course Not Found</Text>
          <Text style={styles.errorSubtitle}>
            The requested course could not be loaded.
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const completedCount = course.lessons.filter(l => l.completed).length;
  const totalCount = course.lessons.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerCard}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.instructor}>Instructor: {course.instructor}</Text>

          <View style={styles.progressBox}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Course Progress</Text>
              <Text style={styles.progressPercentage}>{course.progress}%</Text>
            </View>
            <ProgressBar progress={course.progress} height={8} />
            <Text style={styles.completedCountText}>
              {completedCount} of {totalCount} lessons completed
            </Text>
          </View>
        </View>

        <View style={styles.lessonsSection}>
          <Text style={styles.sectionHeader}>Course Modules</Text>
          {course.lessons.map((lesson: Lesson, index: number) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              index={index}
              onToggle={() =>
                toggleLesson(course.id, lesson.id, !lesson.completed)
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  instructor: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  progressBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  progressPercentage: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2563EB',
  },
  completedCountText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 8,
  },
  lessonsSection: {
    marginTop: 4,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 6,
  },
  errorSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
