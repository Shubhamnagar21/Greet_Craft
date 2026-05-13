import { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';

const PreviewCanvas = forwardRef(function PreviewCanvas({ template, user }, ref) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useImperativeHandle(ref, () => canvasRef.current);

  useEffect(() => {
    if (!canvasRef.current || !template) return;
    setReady(false);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const config = template.overlayConfig || {};
    const profileCfg = config.profileImage || { x: 0.5, y: 0.75, size: 0.15 };
    const textCfg = config.text || { x: 0.5, y: 0.92, color: '#ffffff', fontSize: 0.04 };

    const bg = new Image();
    bg.crossOrigin = 'anonymous';

    bg.onload = () => {
      canvas.width = bg.width;
      canvas.height = bg.height;
      ctx.drawImage(bg, 0, 0);

      // Bottom gradient for text readability
      const gradH = canvas.height * 0.35;
      const grad = ctx.createLinearGradient(0, canvas.height - gradH, 0, canvas.height);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,0.5)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, canvas.height - gradH, canvas.width, gradH);

      const renderText = () => {
        const name = user?.name || 'Your Name';
        const fontSize = Math.max(18, canvas.width * (textCfg.fontSize || 0.04));
        ctx.font = `600 ${fontSize}px 'Inter', Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 6;
        ctx.fillStyle = textCfg.color || '#ffffff';
        ctx.fillText(name, canvas.width * textCfg.x, canvas.height * textCfg.y);
        ctx.shadowColor = 'transparent';
        setReady(true);
      };

      if (user?.profileImage) {
        const profImg = new Image();
        profImg.crossOrigin = 'anonymous';
        profImg.onload = () => {
          const size = canvas.width * profileCfg.size;
          const cx = canvas.width * profileCfg.x;
          const cy = canvas.height * profileCfg.y;

          // White ring
          ctx.beginPath();
          ctx.arc(cx, cy, size / 2 + 3, 0, Math.PI * 2);
          ctx.fillStyle = 'white';
          ctx.fill();

          // Clip and draw profile
          ctx.save();
          ctx.beginPath();
          ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(profImg, cx - size / 2, cy - size / 2, size, size);
          ctx.restore();
          renderText();
        };
        profImg.onerror = renderText;
        profImg.src = user.profileImage;
      } else {
        // Placeholder circle with initial
        const size = canvas.width * profileCfg.size;
        const cx = canvas.width * profileCfg.x;
        const cy = canvas.height * profileCfg.y;

        ctx.beginPath();
        ctx.arc(cx, cy, size / 2 + 3, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = '#4f46e5';
        ctx.fill();

        const initial = (user?.name || 'U').charAt(0).toUpperCase();
        ctx.font = `700 ${size * 0.4}px 'Inter', Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.fillText(initial, cx, cy);
        renderText();
      }
    };

    bg.onerror = () => setReady(true);
    bg.src = template.imageUrl;
  }, [template, user]);

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: 'auto', borderRadius: 14, display: ready ? 'block' : 'none', maxHeight: '70vh', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
      />
      {!ready && <div className="skeleton" style={{ aspectRatio: '4/5', maxHeight: '70vh', borderRadius: 14 }} />}
    </div>
  );
});

export default PreviewCanvas;
