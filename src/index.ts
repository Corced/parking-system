/// <reference types="node" />
// import * as readline from "readline";

// ============================================================================
// 1. DATA TYPES & VARIABLES (Bab III - Tabel 3.1 Baris 3)
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

// Antarmuka input/output terminal
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
// 2. TAMPILAN MENU & FUNGSI PLACEHOLDER (Akan diisi logika penuh di Progress 3)
// ============================================================================

function displayMainMenu(): void {
  const occupiedSlots: number = parkingRecords.filter((r) => r.isParked).length;
  const availableSlots: number = PARKING_CAPACITY - occupiedSlots;

  console.log("\n==========================================");
  console.log("   SISTEM MANAJEMEN PARKIR - KELOMPOK 7   ");
  console.log("==========================================");
  console.log(`Status Slot: ${occupiedSlots}/${PARKING_CAPACITY} Terisi | ${availableSlots} Tersedia`);
  console.log("------------------------------------------");
  console.log("[1] Check-In Kendaraan (Parkir Masuk)");
  console.log("[2] Check-Out Kendaraan (Parkir Keluar)");
  console.log("[3] Lihat Daftar Kendaraan Terparkir");
  console.log("[4] Cari Kendaraan Berdasarkan Nomor Plat");
  console.log("[5] Ringkasan Parkir & Laporan Pendapatan");
  console.log("[0] Keluar Aplikasi");
  console.log("==========================================");
}

function handleCheckInPlaceholder(): void {
  console.log("\n[INFO] Opsi 1 dipilih: Check-In Kendaraan (Modul siap untuk Progress 3).");
}

function handleCheckOutPlaceholder(): void {
  console.log("\n[INFO] Opsi 2 dipilih: Check-Out Kendaraan (Modul siap untuk Progress 3).");
}

function handleViewActivePlaceholder(): void {
  console.log("\n[INFO] Opsi 3 dipilih: Lihat Daftar Kendaraan Terparkir (Modul siap untuk Progress 3).");
}

function handleSearchPlatePlaceholder(): void {
  console.log("\n[INFO] Opsi 4 dipilih: Cari Kendaraan Berdasarkan Nomor Plat (Modul siap untuk Progress 3).");
}

function handleRevenueReportPlaceholder(): void {
  console.log("\n[INFO] Opsi 5 dipilih: Ringkasan Parkir & Laporan Pendapatan (Modul siap untuk Progress 3).");
}

// ============================================================================
// 3. PERULANGAN & PERCABANGAN MENU UTAMA (Bab III - Tabel 3.1 Baris 1 & 2)
// ============================================================================

async function runMainMenu(): Promise<void> {
  while (isRunning) {
    displayMainMenu();

    const rawChoice: string = await promptInput("Pilih menu (0-5): ");
    const menuChoice: number = Number(rawChoice);

    // Validasi input angka sebelum masuk ke switch
    if (rawChoice === "" || Number.isNaN(menuChoice)) {
      console.log(`\n[ERROR] Input "${rawChoice}" tidak valid. Masukkan angka antara 0 sampai 5.`);
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
        console.log("\n[KELUAR] Terima kasih telah menggunakan Sistem Manajemen Parkir. Sampai jumpa!");
        isRunning = false;
        break;
      default:
        console.log(`\n[ERROR] Pilihan "${menuChoice}" tidak tersedia. Silakan pilih angka 0-5.`);
        break;
    }
  }

  rl.close();
}

// Jalankan aplikasi
runMainMenu();