const getBoards = state => state.dashboard.boards;
const getCurrentBoard = state => state.dashboard.currentBoard;
const getCurrentItem = state => state.dashboard.currentItem;
const isLoading = state => state.dashboard.loadingBoard;

export default {
  getBoards,
  getCurrentBoard,
  getCurrentItem,
  isLoading
}