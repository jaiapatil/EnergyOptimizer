import { UploadCloud } from 'lucide-react';
import { Button } from './Button';

export default function UploadData() {
  return (
    <main className="bg-[#0B0F1A] text-white min-h-screen px-6 py-12 font-sans">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Upload Energy Data</h1>
      <p className="text-center text-gray-400 mb-10">
        Upload your energy consumption data in CSV format for AI-powered analysis and optimization
      </p>

      {/* Upload Box */}
      <section className="bg-[#111827] rounded-lg p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">⬆ Upload CSV File</h2>
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-10 text-center">
          <UploadCloud className="w-10 h-10 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400 mb-2">Drag and drop your CSV file here</p>
          <p className="text-gray-600 mb-4">or click to browse files</p>

          <input
            type="file"
            accept=".csv"
            className="hidden"
            id="csvUpload"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;

              const formData = new FormData();
              formData.append("file", file);

              try {
                const res = await fetch("http://localhost:4000/api/upload/company", {
                  method: "POST",
                  body: formData,
                });
                const data = await res.json();
                alert(data.message || data.error);
              } catch (err) {
                alert("Upload failed");
              }
            }}
          />
          <label htmlFor="csvUpload">
            <Button className="bg-white text-black" onClick={() => document.getElementById("csvUpload").click()}>Browse Files</Button>
          </label>
        </div>
      </section>

      {/* Format Requirements */}
      <section className="bg-[#111827] rounded-lg p-6 mb-10 max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">CSV Format Requirements</h3>
        <p className="text-white font-semibold">Required Columns:</p>
        <ul className="text-gray-400 mb-4 ml-4 list-disc">
          <li>name</li>
          <li>email</li>
          <li>password</li>
          <li>actualConsumption</li>
          <li>idealConsumption</li>
          <li>actualCost</li>
          <li>idealCost</li>
          <li>actualEfficiency</li>
          <li>idealEfficiency</li>
          <li>equipment_name</li>
          <li>equipment_status</li>
          <li>equipment_efficiency</li>
          <li>equipment_powerFactor</li>
        </ul>

        <p className="text-white font-semibold">How it works:</p>
        <ul className="text-gray-400 mb-6 ml-4 list-disc">
          <li>Each row = one equipment.</li>
          <li>Rows with the same <code>email</code> belong to the same company.</li>
          <li>Example: 3 rows with the same email → company with 3 equipments.</li>
        </ul>

        <Button
          className="bg-white text-black"
          onClick={() => (window.location.href = "http://localhost:4000/api/upload/sample-company")}
        >
          Download Sample CSV
        </Button>
      </section>

      {/* Tips */}
      <section className="max-w-3xl mx-auto space-y-4">
        <div className="bg-[#1F2937] rounded p-4 text-sm">
          <strong className="text-white">⚠ Pro Tip:</strong>{' '}
          <span className="text-gray-400">
            Upload multiple rows with the same email to add multiple equipments for a single company.
          </span>
        </div>
        <div className="bg-[#1F2937] rounded p-4 text-sm text-gray-400">
          <strong className="text-white">🔒 Your data is encrypted and stored securely.</strong> We never share your energy consumption data with third parties.
        </div>
      </section>
    </main>
  );
}
