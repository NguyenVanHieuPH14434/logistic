import "../Deposit.scss";
import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Row, Col, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useLocation } from 'react-router-dom';
import { NumericFormat } from "react-number-format";

import { Confirm, toastifyError, toastifySuccess } from "../../../../lib/toastify";
import { haiPhongAreaFeeOfficicalkg, haiPhongAreaFeeOfficicalM3, haNoiAreaFeeOfficicalkg, haNoiAreaFeeOfficicalM3, haNoiAreaFeePacketKg, haNoiAreaFeePacketM3, HCMAreaFeeOfficicalkg, HCMAreaFeeOfficicalM3, HCMAreaFeePacketKg, HCMAreaFeePacketM3, numberWithCommas, Status } from "../../../../lib/shipFee";
import { AppContext } from "../../../../contexts/AppContextProvider";
import { createDeposit, deltailDeposit, updateDeposit, uploadFilesDeposit } from "../../../../api/depositApi";

function EditDeposit() {
    const { state: { user } } = useContext(AppContext)
    const [list, setList] = useState([]);
    const [order1, setOrder1] = useState({});
    const navigate = useNavigate()
    //In ra tổng tiền
    var totalPrice = 0;
    for (var li of list) {
        totalPrice += li.tongTien;
    }
    useEffect(() => {
        setOrder1({ ...order1, total: totalPrice })
    }, [totalPrice])

    const locationState = useLocation();
    const getDetail = async () => {
        const res = await deltailDeposit(locationState.state.id);
        return res;
    };
    useEffect(() => {
        getDetail().then((res) => {
            setOrder1(res.data.data);
            setList(res.data.data.depositItem);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // thay đổi giá trị thông tin khách hàng
    const changeInpOrder = (e) => {
        const valOrder = { ...order1 };
        valOrder[e.target.name] = e.target.value;
        valOrder["user_id"] = user._id;
        valOrder["type"] = "deposit";
        setOrder1(valOrder);
    };
    console.log('totalPrice', totalPrice);



    const DeleteList = (i) => {
        const newList = [...list]
        newList.splice(i, 1)
        setList(newList)
    }

    const subMit = (i) => {
        Confirm('Delete!', 'Bạn có muốn xóa không?', DeleteList, i)
    }


    // Tính giá ship 
    const handleOnClickRadio = (e) => {
        setTypeShip(e.target.value)
        if (e.target.value === 'tronGoi') {
            let newArea = location
            newArea.pop()
            return setArea(newArea)
        } else {
            return setArea(location)
        }
    }

    // change input
    const changeInp = (e, i) => {
        const val = [...list]
        val[i][e.target.name] = e.target.value;
        val[i]['tongTien'] = val[i]['donGia'] * val[i]['kgM3'] + parseFloat(val[i]['phuPhi'] ? val[i]['phuPhi'] : 0);
        setList(val);
    }


    // handelSubmit 
    const HandleSubmit = async (e) => {
        const data = {
            "deposit": order1,
            "depositItem": list
        }

        const res = await updateDeposit(locationState.state.id, data);
        toastifySuccess("Cập nhật đơn ký gửi thành công!");
        setTimeout(() => {
            navigate("/app/orderDeposit", { state: { data: list, order: order1, total: totalPrice } });
        }, 1000);
    }
    console.log('list', list);
    console.log('order1', order1);

    const location = [{ value: 'Hà Nội', label: 'Hà Nội' }, { value: 'TP.HCM', label: 'TP.HCM' }, { value: 'Hải Phòng', label: 'Hải Phòng' }];
    const [area, setArea] = useState([])
    const [typeShip, setTypeShip] = useState('')
    const [kg, setKg] = useState([])
    const [m3, setM3] = useState([])
    const [fee, setFee] = useState()
    const [disM3, setDisM3] = useState(false);
    const [disKg, setDisKg] = useState(false);

    const handleOnChangeArea = (e) => {
        const state = e.target.value + '&&' + typeShip;
        if (!typeShip) return toastifyError('Vui lòng chọn loại phí vận chuyển trước!');

        switch (state) {
            case 'TP.HCM&&tronGoi':
                setKg(HCMAreaFeePacketKg)
                setM3(HCMAreaFeePacketM3)
                return;
            case 'Hà Nội&&tronGoi':
                setKg(haNoiAreaFeePacketKg)
                setM3(haNoiAreaFeePacketM3)
                return;
            case 'Hà Nội&&chinhNgach':
                setKg(haNoiAreaFeeOfficicalkg)
                setM3(haNoiAreaFeeOfficicalM3)
                return;
            case 'TP.HCM&&chinhNgach':
                setKg(HCMAreaFeeOfficicalkg)
                setM3(HCMAreaFeeOfficicalM3)
                return;
            case 'Hải Phòng&&chinhNgach':
                setKg(haiPhongAreaFeeOfficicalkg)
                setM3(haiPhongAreaFeeOfficicalM3)
                return;
            default:
                return;
        }
    }

    const changeFee = (e) => {
        let text = '';
        const name = e.target.name;
        const val = e.target.value;
        if (name && val !== 'default') {
            text = name;
        } else {
            text = name + '&&' + val
        }
        switch (text) {
            case 'kg':
                return setDisM3(true);
            case 'm3':
                return setDisKg(true);
            case 'kg&&default':
                setDisM3(false);
                setDisKg(false);
                return
            case 'm3&&default':
                setDisKg(false);
                setDisM3(false);
                return;
            default:
                break;
        }
        setFee(e.target.value);
    }


    return (
        <>
            <div className="deposit">
                <p className="title">Cập nhật đơn ký gửi</p>
                <Table striped bordered hover size="lg">
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>STT</th>
                            <th>Ảnh Sản Phẩm</th>
                            <th>Thông tin hàng hóa</th>
                            <th>Ghi chú</th>
                            <th style={{ width: '5%' }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((li, i) => (
                            <tr key={i}>
                                <td > <span>{i + 1}</span></td>
                                <td style={{ width: '100px' }} className="td_img">
                                    {li.image.map((preview) => {
                                        return (
                                            <img
                                                style={{
                                                    width: "96px",
                                                    height: "64px",
                                                    marginTop: "24px",
                                                }}
                                                src={`http://localhost:9000/${preview}`}
                                            />
                                        )
                                    })}
                                </td>

                                <td className="td_productInformation">
                                    <div className="d-flex information_content">
                                        <div className="label_product_information mt-2">
                                            <p className="text-start me-2">Mã vận đơn: </p>
                                            <p className="text-start me-2 pt-2">Tên sản phẩm: </p>
                                            <p className="text-start me-2">Số kiện hàng: </p>
                                            <p className="text-start me-2 pt-1">Số cân, số khối: </p>
                                            <p className="text-start me-2 pt-1">Đơn giá: </p>
                                            <p className="text-start me-2">Phụ phí: </p>
                                            <p className="text-start me-2"><b>Tổng: </b> </p>
                                        </div>
                                        <div class="input_information_product">
                                            <input
                                                style={{ width: '596px' }}
                                                className="mt-1 form-control"
                                                type="text"
                                                placeholder="Mã vận đơn (*)"
                                                name="maVanDon"
                                                value={li.maVanDon}
                                                onChange={(e) => changeInp(e, i)}
                                            />
                                            <input
                                                style={{ width: '596px' }}
                                                className="mt-1 form-control"
                                                type="text"
                                                placeholder="Tên sản phẩm (*)"
                                                name="nameSanPham"
                                                value={li.nameSanPham}
                                                onChange={(e) => changeInp(e, i)}
                                            />
                                            <input
                                                style={{ width: '596px' }}
                                                className="mt-1 form-control"
                                                type="text"
                                                placeholder="Số kiện hàng"
                                                name="soKien"
                                                value={li.soKien}
                                                onChange={(e) => changeInp(e, i)}
                                            />
                                            <input
                                                style={{ width: '596px' }}
                                                className="mt-1 form-control"
                                                type="text"
                                                name="kgM3"
                                                value={li.kgM3}
                                                placeholder="Số cân, số khối"
                                                onChange={(e) => changeInp(e, i)}
                                            />
                                            <input
                                                style={{ width: '596px' }}
                                                className="mt-1 form-control"
                                                type="text"
                                                name="donGia"
                                                placeholder="Đơn giá"
                                                value={numberWithCommas(li.donGia)}
                                                onChange={(e) => changeInp(e, i)}
                                            />
                                            <input
                                                style={{ width: '596px' }}
                                                className="mt-1 form-control"
                                                type="text"
                                                name="phuPhi"
                                                value={numberWithCommas(li.phuPhi)}
                                                placeholder="Phụ phí"
                                                onChange={(e) => changeInp(e, i)}
                                            />
                                            <NumericFormat
                                                className=" text-center mx-auto form-control mt-1"
                                                type="text"
                                                disabled
                                                style={{ background: '#EDA82D', width: '596px' }}
                                                value={li.tongTien ? li.tongTien : 'Tổng tiền thanh toán'}
                                                placeholder="Tổng"
                                                thousandSeparator=","
                                            ></NumericFormat>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {" "}
                                    <textarea
                                        className="ghi_chu form-control"
                                        name="note"
                                        id=""
                                        cols="30"
                                        rows="10"
                                        placeholder="Ghi chú sản phẩm..."
                                    ></textarea>{" "}
                                </td>
                                <td>
                                    <span style={{ cursor: 'pointer', }} onClick={() => subMit(i)}><i style={{ fontSize: '30px', color: 'red' }} className="fa-solid fa-circle-xmark"></i></span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan='3'><b>Tổng tiền thanh toán: </b></th>
                            <th colSpan='2'><NumericFormat style={{ background: 'none', color: 'white', border: 'none', textAlign: 'right' }} value={totalPrice ? totalPrice : 0} thousandSeparator="," /> đ</th>
                        </tr>
                    </tfoot>
                </Table>

                <div className="container d-flex justify-content-between mt-4">
                    <div className="form_custom">
                        <div className="address d-flex flex-column w-100">
                            <label htmlFor="" className="">
                                <h5>Địa chỉ kho Trung Quốc</h5>
                            </label>
                            <select name="address_TQ" id="" value={order1.address_TQ ? order1.address_TQ : ''} onChange={(e) => changeInpOrder(e)} className="p-1 form-control">
                                <option value="" className="text-center">
                                    --Lựa chọn kho--
                                </option>
                                <option value="Quảng Châu">Quảng Châu</option>
                                <option value="Đông Hưng">Đông Hưng</option>
                            </select>
                        </div>
                        <div className="form">
                            <p className="title-label">Thông Tin Khách Hàng</p>
                            <Container className="customer-form">
                                <Row>
                                    <Form.Label className="customer-title">Họ Tên</Form.Label>
                                    <Form.Control
                                        className="customer-field"
                                        type="text"
                                        name="full_name"
                                        value={order1.full_name ? order1.full_name : ''}
                                        onChange={(e) => changeInpOrder(e)}
                                        placeholder="Nhập Họ Tên"
                                    />
                                </Row>
                                <Row>
                                    <Form.Label className="customer-title">
                                        Số Điện Thoại
                                    </Form.Label>
                                    <Form.Control
                                        className="customer-field"
                                        type="text"
                                        name="phone"
                                        value={order1.phone ? order1.phone : ''}
                                        onChange={(e) => changeInpOrder(e)}
                                        placeholder="Nhập Số Điện Thoại"
                                    />
                                </Row>
                                <Row>
                                    <Form.Label className="customer-title">
                                        Tên nhóm hàng
                                    </Form.Label>
                                    <Form.Control
                                        className="customer-field"
                                        type="text"
                                        name="type_title"
                                        value={order1.type_title}
                                        onChange={(e) => changeInpOrder(e)}
                                        placeholder="Nhập Tên Nhóm Hàng"
                                    />
                                </Row>
                                <Row>
                                    <Form.Label className="customer-title">
                                        Mã Nhóm Hàng
                                    </Form.Label>
                                    <Form.Control
                                        className="customer-field"
                                        type="text"
                                        name="type_code"
                                        value={order1.type_code}
                                        onChange={(e) => changeInpOrder(e)}
                                        placeholder="Mã Nhóm Hàng"
                                    />
                                </Row>
                                <Row>
                                    <Form.Label className="customer-title">
                                        Ngày giao hàng dự kiến
                                    </Form.Label>
                                    <Form.Control
                                        className="customer-field"
                                        type="text"
                                        name="delivery_date"
                                        value={order1.delivery_date}
                                        onChange={(e) => changeInpOrder(e)}
                                        placeholder="Ngày giao hàng dự kiến"
                                    />
                                </Row>
                                <Row>
                                    <Form.Label className="customer-title">Địa chỉ nhận hàng Việt Nam</Form.Label>
                                    <Form.Select className="customer-field" name="address" value={order1.address ? order1.address : ''} onChange={(e) => changeInpOrder(e)}>
                                        <option>Vui Lòng Chọn Địa Chỉ</option>
                                        <option value="Hà Nội">Hà Nội</option>
                                        <option value="TP.HCM">TP.HCM</option>
                                        <option value="Hải Phòng">Hải Phòng</option>
                                    </Form.Select>
                                </Row>
                                <Row>
                                    <Form.Label className="customer-title">Trạng thái</Form.Label>
                                    <Form.Select
                                        className="customer-field"
                                        name="status"
                                        value={order1?.status}
                                        onChange={(e) => changeInpOrder(e)}
                                    >
                                        <option value=''>Chọn trạng thái đơn hàng</option>
                                        {Status.map((ite) => {
                                            return (
                                                <option value={ite.value}>{ite.label}</option>
                                            )
                                        })}
                                    </Form.Select>
                                </Row>
                            </Container>
                        </div>
                        <Button variant="warning" className="end-btn mt-3" onClick={HandleSubmit}
                        // as={Link} to="/app/orderDeposit"> 
                        >
                            Cập nhật dơn ký gửi
                        </Button>
                    </div>

                    {/* Tổng hợp các loại phí */}

                    <div className="container fee ms-4">
                        <h1>Phí vận chuyển quốc tế</h1>
                        <div className="mt-5">
                            <div class="official">
                                <div className="">
                                    <input name="ship" value="tronGoi" onClick={(e) => handleOnClickRadio(e)} type="radio" />
                                    <label className="ps-2 fs-5 fw-bold">Phí vận chuyển trọn gói</label>
                                    <br />
                                    <input name="ship" value="chinhNgach" className="mt-2" onClick={(e) => handleOnClickRadio(e)} type="radio" />
                                    <label className="ps-2 fs-5 fw-bold">Phí vận chuyển chính ngạch</label>
                                </div>
                                <p>Tổng phí nhập khẩu = Phí dịch vụ + Phí vận chuyển + Thuế nhập khẩu (nếu có) + Thuế VAT</p>
                                <select name="kg" disabled={disKg} onChange={(e) => changeFee(e)} className="form-control d-inline mx-1" style={{ width: '150px', textAlign: 'center', padding: '4px' }}>
                                    <option value="default" selected>Trọng lượng(kg)</option>
                                    {kg ? kg.map((itk, index) => {
                                        return (
                                            <option value={itk.value}>{itk.label}</option>
                                        )
                                    }) : []}
                                </select>
                                <select name="m3" disabled={disM3} onChange={(e) => changeFee(e)} className="form-control d-inline mx-1" style={{ width: '150px', textAlign: 'center', padding: '4px' }}>
                                    <option value="default" selected>Khối lượng (tính/m3)</option>
                                    {m3 ? m3.map((itm, index) => {
                                        return (
                                            <option value={itm.value}>{itm.label}</option>
                                        )
                                    }) : []}
                                </select>
                                <select onChange={(e) => handleOnChangeArea(e)} onClick={(e) => handleOnChangeArea(e)} className="form-control d-inline mx-1" style={{ width: '150px', textAlign: 'center', padding: '4px' }}>
                                    <option value="" selected> Khu vực</option>
                                    {area.map((item, i) => (
                                        <option value={item.value} > {item.label} </option>
                                    ))}
                                </select>
                            </div>
                            <div className="VAT text-danger" style={{ backgroundColor: '#fff1f0', marginTop: "20px" }}>
                                <p><span style={{ fontWeight: 'bold' }}>Thuế nhập khẩu (Nếu có)</span> = % thuế x Giá trị hàng hóa <br />
                                    <span style={{ fontWeight: 'bold' }}>Thuế VAT</span> = 10% x Giá trị hàng hóa</p>
                            </div>
                        </div>

                        <div className="mt-5 mb-3">
                            <span className="d-flex">
                                <h5>PHÍ ĐÓNG GỖ</h5>
                                <input className="mb-2 ms-2" type="checkbox" />
                            </span>
                            <span className="d-flex">
                                <h5>PHÍ BẢO HIỂM</h5>
                                <input className="mb-2 ms-2" type="checkbox" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditDeposit