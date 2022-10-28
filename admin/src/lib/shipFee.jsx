//   // State giá phí vận chuyển chính ngạch

const tyGia = () => {
    return 3650
}

const haNoiAreaFeePacketKg = () => [
    { label: ">500kg", value: "Liên Hệ" },
    { label: "200kg -> 500kg", value: 22000 },
    { label: "100kg -> 200kg", value: 24000 },
    { label: "30kg -> 100kg", value: 26000 },
    { label: "10kg -> 30kg", value: 28000 },
    { label: "0 -> 10kg", value: 30000 },
];

const haNoiAreaFeePacketM3 = () => [
    { label: ">20m3", value: "Liên Hệ" },
    { label: "10m3 -> 20m3", value: 3500000 },
    { label: "5m3 -> 10m3", value: 3600000 },
    { label: "<5m3", value: 3800000 },
];

const HCMAreaFeePacketKg = () => [
    { label: ">500kg", value: "Liên Hệ" },
    { label: "200kg -> 500kg", value: 23000 },
    { label: "100kg -> 200kg", value: 26000 },
    { label: "30kg -> 100kg", value: 28000 },
    { label: "10kg -> 30kg", value: 30000 },
    { label: "0 -> 10kg", value: 35000 },
];

const HCMAreaFeePacketM3 = () => [
    { label: ">20m3", value: "Liên Hệ" },
    { label: "10m3 -> 20m3", value: 4000000 },
    { label: "5m3 -> 10m3", value: 4100000 },
    { label: "<5m3", value: 4200000 },
];

//Phí vận chuyển Chính ngạch

const haNoiAreaFeeOfficicalkg = () => [
    { label: ">500kg", value: "Liên Hệ" },
    { label: "200kg -> 500kg", value: 8000 },
    { label: "100kg -> 200kg", value: 26000 },
    { label: "30kg -> 100kg", value: 28000 },
];

const haNoiAreaFeeOfficicalM3 = () => [
    { label: ">20m3", value: 900000 },
    { label: "10m3 -> 20m3", value: 1100000 },
    { label: "5m3 -> 10m3", value: 1400000 },
    { label: "<5m3", value: 1600000 },
];
const HCMAreaFeeOfficicalkg = () => [
    { label: ">500kg", value: "Liên Hệ" },
    { label: "200kg -> 500kg", value: 16000 },
    { label: "100kg -> 200kg", value: 18000 },
    { label: "30kg -> 100kg", value: 20000 },
];

const HCMAreaFeeOfficicalM3 = () => [
    { label: ">20m3", value: 1400000 },
    { label: "10m3 -> 20m3", value: 1600000 },
    { label: "5m3 -> 10m3", value: 1900000 },
    { label: "<5m3", value: 2100000 },
];
const haiPhongAreaFeeOfficicalkg = () => [
    { label: ">500kg", value: "Liên Hệ" },
    { label: "200kg -> 500kg", value: 11000 },
    { label: "100kg -> 200kg", value: 13000 },
    { label: "30kg -> 100kg", value: 15000 },
];

const haiPhongAreaFeeOfficicalM3 = () => [
    { label: ">20m3", value: 1150000 },
    { label: "10m3 -> 20m3", value: 1350000 },
    { label: "5m3 -> 10m3", value: 1550000 },
    { label: "<5m3", value: 1850000 },
];

// Phí kiểm đếm sản phẩm

const quantity = () => [
  { label: "501-10000 sản phẩm", value: 1000 },
  { label: "101-500 sản phẩm", value: 1500 },
  { label: "11-100 sản phẩm", value: 2000 },
  { label: "3-10 sản phẩm", value: 3500 },
  { label: "1-2 sản phẩm", value: 5000 },
];

const quantityPrice = () => [
  { label: ">20m3", value: 1150000 },
  { label: "10m3 -> 20m3", value: 1350000 },
  { label: "5m3 -> 10m3", value: 1550000 },
  { label: "<5m3", value: 1850000 },
];

// Phí đóng gỗ  

const woodClosingFee = () =>[
  {label: 'Phí đóng kiện', value: 3650*20}
]
const woodClosingFeeForTheNextOrder = (nextKg) =>[
  {label: 'Phí đóng kiện', value: (3650*20) + (3650 * nextKg)}
]

// Phí bảo hiểm
const insurenceFees = (orderPrice) =>[
  {label: 'Phí bảo hiểm', value: orderPrice * 0.05}
]
export {
    haNoiAreaFeePacketKg,
    haNoiAreaFeePacketM3,
    HCMAreaFeePacketKg,
    HCMAreaFeePacketM3,
    //   Chính ngạch
    haNoiAreaFeeOfficicalkg,
    haNoiAreaFeeOfficicalM3,
    HCMAreaFeeOfficicalkg,
    HCMAreaFeeOfficicalM3,
    haiPhongAreaFeeOfficicalkg,
    haiPhongAreaFeeOfficicalM3,
    tyGia
};
