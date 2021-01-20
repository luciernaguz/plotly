//function init load the names id´s
function init(){

        var selectids =d3.select("#selDataset");
    
        d3.json("data/samples.json").then((importedData) => {
            var data = importedData;
            console.log(data);
            data.names.forEach(d=>{
                selectids
                    .append("option")
                    .text(d)
                    .property("value",d);
            });           
        })
        let id=d3.select("#selDataset").property("value")
        optionChanged(id)
}
//function OptionChanged from the Html
function optionChanged(id){
        //console.log(id);
        BuildCharts(id);//Call Fuction
        FillPanel(id);
        
}
function BuildCharts(id){
    //console.log(id);
    d3.json("data/samples.json").then((Data) => {
            //samples
            let GetInfo=Data.samples;
            let Info=GetInfo.filter(FoundId=>FoundId.id == id);
            let Result= Info[0];
            console.log(Result);
            
            // top 10 values
            //let samplevalues=Object.values(result.sample_values).slice(0,10);
            let samplevalues=Object.values(Result.sample_values)
            console.log(samplevalues);
            let otuids=Object.values(Result.otu_ids);
            console.log(otuids);
            let otulabels=Object.values(Result.otu_labels);
            console.log(otulabels);

             /*
             Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
            Use sample_values as the values for the bar chart.
            Use otu_ids as the labels for the bar chart.
            Use otu_labels as the hovertext for the chart.
            */
            //Bar Chart Values
            //slice here to use same values  above for bubble chart           
            var trace1= {
                y: otuids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
                x: samplevalues.slice(0,10).reverse(),
                text: otulabels.slice(0,10).reverse(),
                name: "Bacteria",
                type: "bar",
                orientation: "h",
              }

            var BarData=[trace1];

            var BarLayout = {
                title: "Top 10 Bacterias",
                margin: { 
                    l: 150,
                    r: 50,
                    t: 30,
                    b: 50
                }
            };
            //Plot Bar Chart
            Plotly.newPlot("bar", BarData, BarLayout);
            
            /*
            Create a bubble chart that displays each sample.
            Use otu_ids for the x values.
            Use sample_values for the y values.
            Use sample_values for the marker size.
            Use otu_ids for the marker colors.
            Use otu_labels for the text values.
            */

             // Build a Bubble Chart using the sample data ****check
            //var trace2;
            var trace2 = 
            {
                x: otuids,
                y: samplevalues,
                text: otulabels,
                mode: "markers",
                marker: {
                    color: otuids,
                    size: samplevalues
                    }
            };
            var BubbleData=[trace2];

            var BubbleLayout = {
                title: "Otu ID",
                showlegend: false,
                height: 600,
                width: 1200                
            };
            //Plot Bubblr Chart
            Plotly.newPlot("bubble", BubbleData, BubbleLayout);            
    });   
     
} 

    //Function for  complete Html Panel sample-metadata
function FillPanel(id) {
    console.log(id);
    d3.json("data/samples.json").then((Data) => {
            //metadata json
            //let id=d3.select("#selDataset");
            let LookInfo=Data.metadata;
            let FilterInfo=LookInfo.filter(LookId=>LookId.id == id);
            let Results=FilterInfo[0];
              /*
            Display the sample metadata, i.e., an individual's demographic information.
            Display each key-value pair from the metadata JSON object somewhere on the page.
            */
            //Demography info 
            let Panel=d3.select("#sample-metadata");
            Panel.html(""); //clean panel
            Object.entries(Results).forEach(function([key,value]){
                Panel.append("h6").text(`${key},${value}`);                
            });
           

        });
    }

init()//init Function 
    
      


