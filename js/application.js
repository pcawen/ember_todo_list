//window.Todos = Ember.Application.create();
window.Todos = Ember.Application.create({
	LOG_TRANSITIONS: true
});

Todos.Store = DS.Store.extend({
  revision: 11,
  /*headers: {
    "API_KEY": "secret key",
    "ANOTHER_HEADER": "Some header value"
  }*/
});

//Todos.ApplicationAdapter = DS.FixtureAdapter.extend();
Todos.ApplicationAdapter = DS.RESTAdapter.reopen({
	host: 'http://localhost:3000'
});
