import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Select, Space, Tag } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import ModalComponent from '../ModalComponent/ModalComponent'
import Loading from '../LoadingComponent/Loading'
import InputComponent from '../InputComponent/InputComponent'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../Message/MessageComponent'
import * as UserService from '../../services/UserService'
import * as ProductService from '../../services/ProductService'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { convertPrice, getBase64 } from '../../utils'
import { updateUser } from '../../redux/slides/userSlide'
import * as OrderService from '../../services/OrderService'
import { orderConstant } from '../../constant'


const AdminOrder = () => {


    const columns = [
        {
            title: 'Tên người dùng',
            dataIndex: 'shippingAddress',
            render: shippingAddress => shippingAddress.fullName || 'Không có tên'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'shippingAddress',
            render: shippingAddress => shippingAddress.phone || 'Không có'
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'shippingAddress',
            render: shippingAddress => `${shippingAddress.address}, ${shippingAddress.city}` || 'Không có'
        },
        {
            title: 'Giá',
            dataIndex: 'totalPrice',
            render: totalPrice => convertPrice(totalPrice) || 'Không có'
        },

        {
            title: 'Vận chuyển',
            dataIndex: 'shippingMethod',
            render: shippingMethod => orderConstant.delivery[shippingMethod] || 'Không có'
        },

        {
            title: 'Thanh toán',
            dataIndex: 'paymentMethod',
            render: paymentMethod => paymentMethod || 'Không có'
        },
        {
            title: 'Trạng thái đơn hàng',
            dataIndex: 'shippingStatus',
            render: (status) => {
                const statusMap = {
                    pending: { color: 'default', text: 'Chờ xác nhận' },
                    confirmed: { color: 'processing', text: 'Đã xác nhận' },
                    shipping: { color: 'orange', text: 'Đang giao' },
                    delivered: { color: 'green', text: 'Đã giao' },
                    cancelled: { color: 'red', text: 'Đã huỷ' },
                    returned: { color: 'purple', text: 'Trả hàng' },
                }
                const item = statusMap[status] || { color: 'default', text: status }
                return <Tag color={item.color}>{item.text}</Tag>
            }
        },
        {
            title: 'Trạng thái thanh toán',
            dataIndex: 'isPaid',
            render: (status) => {
                const color = !status ? 'default' : 'green'
                const text = !status ? 'Chưa thanh toán' : 'Đã thanh toán'
                return <Tag color={color}>{text}</Tag>
            }
        },
        {
            title: 'Thao tác',
            render: (record) => (
                <Button onClick={() => openDrawer(record)} icon={<EditOutlined />} type="link">
                    Chỉnh sửa
                </Button>
            )
        }
    ];



    return (
        <div>
            <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
            <div style={{ marginTop: '16px' }}>
                <TableComponent
                    columns={columns}
                    data={dataTable}
                    isLoading={isLoadingOrders}
                />
            </div>
            <DrawerComponent
                title="Chỉnh sửa đơn hàng"
                open={openDrawerEdit}
                onClose={() => setOpenDrawerEdit(false)}
            >
                <Form
                    layout="vertical"
                    onFinish={handleSubmitUpdate}
                    initialValues={{
                        shippingStatus: selectedOrder?.shippingStatus,
                        paymentStatus: selectedOrder?.isPaid ? 'paid' : 'unpaid'
                    }}
                >
                    <Form.Item label="Trạng thái giao hàng" name="shippingStatus">
                        <Select>
                            <Select.Option value="pending">Chờ xác nhận</Select.Option>
                            <Select.Option value="confirmed">Đã xác nhận</Select.Option>
                            <Select.Option value="shipping">Đang giao</Select.Option>
                            <Select.Option value="delivered">Đã giao</Select.Option>
                            <Select.Option value="cancelled">Đã huỷ</Select.Option>
                            <Select.Option value="returned">Trả hàng</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Trạng thái thanh toán" name="paymentStatus">
                        <Select>
                            <Select.Option value="unpaid">Chưa thanh toán</Select.Option>
                            <Select.Option value="paid">Đã thanh toán</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">Lưu</Button>
                    </Form.Item>
                </Form>
            </DrawerComponent>
        </div >
    )
}

export default AdminOrder