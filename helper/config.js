const BEGINNER_MODE = 0;
const INTERMEDIATE_MODE = 1;
const EXPERT_MODE = 2;
const CUSTOM_MODE = 3;
const BEGINNER = 'beginner';
const INTERMEDIATE = 'intermediate';
const EXPERT = 'expert';
const modeToNumMap = {};
modeToNumMap[BEGINNER] = BEGINNER_MODE;
modeToNumMap[INTERMEDIATE] = INTERMEDIATE_MODE;
modeToNumMap[EXPERT] = EXPERT_MODE;
const HELP_TITLES = [
   'Gameplay',
   'Patterns',
   'Trophies',
   'Arena',
   'Gems',
   'Equipment',
   'Events',
   'Achievements',
   'Ranks',
   'Guides',
   'Website rules',
]

/**
 * Return mode index in config file
 * @param {string} mode 
 * @returns {number}
 */
function getNumMode(mode) {
   return modeToNumMap[mode];
}

module.exports = {
   BEGINNER,
   INTERMEDIATE,
   EXPERT,
   BEGINNER_MODE,
   INTERMEDIATE_MODE,
   EXPERT_MODE,
   CUSTOM_MODE,
   HELP_TITLES,
   getNumMode
};