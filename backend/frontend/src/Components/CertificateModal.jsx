import { Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import CertificateTemplate from "./CertificateTemplate";
import html2pdf from "html2pdf.js";

const CertificateModal = ({ show, onHide, donor }) => {
  const certRef = useRef();

  const downloadPDF = () => {
  const options = {
    margin: 0,
    filename: `${donor.name}-certificate.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait" },
  };

  html2pdf().set(options).from(certRef.current).save();
};


  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>🩸 Blood Donation Certificate</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <CertificateTemplate ref={certRef} donor={donor} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="danger" onClick={downloadPDF}>
          Download Certificate
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CertificateModal;
