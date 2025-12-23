'use client';

import { useState, useRef, useEffect } from 'react';

interface ImageCropperProps {
  imageFile: File;
  aspectRatio?: number; // e.g., 16/9
  onCropComplete: (croppedFile: File) => void;
  onCancel: () => void;
}

export default function ImageCropper({ 
  imageFile, 
  aspectRatio = 16 / 9, 
  onCropComplete, 
  onCancel 
}: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [processing, setProcessing] = useState(false);

  // Load image
  useEffect(() => {
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);
    img.onload = () => {
      setImage(img);
      // Initial fit logic could go here if needed
    };
    return () => URL.revokeObjectURL(img.src);
  }, [imageFile]);

  // Draw to canvas
  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save context state handling transforms
    ctx.save();
    
    // Center alignment
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.translate(centerX, centerY);
    ctx.scale(scale, scale);
    ctx.translate(position.x, position.y);
    
    // Draw image centered at origin
    ctx.drawImage(
      image, 
      -image.width / 2, 
      -image.height / 2
    );
    
    ctx.restore();
    
  }, [image, scale, position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    // Calculate raw new position based on scaled movement might be tricky visually, 
    // but typically we just map mouse delta to translation delta.
    // However, since we translate *inside* the scale transform in the draw function,
    // we need to adjust for scale if we want 1:1 mouse movement feeling, OR change transform order.
    // Let's keep it simple: Drag delta = Position delta. 
    // Wait, in the draw function: translate(pos.x, pos.y) is INSIDE scale. 
    // So 1px change in pos.x = 1px * scale change in visual pixels.
    // To make mouse follow content under cursor, we should divide delta by scale.
    
    // BUT, actually logic above: translate(center)... scale... translate(pos). 
    // So pos is in "unscaled local image space" effectively? No.
    // Standard approach: Translate(x,y) -> Scale(s,s). Then dx affects screen by dx.
    // My draw stack: Translate(Center) -> Scale -> Translate(Pos).
    // So Pos is in SCALED coordinates relative to center?
    // Let's refine the draw stack for standard pan/zoom behavior.
    
    // Better Draw Stack:
    // Translate(CenterX + PositionX, CenterY + PositionY)
    // Scale(Scale)
    // DrawImage(-W/2, -H/2)
    // This way PositionX/Y are screen-space offsets from center.
    
    // Let's adapt handleMouseMove simply:
    setPosition({ 
        x: e.clientX - dragStart.x, 
        y: e.clientY - dragStart.y 
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Fixed Canvas Size (Display)
  const CANVAS_WIDTH = 800; // Visual width
  const CANVAS_HEIGHT = CANVAS_WIDTH / aspectRatio;

  const handleCrop = async () => {
    if (!image || !canvasRef.current) return;
    setProcessing(true);

    try {
      // Create a temporary canvas for the final high-res output
      // We want to capture exactly what is visible in the viewport (CANVAS_WIDTH x CANVAS_HEIGHT)
      // mapped to the source image.
      
      const outputCanvas = document.createElement('canvas');
      outputCanvas.width = 1920; // High res targets
      outputCanvas.height = 1920 / aspectRatio;
      
      const ctx = outputCanvas.getContext('2d');
      if (!ctx) return;
      
      // We need to render the same scene but scaled up to output size.
      // Visual Ratio: OutputWidth / CanvasWidth
      const outputScaleFactor = outputCanvas.width / CANVAS_WIDTH;
      
      // Replicate the draw logic
      const centerX = outputCanvas.width / 2;
      const centerY = outputCanvas.height / 2;
      
      ctx.fillStyle = '#000'; // Background for safety
      ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
      
      ctx.translate(centerX, centerY);
      // Only difference: position needs to be scaled up because it was in screen pixels
      // And we check the draw logic below.
      
      // WAIT. I need to fix the main draw logic first to be consistent.
      // Let's fix the useEffect one first to match the "Screen Space Pan" model.
    } catch (e) {
      console.error(e);
    }
  };

  // --- REFINED DRAW LOGIC ---
  // We want the user to pan the IMAGE around the fixed frame.
  // Frame is CANVAS_WIDTH x CANVAS_HEIGHT.
  
  // Actually easiest way for cropping is to draw what is on the visible canvas directly to a blob?
  // But the visible canvas might be low res (800px). We might want higher res.
  // If 800px is enough for "preview" but user wants 1920px bg.
  
  // Let's stick to a robust simpler logic:
  // Render function taking a destination canvas and scaling parameter.
  const renderImage = (canvas: HTMLCanvasElement, destWidth: number) => {
     const ctx = canvas.getContext('2d');
     if(!ctx || !image) return;
     
     const destHeight = destWidth / aspectRatio;
     canvas.width = destWidth;
     canvas.height = destHeight;
     
     // Clear
     ctx.clearRect(0,0, destWidth, destHeight);
     
     const centerX = destWidth / 2;
     const centerY = destHeight / 2;
     
     ctx.save();
     ctx.translate(centerX, centerY);
     
     // Position is stored in "Preview Canvas Pixels".
     // We need to scale the position delta for the destination size.
     const ratio = destWidth / CANVAS_WIDTH;
     
     ctx.translate(position.x * ratio, position.y * ratio);
     ctx.scale(scale * ratio, scale * ratio);
     
     ctx.drawImage(image, -image.width/2, -image.height/2);
     ctx.restore();
  }

  // Update Main Canvas
  useEffect(() => {
    if(canvasRef.current && image) {
        renderImage(canvasRef.current, CANVAS_WIDTH);
    }
  }, [image, scale, position, CANVAS_WIDTH]); // Add dependencies

  const executeCrop = () => {  
    if(!image) return;
    setProcessing(true);
    
    // Generate high-res output
    const outputCanvas = document.createElement('canvas');
    renderImage(outputCanvas, 1920); // Render at 1920px width
    
    outputCanvas.toBlob((blob) => {
        if(blob) {
            const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
            onCropComplete(file);
        }
        setProcessing(false);
    }, 'image/jpeg', 0.9);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <div className="bg-[#1c2621] border border-[#293830] rounded-lg p-6 w-full max-w-5xl flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Adjust Image</h3>
            <button onClick={onCancel} className="text-[#9eb7ab] hover:text-white">
                <span className="material-symbols-outlined">close</span>
            </button>
        </div>

        {/* Canvas Container */}
        <div className="relative w-full overflow-hidden bg-[#111714] border border-[#293830] rounded flex justify-center items-center" 
             style={{ height: '500px', cursor: isDragging ? 'grabbing' : 'grab' }}>
           <canvas
             ref={canvasRef}
             onMouseDown={handleMouseDown}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}
             onMouseLeave={handleMouseUp}
             // Touch support
             onTouchStart={(e) => {
                const touch = e.touches[0];
                handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY } as any);
             }}
             onTouchMove={(e) => {
                const touch = e.touches[0];
                handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY } as any);
             }}
             onTouchEnd={handleMouseUp}
           />
           {/* Overlay to indicate crop area? The canvas IS the crop area technically here to keep it simple.*/}
        </div>

        {/* Controls */}
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <span className="text-sm text-[#9eb7ab]">Zoom</span>
                <input 
                  type="range" 
                  min="0.1" 
                  max="3" 
                  step="0.1" 
                  value={scale} 
                  onChange={e => setScale(parseFloat(e.target.value))}
                  className="flex-1 accent-[#19b366]"
                />
                <span className="text-sm font-mono text-white w-12 text-right">{(scale * 100).toFixed(0)}%</span>
            </div>
            
            <p className="text-xs text-[#9eb7ab]/60 text-center">
                Drag image to position. Use slider to zoom.
            </p>

            <div className="flex gap-3 justify-end pt-4 border-t border-[#293830]">
                <button 
                  onClick={onCancel}
                  className="px-4 py-2 bg-[#293830] text-[#9eb7ab] rounded hover:bg-[#111714] hover:text-white font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={executeCrop}
                  disabled={processing}
                  className="px-6 py-2 bg-[#19b366] text-[#112119] font-bold rounded hover:bg-[#159655] disabled:opacity-50 flex items-center gap-2"
                >
                  {processing ? 'Processing...' : 'Apply & Upload'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
