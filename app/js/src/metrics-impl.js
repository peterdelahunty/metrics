define(function(){
    return {
        record: function(name,event){
            console.log(JSON.stringify(event));
            if(typeof(Keen) !== 'undefined'){
                Keen.addEvent(name,event);
            }
        }
    }
});