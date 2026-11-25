
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F9F7',
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9F7',
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#172B22',
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 15,
    gap: 10,
  },

  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5EAE6',
    fontSize: 15,
  },

  addButton: {
    backgroundColor: '#238B55',
    paddingHorizontal: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAE6',
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
  },

  datePickerText: {
    flex: 1,
    marginLeft: 10,
    color: '#34483B',
    fontSize: 14,
    fontWeight: '600',
  },

  cancelText: {
    color: '#D94343',
    marginBottom: 12,
    fontWeight: '600',
  },

  listHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#172B22',
    marginTop: 12,
    marginBottom: 15,
  },

  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },

  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#E9EFEB',
    borderRadius: 12,
  },

  activeFilter: {
    backgroundColor: '#238B55',
  },

  filterText: {
    color: '#526057',
    fontWeight: '600',
    fontSize: 12,
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

  taskCard: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 16,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#EDF1ED',
  },

  taskDetails: {
    marginBottom: 14,
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#24352B',
  },

  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#9AA49D',
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },

  dueDateText: {
    fontSize: 12,
    color: '#77857B',
  },

  overdueText: {
    color: '#D94343',
    fontWeight: 'bold',
  },

  taskStatus: {
    color: '#D99A32',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 7,
  },

  completedStatus: {
    color: '#238B55',
  },

  actions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },

  editButton: {
    backgroundColor: '#3478C5',
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 9,
  },

  deleteButton: {
    backgroundColor: '#D94343',
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 9,
  },

  completeButton: {
    backgroundColor: '#238B55',
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 9,
  },

  emptyText: {
    textAlign: 'center',
    color: '#929B94',
    marginTop: 35,
    fontSize: 14,
  },

  // Statistics Styles

  statsDescription: {
    fontSize: 15,
    color: '#849087',
    marginBottom: 25,
  },

  statsCard: {
    padding: 20,
    borderRadius: 18,
    marginBottom: 13,
    alignItems: 'center',
  },

  totalCard: {
    backgroundColor: '#E7F0FF',
  },

  pendingCard: {
    backgroundColor: '#FFF2DB',
  },

  completedCard: {
    backgroundColor: '#E3F4E9',
  },

  overdueCard: {
    backgroundColor: '#FCE8E8',
  },

  statsNumber: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#20352A',
  },

  statsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#59675E',
    marginTop: 6,
  },

  progressCard: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 18,
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EDF1ED',
  },

  progressTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#24352B',
  },

  progressPercentage: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#238B55',
    marginTop: 14,
    marginBottom: 14,
  },

  progressBackground: {
    height: 11,
    backgroundColor: '#E8EDE9',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: 11,
    backgroundColor: '#238B55',
    borderRadius: 10,
  },


  // Priority Selection Styles

  priorityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34483B',
    marginBottom: 10,
  },

  priorityContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },

  priorityButton: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5EAE6',
    backgroundColor: '#FFFFFF',
  },

  priorityButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#526057',
  },

  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 8,
  },

  priorityBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },


});


// Dark Mode Styles

export const darkStyles = StyleSheet.create({

  container: {
    backgroundColor: '#121A16',
  },

  heading: {
    color: '#FFFFFF',
  },

  listHeading: {
    color: '#FFFFFF',
  },

  taskCard: {
    backgroundColor: '#202C25',
    borderColor: '#34483B',
  },

  taskTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: '#202C25',
    color: '#FFFFFF',
    borderColor: '#34483B',
  },

  filterButton: {
    backgroundColor: '#34483B',
  },

  filterText: {
    color: '#E0E8E2',
  },

  emptyText: {
    color: '#A0AEA4',
  },

  progressCard: {
    backgroundColor: '#202C25',
    borderColor: '#34483B',
  },

  progressTitle: {
    color: '#FFFFFF',
  },

  statsDescription: {
    color: '#A0AEA4',
  },

});

export default styles;