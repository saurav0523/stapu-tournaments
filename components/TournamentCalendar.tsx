import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Tournament } from '../types/tournament';
import { getDateKey } from '../utils/dateUtils';

interface TournamentCalendarProps {
  tournaments: Tournament[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

const { width } = Dimensions.get('window');

export const TournamentCalendar: React.FC<TournamentCalendarProps> = ({
  tournaments,
  selectedDate,
  onDateSelect,
  currentMonth,
  onMonthChange,
}) => {
  // Create marked dates object for calendar highlighting
  const getMarkedDates = () => {
    const marked: any = {};
    
    console.log('🗓️ Getting marked dates for', tournaments.length, 'tournaments');
    
    if (!tournaments || tournaments.length === 0) {
      console.log('⚠️ No tournaments to mark dates for');
      return marked;
    }
    
    tournaments.forEach((tournament) => {
      try {
        if (tournament && tournament.start_date) {
          const dateKey = getDateKey(tournament.start_date);
          if (dateKey) {
            console.log(`🗓️ Marking date ${dateKey} for tournament: ${tournament.name}`);
            marked[dateKey] = {
              marked: true,
              dotColor: '#FF6B35',
              selected: selectedDate === dateKey,
              selectedColor: '#FF6B35',
            };
          } else {
            console.log(`⚠️ Could not get date key for tournament: ${tournament.name}, start_date: ${tournament.start_date}`);
          }
        }
      } catch (error) {
        console.warn('Error processing tournament date:', error);
      }
    });

    // Mark selected date
    if (selectedDate) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: '#FF6B35',
      };
    }
    return marked;
  };

  const handleDayPress = (day: DateData) => {
    console.log('📅 Calendar day pressed:', day.dateString);
    console.log('📅 Day object:', JSON.stringify(day, null, 2));
    onDateSelect(day.dateString);
  };

  const handleMonthChange = (month: any) => {
    const newDate = new Date(month.year, month.month - 1, 1);
    onMonthChange(newDate);
  };

  const renderHeader = (date: any) => {
    try {
      // Use currentMonth instead of the date parameter to ensure consistency
      const month = currentMonth;
      if (!month || isNaN(month.getTime())) {
        return (
          <View style={styles.headerContainer}>
            <Text style={styles.monthText}>Aug 2025</Text>
          </View>
        );
      }
      
      return (
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => {
              const prevMonth = new Date(month.getFullYear(), month.getMonth() - 1, 1);
              onMonthChange(prevMonth);
            }}
          >
            <Text style={styles.arrowText}>‹</Text>
          </TouchableOpacity>
          
          <Text style={styles.monthText}>
            {month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </Text>
          
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => {
              const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);
              onMonthChange(nextMonth);
            }}
          >
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        </View>
      );
    } catch (error) {
      console.warn('Error rendering header:', error);
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.monthText}>Aug 2025</Text>
        </View>
      );
    }
  };

  const renderDayName = (day: any) => {
    const dayNames = ['m', 't', 'w', 't', 'f', 's', 's'];
    return (
      <Text style={styles.dayNameText} key={day}>
        {dayNames[day]}
      </Text>
    );
  };

  // Validate currentMonth to ensure it's a valid date
  const getValidCurrentDate = () => {
    try {
      if (currentMonth && !isNaN(currentMonth.getTime())) {
        return currentMonth.toISOString().split('T')[0];
      }
      // Fallback to current date if invalid
      return new Date().toISOString().split('T')[0];
    } catch (error) {
      console.warn('Invalid date, using current date:', error);
      return new Date().toISOString().split('T')[0];
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={getValidCurrentDate()}
        onDayPress={handleDayPress}
        markedDates={getMarkedDates()}
        monthFormat="MMMM yyyy"
        hideExtraDays={false}
        disableMonthChange={false}
        firstDay={1}
        hideDayNames={false}
        showWeekNumbers={false}
        onMonthChange={handleMonthChange}
                         theme={{
                   backgroundColor: '#ffffff',
                   calendarBackground: '#ffffff',
                   textSectionTitleColor: '#666666',
                   selectedDayBackgroundColor: '#FF6B35',
                   selectedDayTextColor: '#FFFFFF',
                   todayTextColor: '#FF6B35',
                   dayTextColor: '#333333',
                   textDisabledColor: '#D1D5DB',
                   dotColor: '#FF6B35',
                   selectedDotColor: '#FFFFFF',
                   arrowColor: '#666666',
                   monthTextColor: '#333333',
                   indicatorColor: '#FF6B35',
                   textDayFontWeight: '500',
                   textMonthFontWeight: '600',
                   textDayHeaderFontWeight: '500',
                   textDayFontSize: 14,
                   textMonthFontSize: 18,
                   textDayHeaderFontSize: 12,
                 }}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '600',
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  dayNameText: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
});
