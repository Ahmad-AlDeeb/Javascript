class SearchView {
  _parentEl = document.querySelector('.search');

  // Get query user typed in search field
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  // Clear the search field (used for better UX)
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  // Add event listener on search button
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
