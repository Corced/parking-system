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
// 2. MENU DISPLAY & PLACEHOLDER FUNCTIONS (Full logic to be added in Progress 3)
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

function handleCheckInPlaceholder(): void {
  console.log("\n[INFO] Option 1 selected: Vehicle Check-In (Module ready for Progress 3).");
}

function handleCheckOutPlaceholder(): void {
  console.log("\n[INFO] Option 2 selected: Vehicle Check-Out (Module ready for Progress 3).");
}

function handleViewActivePlaceholder(): void {
  console.log("\n[INFO] Option 3 selected: View Parked Vehicles List (Module ready for Progress 3).");
}

function handleSearchPlatePlaceholder(): void {
  console.log("\n[INFO] Option 4 selected: Search Vehicle by License Plate (Module ready for Progress 3).");
}

function handleRevenueReportPlaceholder(): void {
  console.log("\n[INFO] Option 5 selected: Parking Summary & Revenue Report (Module ready for Progress 3).");
}

// ============================================================================
// 3. MAIN MENU LOOP & BRANCHING (Chapter III - Table 3.1 Rows 1 & 2)
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
        handleCheckInPlaceholder();
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