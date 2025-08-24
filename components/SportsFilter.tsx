import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { Sport } from '../types/tournament';

interface SportsFilterProps {
  selectedSport: Sport | null;
  sports: Sport[];
  onSportSelect: (sport: Sport | null) => void;
  visible: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

export const SportsFilter: React.FC<SportsFilterProps> = ({
  selectedSport,
  sports,
  onSportSelect,
  visible,
  onClose,
}) => {
  console.log('🏈 SportsFilter rendered - visible:', visible, 'sports count:', sports.length);
  const handleSportSelect = (sport: Sport | null) => {
    console.log('🏈 Sport selected in modal:', sport ? sport.sport_name : 'ALL Sports');
    onSportSelect(sport);
    onClose();
  };

  const renderSportItem = ({ item }: { item: Sport }) => {
    if (!item || !item.sports_id || !item.sport_name) {
      return null;
    }
    
    return (
      <TouchableOpacity
        style={[
          styles.sportItem,
          selectedSport?.sports_id === item.sports_id && styles.selectedSportItem,
        ]}
        onPress={() => handleSportSelect(item)}
      >
        <Text
          style={[
            styles.sportText,
            selectedSport?.sports_id === item.sports_id && styles.selectedSportText,
          ]}
        >
          {item.sport_name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
        <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Select Sport</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={[
              styles.sportItem,
              !selectedSport && styles.selectedSportItem,
            ]}
            onPress={() => handleSportSelect(null)}
          >
            <Text
              style={[
                styles.sportText,
                !selectedSport && styles.selectedSportText,
              ]}
            >
              ALL Sports
            </Text>
          </TouchableOpacity>
          
          <FlatList
            data={sports || []}
            renderItem={renderSportItem}
            keyExtractor={(item) => item?.sports_id?.toString() || Math.random().toString()}
            showsVerticalScrollIndicator={false}
            style={styles.sportsList}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 120,
    paddingHorizontal: 16,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 0,
    width: '100%',
    maxWidth: 400,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  sportsList: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  sportItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 0,
    marginVertical: 0,
    borderRadius: 0,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  selectedSportItem: {
    backgroundColor: '#FFF7ED',
    borderBottomColor: '#FF6B35',
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B35',
  },
  sportText: {
    fontSize: 16,
    color: '#1F2937',
    textAlign: 'left',
    textTransform: 'capitalize',
    fontWeight: '400',
  },
  selectedSportText: {
    color: '#FF6B35',
    fontWeight: '600',
  },
});
