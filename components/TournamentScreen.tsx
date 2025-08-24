import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { SportsFilter } from './SportsFilter';
import { TournamentCalendar } from './TournamentCalendar';
import { TournamentCard } from './TournamentCard';
import { ApiService } from '../services/api';
import { Sport, Tournament as TournamentType, SportWithTournaments } from '../types/tournament';
import { getDateKey, formatDate } from '../utils/dateUtils';

export const TournamentScreen: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [tournamentsData, setTournamentsData] = useState<SportWithTournaments[]>([]);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(() => {
    try {
      const date = new Date();
      date.setFullYear(2025);
      date.setMonth(7);
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      return date;
    } catch (error) {
      console.warn('Error creating date, using current date:', error);
      return new Date();
    }
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [sportsData, tournamentsResponse] = await Promise.all([
        ApiService.fetchSportsList(),
        ApiService.fetchTournaments(),
      ]);
      

      
      console.log('📋 Fetched sports data:', sportsData);
      console.log('📋 Fetched tournaments data:', tournamentsResponse.data);
      
      setSports(sportsData);
      setTournamentsData(tournamentsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const filteredTournaments = useMemo(() => {
    let filtered: TournamentType[] = [];

    console.log('🔍 Filtering tournaments...');
    console.log('🔍 Selected sport:', selectedSport ? selectedSport.sport_name : 'ALL Sports');
    console.log('🔍 Total tournaments data:', tournamentsData.length, 'sports');

    if (selectedSport) {
      console.log('🔍 Looking for sport with ID:', selectedSport.sports_id);
      const sportData = tournamentsData.find(s => s.sports_id === selectedSport.sports_id);
      if (sportData) {
        console.log('🔍 Found sport data:', sportData.sport_name, 'with', sportData.tournaments.length, 'tournaments');
        filtered = sportData.tournaments.map(tournament => ({
          ...tournament,
          sport_name: sportData.sport_name
        }));
      } else {
        console.log('⚠️ No sport data found for selected sport ID:', selectedSport.sports_id);
      }
    } else {
      console.log('🔍 Showing all sports tournaments');
      filtered = tournamentsData.flatMap(s => 
        s.tournaments.map(tournament => ({
          ...tournament,
          sport_name: s.sport_name
        }))
      );
    }

    console.log('🔍 Tournaments after sport filter:', filtered.length);

    if (selectedDate) {
      console.log('🔍 Filtering by date:', selectedDate);
      console.log('📊 Tournaments before date filter:', filtered.length);
      filtered = filtered.filter(tournament => {
        const tournamentDate = getDateKey(tournament.start_date);
        const isMatch = tournamentDate === selectedDate;
        console.log(`🏆 ${tournament.name}: ${tournament.start_date} → ${tournamentDate} === ${selectedDate} → ${isMatch ? '✅ MATCH!' : '❌ No match'}`);
        return isMatch;
      });
      console.log('📊 Tournaments after date filter:', filtered.length);
    }
    return filtered;
  }, [selectedSport, selectedDate, tournamentsData]);

  const allTournamentDates = useMemo(() => {
    const dates: TournamentType[] = [];
    console.log('📅 Getting calendar dates for sport:', selectedSport ? selectedSport.sport_name : 'ALL Sports');
    
    if (selectedSport) {
      const sportData = tournamentsData.find(s => s.sports_id === selectedSport.sports_id);
      if (sportData) {
        console.log('📅 Found calendar dates for', sportData.sport_name, ':', sportData.tournaments.length, 'tournaments');
        dates.push(...sportData.tournaments.map(tournament => ({
          ...tournament,
          sport_name: sportData.sport_name
        })));
      }
    } else {
      console.log('📅 Getting all tournament dates for calendar');
      dates.push(...tournamentsData.flatMap(s => 
        s.tournaments.map(tournament => ({
          ...tournament,
          sport_name: s.sport_name
        }))
      ));
    }
    console.log('📅 Total dates for calendar:', dates.length);
    return dates;
  }, [selectedSport, tournamentsData]);

  const handleSportSelect = (sport: Sport | null) => {
    console.log('🏈 Sport selected:', sport ? sport.sport_name : 'ALL Sports');
    console.log('🏈 Sport ID:', sport ? sport.sports_id : 'null');
    setSelectedSport(sport);
    setSelectedDate('');
  };

  const handleDateSelect = (date: string) => {
    console.log('📅 Date selected:', date);
    console.log('📅 Current selected date:', selectedDate);
    const newSelectedDate = selectedDate === date ? '' : date;
    console.log('📅 Setting selected date to:', newSelectedDate);
    setSelectedDate(newSelectedDate);
  };

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => {
          console.log('🔍 Search bar tapped, opening modal');
          setFilterModalVisible(true);
        }}
        activeOpacity={0.7}
      >
        <Text style={selectedSport ? styles.searchTextSelected : styles.searchText}>
          {selectedSport ? selectedSport.sport_name : 'Search your sport'}
        </Text>
        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No tournaments found</Text>
      <Text style={styles.emptyStateSubtext}>
        {selectedDate ? `for ${formatDate(selectedDate)}` : 'for the selected criteria'}
      </Text>
    </View>
  );

  const renderTournamentItem = ({ item }: { item: TournamentType }) => (
    <TournamentCard tournament={item} />
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading tournaments...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {renderHeader()}
      
      <TournamentCalendar
        tournaments={allTournamentDates}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        currentMonth={currentMonth}
        onMonthChange={handleMonthChange}
      />
      
      <FlatList
        data={filteredTournaments}
        renderItem={renderTournamentItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.tournamentsList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FF6B35']}
            tintColor="#FF6B35"
          />
        }
        ListEmptyComponent={renderEmptyState}
      />
      
      <SportsFilter
        selectedSport={selectedSport}
        sports={sports}
        onSportSelect={handleSportSelect}
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 20,
    textAlign: 'left',
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '400',
    flex: 1,
  },
  searchTextSelected: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '400',
  },
  tournamentsList: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999999',
  },
});
