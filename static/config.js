const BEGINNER_MODE = 0;
const INTERMEDIATE_MODE = 1;
const EXPERT_MODE = 2;
const CUSTOM_MODE = 3;
const normalModeConfig = [
   {
      height: 9,
      width: 9,
      mines: 10
   },
   {
      height: 16,
      width: 16,
      mines: 40
   },
   {
      height: 16,
      width: 30,
      mines: 99
   }
];

const sizeConfig = [24, 26, 26];

/**
 * 
 * @param {number} gameMode 
 * @returns {string}
 */
function getCellSize(gameMode) {
   if (gameMode < 0) return 0;
   return "size" + sizeConfig[gameMode];
}

function getHeightFromMode(gameMode) {
   if (gameMode < 0) return 0;
   return normalModeConfig[gameMode].height;
}

function getMinesFromMode(gameMode) {
   if (gameMode < 0) return 0;
   return normalModeConfig[gameMode].mines;
}

function getWidthFromMode(gameMode) {
   if (gameMode < 0) return 0;
   return normalModeConfig[gameMode].width;
}

module.exports = {
   getCellSize,
   getHeightFromMode,
   getMinesFromMode,
   getWidthFromMode
};