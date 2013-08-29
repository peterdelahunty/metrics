define(function(){
    return {
        record: function(name,event){
            if(console){
                console.log(name + " : " + JSON.stringify(event));
            }
            if(typeof(Keen) !== 'undefined'){
                Keen.addEvent(name,event);
            }
        }
    }
});