import Ember from 'ember';

const {
  assert,
  on
  } = Ember;

export default function subscribe(path, method) {
  let [service, event, err] = path.split('.');
  let _listener = null;

  assert(`'subscribe()' expects a path with exactly one leaf, given ${path}`, event && service && !err);

  let computedFn = function() {
    if (!this.get(service) || _listener) {
      return;
    }

    // ensure teardown
    let _super = this.get('willDestroy');
    this.set('willDestroy', function() {
      this.get(service).off(event, _listener);
      _listener = null;
      computedFn = null;
      _super();
    });

    // proxy the event
    _listener = (e) => {
      method.call(this, e);
    };

    // subscribe to the event
    this.get(service).on(event, _listener);
  };

  return on.call(this, 'init', computedFn);
}
