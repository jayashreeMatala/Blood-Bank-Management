import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function CertificateModal({ donor, onClose }) {

  const downloadPDF = async () => {
    const element = document.getElementById("certificate");
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${donor.name}-certificate.pdf`);
  };

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content p-3">

          {/* CERTIFICATE */}
          <div id="certificate" className="border rounded p-4 text-center">

            <div className="mb-3">
              <div className="bg-danger text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: 50, height: 50 }}>
                🩸
              </div>
            </div>

            <h4 className="fw-bold">Certificate of Appreciation</h4>
            <small className="text-muted">Blood Bank Management System</small>

            <p className="mt-4">This certifies that</p>

            <h2 className="text-danger fw-bold">{donor.name}</h2>

            <p className="mt-2">has generously donated</p>

            <div className="d-flex justify-content-center gap-3 my-3">
              <div className="border rounded p-3">
                <div className="fw-bold text-danger">{donor.units}</div>
                <small>Units of Blood</small>
              </div>

              <div className="border rounded p-3">
                <div className="fw-bold text-primary">{donor.blood}</div>
                <small>Blood Type</small>
              </div>
            </div>

            <p className="mt-3 fw-semibold">
              on {new Date().toDateString()}
            </p>

            <p className="mt-4 fst-italic text-muted">
              “Your selfless act of donating blood has the power to save lives.
              Thank you for being a hero and making a difference.”
            </p>

            <div className="d-flex justify-content-between mt-5">
              <div>
                <hr />
                <small>Medical Director</small>
              </div>

              <div className="text-success fw-bold">✔ Certified</div>

              <div>
                <hr />
                <small>Administrator</small>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-danger" onClick={downloadPDF}>
              Download PDF
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CertificateModal;
