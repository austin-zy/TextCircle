this.Documents = new Mongo.Collection("documents");


if (Meteor.isClient) {

  //Update the session current_date every 1000ms    
  Meteor.setInterval(function(){
      Session.set("current_date",new Date());
  },1000);
    
  Template.date_display.helpers({
      current_date: function(){
          return Session.get("current_date")
      }
  });   
  
    
  Template.editor.helpers({
      docid:function(){
          
          var doc = Documents.findOne();
          if (doc){
              return doc._id;
          }
          else{
              return undefined;
          }
      },
      config:function(){
        return function(editor){
            editor.on("change", function(cm_editor, info){
                console.log(cm_editor.getValue());
                $("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
            });
            }
        },
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
      if (!Documents.findOne()){
          Documents.insert({title:"My new documents"});
      }
  });
}
