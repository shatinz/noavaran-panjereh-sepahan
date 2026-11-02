"""
TS143 Lift & Slide Architectural 3D Scene Builder & Chapter Walkthrough
========================================================================
Generates an authentic, engineering-grounded 3D architectural model of the
AKPAi TS143 Lift & Slide thermal-break sliding door/window system.

Key Engineering & Technical Grounding (AKPAi 2023-2024 Catalogue p.35 & Evidence):
- Frame Depth: 143 mm
- Sash Depth: 70 mm
- Aluminium Profile Wall Thickness: 2.0 - 2.2 mm (multi-chamber hollow extrusions)
- Polyamide Thermal Barriers: 18 / 24 / 38 mm options
- Glazing Envelope: 28 - 52 mm (modeled as variable schematic glazing envelope)
- Frame Thermal Transmittance: Uf = 3.2 W/(m²·K)
- Corner Joinery: Riveted corner fixture; cleat and fastener layout is an illustrative visual interpretation
- Compatible European Lift-Slide Hardware: 300 - 400 kg class fittings
- Sealing: EPDM gaskets and central interlock; detailed seal-lip geometry is illustrative

Outputs:
- assets/source/ts143.blend (Full Blender scene with hierarchy, materials, keyframes)
- public/models/ts143.glb (Compact binary glTF/GLB)
- public/models/ts143_scene.json (WebGL-ready scene data with chapter metadata)
"""

import os
import sys
import math
import json

try:
    import bpy
    HAS_BPY = True
except ImportError:
    HAS_BPY = False


def create_box_mesh(min_pt, max_pt):
    """
    Generate vertices, normals, and triangle indices for an axis-aligned box.
    min_pt: [x0, y0, z0], max_pt: [x1, y1, z1]
    """
    x0, y0, z0 = min_pt
    x1, y1, z1 = max_pt

    v = [
        # Front face (+Y)
        x0, y1, z0,  x1, y1, z0,  x1, y1, z1,  x0, y1, z1,
        # Back face (-Y)
        x1, y0, z0,  x0, y0, z0,  x0, y0, z1,  x1, y0, z1,
        # Top face (+Z)
        x0, y0, z1,  x1, y0, z1,  x1, y1, z1,  x0, y1, z1,
        # Bottom face (-Z)
        x0, y1, z0,  x1, y1, z0,  x1, y0, z0,  x0, y0, z0,
        # Right face (+X)
        x1, y0, z0,  x1, y1, z0,  x1, y1, z1,  x1, y0, z1,
        # Left face (-X)
        x0, y1, z0,  x0, y0, z0,  x0, y0, z1,  x0, y1, z1,
    ]

    n = [
        0, 1, 0,  0, 1, 0,  0, 1, 0,  0, 1, 0,
        0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
        0, 0, 1,  0, 0, 1,  0, 0, 1,  0, 0, 1,
        0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
        1, 0, 0,  1, 0, 0,  1, 0, 0,  1, 0, 0,
        -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    ]

    idx = []
    for face in range(6):
        base = face * 4
        idx.extend([base, base + 1, base + 2, base, base + 2, base + 3])

    return v, n, idx


def create_cylinder_mesh(center, radius, height, axis='y', segments=12):
    """
    Generate cylinder mesh oriented along specified axis ('x', 'y', or 'z').
    """
    cx, cy, cz = center
    half_h = height / 2.0
    verts = []
    normals = []
    indices = []

    ring1 = []
    ring2 = []
    for i in range(segments):
        theta = 2.0 * math.pi * i / segments
        cos_t = math.cos(theta)
        sin_t = math.sin(theta)

        if axis == 'y':
            p1 = [cx + radius * cos_t, cy - half_h, cz + radius * sin_t]
            p2 = [cx + radius * cos_t, cy + half_h, cz + radius * sin_t]
            norm = [cos_t, 0.0, sin_t]
        elif axis == 'x':
            p1 = [cx - half_h, cy + radius * cos_t, cz + radius * sin_t]
            p2 = [cx + half_h, cy + radius * cos_t, cz + radius * sin_t]
            norm = [0.0, cos_t, sin_t]
        else: # z
            p1 = [cx + radius * cos_t, cy + radius * sin_t, cz - half_h]
            p2 = [cx + radius * cos_t, cy + radius * sin_t, cz + half_h]
            norm = [cos_t, sin_t, 0.0]

        idx_base = len(verts) // 3
        verts.extend(p1)
        normals.extend(norm)
        verts.extend(p2)
        normals.extend(norm)
        ring1.append(idx_base)
        ring2.append(idx_base + 1)

    for i in range(segments):
        next_i = (i + 1) % segments
        indices.extend([ring1[i], ring2[i], ring2[next_i]])
        indices.extend([ring1[i], ring2[next_i], ring1[next_i]])

    cap1_center = len(verts) // 3
    if axis == 'y':
        verts.extend([cx, cy - half_h, cz])
        normals.extend([0, -1, 0])
    elif axis == 'x':
        verts.extend([cx - half_h, cy, cz])
        normals.extend([-1, 0, 0])
    else:
        verts.extend([cx, cy, cz - half_h])
        normals.extend([0, 0, -1])

    cap2_center = len(verts) // 3
    if axis == 'y':
        verts.extend([cx, cy + half_h, cz])
        normals.extend([0, 1, 0])
    elif axis == 'x':
        verts.extend([cx + half_h, cy, cz])
        normals.extend([1, 0, 0])
    else:
        verts.extend([cx, cy, cz + half_h])
        normals.extend([0, 0, 1])

    for i in range(segments):
        next_i = (i + 1) % segments
        indices.extend([cap1_center, ring1[next_i], ring1[i]])
        indices.extend([cap2_center, ring2[i], ring2[next_i]])

    return verts, normals, indices


def create_quad(p0, p1, p2, p3, normal):
    """Creates a quad with counter-clockwise vertex winding and given normal."""
    v = [
        p0[0], p0[1], p0[2],
        p1[0], p1[1], p1[2],
        p2[0], p2[1], p2[2],
        p3[0], p3[1], p3[2],
    ]
    n = [
        normal[0], normal[1], normal[2],
        normal[0], normal[1], normal[2],
        normal[0], normal[1], normal[2],
        normal[0], normal[1], normal[2],
    ]
    idx = [0, 1, 2, 0, 2, 3]
    return v, n, idx


def create_hollow_tube_x(x_min, x_max, y_min, y_max, z_min, z_max, wall_t=0.0022, internal_webs_y=None):
    """
    Extruded hollow multi-chamber architectural profile along X axis.
    Features:
    - 2.0-2.2mm aluminium outer walls
    - Internal partition webs creating distinct hollow chambers
    - Annular open caps exposing hollow chambers at profile ends
    """
    geoms = []

    # Outer shell walls (4 longitudinal faces)
    # Top wall (+Z)
    geoms.append(create_box_mesh([x_min, y_min, z_max - wall_t], [x_max, y_max, z_max]))
    # Bottom wall (-Z)
    geoms.append(create_box_mesh([x_min, y_min, z_min], [x_max, y_max, z_min + wall_t]))
    # Front wall (+Y)
    geoms.append(create_box_mesh([x_min, y_max - wall_t, z_min], [x_max, y_max, z_max]))
    # Back wall (-Y)
    geoms.append(create_box_mesh([x_min, y_min, z_min], [x_max, y_min + wall_t, z_max]))

    # Internal dividing webs along Y
    if internal_webs_y:
        for wy in internal_webs_y:
            geoms.append(create_box_mesh(
                [x_min, wy - wall_t / 2.0, z_min + wall_t],
                [x_max, wy + wall_t / 2.0, z_max - wall_t]
            ))

    return merge_geometries(geoms)


def create_hollow_tube_z(z_min, z_max, x_min, x_max, y_min, y_max, wall_t=0.0022, internal_webs_y=None):
    """
    Extruded hollow multi-chamber architectural profile along vertical Z axis (stiles & jambs).
    """
    geoms = []

    # Outer shell walls (4 vertical faces)
    # Left wall (-X)
    geoms.append(create_box_mesh([x_min, y_min, z_min], [x_min + wall_t, y_max, z_max]))
    # Right wall (+X)
    geoms.append(create_box_mesh([x_max - wall_t, y_min, z_min], [x_max, y_max, z_max]))
    # Front wall (+Y)
    geoms.append(create_box_mesh([x_min, y_max - wall_t, z_min], [x_max, y_max, z_max]))
    # Back wall (-Y)
    geoms.append(create_box_mesh([x_min, y_min, z_min], [x_max, y_min + wall_t, z_max]))

    # Internal dividing webs
    if internal_webs_y:
        for wy in internal_webs_y:
            geoms.append(create_box_mesh(
                [x_min + wall_t, wy - wall_t / 2.0, z_min],
                [x_max - wall_t, wy + wall_t / 2.0, z_max]
            ))

    return merge_geometries(geoms)


def create_polyamide_strip(axis, min_pt, max_pt, width_opt=0.038):
    """
    Polyamide thermal barrier strip (18 / 24 / 38 mm options).
    Accurately models the multi-chamber polymer bridge with dovetail retention beads.
    """
    geoms = []
    x0, y0, z0 = min_pt
    x1, y1, z1 = max_pt

    # Main insulating strip body
    geoms.append(create_box_mesh(min_pt, max_pt))

    # Dovetail retention beads on both edges that lock into the aluminium profile grooves
    if axis == 'x':
        # Beads along X at edges Y
        geoms.append(create_cylinder_mesh([(x0 + x1) / 2.0, y0, (z0 + z1) / 2.0], radius=0.0025, height=(x1 - x0), axis='x', segments=8))
        geoms.append(create_cylinder_mesh([(x0 + x1) / 2.0, y1, (z0 + z1) / 2.0], radius=0.0025, height=(x1 - x0), axis='x', segments=8))
    elif axis == 'z':
        # Beads along Z at edges Y
        geoms.append(create_cylinder_mesh([(x0 + x1) / 2.0, y0, (z0 + z1) / 2.0], radius=0.0025, height=(z1 - z0), axis='z', segments=8))
        geoms.append(create_cylinder_mesh([(x0 + x1) / 2.0, y1, (z0 + z1) / 2.0], radius=0.0025, height=(z1 - z0), axis='z', segments=8))

    return merge_geometries(geoms)


def create_corner_joint(cx, cy, cz, corner_type='bottom_left'):
    """
    Illustrative corner cleat and rivet placement.
    AKPAi catalogue confirms a riveted corner fixture; exact cleat geometry and fastener count are not specified:
    """
    geoms = []
    cleat_t = 0.012

    # L-bracket cleat geometry
    if 'bottom' in corner_type:
        h_arm = create_box_mesh([cx - 0.08, cy - 0.02, cz + 0.005], [cx + 0.08, cy + 0.02, cz + 0.005 + cleat_t])
        v_arm = create_box_mesh([cx - 0.02, cy - 0.02, cz + 0.005], [cx + 0.02, cy + 0.02, cz + 0.12])
        r1_pos = [cx - 0.04, cy, cz + 0.01]
        r2_pos = [cx + 0.04, cy, cz + 0.01]
        r3_pos = [cx, cy, cz + 0.06]
    else: # top
        h_arm = create_box_mesh([cx - 0.08, cy - 0.02, cz - 0.005 - cleat_t], [cx + 0.08, cy + 0.02, cz - 0.005])
        v_arm = create_box_mesh([cx - 0.02, cy - 0.02, cz - 0.12], [cx + 0.02, cy + 0.02, cz - 0.005])
        r1_pos = [cx - 0.04, cy, cz - 0.01]
        r2_pos = [cx + 0.04, cy, cz - 0.01]
        r3_pos = [cx, cy, cz - 0.06]

    geoms.extend([h_arm, v_arm])

    # Illustrative rivet heads; count and positions are not a production fastener schedule
    rivet1 = create_cylinder_mesh(r1_pos, radius=0.0035, height=0.05, axis='y', segments=10)
    rivet2 = create_cylinder_mesh(r2_pos, radius=0.0035, height=0.05, axis='y', segments=10)
    rivet3 = create_cylinder_mesh(r3_pos, radius=0.0035, height=0.05, axis='y', segments=10)
    geoms.extend([rivet1, rivet2, rivet3])

    return merge_geometries(geoms)


def create_tandem_bogie(cx, cy, cz):
    """
    Heavy-duty tandem roller bogie carriage (compatible European 300-400kg class).
    Comprises:
    - Illustrative model support structure
    grooved track rollers and axle/bearing layout shown as a compatible hardware concept
    - Integrated lift rocker pivot arm and micrometer height adjustment screw
    """
    geoms = []

    # Chassis channel
    chassis = create_box_mesh([cx - 0.10, cy - 0.016, cz - 0.012], [cx + 0.10, cy + 0.016, cz + 0.018])
    geoms.append(chassis)

    # Wheel 1 (Front roller)
    w1 = create_cylinder_mesh([cx - 0.06, cy, cz], radius=0.017, height=0.022, axis='y', segments=16)
    axle1 = create_cylinder_mesh([cx - 0.06, cy, cz], radius=0.004, height=0.036, axis='y', segments=10)
    # Wheel 2 (Rear roller)
    w2 = create_cylinder_mesh([cx + 0.06, cy, cz], radius=0.017, height=0.022, axis='y', segments=16)
    axle2 = create_cylinder_mesh([cx + 0.06, cy, cz], radius=0.004, height=0.036, axis='y', segments=10)
    geoms.extend([w1, axle1, w2, axle2])

    # Lift rocker arm connecting to transmission rod
    rocker = create_box_mesh([cx - 0.015, cy - 0.010, cz + 0.018], [cx + 0.045, cy + 0.010, cz + 0.038])
    rocker_pin = create_cylinder_mesh([cx, cy, cz + 0.028], radius=0.0035, height=0.028, axis='y', segments=8)
    adjust_screw = create_cylinder_mesh([cx + 0.08, cy, cz + 0.025], radius=0.003, height=0.020, axis='z', segments=8)
    geoms.extend([rocker, rocker_pin, adjust_screw])

    return merge_geometries(geoms)


def merge_geometries(geom_list):
    """Combines a list of (verts, normals, indices) tuples into one unified geometry."""
    combined_v = []
    combined_n = []
    combined_i = []

    for v, n, idx in geom_list:
        base_v = len(combined_v) // 3
        combined_v.extend(v)
        combined_n.extend(n)
        combined_i.extend([i + base_v for i in idx])

    return combined_v, combined_n, combined_i


def get_bounds(vertices):
    """Calculates min, max, and center bounding box from flat vertices list."""
    if not vertices:
        return {"min": [0, 0, 0], "max": [0, 0, 0], "center": [0, 0, 0]}

    xs = [vertices[i] for i in range(0, len(vertices), 3)]
    ys = [vertices[i + 1] for i in range(0, len(vertices), 3)]
    zs = [vertices[i + 2] for i in range(0, len(vertices), 3)]

    min_pt = [round(min(xs), 4), round(min(ys), 4), round(min(zs), 4)]
    max_pt = [round(max(xs), 4), round(max(ys), 4), round(max(zs), 4)]
    center = [
        round((min_pt[0] + max_pt[0]) / 2.0, 4),
        round((min_pt[1] + max_pt[1]) / 2.0, 4),
        round((min_pt[2] + max_pt[2]) / 2.0, 4),
    ]
    return {"min": min_pt, "max": max_pt, "center": center}


def build_ts143_detailed_system():
    """
    Defines all components of the TS143 Lift & Slide System with verified dimensions:
    - Frame Width: 2.40m (-1.20m to +1.20m)
    - Frame Height: 2.20m (0.00m to 2.20m)
    - Frame Depth: 143mm (Y: -0.0715 to +0.0715m)
    - Sash Profile Depth: 70mm (Outer Track Y: -0.0715 to 0.00, Inner Track Y: 0.00 to +0.0715)
    - Wall Thickness: 2.0 - 2.2mm
    - Glass Envelope: 32mm DGU (within 28-52mm range)
    """
    parts = []

    # =========================================================================
    # 1. SUBSYSTEM: FRAME (143mm Outer Perimeter Frame & Riveted Corners)
    # =========================================================================

    # 1.1 Frame Sill Outer Hollow Extrusion (Multi-chamber, with water drainage rebate)
    v_sillo = create_hollow_tube_x(
        x_min=-1.20, x_max=1.20,
        y_min=-0.0715, y_max=-0.019,
        z_min=0.00, z_max=0.065,
        wall_t=0.0022,
        internal_webs_y=[-0.045]
    )
    parts.append({
        "id": "frame_sill_outer",
        "name": "Frame Sill - Outer Hollow Profile",
        "nameFa": "پروفیل آلومینیومی چندحفره‌ای خارجی کف فریم (Sill)",
        "subsystem": "frame",
        "subsystemFa": "فریم محیطی ۱۴۳ میلی‌متری",
        "material": "aluminium_dark",
        "provenance": "catalogue_confirmed",
        "chapter": 2,
        "specsFa": "پروفیل اکسترود آلومینیوم اختصاصی معماری، دو حفره توخالی تقویتی با شیب تخلیه آب و شیار تیغه پلی‌آمید (تحلیل عمومی آلومینیوم کاتالوگ: ۶۰۶۳-T4)",
        "specsEn": "Custom architectural aluminium extrusion, dual hollow chambers with weep drainage slope (catalogue's general aluminium analysis: 6063-T4)",
        "explodedOffset": [0.0, -0.22, -0.15],
        "inspectionOffset": [0.0, -0.14, -0.10],
        "isMovingSash": False,
        "mesh": v_sillo,
    })

    # 1.2 Frame Sill Inner Hollow Extrusion
    v_silli = create_hollow_tube_x(
        x_min=-1.20, x_max=1.20,
        y_min=0.019, y_max=0.0715,
        z_min=0.00, z_max=0.065,
        wall_t=0.0022,
        internal_webs_y=[0.045]
    )
    parts.append({
        "id": "frame_sill_inner",
        "name": "Frame Sill - Inner Hollow Profile",
        "nameFa": "پروفیل آلومینیومی چندحفره‌ای داخلی کف فریم",
        "subsystem": "frame",
        "subsystemFa": "فریم محیطی ۱۴۳ میلی‌متری",
        "material": "aluminium_inner",
        "provenance": "catalogue_confirmed",
        "chapter": 2,
        "specsFa": "پروفیل سمت داخل با نشیمنگاه ریل فلزی، شیار گسکت و محل اتصال پلی‌آمید",
        "specsEn": "Interior extrusion half with a metal running-rail mounting channel and polyamide receiver grooves",
        "explodedOffset": [0.0, 0.22, -0.15],
        "inspectionOffset": [0.0, 0.14, -0.10],
        "isMovingSash": False,
        "mesh": v_silli,
    })

    # 1.3 Frame Head Outer Hollow Profile
    v_heado = create_hollow_tube_x(
        x_min=-1.20, x_max=1.20,
        y_min=-0.0715, y_max=-0.019,
        z_min=2.135, z_max=2.20,
        wall_t=0.0022,
        internal_webs_y=[-0.045]
    )
    parts.append({
        "id": "frame_head_outer",
        "name": "Frame Head - Outer Hollow Profile",
        "nameFa": "پروفیل آلومینیومی چندحفره‌ای خارجی فوقانی فریم (Head)",
        "subsystem": "frame",
        "subsystemFa": "فریم محیطی ۱۴۳ میلی‌متری",
        "material": "aluminium_dark",
        "provenance": "catalogue_confirmed",
        "chapter": 2,
        "specsFa": "پروفیل بالایی فریم با لبه‌های مهارکننده باد و محفظه‌های توخالی جهت مقاومت در برابر بار باد شدید",
        "specsEn": "Upper outer head profile with anti-lift safety baffles and hollow wind-load reinforcement chambers",
        "explodedOffset": [0.0, -0.22, 0.15],
        "inspectionOffset": [0.0, -0.14, 0.10],
        "isMovingSash": False,
        "mesh": v_heado,
    })

    # 1.4 Frame Head Inner Hollow Profile
    v_headi = create_hollow_tube_x(
        x_min=-1.20, x_max=1.20,
        y_min=0.019, y_max=0.0715,
        z_min=2.135, z_max=2.20,
        wall_t=0.0022,
        internal_webs_y=[0.045]
    )
    parts.append({
        "id": "frame_head_inner",
        "name": "Frame Head - Inner Hollow Profile",
        "nameFa": "پروفیل آلومینیومی چندحفره‌ای داخلی فوقانی فریم",
        "subsystem": "frame",
        "subsystemFa": "فریم محیطی ۱۴۳ میلی‌متری",
        "material": "aluminium_inner",
        "provenance": "catalogue_confirmed",
        "chapter": 2,
        "specsFa": "بخش بالایی داخل ساختمان با شیار هدایتگرهای تفلونی و درزبندهای ضدلرزش",
        "specsEn": "Inner upper head profile half with top guide-track slot and hollow chambers; no acoustic performance is inferred",
        "explodedOffset": [0.0, 0.22, 0.15],
        "inspectionOffset": [0.0, 0.14, 0.10],
        "isMovingSash": False,
        "mesh": v_headi,
    })

    # 1.5 Frame Left Jamb Outer Hollow Profile
    v_ljambo = create_hollow_tube_z(
        z_min=0.065, z_max=2.135,
        x_min=-1.20, x_max=-1.135,
        y_min=-0.0715, y_max=-0.019,
        wall_t=0.0022,
        internal_webs_y=[-0.045]
    )
    parts.append({
        "id": "frame_jamb_left_outer",
        "name": "Frame Left Jamb - Outer Hollow Profile",
        "nameFa": "ستون عمودی چپ فریم - بخش بیرونی چندحفره‌ای",
        "subsystem": "frame",
        "subsystemFa": "فریم محیطی ۱۴۳ میلی‌متری",
        "material": "aluminium_dark",
        "provenance": "catalogue_confirmed",
        "chapter": 2,
        "specsFa": "ستون عمودی سمت لنگه ثابت با ساختار محفظه‌ای با صلبیت پیچشی بالا",
        "specsEn": "Left vertical jamb outer extrusion half with high torsional rigidity multi-chamber section",
        "explodedOffset": [-0.20, -0.15, 0.0],
        "inspectionOffset": [-0.12, -0.10, 0.0],
        "isMovingSash": False,
        "mesh": v_ljambo,
    })

    # 1.6 Frame Left Jamb Inner Hollow Profile
    v_ljambi = create_hollow_tube_z(
        z_min=0.065, z_max=2.135,
        x_min=-1.20, x_max=-1.135,
        y_min=0.019, y_max=0.0715,
        wall_t=0.0022,
        internal_webs_y=[0.045]
    )
    parts.append({
        "id": "frame_jamb_left_inner",
        "name": "Frame Left Jamb - Inner Hollow Profile",
        "nameFa": "ستون عمودی چپ فریم - بخش داخلی چندحفره‌ای",
        "subsystem": "frame",
        "subsystemFa": "فریم محیطی ۱۴۳ میلی‌متری",
        "material": "aluminium_inner",
        "provenance": "catalogue_confirmed",
        "chapter": 2,
        "specsFa": "ستون عمودی چپ سمت داخل ساختمان با نشیمنگاه لاستیک‌های پیرامونی EPDM",
        "specsEn": "Left vertical jamb interior half with continuous EPDM gasket receiving channel",
        "explodedOffset": [-0.20, 0.15, 0.0],
        "inspectionOffset": [-0.12, 0.10, 0.0],
        "isMovingSash": False,
        "mesh": v_ljambi,
    })

    # 1.7 Frame Right Jamb Outer Hollow Profile
    v_rjambo = create_hollow_tube_z(
        z_min=0.065, z_max=2.135,
        x_min=1.135, x_max=1.20,
        y_min=-0.0715, y_max=-0.019,
        wall_t=0.0022,
        internal_webs_y=[-0.045]
    )
    parts.append({
        "id": "frame_jamb_right_outer",
        "name": "Frame Right Jamb - Outer Hollow Profile",
        "nameFa": "ستون عمودی راست فریم - بخش بیرونی چندحفره‌ای",
        "subsystem": "frame",
        "subsystemFa": "فریم محیطی ۱۴۳ میلی‌متری",
        "material": "aluminium_dark",
        "provenance": "catalogue_confirmed",
        "chapter": 2,
        "specsFa": "ستون عمودی سمت بسته شدن لنگه با شیارهای عایق‌بندی و هوابندی",
        "specsEn": "Right vertical jamb outer extrusion half with thermal barrier dovetail channels",
        "explodedOffset": [0.20, -0.15, 0.0],
        "inspectionOffset": [0.12, -0.10, 0.0],
        "isMovingSash": False,
        "mesh": v_rjambo,
    })

    # 1.8 Frame Right Jamb Inner Hollow Profile
    v_rjambi = create_hollow_tube_z(
        z_min=0.065, z_max=2.135,
        x_min=1.135, x_max=1.20,
        y_min=0.019, y_max=0.0715,
        wall_t=0.0022,
        internal_webs_y=[0.045]
    )
    parts.append({
        "id": "frame_jamb_right_inner",
        "name": "Frame Right Jamb - Inner Hollow Profile",
        "nameFa": "ستون عمودی راست فریم - بخش داخلی با پلیت‌های قفل",
        "subsystem": "frame",
        "subsystemFa": "فریم محیطی ۱۴۳ میلی‌متری",
        "material": "aluminium_inner",
        "provenance": "catalogue_confirmed",
        "chapter": 2,
        "specsFa": "ستون عمودی راست سمت داخل با محل تعبیه پلیت‌های کیپر قفل‌های ضدسرقت",
        "specsEn": "Right vertical jamb interior half with machined pockets for security locking keeper strikes",
        "explodedOffset": [0.20, 0.15, 0.0],
        "inspectionOffset": [0.12, 0.10, 0.0],
        "isMovingSash": False,
        "mesh": v_rjambi,
    })

    # 1.9 Riveted Corner Joints (Bottom-Left & Bottom-Right)
    v_cbl = create_corner_joint(-1.17, -0.045, 0.032, corner_type='bottom_left')
    parts.append({
        "id": "frame_corner_bl",
        "name": "Structural Corner Cleat & Rivets (Bottom-Left)",
        "nameFa": "لقمه گوشه ریخته‌گری و پرچ‌های مکانیکی (گوشه پایین-چپ)",
        "subsystem": "frame",
        "subsystemFa": "فریم محیطی ۱۴۳ میلی‌متری",
        "material": "hardware_steel",
        "provenance": "catalogue_confirmed",
        "chapter": 2,
        "specsFa": "لقمه و پرچ‌های مکانیکی گوشه؛ کاتالوگ AKPAi نوع اتصال را پرچی معرفی می‌کند، اما جنس و شمار پرچ در این مدل شماتیک است",
        "specsEn": "Riveted corner fixture as documented by AKPAi; cleat geometry and visible rivet count here are illustrative, not a fabrication specification",
        "explodedOffset": [-0.18, -0.18, -0.10],
        "inspectionOffset": [-0.10, -0.10, -0.05],
        "isMovingSash": False,
        "mesh": v_cbl,
    })

    # 1.10 Riveted Corner Joints (Bottom-Right & Top Corners)
    v_cbr = create_corner_joint(1.17, 0.045, 0.032, corner_type='bottom_right')
    parts.append({
        "id": "frame_corner_br",
        "name": "Structural Corner Cleat & Rivets (Bottom-Right)",
        "nameFa": "لقمه گوشه ریخته‌گری و پرچ‌های مکانیکی (گوشه پایین-راست)",
        "subsystem": "frame",
        "subsystemFa": "فریم محیطی ۱۴۳ میلی‌متری",
        "material": "hardware_steel",
        "provenance": "catalogue_confirmed",
        "chapter": 2,
        "specsFa": "نمایش شماتیک اتصال پرچی گوشه؛ ظرفیت و مقاومت سازه‌ای به طراحی، ابعاد و آزمون نمونه نهایی وابسته است",
        "specsEn": "Illustrative riveted corner fixture; structural capacity depends on the full engineered assembly and project validation",
        "explodedOffset": [0.18, 0.18, -0.10],
        "inspectionOffset": [0.10, 0.10, -0.05],
        "isMovingSash": False,
        "mesh": v_cbr,
    })

    # =========================================================================
    # 2. SUBSYSTEM: THERMAL BREAK (Polyamide Barrier Options: 18, 24, 38 mm)
    # =========================================================================

    # 2.1 Sill Polyamide Barrier (38mm option modeled)
    v_pa_sill = create_polyamide_strip(
        axis='x',
        min_pt=[-1.20, -0.019, 0.015],
        max_pt=[1.20, 0.019, 0.050],
        width_opt=0.038
    )
    parts.append({
        "id": "pa_barrier_sill",
        "name": "Sill Polyamide Thermal Barrier (38mm)",
        "nameFa": "تیغه پلی‌آمید عایق حرارتی کف فریم (گزینه ۳۸ میلی‌متر)",
        "subsystem": "thermal_break",
        "subsystemFa": "تیغه‌های پلی‌آمید عایق حرارتی",
        "material": "polyamide_black",
        "provenance": "catalogue_confirmed",
        "chapter": 3,
        "specsFa": "تیغه پلی‌آمید عایق حرارتی؛ گزینه ۳۸ میلی‌متری کاتالوگ جهت حذف کامل پل حرارتی کف و ایجاد عایق‌بندی حداکثری",
        "specsEn": "Polyamide thermal barrier strip, 38mm catalogue width option for complete thermal discontinuity",
        "explodedOffset": [0.0, 0.0, -0.18],
        "inspectionOffset": [0.0, 0.0, -0.12],
        "isMovingSash": False,
        "mesh": v_pa_sill,
    })

    # 2.2 Head Polyamide Barrier (38mm option)
    v_pa_head = create_polyamide_strip(
        axis='x',
        min_pt=[-1.20, -0.019, 2.150],
        max_pt=[1.20, 0.019, 2.185],
        width_opt=0.038
    )
    parts.append({
        "id": "pa_barrier_head",
        "name": "Head Polyamide Thermal Barrier (38mm)",
        "nameFa": "تیغه پلی‌آمید عایق حرارتی سقف فریم (گزینه ۳۸ میلی‌متر)",
        "subsystem": "thermal_break",
        "subsystemFa": "تیغه‌های پلی‌آمید عایق حرارتی",
        "material": "polyamide_black",
        "provenance": "catalogue_confirmed",
        "chapter": 3,
        "specsFa": "دوخت حرارتی بخش بالایی فریم؛ ضریب انتقال حرارت Uf=3.2 W/m²K فریم طبق کاتالوگ رسمی AKPAi",
        "specsEn": "Upper polyamide thermal barrier achieving catalogue frame thermal transmittance Uf = 3.2 W/(m²·K)",
        "explodedOffset": [0.0, 0.0, 0.18],
        "inspectionOffset": [0.0, 0.0, 0.12],
        "isMovingSash": False,
        "mesh": v_pa_head,
    })

    # 2.3 Left Jamb Polyamide Barrier
    v_pa_ljamb = create_polyamide_strip(
        axis='z',
        min_pt=[-1.185, -0.019, 0.065],
        max_pt=[-1.150, 0.019, 2.135],
        width_opt=0.038
    )
    parts.append({
        "id": "pa_barrier_jamb_left",
        "name": "Left Jamb Polyamide Barrier (38mm)",
        "nameFa": "تیغه پلی‌آمید عایق ستون عمودی چپ",
        "subsystem": "thermal_break",
        "subsystemFa": "تیغه‌های پلی‌آمید عایق حرارتی",
        "material": "polyamide_black",
        "provenance": "catalogue_confirmed",
        "chapter": 3,
        "specsFa": "دوخت حرارتی مقاومتی عمودی با دوام بالا در برابر تنش‌های کششی و برشی ناشی از اختلاف دمای داخل و خارج",
        "specsEn": "Vertical polyamide barrier with high shear stability against building interior-exterior thermal gradients",
        "explodedOffset": [-0.15, 0.0, 0.0],
        "inspectionOffset": [-0.08, 0.0, 0.0],
        "isMovingSash": False,
        "mesh": v_pa_ljamb,
    })

    # 2.4 Right Jamb Polyamide Barrier
    v_pa_rjamb = create_polyamide_strip(
        axis='z',
        min_pt=[1.150, -0.019, 0.065],
        max_pt=[1.185, 0.019, 2.135],
        width_opt=0.038
    )
    parts.append({
        "id": "pa_barrier_jamb_right",
        "name": "Right Jamb Polyamide Barrier (38mm)",
        "nameFa": "تیغه پلی‌آمید عایق ستون عمودی راست",
        "subsystem": "thermal_break",
        "subsystemFa": "تیغه‌های پلی‌آمید عایق حرارتی",
        "material": "polyamide_black",
        "provenance": "catalogue_confirmed",
        "chapter": 3,
        "specsFa": "تیغه دوخت حرارتی عمودی سمت قفل‌ها؛ تضمین پایداری ابعادی و عدم میعان آب روی سطوح داخلی",
        "specsEn": "Right vertical barrier strip preventing interior surface condensation and thermal bridging",
        "explodedOffset": [0.15, 0.0, 0.0],
        "inspectionOffset": [0.08, 0.0, 0.0],
        "isMovingSash": False,
        "mesh": v_pa_rjamb,
    })

    # =========================================================================
    # 3. SUBSYSTEM: TRACKS & GUIDES (Running Rail & Anti-Derailment Guides)
    # =========================================================================

    # 3.1 Running Rail
    # Raised runner rail centered on inner track (Y: ~0.035m, Z: 0.065 to 0.078)
    v_rail = create_box_mesh([-1.18, 0.033, 0.065], [1.18, 0.037, 0.078])
    v_rail_cap1 = create_cylinder_mesh([-1.18, 0.035, 0.078], radius=0.002, height=2.36, axis='x', segments=8)
    v_track_full, n_tf, idx_tf = merge_geometries([v_rail, v_rail_cap1])
    parts.append({
        "id": "frame_sill_track",
        "name": "Running Rail (Illustrative Metal Profile)",
        "nameFa": "ریل فلزی کف حرکت بوژی‌ها (طرح شماتیک یراق سازگار)",
        "subsystem": "frame",
        "subsystemFa": "فریم محیطی ۱۴۳ میلی‌متری",
        "material": "hardware_steel",
        "provenance": "video_observed",
        "chapter": 5,
        "specsFa": "ریل فلزی کف برای حرکت بوژی‌ها؛ انیمیشن محل قرارگیری ریل را نشان می‌دهد اما جنس آلیاژ و کد مقطع را مشخص نمی‌کند",
        "specsEn": "Metal running rail placement observed in the factory animation; rail alloy and exact profile code are not identified in the TS143 catalogue",
        "explodedOffset": [0.0, 0.16, -0.08],
        "inspectionOffset": [0.0, 0.10, -0.05],
        "isMovingSash": False,
        "mesh": (v_track_full, n_tf, idx_tf),
    })

    # 3.2 Top Anti-Friction Polyamide Guide Channel
    v_top_guide = create_box_mesh([-1.18, 0.032, 2.122], [1.18, 0.038, 2.135])
    parts.append({
        "id": "frame_top_guide_channel",
        "name": "Top Polyamide Guide Track",
        "nameFa": "ریل هدایتگر تفلونی/پلی‌آمیدی فوقانی ضدلرزش",
        "subsystem": "frame",
        "subsystemFa": "فریم محیطی ۱۴۳ میلی‌متری",
        "material": "polyamide_black",
        "provenance": "video_observed",
        "chapter": 5,
        "specsFa": "ریل راهنمای فوقانی جهت هدایت مستقیم لنگه متحرک بدون لرزش جانبی و ممانعت از خروج لنگه",
        "specsEn": "Upper guide profile ensuring stable linear travel and preventing leaf tilt under wind pressure",
        "explodedOffset": [0.0, 0.16, 0.08],
        "inspectionOffset": [0.0, 0.10, 0.05],
        "isMovingSash": False,
        "mesh": v_top_guide,
    })

    # =========================================================================
    # 4. SUBSYSTEM: FIXED SASH (Left Panel, 70mm Sash Depth, 32mm Glazing)
    # =========================================================================

    # 4.1 Fixed Sash Outer Hollow Aluminium Profile (Bottom/Top/Sides frame)
    # Outer half of 70mm sash: Y in [-0.068, -0.036]
    f_bot = create_hollow_tube_x(-1.135, 0.025, -0.068, -0.036, 0.070, 0.160, wall_t=0.0022)
    f_top = create_hollow_tube_x(-1.135, 0.025, -0.068, -0.036, 2.045, 2.130, wall_t=0.0022)
    f_left = create_hollow_tube_z(0.160, 2.045, -1.135, -1.045, -0.068, -0.036, wall_t=0.0022)
    f_meet = create_hollow_tube_z(0.160, 2.045, -0.065, 0.025, -0.068, -0.036, wall_t=0.0022)
    v_f_out = merge_geometries([f_bot, f_top, f_left, f_meet])
    parts.append({
        "id": "sash_fixed_outer",
        "name": "Fixed Sash - Outer Hollow Aluminium Profile",
        "nameFa": "پروفیل آلومینیومی چندحفره‌ای خارجی لنگه ثابت",
        "subsystem": "sash_fixed",
        "subsystemFa": "لنگه ثابت و شیشه دوجداره",
        "material": "aluminium_dark",
        "provenance": "catalogue_confirmed",
        "chapter": 4,
        "specsFa": "پروفیل اکسترود چندمحفظه‌ای لنگه با عمق ۷۰ میلی‌متر و ضخامت جداره ۲٫۰ الی ۲٫۲ میلی‌متر",
        "specsEn": "70mm depth multi-chamber sash extrusion outer half with 2.0-2.2mm aluminium wall thickness",
        "explodedOffset": [-0.15, -0.18, 0.0],
        "inspectionOffset": [-0.10, -0.12, 0.0],
        "isMovingSash": False,
        "mesh": v_f_out,
    })

    # 4.2 Fixed Sash Inner Hollow Aluminium Profile
    # Inner half of 70mm sash: Y in [-0.034, -0.002]
    fi_bot = create_hollow_tube_x(-1.135, 0.025, -0.034, -0.002, 0.070, 0.160, wall_t=0.0022)
    fi_top = create_hollow_tube_x(-1.135, 0.025, -0.034, -0.002, 2.045, 2.130, wall_t=0.0022)
    fi_left = create_hollow_tube_z(0.160, 2.045, -1.135, -1.045, -0.034, -0.002, wall_t=0.0022)
    fi_meet = create_hollow_tube_z(0.160, 2.045, -0.065, 0.025, -0.034, -0.002, wall_t=0.0022)
    v_f_in = merge_geometries([fi_bot, fi_top, fi_left, fi_meet])
    parts.append({
        "id": "sash_fixed_inner",
        "name": "Fixed Sash - Inner Hollow Aluminium Profile",
        "nameFa": "پروفیل آلومینیومی چندحفره‌ای داخلی لنگه ثابت",
        "subsystem": "sash_fixed",
        "subsystemFa": "لنگه ثابت و شیشه دوجداره",
        "material": "aluminium_inner",
        "provenance": "catalogue_confirmed",
        "chapter": 4,
        "specsFa": "نیمه داخلی پروفیل لنگه ثابت با شیارهای قفل‌کننده زوار شیشه و تیغه‌های پلی‌آمید میانی",
        "specsEn": "Interior sash extrusion half with integrated snap-in glazing bead groove and thermal barrier seat",
        "explodedOffset": [-0.15, 0.18, 0.0],
        "inspectionOffset": [-0.10, 0.12, 0.0],
        "isMovingSash": False,
        "mesh": v_f_in,
    })

    # 4.3 Fixed Sash Polyamide Thermal Barrier
    v_pa_sash_f = create_polyamide_strip('x', [-1.135, -0.036, 0.080], [0.025, -0.034, 0.150], width_opt=0.024)
    parts.append({
        "id": "pa_barrier_sash_fixed",
        "name": "Fixed Sash Polyamide Barrier Strip (24mm)",
        "nameFa": "تیغه پلی‌آمید میانی لنگه ثابت (گزینه ۲۴ میلی‌متر)",
        "subsystem": "thermal_break",
        "subsystemFa": "تیغه‌های پلی‌آمید عایق حرارتی",
        "material": "polyamide_black",
        "provenance": "catalogue_confirmed",
        "chapter": 3,
        "specsFa": "دوخت حرارتی ۲۴ میلی‌متری مابین دو نیمه پروفیل لنگه جهت قطع کامل تبادل دمایی فریم لنگه",
        "specsEn": "24mm polyamide thermal strip separating inner and outer sash halves for continuous insulation",
        "explodedOffset": [-0.15, 0.0, 0.0],
        "inspectionOffset": [-0.10, 0.0, 0.0],
        "isMovingSash": False,
        "mesh": v_pa_sash_f,
    })

    # 4.4 Fixed Sash Double-Glazed Unit (32mm DGU within 28-52mm envelope)
    # Illustrative 32mm glazing build-up only; AKPAi specifies a 28–52mm envelope, not this glass recipe
    # Y in [-0.056, -0.024]
    pane_out = create_box_mesh([-1.035, -0.054, 0.170], [-0.055, -0.048, 2.035])
    spacer_bar = create_hollow_tube_x(-1.035, -0.055, -0.048, -0.030, 0.170, 2.035, wall_t=0.0015)
    pane_in = create_box_mesh([-1.035, -0.030, 0.170], [-0.055, -0.024, 2.035])
    v_glass_f = merge_geometries([pane_out, spacer_bar, pane_in])
    parts.append({
        "id": "glass_fixed_dgu",
        "name": "Fixed Glazing Unit (Schematic 28-52mm Range)",
        "nameFa": "پکیج شیشه چندجداره لنگه ثابت (طرح شماتیک بازه ۲۸ تا ۵۲ میلی‌متر)",
        "subsystem": "sash_fixed",
        "subsystemFa": "لنگه ثابت و شیشه چندجداره",
        "material": "glass_tinted",
        "provenance": "catalogue_confirmed",
        "chapter": 7,
        "specsFa": "پکیج شیشه چندجداره در بازه ضخامت ۲۸ تا ۵۲ میلی‌متر مطابق استاندارد کاتالوگ AKPAi جهت عایق‌بندی حرارتی و صوتی",
        "specsEn": "Illustrative glazing panel within the 28–52mm envelope stated in the AKPAi catalogue; the selected glass make-up is project-specific",
        "explodedOffset": [-0.15, -0.08, 0.0],
        "inspectionOffset": [-0.10, -0.05, 0.0],
        "isMovingSash": False,
        "mesh": v_glass_f,
    })

    # 4.5 Fixed Sash Glazing Beads & Setting Blocks
    bead_bot = create_box_mesh([-1.045, -0.025, 0.160], [-0.045, -0.015, 0.175])
    block1 = create_box_mesh([-0.98, -0.052, 0.160], [-0.88, -0.026, 0.170])
    block2 = create_box_mesh([-0.20, -0.052, 0.160], [-0.10, -0.026, 0.170])
    v_f_beads = merge_geometries([bead_bot, block1, block2])
    parts.append({
        "id": "sash_fixed_beads_blocks",
        "name": "Fixed Glazing Beads & Setting Blocks",
        "nameFa": "زوار آلومینیومی قفل‌شونده و تاکوزهای نشیمنگاه شیشه",
        "subsystem": "sash_fixed",
        "subsystemFa": "لنگه ثابت و شیشه دوجداره",
        "material": "aluminium_inner",
        "provenance": "video_observed",
        "chapter": 7,
        "specsFa": "زوارهای آلومینیومی فشاری جهت تثبیت شیشه به همراه تاکوزهای الاستومری توزیع‌کننده وزن",
        "specsEn": "Illustrative snap-in glazing bead and glass-support block arrangement; exact fitting and setting-block layout are project-specific",
        "explodedOffset": [-0.15, 0.08, 0.0],
        "inspectionOffset": [-0.10, 0.04, 0.0],
        "isMovingSash": False,
        "mesh": v_f_beads,
    })

    # =========================================================================
    # 5. SUBSYSTEM: MOVING SASH (Right Panel, 70mm Sash, 400kg Capacity)
    # =========================================================================

    # 5.1 Moving Sash Outer Hollow Aluminium Profile
    # Outer half of moving sash: Y in [0.005, 0.037]
    # Length: X in [-0.025, 1.135], Height: Z in [0.070, 2.130]
    m_bot = create_hollow_tube_x(-0.025, 1.135, 0.005, 0.037, 0.070, 0.160, wall_t=0.0022)
    m_top = create_hollow_tube_x(-0.025, 1.135, 0.005, 0.037, 2.045, 2.130, wall_t=0.0022)
    m_meet = create_hollow_tube_z(0.160, 2.045, -0.025, 0.065, 0.005, 0.037, wall_t=0.0022)
    m_right = create_hollow_tube_z(0.160, 2.045, 1.045, 1.135, 0.005, 0.037, wall_t=0.0022)
    v_m_out = merge_geometries([m_bot, m_top, m_meet, m_right])
    parts.append({
        "id": "sash_moving_outer",
        "name": "Moving Sash - Outer Hollow Aluminium Profile",
        "nameFa": "پروفیل آلومینیومی چندحفره‌ای خارجی لنگه متحرک",
        "subsystem": "sash_moving",
        "subsystemFa": "لنگه متحرک لیفت‌اند‌اسلاید",
        "material": "aluminium_dark",
        "provenance": "catalogue_confirmed",
        "chapter": 4,
        "specsFa": "پروفیل فوق‌سنگین لنگه متحرک با قابلیت تحمل ۴۰۰ کیلوگرم وزن شیشه و ابعاد تا ۳×۳ متر",
        "specsEn": "Heavy-duty 70mm multi-chamber sliding leaf profile engineered for leaves up to 400kg and 3x3m spans",
        "explodedOffset": [0.15, -0.12, 0.0],
        "inspectionOffset": [0.10, -0.08, 0.0],
        "isMovingSash": True,
        "mesh": v_m_out,
    })

    # 5.2 Moving Sash Inner Hollow Aluminium Profile
    # Inner half: Y in [0.039, 0.071]
    mi_bot = create_hollow_tube_x(-0.025, 1.135, 0.039, 0.071, 0.070, 0.160, wall_t=0.0022)
    mi_top = create_hollow_tube_x(-0.025, 1.135, 0.039, 0.071, 2.045, 2.130, wall_t=0.0022)
    mi_meet = create_hollow_tube_z(0.160, 2.045, -0.025, 0.065, 0.039, 0.071, wall_t=0.0022)
    mi_right = create_hollow_tube_z(0.160, 2.045, 1.045, 1.135, 0.039, 0.071, wall_t=0.0022)
    v_m_in = merge_geometries([mi_bot, mi_top, mi_meet, mi_right])
    parts.append({
        "id": "sash_moving_inner",
        "name": "Moving Sash - Inner Hollow Aluminium Profile",
        "nameFa": "پروفیل آلومینیومی چندحفره‌ای داخلی لنگه متحرک",
        "subsystem": "sash_moving",
        "subsystemFa": "لنگه متحرک لیفت‌اند‌اسلاید",
        "material": "aluminium_inner",
        "provenance": "catalogue_confirmed",
        "chapter": 4,
        "specsFa": "پروفیل سمت داخل ساختمان با محفظه قرارگیری میله انتقال نیروی اسپانیولت و قفل دستگیره",
        "specsEn": "Interior sash extrusion half with integrated internal channel for transmission espagnolette gear rod",
        "explodedOffset": [0.15, 0.18, 0.0],
        "inspectionOffset": [0.10, 0.12, 0.0],
        "isMovingSash": True,
        "mesh": v_m_in,
    })

    # 5.3 Moving Sash Central Interlock Stile Labyrinth Hook
    # Overlapping interlocking hook profile at center X: ~0.0
    hook_v = create_box_mesh([-0.015, -0.008, 0.070], [0.015, 0.008, 2.130])
    parts.append({
        "id": "sash_interlock_profile",
        "name": "Central Interlock Labyrinth Profile",
        "nameFa": "پروفیل اینترلاک هزارتو مرکزی (محل هم‌پوشانی دو لنگه)",
        "subsystem": "sash_moving",
        "subsystemFa": "لنگه متحرک لیفت‌اند‌اسلاید",
        "material": "aluminium_dark",
        "provenance": "catalogue_confirmed",
        "chapter": 4,
        "specsFa": "پروفیل هوابند اینترلاک با ساختار قلابی هزارتو (Labyrinth) جهت مقاومت در برابر نفوذ باد طوفانی و باران شدید",
        "specsEn": "Interlocking labyrinth hook profile establishing continuous weather baffle at the meeting stiles",
        "explodedOffset": [0.05, 0.0, 0.0],
        "inspectionOffset": [0.03, 0.05, 0.0],
        "isMovingSash": True,
        "mesh": hook_v,
    })

    # 5.4 Moving Sash Polyamide Barrier Strip
    v_pa_sash_m = create_polyamide_strip('x', [-0.025, 0.037, 0.080], [1.135, 0.039, 0.150], width_opt=0.024)
    parts.append({
        "id": "pa_barrier_sash_moving",
        "name": "Moving Sash Polyamide Barrier Strip (24mm)",
        "nameFa": "تیغه پلی‌آمید میانی لنگه متحرک (گزینه ۲۴ میلی‌متر)",
        "subsystem": "thermal_break",
        "subsystemFa": "تیغه‌های پلی‌آمید عایق حرارتی",
        "material": "polyamide_black",
        "provenance": "catalogue_confirmed",
        "chapter": 3,
        "specsFa": "دوخت حرارتی ۲۴ میلی‌متری مابین دو نیمه پروفیل لنگه بازشو جهت عایق‌بندی حرارتی کامل لنگه متحرک",
        "specsEn": "24mm polyamide thermal strip isolating the heavy-duty moving leaf perimeter",
        "explodedOffset": [0.15, 0.0, 0.0],
        "inspectionOffset": [0.10, 0.0, 0.0],
        "isMovingSash": True,
        "mesh": v_pa_sash_m,
    })

# 5.5 Moving Sash Illustrative Glazing Panel (within 28–52mm envelope)
    # Y in [0.017, 0.049]
    m_pane_out = create_box_mesh([0.055, 0.019, 0.170], [1.035, 0.025, 2.035])
    m_spacer = create_hollow_tube_x(0.055, 1.035, 0.025, 0.043, 0.170, 2.035, wall_t=0.0015)
    m_pane_in = create_box_mesh([0.055, 0.043, 0.170], [1.035, 0.049, 2.035])
    v_glass_m = merge_geometries([m_pane_out, m_spacer, m_pane_in])
    parts.append({
        "id": "glass_moving_dgu",
        "name": "Moving Glazing Unit (Schematic 28-52mm Range)",
        "nameFa": "پکیج شیشه چندجداره لنگه متحرک (طرح شماتیک بازه ۲۸ تا ۵۲ میلی‌متر)",
        "subsystem": "sash_moving",
        "subsystemFa": "لنگه متحرک لیفت‌اند‌اسلاید",
        "material": "glass_tinted",
        "provenance": "catalogue_confirmed",
        "chapter": 7,
        "specsFa": "پکیج شیشه چندجداره در بازه ۲۸ تا ۵۲ میلی‌متر کاتالوگ، نشسته روی تاکوزهای تراز و مهارشده با زوار آلومینیومی",
        "specsEn": "Schematic glazing package within 28-52mm catalogue envelope, supported by load-bearing setting blocks",
        "explodedOffset": [0.15, 0.08, 0.0],
        "inspectionOffset": [0.10, 0.05, 0.0],
        "isMovingSash": True,
        "mesh": v_glass_m,
    })

    # 5.6 Moving Sash Glazing Beads & Setting Blocks
    m_bead_bot = create_box_mesh([0.045, 0.049, 0.160], [1.045, 0.059, 0.175])
    m_block1 = create_box_mesh([0.10, 0.021, 0.160], [0.20, 0.047, 0.170])
    m_block2 = create_box_mesh([0.88, 0.021, 0.160], [0.98, 0.047, 0.170])
    v_m_beads = merge_geometries([m_bead_bot, m_block1, m_block2])
    parts.append({
        "id": "sash_moving_beads_blocks",
        "name": "Moving Glazing Beads & Setting Blocks",
        "nameFa": "زوار آلومینیومی قفل‌شونده و تاکوزهای لنگه متحرک",
        "subsystem": "sash_moving",
        "subsystemFa": "لنگه متحرک لیفت‌اند‌اسلاید",
        "material": "aluminium_inner",
        "provenance": "video_observed",
        "chapter": 7,
        "specsFa": "زوارهای آلومینیومی قفل‌شونده و تاکوزهای انتقال بار شیشه به بوژی‌های باربر",
        "specsEn": "Illustrative glazing bead and load-distribution block arrangement; exact fitting and setting-block layout are project-specific",
        "explodedOffset": [0.15, 0.12, 0.0],
        "inspectionOffset": [0.10, 0.08, 0.0],
        "isMovingSash": True,
        "mesh": v_m_beads,
    })

    # 5.7 Moving Sash Top Polyamide Guide Shoes
    shoe1 = create_box_mesh([0.15, 0.033, 2.124], [0.25, 0.037, 2.140])
    shoe2 = create_box_mesh([0.85, 0.033, 2.124], [0.95, 0.037, 2.140])
    v_shoes = merge_geometries([shoe1, shoe2])
    parts.append({
        "id": "sash_top_guide_shoes",
        "name": "Top Anti-Friction Guide Shoes",
        "nameFa": "کفشک‌های هدایتگر تفلونی ضدلرزش فوقانی لنگه",
        "subsystem": "sash_moving",
        "subsystemFa": "لنگه متحرک لیفت‌اند‌اسلاید",
        "material": "polyamide_black",
        "provenance": "video_observed",
        "chapter": 9,
        "specsFa": "کفشک‌های تفلونی لغزنده در ریل بالایی جهت تثبیت قائم لنگه در حرکت و ممانعت از اصطکاک فلز با فلز",
        "specsEn": "Low-friction polyamide top shoes engaging the upper rail to eliminate rattle and lateral deflection",
        "explodedOffset": [0.15, 0.0, 0.08],
        "inspectionOffset": [0.10, 0.0, 0.04],
        "isMovingSash": True,
        "mesh": v_shoes,
    })

    # =========================================================================
    # 6. SUBSYSTEM: HARDWARE (Compatible European 300-400kg Lift-Slide Set)
    # =========================================================================

    # 6.1 Front Tandem Bogie Carriage (Left side of moving sash bottom rail)
    # Center X: ~0.26, Y: ~0.035, Z: ~0.065
    v_bogie_f = create_tandem_bogie(cx=0.26, cy=0.035, cz=0.065)
    parts.append({
        "id": "hardware_bogie_front",
        "name": "Front Tandem Roller Bogie Carriage",
        "nameFa": "بوژی چرخ دوبل تاندم جلو (Lift & Slide Bogie)",
        "subsystem": "hardware",
        "subsystemFa": "یراق‌آلات و مکانیزم لیفت‌اند‌اسلاید",
        "material": "hardware_steel",
        "provenance": "schematic_compatible_hardware",
        "chapter": 6,
        "specsFa": "بوژی شماتیک یراق لیفت‌اند‌اسلاید؛ نوع چرخ، یاتاقان و سازوکار بالابری به سازنده یراق انتخابی وابسته است",
        "specsEn": "Illustrative compatible tandem roller carriage; wheel, bearing and lift-linkage details depend on the selected hardware supplier (300–400kg is a compatible fittings class, not a certified leaf capacity)",
        "explodedOffset": [0.15, 0.0, -0.16],
        "inspectionOffset": [0.08, 0.0, -0.10],
        "isMovingSash": True,
        "mesh": v_bogie_f,
    })

    # 6.2 Rear Tandem Bogie Carriage (Right side of moving sash bottom rail)
    # Center X: ~0.88, Y: ~0.035, Z: ~0.065
    v_bogie_r = create_tandem_bogie(cx=0.88, cy=0.035, cz=0.065)
    parts.append({
        "id": "hardware_bogie_rear",
        "name": "Rear Tandem Roller Bogie Carriage",
        "nameFa": "بوژی چرخ دوبل تاندم عقب",
        "subsystem": "hardware",
        "subsystemFa": "یراق‌آلات و مکانیزم لیفت‌اند‌اسلاید",
        "material": "hardware_steel",
        "provenance": "schematic_compatible_hardware",
        "chapter": 6,
        "specsFa": "بوژی شماتیک عقب؛ وجود و روش تنظیم ارتفاع و تراز به مجموعه یراق انتخابی وابسته است",
        "specsEn": "Rear tandem bogie carriage with micrometric leveling adjustment screw for precision sash tracking",
        "explodedOffset": [0.15, 0.0, -0.16],
        "inspectionOffset": [0.08, 0.0, -0.10],
        "isMovingSash": True,
        "mesh": v_bogie_r,
    })

    # 6.3 Horizontal Synchronization Drive Tie-Rod
    # Connects front and rear bogies so both ends lift synchronously
    v_tie_rod = create_cylinder_mesh([0.57, 0.035, 0.088], radius=0.0035, height=0.56, axis='x', segments=8)
    parts.append({
        "id": "hardware_connecting_rod",
        "name": "Horizontal Synchronization Drive Tie-Rod",
        "nameFa": "میله رابط هماهنگ‌کننده بوژی‌های جلو و عقب",
        "subsystem": "hardware",
        "subsystemFa": "یراق‌آلات و مکانیزم لیفت‌اند‌اسلاید",
        "material": "hardware_steel",
        "provenance": "schematic_compatible_hardware",
        "chapter": 6,
        "specsFa": "میله رابط شماتیک بین اجزای یراق؛ جنس، سینماتیک و نحوه هماهنگی بوژی‌ها به سازنده یراق وابسته است",
        "specsEn": "Illustrative linkage rod between compatible hardware components; its material and kinematics depend on the selected fitting supplier",
        "explodedOffset": [0.15, 0.0, -0.10],
        "inspectionOffset": [0.08, 0.0, -0.06],
        "isMovingSash": True,
        "mesh": v_tie_rod,
    })

    # 6.4 Ergonomic Architectural 180-Degree Lever Handle
    # Escutcheon plate + spindle hub + angled architectural lever
    h_plate = create_box_mesh([1.065, 0.071, 1.05], [1.115, 0.079, 1.25])
    h_hub = create_cylinder_mesh([1.09, 0.092, 1.20], radius=0.013, height=0.026, axis='y', segments=12)
    h_lever = create_box_mesh([1.078, 0.105, 0.96], [1.102, 0.125, 1.22])
    v_handle = merge_geometries([h_plate, h_hub, h_lever])
    parts.append({
        "id": "hardware_handle",
        "name": "Illustrative Lift-Slide Lever Handle",
        "nameFa": "دستگیره اهرمی شماتیک لیفت‌اند‌اسلاید",
        "subsystem": "hardware",
        "subsystemFa": "یراق‌آلات و مکانیزم لیفت‌اند‌اسلاید",
        "material": "hardware_steel",
        "provenance": "schematic_compatible_hardware",
        "chapter": 6,
        "specsFa": "دستگیره اهرمی شماتیک برای نمایش عملکرد کلی یراق لیفت‌اند‌اسلاید؛ جنس، زاویه عملکرد و کورس حرکت به سازنده یراق انتخابی وابسته است",
        "specsEn": "Illustrative lift-slide lever handle; material, operating travel and linkage are specific to the selected hardware supplier",
        "explodedOffset": [0.15, 0.28, 0.0],
        "inspectionOffset": [0.10, 0.18, 0.0],
        "isMovingSash": True,
        "mesh": v_handle,
    })

    # 6.5 Concealed Bevel Gearbox & Spindle Housing
    v_gearbox = create_box_mesh([1.075, 0.045, 1.14], [1.125, 0.065, 1.26])
    parts.append({
        "id": "hardware_gearbox",
        "name": "Internal Bevel Gearbox & Spindle Transmission",
        "nameFa": "جعبه‌دنده مخفی انتقال گشتاور دستگیره به اسپانیولت",
        "subsystem": "hardware",
        "subsystemFa": "یراق‌آلات و مکانیزم لیفت‌اند‌اسلاید",
        "material": "hardware_steel",
        "provenance": "schematic_compatible_hardware",
        "chapter": 6,
        "specsFa": "گیربکس شماتیک برای نمایش انتقال حرکت از دستگیره به سازوکار قفل و بالابری؛ شکل و اجزای داخلی به یراق انتخابی وابسته است",
        "specsEn": "Illustrative concealed gearbox and linkage; exact handle travel and locking geometry depend on the selected hardware supplier",
        "explodedOffset": [0.15, 0.20, 0.0],
        "inspectionOffset": [0.10, 0.12, 0.0],
        "isMovingSash": True,
        "mesh": v_gearbox,
    })

    # 6.6 Multi-point Lock Espagnolette Rod & Mushroom Security Cams
    rod = create_box_mesh([1.130, 0.034, 0.20], [1.138, 0.044, 2.00])
    cam1 = create_cylinder_mesh([1.142, 0.039, 0.45], radius=0.007, height=0.015, axis='x', segments=10)
    cam2 = create_cylinder_mesh([1.142, 0.039, 1.10], radius=0.007, height=0.015, axis='x', segments=10)
    cam3 = create_cylinder_mesh([1.142, 0.039, 1.75], radius=0.007, height=0.015, axis='x', segments=10)
    v_espag = merge_geometries([rod, cam1, cam2, cam3])
    parts.append({
        "id": "hardware_lock_transmission",
        "name": "Illustrative Vertical Locking Rod & Engagement Points",
        "nameFa": "میله انتقال قفل و نقاط درگیری شماتیک",
        "subsystem": "hardware",
        "subsystemFa": "یراق‌آلات و مکانیزم لیفت‌اند‌اسلاید",
        "material": "hardware_steel",
        "provenance": "schematic_compatible_hardware",
        "chapter": 6,
        "specsFa": "چیدمان شماتیک میله انتقال قفل و نقاط درگیرشونده؛ تعداد، جنس و شکل دقیق قطعات به یراق انتخابی وابسته است",
        "specsEn": "Illustrative vertical locking transmission rod with locking points; exact material, count and lock geometry depend on the selected hardware supplier",
        "explodedOffset": [0.28, 0.05, 0.0],
        "inspectionOffset": [0.16, 0.03, 0.0],
        "isMovingSash": True,
        "mesh": v_espag,
    })

    # 6.7 Frame Jamb Security Keeper Strike Plates
    kp1 = create_box_mesh([1.145, 0.032, 0.42], [1.155, 0.046, 0.48])
    kp2 = create_box_mesh([1.145, 0.032, 1.07], [1.155, 0.046, 1.13])
    kp3 = create_box_mesh([1.145, 0.032, 1.72], [1.155, 0.046, 1.78])
    v_keepers = merge_geometries([kp1, kp2, kp3])
    parts.append({
        "id": "hardware_jamb_keepers",
        "name": "Jamb Security Keeper Strike Plates",
        "nameFa": "پلیت‌های کیپر ضدسرقت ستون فریم",
        "subsystem": "hardware",
        "subsystemFa": "یراق‌آلات و مکانیزم لیفت‌اند‌اسلاید",
        "material": "hardware_steel",
        "provenance": "schematic_compatible_hardware",
        "chapter": 6,
        "specsFa": "پلیت‌های کیپر شماتیک روی فریم که با نقاط قفل لنگه درگیر می‌شوند؛ شکل و تعداد دقیق به یراق انتخابی وابسته است",
        "specsEn": "Illustrative frame-side keeper plates; material, geometry and matching lock points depend on the selected hardware supplier",
        "explodedOffset": [0.24, 0.05, 0.0],
        "inspectionOffset": [0.14, 0.03, 0.0],
        "isMovingSash": False,
        "mesh": v_keepers,
    })

    # =========================================================================
    # 7. SUBSYSTEM: SEALS (EPDM Compression Gaskets & Interlock Weatherseals)
    # =========================================================================

    # 7.1 Continuous Perimeter EPDM Weatherseals
    # Bottom & top compression lips on frame
    g_bot = create_box_mesh([-1.135, -0.003, 0.062], [1.135, 0.003, 0.070])
    g_top = create_box_mesh([-1.135, -0.003, 2.130], [1.135, 0.003, 2.138])
    g_side_l = create_box_mesh([-1.142, -0.003, 0.070], [-1.135, 0.003, 2.130])
    g_side_r = create_box_mesh([1.135, -0.003, 0.070], [1.142, 0.003, 2.130])
    v_g_frame = merge_geometries([g_bot, g_top, g_side_l, g_side_r])
    parts.append({
        "id": "gasket_frame_perimeter",
        "name": "Continuous EPDM Perimeter Compression Gaskets",
        "nameFa": "لاستیک‌های درزبند EPDM پیرامونی پیوسته فریم",
        "subsystem": "seals",
        "subsystemFa": "گسکت‌های درزبند چندلایه EPDM",
        "material": "epdm_rubber",
        "provenance": "catalogue_confirmed",
        "chapter": 8,
        "specsFa": "گسکت EPDM در نواحی پیرامونی و شیشه؛ فرم دقیق لب‌های آب‌بندی شماتیک است",
        "specsEn": "EPDM sealing gaskets at perimeter and glazing interfaces; detailed lip geometry is illustrative",
        "explodedOffset": [0.0, 0.08, 0.0],
        "inspectionOffset": [0.0, 0.05, 0.0],
        "isMovingSash": False,
        "mesh": v_g_frame,
    })

    # 7.2 Central Interlock Multi-Stage Labyrinth EPDM Gaskets
    g_int1 = create_box_mesh([-0.010, -0.004, 0.070], [0.010, 0.004, 2.130])
    g_int2 = create_box_mesh([-0.018, 0.004, 0.070], [-0.012, 0.008, 2.130])
    g_int3 = create_box_mesh([0.012, -0.008, 0.070], [0.018, -0.004, 2.130])
    v_int_all = merge_geometries([g_int1, g_int2, g_int3])
    parts.append({
        "id": "gasket_interlock_labyrinth",
        "name": "Central Interlock EPDM Labyrinth Gaskets",
        "nameFa": "گسکت‌های درزبند EPDM هزارتوی اینترلاک مرکزی",
        "subsystem": "seals",
        "subsystemFa": "گسکت‌های درزبند چندلایه EPDM",
        "material": "epdm_rubber",
        "provenance": "catalogue_confirmed",
        "chapter": 8,
        "specsFa": "لاستیک‌های درزبند EPDM چندلایه جهت هوابندی و آب‌بندی تقاطع دو لنگه در برابر باد و باران شدید",
        "specsEn": "Multi-lip EPDM compression seals at the meeting stile interlock labyrinth ensuring air and water tightness",
        "explodedOffset": [0.0, 0.0, 0.0],
        "inspectionOffset": [0.0, 0.10, 0.0],
        "isMovingSash": False,
        "mesh": v_int_all,
    })

    # 7.3 Fixed Sash Glazing EPDM Gaskets (Exterior & Interior)
    g_fix_out = create_box_mesh([-1.045, -0.056, 0.160], [-0.045, -0.054, 2.045])
    g_fix_in = create_box_mesh([-1.045, -0.024, 0.160], [-0.045, -0.022, 2.045])
    v_g_glass_f = merge_geometries([g_fix_out, g_fix_in])
    parts.append({
        "id": "gasket_glazing_fixed",
        "name": "Fixed Glass EPDM Wedge & Rebate Gaskets",
        "nameFa": "لاستیک‌های درزبند کناره شیشه لنگه ثابت",
        "subsystem": "seals",
        "subsystemFa": "گسکت‌های درزبند چندلایه EPDM",
        "material": "epdm_rubber",
        "provenance": "catalogue_confirmed",
        "chapter": 8,
        "specsFa": "لاستیک گوه‌ای EPDM با دوام بالا جهت هوابندی و آب‌بندی الاستیک شیشه و فریم لنگه ثابت",
        "specsEn": "EPDM wedge and rebate gaskets providing elastic edge sealing for the fixed glass unit",
        "explodedOffset": [-0.15, -0.04, 0.0],
        "inspectionOffset": [-0.10, -0.02, 0.0],
        "isMovingSash": False,
        "mesh": v_g_glass_f,
    })

    # 7.4 Moving Sash Glazing EPDM Gaskets
    g_mov_out = create_box_mesh([0.045, 0.017, 0.160], [1.045, 0.019, 2.045])
    g_mov_in = create_box_mesh([0.045, 0.049, 0.160], [1.045, 0.051, 2.045])
    v_g_glass_m = merge_geometries([g_mov_out, g_mov_in])
    parts.append({
        "id": "gasket_glazing_moving",
        "name": "Moving Glass EPDM Wedge & Rebate Gaskets",
        "nameFa": "لاستیک‌های درزبند کناره شیشه لنگه متحرک",
        "subsystem": "seals",
        "subsystemFa": "گسکت‌های درزبند چندلایه EPDM",
        "material": "epdm_rubber",
        "provenance": "catalogue_confirmed",
        "chapter": 8,
        "specsFa": "لاستیک‌های آب‌بند محیط شیشه لنگه بازشو با ساختار ضدفرسایش ناشی از ارتعاشات حرکت لنگه",
        "specsEn": "Vibration-damped EPDM glazing seals designed for high dynamic cycles of the moving leaf",
        "explodedOffset": [0.15, 0.04, 0.0],
        "inspectionOffset": [0.10, 0.02, 0.0],
        "isMovingSash": True,
        "mesh": v_g_glass_m,
    })

    return parts


def get_chapter_definitions():
    """
    Returns 11 distinct educational customer-walkthrough chapters.
    Fully aligned with RESEARCH.md technical storyboard.
    """
    return [
        {
            "id": "overview",
            "number": 1,
            "titleFa": "مرور کلی سیستم لیفت‌اند‌اسلاید TS143",
            "titleEn": "TS143 System Overview",
            "descFa": "سیستم درب و پنجره کشویی ترمال بریک لیفت‌اند‌اسلاید (Lift & Slide) با عمق فریم ۱۴۳ میلی‌متر و لنگه ۷۰ میلی‌متر، ساختار دو لنگه (یک لنگه ثابت و یک لنگه بازشوی متحرک) جهت بازشوهای بزرگ و سنگین معماری.",
            "descEn": "Heavy-duty Lift & Slide thermal-break sliding system featuring 143mm frame depth and 70mm sash depth, engineered for expansive architectural openings with seamless panoramic views.",
            "camera": {"position": [0.0, -3.4, 1.1], "target": [0.0, 0.0, 1.1], "fov": 38.0},
            "highlightSubsystems": ["frame", "sash_fixed", "sash_moving"],
            "provenance": "catalogue_confirmed",
        },
        {
            "id": "frame",
            "number": 2,
            "titleFa": "فریم محیطی ۱۴۳ میلی‌متری و گوشه‌های پرچ‌شده",
            "titleEn": "143mm Perimeter Frame & Riveted Corners",
            "descFa": "چهارچوب محیطی از مقاطع آلومینیوم معماری با ضخامت جداره ۲٫۰ تا ۲٫۲ میلی‌متر ساخته می‌شود. کاتالوگ AKPAi اتصال گوشه را از نوع پرچی معرفی می‌کند؛ شکل لقمه و آرایش پرچ‌های نمایش‌داده‌شده در این مدل، جزئیات ساخت مصوب نیست.",
            "descEn": "Architectural aluminium perimeter frame with 2.0–2.2mm wall thickness. AKPAi identifies a riveted corner fixture; the cleat shape and visible rivet arrangement here are illustrative, not a manufacturing specification.",
            "camera": {"position": [0.8, -2.2, 0.4], "target": [1.1, 0.0, 0.2], "fov": 32.0},
            "highlightSubsystems": ["frame"],
            "provenance": "catalogue_confirmed",
        },
        {
            "id": "thermal_break",
            "number": 3,
            "titleFa": "جداسازی حرارتی؛ تیغه‌های پلی‌آمید (گزینه‌های ۱۸، ۲۴ و ۳۸ میلی‌متر)",
            "titleEn": "Thermal Break Barriers (Polyamide 18, 24, 38 mm Options)",
            "descFa": "دو نیمه آلومینیومی داخلی و خارجی فریم توسط تیغه‌های پلی‌آمید به یکدیگر متصل می‌شوند. کاتالوگ گزینه‌های ۱۸، ۲۴ و ۳۸ میلی‌متری را ارایه می‌دهد که پل حرارتی را قطع کرده و ضریب انتقال حرارت فریم Uf=3.2 W/m²K را محقق می‌سازد.",
            "descEn": "Polyamide strips bridge inner and outer aluminium halves, breaking thermal bridges. Catalogue specifies 18, 24, and 38mm barrier options, achieving frame thermal transmittance Uf = 3.2 W/(m²·K).",
            "camera": {"position": [0.0, -1.8, 0.25], "target": [0.0, 0.0, 0.08], "fov": 28.0},
            "highlightSubsystems": ["thermal_break"],
            "provenance": "catalogue_confirmed",
        },
        {
            "id": "sash_profiles",
            "number": 4,
            "titleFa": "پروفیل‌های لنگه ثابت، متحرک و هوابند اینترلاک",
            "titleEn": "Sash Extrusions & Central Interlock",
            "descFa": "لنگه‌های ۷۰ میلی‌متری دارای چندین محفظه توخالی مقاومتی هستند که با یراق‌آلات ۳۰۰ تا ۴۰۰ کیلوگرم سازگاری دارند. در تقاطع دو لنگه، پروفیل اینترلاک با طراحی هزارتو (Labyrinth) و نشیمنگاه هوابندهای لاستیکی EPDM سد نفوذناپذیری در برابر طوفان ایجاد می‌کند.",
            "descEn": "The catalogue lists a 70mm sash profile and compatibility with European lift-slide fittings in the 300–400kg class; this denotes a compatible hardware class, not a guaranteed sash weight rating. Meeting stiles are shown with a schematic interlock and EPDM seals.",
            "camera": {"position": [-0.05, -2.0, 1.1], "target": [0.0, 0.0, 1.1], "fov": 30.0},
            "highlightSubsystems": ["sash_fixed", "sash_moving"],
            "provenance": "catalogue_confirmed",
        },
        {
            "id": "track_guides",
            "number": 5,
            "titleFa": "ریل فلزی کف و هدایتگرهای بالایی",
            "titleEn": "Running Rail & Top Guides",
            "descFa": "در انیمیشن کارخانه، ریل فلزی کف و قطعات هدایتگر بالایی دیده می‌شوند. جنس آلیاژ ریل و کد دقیق مقطع در صفحه TS143 کاتالوگ تعیین نشده است؛ این نما جای‌گیری و ارتباط قطعات را نشان می‌دهد.",
            "descEn": "The factory animation shows a metal running rail at the sill and guide pieces at the head. The rail alloy and exact guide profile are not identified in the cited TS143 catalogue; this view explains their placement and relationship.",
            "camera": {"position": [0.4, -1.6, 0.2], "target": [0.5, 0.0, 0.08], "fov": 26.0},
            "highlightSubsystems": ["frame", "hardware"],
            "provenance": "video_observed",
        },
        {
            "id": "hardware_mechanism",
            "number": 6,
            "titleFa": "مکانیزم یراق لیفت‌اند‌اسلاید؛ بوژی‌ها، دستگیره و قفل",
            "titleEn": "Compatible Lift & Slide Mechanism",
            "descFa": "این فصل یک چیدمان شماتیک از یراق لیفت‌اند‌اسلاید سازگار اروپایی در کلاس ۳۰۰ تا ۴۰۰ کیلوگرم را نمایش می‌دهد: بوژی‌های جفت، میله رابط، دستگیره و گیربکس و اجزای قفل. مدل دقیق چرخ، یاتاقان، کورس دستگیره و قفل به سازنده یراق وابسته است.",
            "descEn": "Illustrative compatible European lift-slide hardware layout in the 300–400kg fittings class: paired roller carriages, a connecting rod, handle/gearbox and locking elements. The exact trolley, bearings, handle travel and locking layout depend on the selected hardware supplier.",
            "camera": {"position": [0.75, -1.8, 0.6], "target": [0.85, 0.0, 0.45], "fov": 28.0},
            "highlightSubsystems": ["hardware"],
            "provenance": "schematic_compatible_hardware",
        },
        {
            "id": "glazing",
            "number": 7,
            "titleFa": "بازه ضخامت شیشه ۲۸ تا ۵۲ میلی‌متر و زوارها",
            "titleEn": "28–52mm Glass Envelope & Glazing Beads",
            "descFa": "پروفیل TS143 بازه وسیعی از ضخامت‌های شیشه (۲۸ الی ۵۲ میلی‌متر) را پشتیبانی می‌کند. پکیج شیشه روی تاکوزهای لاستیکی نشسته و توسط زوارهای آلومینیومی قفل‌شونده تثبیت می‌گردد.",
            "descEn": "TS143 accommodates a 28–52mm glazing envelope. The bead and glass-support block arrangement shown here is schematic; the selected glass build-up and support layout are project-specific.",
            "camera": {"position": [0.4, -2.2, 1.2], "target": [0.5, 0.0, 1.1], "fov": 32.0},
            "highlightSubsystems": ["sash_moving", "sash_fixed"],
            "provenance": "catalogue_confirmed",
        },
        {
            "id": "seals",
            "number": 8,
            "titleFa": "لاستیک‌های هوابند و آب‌بند EPDM",
            "titleEn": "EPDM Seals & Central Interlock",
            "descFa": "گسکت‌های EPDM در نواحی پیرامونی، شیشه و محل تلاقی لنگه‌ها قرار می‌گیرند. نوع EPDM در کاتالوگ آمده است؛ شکل دقیق مقطع و تعداد لب‌های آب‌بندی در این تصویر شماتیک است.",
            "descEn": "EPDM gaskets are shown at the perimeter, glazing interfaces and meeting stile. EPDM is identified by the catalogue; the exact seal profile and lip geometry in this model are schematic.",
            "camera": {"position": [0.1, -1.9, 0.35], "target": [0.1, 0.0, 0.15], "fov": 28.0},
            "highlightSubsystems": ["seals"],
            "provenance": "catalogue_confirmed",
        },
        {
            "id": "sash_installation",
            "number": 9,
            "titleFa": "نصب لنگه روی بوژی‌ها و تنظیم رگلاژ",
            "titleEn": "Sash Engagement & Adjustment",
            "descFa": "در انیمیشن کارخانه، لنگه متحرک با بوژی‌های پایین و هدایتگرهای بالا درگیر می‌شود. روش رگلاژ ارتفاع و قفل باید مطابق دستورالعمل سازنده یراق انتخابی انجام شود.",
            "descEn": "The factory animation shows the sash being engaged with the lower carriage and upper guides. Any height or locking adjustment is specific to the selected fitting set and must follow that supplier's installation instructions.",
            "camera": {"position": [0.5, -2.5, 0.9], "target": [0.5, 0.0, 0.9], "fov": 32.0},
            "highlightSubsystems": ["sash_moving", "hardware", "frame"],
            "provenance": "video_observed",
        },
        {
            "id": "lift_slide_operation",
            "number": 10,
            "titleFa": "عملکرد حرکتی لیفت‌اند‌اسلاید (بالا رفتن و لغزش)",
            "titleEn": "Lift-Then-Slide Dynamic Operation",
            "descFa": "در عملکرد عمومی لیفت‌اند‌اسلاید، عمل‌کردن دستگیره مکانیزم سازگار را فعال می‌کند تا لنگه از حالت فشرده روی گسکت‌ها آزاد شود؛ سپس بوژی‌ها وزن لنگه را هنگام حرکت افقی حمل می‌کنند. کورس دستگیره و میزان بالابری به یراق انتخابی وابسته است.",
            "descEn": "In the general lift-slide principle, handle actuation operates compatible hardware to release the sash from its closed seal compression; roller carriages then carry it sideways. On closing, the sash lowers and recompresses the seals. Exact handle travel and lift height are supplier-specific; this motion is conceptual.",
            "camera": {"position": [-0.2, -2.8, 1.1], "target": [-0.1, 0.0, 1.1], "fov": 35.0},
            "highlightSubsystems": ["hardware", "sash_moving"],
            "provenance": "video_observed",
        },
        {
            "id": "assembled_inspection",
            "number": 11,
            "titleFa": "سیستم کامل اسمبل‌شده و نمای برش مقطع",
            "titleEn": "Assembled System & Section Inspection",
            "descFa": "سیستم یکپارچه TS143 آماده بهره‌برداری. با فعال‌سازی دکمه «نمای مقطع پروفیل»، برش مهندسی فریم و لنگه به همراه اندازه‌های واقعی کاتالوگ (۱۴۳mm فریم، ۷۰mm لنگه، ۲٫۱mm جداره و ۳۸mm پلی‌آمید) قابل بررسی است.",
            "descEn": "The complete assembled TS143 system. Activate the 'Profile Cross-Section' mode to inspect hollow profile chambers, thermal barrier bridging, and catalogue-certified dimensions in true technical section.",
            "camera": {"position": [0.0, -3.2, 1.1], "target": [0.0, 0.0, 1.1], "fov": 38.0},
            "highlightSubsystems": ["frame", "thermal_break", "sash_fixed", "sash_moving", "hardware", "seals"],
            "provenance": "catalogue_confirmed",
        }
    ]


def compile_scene_dict(parts):
    """Compiles parts list and chapters into WebGL-ready JSON."""
    materials_def = {
        "aluminium_dark": {
            "name": "Black Anodized Architectural Aluminium",
            "diffuse": [0.12, 0.12, 0.13],
            "specular": [0.55, 0.55, 0.58],
            "roughness": 0.35,
            "metalness": 0.85,
            "opacity": 1.0,
            "transparent": False
        },
        "aluminium_inner": {
            "name": "Titanium Grey Architectural Aluminium",
            "diffuse": [0.16, 0.16, 0.18],
            "specular": [0.50, 0.50, 0.52],
            "roughness": 0.40,
            "metalness": 0.75,
            "opacity": 1.0,
            "transparent": False
        },
        "glass_tinted": {
            "name": "Architectural Tinted Glazing Unit (Schematic)",
            "diffuse": [0.14, 0.32, 0.28],
            "specular": [0.85, 0.90, 0.92],
            "roughness": 0.05,
            "metalness": 0.10,
            "opacity": 0.45,
            "transparent": True
        },
        "polyamide_black": {
            "name": "Polyamide Thermal Break Barrier (18/24/38mm Options)",
            "diffuse": [0.05, 0.05, 0.06],
            "specular": [0.15, 0.15, 0.16],
            "roughness": 0.85,
            "metalness": 0.05,
            "opacity": 1.0,
            "transparent": False
        },
        "hardware_steel": {
            "name": "Polished Metal (Illustrative Hardware)",
            "diffuse": [0.72, 0.74, 0.77],
            "specular": [0.95, 0.95, 0.98],
            "roughness": 0.22,
            "metalness": 0.96,
            "opacity": 1.0,
            "transparent": False
        },
        "epdm_rubber": {
            "name": "EPDM Perimeter Weatherseal",
            "diffuse": [0.03, 0.03, 0.035],
            "specular": [0.12, 0.12, 0.12],
            "roughness": 0.90,
            "metalness": 0.0,
            "opacity": 1.0,
            "transparent": False
        }
    }

    subsystems_def = [
        {"id": "frame", "nameFa": "فریم محیطی ۱۴۳ میلی‌متری", "nameEn": "Outer Perimeter Frame", "color": "#ab0017"},
        {"id": "thermal_break", "nameFa": "تیغه‌های پلی‌آمید عایق حرارتی", "nameEn": "Polyamide Thermal Barriers", "color": "#ff334b"},
        {"id": "sash_fixed", "nameFa": "لنگه ثابت و شیشه دوجداره", "nameEn": "Fixed Sash & Glass Unit", "color": "#3b82f6"},
        {"id": "sash_moving", "nameFa": "لنگه متحرک لیفت‌اند‌اسلاید", "nameEn": "Moving Lift-Slide Sash", "color": "#10b981"},
        {"id": "hardware", "nameFa": "یراق‌آلات و بوژی‌ها", "nameEn": "Lift-Slide Hardware & Rollers", "color": "#f59e0b"},
        {"id": "seals", "nameFa": "گسکت‌های درزبند EPDM", "nameEn": "EPDM Gaskets & Weatherseals", "color": "#8b5cf6"}
    ]

    parts_output = []
    for p in parts:
        v, n, idx = p["mesh"]
        bounds = get_bounds(v)
        parts_output.append({
            "id": p["id"],
            "name": p["name"],
            "nameFa": p["nameFa"],
            "subsystem": p["subsystem"],
            "subsystemFa": p["subsystemFa"],
            "material": p["material"],
            "provenance": p["provenance"],
            "chapter": p["chapter"],
            "specsFa": p["specsFa"],
            "specsEn": p["specsEn"],
            "explodedOffset": p["explodedOffset"],
            "inspectionOffset": p["inspectionOffset"],
            "isMovingSash": p["isMovingSash"],
            "bounds": bounds,
            "vertices": [round(x, 4) for x in v],
            "normals": [round(x, 3) for x in n],
            "indices": idx
        })

    dimensions_spec = {
        "frameDepthMm": 143,
        "sashDepthMm": 70,
        "wallThicknessMm": "2.0 - 2.2",
        "glazingEnvelopeMm": "28 - 52",
        "polyamideOptionsMm": [18, 24, 38],
        "thermalTransmittanceUf": "3.2 W/(m²·K)",
        "hardwareClassKg": "300 - 400 (compatible fittings class; not a sash weight rating)",
        
        
    }

    scene_data = {
        "model": "AKPAi TS143 Lift & Slide Thermal Break System",
        "brand": "Noavaran Panjereh Sepahan",
        "brandFa": "نوآوران پنجره سپاهان",
        "dimensions": {
            "width": 2.40,
            "height": 2.20,
            "depth": 0.143,
            "unit": "meters",
            "noteEn": "2.4 m × 2.2 m is the illustrative display-model envelope, not a published TS143 catalogue size.",
            "noteFa": "ابعاد ۲٫۴ × ۲٫۲ متر فقط اندازه نمایشی مدل سه‌بعدی است و اندازه منتشرشده کاتالوگ TS143 نیست.",
        },
        "specifications": dimensions_spec,
        "cameraDefault": {
            "position": [0.0, -3.3, 1.1],
            "target": [0.0, 0.0, 1.1],
            "fov": 38.0
        },
        "materials": materials_def,
        "subsystems": subsystems_def,
        "chapters": get_chapter_definitions(),
        "parts": parts_output
    }
    return scene_data


def run_bpy_builder(parts, scene_data, output_blend, output_glb, output_json):
    """
    Executes in Blender headless environment using `bpy`.
    Creates objects, assigns materials, adds animation keyframes,
    saves .blend, and exports GLB.
    """
    import bpy

    bpy.ops.wm.read_factory_settings(use_empty=True)
    collection = bpy.context.scene.collection

    bpy_materials = {}
    for mat_id, mat_info in scene_data["materials"].items():
        mat = bpy.data.materials.new(name=mat_id)
        mat.use_nodes = True
        nodes = mat.node_tree.nodes
        bsdf = nodes.get("Principled BSDF")
        if bsdf:
            diff = mat_info["diffuse"]
            bsdf.inputs["Base Color"].default_value = (diff[0], diff[1], diff[2], mat_info["opacity"])
            bsdf.inputs["Roughness"].default_value = mat_info["roughness"]
            bsdf.inputs["Metallic"].default_value = mat_info["metalness"]
            if mat_info["transparent"]:
                mat.blend_method = 'BLEND'
                if "Transmission Weight" in bsdf.inputs:
                    bsdf.inputs["Transmission Weight"].default_value = 0.85
                elif "Transmission" in bsdf.inputs:
                    bsdf.inputs["Transmission"].default_value = 0.85
        bpy_materials[mat_id] = mat

    for p in parts:
        v, n, idx = p["mesh"]
        mesh = bpy.data.meshes.new(name=p["id"] + "_mesh")

        verts_3d = [(v[i], v[i+1], v[i+2]) for i in range(0, len(v), 3)]
        faces_3d = [(idx[i], idx[i+1], idx[i+2]) for i in range(0, len(idx), 3)]

        mesh.from_pydata(verts_3d, [], faces_3d)
        mesh.update()

        obj = bpy.data.objects.new(p["id"], mesh)
        collection.objects.link(obj)

        if p["material"] in bpy_materials:
            obj.data.materials.append(bpy_materials[p["material"]])

        obj["subsystem"] = p["subsystem"]
        obj["provenance"] = p["provenance"]
        obj["chapter"] = p["chapter"]
        obj["is_moving_sash"] = p["isMovingSash"]
        obj["exploded_dx"] = p["explodedOffset"][0]
        obj["exploded_dy"] = p["explodedOffset"][1]
        obj["exploded_dz"] = p["explodedOffset"][2]

        # Keyframe animations:
        # Frame 1: Exploded state
        ex = p["explodedOffset"]
        obj.location = (ex[0], ex[1], ex[2])
        obj.keyframe_insert(data_path="location", frame=1)

        # Frame 50: Assembled state (door closed)
        obj.location = (0.0, 0.0, 0.0)
        obj.keyframe_insert(data_path="location", frame=50)

        # Frame 80: Sash slide state (if moving sash, slide left by -0.75m)
        if p["isMovingSash"]:
            obj.location = (-0.75, 0.0, 0.0)
        else:
            obj.location = (0.0, 0.0, 0.0)
        obj.keyframe_insert(data_path="location", frame=80)

    bpy.context.scene.frame_start = 1
    bpy.context.scene.frame_end = 80

    os.makedirs(os.path.dirname(output_blend), exist_ok=True)
    os.makedirs(os.path.dirname(output_glb), exist_ok=True)
    os.makedirs(os.path.dirname(output_json), exist_ok=True)

    bpy.ops.wm.save_as_mainfile(filepath=output_blend)
    print(f"[BLENDER] Saved source blend file: {output_blend}")

    bpy.ops.export_scene.gltf(
        filepath=output_glb,
        export_format='GLB',
        use_selection=False,
        export_apply=True,
        export_yup=True
    )
    print(f"[BLENDER] Exported GLB: {output_glb}")

    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(scene_data, f, ensure_ascii=False, indent=2)
    print(f"[BLENDER] Exported Scene JSON: {output_json}")


def main():
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

    output_blend = os.path.join(repo_root, "assets", "source", "ts143.blend")
    output_glb = os.path.join(repo_root, "public", "models", "ts143.glb")
    output_json = os.path.join(repo_root, "public", "models", "ts143_scene.json")

    parts = build_ts143_detailed_system()
    scene_data = compile_scene_dict(parts)

    print(f"Total parts defined: {len(parts)}")
    total_triangles = sum(len(p['mesh'][2]) // 3 for p in parts)
    print(f"Total triangles across all parts: {total_triangles}")

    if HAS_BPY:
        print("[MODE] Running inside Blender (bpy available)...")
        run_bpy_builder(parts, scene_data, output_blend, output_glb, output_json)
    else:
        print("[MODE] Running in standalone Python mode...")
        os.makedirs(os.path.dirname(output_json), exist_ok=True)
        with open(output_json, 'w', encoding='utf-8') as f:
            json.dump(scene_data, f, ensure_ascii=False, indent=2)
        print(f"[PYTHON] Wrote WebGL scene JSON to: {output_json} ({os.path.getsize(output_json):,} bytes)")


if __name__ == "__main__":
    main()
