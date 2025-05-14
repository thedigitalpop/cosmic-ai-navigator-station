
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Upload, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useFileUpload } from '@/hooks/use-file-upload';

interface ThumbnailUploaderProps {
  thumbnailUrl: string;
  setThumbnailUrl: (url: string) => void;
}

const ThumbnailUploader: React.FC<ThumbnailUploaderProps> = ({
  thumbnailUrl,
  setThumbnailUrl,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useFileUpload();
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const imageUrl = await uploadImage(file);
      setThumbnailUrl(imageUrl);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Failed to upload image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageRemove = () => {
    setThumbnailUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="block text-white mb-2">Thumbnail Image (16:9 recommended)</label>
      
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      
      {/* Upload UI */}
      <div className="mt-2">
        {thumbnailUrl ? (
          <div className="relative rounded-md overflow-hidden">
            <AspectRatio ratio={16 / 9} className="bg-black/40">
              <img 
                src={thumbnailUrl} 
                alt="Episode thumbnail preview" 
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            </AspectRatio>
            <Button
              variant="destructive"
              size="icon"
              onClick={handleImageRemove}
              className="absolute top-2 right-2 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            onClick={triggerFileInput}
            disabled={isUploading}
            variant="outline"
            className="w-full h-32 border-dashed border-secondary-purple/50 bg-black/20 hover:bg-black/30 text-white"
          >
            <div className="flex flex-col items-center">
              <Upload className="h-6 w-6 mb-2" />
              {isUploading ? 'Uploading...' : 'Click to upload thumbnail image'}
              <p className="text-xs text-white/60 mt-1">PNG, JPG or WebP up to 5MB</p>
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ThumbnailUploader;
