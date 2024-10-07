import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';

async function fetchImage(url: string): Promise<Uint8Array> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }

export const generatePDF = async (tableData: any[][], outfile: string, outdir: string, image_path: string = ''): Promise<void> => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([1200, 1000]);
  
    const startX = 50;
    let startY = page.getHeight() - 50;
  
    tableData.forEach((row) => {
      row.forEach((cell: any, i: number) => {
        page.drawText(cell, {
          x: startX + i * 250,
          y: startY,
          size: 12,
          color: rgb(0, 0, 0),
        });
      });
      startY -= 20;
    });

    if (image_path !== '') {
        // Fetch the image from the URL
        const imageBytes = await fetchImage(image_path);

        // Embed the image in the PDF document
        const image = await pdfDoc.embedJpg(imageBytes); // Use embedJpg for JPG images

        // Get the dimensions of the image
        const { width, height } = image.scale(0.5); // Scale the image if necessary

        // Calculate center position for the image
        const centerX = (page.getWidth() - width) / 2; // Center X position

        // Draw the image on the PDF page
        page.drawImage(image, {
            x: centerX,
            y: page.getHeight() - height - 100, // Positioning the image
            width: width,
            height: height,
        });
    }
  
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(`${outdir}/${outfile}`, pdfBytes);
}

export default { generatePDF };