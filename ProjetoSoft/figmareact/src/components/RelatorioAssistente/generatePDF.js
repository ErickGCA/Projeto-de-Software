import jsPDF from "jspdf";
import "jspdf-autotable";

function generatePDF(historicoData) {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;

  doc.setFontSize(16);
  doc.text("Relatório de Histórico", 105, 20, null, null, "center");

  const tableColumn = ["Nome", "Codnis", "Endereço", "CPF", "Telefone", "Data"];
  const tableRows = [];

  historicoData.forEach((item) => {
    const itemData = [
      item.nome,
      item.codnis,
      item.endereco,
      item.cpf,
      item.telefone,
      item.date,
    ];
    tableRows.push(itemData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    margin: { top: 30, bottom: 10, left: 10, right: 10 },
    styles: { overflow: "linebreak", cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: "wrap" },
      1: { cellWidth: 20 },
      2: { cellWidth: 40 },
      3: { cellWidth: 30 },
      4: { cellWidth: 30 },
      5: { cellWidth: 20 },
    },
    didDrawCell: (data) => {
      if (data.cell.text.length > 1) {
        data.cell.text[0] = data.cell.text[0].slice(0, 30) + "...";
      }
    },
    theme: "grid",
    showHead: "everyPage",
  });

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      `Página ${i} de ${pageCount}`,
      105,
      pageHeight - 10,
      null,
      null,
      "center"
    );
  }

  doc.save("historico.pdf");
}

export default generatePDF;
