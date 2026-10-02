import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Lesson } from '../models/Lesson';

interface LessonItemProps {
  lesson: Lesson;
  index: number;
  onToggle: () => void;
}

export const LessonItem: React.FC<LessonItemProps> = ({
  lesson,
  index,
  onToggle,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={[styles.numberBadge, lesson.completed && styles.numberBadgeCompleted]}>
          <Text style={[styles.numberText, lesson.completed && styles.numberTextCompleted]}>
            {index + 1}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text
            style={[
              styles.statusText,
              lesson.completed ? styles.statusCompleted : styles.statusPending,
            ]}
          >
            {lesson.completed ? 'Completed' : 'Pending'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.actionButton,
          lesson.completed ? styles.actionCompleted : styles.actionPending,
        ]}
        onPress={onToggle}
        activeOpacity={0.8}
        accessibilityLabel={`Mark ${lesson.title} as ${lesson.completed ? 'pending' : 'completed'}`}
        accessibilityRole="button"
      >
        <Text
          style={[
            styles.actionButtonText,
            lesson.completed ? styles.textCompleted : styles.textPending,
          ]}
        >
          {lesson.completed ? 'Completed' : 'Mark Complete'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  numberBadgeCompleted: {
    backgroundColor: '#DCFCE7',
  },
  numberText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '600',
  },
  numberTextCompleted: {
    color: '#166534',
  },
  textContainer: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 2,
  },
  statusText: {
    fontSize: 12,
  },
  statusCompleted: {
    color: '#166534',
  },
  statusPending: {
    color: '#64748B',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  actionPending: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  actionCompleted: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  textPending: {
    color: '#FFFFFF',
  },
  textCompleted: {
    color: '#475569',
  },
});
