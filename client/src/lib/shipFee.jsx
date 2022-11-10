//   // State giá phí vận chuyển chính ngạch

import { useState } from "react";

const tyGia = () => {
    return 3650;
};

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

const woodClosingFee = () => [{ label: "Phí đóng kiện", value: 3650 * 20 }];
const woodClosingFeeForTheNextOrder = (nextKg) => [
    { label: "Phí đóng kiện", value: 3650 * 20 + 3650 * nextKg },
];

// Phí bảo hiểm
const insurenceFees = (orderPrice) => [
    { label: "Phí bảo hiểm", value: orderPrice * 0.05 },
];

const renderStatus = (status) => {
    switch (status) {
        case 0:
            return "Chờ xác nhận";
        case 1:
            return "Đã xác nhận";
        case 2:
            return "Đang vận chuyển về kho Trung Quốc";
        case 3:
            return "Đã về kho Trung Quốc";
        case 4:
            return "Đã về kho Trung QuốcĐang vận chuyển về kho Việt Nam";
        case 5:
            return "Đã về kho Việt Nam";
        case 6:
            return "Giao hàng thành công";
        default:
            return "Chờ xác nhận";
    }
};

const typeMon = [
    { value: '24870', label: 'USD' },
    { value: '1', label: 'Việt Nam đồng' },
    { value: '3650', label: 'Nhân dân tệ' },
]

var ChuSo = new Array(
    " không ",
    " một ",
    " hai ",
    " ba ",
    " bốn ",
    " năm ",
    " sáu ",
    " bảy ",
    " tám ",
    " chín "
);
var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");

//1. Hàm đọc số có ba chữ số;
function DocSo3ChuSo(baso) {
    var tram;
    var chuc;
    var donvi;
    var KetQua = "";
    tram = parseInt(baso / 100);
    chuc = parseInt((baso % 100) / 10);
    donvi = baso % 10;
    if (tram == 0 && chuc == 0 && donvi == 0) return "";
    if (tram != 0) {
        KetQua += ChuSo[tram] + " trăm ";
        if (chuc == 0 && donvi != 0) KetQua += " linh ";
    }
    if (chuc != 0 && chuc != 1) {
        KetQua += ChuSo[chuc] + " mươi";
        if (chuc == 0 && donvi != 0) KetQua = KetQua + " linh ";
    }
    if (chuc == 1) KetQua += " mười ";
    switch (donvi) {
        case 1:
            if (chuc != 0 && chuc != 1) {
                KetQua += " mốt ";
            } else {
                KetQua += ChuSo[donvi];
            }
            break;
        case 5:
            if (chuc == 0) {
                KetQua += ChuSo[donvi];
            } else {
                KetQua += " lăm ";
            }
            break;
        default:
            if (donvi != 0) {
                KetQua += ChuSo[donvi];
            }
            break;
    }
    return KetQua;
}
console.log(DocSo3ChuSo(1));

function DocTienBangChu(SoTien) {
    var lan = 0;
    var i = 0;
    var so = 0;
    var KetQua = "";
    var tmp = "";
    var ViTri = new Array();
    if (SoTien < 0) return "Số tiền âm !";
    if (SoTien == 0) return "Không đồng !";
    if (SoTien > 0) {
        so = SoTien;
    } else {
        so = -SoTien;
    }
    if (SoTien > 8999999999999999) {
        //SoTien = 0;
        return "Số quá lớn!";
    }
    ViTri[5] = Math.floor(so / 1000000000000000);
    if (isNaN(ViTri[5])) ViTri[5] = "0";
    so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
    ViTri[4] = Math.floor(so / 1000000000000);
    if (isNaN(ViTri[4])) ViTri[4] = "0";
    so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
    ViTri[3] = Math.floor(so / 1000000000);
    if (isNaN(ViTri[3])) ViTri[3] = "0";
    so = so - parseFloat(ViTri[3].toString()) * 1000000000;
    ViTri[2] = parseInt(so / 1000000);
    if (isNaN(ViTri[2])) ViTri[2] = "0";
    ViTri[1] = parseInt((so % 1000000) / 1000);
    if (isNaN(ViTri[1])) ViTri[1] = "0";
    ViTri[0] = parseInt(so % 1000);
    if (isNaN(ViTri[0])) ViTri[0] = "0";
    if (ViTri[5] > 0) {
        lan = 5;
    } else if (ViTri[4] > 0) {
        lan = 4;
    } else if (ViTri[3] > 0) {
        lan = 3;
    } else if (ViTri[2] > 0) {
        lan = 2;
    } else if (ViTri[1] > 0) {
        lan = 1;
    } else {
        lan = 0;
    }
    for (i = lan; i >= 0; i--) {
        tmp = DocSo3ChuSo(ViTri[i]);
        KetQua += tmp;
        if (ViTri[i] > 0) KetQua += Tien[i];
        if (i > 0 && tmp.length > 0) KetQua += ","; //&& (!string.IsNullOrEmpty(tmp))
    }
    if (KetQua.substring(KetQua.length - 1) == ",") {
        KetQua = KetQua.substring(0, KetQua.length - 1);
    }
    KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);
    return KetQua; //.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
}



const changeStyleInputPassword = (password,setType) =>{
    if(password !== ''){
        setType('block')
      } else{
        setType('none')
      }
}

const handleOnClickPass = (setPass, pass) =>{
    setPass(!pass)
  }

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
    tyGia,
    renderStatus,

    //   convert money to string
    DocTienBangChu,
    typeMon,

    // change style input password
    changeStyleInputPassword,
    handleOnClickPass
};