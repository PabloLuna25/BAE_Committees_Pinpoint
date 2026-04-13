/**
 * All the parse logic goes here
 * From excel to json, so its clean for the browser and the json data is generated dynamically from the excel
 */
import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";

// File paths
const inputPath = path.resolve("../BAE_Comites_Pinpoint/data/raw/BAE Cantón Esparza.xlsx");
const outputPath = path.resolve("./data/locations.json");

// Main function
async function convertExcelToJSON() {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(inputPath);

    const sheet = workbook.worksheets[0];

    // Get headers (first row)
    const headers = [];
    sheet.getRow(1).eachCell((cell, colNumber) => {
      headers[colNumber] = cell.value?.toString().trim();
    });

    const data = [];

    // Iterate rows
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // skip header

      const rowData = {};

      row.eachCell((cell, colNumber) => {
        const header = headers[colNumber];
        const value = cell.value?.toString().trim();

        switch (header) {
          case "CANTÓN":
            rowData.canton = value;
            break;
          case "DISTRITO":
            rowData.distrito = value;
            break;
          case "NOMBRE COMITÉ":
            rowData.nombre = value;
            break;
          case "CATEGORÍA":
            rowData.categoria = value;
            break;
        }
      });

      // Skip empty rows
      if (!rowData.nombre) return;

      // Final object
      data.push({
        provincia: "Puntarenas", // your file is only Esparza
        ...rowData
      });
    });

    // Save JSON
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");

    console.log("✅ Excel converted successfully!");
    console.log(`📁 Output file: ${outputPath}`);
    console.log(`📊 Records: ${data.length}`);
  } catch (error) {
    console.error("❌ Error converting Excel:", error.message);
  }
}

// Execute
convertExcelToJSON();