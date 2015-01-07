define([
    'backbone',
    
    'router/ApplicationRouter',
    
    'models/SessionModel',

    'views/abstract/AbstractView',
    
    'modules/UnityModule',

], function(
    Backbone,
    ApplicationRouter,
    SessionModel,
    AbstractView,
    UnityModule
){
    var ApplicationView=AbstractView.extend({

        router: null,

        unity: null,

        session: null,

        initialize: function(){
            this.cid='application_view';

            AbstractView.prototype.initialize.call(this);

            this.render();
        },

        render: function(){
            this.router=new ApplicationRouter({ view: this });

            Backbone.history.start({ pushState: false });

            this.unity=new UnityModule();

            log('render');
            window.application=this;
        },

        createSession: function(){
            var that=this;

            this.session=new SessionModel();
            this.session.fetch({
                success: function(m){
                    that.unity.send({
                        receiver: 'GameController',
                        callFunction: 'setSession',
                        sendString: JSON.stringify(m.toJSON())
                    });
                },
                error: function(){
                    console.log("SESSION CREATE ERROR");
                }
            });

            /*this.session.save(null,{
                success: function(m,r,o){
                    that.unity.send({
                        receiver: 'GameController',
                        callFunction: 'setSession',
                        sendString: JSON.stringify(that.session.toJSON())
                    });
                },
                error: function(m,x,o){

                }
            });*/
        },

        setSessionMute: function(mute){
            var muted=false;
            if(mute === 'True'){
                muted=true;
            }

            this.session.save({ muted: muted }, {
                success: function(m){
                    console.log(m);
                }
            });
        }

    });

    return ApplicationView;
});
