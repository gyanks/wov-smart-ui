/*var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('../../assests/canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;*/


import { CanvasJSChart } from "canvasjs-react-charts";

const ProjectComponentChart = (props) => {
   
    
/*
    let sum = 0;
    for (let result of props.scanReport) {

        sum = sum + parseInt(result.cves.cveCount);
    }

    console.log(" sum of cves " + sum)
    */

    const chartData = props.projects.data.map((project) => {

        return {
            "name": project.projectName,
            "label": project.projectName,

           // "y": Math.round(parseInt(scan.cves.cveCount) / sum * 100)
           "y": project.components.length
        }

    });

    console.log(" chart data " + JSON.stringify(chartData));

    const options = {
        animationEnabled: true,
        title: {
            text: "Components by Project"
        },

        data: [{
            type: "column",
            showInLegend: true,
            indexLabel: "Components : {y}",
            yValueFormatString: "#",
            dataPoints: chartData
        }]
    }
    return (
       
            <CanvasJSChart options={options}

            />
          
    );
}


export default ProjectComponentChart ;