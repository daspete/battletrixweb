define([
    'backbone',
    'TweenMax',
    'unity'
], function(
    Backbone,
    TweenMax,
    Unity
){
    function UnityModule(settings){

        var defaults={
            container: '.gameWrapper',
            gameClass: 'game',
            game: 'game/game.unity3d',
            width: 800,
            height: 800/16*9,
            params: {
                enableDebugging: true,
                disableContextMenu: true
            }
        };

        var unity_module={

            settings: {},

            DOM: {},

            unity: null,

            init: function(settings, defaults){
                _.bindAll.apply(_, [this].concat(_.functions(this)));

                $.extend(this.settings, defaults, settings);

                this.setup();
            },

            setup: function(){
                var that=this;

                this.DOM.$container=$(this.settings.container);

                var game=$('<div>');
                game.addClass(this.settings.gameClass);

                this.DOM.$container.append(game);
                this.DOM.$game=$('.'+this.settings.gameClass);


                this.unity=new Unity({
                    width: this.settings.width,
                    height: this.settings.height,
                    params: this.settings.params
                });

                this.unity.observeProgress(function(progress){
                    var status=progress.pluginStatus;

                    if(status === 'broken'){
                        that.onPluginBroken();
                    }

                    if(status === 'missing'){
                        that.onPluginMissing();
                    }

                    if(status === 'installed'){
                        that.onPluginInstalled();
                    }

                    if(status === 'first'){
                        that.onGameLoaded();
                    }
                });

                this.unity.initPlugin(this.DOM.$game, this.settings.game);
            },

            onPluginBroken: function(){
                this.unity.installPlugin();
            },

            onPluginMissing: function(){
                this.unity.installPlugin();
            },

            onPluginInstalled: function(){
                console.log("plugin installed");
            },

            onGameLoaded: function(){
                console.log("game loaded");
            },

            send: function(params){
                this.unity.getUnity().SendMessage(params.receiver, params.callFunction, params.sendString);
            }



        };

        if(typeof settings === 'undefined'){
            settings=defaults;
        }

        unity_module.init(settings, defaults);

        return unity_module;
    }

    return UnityModule;
});
