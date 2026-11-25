
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform,
  Modal,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

import styles, { darkStyles } from '../styles/styles';

const priorities = ['High', 'Medium', 'Low'];

const priorityColors = {
  High: '#D94343',
  Medium: '#D99A32',
  Low: '#238B55',
};

export default function TasksScreen({
  tasks,
  setTasks,
  isDarkMode,
  setIsDarkMode,
}) {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState('Medium');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('Recent');

  // Open Add Task Modal
  const openAddModal = () => {
    setTask('');
    setDescription('');
    setDueDate(new Date());
    setPriority('Medium');
    setEditId(null);
    setShowDatePicker(false);
    setShowTaskModal(true);
  };

  // Add or Update Task
  const addTask = () => {
    if (task.trim() === '') {
      Alert.alert('Error', 'Please enter a task');
      return;
    }

    if (editId !== null) {
      const updatedTasks = tasks.map((item) =>
        item.id === editId
          ? {
              ...item,
              title: task.trim(),
              description: description.trim(),
              dueDate: dueDate.toISOString(),
              priority: priority,
            }
          : item
      );

      setTasks(updatedTasks);
    } else {
      const newTask = {
        id: Date.now().toString(),
        title: task.trim(),
        description: description.trim(),
        completed: false,
        dueDate: dueDate.toISOString(),
        priority: priority,
      };

      setTasks([...tasks, newTask]);
    }

    setTask('');
    setDueDate(new Date());
    setDescription('');
    setPriority('Medium');
    setEditId(null);
    setShowDatePicker(false);
    setShowTaskModal(false);
  };

  // Edit Task
  const editTask = (item) => {
    setTask(item.title);
    setEditId(item.id);

    setDueDate(
      item.dueDate ? new Date(item.dueDate) : new Date()
    );
    setDescription(item.description || '');
    setPriority(item.priority || 'Medium');
    setShowDatePicker(false);
    setShowTaskModal(true);
  };

  const viewTaskDetails = (item) => {
    setSelectedTask(item);
    setShowDetailsModal(true);
  };

  // Close Modal
  const cancelEditing = () => {
    setTask('');
    setEditId(null);
    setDueDate(new Date());
    setDescription('');
    setPriority('Medium');
    setShowDatePicker(false);
    setShowTaskModal(false);
  };

  // Delete Task
  const deleteTask = (id) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTasks((previousTasks) =>
              previousTasks.filter((item) => item.id !== id)
            );
          },
        },
      ]
    );
  };

  // Toggle Task Status
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );

    setTasks(updatedTasks);
  };

  // Format Date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Check Overdue
  const isOverdue = (item) => {
    if (!item.dueDate || item.completed) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskDate = new Date(item.dueDate);
    taskDate.setHours(0, 0, 0, 0);

    return taskDate < today;
  };

  // Filter and Search Tasks
  const filteredTasks = tasks.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    if (!matchesSearch) {
      return false;
    }

    if (filter === 'Pending') {
      return !item.completed;
    }

    if (filter === 'Completed') {
      return item.completed;
    }

    if (filter === 'Overdue') {
      return isOverdue(item);
    }

    return true;
  });

  // Sort Tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'Due Date') {
      return (
        new Date(a.dueDate || '9999-12-31') -
        new Date(b.dueDate || '9999-12-31')
      );
    }

    if (sortBy === 'Priority') {
      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
      };

      return (
        (priorityOrder[a.priority || 'Medium'] || 2) -
        (priorityOrder[b.priority || 'Medium'] || 2)
      );
    }

    return Number(b.id) - Number(a.id);
  });

  // Display Each Task
  const renderTask = ({ item }) => {
    const taskPriority = item.priority || 'Medium';
    const priorityColor = priorityColors[taskPriority];

    return (
      <TouchableOpacity
        style={[
          styles.taskCard,
          isDarkMode && darkStyles.taskCard,
        ]}
        activeOpacity={0.8}
        onPress={() => viewTaskDetails(item)}
      >
        <View style={styles.taskDetails}>
          {/* Task Title and Description */}
<View
  style={{
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }}
>
  <Text
    style={[
      styles.taskTitle,
      item.completed && styles.completedTitle,
      isDarkMode && { color: '#FFFFFF', fontWeight: 'bold' },
    ]}
  >
    {item.title}
  </Text>

  {item.description ? (
    <Text
      style={{
        width: '100%',
        fontSize: 13,
        color: '#77857B',
        marginTop: 5,
        lineHeight: 19,
      }}
    >
      {item.description}
    </Text>
  ) : null}
</View>

          <View
            style={[
              styles.priorityBadge,
              {
                backgroundColor: `${priorityColor}20`,
              },
            ]}
          >
            <Text
              style={[
                styles.priorityBadgeText,
                { color: priorityColor },
              ]}
            >
              {taskPriority} Priority
            </Text>
          </View>

          {item.dueDate && (
            <View style={styles.dateRow}>
              <Ionicons
                name="calendar-outline"
                size={15}
                color={isOverdue(item) ? '#D94343' : '#77857B'}
              />

              <Text
                style={[
                  styles.dueDateText,
                  isOverdue(item) && styles.overdueText,
                ]}
              >
                Due: {formatDate(item.dueDate)}
              </Text>
            </View>
          )}

          <Text
            style={[
              styles.taskStatus,
              item.completed && styles.completedStatus,
              isOverdue(item) && styles.overdueText,
            ]}
          >
            {item.completed
              ? 'Completed'
              : isOverdue(item)
                ? 'Overdue'
                : 'Pending'}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={(event) => {
              event.stopPropagation();
              editTask(item);
            }}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={(event) => {
              event.stopPropagation();
              deleteTask(item.id);
            }}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.completeButton}
            onPress={(event) => {
              event.stopPropagation();
              toggleTask(item.id);
            }}
          >
            <Text style={styles.buttonText}>
              {item.completed ? 'Undo' : 'Done'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
        style={[
          styles.container,
          { flex: 1 },
          isDarkMode && darkStyles.container,
        ]}
      >

      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 15,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Text
              style={[
                styles.heading,
                { marginBottom: 15 },
                isDarkMode && darkStyles.heading,
              ]}
            >
              My Task Manager
            </Text>

          <TouchableOpacity
            onPress={() => setIsDarkMode(!isDarkMode)}
            style={{
              backgroundColor: isDarkMode ? '#34483B' : '#EEF2EF',
              padding: 10,
              borderRadius: 25,
              marginBottom: 15,
            }}
          >
            <Ionicons
              name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
              size={22}
              color={isDarkMode ? '#FFD166' : '#238B55'}
            />
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity
          onPress={openAddModal}
          style={{
            backgroundColor: '#238B55',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 13,
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: '600',
              marginLeft: 4,
            }}
          >
            Add Task
          </Text>
        </TouchableOpacity> */}
      </View>

      {/* Search Tasks */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#DCE5DE',
          borderRadius: 12,
          paddingHorizontal: 14,
          marginBottom: 15,
          height: 48,
          width: '100%',
        }}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color="#77857B"
        />

        <TextInput
          style={{
            flex: 1,
            marginLeft: 10,
            color: '#26352B',
            fontSize: 15,
          }}
          placeholder="Search your tasks..."
          placeholderTextColor="#89958D"
          value={searchText}
          onChangeText={setSearchText}
        />

        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons
              name="close-circle"
              size={20}
              color="#77857B"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Task Filters */}
      <Text
        style={[
          styles.listHeading,
          isDarkMode && darkStyles.listHeading,
        ]}
      >
        My Tasks ({filteredTasks.length})
      </Text>

      <View style={styles.filterContainer}>
        {['All', 'Pending', 'Completed', 'Overdue'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterButton,
              filter === item && styles.activeFilter,
            ]}
            onPress={() => setFilter(item)}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sort Tasks */}
     <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: isDarkMode ? '#FFFFFF' : '#34483B',
          }}
        >
          Sort By
        </Text>

        <View style={{ flexDirection: 'row', gap: 6 }}>
          {['Recent', 'Due Date', 'Priority'].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setSortBy(item)}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 8,
                backgroundColor: sortBy === item
                  ? '#238B55'
                  : isDarkMode ? '#202C25' : '#FFFFFF',
                borderWidth: 1,
                borderColor: sortBy === item
                  ? '#238B55'
                  : isDarkMode ? '#526B5A' : '#DCE5DE',
              }}
            >
              <Text
                style={{
                  color: sortBy === item
                    ? '#FFFFFF'
                    : isDarkMode ? '#FFFFFF' : '#526057',
                  fontSize: 11,
                  fontWeight: '600',
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Task List */}
      <FlatList
        style={{ flex: 1 }}
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 90 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks found!
          </Text>
        }
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={openAddModal}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 20,
          width: 58,
          height: 58,
          borderRadius: 29,
          backgroundColor: '#238B55',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 6,
          zIndex: 10,
        }}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Add / Edit Task Modal */}
      <Modal
        visible={showTaskModal}
        transparent={true}
        animationType="slide"
        onRequestClose={cancelEditing}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.45)',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 18,
              padding: 22,
              elevation: 8,
            }}
          >
            {/* Modal Header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#26352B',
                }}
              >
                {editId !== null ? 'Edit Task' : 'Add New Task'}
              </Text>

              <TouchableOpacity onPress={cancelEditing}>
                <Ionicons
                  name="close-circle-outline"
                  size={26}
                  color="#77857B"
                />
              </TouchableOpacity>
            </View>

            {/* Task Title */}
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#34483B',
                marginBottom: 8,
              }}
            >
              Task Title
            </Text>

            

        <TextInput
  style={{
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#238B55',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
    color: '#26352B',
    fontSize: 16,
    textAlignVertical: 'center',
  }}
  placeholder="Enter your task"
  placeholderTextColor="#89958D"
  value={task}
  onChangeText={setTask}
  cursorColor="#238B55"
  selectionColor="#238B55"
  autoFocus={true}
/>

{/* Task Description */}
<Text
  style={{
    fontSize: 14,
    fontWeight: '600',
    color: '#34483B',
    marginBottom: 8,
  }}
>
  Description (Optional)
</Text>

<TextInput
  style={{
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderColor: '#DCE5DE',
    borderRadius: 10,
    padding: 12,
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
    color: '#26352B',
    fontSize: 15,
    textAlignVertical: 'top',
  }}
  placeholder="Enter task description..."
  placeholderTextColor="#89958D"
  value={description}
  onChangeText={setDescription}
  multiline
  cursorColor="#238B55"
/>

            {/* Due Date */}
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#34483B',
                marginBottom: 8,
              }}
            >
              Due Date
            </Text>

            <TouchableOpacity
              style={[
                styles.datePickerButton,
                { marginBottom: 18 },
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#238B55"
              />

              <Text style={styles.datePickerText}>
                {formatDate(dueDate)}
              </Text>

              <Ionicons
                name="chevron-down"
                size={18}
                color="#238B55"
              />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={dueDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                minimumDate={new Date(new Date().setHours(0, 0, 0, 0))}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);

                  if (selectedDate) {
                    setDueDate(selectedDate);
                  }
                }}
              />
            )}

            {/* Priority */}
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#34483B',
                marginBottom: 10,
              }}
            >
              Select Priority
            </Text>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginBottom: 24,
              }}
            >
              {priorities.map((item) => {
                const selected = priority === item;
                const color = priorityColors[item];

                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setPriority(item)}
                    style={{
                      flex: 1,
                      paddingVertical: 11,
                      alignItems: 'center',
                      borderRadius: 9,
                      borderWidth: 1,
                      borderColor: selected ? color : '#DCE5DE',
                      backgroundColor: selected ? color : '#FFFFFF',
                    }}
                  >
                    <Text
                      style={{
                        color: selected ? '#FFFFFF' : '#526057',
                        fontWeight: '600',
                        fontSize: 13,
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Modal Buttons */}
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={cancelEditing}
                style={{
                  flex: 1,
                  paddingVertical: 13,
                  alignItems: 'center',
                  backgroundColor: '#EEF2EF',
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: '#526057',
                    fontWeight: '600',
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={addTask}
                style={{
                  flex: 1,
                  paddingVertical: 13,
                  alignItems: 'center',
                  backgroundColor: '#238B55',
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '600',
                  }}
                >
                  {editId !== null ? 'Update Task' : 'Save Task'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Task Details Modal */}
      <Modal
        visible={showDetailsModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDetailsModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.45)',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 18,
              padding: 22,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#26352B' }}>
                Task Details
              </Text>

              <TouchableOpacity onPress={() => setShowDetailsModal(false)}>
                <Ionicons name="close-circle-outline" size={26} color="#77857B" />
              </TouchableOpacity>
            </View>

            {selectedTask && (
              <>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#26352B' }}>
                  {selectedTask.title}
                </Text>

                <Text style={{ fontSize: 14, color: '#77857B', marginTop: 12 }}>
                  {selectedTask.description || 'No description added.'}
                </Text>

                <Text style={{ marginTop: 18, color: '#34483B', fontWeight: '600' }}>
                  Due Date
                </Text>

                <Text style={{ marginTop: 5, color: '#77857B' }}>
                  {selectedTask.dueDate
                    ? formatDate(selectedTask.dueDate)
                    : 'No due date'}
                </Text>

                <Text style={{ marginTop: 18, color: '#34483B', fontWeight: '600' }}>
                  Priority
                </Text>

                <Text style={{ marginTop: 5, color: '#77857B' }}>
                  {selectedTask.priority || 'Medium'}
                </Text>

                <Text style={{ marginTop: 18, color: '#34483B', fontWeight: '600' }}>
                  Status
                </Text>

                <Text style={{ marginTop: 5, color: '#77857B' }}>
                  {selectedTask.completed ? 'Completed' : 'Pending'}
                </Text>
              </>
            )}

            <TouchableOpacity
              onPress={() => setShowDetailsModal(false)}
              style={{
                backgroundColor: '#238B55',
                padding: 13,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 25,
              }}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}
