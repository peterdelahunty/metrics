define(function(){
    return {
        record: function(name,event){
            console.log(name + " : " + JSON.stringify(event));
            if(typeof(Keen) !== 'undefined'){
                Keen.addEvent(name,event);
            }
        }
    }
});