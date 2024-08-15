import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCategoryByIDAPI, updateCategoryByIdAPI } from "../Service/API/APIService";
import Loading from "./Loading";

import { useNavigate } from "react-router-dom";

import { Button, Modal, Input, notification } from "antd";
import '../CSS/CategoryDetails.css'

const CategoryDetails = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updateModal, setUpdateModal] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [update, setUpdate] = useState(true);
    //const [a, setA] = useState("b");
    const [categoryUpdate, setCategoryUpdate] = useState({
        categoryName: "",
        categoryCode: "",
        categoryDescription: ""
    })
    const { id } = useParams(); // Lấy id từ URL

    const delay = (miliSeconds) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, miliSeconds)
        })
    }

    const handleCancel = () => {
        setUpdateModal(false);
    };

    const handleOk = async() => {
        const {status} = await updateCategoryByIdAPI(id,categoryUpdate)
        if (status === "OK") {
          notification.success({
            message: 'Thành công',
            description: 'Danh mục đã sửa thành công.',
            placement: 'topRight', // Vị trí hiển thị thông báo
          });
        } else {
          notification.error({
            message: 'Thất bại',
            description: 'Có lỗi xảy ra khi sửa danh mục.',
            placement: 'topRight', // Vị trí hiển thị thông báo
          });
        }
        setUpdateModal(false);
        setCategoryUpdate({
          categoryName: category.categoryName,
          categoryCode: category.categoryCode,
          categoryDescription: category.categoryDescription
        })
        setUpdate(!update);
      };

    const showModalLoading = () => {
        setUpdateModal(true);
        setLoadingModal(true);
    
        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
          setLoadingModal(false);
        }, 500);
    };

    const hanleChangeInput = (event) =>{
        setCategoryUpdate({...categoryUpdate, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setLoading(true);
                 await delay(200);
                const { categoryDetail } = await getCategoryByIDAPI(id);
                setCategory(categoryDetail);
                setCategoryUpdate({
                    categoryName: categoryDetail.categoryName,
                    categoryCode: categoryDetail.categoryCode,
                    categoryDescription: categoryDetail.categoryDescription
                })
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id,update]);

    if (loading) return <div><Loading/></div>;
    if (error) return <div>Error: {error.message}</div>;

    if (!category) return <div>No category found</div>;

    return (
        <>
        <div className="CategoryDetails">
            <div className="contains">
                <h3>CategoryID: {category.categoryId}</h3>
                <h3>CategoryName: {category.categoryName}</h3>
                <h3>CategoryCode: {category.categoryCode}</h3>
                <h3>Description: {category.categoryDescription}</h3>
                <h3>Created At: {category.createdAt}</h3>
                <h3>Updated At: {category.updatedAt}</h3>
            </div>

            <div className="contains-button">
            <Button type="primary" danger style={{height: '40px', width: '120px'}} onClick={() => navigate("/")}>
                Thoát
            </Button>

            <Button type="primary" primary={true.toString()} style={{height: '40px', width: '120px'}} onClick={showModalLoading}>
                Sửa
            </Button>
            </div>
        </div>
        <div>
        {   
           updateModal && <Modal
           title={<p>Sửa Danh mục</p>}
           onOk={handleOk} onCancel={handleCancel}
           loading={loadingModal}
           open={updateModal}
         > 
           <div className="createcategory-input">
             <Input placeholder="Tên danh mục" name="categoryName" value={categoryUpdate.categoryName} onChange={hanleChangeInput}/>
             <Input placeholder="mã Danh mục" name="categoryCode" value={categoryUpdate.categoryCode} onChange={hanleChangeInput}/>
             <Input placeholder="Mô tả" name="categoryDescription" value={categoryUpdate.categoryDescription} onChange={hanleChangeInput}/>
           </div>
           
       </Modal>
        }
        </div>
        </>
    );
};

export default CategoryDetails;