import React, { useState } from "react";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "../../components/ui/table";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "../../components/ui/select";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "../../components/ui/toggle-group";
import { Check } from "lucide-react";
import UploadDrawer from "./uploader-drawer";

// Dummy image data
const allImages = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    url: `https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-${i % 12}.jpg`,
    uploadedAt: `2024-06-${(i % 28 + 1).toString().padStart(2, "0")}`,
    uploadedBy: `User${i % 5 + 1}`,
    fileSize: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
}));

const MediaLibraryHome = () => {
    const [selected, setSelected] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [view, setView] = useState("table");
    const [copied, setCopied] = useState({ id: null, url: "" });
    const [open, setOpen] = useState(false)

    const startIdx = (page - 1) * perPage;
    const currentPageData = allImages.slice(startIdx, startIdx + perPage);
    const totalPages = Math.ceil(allImages.length / perPage);

    const handleSelectAll = (checked) => {
        setSelected(checked ? currentPageData.map((img) => img.id) : []);
    };

    const handleRowSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };

    const handleBulkDelete = () => {
        alert(`Deleting items: ${selected.join(", ")}`);
        setSelected([]);
    };

    const handleCopyUrl = async (url, id) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied({ id, url });
            setTimeout(() => setCopied({ id: null, url: "" }), 3000);
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    return (
        <div className="p-4 space-y-4">
            {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex gap-4 items-center">
                    <Button
                        variant="destructive"
                        disabled={selected.length === 0}
                        onClick={handleBulkDelete}
                    >
                        Delete Selected ({selected.length})
                    </Button>
                    <ToggleGroup
                        type="single"
                        value={view}
                        onValueChange={(val) => val && setView(val)}
                    >
                        <ToggleGroupItem value="table">List View</ToggleGroupItem>
                        <ToggleGroupItem value="grid">Grid View</ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div className="flex items-center gap-2">
                    <span>Rows per page:</span>
                    <Select
                        value={perPage.toString()}
                        onValueChange={(val) => {
                            setPerPage(parseInt(val));
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-[80px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 10, 20, 30].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                    {num}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <UploadDrawer/>
            </div>

            {/* Table View */}
            {view === "table" ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Checkbox
                                    checked={
                                        selected.length === currentPageData.length &&
                                        currentPageData.length > 0
                                    }
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            <TableHead>Preview</TableHead>
                            <TableHead>Uploaded At</TableHead>
                            <TableHead>Uploaded By</TableHead>
                            <TableHead>File Size</TableHead>
                            <TableHead>URL</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentPageData.map((img) => (
                            <TableRow key={img.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selected.includes(img.id)}
                                        onCheckedChange={() => handleRowSelect(img.id)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <img
                                        src={img.url}
                                        alt={`preview-${img.id}`}
                                        className="w-20 h-14 object-cover rounded"
                                    />
                                </TableCell>
                                <TableCell>{img.uploadedAt}</TableCell>
                                <TableCell>{img.uploadedBy}</TableCell>
                                <TableCell>{img.fileSize}</TableCell>
                                <TableCell>
                                    <a
                                        href={img.url}
                                        className="text-blue-600 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Open
                                    </a>
                                </TableCell>
                                <TableCell className={'w-[15%]'}>
                                    <div className="">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleCopyUrl(img.url, img.id)}
                                        >
                                            {copied.id === img.id ?
                                                <><Check /> Copied</> : "Copy URL"}

                                        </Button>


                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                // Grid View
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {currentPageData.map((img) => (
                        <div key={img.id} className="relative border rounded-lg p-2 space-y-2">
                            {/* Checkbox at top-left */}
                            <Checkbox
                                className="absolute top-3 left-3  z-10 bg-white rounded shadow"
                                checked={selected.includes(img.id)}
                                onCheckedChange={() => handleRowSelect(img.id)}
                            />
                            <img
                                src={img.url}
                                alt={`preview-${img.id}`}
                                className="w-full h-40 object-cover rounded"
                            />
                            <p className="text-sm text-muted-foreground truncate">
                                {img.uploadedBy}
                            </p>
                            <div className="flex justify-between items-center text-xs">
                                <span>{img.uploadedAt}</span>
                                <span>{img.fileSize}</span>
                            </div>
                            <div className="space-y-1">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleCopyUrl(img.url, img.id)}
                                >
                                    {copied.id === img.id ? "Copied" : "Copy URL"}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

            )}

            {/* Pagination */}
            <div className="flex justify-between items-center pt-4">
                <p className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        Prev
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MediaLibraryHome;
