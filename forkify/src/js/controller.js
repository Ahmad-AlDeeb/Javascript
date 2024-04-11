// Node packages
import 'core-js/stable';
import 'regenerator-runtime';
// My files
import { MODAL_CLOSE_SEC } from './config';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

// ???
// if (module.hot) module.hot.accept();

////////////////////////// Control loading the recipe //////////////////////////
const controlRecipe = async () => {
  try {
    // Get recipe id from URL
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // Load recipe data into state object
    await model.loadRecipe(id);

    // Render recipe from state object in model
    recipeView.render(model.state.recipe);

    // Update (results view & bookmarks) --> to mark selected
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    //
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

//////////////////////// Control loading search results ////////////////////////
const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results into state object
    await model.loadSearchResults(query);

    // Render results
    resultsView.render(model.getSearchResultsPage(1));

    // Render pagination buttons
    paginationView.render(model.state.search);

    //
  } catch (err) {
    console.log(err);
  }
};

//////////////////////// Control loading next/prev pages ////////////////////////
const controlPagination = goToPage => {
  // Render results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // Render pagination buttons
  paginationView.render(model.state.search);
};

//////////////////////// Control loading next/prev pages ////////////////////////
const controlServings = servings => {
  // Update recipe servings (in state object)
  model.updateServings(servings);

  // Update recipe view
  recipeView.update(model.state.recipe);
};

//////////////////////// Control bookmarking recipes ////////////////////////
const controlAddBookmark = () => {
  // Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};
///////////////////////// Control adding new recipe /////////////////////////
const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe & bookmark view (to show the new recipe)
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Show success message
    addRecipeView.renderMessage();

    // Close form after few seconds so that success message appear
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

    //
  } catch (err) {
    console.error(err, '💥💥');
    addRecipeView.renderError(err.message);
  }
};

////////////////// Initialization (e.g., adding event listeners) //////////////////
const init = () => {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);

  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);

  bookmarksView.addHandlerRender(controlBookmarks);

  addRecipeView.addHandlerUpload(controlAddRecipe);

  console.log('Welcome!');
};
init();
