import * as XLSX from "xlsx";
import XMLParser from 'react-xml-parser'

const processXlsSbom = (file) => {
    let scanComponents = [];
    // alert("processing  xls")
    const reader = new FileReader();

    reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        var json = XLSX.utils.sheet_to_json(ws);
        console.log(JSON.stringify(json))


        scanComponents = json.map((component) => {
            return {


                component: component.ComponentName,
                version: component.ComponentVersion,

            }
        });
        //console.log(JSON.stringify(scanComponents));
        return scanComponents;

    };
    reader.readAsBinaryString(file);



}


const processJsonSbom = (file) => {

    const reader = new FileReader();

    reader.readAsText(file);


    reader.onload = evt => {
        const readerData = evt.target.result;

        const parser = new DOMParser();
        const jsonData = parser.parseFromString(readerData, "text/html");

        console.log(JSON.stringify(jsonData));
    }
}

const processXmlSbom = (file) => {
    //alert("processing  xml")
    const reader = new FileReader();

    reader.readAsText(file);


    reader.onload = evt => {
        const readerData = evt.target.result;

        const parser = new DOMParser();
        const xml = parser.parseFromString(readerData, "text/xml");
        /*
         console.log(
             "data",
             new XMLSerializer().serializeToString(xml.documentElement)
         );
         */
        // var XMLParser = require("react-xml-parser");
        var objectXml = new XMLParser().parseFromString(
            new XMLSerializer().serializeToString(xml.documentElement)
        );

        //console.log("XML Object", JSON.stringify(objectXml));

        const pomDependencies = objectXml.getElementsByTagName("dependencies");

        console.log("Dependencies " + JSON.stringify(pomDependencies[0]));

        const scanComponent = pomDependencies[0].children.map((dependency) => {


            return {

                "component": dependency.children[1].value,
                "version": dependency.children[2].value


            }





        });
        console.log(" scanComponents from pom.xml " + JSON.stringify(scanComponent))
    }


}



export default { processJsonSbom, processXlsSbom, processXmlSbom }