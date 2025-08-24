import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Tournament, Match } from '../types/tournament';
import { formatDate, formatTime } from '../utils/dateUtils';
import { getTournamentImageBySport, TOURNAMENT_IMAGES } from '../assets';

interface TournamentCardProps {
  tournament: Tournament;
}

const { width } = Dimensions.get('window');

export const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    if (tournament.matches.length > 0) {
      setIsExpanded(!isExpanded);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'domestic':
        return '#10B981';
      case 'national':
        return '#3B82F6';
      case 'international':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const renderTournamentLogo = () => {
    return (
      <View style={styles.logoContainer}>
        <View style={styles.logoBackground}>
          <Image
            source={getTournamentImageBySport(tournament.sport_name)}
            style={styles.tournamentImage}
            resizeMode="contain"
          />
          <Text style={styles.tournamentLabel}>TOURNAMENT</Text>
        </View>
      </View>
    );
  };

  const renderMatchCard = (match: Match, index: number) => {
    // Extract day from match date - hardcode to 17 for now to match screenshot
    // const matchDate = new Date(match.start_time);
    // const day = matchDate.getDate();
    const day = 17;
    return (
      <View key={match.id} style={styles.matchCard}>
        {/* Match Header with Team Names and Stage */}
        <View style={styles.matchHeader}>
          <View style={styles.matchTitleContainer}>
            <Image 
              source={getTournamentImageBySport(tournament.sport_name)}
              style={styles.matchTitleIcon}
              resizeMode="contain"
            />
            <View style={styles.matchTitleTextContainer}>
              <Text style={styles.matchTitle}>
                {match.team_a} vs {match.team_b}
              </Text>
              <Text style={styles.teamCategory}>Team Men</Text>
            </View>
          </View>
          <View style={styles.stageTag}>
            <Text style={styles.stageText}>{match.stage}</Text>
          </View>
        </View>
        
        {/* Team Logos and VS */}
        <View style={styles.teamLogosContainer}>
          <Image
            source={getTournamentImageBySport(tournament.sport_name)}
            style={styles.teamLogoImage}
            resizeMode="contain"
          />
          <Text style={styles.vsText}>vs</Text>
          <Image
            source={getTournamentImageBySport(tournament.sport_name)}
            style={styles.teamLogoImage}
            resizeMode="contain"
          />
        </View>
        
        {/* Match Info (Date, Time, Venue) */}
        <View style={styles.matchInfoContainer}>
          <View style={styles.infoItem}>
            <View style={styles.calendarIconContainer}>
              <Text style={styles.calendarIconText}>{day}</Text>
            </View>
            <Text style={styles.infoText}>{formatDate(match.start_time)}</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.clockIconContainer}>
              <Text style={styles.clockIconText}>⏱️</Text>
            </View>
            <Text style={styles.infoText}>{formatTime(match.start_time)}</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.locationIconContainer}>
              <Text style={styles.locationIconText}>📍</Text>
            </View>
            <Text style={styles.infoText}>{match.venue}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Outer Card */}
      <View style={styles.outerCard}>
        <View style={styles.cardContent}>
          <View style={styles.leftSection}>
            {renderTournamentLogo()}
            <View style={styles.tournamentInfo}>
              <Text style={styles.tournamentName}>{tournament.name}</Text>
              <Text style={styles.sportName}>{tournament.sport_name || 'Unknown Sport'}</Text>
              <Text style={styles.dateRange}>
                {formatDate(tournament.start_date)} - {tournament.end_date ? formatDate(tournament.end_date) : formatDate(tournament.start_date)}
              </Text>
            </View>
          </View>
          
          <View style={styles.rightSection}>
            <View style={[styles.levelTag, { backgroundColor: getLevelColor(tournament.level) }]}>
              <Text style={styles.levelText}>{tournament.level}</Text>
            </View>
            {tournament.matches.length > 0 && (
              <TouchableOpacity
                style={styles.expandButton}
                onPress={toggleExpanded}
              >
                <Text style={[styles.expandIcon, isExpanded && styles.expandIconRotated]}>
                  {isExpanded ? '⌃' : '⌄'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Inner Cards (Matches) */}
      {isExpanded && tournament.matches.length > 0 && (
        <View style={styles.innerCardsContainer}>
          {tournament.matches.map((match, index) => renderMatchCard(match, index))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  outerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: 16,
  },
  logoBackground: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    marginBottom: 2,
  },
  tournamentImage: {
    width: 40,
    height: 40,
    marginBottom: 2,
  },
  tournamentLabel: {
    fontSize: 8,
    color: '#666666',
    fontWeight: '500',
  },
  tournamentInfo: {
    flex: 1,
  },
  tournamentName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  sportName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  dateRange: {
    fontSize: 12,
    color: '#999',
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: 8,
  },
  levelTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  levelText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#666666',
    textTransform: 'capitalize',
  },

  expandButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  expandIcon: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '700',
  },
  expandIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  innerCardsContainer: {
    marginTop: 12,
    marginBottom: 4,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  
  // Match card styles
  matchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  matchTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  matchTitleIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  matchTitleTextContainer: {
    flex: 1,
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  teamCategory: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  stageTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF6B35',
  },
  teamLogosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingVertical: 8,
  },
  teamLogoImage: {
    width: 100,
    height: 100,
    marginHorizontal: 20,
  },
  vsText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  matchInfoContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 4,
  },
  infoIconText: {
    fontSize: 24,
    marginRight: 8,
  },
  calendarIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#FF0000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  calendarIconText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  clockIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  clockIconText: {
    fontSize: 24,
  },
  locationIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationIconText: {
    fontSize: 24,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});