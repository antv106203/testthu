import { Table, Button, Modal, Input, notification} from "antd";
import { useEffect, useState } from "react"
import { createCategoryAPI, fetchCategoriesAPI } from "../Service/API/APIService";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import Loading from "./Loading";
import '../CSS/CategoryList.css';

import { useNavigate } from "react-router-dom";


const columns = [
  {
    title: 'CategoryID',
    dataIndex: 'categoryId',
    sorter: true,
    render: (categoryId) => categoryId,
    width: '12%', // Set the desired width in pixels
  },
  {
    title: 'categoryName',
    dataIndex: 'categoryName',
    sorter: true,
    width: '30%', // Set the desired width in pixels
  },
  {
    title: 'categoryCode',
    dataIndex: 'categoryCode',
    sorter: true,
    width: '40%', // Set the desired width in pixels
  }
];

function CategoryList(){
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true, // Hiển thị tùy chọn để thay đổi pageSize
      pageSizeOptions: ['5', '10', '15', '20'], // Các tùy chọn pageSize
    },
  });

  const [loadingModal, setLoadingModal] = useState(false)
  const [open, setOpen] = useState(false);
  const [categoryCreate, setCategoryCreate] = useState({
    categoryName: "",
    categoryCode: "",
    categoryDescription: ""
  })

  const {logout} = useContext(AuthContext)

  const delay = (miliSeconds) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, miliSeconds)
    })
}

  const fetchData = async () => {
    setLoading(true);
    await delay(200);
    try {
      const { categories, totalCount } = await fetchCategoriesAPI(tableParams.pagination.current, tableParams.pagination.pageSize);

      setData(categories); // Cập nhật dữ liệu lấy từ API
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: totalCount, // Tổng số lượng bản ghi từ server
        },
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect( () =>{
    fetchData();
  }, [tableParams.pagination.current,tableParams.pagination.pageSize,tableParams.sortOrder,tableParams.sortField,JSON.stringify(tableParams.filters),]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const showModalLoading = () => {
    setOpen(true);
    setLoadingModal(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoadingModal(false);
    }, 500);
  };

  const handleOk = async() => {
    const {message} = await createCategoryAPI(categoryCreate)
    if (message === "Thành công") {
      notification.success({
        message: 'Thành công',
        description: 'Danh mục đã được tạo thành công.',
        placement: 'topRight', // Vị trí hiển thị thông báo
      });
    } else {
      notification.error({
        message: 'Thất bại',
        description: 'Có lỗi xảy ra khi tạo danh mục.',
        placement: 'topRight', // Vị trí hiển thị thông báo
      });
    }
    setOpen(false);
    setCategoryCreate({
      categoryName: "",
      categoryCode: "",
      categoryDescription: ""
    })
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const hanleChangeInput = (event) =>{
    setCategoryCreate({...categoryCreate, [event.target.name]: event.target.value})
  }

  const hanleLogout= () =>{
    logout();
    navigate('/login')
  }
  return (
    <div className="CategoryList">
      { open === false ?
        loading === true ? (
          <Loading/>
        ):(

          <div className="CategoryList-NoLoading">
            <div className="CategoryList-NoLoading-btn">
              <Button type="primary" danger onClick={hanleLogout}>
                  Đăng xuất
              </Button>
              <Button type="primary" primary={true.toString()} onClick={showModalLoading}>
                Thêm
              </Button>
            </div>
            
            <Table
              columns={columns}
              rowKey={(record) => record.categoryId} // Giả sử id là trường unique
              dataSource={data}
              pagination={tableParams.pagination}
              loading={loading}
              onChange={handleTableChange}
              onRow={(record) => {
                return{
                  onClick : () => {navigate(`/details/${record.categoryId}`)}
                }
              }}
            />
          </div>
          
        )

        : <Modal
            title={<p>Thêm Danh mục</p>}
            onOk={handleOk} onCancel={handleCancel}
            loading={loadingModal}
            open={open}
          > 
            <div className="createcategory-input">
              <Input placeholder="Tên danh mục" name="categoryName" value={categoryCreate.categoryName} onChange={hanleChangeInput}/>
              <Input placeholder="mã Danh mục" name="categoryCode" value={categoryCreate.categoryCode} onChange={hanleChangeInput}/>
              <Input placeholder="Mô tả" name="categoryDescription" value={categoryCreate.categoryDescription} onChange={hanleChangeInput}/>
            </div>
            
        </Modal>
      }
    </div>
    
  );
}



export default CategoryList