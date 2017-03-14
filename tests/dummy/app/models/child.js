import DS from 'ember-data';
import ChangedRelationships from 'ember-changed-relationships';

const {
  Model,
  belongsTo
} = DS;

export default Model.extend(
  ChangedRelationships, {

  parent: belongsTo()
});
