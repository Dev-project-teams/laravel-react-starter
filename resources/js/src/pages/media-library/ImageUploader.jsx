"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Trash } from "lucide-react"

export default function ImageUploader() {
  const [images, setImages] = useState([])
  const fileInputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const validImages = files.filter(file => file.type.startsWith("image/"))
    const newImages = validImages.map(file => ({
      file,
      url: URL.createObjectURL(file),
    }))
    setImages(prev => [...prev, ...newImages])
  }

  const handleDelete = (index) => {
    const updatedImages = [...images]
    URL.revokeObjectURL(updatedImages[index].url)
    updatedImages.splice(index, 1)
    setImages(updatedImages)
  }

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  return (
    <div
      className="w-full p-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer text-center"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => fileInputRef.current.click()}
    >
      <p className="text-sm text-muted-foreground">Drag & drop images here or click to upload</p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileInputChange}
      />

      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
          {images.map((img, index) => (
            <Card key={index} className="relative group">
              <CardContent className="p-2">
                <img
                  src={img.url}
                  alt={`upload-${index}`}
                  className="w-full h-40 object-cover rounded-md"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(index)
                  }}
                >
                  <Trash className="w-4 h-4 text-red-500" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
