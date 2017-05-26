import DS from 'ember-data';
import moment from 'npm:moment/min/moment-with-locales';

export default DS.Transform.extend({

  deserialize(serialized) {
    if(serialized){
      var dateFinal =  moment(serialized).format();
      return dateFinal;
    } else { return null; }
  },

  serialize(deserialized) {
    return deserialized;
  }
});
