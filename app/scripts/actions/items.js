var AppDispatcher = require('../dispatchers/app');

var ItemsAction = {
  getAll: function(items) {
    AppDispatcher.handleServerAction({
      type: 'RECEIVE_ITEMS',
      items: items
    });
  }
};

export default ItemsAction;