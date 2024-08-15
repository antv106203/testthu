
import api from '../baseAPIService.js'


// const loginAPI = async (user) => {
//     try {
//       // Gửi yêu cầu đăng nhập đến server
//       const response = await api.post('/login', user);
//       return response.data; // Trả về dữ liệu phản hồi từ server
//     } catch (error) {
//       // Xử lý lỗi nếu có
//       console.error('There was an error!', error);
//       throw error; // Ném lỗi ra để component có thể xử lý
//     }
// };

const fetchCategoriesAPI = async (current = 1, pageSize = 7) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
  
    try {
      const response = await api.get('/admin/categories', {
        params: {
          current,
          pageSize
        },
        headers: {
          'Authorization': `Bearer ${token}` // Đính kèm token trong header
        }
      });
      const { content, totalElements } = response.data.data;
    return {
      categories: content,
      totalCount: totalElements,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error; // Ném lỗi ra để component có thể xử lý
  }

};

const createCategoryAPI = async(categoryCreate) =>{
  const token = localStorage.getItem('token'); // Lấy token từ localStorage
  try {
    const response = await api.post("/admin/categories",
      categoryCreate,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    const message = response.data.message;
    return{
      message: message
    }
  } catch (error) {
    console.error('Error create categories:', error);
    throw error; // Ném lỗi ra để component có thể xử lý
  }
}

const getCategoryByIDAPI = async(id) =>{
  const token = localStorage.getItem('token');
  try{
    const response = await api.get(`/admin/categories/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  const data = response.data.data;
  return{
    categoryDetail: data
  }
  } catch (error) {
    console.error('Error create categories:', error);
    throw error; // Ném lỗi ra để component có thể xử lý
  }
}

const updateCategoryByIdAPI = async(id, categoryUpdate) => {
  const token = localStorage.getItem('token');
  try{
    const response = await api.put(`/admin/categories/${id}`,categoryUpdate,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    const status = response.data.status;
    return{
      status: status
    }
  } catch (error) {
    console.error('Error create categories:', error);
    throw error; // Ném lỗi ra để component có thể xử lý
  }
}



  

export{ fetchCategoriesAPI, createCategoryAPI, getCategoryByIDAPI, updateCategoryByIdAPI
}