import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import mockMediaFiles from "./media.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Upload,
  Search,
  Grid3X3,
  List,
  Filter,
  Download,
  Eye,
  Edit3,
  Trash2,
  MoreVertical,
  File,
  FileImage,
  FileVideo,
  FileText,
  Music,
} from "lucide-react";
import { Pagination } from "@/components/global/Pagination";
import Image from "next/image";
import { IconTrash } from "@tabler/icons-react";

// Media type definitions
interface MediaFile {
  id: number;
  name: string;
  type: "image" | "video" | "document" | "audio";
  size: string;
  uploadDate: string;
  url: string;
  thumbnail?: string;
  dimensions?: string;
  duration?: string;
}

export default function MediaPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());

  // Filter and search logic
  const filteredFiles = useMemo(() => {
    return mockMediaFiles.filter((file) => {
      const matchesSearch = file.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType = filterType === "all" || file.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  // Pagination
  const paginatedFiles = filteredFiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // File type icon helper
  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <FileImage className="w-5 h-5" />;
      case "video":
        return <FileVideo className="w-5 h-5" />;
      case "audio":
        return <Music className="w-5 h-5" />;
      case "document":
        return <FileText className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  // File type badge color
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "image":
        return "bg-blue-100 text-blue-800";
      case "video":
        return "bg-purple-100 text-purple-800";
      case "audio":
        return "bg-green-100 text-green-800";
      case "document":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle image loading error
  const handleImageError = (fileId: number) => {
    setBrokenImages((prev) => new Set(prev).add(fileId));
  };

  // Handle file upload
  const handleFileUpload = () => {
    // This would typically open a file picker or upload modal
    alert("อัปโหลดไฟล์ - ฟีเจอร์นี้จะถูกพัฒนาต่อไป");
  };

  return (
    <div className="flex flex-1 flex-col bg-white px-4 lg:px-12">
      <div className="mt-4 space-y-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
            สื่อทั้งหมด
          </h1>
          <Button onClick={handleFileUpload} className="bg-[#0F5F4D]">
            <Upload className="w-4 h-4" />
            อัปโหลดไฟล์
          </Button>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-2 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="ค้นหาไฟล์..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="ประเภทไฟล์" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="image">รูปภาพ</SelectItem>
                <SelectItem value="video">วิดีโอ</SelectItem>
                <SelectItem value="document">เอกสาร</SelectItem>
                <SelectItem value="audio">เสียง</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Media Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-4">
            {paginatedFiles.map((file) => (
              <div
                key={file.id}
                className="cursor-pointer transition-all group relative"
              >
                <div className="p-0">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden relative">
                    {file.type === "image" && file.thumbnail ? (
                      brokenImages.has(file.id) ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <FileImage className="w-8 h-8 text-gray-400" />
                        </div>
                      ) : (
                        <Image
                          src={file.thumbnail}
                          alt={file.name}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(file.id)}
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>
                    )}
                    {/* Hover overlay with preview button */}
                    <div className="absolute inset-0  bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <IconTrash className="w-5 h-5 text-white top-2 right-2 absolute hover:text-gray-200" />
                      <Button
                        size="sm"
                        className="bg-white text-highlight hover:bg-gray-200 bottom-3 absolute cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {paginatedFiles.map((file) => (
              <Card
                key={file.id}
                className="transition-all hover:shadow-sm group"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Thumbnail/Icon */}
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                      {file.type === "image" && file.thumbnail ? (
                        brokenImages.has(file.id) ? (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <FileImage className="w-6 h-6 text-gray-400" />
                          </div>
                        ) : (
                          <Image
                            src={file.thumbnail}
                            alt={file.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(file.id)}
                          />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {getFileIcon(file.type)}
                        </div>
                      )}
                      {/* Hover overlay for list view thumbnail */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <Button
                          size="sm"
                          className="bg-white text-black hover:bg-gray-100 text-xs p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Preview ${file.name}`);
                          }}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <Badge
                          className={`text-xs ${getTypeBadgeColor(file.type)}`}
                        >
                          {file.type}
                        </Badge>
                        <span>{file.size}</span>
                        <span>{file.uploadDate}</span>
                        {file.dimensions && <span>{file.dimensions}</span>}
                        {file.duration && <span>{file.duration}</span>}
                      </div>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          ดูรายละเอียด
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          ดาวน์โหลด
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit3 className="w-4 h-4 mr-2" />
                          แก้ไข
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          ลบ
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <File className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              ไม่พบไฟล์
            </h3>
            <p className="text-gray-500 mb-4">
              {searchQuery
                ? "ไม่พบไฟล์ที่ตรงกับการค้นหา"
                : "ยังไม่มีไฟล์ในระบบ"}
            </p>
            <Button onClick={handleFileUpload} className="bg-[#0F5F4D]">
              <Upload className="w-4 h-4" />
              อัปโหลดไฟล์แรก
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filteredFiles.length > 0 && (
          <Pagination
            total={filteredFiles.length}
            page={currentPage}
            pageSize={itemsPerPage}
            onPageChange={setCurrentPage}
            onPageSizeChange={setItemsPerPage}
            pageSizeOptions={[16, 32, 48, 96]}
          />
        )}
      </div>
    </div>
  );
}
