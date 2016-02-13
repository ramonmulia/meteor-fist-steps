ProteinData = new Meteor.Collection('protein_data');
History = new Meteor.Collection('history');

if (Meteor.isClient) {

Meteor.subscribe('allProteinData');
Meteor.subscribe('allHistory');

  Template.userDetails.helpers({
    user: function() {
      return ProteinData.findOne();
    }
  });

  Template.history.helpers({
    historyItem: function() {
      return History.find({}, {
        sort: {
          date: -1
        },
        limit: 5
      }).fetch();
    }
  });

  Template.userDetails.events({
    'click #addAmount': function(e) {
      e.preventDefault();

      var amount = parseInt($('#amount').val());

      ProteinData.update({_id: "uf59mgH9fapWsH7HR"}, {
        $inc: {
          total: amount,
          goal: -amount
        }
      });

      console.log(ProteinData.find().fetch());

      History.insert({
        value: amount,
        date: new Date().toTimeString(),
        userId: this._id
      });
    }
  });
}

if (Meteor.isServer) {

  Meteor.publish('allProteinData', function(){
    return ProteinData.find();
  });

  Meteor.publish('allHistory', function(){
    return History.find();
  });

  Meteor.startup(function() {

  });
}
