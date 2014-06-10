//window.Todos = Ember.Application.create();
window.Todos = Ember.Application.create({
	LOG_TRANSITIONS: true
});

Todos.Store = DS.Store.extend({
  revision: 11,
  //url: "http://www.example.com"
});

//Todos.ApplicationAdapter = DS.FixtureAdapter.extend();
Todos.ApplicationAdapter = DS.RESTAdapter.reopen({
	host: 'http://localhost:3000'
});

/*App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'https://otherhost.com',
  ajax: function(url, method, hash) {
    hash.crossDomain = true;
    hash.xhrFields = {withCredentials: true};
    return this._super(url, method, hash);
  }
});*/