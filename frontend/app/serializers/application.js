import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    let normalizedDocument = this._super(...arguments);
    normalizedDocument.meta = {total_pages: normalizedDocument.meta['total-pages']}
    return normalizedDocument;
  },
});
