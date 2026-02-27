import { useState } from "react";
import CertificateModal from "./CertificateModal";

const LeaderboardRow = ({ user, rank }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <li className="list-group-item d-flex justify-content-between">
        <div>
          <strong>#{rank} {user.name}</strong>
          <br />
          <small>{user.blood}</small>
        </div>

        <div>
          <strong>{user.donations}</strong> donations
          <button
            className="btn btn-outline-dark btn-sm ms-3"
            onClick={() => setShow(true)}
          >
            Certificate
          </button>
        </div>
      </li>

      <CertificateModal
        show={show}
        onHide={() => setShow(false)}
        donor={user}
      />
    </>
  );
};

export default LeaderboardRow;
