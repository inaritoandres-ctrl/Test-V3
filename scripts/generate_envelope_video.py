import math
import os
import random
import subprocess
import shutil

WIDTH = 540
HEIGHT = 960
FPS = 30
DURATION = 4.8  # seconds
TOTAL_FRAMES = int(FPS * DURATION)

CX = WIDTH / 2
CY = HEIGHT / 2

# Crack definitions for the wax seal
random.seed(42)
NUM_SHARDS = 14
shard_angles = [i * (2 * math.pi / NUM_SHARDS) + random.uniform(-0.1, 0.1) for i in range(NUM_SHARDS)]

# Detailed damask/lace pattern in SVG
LACE_PATTERN = """
<pattern id="lace" width="60" height="60" patternUnits="userSpaceOnUse">
  <path d="M 30 0 C 25 15 15 25 0 30 C 15 35 25 45 30 60 C 35 45 45 35 60 30 C 45 25 35 15 30 0 Z" fill="none" stroke="#ffffff" stroke-width="0.75" opacity="0.32"/>
  <circle cx="30" cy="30" r="10" fill="none" stroke="#ffffff" stroke-width="0.6" stroke-dasharray="2,2" opacity="0.28"/>
  <circle cx="0" cy="0" r="8" fill="none" stroke="#ffffff" stroke-width="0.6" opacity="0.25"/>
  <circle cx="60" cy="0" r="8" fill="none" stroke="#ffffff" stroke-width="0.6" opacity="0.25"/>
  <circle cx="0" cy="60" r="8" fill="none" stroke="#ffffff" stroke-width="0.6" opacity="0.25"/>
  <circle cx="60" cy="60" r="8" fill="none" stroke="#ffffff" stroke-width="0.6" opacity="0.25"/>
  <path d="M 30 18 Q 30 30 18 30 Q 30 30 30 42 Q 30 30 42 30 Q 30 30 30 18 Z" fill="#ffffff" opacity="0.16"/>
  <path d="M 12 12 Q 20 20 12 28 Q 4 20 12 12 Z" fill="none" stroke="#ffffff" stroke-width="0.5" opacity="0.2"/>
  <path d="M 48 12 Q 56 20 48 28 Q 40 20 48 12 Z" fill="none" stroke="#ffffff" stroke-width="0.5" opacity="0.2"/>
  <path d="M 12 48 Q 20 40 12 32 Q 4 40 12 48 Z" fill="none" stroke="#ffffff" stroke-width="0.5" opacity="0.2"/>
  <path d="M 48 48 Q 56 40 48 32 Q 40 40 48 48 Z" fill="none" stroke="#ffffff" stroke-width="0.5" opacity="0.2"/>
</pattern>
"""

ROSE_PATH = """
<g id="rose_emblem">
  <!-- Rose center spiral & petals -->
  <path d="M 0,-15 C -4,-15 -8,-10 -6,-4 C -4,2 4,2 6,-2 C 8,-6 2,-10 -1,-9 C -3,-8 -4,-5 -2,-3 C 0,-1 2,-2 2,-3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M -8,-6 C -14,-4 -16,4 -10,10 C -5,14 4,14 10,8 C 16,2 14,-6 8,-9" fill="none" stroke="currentColor" stroke-width="2.0" stroke-linecap="round"/>
  <path d="M -14,2 C -20,10 -14,20 -4,22 C 8,24 18,18 20,6 C 22,-4 14,-14 2,-16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M -20,8 C -26,18 -18,28 -4,30 C 12,32 26,22 26,4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <!-- Leaves and stem -->
  <path d="M 0,26 Q -4,42 -10,54" fill="none" stroke="currentColor" stroke-width="2.0" stroke-linecap="round"/>
  <path d="M -4,36 Q -16,32 -22,38 Q -16,44 -6,40 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M -6,44 Q 8,46 14,40 Q 6,36 -2,42 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M -9,48 Q -20,52 -22,60 Q -12,60 -8,52 Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
</g>
"""

def generate_svg_frame(frame_idx):
    t = frame_idx / FPS
    
    # Progress variables
    glow_progress = 0.0
    shatter_progress = 0.0
    open_progress = 0.0
    whiteout_progress = 0.0
    
    if t > 0.8:
        # Glow builds up from 0.8s to 2.2s
        glow_progress = min(1.0, (t - 0.8) / 1.4)
    if t > 2.2:
        # Shatter occurs from 2.2s to 3.0s
        shatter_progress = min(1.0, (t - 2.2) / 0.8)
    if t > 2.8:
        # Envelope flaps open from 2.8s to 4.2s
        open_progress = min(1.0, (t - 2.8) / 1.4)
    if t > 3.8:
        # Whiteout from 3.8s to 4.8s
        whiteout_progress = min(1.0, (t - 3.8) / 0.9)
        
    # Easing
    open_ease = open_progress * open_progress * (3 - 2 * open_progress)
    
    # Flap offsets based on open_ease
    # Top flap folds up
    top_y = -open_ease * 520
    # Bottom flap folds down
    bottom_y = open_ease * 520
    # Left flap folds left
    left_x = -open_ease * 320
    # Right flap folds right
    right_x = open_ease * 320
    
    # Glow color calculation
    glow_opacity = glow_progress * (1.0 - whiteout_progress)
    gold_color = f"rgba(255, 205, 75, {0.2 + 0.8 * glow_progress})"
    rose_stroke = f"rgb({int(190 + 65*glow_progress)}, {int(180 + 35*glow_progress)}, {int(165 - 120*glow_progress)})" if glow_progress > 0 else "#9e968b"
    if glow_progress > 0.5:
        rose_stroke = f"rgb(255, {int(240 - 20*(glow_progress-0.5)*2)}, {int(120 - 70*(glow_progress-0.5)*2)})"

    # SVG construction
    svg_parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}">',
        '<defs>',
        LACE_PATTERN,
        ROSE_PATH,
        # Gradients
        '<linearGradient id="paperGrad" x1="0" y1="0" x2="1" y2="1">',
        '  <stop offset="0%" stop-color="#b6c7d1"/>',
        '  <stop offset="50%" stop-color="#a2b6c3"/>',
        '  <stop offset="100%" stop-color="#93a8b6"/>',
        '</linearGradient>',
        '<linearGradient id="innerCardGrad" x1="0" y1="0" x2="0" y2="1">',
        '  <stop offset="0%" stop-color="#fdfcf9"/>',
        '  <stop offset="100%" stop-color="#f4f0e6"/>',
        '</linearGradient>',
        '<radialGradient id="waxGrad" cx="38%" cy="35%" r="65%">',
        '  <stop offset="0%" stop-color="#ffffff"/>',
        '  <stop offset="60%" stop-color="#f5f2eb"/>',
        '  <stop offset="90%" stop-color="#e2ded4"/>',
        '  <stop offset="100%" stop-color="#cfc9bd"/>',
        '</radialGradient>',
        '<radialGradient id="lightBurst" cx="50%" cy="50%" r="50%">',
        f'  <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>',
        f'  <stop offset="40%" stop-color="#fff8eb" stop-opacity="{min(1.0, 0.9 + open_ease*0.1)}"/>',
        f'  <stop offset="75%" stop-color="#ffdf94" stop-opacity="{0.7 * (1.0-whiteout_progress*0.5)}"/>',
        f'  <stop offset="100%" stop-color="#ffce66" stop-opacity="0"/>',
        '</radialGradient>',
        '<filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">',
        '  <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#3d4f5c" flood-opacity="0.25"/>',
        '</filter>',
        '<filter id="glowFilter" x="-40%" y="-40%" width="180%" height="180%">',
        f'  <feGaussianBlur stdDeviation="{4 + glow_progress * 10}" result="blur"/>',
        '  <feComposite in="SourceGraphic" in2="blur" operator="over"/>',
        '</filter>',
        '</defs>',
        # Background canvas
        f'<rect width="{WIDTH}" height="{HEIGHT}" fill="#0f1721"/>'
    ]
    
    # Inner light / letter behind the flaps (revealed as flaps open)
    if open_progress > 0:
        card_w = 460
        card_h = 760
        card_x = (WIDTH - card_w) / 2
        card_y = (HEIGHT - card_h) / 2
        svg_parts.append(f'<g filter="url(#shadow)">')
        svg_parts.append(f'  <rect x="{card_x}" y="{card_y}" width="{card_w}" height="{card_h}" rx="12" fill="url(#innerCardGrad)"/>')
        svg_parts.append(f'  <rect x="{card_x+16}" y="{card_y+16}" width="{card_w-32}" height="{card_h-32}" rx="8" fill="none" stroke="#d5c8b0" stroke-width="1.5" opacity="0.6"/>')
        svg_parts.append(f'</g>')
        
        # Central burst of radiant light
        burst_r = 120 + open_ease * 600
        svg_parts.append(f'<circle cx="{CX}" cy="{CY}" r="{burst_r}" fill="url(#lightBurst)" opacity="{min(1.0, open_ease * 1.5)}"/>')
        
        # Light rays radiating outwards
        num_rays = 18
        svg_parts.append(f'<g opacity="{min(1.0, open_ease * 1.8 * (1.0 - whiteout_progress * 0.7))}">')
        for r_idx in range(num_rays):
            angle = r_idx * (2 * math.pi / num_rays) + (t * 0.4)
            ray_len = 500 + open_ease * 400
            p1_x = CX + math.cos(angle - 0.08) * 30
            p1_y = CY + math.sin(angle - 0.08) * 30
            p2_x = CX + math.cos(angle + 0.08) * 30
            p2_y = CY + math.sin(angle + 0.08) * 30
            p3_x = CX + math.cos(angle) * ray_len
            p3_y = CY + math.sin(angle) * ray_len
            svg_parts.append(f'  <polygon points="{p1_x:.1f},{p1_y:.1f} {p2_x:.1f},{p2_y:.1f} {p3_x:.1f},{p3_y:.1f}" fill="#ffffff" opacity="{0.45 + (r_idx % 3)*0.15}"/>')
        svg_parts.append('</g>')

    # Four envelope flaps with lace texture and paper shading
    # 1. Left flap
    svg_parts.append(f'<g transform="translate({left_x:.1f}, 0)">')
    svg_parts.append(f'  <polygon points="0,0 {CX:.1f},{CY:.1f} 0,{HEIGHT}" fill="url(#paperGrad)"/>')
    svg_parts.append(f'  <polygon points="0,0 {CX:.1f},{CY:.1f} 0,{HEIGHT}" fill="url(#lace)"/>')
    svg_parts.append(f'  <line x1="0" y1="0" x2="{CX:.1f}" y2="{CY:.1f}" stroke="#485c69" stroke-width="1.8" opacity="0.35"/>')
    svg_parts.append(f'  <line x1="0" y1="{HEIGHT}" x2="{CX:.1f}" y2="{CY:.1f}" stroke="#485c69" stroke-width="1.8" opacity="0.35"/>')
    svg_parts.append('</g>')
    
    # 2. Right flap
    svg_parts.append(f'<g transform="translate({right_x:.1f}, 0)">')
    svg_parts.append(f'  <polygon points="{WIDTH},0 {CX:.1f},{CY:.1f} {WIDTH},{HEIGHT}" fill="url(#paperGrad)"/>')
    svg_parts.append(f'  <polygon points="{WIDTH},0 {CX:.1f},{CY:.1f} {WIDTH},{HEIGHT}" fill="url(#lace)"/>')
    svg_parts.append(f'  <line x1="{WIDTH}" y1="0" x2="{CX:.1f}" y2="{CY:.1f}" stroke="#485c69" stroke-width="1.8" opacity="0.35"/>')
    svg_parts.append(f'  <line x1="{WIDTH}" y1="{HEIGHT}" x2="{CX:.1f}" y2="{CY:.1f}" stroke="#485c69" stroke-width="1.8" opacity="0.35"/>')
    svg_parts.append('</g>')
    
    # 3. Bottom flap
    svg_parts.append(f'<g transform="translate(0, {bottom_y:.1f})">')
    svg_parts.append(f'  <polygon points="0,{HEIGHT} {CX:.1f},{CY:.1f} {WIDTH},{HEIGHT}" fill="url(#paperGrad)"/>')
    svg_parts.append(f'  <polygon points="0,{HEIGHT} {CX:.1f},{CY:.1f} {WIDTH},{HEIGHT}" fill="url(#lace)"/>')
    svg_parts.append(f'  <line x1="0" y1="{HEIGHT}" x2="{CX:.1f}" y2="{CY:.1f}" stroke="#ffffff" stroke-width="1.2" opacity="0.4"/>')
    svg_parts.append(f'  <line x1="{WIDTH}" y1="{HEIGHT}" x2="{CX:.1f}" y2="{CY:.1f}" stroke="#ffffff" stroke-width="1.2" opacity="0.4"/>')
    svg_parts.append('</g>')
    
    # 4. Top flap
    svg_parts.append(f'<g transform="translate(0, {top_y:.1f})">')
    svg_parts.append(f'  <polygon points="0,0 {WIDTH},0 {CX:.1f},{CY:.1f}" fill="url(#paperGrad)"/>')
    svg_parts.append(f'  <polygon points="0,0 {WIDTH},0 {CX:.1f},{CY:.1f}" fill="url(#lace)"/>')
    svg_parts.append(f'  <line x1="0" y1="0" x2="{CX:.1f}" y2="{CY:.1f}" stroke="#2d3d49" stroke-width="2.2" opacity="0.45"/>')
    svg_parts.append(f'  <line x1="{WIDTH}" y1="0" x2="{CX:.1f}" y2="{CY:.1f}" stroke="#2d3d49" stroke-width="2.2" opacity="0.45"/>')
    svg_parts.append('</g>')

    # Wax seal & shards
    if shatter_progress < 1.0 or open_progress < 0.8:
        seal_opacity = max(0.0, 1.0 - open_ease * 1.6)
        svg_parts.append(f'<g opacity="{seal_opacity:.3f}">')
        
        # If shattered, draw separating shards!
        if shatter_progress > 0:
            shatter_ease = shatter_progress * shatter_progress
            for i in range(NUM_SHARDS):
                ang1 = shard_angles[i]
                ang2 = shard_angles[(i + 1) % NUM_SHARDS]
                if ang2 < ang1:
                    ang2 += 2 * math.pi
                mid_ang = (ang1 + ang2) / 2
                dist = shatter_ease * (35 + (i % 3) * 20) + (open_ease * 250)
                dx = math.cos(mid_ang) * dist
                dy = math.sin(mid_ang) * dist
                rot = shatter_ease * ((i % 5) - 2) * 45
                
                # Wax shard shape
                r_in = 10
                r_out = 68 + (math.sin(i * 1.7) * 6)
                p0_x = CX + dx
                p0_y = CY + dy
                p1_x = CX + dx + math.cos(ang1) * r_out
                p1_y = CY + dy + math.sin(ang1) * r_out
                p2_x = CX + dx + math.cos(mid_ang) * (r_out + 3)
                p2_y = CY + dy + math.sin(mid_ang) * (r_out + 3)
                p3_x = CX + dx + math.cos(ang2) * r_out
                p3_y = CY + dy + math.sin(ang2) * r_out
                
                svg_parts.append(f'<g transform="rotate({rot:.1f}, {CX+dx:.1f}, {CY+dy:.1f})">')
                svg_parts.append(f'  <path d="M {p0_x:.1f} {p0_y:.1f} L {p1_x:.1f} {p1_y:.1f} Q {p2_x:.1f} {p2_y:.1f} {p3_x:.1f} {p3_y:.1f} Z" fill="url(#waxGrad)" stroke="#c2bbb0" stroke-width="1.2"/>')
                svg_parts.append('</g>')
                
            # Golden/white light pouring from center fracture
            crack_glow_r = 30 + shatter_ease * 80
            svg_parts.append(f'<circle cx="{CX}" cy="{CY}" r="{crack_glow_r}" fill="#ffffff" filter="url(#glowFilter)" opacity="{min(1.0, shatter_progress * 1.4)}"/>')
            svg_parts.append(f'<circle cx="{CX}" cy="{CY}" r="{crack_glow_r * 1.5}" fill="#ffd573" filter="url(#glowFilter)" opacity="{min(1.0, shatter_progress * 0.9)}"/>')
        else:
            # Whole intact wax seal
            svg_parts.append(f'<g filter="url(#shadow)">')
            # Outer organic wax shape (wavy circumference)
            d_wax = []
            for deg in range(0, 360, 15):
                rad = math.radians(deg)
                r_w = 68 + math.sin(rad * 5) * 3.5 + math.cos(rad * 3) * 2.5
                px = CX + math.cos(rad) * r_w
                py = CY + math.sin(rad) * r_w
                if deg == 0:
                    d_wax.append(f"M {px:.1f} {py:.1f}")
                else:
                    d_wax.append(f"L {px:.1f} {py:.1f}")
            d_wax.append("Z")
            wax_path_str = " ".join(d_wax)
            
            svg_parts.append(f'  <path d="{wax_path_str}" fill="url(#waxGrad)" stroke="#ded9ce" stroke-width="2"/>')
            # Inner indented well
            svg_parts.append(f'  <circle cx="{CX}" cy="{CY}" r="50" fill="#ebe6dc" stroke="#d5cebf" stroke-width="1.5"/>')
            
            # Glow behind the rose when glowing
            if glow_progress > 0:
                glow_r = 46
                svg_parts.append(f'  <circle cx="{CX}" cy="{CY}" r="{glow_r}" fill="#ffe599" opacity="{glow_progress * 0.85:.3f}" filter="url(#glowFilter)"/>')
                svg_parts.append(f'  <circle cx="{CX}" cy="{CY}" r="32" fill="#fff5cc" opacity="{glow_progress * 0.95:.3f}"/>')
                
                # Twinkle sparkles around seal
                for s_i in range(8):
                    s_ang = s_i * (math.pi / 4) + t * 0.5
                    s_dist = 62 + math.sin(t * 4 + s_i) * 10
                    s_x = CX + math.cos(s_ang) * s_dist
                    s_y = CY + math.sin(s_ang) * s_dist
                    s_size = (math.sin(t * 8 + s_i * 2) * 0.5 + 0.5) * (3.5 * glow_progress)
                    if s_size > 0.5:
                        svg_parts.append(f'  <polygon points="{s_x},{s_y-s_size} {s_x+s_size*0.4},{s_y-s_size*0.4} {s_x+s_size},{s_y} {s_x+s_size*0.4},{s_y+s_size*0.4} {s_x},{s_y+s_size} {s_x-s_size*0.4},{s_y+s_size*0.4} {s_x-s_size},{s_y} {s_x-s_size*0.4},{s_y-s_size*0.4}" fill="#ffffff" opacity="{glow_progress*0.9:.2f}"/>')
            
            # The embossed rose
            svg_parts.append(f'  <g transform="translate({CX}, {CY-6}) scale(0.95)" color="{rose_stroke}">')
            svg_parts.append('    <use href="#rose_emblem"/>')
            svg_parts.append('  </g>')
            svg_parts.append('</g>')
            
        svg_parts.append('</g>')

    # Pure whiteout transition towards the end of the video
    if whiteout_progress > 0:
        wo_ease = whiteout_progress * whiteout_progress
        svg_parts.append(f'<rect width="{WIDTH}" height="{HEIGHT}" fill="#ffffff" opacity="{wo_ease:.3f}"/>')
        # Center super-nova
        svg_parts.append(f'<circle cx="{CX}" cy="{CY}" r="{HEIGHT * wo_ease}" fill="#ffffff"/>')

    svg_parts.append('</svg>')
    return "\n".join(svg_parts)

def main():
    frames_dir = "/tmp/envelope_frames"
    if os.path.exists(frames_dir):
        shutil.rmtree(frames_dir)
    os.makedirs(frames_dir, exist_ok=True)
    
    print(f"Generating {TOTAL_FRAMES} frames...")
    for idx in range(TOTAL_FRAMES):
        svg_code = generate_svg_frame(idx)
        frame_file = os.path.join(frames_dir, f"frame_{idx:04d}.svg")
        with open(frame_file, "w", encoding="utf-8") as f:
            f.write(svg_code)
            
    # Also save the exact frame 0 as static envelope image!
    os.makedirs("src/assets/images", exist_ok=True)
    os.makedirs("src/assets/videos", exist_ok=True)
    
    print("Rendering frame 0 to src/assets/images/envelope-closed.png...")
    subprocess.run([
        "ffmpeg", "-y", "-i", os.path.join(frames_dir, "frame_0000.svg"),
        "-frames:v", "1", "src/assets/images/envelope-closed.png"
    ], check=True)
    
    print("Encoding video to src/assets/videos/envelope-open.mp4...")
    subprocess.run([
        "ffmpeg", "-y",
        "-framerate", str(FPS),
        "-i", os.path.join(frames_dir, "frame_%04d.svg"),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "fast",
        "-crf", "20",
        "-movflags", "+faststart",
        "src/assets/videos/envelope-open.mp4"
    ], check=True)
    
    print("Cleaning up frames...")
    shutil.rmtree(frames_dir)
    print("Done! Generated envelope-closed.png and envelope-open.mp4 successfully.")

if __name__ == "__main__":
    main()
