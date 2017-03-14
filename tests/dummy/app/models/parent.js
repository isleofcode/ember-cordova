import DS from 'ember-data';
import ChangedRelationships from 'ember-changed-relationships';

const {
  Model,
  hasMany
} = DS;

export default Model.extend(
  ChangedRelationships, {

  children: hasMany('child', { async: false })
});
