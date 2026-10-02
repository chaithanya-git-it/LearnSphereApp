import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Course } from '../models/Course';
import { ProgressBar } from './ProgressBar';

interface CourseCardProps {
  course: Course;
  onPress: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onPress }) => {
  const totalLessons = course.lessons ? course.lessons.length : 0;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {course.title}
          </Text>
          <Text style={styles.instructor}>Instructor: {course.instructor}</Text>
        </View>
        <Text style={styles.badgeText}>{course.progress}%</Text>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressInfo}>
          <Text style={styles.lessonCount}>{totalLessons} Lessons</Text>
          <Text style={styles.progressText}>{course.progress}% Completed</Text>
        </View>
        <ProgressBar progress={course.progress} height={6} />
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={onPress}
        activeOpacity={0.8}
        accessibilityLabel={`Continue course ${course.title}`}
        accessibilityRole="button"
      >
        <Text style={styles.continueButtonText}>
          {course.progress === 100 ? 'Review Course' : 'Continue'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 3,
  },
  instructor: {
    fontSize: 13,
    color: '#64748B',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  lessonCount: {
    fontSize: 12,
    color: '#64748B',
  },
  progressText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  continueButtonText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '600',
  },
});
