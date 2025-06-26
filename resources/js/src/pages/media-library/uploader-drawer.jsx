"use client"

import { useState } from "react"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "../../components/ui/drawer"
import { Button } from "../../components/ui/button"
import ImageUploader from "./ImageUploader" // your component

export default function UploadDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Upload</Button>
      </DrawerTrigger>
      <DrawerContent className=" h-[90vh]  overflow-y-auto  px-4 py-6">
        <DrawerHeader>
          <DrawerTitle>Upload Images</DrawerTitle>
        </DrawerHeader>
        <ImageUploader />
        <div className="mt-4 flex justify-end gap-3 ">
          <DrawerClose asChild>
            <Button variant="secondary">Cancel </Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="">Upload</Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
