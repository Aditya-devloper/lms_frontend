"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowLeft, DownloadCloud, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Papa from "papaparse";
import { uploadLeads } from "@/services/services";
import { useRouter } from "next/navigation";

const sampleCSV = `name,email,phone,status,source,follow_up_date,notes
John Doe,john@example.com,9876543210,new,website,20-06-2026,Interested in demo
Jane Smith,jane@example.com,9876543211,contacted,whatsapp,25-06-2026,Follow up next week
Mike Johnson,mike@example.com,9876543212,interested,referral,30-06-2026,Asked for pricing`;

const BulkUpload = () => {
  const router = useRouter();

  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [upload, setUpload] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    {
      row: number;
      field: string;
      message: string;
    }[]
  >([]);

  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [uploadSummary, setUploadSummary] = useState<any>(null);
  const [duplicateLeads, setDuplicateLeads] = useState<any[]>([]);
  const [failedLeads, setFailedLeads] = useState<any[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNewFile = () => {
    setFile(null);
    setRows([]);
    setHeaders([]);
    setValidationErrors([]);
    setUploadSummary(null);
    setDuplicateLeads([]);
    setFailedLeads([]);
    setUploadCompleted(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onFile = useCallback((file: File) => {
    // reset previous upload state
    setUploadCompleted(false);
    setUploadSummary(null);
    setDuplicateLeads([]);
    setFailedLeads([]);
    setValidationErrors([]);
    setRows([]);
    setHeaders([]);

    setFile(file);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        const data = results.data as Record<string, string>[];

        const errors: {
          row: number;
          field: string;
          message: string;
        }[] = [];

        if (data.length > 500) {
          toast.error("Maximum 500 leads can be uploaded at a time");
          setRows([]);
          setHeaders([]);
          return;
        }

        data.forEach((row, index) => {
          const rowNo = index + 2;

          if (!row.name?.trim()) {
            errors.push({
              row: rowNo,
              field: "name",
              message: "Name is required",
            });
          }

          if (!row.phone?.trim()) {
            errors.push({
              row: rowNo,
              field: "phone",
              message: "Phone is required",
            });
          }

          const date = row.follow_up_date?.trim();
          if (date) {
            const isValidDate =
              /^\d{2}-\d{2}-\d{4}$/.test(date) ||
              /^\d{4}-\d{2}-\d{2}$/.test(date);

            if (!isValidDate) {
              errors.push({
                row: rowNo,
                field: "follow_up_date",
                message: "Use DD-MM-YYYY format",
              });
            }
          }
        });

        setValidationErrors(errors);

        setRows(data);
        if (data.length > 0) {
          setHeaders(Object.keys(data[0]));
        }
      },

      error: (error) => {
        toast.error(error.message);
      },
    });
  }, []);

  const errorRows = new Set(validationErrors.map((e) => e.row));

  const onDrop: React.DragEventHandler = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  const onSelectFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  };

  const downloadSample = () => {
    const blob = new Blob([sampleCSV], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample-leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a CSV file");
      return;
    }
    toast.message(`Uploading ${rows.length} rows`);
    setUpload(true);
    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      const res = await uploadLeads(formData);
      if (res.data.status) {
        const data = res.data;

        setUploadSummary(data.summary);
        setDuplicateLeads(data.response.duplicate_leads);
        setFailedLeads(data.response.failed_leads);
        setUploadCompleted(true);

        toast.success(`${data.summary.uploaded} leads uploaded successfully`);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.response || error?.message || "Failed to upload",
      );
    } finally {
      setUpload(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <ArrowLeft
            className="h-4.5 w-4.5 mt-1 cursor-pointer"
            onClick={() => router.push("/leads")}
          />
          Upload Leads
        </h1>
        <button
          type="button"
          onClick={downloadSample}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-sm cursor-pointer"
        >
          <DownloadCloud size={16} /> Sample CSV
        </button>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={
          "border-2 border-dashed rounded p-8 text-center cursor-pointer " +
          (dragOver ? "border-sky-400 bg-sky-50" : "border-slate-200 bg-white")
        }
      >
        <UploadCloud className="mx-auto" size={36} />
        <p className="mt-3 text-sm text-slate-600">
          Click here to upload or drag and drop <br />
        </p>
        <div className="mt-4">
          <label className="inline-block px-4 py-2 bg-slate-100 rounded cursor-pointer text-sm">
            Choose file
            <input
              ref={fileInputRef}
              onChange={onSelectFile}
              onClick={(e) => {
                (e.target as HTMLInputElement).value = "";
              }}
              type="file"
              accept=".csv"
              className="hidden"
            />
          </label>
        </div>
      </div>

      {validationErrors.length > 0 && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-4">
          <h3 className="font-medium text-red-700">Validation Errors</h3>

          <ul className="mt-2 text-sm text-red-600">
            {validationErrors.map((error, index) => (
              <li key={index}>
                Row {error.row}: {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!uploadCompleted && rows.length > 0 ? (
        <div className="mt-6">
          <div className="mt-4 flex justify-end mb-4">
            <Button
              onClick={handleUpload}
              size={"sm"}
              disabled={upload || validationErrors.length > 0}
            >
              {upload ? "Uploading..." : " Upload"}
            </Button>
          </div>
          <div className="overflow-auto border rounded">
            <table className="min-w-full divide-y">
              <thead className="bg-slate-50">
                <tr>
                  {headers.map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left text-sm font-medium text-slate-600"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={
                      errorRows.has(idx + 2)
                        ? "bg-red-50"
                        : idx % 2
                          ? "bg-slate-50"
                          : ""
                    }
                  >
                    {headers.map((h) => (
                      <td key={h} className="px-4 py-2 text-sm text-slate-700">
                        {row[h]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center mt-8 text-sm text-slate-500 space-y-1">
          <p>
            Please download the sample CSV and upload your leads using the same
            format.
          </p>
          <p>A maximum of 500 leads can be uploaded per file.</p>
        </div>
      )}

      {uploadCompleted && (
        <>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleNewFile}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-sm cursor-pointer"
            >
              <UploadCloud size={16} /> Upload new file
            </button>
          </div>
          {/* Summary */}
          {uploadSummary && (
            <div className="mt-6 rounded border p-4 bg-slate-50">
              <h3 className="font-semibold mb-2">Upload Summary</h3>

              <p>Total: {uploadSummary.total}</p>
              <p>Uploaded: {uploadSummary.uploaded}</p>
              <p>Failed: {uploadSummary.failed}</p>
              <p>Duplicates: {uploadSummary.duplicates}</p>
            </div>
          )}
          {/* Duplicate Leads */}
          {duplicateLeads.length > 0 && (
            <div className="mt-4 rounded border border-yellow-200 bg-yellow-50 p-4">
              <h3 className="font-medium text-yellow-700">Duplicate Leads</h3>

              {duplicateLeads.map((lead, index) => (
                <p key={index}>
                  Row {lead.row} - {lead.phone} - {lead.reason}
                </p>
              ))}
            </div>
          )}
          {/* Failed Leads */}
          {failedLeads.length > 0 && (
            <div className="mt-4 rounded border border-red-200 bg-red-50 p-4">
              <h3 className="font-medium text-red-700">Failed Leads</h3>

              {failedLeads.map((lead, index) => (
                <p key={index}>
                  Row {lead.row} - {lead.reason}
                </p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BulkUpload;
