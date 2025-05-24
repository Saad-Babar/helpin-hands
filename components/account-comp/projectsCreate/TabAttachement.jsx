import React, { useState, useEffect } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

const TabAttachment = ({ formData, setFormData, error, setError }) => {
  const { attachments = [] } = formData
  const [selectedFiles, setSelectedFiles] = useState(attachments)

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      attachments: selectedFiles,
    }))
  }, [selectedFiles, setFormData])

  const handleFileChange = async (e) => {
  const files = Array.from(e.target.files)

  const uploadedFiles = await Promise.all(
    files.map(async (file) => {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const data = await res.json()
        if (!res.ok || !data.success) {
          console.error('Upload failed:', data.error || 'Unknown error')
          return null
        }

        return {
          name: data.filename,
          size: file.size,
          type: file.type,
          preview: data.url, // direct public URL to show image from /uploads/food/
        }
      } catch (error) {
        console.error('Upload error:', error)
        return null
      }
    })
  )

  const validFiles = uploadedFiles.filter(Boolean)
  setSelectedFiles((prev) => [...prev, ...validFiles])

  if (validFiles.length > 0) setError(false)
}



  const handleRemoveFile = (index) => {
    const file = selectedFiles[index]
    if (file.preview) URL.revokeObjectURL(file.preview)

    const updatedFiles = selectedFiles.filter((_, i) => i !== index)
    setSelectedFiles(updatedFiles)

    if (updatedFiles.length === 0) setError(true)
  }

  return (
    <section className="step-body mt-4 body current">
      <form id="attachment-tab" onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <div className="mb-5">
            <h2 className="fs-16 fw-bold">Attachments</h2>
            <p className="text-muted">Upload your files here.</p>
          </div>

          <div className="mb-4">
            <label htmlFor="fileUpload" className="form-label">
              Upload Files
            </label>
            <input
              type="file"
              id="fileUpload"
              name="fileUpload"
              multiple
              onChange={handleFileChange}
              className="form-control"
              accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt"
            />
            {error && selectedFiles.length === 0 && (
              <label className="error text-danger d-block mt-1">
                <FiAlertTriangle /> This field is required.
              </label>
            )}
          </div>

          {selectedFiles.length > 0 && (
            <div className="mb-4">
              <h3 className="mb-3">Selected Attachments</h3>
              <ul className="list-group">
                {selectedFiles.map((file, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center flex-column flex-md-row gap-3"
                  >
                    <div className="d-flex align-items-center gap-3">
                      {file.preview ? (
                        <img
                          src={file.preview}
                          alt={file.name}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                          }}
                        />
                      ) : (
                        <span className="fw-semibold">{file.name}</span>
                      )}
                      <span className="text-muted">
                        ({(file.size / 1024).toFixed(2)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveFile(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </fieldset>
      </form>
    </section>
  )
}

export default TabAttachment
