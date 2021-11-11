import { Component, OnInit } from '@angular/core';
import { PDFDocumentProxy, PDFPageProxy } from 'ng2-pdf-viewer';

// import the pdfmake library
@Component({
  selector: 'app-output-pdf',
  templateUrl: './output-pdf.component.html',
  styleUrls: ['./output-pdf.component.scss'],
  
})

export class OutputPdfComponent implements OnInit {
 // pdfSrc="https://www.orimi.com/pdf-test.pdf"; // this sample, dynamic one we will generate with the pdfmake
 pdfSrc:string="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
 pageVariable:number;
 fileName:string ="";
 
 zoom =0.98;
 zoomMax= 2;
 zoomMin =0.5;
 zoomAmt= 0.2;// stepping zoom inn and out
 zoomScale:string = "page-width"; // zoom scale based on the 
 totalPages =0; 
 pdf: PDFDocumentProxy; 

  constructor() { }

  ngOnInit(): void {
    this.pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"; 
    this.pageVariable = 1;
    this.fileName = "test-document.pdf";
  }

    // zoom functionality for the pdf viewer
    setZoom(type: any): void {
      console.log(type);
      if (type === "increment") {
        this.zoom += this.zoomAmt;
      } else if (type === "decrement") {
        this.zoom -= this.zoomAmt;
      }
    }


  // pdfSrc value we are taking from the pdfmake generate function in buffer type so currently this willnot work
  // after the pdf is generated it will work
  // Download functionality of the pdf
  download(): void {
    const blob = new Blob([this.pdfSrc], { type: "application/pdf" });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob);
      return;
    }
    const data = window.URL.createObjectURL(blob);
    const link = document.createElement("a"); // creating an anchor tag
    link.href = data; // setting href value to anchor
    link.download = this.fileName; // giving the download attr to the anchor with the filename that we are giving
    link.click(); // fake click using the js to download it.
    
    setTimeout(() => {
      window.URL.revokeObjectURL(data);
    }, 100);
  }



  // pdfSrc value we are taking from the pdfmake generate function in buffer type so currently this willnot work
  // after the pdf is generated it will work
  // Print functionlaity of the pdf
  print(): void {
    // Remove previously added iframes
    const prevFrames = document.querySelectorAll('iframe[name="pdf-frame"]');
    if (prevFrames.length) {
      prevFrames.forEach((item) => item.remove());
    }

    // just like download , we are using the blob
    const blob = new Blob([this.pdfSrc], { type: "application/pdf" });
    const objectURl = URL.createObjectURL(blob);

    // create iframe element in dom
    const frame = document.createElement("iframe");
    frame.style.display = "none"; // hiding the iframe
    frame.src = objectURl; // setting the source for that iframe
    // appending this iframe to body
    document.body.appendChild(frame);
    frame.name = "pdf-frame";
    frame.focus();

  }
  
  // after load complete of the pdf function
  afterLoadComplete(pdf: PDFDocumentProxy): void {
    this.pdf = pdf;
    this.totalPages = pdf.numPages;
  }

}
