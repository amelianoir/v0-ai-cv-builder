export function generatePDFContent(cvData: any): string {
  const {
    firstName,
    lastName,
    email,
    phone,
    location,
    summary,
    experience,
    education,
    skills,
  } = cvData

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${firstName} ${lastName} - CV</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 20px;
          background: white;
        }
        .container { max-width: 850px; margin: 0 auto; }
        .header {
          text-align: center;
          border-bottom: 2px solid #7c3aed;
          padding-bottom: 15px;
          margin-bottom: 20px;
        }
        .name {
          font-size: 28px;
          font-weight: bold;
          color: #1f2937;
          margin: 0;
        }
        .contact-info {
          font-size: 12px;
          color: #666;
          margin-top: 5px;
        }
        .section {
          margin-bottom: 20px;
        }
        .section-title {
          font-size: 14px;
          font-weight: bold;
          color: #7c3aed;
          text-transform: uppercase;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 8px;
          margin-bottom: 12px;
        }
        .summary {
          font-size: 11px;
          line-height: 1.5;
          color: #555;
        }
        .entry {
          margin-bottom: 15px;
        }
        .entry-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .entry-title {
          font-weight: bold;
          color: #1f2937;
          font-size: 12px;
        }
        .entry-subtitle {
          color: #666;
          font-size: 11px;
          font-style: italic;
        }
        .entry-date {
          font-size: 11px;
          color: #999;
        }
        .entry-description {
          font-size: 11px;
          color: #555;
          margin-top: 4px;
          line-height: 1.4;
        }
        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 11px;
        }
        .skill-tag {
          background: #f3f4f6;
          padding: 4px 8px;
          border-radius: 4px;
          color: #555;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1 class="name">${firstName} ${lastName}</h1>
          <div class="contact-info">
            ${email} • ${phone} • ${location}
          </div>
        </div>

        <!-- Summary -->
        ${
          summary
            ? `
          <div class="section">
            <div class="section-title">Professional Summary</div>
            <div class="summary">${summary}</div>
          </div>
        `
            : ''
        }

        <!-- Experience -->
        ${
          experience && experience.length > 0
            ? `
          <div class="section">
            <div class="section-title">Work Experience</div>
            ${experience
              .map(
                (exp: any) => `
              <div class="entry">
                <div class="entry-header">
                  <div>
                    <div class="entry-title">${exp.position}</div>
                    <div class="entry-subtitle">${exp.company}</div>
                  </div>
                  <div class="entry-date">${exp.startDate} - ${exp.endDate}</div>
                </div>
                <div class="entry-description">${exp.description}</div>
              </div>
            `
              )
              .join('')}
          </div>
        `
            : ''
        }

        <!-- Education -->
        ${
          education && education.length > 0
            ? `
          <div class="section">
            <div class="section-title">Education</div>
            ${education
              .map(
                (edu: any) => `
              <div class="entry">
                <div class="entry-header">
                  <div>
                    <div class="entry-title">${edu.degree} in ${edu.field}</div>
                    <div class="entry-subtitle">${edu.school}</div>
                  </div>
                  <div class="entry-date">${edu.graduationDate}</div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        `
            : ''
        }

        <!-- Skills -->
        ${
          skills && skills.length > 0
            ? `
          <div class="section">
            <div class="section-title">Skills</div>
            <div class="skills-list">
              ${skills.map((skill: string) => `<div class="skill-tag">${skill}</div>`).join('')}
            </div>
          </div>
        `
            : ''
        }
      </div>
    </body>
    </html>
  `
}

export function exportToPDF(cvData: any, filename: string = 'resume.pdf') {
  if (typeof window === 'undefined') return

  const htmlContent = generatePDFContent(cvData)
  const blob = new Blob([htmlContent], { type: 'text/html' })
  const url = URL.createObjectURL(blob)

  // Create iframe to print PDF
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  document.body.appendChild(iframe)

  iframe.onload = () => {
    iframe.contentWindow?.print()
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(iframe)
      URL.revokeObjectURL(url)
    }, 100)
  }
}
