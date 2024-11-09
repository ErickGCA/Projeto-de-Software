// HistoricoList.js
import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import FormularioCRAS from "./FormularioCRAS";

const HistoricoList = () => {
  const [showForm, setShowForm] = useState(false);
  const componentRef = useRef();

  const handlePrint = () => {
    const content = componentRef.current;
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
            <html>
                <head>
                    <title>Formulário CRAS</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                        }
                        @media print {
                            body {
                                width: 21cm;
                                height: 29.7cm;
                                margin: 0;
                                padding: 1cm;
                            }
                        }
                    </style>
                </head>
                <body>
                    ${content.outerHTML}
                </body>
            </html>
        `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Voltar" : "Gerar Formulário"}
        </Button>
        {showForm && (
          <Button onClick={handlePrint} className="ml-2">
            Imprimir
          </Button>
        )}
      </div>

      {showForm && <FormularioCRAS ref={componentRef} />}
    </div>
  );
};

export default HistoricoList;
