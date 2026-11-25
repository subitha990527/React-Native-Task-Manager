import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../styles/styles';

export default function StatisticsScreen({ tasks }) {

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  const pendingTasks = tasks.filter(
    (item) => !item.completed
  ).length;

  const overdueTasks = tasks.filter((item) => {

    if (!item.dueDate || item.completed) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskDate = new Date(item.dueDate);
    taskDate.setHours(0, 0, 0, 0);

    return taskDate < today;

  }).length;

  const percentage = totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100);

  return (

    <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 30 }}
        >

      <Text style={styles.heading}>Task Statistics</Text>

      <Text style={styles.statsDescription}>
        Track your task progress
      </Text>

      <View style={[styles.statsCard, styles.totalCard]}>
        <Text style={styles.statsNumber}>{totalTasks}</Text>
        <Text style={styles.statsLabel}>Total Tasks</Text>
      </View>

      <View style={[styles.statsCard, styles.pendingCard]}>
        <Text style={styles.statsNumber}>{pendingTasks}</Text>
        <Text style={styles.statsLabel}>Pending Tasks</Text>
      </View>

      <View style={[styles.statsCard, styles.completedCard]}>
        <Text style={styles.statsNumber}>{completedTasks}</Text>
        <Text style={styles.statsLabel}>Completed Tasks</Text>
      </View>

      <View style={[styles.statsCard, styles.overdueCard]}>
        <Text style={styles.statsNumber}>{overdueTasks}</Text>
        <Text style={styles.statsLabel}>Overdue Tasks</Text>
      </View>

      <View style={styles.progressCard}>

        <Text style={styles.progressTitle}>
          Completion Progress
        </Text>

        <Text style={styles.progressPercentage}>
          {percentage}%
        </Text>

        <View style={styles.progressBackground}>

          <View
            style={[
              styles.progressFill,
              { width: `${percentage}%` },
            ]}
          />

        </View>

      </View>

    </ScrollView>
  );
}