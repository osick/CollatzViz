w=new Chart($("_chart").getContext("2d"))
window.onload= function(){compute(false)}

function compute(random){
    datasets=[]
    if (random) $("nummer").value=Math.round(Math.random() * 1000000000000)
    numarray = getCollSequence(parseInt($("nummer").value))
    if (numarray.length==0) return
    for (var i=0;i<numarray.length;i++){numarray[i].y=getVal(numarray[i].y)}
    datasets.push({data: numarray, showLabel:false , borderWidth:1, pointBackgroundColor:"#ffffff", pointRadius:2, showLine: true, fill:false, borderColor: "#800000"})    
    string=""; for (i=0;i<numarray.length;i++){if (numarray[i].d) string+="<span class='loop'>";string+=numarray[i].y+(i<numarray.length-1?", ":"")}
    $("collatz").innerHTML="<h3>"+" Collatz sequence with initial value "+parseInt($("nummer").value)+": "+ numarray.length+" steps</h3>"+ "<p><b>Sequence:</b> " + string+"</span></p>"
    w.destroy()
    w=new Chart($("_chart").getContext("2d"),{type: 'scatter', options: {legend: {display: false}, responsive: false, title: {display: false,text:"Collatz sequence with start value "+datasets[0]["data"][0].y }, scales: {xAxes: [{display: true,}], yAxes: [{display: true,}]}},data: {datasets: datasets }})
}

function getCollSequence(n){
    if (Number.isNaN(n) || n.length >12 ) return [];
    numarray=[];     
    numarray.push({x:numarray.length,y:n,d:false})
    result=0;
    _break=false
    while (numarray.length<1000){
        if(n%2==0){n=n/2} else{n=3*n+1}
        for (var i=0;i<numarray.length;i++){if(numarray[i].y==n){numarray[i].d=true; _break=true; break}}
        numarray.push({x:numarray.length,y:n,d:false})
        if (_break) break
    }
    return numarray
}

function getVal(n){
    switch (document.forms.myForm._type.value){
        case "log": return Math.round(Math.log10(n)*1000)/1000
        case "val": return n
        default:    return 1
    }
}

function $(id){return document.getElementById(id)}