// Demo users untuk multi-role system
// Role: admin (akses penuh), petugas (kelola data, terbatas hapus), pimpinan (view only)
export const demoUsers = [
  {
    id: 1,
    name: "Admin SmartDuck",
    email: "admin@smartduck.com",
    password: "admin123",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Admin&background=15803d&color=fff&bold=true",
  },
  {
    id: 2,
    name: "Budi Petugas",
    email: "petugas@smartduck.com",
    password: "petugas123",
    role: "petugas",
    avatar: "https://ui-avatars.com/api/?name=Budi+P&background=2563eb&color=fff&bold=true",
  },
  {
    id: 3,
    name: "Pak Harto",
    email: "pimpinan@smartduck.com",
    password: "pimpinan123",
    role: "pimpinan",
    avatar: "https://ui-avatars.com/api/?name=Pak+H&background=d97706&color=fff&bold=true",
  },
];

// Role permissions
export const rolePermissions = {
  admin: {
    label: "Administrator",
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canViewDashboard: true,
    canViewMonitoring: true,
    canViewLaporan: true,
    canManageKandang: true,
    canManagePakan: true,
    canManageProduksi: true,
    canManageUsers: true,
  },
  petugas: {
    label: "Petugas Lapangan",
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canViewDashboard: true,
    canViewMonitoring: true,
    canViewLaporan: true,
    canManageKandang: true,
    canManagePakan: true,
    canManageProduksi: true,
    canManageUsers: false,
  },
  pimpinan: {
    label: "Pimpinan",
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canViewDashboard: true,
    canViewMonitoring: true,
    canViewLaporan: true,
    canManageKandang: false,
    canManagePakan: false,
    canManageProduksi: false,
    canManageUsers: false,
  },
};
