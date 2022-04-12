// the problem with the JSON Données



import { Component, OnInit } from '@angular/core';
import { PDFDocumentProxy, PDFPageProxy } from 'ng2-pdf-viewer';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as  pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-output-pdf',
  templateUrl: './output-pdf.component.html',
  styleUrls: ['./output-pdf.component.scss'],
})
export class OutputPdfComponent implements OnInit {
  type: string = 'decharge';
  pdfSrc: string = ''; // this sample, dynamic one we will generate with the pdfmake
  pageVariable = 1;
  // Initialize variables required for the header and this component
  fileName: string = '';
  // set zoom variables
  zoom = 0.98; // default initial zoom value
  zoomMax = 2; // max zoom value
  zoomMin = 0.5; // min zoom value
  zoomAmt = 0.2; // stepping zoom values on button click
  zoomScale = 'page-width'; // zoom scale based on the page-width
  totalPages = 0; // indicates the total number of pages in the pdf document
  pdf: PDFDocumentProxy; // to access pdf information from the pdf viewer
  documentDefinition: TDocumentDefinitions;
  generatedPDF: any;
  pdfData: any;
  test: any;
  windows: any;
  imgData: any;
  pdffooter: string = '';
  sub: Subscription;
  loadedEmployee: Employee;

  idEmp: number;
  typeMach: string;
  marqueMach: string;
  numAlrim: string;
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.idEmp = JSON.parse(this.route.snapshot.paramMap.get('idEmp') || '{}');
    this.typeMach = this.route.snapshot.paramMap.get('typeMach') || '{}';
    this.marqueMach = this.route.snapshot.paramMap.get('marqueMach') || '{}';
    this.numAlrim = 
      this.route.snapshot.paramMap.get('numAlrim') || '{}'
    ;
    console.log(
      'from the document :' + this.idEmp,
      this.typeMach,
      this.marqueMach,
      this.numAlrim
    );
    (this.sub = this.employeeService
      .getEmployee(this.idEmp)
      .subscribe((empdata) => {
        this.loadedEmployee = empdata.employee;
      })),
      (this.fileName = 'test-document.pdf');
    this.getData();
  }

  generatePDF(): void {
    const thisRef = this;

    this.documentDefinition = {
      info: {
        title: this.pdfData.title,
        author: this.pdfData.author,
        subject: this.pdfData.subject,
        keywords: this.pdfData.keywords,
        creator: this.pdfData.creator,

        creationDate: new Date(),
      },
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [40, 60, 40, 60], // [left, top, right, bottom]
      header(currentPage: number, pageCount: number, pageSize: any): any {
        return [
          {
            margin: 8,
            columns: [
              {
                image: thisRef.pdfData.header,
                fite: [50, 50],
                margin: [10, 10, 10, 10],
                width: 555,
                height: 100,
              },
            ],
          },
        ];

        console.log(currentPage, pageCount, pageSize);
      },
      footer(currentPage: number, pageCount: number, pageSize: any): any {
        console.log(currentPage, pageCount, pageSize);
        return [
          {
            columns: [
              {
                image: thisRef.pdfData.footer,

                margin: [20, 0, 15, 40],
                width: 555,
                height: 50,
              },
              {
                text: currentPage,
                alignment: 'right',
                margin: [40, 30, 40, 20],
              },
            ],
          },
        ];
      },

      content: [
        {
          margin: [10, 70, 10, 10], // [left, top, right, bottom]
          text: 'Réf : DG/INFO /DY/… 2021                                                                    Oued- Smar, le :   /0 /2021',
        },
        {
          margin: [10, 40, 10, 10], //BAS TOP LEFT RIGHT
          text: 'DECHARGE',
          fontSize: 24,
          bold: true,
          alignment: 'center', // (‘left’ or ‘center’ or ‘right’ or ‘justify’) the alignment of the text
        },
        {
          margin: [10, 20, 10, 10], // [left, top, right, bottom]
          text:
            'Je soussigné Mr/Mme/Melle : ' +
            thisRef.loadedEmployee.nom +
            ' ' +
            thisRef.loadedEmployee.prenom +
            '',
        },
        {
          margin: [10, 5, 10, 10], // [left, top, right, bottom]
          text: 'Structure : ' + this.loadedEmployee.direction.nom + '.',
        },
        {
          margin: [10, 15, 10, 10], // [left, top, right, bottom]
          text: 'Déclare avoir reçu le matériel suivant : ',
        },
        {
          margin: [40, 10, 40, 60], // [left, top, right, bottom]
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],

            body: [
              [{ text: 'Type', bold: true }, this.typeMach, '', '', ''],
              [{ text: 'Marque', bold: true }, this.marqueMach, '', '', ''],
              [{ text: 'N°Serie', bold: true }, this.numAlrim, '', '', ''],
            ],
          },
        },
        {
          margin: [10, 10, 10, 10], // [left, top, right, bottom]
          text: 'Observation:………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………….',
        },

        {
          margin: [10, 40, 10, 10], // [left, top, right, bottom]
          text: '   Accusé de réception.',
          fontSize: 13,
          bold: true,
          alignment: 'right',
        },
      ],
    };

    this.generatedPDF = pdfMake.createPdf(this.documentDefinition);
    // This generated pdf buffer is used for the download, print and for viewing
    this.generatedPDF.getBuffer((buffer: string) => {
      console.log(buffer);
      this.pdfSrc = buffer;
    });
  }

  getData(): void {
    this.httpClient.get('assets/data.json').subscribe((data) => {
      if (data) {
        this.pdfData = data;
        this.generatePDF();
      }
    });
  }

  // zoom functionality for the pdf viewer
  setZoom(type: any): void {
    console.log(type);
    if (type === 'increment') {
      this.zoom += this.zoomAmt;
    } else if (type === 'decrement') {
      this.zoom -= this.zoomAmt;
    }
  }
  newVariable: any;

  download(): void {
    this.newVariable = window.navigator;
    const blob = new Blob([this.pdfSrc], { type: 'application/pdf' });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (this.newVariable && this.newVariable.msSaveOrOpenBlob) {
      this.newVariable.msSaveOrOpenBlob(blob);
      return;
    }
    const data = window.URL.createObjectURL(blob);
    const link = document.createElement('a'); // creating an anchor tag
    link.href = data; // setting href value to anchor

    link.download = this.fileName; // giving the download attr to the anchor with the filename that we are giving
    link.click(); // fake click using the js to download it.

    setTimeout(() => {
      window.URL.revokeObjectURL(data);
    }, 100);
  }

  print(): void {
    // Remove previously added iframes
    const prevFrames = document.querySelectorAll('iframe[name="pdf-frame"]');
    if (prevFrames.length) {
      prevFrames.forEach((item) => item.remove());
    }

    // just like download , we are using the blob
    const blob = new Blob([this.pdfSrc], { type: 'application/pdf' });
    const objectURl = URL.createObjectURL(blob);

    // create iframe element in dom
    const frame = document.createElement('iframe');
    frame.style.display = 'none'; // hiding the iframe
    frame.src = objectURl; // setting the source for that iframe
    // appending this iframe to body
    document.body.appendChild(frame);
    frame.name = 'pdf-frame';
    frame.focus();
    this.test = frame.contentWindow;
    // in edge or IE we are using different methods to print
    if (this.isIE() || this.isEdge()) {
      this.test.document.execCommand('print', false, null);
    } else {
      // all other browsers will use this method
      this.test.print();
    }
  }

  // to know the browser is IE or not
  isIE(): boolean {
    return navigator.userAgent.lastIndexOf('MSIE') !== -1;
  }

  // to know the browser is Edge or not
  isEdge(): boolean {
    this.windows = window;
    return !this.isIE() && !!this.windows.StyleMedia;
  }

  // after load complete of the pdf function
  afterLoadComplete(pdf: PDFDocumentProxy): void {
    this.pdf = pdf;
    this.totalPages = pdf.numPages;
  }
}
