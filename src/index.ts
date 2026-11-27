/// <reference types="node" />
import * as readline from "readline";

// ============================================================================
// 1. DATA TYPES & VARIABLES (Chapter III - Table 3.1 Row 3)
// ============================================================================

export type VehicleType = "Motorcycle" | "Car" | "Truck";

export interface ParkingRecord {
  id: number;
  plateNumber: string;
  vehicleType: VehicleType;
  hours: number;
  totalFee: number;
  isParked: boolean;
}

const PARKING_CAPACITY: number = 50;
const HOURLY_RATES: Record<VehicleType, number> = {
  Motorcycle: 3000,
  Car: 5000,
  Truck: 10000,
};

let parkingRecords: ParkingRecord[] = [];
let nextRecordId: number = 1;
let isRunning: boolean = true;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptInput(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// ============================================================================
// 2. HELPER FUNCTIONS (Validation, Cost Calculation & Formatting)
// ============================================================================

function parseVehicleType(input: string): VehicleType | null {
  const normalized: string = input.toLowerCase();
  if (normalized === "motorcycle") return "Motorcycle";
  if (normalized === "car") return "Car";
  if (normalized === "truck") return "Truck";
  return null;
}

// Cost & formatting helpers (replace/sync with Jihad's feat/cost-operators PR if customized)
function calculateParkingFee(vehicleType: VehicleType, hours: number): number {
  return HOURLY_RATES[vehicleType] * hours;
}

function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

// ============================================================================
// 3. MENU DISPLAY & CRUD FEATURE FUNCTIONS
// ============================================================================

function displayMainMenu(): void {
  const occupiedSlots: number = parkingRecords.filter((r) => r.isParked).length;
  const availableSlots: number = PARKING_CAPACITY - occupiedSlots;

  console.log("\n==========================================");
  console.log("    PARKING MANAGEMENT SYSTEM - GROUP 7   ");
  console.log("==========================================");
  console.log(`Slot Status: ${occupiedSlots}/${PARKING_CAPACITY} Occupied | ${availableSlots} Available`);
  console.log("------------------------------------------");
  console.log("[1] Vehicle Check-In (Parking Entry)");
  console.log("[2] Vehicle Check-Out (Parking Exit)");
  console.log("[3] View Parked Vehicles List");
  console.log("[4] Search Vehicle by License Plate");
  console.log("[5] Parking Summary & Revenue Report");
  console.log("[0] Exit Application");
  console.log("==========================================");
}

// Option [1] — Create Feature (Progress 3)
async function handleVehicleCheckIn(): Promise<void> {
  console.log("\n--- [1] VEHICLE CHECK-IN ---");

  // 1. Capacity Check
  const occupiedSlots: number = parkingRecords.filter((r) => r.isParked).length;
  if (occupiedSlots >= PARKING_CAPACITY) {
    console.log(`[ERROR] Parking lot is full (${occupiedSlots}/${PARKING_CAPACITY}). Cannot check in new vehicles.`);
    return;
  }

  // 2. Validate License Plate (3-level nested if: non-empty -> not duplicate -> min length)
  let plateNumber: string = "";
  while (true) {
    const rawPlate: string = await promptInput("Enter License Plate (e.g., N 1234 AB): ");
    if (rawPlate !== "") {
      const formattedPlate: string = rawPlate.toUpperCase();
      const alreadyParked: boolean = parkingRecords.some(
        (r) => r.isParked && r.plateNumber === formattedPlate
      );

      if (!alreadyParked) {
        if (formattedPlate.length >= 3) {
          plateNumber = formattedPlate;
          break;
        } else {
          console.log("[ERROR] License plate must be at least 3 characters.");
        }
      } else {
        console.log(`[ERROR] Vehicle "${formattedPlate}" is currently parked. Duplicate active check-in is not allowed.`);
      }
    } else {
      console.log("[ERROR] License plate cannot be empty.");
    }
  }

  // 3. Validate Vehicle Type
  let vehicleType: VehicleType;
  while (true) {
    const rawType: string = await promptInput("Enter Vehicle Type (Motorcycle / Car / Truck): ");
    const parsedType: VehicleType | null = parseVehicleType(rawType);

    if (parsedType !== null) {
      vehicleType = parsedType;
      break;
    }
    console.log(`[ERROR] Invalid vehicle type "${rawType}". Choose Motorcycle, Car, or Truck.`);
  }

  // 4. Validate Parking Duration (Hours)
  let hours: number = 0;
  while (true) {
    const rawHours: string = await promptInput("Enter Estimated Parking Duration (hours): ");
    const parsedHours: number = Number(rawHours);

    if (rawHours === "" || Number.isNaN(parsedHours) || parsedHours <= 0) {
      console.log(`[ERROR] Invalid duration "${rawHours}". Please enter a positive number greater than 0.`);
      continue;
    }

    hours = parsedHours;
    break;
  }

  // 5. Calculate Fee & Add Record
  const totalFee: number = calculateParkingFee(vehicleType, hours);
  const newRecord: ParkingRecord = {
    id: nextRecordId++,
    plateNumber,
    vehicleType,
    hours,
    totalFee,
    isParked: true,
  };

  parkingRecords.push(newRecord);

  // 6. Print Check-In Receipt
  console.log("\n[SUCCESS] Vehicle checked in successfully!");
  console.log("------------------------------------------");
  console.log(`Record ID    : ${newRecord.id}`);
  console.log(`License Plate: ${newRecord.plateNumber}`);
  console.log(`Vehicle Type : ${newRecord.vehicleType}`);
  console.log(`Duration     : ${newRecord.hours} hour(s)`);
  console.log(`Estimated Fee: ${formatRupiah(newRecord.totalFee)}`);
  console.log("------------------------------------------");
}

function handleCheckOutPlaceholder(): void {
  console.log("\n[INFO] Option 2 selected: Vehicle Check-Out (Module ready for Progress 4-5).");
}

function handleViewActivePlaceholder(): void {
  console.log("\n[INFO] Option 3 selected: View Parked Vehicles List (Module ready for Progress 4).");
}

function handleSearchPlatePlaceholder(): void {
  console.log("\n[INFO] Option 4 selected: Search Vehicle by License Plate (Module ready for Progress 6).");
}

function handleRevenueReportPlaceholder(): void {
  console.log("\n[INFO] Option 5 selected: Parking Summary & Revenue Report (Module ready for Progress 4).");
}

// ============================================================================
// 4. MAIN MENU LOOP & BRANCHING (Chapter III - Table 3.1 Rows 1 & 2)
// ============================================================================

async function runMainMenu(): Promise<void> {
  while (isRunning) {
    displayMainMenu();

    const rawChoice: string = await promptInput("Select menu (0-5): ");
    const menuChoice: number = Number(rawChoice);

    if (rawChoice === "" || Number.isNaN(menuChoice)) {
      console.log(`\n[ERROR] Invalid input "${rawChoice}". Please enter a number between 0 and 5.`);
      continue;
    }

    switch (menuChoice) {
      case 1:
        await handleVehicleCheckIn();
        break;
      case 2:
        handleCheckOutPlaceholder();
        break;
      case 3:
        handleViewActivePlaceholder();
        break;
      case 4:
        handleSearchPlatePlaceholder();
        break;
      case 5:
        handleRevenueReportPlaceholder();
        break;
      case 0:
        console.log("\n[EXIT] Thank you for using the Parking Management System. Goodbye!");
        isRunning = false;
        break;
      default:
        console.log(`\n[ERROR] Option "${menuChoice}" is not available. Please choose a number from 0-5.`);
        break;
    }
  }

  rl.close();
}

runMainMenu();