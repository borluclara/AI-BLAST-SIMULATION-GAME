import React, { useState } from "react";
import Papa from "papaparse";

const REQUIRED_HEADERS = [
  "x",
  "y",
  "material",
  "type",
  "density_g_cm3",
  "hardness_mohs",
  "game_value",
  "blast_hole",
];

export default function UploadCSV() {
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file extension
    if (!file.name.endsWith(".csv")) {
      setError("❌ Wrong file format. Please upload a CSV file.");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields;

        // Validate headers
        const missing = REQUIRED_HEADERS.filter((h) => !headers.includes(h));
        if (missing.length > 0) {
          setError(`❌ Missing required column(s): ${missing.join(", ")}`);
          return;
        }

        // Validate rows
        const invalidRows = results.data.filter(
          (row) =>
            !row.x ||
            !row.y ||
            !row.material ||
            !row.type ||
            !row.density_g_cm3 ||
            !row.hardness_mohs ||
            !row.game_value ||
            !row.blast_hole
        );
        if (invalidRows.length > 0) {
          setError("❌ Some rows are invalid or incomplete.");
          return;
        }

        // If all good
        setError(""); 
        console.log("✅ Parsed CSV Data:", results.data);
      },
      error: () => {
        setError("❌ Error reading CSV file.");
      },
    });
  };

  return (
    <div>
      <p>
        Need help? Download a{" "}
        <a href="/blast_scenario_sample.csv" download>
          sample CSV format
        </a>
      </p>
    </div>
  );
}
