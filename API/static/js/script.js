//Function used to load dynamically and randomly values from testing set into flask app.
function dynamique() {
    //Ajax request to ce csv file
    $.ajax({
        type: "GET",
        url: "../static/js/data.csv",
        dataType: "text",
        async: false,
        }).done(successFunction);
    function successFunction(data) {
        var allRows = data.split(/\r?\n|\r/);
        let value = Math.floor(Math.random() * Math.floor(10000));
        var data = allRows[value].split(';');
        var wrapper = $("#hello");
        var count = 0;
        for(var i = 0; i < 90; i++){
            wrapper = $("#hello");
            if (i % 4 === 0) {
                count+=1
                $(wrapper).append('<div class="form-inline form-group" id=ligne'+count+'>')
            }
            var wrap = $("#ligne"+count)
            if(i<12) {
                $(wrap).append('<label>Avg'+(i+1)+'</label>')
                $(wrap).append('<input id="cell"type="number" step="0.000001" class="contactInput form-control" name="TimbreAvg'+(i+1)+'" value='+parseFloat(data[i+1]).toFixed(6)+'>&emsp;');
            }
            else {
                $(wrap).append('<label>Cov'+(i+1-12)+'</label>')
                $(wrap).append('<input id="cell"  type="number" step="0.000001" class="contactInput form-control" name="TimbreCovariance'+(i-11)+'" value='+parseFloat(data[i+1]).toFixed(6)+'>&emsp;');
            }   
        }
    }
}
window.onload = dynamique