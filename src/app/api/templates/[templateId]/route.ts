import { NextRequest, NextResponse } from 'next/server';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableCell, TableRow, WidthType, BorderStyle } from 'docx';

interface TemplateData {
  title: string;
  content: Paragraph[];
}

const templates: Record<string, TemplateData> = {
  'residential-rental-agreement': {
    title: 'Residential Rental Agreement',
    content: [
      new Paragraph({
        text: 'RESIDENTIAL RENTAL AGREEMENT',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'This Residential Rental Agreement (the "Agreement") is made and entered into this [DAY] day of [MONTH], [YEAR], by and between:', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Landlord: ', bold: true }),
          new TextRun({ text: '[LANDLORD FULL NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[LANDLORD ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Tenant: ', bold: true }),
          new TextRun({ text: '[TENANT FULL NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[TENANT CURRENT ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Property Address: ', bold: true }),
          new TextRun({ text: '[FULL PROPERTY ADDRESS INCLUDING CITY, STATE, ZIP CODE]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '1. TERM', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'The term of this tenancy shall commence on [START DATE] and shall terminate on [END DATE], unless sooner terminated pursuant to the provisions of this Agreement.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '2. RENT', bold: true }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Tenant agrees to pay Landlord the sum of $', bold: true }),
          new TextRun({ text: '[MONTHLY RENT AMOUNT]' }),
          new TextRun({ text: ' per month as rent for the Property. Rent shall be due on the ', bold: true }),
          new TextRun({ text: '[DAY OF MONTH]' }),
          new TextRun({ text: ' day of each month.', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '3. SECURITY DEPOSIT', bold: true }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Tenant shall pay Landlord a security deposit in the amount of $', bold: true }),
          new TextRun({ text: '[SECURITY DEPOSIT AMOUNT]' }),
          new TextRun({ text: ' upon execution of this Agreement. The security deposit shall be returned to Tenant within ', bold: true }),
          new TextRun({ text: '[NUMBER OF DAYS]' }),
          new TextRun({ text: ' days after termination of tenancy, less any deductions for damages or unpaid rent.', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '4. USE OF PROPERTY', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'The Property shall be used exclusively as a private residence for the Tenant and their immediate family. No other use is permitted without Landlord\'s prior written consent.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '5. MAINTENANCE AND REPAIRS', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Tenant shall maintain the Property in good condition and promptly notify Landlord of any needed repairs. Landlord shall be responsible for major repairs and structural maintenance.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '6. PETS', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Pets are [ALLOWED/NOT ALLOWED] on the Property. [If allowed: Tenant may have the following pets: [DESCRIBE PETS]. Additional pet deposit of $[AMOUNT] is required.]',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '7. DEFAULT', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'If Tenant fails to pay rent when due or breaches any other provision of this Agreement, Landlord may terminate the tenancy upon [NUMBER] days written notice.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '8. GOVERNING LAW', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'This Agreement shall be governed by the laws of the State of [STATE].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        text: 'IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Landlord: _______________________________ Date: _______________', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Tenant: _______________________________ Date: _______________', bold: true }),
        ],
      }),
    ],
  },

  'sublease-agreement': {
    title: 'Sublease Agreement',
    content: [
      new Paragraph({
        text: 'SUBLEASE AGREEMENT',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'This Sublease Agreement (the "Agreement") is made and entered into this [DAY] day of [MONTH], [YEAR], by and between:', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Original Tenant/Sublessor: ', bold: true }),
          new TextRun({ text: '[ORIGINAL TENANT FULL NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[ORIGINAL TENANT ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Subtenant: ', bold: true }),
          new TextRun({ text: '[SUBTENANT FULL NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[SUBTENANT CURRENT ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Property Address: ', bold: true }),
          new TextRun({ text: '[FULL PROPERTY ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '1. PREMISES', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Sublessor agrees to sublease to Subtenant and Subtenant agrees to sublease from Sublessor the premises described above.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '2. TERM', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'The sublease term shall commence on [START DATE] and shall terminate on [END DATE].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '3. RENT', bold: true }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Subtenant shall pay Sublessor rent in the amount of $', bold: true }),
          new TextRun({ text: '[MONTHLY RENT AMOUNT]' }),
          new TextRun({ text: ' per month, due on the ', bold: true }),
          new TextRun({ text: '[DAY OF MONTH]' }),
          new TextRun({ text: ' day of each month.', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '4. SECURITY DEPOSIT', bold: true }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Subtenant shall pay Sublessor a security deposit of $', bold: true }),
          new TextRun({ text: '[SECURITY DEPOSIT AMOUNT]' }),
          new TextRun({ text: ' upon execution of this Agreement.', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '5. SUBLESSOR\'S RESPONSIBILITIES', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Sublessor shall maintain the lease with the original Landlord and shall not do anything that would jeopardize Subtenant\'s right to quiet enjoyment of the premises.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '6. SUBTENANT\'S RESPONSIBILITIES', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Subtenant shall comply with all terms of the original lease agreement and shall maintain the premises in good condition.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '7. INSURANCE', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Subtenant is advised to obtain renter\'s insurance to cover their personal property and liability.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '8. DEFAULT', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'If Subtenant fails to pay rent or breaches this Agreement, Sublessor may terminate the sublease upon 30 days written notice.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '9. GOVERNING LAW', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'This Agreement shall be governed by the laws of the State of [STATE].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        text: 'IN WITNESS WHEREOF, the parties have executed this Agreement.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Sublessor: _______________________________ Date: _______________', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Subtenant: _______________________________ Date: _______________', bold: true }),
        ],
      }),
    ],
  },

  'media-release': {
    title: 'Photo/Video Release Form',
    content: [
      new Paragraph({
        text: 'PHOTO/VIDEO RELEASE FORM',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'I, ', bold: true }),
          new TextRun({ text: '[FULL NAME]' }),
          new TextRun({ text: ', residing at ', bold: true }),
          new TextRun({ text: '[ADDRESS]' }),
          new TextRun({ text: ', hereby grant permission to ', bold: true }),
          new TextRun({ text: '[COMPANY/INDIVIDUAL NAME]' }),
          new TextRun({ text: ' (hereinafter referred to as "Photographer") to use my likeness in photographs and/or video footage.', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '1. GRANT OF RIGHTS', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'I hereby grant to Photographer the absolute and irrevocable right and permission to copyright, use, reuse, publish, republish, and reproduce my likeness and/or voice in any and all media, now known or hereafter devised, for any purpose whatsoever, including but not limited to advertising, promotion, trade, or any commercial purpose.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '2. PHOTOGRAPHY/VIDEO DESCRIPTION', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'The photographs/videos will be taken on [DATE] at [LOCATION] for [PURPOSE/DESCRIPTION OF PROJECT].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '3. COMPENSATION', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'I acknowledge that I have [received/not received] compensation for the rights granted herein. Compensation: [DESCRIBE COMPENSATION OR "NONE"].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '4. OWNERSHIP AND COPYRIGHT', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'I understand that Photographer is the sole owner of the copyright in the photographs/videos and that I have no right to use the photographs/videos for any purpose without Photographer\'s express written permission.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '5. RELEASE AND WAIVER', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'I hereby release and discharge Photographer from any and all claims, demands, rights, promises, damages, and liabilities arising out of or related to the use of my likeness, including but not limited to claims of defamation, invasion of privacy, or right of publicity.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '6. ADDITIONAL PARTICIPANTS', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'If this release is signed on behalf of a minor or other person who cannot legally consent, I represent that I am the parent/legal guardian and have full authority to consent on their behalf.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '7. GOVERNING LAW', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'This release shall be governed by the laws of the State of [STATE].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        text: 'I have read this release and fully understand its contents. I sign it freely and voluntarily without any inducement.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Signature: _______________________________ Date: _______________', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Printed Name: _______________________________', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Witness (if applicable): _______________________________ Date: _______________', bold: true }),
        ],
      }),
    ],
  },

  'general-services-contract': {
    title: 'General Services Contract',
    content: [
      new Paragraph({
        text: 'GENERAL SERVICES CONTRACT',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'This Services Contract (the "Contract") is entered into as of [DATE], by and between:', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Service Provider: ', bold: true }),
          new TextRun({ text: '[SERVICE PROVIDER FULL NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[SERVICE PROVIDER ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Client: ', bold: true }),
          new TextRun({ text: '[CLIENT FULL NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[CLIENT ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '1. SERVICES', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Service Provider agrees to provide the following services to Client: [DESCRIBE SERVICES IN DETAIL].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '2. COMPENSATION', bold: true }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Client agrees to pay Service Provider $', bold: true }),
          new TextRun({ text: '[TOTAL COMPENSATION AMOUNT]' }),
          new TextRun({ text: ' for the services rendered. Payment terms: ', bold: true }),
          new TextRun({ text: '[DESCRIBE PAYMENT TERMS]' }),
          new TextRun({ text: '.', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '3. TERM', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'This Contract shall commence on [START DATE] and shall continue until [END DATE] or until the services are completed, whichever occurs first.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '4. DELIVERABLES', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Service Provider shall deliver the following to Client: [LIST DELIVERABLES AND TIMELINES].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '5. CONFIDENTIALITY', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Service Provider agrees to maintain the confidentiality of all Client information and materials.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '6. OWNERSHIP OF WORK PRODUCT', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Upon full payment, Client shall own all work product created pursuant to this Contract. [MODIFY IF DIFFERENT OWNERSHIP TERMS APPLY].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '7. TERMINATION', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Either party may terminate this Contract upon 30 days written notice. Client shall pay for all services rendered through the termination date.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '8. INDEPENDENT CONTRACTOR', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Service Provider is an independent contractor and not an employee of Client. Service Provider is responsible for all taxes and insurance.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '9. GOVERNING LAW', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'This Contract shall be governed by the laws of the State of [STATE].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        text: 'IN WITNESS WHEREOF, the parties have executed this Contract.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Service Provider: _______________________________ Date: _______________', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Client: _______________________________ Date: _______________', bold: true }),
        ],
      }),
    ],
  },

  'independent-contractor': {
    title: 'Independent Contractor Agreement',
    content: [
      new Paragraph({
        text: 'INDEPENDENT CONTRACTOR AGREEMENT',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'This Independent Contractor Agreement (the "Agreement") is entered into as of [DATE], by and between:', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Company: ', bold: true }),
          new TextRun({ text: '[COMPANY NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[COMPANY ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Contractor: ', bold: true }),
          new TextRun({ text: '[CONTRACTOR FULL NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[CONTRACTOR ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '1. SERVICES', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Contractor agrees to provide the following services: [DESCRIBE SERVICES IN DETAIL].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '2. COMPENSATION', bold: true }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Company agrees to pay Contractor $', bold: true }),
          new TextRun({ text: '[RATE OR TOTAL COMPENSATION]' }),
          new TextRun({ text: ' ', bold: true }),
          new TextRun({ text: '[PER HOUR/PER PROJECT/ETC.]' }),
          new TextRun({ text: ' for services rendered. Payment terms: ', bold: true }),
          new TextRun({ text: '[DESCRIBE PAYMENT SCHEDULE]' }),
          new TextRun({ text: '.', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '3. INDEPENDENT CONTRACTOR STATUS', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Contractor is an independent contractor and not an employee of Company. Contractor shall be responsible for all taxes, insurance, and business expenses.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '4. TERM', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'This Agreement shall commence on [START DATE] and continue until [END DATE] or until terminated as provided herein.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '5. INTELLECTUAL PROPERTY', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'All work product created by Contractor shall be considered "work made for hire" and owned by Company. [MODIFY IF DIFFERENT OWNERSHIP TERMS APPLY].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '6. CONFIDENTIALITY', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Contractor agrees to maintain the confidentiality of Company\'s proprietary information and trade secrets.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '7. TERMINATION', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Either party may terminate this Agreement at any time, with or without cause, upon 30 days written notice.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '8. INSURANCE', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Contractor shall maintain appropriate insurance coverage for their work and shall indemnify Company against claims arising from Contractor\'s negligence.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '9. GOVERNING LAW', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'This Agreement shall be governed by the laws of the State of [STATE].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        text: 'IN WITNESS WHEREOF, the parties have executed this Agreement.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Company: _______________________________ Date: _______________', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Contractor: _______________________________ Date: _______________', bold: true }),
        ],
      }),
    ],
  },

  'nda': {
    title: 'Non-Disclosure Agreement',
    content: [
      new Paragraph({
        text: 'NON-DISCLOSURE AGREEMENT',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'This Non-Disclosure Agreement (the "Agreement") is entered into as of [DATE], by and between:', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Disclosing Party: ', bold: true }),
          new TextRun({ text: '[DISCLOSING PARTY NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[DISCLOSING PARTY ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Receiving Party: ', bold: true }),
          new TextRun({ text: '[RECEIVING PARTY NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[RECEIVING PARTY ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '1. PURPOSE', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'The purpose of this Agreement is to protect the confidentiality of information disclosed between the parties for the following purpose: [DESCRIBE PURPOSE].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '2. CONFIDENTIAL INFORMATION', bold: true }),
        ],
      }),
      new Paragraph({
        text: '"Confidential Information" means any information disclosed by Disclosing Party to Receiving Party, including but not limited to: trade secrets, business plans, customer lists, financial information, technical data, and proprietary processes.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '3. OBLIGATIONS OF RECEIVING PARTY', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Receiving Party agrees to: (a) hold Confidential Information in strict confidence; (b) not disclose Confidential Information to any third party; (c) not use Confidential Information for any purpose other than the Purpose; and (d) take reasonable measures to protect the secrecy of Confidential Information.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '4. EXCLUSIONS', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Confidential Information does not include information that: (a) is publicly known; (b) becomes publicly known through no fault of Receiving Party; (c) is already known to Receiving Party; (d) is independently developed by Receiving Party; or (e) is required to be disclosed by law.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '5. TERM', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'This Agreement shall remain in effect for [NUMBER] years from the date hereof, or until the Confidential Information enters the public domain, whichever occurs first.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '6. RETURN OF MATERIALS', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Upon termination of this Agreement or at Disclosing Party\'s request, Receiving Party shall return or destroy all Confidential Information.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '7. REMEDIES', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Receiving Party acknowledges that breach of this Agreement may cause irreparable harm to Disclosing Party, and agrees that Disclosing Party shall be entitled to injunctive relief in addition to any other remedies available at law.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '8. GOVERNING LAW', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'This Agreement shall be governed by the laws of the State of [STATE].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        text: 'IN WITNESS WHEREOF, the parties have executed this Agreement.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Disclosing Party: _______________________________ Date: _______________', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Receiving Party: _______________________________ Date: _______________', bold: true }),
        ],
      }),
    ],
  },

  'partnership-agreement': {
    title: 'Business Partnership Agreement',
    content: [
      new Paragraph({
        text: 'BUSINESS PARTNERSHIP AGREEMENT',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'This Partnership Agreement (the "Agreement") is entered into as of [DATE], by and between:', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Partner 1: ', bold: true }),
          new TextRun({ text: '[PARTNER 1 FULL NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[PARTNER 1 ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Partner 2: ', bold: true }),
          new TextRun({ text: '[PARTNER 2 FULL NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[PARTNER 2 ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Business Name: ', bold: true }),
          new TextRun({ text: '[LEGAL BUSINESS NAME]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '1. FORMATION', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'The Partners hereby form a partnership for the purpose of [DESCRIBE BUSINESS PURPOSE].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '2. CAPITAL CONTRIBUTIONS', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Each Partner shall contribute the following capital to the partnership: [DESCRIBE CONTRIBUTIONS]. Total initial capital: $[AMOUNT].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '3. PROFIT AND LOSS SHARING', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Profits and losses shall be shared as follows: [DESCRIBE PERCENTAGES, e.g., "50/50" or other arrangement].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '4. MANAGEMENT', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'The partnership shall be managed by [DESCRIBE MANAGEMENT STRUCTURE - e.g., "both partners equally" or "Partner 1 shall have final decision-making authority"].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '5. DECISION MAKING', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Major business decisions require [DESCRIBE APPROVAL REQUIREMENTS - e.g., "unanimous consent" or "majority vote"].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '6. WITHDRAWAL OF PARTNER', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'A Partner may withdraw upon [NUMBER] days written notice. The withdrawing Partner\'s interest shall be [DESCRIBE BUYOUT TERMS].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '7. DISSOLUTION', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'The partnership may be dissolved by mutual agreement or upon the death, bankruptcy, or withdrawal of a Partner. Assets shall be distributed according to capital accounts.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '8. NON-COMPETE', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'During the term of the partnership and for [NUMBER] years thereafter, Partners shall not engage in competing businesses within [GEOGRAPHIC AREA].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '9. GOVERNING LAW', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'This Agreement shall be governed by the laws of the State of [STATE].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        text: 'IN WITNESS WHEREOF, the Partners have executed this Agreement.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Partner 1: _______________________________ Date: _______________', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Partner 2: _______________________________ Date: _______________', bold: true }),
        ],
      }),
    ],
  },

  'employment-contract': {
    title: 'Employment Agreement',
    content: [
      new Paragraph({
        text: 'EMPLOYMENT AGREEMENT',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'This Employment Agreement (the "Agreement") is entered into as of [DATE], by and between:', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Employer: ', bold: true }),
          new TextRun({ text: '[EMPLOYER NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[EMPLOYER ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Employee: ', bold: true }),
          new TextRun({ text: '[EMPLOYEE FULL NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[EMPLOYEE ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '1. POSITION AND DUTIES', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Employee is employed as [JOB TITLE]. Employee shall perform the duties and responsibilities assigned by Employer.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '2. COMPENSATION', bold: true }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Employee shall receive an annual salary of $', bold: true }),
          new TextRun({ text: '[ANNUAL SALARY]' }),
          new TextRun({ text: ', payable ', bold: true }),
          new TextRun({ text: '[PAY FREQUENCY]' }),
          new TextRun({ text: '. Benefits include: ', bold: true }),
          new TextRun({ text: '[LIST BENEFITS]' }),
          new TextRun({ text: '.', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '3. TERM OF EMPLOYMENT', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'This is a [AT-WILL/FIXED-TERM] employment agreement. [If fixed-term: Term commences on [START DATE] and ends on [END DATE].]',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '4. HOURS OF WORK', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Employee\'s normal work hours shall be [DESCRIBE SCHEDULE]. Overtime shall be compensated at [OVERTIME RATE].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '5. CONFIDENTIALITY', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Employee agrees to maintain the confidentiality of Employer\'s proprietary information, trade secrets, and confidential business information.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '6. NON-COMPETE', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'During employment and for [NUMBER] months thereafter, Employee shall not engage in competing businesses within [GEOGRAPHIC AREA].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '7. TERMINATION', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Either party may terminate this Agreement at any time, with or without cause, upon [NOTICE PERIOD] written notice. Employer may terminate immediately for cause.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '8. RETURN OF PROPERTY', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Upon termination, Employee shall return all Employer property, including but not limited to keys, equipment, documents, and electronic devices.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '9. GOVERNING LAW', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'This Agreement shall be governed by the laws of the State of [STATE].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        text: 'IN WITNESS WHEREOF, the parties have executed this Agreement.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Employer: _______________________________ Date: _______________', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Employee: _______________________________ Date: _______________', bold: true }),
        ],
      }),
    ],
  },

  'consulting-agreement': {
    title: 'Consulting Services Agreement',
    content: [
      new Paragraph({
        text: 'CONSULTING SERVICES AGREEMENT',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'This Consulting Services Agreement (the "Agreement") is entered into as of [DATE], by and between:', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Client: ', bold: true }),
          new TextRun({ text: '[CLIENT NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[CLIENT ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Consultant: ', bold: true }),
          new TextRun({ text: '[CONSULTANT FULL NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[CONSULTANT ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '1. SERVICES', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Consultant agrees to provide consulting services in the following areas: [DESCRIBE SERVICES AND SCOPE IN DETAIL].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '2. COMPENSATION', bold: true }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Client agrees to pay Consultant $', bold: true }),
          new TextRun({ text: '[RATE OR TOTAL COMPENSATION]' }),
          new TextRun({ text: ' ', bold: true }),
          new TextRun({ text: '[PER HOUR/PER PROJECT/ETC.]' }),
          new TextRun({ text: '. Payment terms: ', bold: true }),
          new TextRun({ text: '[DESCRIBE PAYMENT SCHEDULE]' }),
          new TextRun({ text: '.', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '3. TERM', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'This Agreement shall commence on [START DATE] and continue until [END DATE] or until the services are completed.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '4. DELIVERABLES', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Consultant shall deliver the following: [LIST SPECIFIC DELIVERABLES WITH TIMELINES].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '5. INDEPENDENT CONTRACTOR STATUS', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Consultant is an independent contractor and not an employee of Client. Consultant is responsible for all taxes, insurance, and business expenses.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '6. INTELLECTUAL PROPERTY', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'All work product shall be owned by Client upon full payment. Consultant retains ownership of pre-existing materials and tools.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '7. CONFIDENTIALITY', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Consultant agrees to maintain the confidentiality of Client\'s proprietary information and shall not disclose confidential information to third parties.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '8. TERMINATION', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Either party may terminate this Agreement upon 30 days written notice. Client shall pay for all services rendered through the termination date.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '9. WARRANTIES', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Consultant warrants that all services shall be performed in a professional manner and in accordance with industry standards.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '10. GOVERNING LAW', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'This Agreement shall be governed by the laws of the State of [STATE].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        text: 'IN WITNESS WHEREOF, the parties have executed this Agreement.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Client: _______________________________ Date: _______________', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Consultant: _______________________________ Date: _______________', bold: true }),
        ],
      }),
    ],
  },

  'goods-sales-contract': {
    title: 'Goods Sales Contract',
    content: [
      new Paragraph({
        text: 'GOODS SALES CONTRACT',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'This Goods Sales Contract (the "Contract") is entered into as of [DATE], by and between:', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Seller: ', bold: true }),
          new TextRun({ text: '[SELLER NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[SELLER ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Buyer: ', bold: true }),
          new TextRun({ text: '[BUYER NAME]' }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Address: ', bold: true }),
          new TextRun({ text: '[BUYER ADDRESS]' }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '1. GOODS', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Seller agrees to sell and Buyer agrees to purchase the following goods: [DESCRIBE GOODS IN DETAIL, INCLUDING QUANTITY, SPECIFICATIONS, AND QUALITY STANDARDS].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '2. PURCHASE PRICE', bold: true }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'The total purchase price shall be $', bold: true }),
          new TextRun({ text: '[TOTAL PRICE]' }),
          new TextRun({ text: ', broken down as follows: ', bold: true }),
          new TextRun({ text: '[ITEMIZE PRICING IF APPLICABLE]' }),
          new TextRun({ text: '.', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '3. PAYMENT TERMS', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Payment shall be made as follows: [DESCRIBE PAYMENT SCHEDULE, e.g., "50% deposit upon signing, balance due upon delivery"].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '4. DELIVERY', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Goods shall be delivered to [DELIVERY ADDRESS] on or before [DELIVERY DATE]. Delivery terms: [FOB/DDP/ETC.].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '5. RISK OF LOSS', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Risk of loss shall pass to Buyer upon [DESCRIBE WHEN RISK TRANSFERS, e.g., "delivery to carrier" or "receipt by Buyer"].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '6. INSPECTION AND ACCEPTANCE', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Buyer shall have [NUMBER] days to inspect the goods upon delivery. If goods do not conform to specifications, Buyer may reject them.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '7. WARRANTIES', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Seller warrants that the goods are free from defects in material and workmanship and conform to the specifications. Warranty period: [WARRANTY DURATION].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '8. TITLE', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Title shall pass to Buyer upon [DESCRIBE WHEN TITLE TRANSFERS, e.g., "full payment" or "delivery"].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '9. DEFAULT', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'If either party defaults, the non-defaulting party may cancel this Contract and seek remedies at law or in equity.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '10. FORCE MAJEURE', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'Neither party shall be liable for delays caused by events beyond their reasonable control, including acts of God, war, or natural disasters.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: '11. GOVERNING LAW', bold: true }),
        ],
      }),
      new Paragraph({
        text: 'This Contract shall be governed by the laws of the State of [STATE].',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        text: 'IN WITNESS WHEREOF, the parties have executed this Contract.',
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Seller: _______________________________ Date: _______________', bold: true }),
        ],
      }),
      new Paragraph({
        text: '',
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Buyer: _______________________________ Date: _______________', bold: true }),
        ],
      }),
    ],
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ templateId: string }> }
) {
  const { templateId } = await params;

  const template = templates[templateId];
  if (!template) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  try {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: template.content,
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${template.title.replace(/\s+/g, '_')}.docx"`,
      },
    });
  } catch (error) {
    console.error('Error generating document:', error);
    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 });
  }
}
