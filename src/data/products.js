import board from "@/assets/p-board.jpg";
import sensor from "@/assets/p-sensor.jpg";
import ic from "@/assets/p-ic.jpg";
import passive from "@/assets/p-passive.jpg";
import power from "@/assets/p-power.jpg";
import semi from "@/assets/p-semi.jpg";
import acc from "@/assets/p-acc.jpg";

export const categories = [
  { id: "microcontrollers", name: "Microcontrollers", image: board, blurb: "ARM, AVR & RISC-V" },
  { id: "dev-boards", name: "Development Boards", image: board, blurb: "Prototype faster" },
  { id: "sensors", name: "Sensors", image: sensor, blurb: "Sense everything" },
  { id: "ics", name: "Integrated Circuits", image: ic, blurb: "Logic, memory, DSP" },
  { id: "semiconductors", name: "Semiconductors", image: semi, blurb: "MOSFETs & diodes" },
  { id: "passives", name: "Resistors & Capacitors", image: passive, blurb: "Precision passives" },
  { id: "power", name: "Power Supplies", image: power, blurb: "Clean, stable power" },
  { id: "accessories", name: "Accessories", image: acc, blurb: "Tools & wiring" },
];

export const brands = ["Arduino", "Espressif", "Raspberry Pi", "STMicro", "Texas Instruments", "Infineon", "Vishay", "Mean Well"];

const g = (main, ...rest) => [main, ...rest];

export const products = [
  { id: "arduino-uno-r3", name: "Arduino Uno R3", category: "dev-boards", brand: "Arduino", price: 1299, mrp: 1599, rating: 4.8, reviews: 2140, stock: 48, image: board, images: g(board, ic, acc), featured: true,
    description: "The classic ATmega328P board for learning and prototyping. 14 digital I/O, 6 analog inputs, USB-B programming.",
    specs: { MCU: "ATmega328P", Clock: "16 MHz", Flash: "32 KB", SRAM: "2 KB", "Operating Voltage": "5V", "Digital I/O": "14" } },
  { id: "esp32-devkit-v1", name: "ESP32 DevKit V1", category: "microcontrollers", brand: "Espressif", price: 549, mrp: 699, rating: 4.7, reviews: 3820, stock: 120, image: board, images: g(board, ic), featured: true,
    description: "Dual-core Xtensa LX6 with integrated Wi-Fi and Bluetooth. Ideal for IoT products.",
    specs: { MCU: "ESP32-WROOM-32", Cores: "2 × 240 MHz", Flash: "4 MB", Wireless: "Wi-Fi + BT 4.2", "Operating Voltage": "3.3V" } },
  { id: "rpi-pico-w", name: "Raspberry Pi Pico W", category: "microcontrollers", brand: "Raspberry Pi", price: 589, mrp: 649, rating: 4.9, reviews: 1620, stock: 64, image: board, images: g(board, acc), featured: true,
    description: "RP2040 dual-core Cortex-M0+ with onboard 2.4GHz wireless. Programmable in MicroPython or C/C++.",
    specs: { MCU: "RP2040", Clock: "133 MHz", SRAM: "264 KB", Flash: "2 MB", Wireless: "802.11n" } },
  { id: "stm32-bluepill", name: "STM32F103C8T6 Blue Pill", category: "microcontrollers", brand: "STMicro", price: 399, mrp: 499, rating: 4.5, reviews: 940, stock: 0, image: board, images: g(board, ic),
    description: "ARM Cortex-M3 board for performance-hungry embedded projects at a hobbyist price.",
    specs: { MCU: "STM32F103C8T6", Clock: "72 MHz", Flash: "64 KB", SRAM: "20 KB" } },
  { id: "hc-sr04", name: "HC-SR04 Ultrasonic Sensor", category: "sensors", brand: "Arduino", price: 119, mrp: 149, rating: 4.6, reviews: 5210, stock: 300, image: sensor, images: g(sensor), featured: true,
    description: "Non-contact distance measurement from 2cm to 400cm with 3mm accuracy.",
    specs: { Range: "2–400 cm", Accuracy: "±3 mm", Voltage: "5V", Frequency: "40 kHz" } },
  { id: "dht22", name: "DHT22 Temperature & Humidity", category: "sensors", brand: "Arduino", price: 289, mrp: 349, rating: 4.4, reviews: 1890, stock: 85, image: sensor, images: g(sensor),
    description: "Calibrated digital temperature and humidity sensor with single-wire interface.",
    specs: { "Temp Range": "-40 to 80°C", "Humidity Range": "0–100% RH", Accuracy: "±0.5°C", Voltage: "3.3–6V" } },
  { id: "mpu6050", name: "MPU-6050 6-Axis IMU", category: "sensors", brand: "Texas Instruments", price: 179, mrp: 229, rating: 4.5, reviews: 2300, stock: 6, image: sensor, images: g(sensor, ic),
    description: "3-axis gyroscope plus 3-axis accelerometer with onboard Digital Motion Processor.",
    specs: { Interface: "I²C", Gyro: "±250–2000 °/s", Accel: "±2–16 g", Voltage: "3.3–5V" } },
  { id: "ne555", name: "NE555 Timer IC (Pack of 10)", category: "ics", brand: "Texas Instruments", price: 99, mrp: 129, rating: 4.7, reviews: 3100, stock: 500, image: ic, images: g(ic),
    description: "The legendary precision timer for astable, monostable and PWM circuits.",
    specs: { Package: "DIP-8", Supply: "4.5–16V", "Max Freq": "500 kHz", Quantity: "10 pcs" } },
  { id: "lm358", name: "LM358 Dual Op-Amp (Pack of 10)", category: "ics", brand: "Texas Instruments", price: 89, mrp: 119, rating: 4.6, reviews: 1420, stock: 420, image: ic, images: g(ic),
    description: "Low-power dual operational amplifier for signal conditioning and filters.",
    specs: { Package: "DIP-8", Supply: "3–32V", Bandwidth: "1 MHz", Quantity: "10 pcs" } },
  { id: "atmega328p", name: "ATmega328P-PU Chip", category: "ics", brand: "STMicro", price: 329, mrp: 399, rating: 4.8, reviews: 760, stock: 140, image: ic, images: g(ic, board), featured: true,
    description: "Bare AVR microcontroller in DIP-28 for custom Arduino-compatible PCBs.",
    specs: { Package: "DIP-28", Flash: "32 KB", EEPROM: "1 KB", Clock: "20 MHz max" } },
  { id: "irfz44n", name: "IRFZ44N N-Channel MOSFET (5 pcs)", category: "semiconductors", brand: "Infineon", price: 149, mrp: 199, rating: 4.6, reviews: 1980, stock: 260, image: semi, images: g(semi),
    description: "55V 49A power MOSFET for motor drivers, LED dimming and switching supplies.",
    specs: { Package: "TO-220", Vds: "55V", Id: "49A", Rds: "17.5 mΩ", Quantity: "5 pcs" } },
  { id: "1n4007", name: "1N4007 Rectifier Diodes (50 pcs)", category: "semiconductors", brand: "Vishay", price: 79, mrp: 99, rating: 4.7, reviews: 2650, stock: 800, image: semi, images: g(semi),
    description: "General-purpose 1A 1000V rectifier diodes.",
    specs: { Vrrm: "1000V", If: "1A", Package: "DO-41", Quantity: "50 pcs" } },
  { id: "resistor-kit", name: "Resistor Kit 600 pcs (30 values)", category: "passives", brand: "Vishay", price: 349, mrp: 449, rating: 4.8, reviews: 4120, stock: 190, image: passive, images: g(passive), featured: true,
    description: "1/4W metal-film ±1% resistors from 10Ω to 1MΩ, neatly labelled.",
    specs: { Tolerance: "±1%", Power: "0.25W", Values: "30", Quantity: "600 pcs" } },
  { id: "capacitor-kit", name: "Electrolytic Capacitor Kit 120 pcs", category: "passives", brand: "Vishay", price: 399, mrp: 499, rating: 4.5, reviews: 1180, stock: 75, image: passive, images: g(passive),
    description: "12 values from 0.22µF to 1000µF rated up to 50V.",
    specs: { Range: "0.22–1000 µF", Voltage: "16–50V", Values: "12", Quantity: "120 pcs" } },
  { id: "meanwell-12v", name: "Mean Well LRS-50-12 SMPS", category: "power", brand: "Mean Well", price: 1149, mrp: 1399, rating: 4.9, reviews: 870, stock: 30, image: power, images: g(power), featured: true,
    description: "Industrial-grade 12V 4.2A enclosed switching power supply.",
    specs: { Output: "12V 4.2A", Power: "50W", Input: "85–264 VAC", Efficiency: "86%" } },
  { id: "lm2596", name: "LM2596 Buck Converter Module", category: "power", brand: "Texas Instruments", price: 129, mrp: 169, rating: 4.4, reviews: 3360, stock: 340, image: power, images: g(power),
    description: "Adjustable DC-DC step-down module, 3–40V in, 1.25–35V out.",
    specs: { Input: "3–40V", Output: "1.25–35V", Current: "3A max", Efficiency: "92%" } },
  { id: "breadboard-kit", name: "Breadboard + 65 Jumper Wires", category: "accessories", brand: "Arduino", price: 199, mrp: 249, rating: 4.6, reviews: 2890, stock: 220, image: acc, images: g(acc),
    description: "830-point solderless breadboard with flexible male-to-male jumpers.",
    specs: { Points: "830", Jumpers: "65", Material: "ABS" } },
  { id: "soldering-station", name: "60W Temperature-Controlled Soldering Iron", category: "accessories", brand: "Mean Well", price: 899, mrp: 1199, rating: 4.5, reviews: 640, stock: 22, image: acc, images: g(acc),
    description: "Adjustable 200–450°C iron with 5 interchangeable tips.",
    specs: { Power: "60W", Temp: "200–450°C", Tips: "5" } },
];
