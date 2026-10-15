export const experience = [
  {
    time: "0.184215",
    driver: "edu:uwaterloo",
    title: "University of Waterloo",
    subtitle: "Mechatronics Engineering · co-op stream 4 · 1A term",
    details: [
      "MTE 121: C++ and VEX IQ robotics",
      "Co-op stream 4, first placement W2027",
    ],
  },
  {
    time: "1.402887",
    driver: "fostride",
    title: "Fostride",
    subtitle: "Embedded Systems Intern",
    details: [
      "R3Bin smart waste sorting bin: Raspberry Pi 5, ROS 2, Docker, computer vision",
      "Pulse: standalone ESP32 WiFi bin fill-level sensor, firmware from specification",
      "Industrial conveyor sorting line with delta-robot pick and place",
    ],
  },
  {
    time: "2.118640",
    driver: "uwfe",
    title: "UW Formula Electric",
    subtitle: "Tractive & Electrical Subteam",
    details: [
      "Python busbar thermal ampacity calculator for the tractive system",
      "EMI investigation on low-voltage communications lines: AMS boards and brake sensor",
    ],
  },
  {
    time: "3.556102",
    driver: "oshwa",
    title: "Open-source hardware",
    subtitle: "3 designs OSHWA certified",
    details: [
      "Open hardware certification across three designs",
      "Published research in embedded AI systems",
      "Smart India Hackathon national finalist",
    ],
  },
];

type PinKind = "gpio" | "power" | "ground" | "reserved";
export type Pin = {
  physical: number;
  label: string;
  kind: PinKind;
  bcm?: number;
  skill?: string;
  group?: string;
  description?: string;
};
const raw: Omit<Pin, "physical">[] = [
  { label: "3V3 power", kind: "power" },
  { label: "5V power", kind: "power" },
  {
    label: "GPIO2 / SDA1",
    bcm: 2,
    kind: "gpio",
    skill: "Python",
    group: "Languages",
    description:
      "Computer vision pipelines, robotics tools, and the UW Formula Electric thermal ampacity calculator.",
  },
  { label: "5V power", kind: "power" },
  {
    label: "GPIO3 / SCL1",
    bcm: 3,
    kind: "gpio",
    skill: "C / C++",
    group: "Languages",
    description: "Embedded firmware, actuator control, and MTE 121 robotics.",
  },
  { label: "Ground", kind: "ground" },
  {
    label: "GPIO4 / GPCLK0",
    bcm: 4,
    kind: "gpio",
    skill: "MATLAB",
    group: "Languages",
    description: "Engineering analysis and numerical computing.",
  },
  {
    label: "GPIO14 / TXD",
    bcm: 14,
    kind: "gpio",
    skill: "JavaScript",
    group: "Languages",
    description: "Interactive applications and web interfaces.",
  },
  { label: "Ground", kind: "ground" },
  {
    label: "GPIO15 / RXD",
    bcm: 15,
    kind: "gpio",
    skill: "Raspberry Pi",
    group: "Hardware",
    description:
      "CM4-powered agricultural robotics, Pi 4 driver monitoring, and Pi 5 smart waste sorting.",
  },
  {
    label: "GPIO17",
    bcm: 17,
    kind: "gpio",
    skill: "ESP32",
    group: "Hardware",
    description:
      "Standalone WiFi bin fill-level sensing and firmware for Fostride’s Pulse.",
  },
  {
    label: "GPIO18 / PCM_CLK",
    bcm: 18,
    kind: "gpio",
    skill: "Arduino",
    group: "Hardware",
    description: "PWM motor control and accessible gesture interfaces.",
  },
  {
    label: "GPIO27",
    bcm: 27,
    kind: "gpio",
    skill: "NVIDIA Jetson",
    group: "Hardware",
    description:
      "Embedded inference on a Jetson Nano for real-time waste classification.",
  },
  { label: "Ground", kind: "ground" },
  {
    label: "GPIO22",
    bcm: 22,
    kind: "gpio",
    skill: "OpenCV",
    group: "Vision & AI",
    description:
      "Real-time visual processing in driver monitoring and edge AI applications.",
  },
  {
    label: "GPIO23",
    bcm: 23,
    kind: "gpio",
    skill: "YOLOv8",
    group: "Vision & AI",
    description:
      "Object detection on edge hardware. 22 FPS weed detection on a CM4 in Krushi Yantra.",
  },
  { label: "3V3 power", kind: "power" },
  {
    label: "GPIO24",
    bcm: 24,
    kind: "gpio",
    skill: "TensorFlow Lite",
    group: "Vision & AI",
    description:
      "Efficient, quantized machine learning for on-device gesture and waste classification.",
  },
  {
    label: "GPIO10 / MOSI",
    bcm: 10,
    kind: "gpio",
    skill: "MediaPipe",
    group: "Vision & AI",
    description:
      "468-point face mesh for FocusGuard and 21-point hand landmarks for HandSteer.",
  },
  { label: "Ground", kind: "ground" },
  {
    label: "GPIO9 / MISO",
    bcm: 9,
    kind: "gpio",
    skill: "PCB Design",
    group: "Electronics",
    description:
      "Custom multi-layer boards carrying a Raspberry Pi CM4 and dual motor drivers.",
  },
  {
    label: "GPIO25",
    bcm: 25,
    kind: "gpio",
    skill: "Signal Processing",
    group: "Electronics",
    description:
      "Sensor signals and low-voltage communications, including EMI investigation.",
  },
  {
    label: "GPIO11 / SCLK",
    bcm: 11,
    kind: "gpio",
    skill: "Soldering",
    group: "Electronics",
    description: "Turning board designs into assembled hardware.",
  },
  {
    label: "GPIO8 / CE0",
    bcm: 8,
    kind: "gpio",
    skill: "Oscilloscope",
    group: "Electronics",
    description: "Bench measurement and electronics debugging.",
  },
  { label: "Ground", kind: "ground" },
  {
    label: "GPIO7 / CE1",
    bcm: 7,
    kind: "gpio",
    skill: "KiCad",
    group: "CAD & Fabrication",
    description:
      "Circuit schematics and multi-layer PCB layouts for open hardware.",
  },
  { label: "ID_SD (reserved)", kind: "reserved" },
  { label: "ID_SC (reserved)", kind: "reserved" },
  {
    label: "GPIO5",
    bcm: 5,
    kind: "gpio",
    skill: "SolidWorks",
    group: "CAD & Fabrication",
    description: "Mechanical design and the waste-sorting mechanism.",
  },
  { label: "Ground", kind: "ground" },
  {
    label: "GPIO6",
    bcm: 6,
    kind: "gpio",
    skill: "Fusion 360",
    group: "CAD & Fabrication",
    description: "Mechanical CAD and physical prototyping.",
  },
  {
    label: "GPIO12 / PWM0",
    bcm: 12,
    kind: "gpio",
    skill: "3D Printing",
    group: "CAD & Fabrication",
    description: "Rapid fabrication of custom mechanical parts.",
  },
  {
    label: "GPIO13 / PWM1",
    bcm: 13,
    kind: "gpio",
    skill: "ROS 2",
    group: "Frameworks",
    description:
      "Robotics application stacks for Krushi Yantra and Fostride’s R3Bin.",
  },
  { label: "Ground", kind: "ground" },
  {
    label: "GPIO19 / MISO1",
    bcm: 19,
    kind: "gpio",
    skill: "Linux",
    group: "Frameworks",
    description: "ARM application stacks and embedded deployment.",
  },
  {
    label: "GPIO16",
    bcm: 16,
    kind: "gpio",
    skill: "Docker",
    group: "Frameworks",
    description: "Containerized robotics and computer vision applications.",
  },
  {
    label: "GPIO26",
    bcm: 26,
    kind: "gpio",
    skill: "Git",
    group: "Frameworks",
    description:
      "Version-controlled development and open-source hardware collaboration.",
  },
  { label: "GPIO20 / MOSI1", bcm: 20, kind: "gpio" },
  { label: "Ground", kind: "ground" },
  { label: "GPIO21 / SCLK1", bcm: 21, kind: "gpio" },
];
export const pins: Pin[] = raw.map((p, i) => ({ ...p, physical: i + 1 }));
