// import React from "react";
// import jsPDF from "jspdf";

// const NextLecture = ({ completedVideos, totalVideos }) => {
//   const allVideosCompleted = completedVideos.length === totalVideos;

//   const handleGenerateCertificate = () => {
//     const doc = new jsPDF();
//     doc.text("Certificate of Completion", 20, 20);
//     doc.text("Congratulations! You have completed the course.", 20, 30);
//     doc.save("certificate.pdf");
//   };

//   return (
//     <div>
//       {allVideosCompleted ? (
//         <button onClick={handleGenerateCertificate}>
//           Generate Certificate
//         </button>
//       ) : (
//         <p>Next lecture</p>
//       )}
//     </div>
//   );
// };

// export default NextLecture;

import React from "react";
import jsPDF from "jspdf";

const NextLecture = ({
  completedVideos,
  totalVideos,
}: {
  completedVideos: any[];
  totalVideos: number;
}) => {
  const allVideosCompleted = completedVideos.length === totalVideos;

  const handleGenerateCertificate = () => {
    const doc = new jsPDF();
    doc.text("Certificate of Completion", 20, 20);
    doc.text("Congratulations! You have completed the course.", 20, 30);
    doc.save("certificate.pdf");
  };

  return (
    <div>
      {allVideosCompleted ? (
        <button onClick={handleGenerateCertificate}>
          Generate Certificate
        </button>
      ) : (
        <p>Next lecture</p>
      )}
    </div>
  );
};

export default NextLecture;
