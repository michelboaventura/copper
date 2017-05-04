import Ember from 'ember';
import config from '../../config/environment';

const { $:{ajax} } = Ember;

export default Ember.Component.extend({
  classNames: ['execute-bar'],
  actions: {
    play(){
      let workflow = this.get('workflow');
      ajax({
        url:`${config.mj_data_explorer}/jobs`,
        type: 'POST',
        data: { job: JSON.stringify(workflow) }
      });
    },
    pause(){},
    stop(){},
  },
});
