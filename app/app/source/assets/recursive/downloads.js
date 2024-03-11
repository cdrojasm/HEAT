/* 
Name: downloads
Action: download files with different formats
*/

import { jsPDF } from "jspdf";
import ExportJsonExcel from 'js-export-excel';
import domtoimage from 'dom-to-image';

export const downloadImage = (id, title) => {
    var node = document.getElementById("contentPanel_" + id);
    domtoimage.toJpeg(node)
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = title != undefined ? title + '.png' : 'my-image-name.jpeg';
            link.href = dataUrl;
            link.click();
        });
};

export const downloadPDF = (id, title) => {
    let node = document.getElementById("contentPanel_" + id);
    domtoimage.toJpeg(node, { bgcolor: "#F7F7F7" })
        .then(function (dataUrl) {
            let image = new Image()
            image.src = dataUrl
            image.onload = () => {
                const height = image.height > 700 ? image.height + 100 : 800
                const pdf = new jsPDF("l", "px", [image.width + 100, height]);
                let fileTitle = title != undefined ? title + ".pdf" : "data.pdf"
                pdf.addImage(image, 'PNG', 0, 0, image.width, image.height)
                pdf.save(fileTitle)
            }
        })
};

export const downloadCSV = (title, InfoCSV, chartFields) => {
    let ReactJsonCsv = require('react-json-csv');
    const { saveAsCsv } = ReactJsonCsv.useJsonToCsv();
    if (InfoCSV != undefined) {
        const filename = title != undefined ? title.toUpperCase() : 'data';
        let ArrFields = chartFields;
        /*
        if (!ArrFields.includes("TOTAL")) {
            ArrFields.push("TOTAL")
        }
        */
        let fields = {};
        for (let i in ArrFields) {
            fields[ArrFields[i]] = ArrFields[i];
        }
        let paramsObj = (tdat, tfield, tfilename) => {
            let obj = {};
            obj['data'] = tdat;
            obj['fields'] = tfield;
            obj['filename'] = tfilename;
            return obj;
        }
        saveAsCsv(paramsObj(InfoCSV, fields, filename));
    }
};

export const downloadExcel = (title, InfoCSV, chartFields) => {
    if (InfoCSV != undefined) {
        const filename = title != undefined ? title.toUpperCase() : 'data';
        let ArrFields = chartFields;
        /*
        if (!ArrFields.includes("TOTAL")) {
            ArrFields.push("TOTAL")
        }
        */
        let option = {};
        option.fileName = filename
        option.datas = [
            {
                sheetData: InfoCSV,
                sheetName: filename.length < 31 ? filename : filename.substring(0, 25) + "...",
                sheetFilter: ArrFields,
                sheetHeader: ArrFields,
            }
        ];
        let toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }
};

export const downloadJSON = (title, InfoCSV) => {
    if (InfoCSV != undefined) {
        const filename = title != undefined ? title.toUpperCase() : 'data';
        let dataStr = JSON.stringify(InfoCSV, null, "\t");
        let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        let exportFileDefaultName = filename + '.json';
        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
};

export const downloadXML = (title, InfoCSV, chartFields) => {
    if (InfoCSV != undefined) {
        const filename = title != undefined ? title.toUpperCase() : 'data';
        let ArrFields = chartFields;
        /*
        if (!ArrFields.includes("TOTAL")) {
            ArrFields.push("TOTAL")
        }
        */
        let concatXML = '';
        for (let i = 0; i < InfoCSV.length; i++) {
            concatXML = concatXML + '\t<register>\n';
            let concatRe = '';
            ArrFields.map((field) => {
                concatRe = concatRe + '\t\t<' + field + '>' + InfoCSV[i][field] + '</' + field + '>\n'
            });
            concatXML = concatXML + concatRe + '\t<register>\n'
        }
        let dataXML = '<data>\n' + concatXML + '</data>';
        let dataUri = 'data:application/xml;charset=utf-8,' + encodeURIComponent(dataXML);
        let exportFileDefaultName = filename + '.xml';
        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
};