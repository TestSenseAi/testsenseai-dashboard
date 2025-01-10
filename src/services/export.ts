import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

export class ExportService {
  static async exportMetrics(data: any, exportType: 'pdf' | 'excel' | 'csv') {
    const fileName = `dashboard-export-${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}`;

    switch (exportType) {
      case 'pdf':
        return this.exportToPDF(data, fileName);
      case 'excel':
        return this.exportToExcel(data, fileName);
      case 'csv':
        return this.exportToCSV(data, fileName);
      default:
        throw new Error('Unsupported export type');
    }
  }

  private static async exportToPDF(data: any, fileName: string) {
    const pdf = new jsPDF();

    // Add title
    pdf.setFontSize(16);
    pdf.text('Dashboard Export', 14, 15);
    pdf.setFontSize(10);
    pdf.text(`Generated on ${format(new Date(), 'PPpp')}`, 14, 25);

    let yPos = 35;

    // Add each widget
    for (const widget of data.widgets) {
      // Add widget title
      pdf.setFontSize(12);
      pdf.text(widget.name, 14, yPos);
      yPos += 10;

      if (widget.type === 'metric') {
        autoTable(pdf, {
          startY: yPos,
          head: [['Metric', 'Value']],
          body: Object.entries(widget.data),
          theme: 'grid',
          headStyles: { fillColor: [41, 128, 185] },
        });
        yPos = (pdf as any).lastAutoTable.finalY + 10;
      } else if (widget.type === 'table') {
        autoTable(pdf, {
          startY: yPos,
          head: widget.data.headers,
          body: widget.data.rows,
          theme: 'grid',
          headStyles: { fillColor: [41, 128, 185] },
        });
        yPos = (pdf as any).lastAutoTable.finalY + 10;
      }

      // Add page if needed
      if (yPos > pdf.internal.pageSize.height - 20) {
        pdf.addPage();
        yPos = 20;
      }
    }

    pdf.save(`${fileName}.pdf`);
  }

  private static async exportToExcel(data: any, fileName: string) {
    const wb = XLSX.utils.book_new();

    // Create overview sheet
    const overviewData = [['Dashboard Export'], [`Generated on ${format(new Date(), 'PPpp')}`], []];

    // Add widget data
    for (const widget of data.widgets) {
      if (widget.type === 'metric') {
        const wsData = [[widget.name], ['Metric', 'Value'], ...Object.entries(widget.data)];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, widget.name);
      } else if (widget.type === 'table') {
        const wsData = [[widget.name], widget.data.headers, ...widget.data.rows];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, widget.name);
      }
    }

    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  private static async exportToCSV(data: any, fileName: string) {
    let csvContent = `Dashboard Export\nGenerated on ${format(new Date(), 'PPpp')}\n\n`;

    // Add widget data
    for (const widget of data.widgets) {
      csvContent += `${widget.name}\n`;

      if (widget.type === 'metric') {
        csvContent += 'Metric,Value\n';
        for (const [metric, value] of Object.entries(widget.data)) {
          csvContent += `${metric},${value}\n`;
        }
      } else if (widget.type === 'table') {
        csvContent += widget.data.headers.join(',') + '\n';
        for (const row of widget.data.rows) {
          csvContent += row.join(',') + '\n';
        }
      }

      csvContent += '\n';
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
