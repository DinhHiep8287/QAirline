import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaKey } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProfileSection = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const InputField = ({ icon: Icon, label, type = "text", value, onChange, disabled = false, error = "" }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative rounded-lg shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`block w-full pl-10 pr-3 py-2 sm:text-sm rounded-lg
          ${disabled 
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
            : 'bg-white focus:ring-2 focus:ring-[#605DEC] focus:border-[#605DEC]'
          }
          ${error ? 'border-red-300' : 'border-gray-300'}
          transition-colors duration-200
        `}
      />
    </div>
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // TODO: Fetch user data from API
    const mockUserData = {
      fullName: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0123456789',
      address: 'Hà Nội, Việt Nam',
      birthday: '1990-01-01'
    };
    setFormData(prev => ({ ...prev, ...mockUserData }));
  }, []);

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (isChangingPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
      }
      if (!formData.newPassword) {
        newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // TODO: Call API to update user profile
      toast.success('Cập nhật thông tin thành công!');
      setIsEditing(false);
      setIsChangingPassword(false);
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200
                ${isEditing
                  ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  : 'bg-[#605DEC] text-white hover:bg-[#4B48BF]'
                }`}
            >
              {isEditing ? 'Hủy' : 'Chỉnh sửa'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <ProfileSection title="Thông tin cơ bản">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  icon={FaUser}
                  label="Họ và tên"
                  value={formData.fullName}
                  onChange={handleInputChange('fullName')}
                  disabled={!isEditing}
                  error={errors.fullName}
                />
                <InputField
                  icon={FaEnvelope}
                  label="Email"
                  type="email"
                  value={formData.email}
                  disabled={true}
                />
                <InputField
                  icon={FaPhone}
                  label="Số điện thoại"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  disabled={!isEditing}
                  error={errors.phone}
                />
                <InputField
                  icon={FaCalendarAlt}
                  label="Ngày sinh"
                  type="date"
                  value={formData.birthday}
                  onChange={handleInputChange('birthday')}
                  disabled={!isEditing}
                />
                <div className="md:col-span-2">
                  <InputField
                    icon={FaMapMarkerAlt}
                    label="Địa chỉ"
                    value={formData.address}
                    onChange={handleInputChange('address')}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </ProfileSection>

            {/* Password Change Section */}
            <ProfileSection title="Đổi mật khẩu">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    {isChangingPassword
                      ? 'Nhập mật khẩu hiện tại và mật khẩu mới của bạn'
                      : 'Bạn có thể đổi mật khẩu của mình tại đây'}
                  </p>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsChangingPassword(!isChangingPassword)}
                      className="text-sm font-medium text-[#605DEC] hover:text-[#4B48BF] transition-colors duration-200"
                    >
                      {isChangingPassword ? 'Hủy' : 'Đổi mật khẩu'}
                    </button>
                  )}
                </div>

                {isChangingPassword && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <InputField
                        icon={FaKey}
                        label="Mật khẩu hiện tại"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleInputChange('currentPassword')}
                        error={errors.currentPassword}
                      />
                    </div>
                    <InputField
                      icon={FaKey}
                      label="Mật khẩu mới"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleInputChange('newPassword')}
                      error={errors.newPassword}
                    />
                    <InputField
                      icon={FaKey}
                      label="Xác nhận mật khẩu mới"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange('confirmPassword')}
                      error={errors.confirmPassword}
                    />
                  </div>
                )}
              </div>
            </ProfileSection>

            {/* Submit Button */}
            {isEditing && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#605DEC] text-white rounded-lg hover:bg-[#4B48BF] transition-colors duration-200 font-medium"
                >
                  Lưu thay đổi
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
