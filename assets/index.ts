// Centralized image exports
// Tournament images
export const TOURNAMENT_IMAGES = {
  FOOTBALL: require('./Tournament-1.png'),
  CRICKET: require('./Tournament-2.png'),
  BADMINTON: require('./badmintion.png'),
  TABLE_TENNIS: require('./Tournamment-4.png'),
};

// App images
export const APP_IMAGES = {
  ADAPTIVE_ICON: require('./adaptive-icon.png'),
  FAVICON: require('./favicon.png'),
  ICON: require('./icon.png'),
  SPLASH_ICON: require('./splash-icon.png'),
};

// We're using emoji icons directly in the components
// No need for icon image files

// Helper function to get tournament image by sport name
export const getTournamentImageBySport = (sportName?: string) => {
  if (!sportName) return TOURNAMENT_IMAGES.FOOTBALL;
  
  const sport = sportName.toLowerCase();
  switch (sport) {
    case 'football':
      return TOURNAMENT_IMAGES.FOOTBALL;
    case 'cricket':
      return TOURNAMENT_IMAGES.CRICKET;
    case 'badminton':
      return TOURNAMENT_IMAGES.BADMINTON;
    case 'table tennis':
      return TOURNAMENT_IMAGES.TABLE_TENNIS;
    default:
      return TOURNAMENT_IMAGES.FOOTBALL;
  }
};