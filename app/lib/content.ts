// ─────────────────────────────────────────────────────────────
// Board identity
// ─────────────────────────────────────────────────────────────

export const board = {
  name: "Ishaan Aras",
  model: "Mechatronics Engineering, University of Waterloo",
  revision: "1A",
  tagline: "Embedded systems, robotics, and edge AI. I take hardware from schematic to deployment.",
  email: "i2aras@uwaterloo.ca",
  linkedin: "https://www.linkedin.com/in/ishaan-aras",
  availability: "W2027 co-op",
};

export const specs: { label: string; value: string }[] = [
  { label: "board", value: "Ishaan Aras, rev 1A" },
  { label: "arch", value: "mechatronics (mech + elec + software)" },
  { label: "host", value: "University of Waterloo" },
  { label: "stream", value: "co-op stream 4, 1A term" },
  { label: "role", value: "embedded systems intern @ Fostride" },
  { label: "uptime", value: "4 builds shipped" },
  { label: "certs", value: "3x OSHWA certified open hardware" },
  { label: "status", value: "available W2027" },
];

// ─────────────────────────────────────────────────────────────
// Projects
//
// Each project declares the skills it used. That list is the single
// source of truth for the link between this section and the pinout:
// pins look up their projects from here rather than keeping a second
// copy that could drift.
// ─────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  tagline: string;
  category: string;
  bus: string;
  metric: string;
  metricLabel: string;
  summary: string;
  lines: string[];
  skills: string[];
}

export const projects: Project[] = [
  {
    id: "krushi-yantra",
    name: "Krushi Yantra",
    tagline: "A smarter way to grow.",
    category: "Robotics",
    bus: "Bus 001 Device 001",
    metric: "22 FPS",
    metricLabel: "on-device detection",
    summary:
      "Autonomous agri-robot for small-plot Indian farms. It finds weeds, navigates by GPS, and runs all day on solar.",
    lines: [
      "Custom multi-layer PCB carrying a Raspberry Pi CM4 and dual motor drivers",
      "YOLOv8 weed detection at 22 FPS on edge hardware, no cloud round-trip",
      "RTK-GPS waypoint navigation holding 2cm accuracy across a plot",
      "Solar charging with an 8 hour runtime per cycle",
    ],
    skills: ["Python", "Raspberry Pi", "YOLOv8", "KiCad", "PCB Design", "Soldering", "ROS 2", "Linux"],
  },
  {
    id: "focusguard",
    name: "FocusGuard",
    tagline: "Keeping eyes on the road.",
    category: "Edge AI",
    bus: "Bus 001 Device 002",
    metric: "< 100 ms",
    metricLabel: "inference latency",
    summary:
      "Driver drowsiness detection. It watches the eyes and raises an alarm before the driver knows they are going.",
    lines: [
      "MediaPipe face mesh tracking 468 landmarks in real time",
      "Eye aspect ratio algorithm for blink rate and drowsiness onset",
      "Sub-100ms inference pipeline on a Raspberry Pi 4, no accelerator",
      "Audio and visual alerts with configurable thresholds per driver",
    ],
    skills: ["Python", "MediaPipe", "OpenCV", "Raspberry Pi", "Linux"],
  },
  {
    id: "handsteer",
    name: "HandSteer",
    tagline: "A more human interface.",
    category: "Robotics",
    bus: "Bus 002 Device 001",
    metric: "< 80 ms",
    metricLabel: "gesture to actuator",
    summary:
      "Gesture-controlled vehicle interface. Hand tracking replaces the wheel, built for accessibility research.",
    lines: [
      "21-point hand landmark detection through MediaPipe",
      "Custom gesture classifier trained on 2000+ labelled samples",
      "PWM motor control mapped to hand angle and finger state",
      "Under 80ms from gesture to actuator response",
    ],
    skills: ["C / C++", "MediaPipe", "TensorFlow Lite", "Arduino", "Signal Processing"],
  },
  {
    id: "waste-sorting",
    name: "Edge AI Waste Sorting",
    tagline: "Less landfill. More possibility.",
    category: "Edge AI",
    bus: "Bus 002 Device 002",
    metric: "94%",
    metricLabel: "classification accuracy",
    summary:
      "Real-time waste classification on embedded hardware. It pulls recyclables off a moving conveyor at line speed.",
    lines: [
      "MobileNetV2 classifier at 94% accuracy across 6 waste categories",
      "TensorFlow Lite quantised model deployed to a Jetson Nano",
      "Servo-actuated sorting arm triggered on classification",
      "OSHWA-certified open hardware design, schematics public",
    ],
    skills: ["Python", "TensorFlow Lite", "NVIDIA Jetson", "SolidWorks", "3D Printing", "Docker"],
  },
];

// ─────────────────────────────────────────────────────────────
// Skill groups
// ─────────────────────────────────────────────────────────────

export interface SkillGroup {
  name: string;
  label: string;
  description: string;
  color: string;
}

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    label: "Talking to machines",
    description: "From low-level firmware to vision pipelines and the interfaces on top of them.",
    color: "#C51A4A",
  },
  {
    name: "Hardware",
    label: "Small boards, big ideas",
    description: "The embedded platforms that turn software into something you can pick up.",
    color: "#D9A842",
  },
  {
    name: "Vision & AI",
    label: "Giving machines perception",
    description: "Real-time computer vision and efficient inference, running at the edge rather than in a datacentre.",
    color: "#75A928",
  },
  {
    name: "Electronics",
    label: "Connecting the dots",
    description: "Schematic through to assembled board, then measured and debugged on the bench.",
    color: "#4D9FD6",
  },
  {
    name: "CAD & Fabrication",
    label: "Designed to be built",
    description: "Mechanical design, board layout, and the rapid prototyping that catches mistakes early.",
    color: "#B07BC4",
  },
  {
    name: "Frameworks",
    label: "The systems underneath",
    description: "The robotics software and tooling that holds a build together once it leaves the bench.",
    color: "#D4785A",
  },
];

export const groupColor = (name: string) =>
  skillGroups.find(g => g.name === name)?.color ?? "var(--silk-3)";

// ─────────────────────────────────────────────────────────────
// GPIO header — real Raspberry Pi 40-pin layout.
// Power, ground and bus functions are accurate to the hardware.
// Signal pins carry the skills.
// ─────────────────────────────────────────────────────────────

export type PinKind = "3v3" | "5v" | "gnd" | "signal" | "id" | "spare";

export interface Pin {
  n: number;              // physical pin number
  kind: PinKind;
  fn: string;             // real hardware function
  bcm?: number;           // BCM GPIO number
  skill?: string;         // mapped skill
  group?: string;         // skill group
  detail?: string;        // what he actually does with it
}

export const pins: Pin[] = [
  { n: 1,  kind: "3v3", fn: "3V3 power" },
  { n: 2,  kind: "5v",  fn: "5V power" },

  { n: 3,  kind: "signal", bcm: 2,  fn: "GPIO2 / SDA1", skill: "Python", group: "Languages",
    detail: "Primary language. Vision pipelines, ROS 2 nodes, data tooling, anything that has to ship fast." },
  { n: 4,  kind: "5v",  fn: "5V power" },

  { n: 5,  kind: "signal", bcm: 3,  fn: "GPIO3 / SCL1", skill: "C / C++", group: "Languages",
    detail: "Firmware and anything latency-bound. Bare-metal on AVR and ESP32, Arduino core, real-time loops." },
  { n: 6,  kind: "gnd", fn: "Ground" },

  { n: 7,  kind: "signal", bcm: 4,  fn: "GPIO4 / GPCLK0", skill: "MATLAB", group: "Languages",
    detail: "Control system modelling and signal analysis. Simulink for plant models before committing to hardware." },
  { n: 8,  kind: "signal", bcm: 14, fn: "GPIO14 / TXD", skill: "JavaScript", group: "Languages",
    detail: "Dashboards and telemetry front-ends for embedded devices. This page, for one." },

  { n: 9,  kind: "gnd", fn: "Ground" },
  { n: 10, kind: "signal", bcm: 15, fn: "GPIO15 / RXD", skill: "Raspberry Pi", group: "Hardware",
    detail: "Main compute target. CM4 on custom carrier boards, Pi 4/5 for vision work, Docker and ROS 2 on 64-bit Linux." },

  { n: 11, kind: "signal", bcm: 17, fn: "GPIO17", skill: "ESP32", group: "Hardware",
    detail: "WiFi-connected sensor nodes. Deep-sleep power budgeting, OTA updates, MQTT telemetry." },
  { n: 12, kind: "signal", bcm: 18, fn: "GPIO18 / PCM_CLK", skill: "Arduino", group: "Hardware",
    detail: "Rapid prototyping and motor control. Where a build starts before it earns a custom board." },

  { n: 13, kind: "signal", bcm: 27, fn: "GPIO27", skill: "NVIDIA Jetson", group: "Hardware",
    detail: "When the model will not fit on a Pi. TensorRT-optimised inference on Nano and Orin." },
  { n: 14, kind: "gnd", fn: "Ground" },

  { n: 15, kind: "signal", bcm: 22, fn: "GPIO22", skill: "OpenCV", group: "Vision & AI",
    detail: "Preprocessing, calibration, and the classical computer vision that runs before a model does." },
  { n: 16, kind: "signal", bcm: 23, fn: "GPIO23", skill: "YOLOv8", group: "Vision & AI",
    detail: "Object detection on edge hardware, tuned until it holds frame rate on a board that fits in your hand." },

  { n: 17, kind: "3v3", fn: "3V3 power" },
  { n: 18, kind: "signal", bcm: 24, fn: "GPIO24", skill: "TensorFlow Lite", group: "Vision & AI",
    detail: "Quantised models for constrained targets, traded down until they fit the silicon and still hold accuracy." },

  { n: 19, kind: "signal", bcm: 10, fn: "GPIO10 / MOSI", skill: "MediaPipe", group: "Vision & AI",
    detail: "Landmark tracking. Face mesh for drowsiness detection, hand tracking for gesture control." },
  { n: 20, kind: "gnd", fn: "Ground" },

  { n: 21, kind: "signal", bcm: 9,  fn: "GPIO9 / MISO", skill: "PCB Design", group: "Electronics",
    detail: "Schematic capture through to fab files. Multi-layer boards with CM4 connectors and motor drivers." },
  { n: 22, kind: "signal", bcm: 25, fn: "GPIO25", skill: "Signal Processing", group: "Electronics",
    detail: "Filtering noisy sensor data. EMI investigation on low-voltage comms lines for UW Formula Electric." },

  { n: 23, kind: "signal", bcm: 11, fn: "GPIO11 / SCLK", skill: "Soldering", group: "Electronics",
    detail: "Through-hole and SMD down to 0603 by hand. Rework, reflow, and fixing boards that came back wrong." },
  { n: 24, kind: "signal", bcm: 8,  fn: "GPIO8 / CE0", skill: "Oscilloscope", group: "Electronics",
    detail: "Debugging what the datasheet does not explain. Bus timing, PWM verification, chasing noise to its source." },

  { n: 25, kind: "gnd", fn: "Ground" },
  { n: 26, kind: "signal", bcm: 7,  fn: "GPIO7 / CE1", skill: "KiCad", group: "CAD & Fabrication",
    detail: "Board layout tool of choice. An open-source toolchain for open hardware." },

  { n: 27, kind: "id", fn: "ID_SD (reserved)" },
  { n: 28, kind: "id", fn: "ID_SC (reserved)" },

  { n: 29, kind: "signal", bcm: 5,  fn: "GPIO5", skill: "SolidWorks", group: "CAD & Fabrication",
    detail: "Mechanical design and assemblies. Chassis, mounts, and enclosures that survive field use." },
  { n: 30, kind: "gnd", fn: "Ground" },

  { n: 31, kind: "signal", bcm: 6,  fn: "GPIO6", skill: "Fusion 360", group: "CAD & Fabrication",
    detail: "Parametric modelling and CAM. Faster than SolidWorks for a one-off bracket." },
  { n: 32, kind: "signal", bcm: 12, fn: "GPIO12 / PWM0", skill: "3D Printing", group: "CAD & Fabrication",
    detail: "FDM in ABS and PETG for parts that take load and heat. Print, test, revise, print again." },

  { n: 33, kind: "signal", bcm: 13, fn: "GPIO13 / PWM1", skill: "ROS 2", group: "Frameworks",
    detail: "Node graphs for real robots. Navigation stack, sensor fusion, and the plumbing between them." },
  { n: 34, kind: "gnd", fn: "Ground" },

  { n: 35, kind: "signal", bcm: 19, fn: "GPIO19 / MISO1", skill: "Linux", group: "Frameworks",
    detail: "Embedded Linux on ARM. systemd services, device tree overlays, cross-compilation, kernel modules." },
  { n: 36, kind: "signal", bcm: 16, fn: "GPIO16", skill: "Docker", group: "Frameworks",
    detail: "Reproducible deployment to field hardware. Containerised ROS 2 so the robot runs what the bench ran." },

  { n: 37, kind: "signal", bcm: 26, fn: "GPIO26", skill: "Git", group: "Frameworks",
    detail: "Version control across firmware, CAD, and board files. Branch discipline on team projects." },
  { n: 38, kind: "spare",  bcm: 20, fn: "GPIO20 / MOSI1" },

  { n: 39, kind: "gnd", fn: "Ground" },
  { n: 40, kind: "spare",  bcm: 21, fn: "GPIO21 / SCLK1" },
];

// ─── derived links, computed once from projects[].skills ───

/** Projects that used a given skill. */
export const projectsUsingSkill = (skill: string): Project[] =>
  projects.filter(p => p.skills.includes(skill));

/** Physical pin numbers a project lit up. */
export const pinsForProject = (p: Project): number[] =>
  pins.filter(pin => pin.skill && p.skills.includes(pin.skill)).map(pin => pin.n);

/** Pins belonging to a skill group. */
export const pinsInGroup = (group: string): number[] =>
  pins.filter(p => p.group === group).map(p => p.n);

export const skillsInGroup = (group: string): Pin[] =>
  pins.filter(p => p.group === group);

export const pinBySkill = (skill: string): Pin | undefined =>
  pins.find(p => p.skill === skill);

// ─────────────────────────────────────────────────────────────
// Kernel log — experience as dmesg
// ─────────────────────────────────────────────────────────────

export interface LogEntry {
  t: string;
  subsys: string;
  msg: string;
  level?: "ok" | "info";
  detail?: string[];
}

export const kernelLog: LogEntry[] = [
  {
    t: "0.000000", subsys: "board", level: "info",
    msg: "Ishaan Aras rev 1A, mechatronics @ University of Waterloo",
  },
  {
    t: "0.184215", subsys: "edu", level: "ok",
    msg: "uwaterloo: mechatronics engineering, co-op stream 4, 1A term",
    detail: [
      "MTE 121, C++ and VEX IQ robotics",
      "Co-op stream 4, first placement W2027",
    ],
  },
  {
    t: "1.402887", subsys: "fostride", level: "ok",
    msg: "probe successful: embedded systems intern",
    detail: [
      "R3Bin smart waste sorting bin: Pi 5, ROS 2, Docker, computer vision",
      "Pulse: standalone ESP32 WiFi bin fill-level sensor, firmware from spec",
      "Industrial conveyor sorting line with delta-robot pick and place",
    ],
  },
  {
    t: "2.118640", subsys: "uwfe", level: "ok",
    msg: "uw formula electric: tractive and electrical subteam",
    detail: [
      "Python busbar thermal ampacity calculator for the tractive system",
      "EMI investigation on low-voltage comms lines: AMS boards, brake sensor",
    ],
  },
  {
    t: "3.556102", subsys: "oshwa", level: "ok",
    msg: "3 designs certified open-source hardware",
  },
  {
    t: "4.009933", subsys: "sched", level: "info",
    msg: "co-op slot open for W2027, accepting interrupts",
  },
];

// ─────────────────────────────────────────────────────────────
// POST results
// ─────────────────────────────────────────────────────────────

export const postResults: { test: string; result: string }[] = [
  { test: "open hardware certification", result: "3x OSHWA certified" },
  { test: "smart india hackathon", result: "national finalist" },
  { test: "embedded AI research", result: "published" },
  { test: "edge inference latency", result: "< 100 ms" },
];
