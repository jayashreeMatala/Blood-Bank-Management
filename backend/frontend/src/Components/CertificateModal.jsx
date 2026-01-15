import { Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import CertificateTemplate from "./CertificateTemplate";
import html2pdf from "html2pdf.js";

const CertificateModal = ({ show, onHide, donor }) => {
  const certRef = useRef();

  const downloadPDF = () => {
    html2pdf().from(certRef.current).save(`${donor.name}-certificate.pdf`);
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
