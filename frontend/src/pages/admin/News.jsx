import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { getNews, createNews, updateNews, deleteNews } from '../../services/api';
import { toast } from 'react-toastify';

const NewsForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'NEWS',
    summary: '',
    content: '',
    pictureLink: '',
    ...initialData
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.category || 
        !formData.summary || !formData.content || !formData.pictureLink) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        {initialData ? 'Chỉnh sửa tin tức' : 'Thêm tin tức mới'}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tác giả</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Loại</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="NEWS">Tin tức</option>
            <option value="PROMOTION">Khuyến mãi</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tóm tắt</label>
          <textarea
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nội dung</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Link hình ảnh</label>
          <input
            type="url"
            value={formData.pictureLink}
            onChange={(e) => setFormData({ ...formData, pictureLink: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {initialData ? 'Cập nhật' : 'Thêm mới'}
        </button>
      </div>
    </form>
  );
};

const News = () => {
  const [news, setNews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await getNews(page);
      if (response.data) {
        setNews(response.data);
        setTotalPages(Math.ceil(response.data.length / 10));
      }
    } catch (error) {
      toast.error('Không thể tải danh sách tin tức');
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (editingNews) {
        await updateNews({
          ...formData,
          id: editingNews.id
        });
        toast.success('Cập nhật tin tức thành công');
      } else {
        await createNews({
          ...formData,
          createBy: 'admin'
        });
        toast.success('Thêm tin tức thành công');
      }
      fetchNews();
      setShowForm(false);
      setEditingNews(null);
    } catch (error) {
      toast.error('Có lỗi xảy ra: ' + (error.response?.data || error.message));
      console.error('Error submitting news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setShowForm(false);
    setEditingNews(null);
    setTimeout(() => {
    setEditingNews(item);
    setShowForm(true);
    }, 100);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
      return;
    }

    try {
      setLoading(true);
      await deleteNews(id);
      toast.success('Xóa tin tức thành công');
      fetchNews();
    } catch (error) {
      toast.error('Không thể xóa tin tức');
      console.error('Error deleting news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingNews(null);
    setShowForm(false);
    setTimeout(() => {
      setShowForm(true);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Quản lý tin tức</h1>
          <button
            onClick={handleAddNew}
            className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            <FaPlus className="mr-2" />
            Thêm tin tức
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <>
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="text-left py-3 px-4 border-b">Tiêu đề</th>
                          <th className="text-left py-3 px-4 border-b">Loại</th>
                          <th className="text-left py-3 px-4 border-b">Ngày đăng</th>
                          <th className="text-right py-3 px-4 border-b">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {news.map((item) => (
                          <tr key={item.id}>
                            <td className="py-3 px-4 border-b">{item.title}</td>
                            <td className="py-3 px-4 border-b">
                              {item.category === 'NEWS' ? 'Tin tức' : 'Khuyến mãi'}
                            </td>
                            <td className="py-3 px-4 border-b">
                              {new Date(item.createDate).toLocaleString()}
                            </td>
                            <td className="py-3 px-4 border-b text-right">
                              <button
                                onClick={() => handleEdit(item)}
                                className="text-blue-600 hover:text-blue-800 mr-3"
                                disabled={loading}
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="text-red-600 hover:text-red-800"
                                disabled={loading}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {totalPages > 1 && (
                      <div className="flex justify-center mt-4 gap-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setPage(index)}
                            className={`px-3 py-1 rounded ${
                              page === index
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                            disabled={loading}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {showForm && (
            <div className="lg:col-span-1">
              <NewsForm onSubmit={handleSubmit} initialData={editingNews} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News; 