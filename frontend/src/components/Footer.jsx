import { appStore, facebook, googlePlay, instagram, twitter } from "../assets/icons";

const Footer = () => {
  return (
      <>
        <div className="mt-40 flex flex-col gap-5 px-8">
          <div className="flex justify-between items-start flex-col md:flex-row gap-7">
            <div className="flex justify-start items-start">
              <h1 className="text-[#605DEC] font-bold text-2xl">QAIRLINE</h1>
            </div>

            <ul className="flex flex-col items-start justify-start gap-3">
              <h2 className="text-[#6E7491] font-bold text-lg">Giới thiệu</h2>
              <li className="footerLi">Về QAIRLINE</li>
              <li className="footerLi">Cách hoạt động</li>
              <li className="footerLi">Cơ hội nghề nghiệp</li>
              <li className="footerLi">Blog</li>
              <li className="footerLi">Báo chí</li>
              <li className="footerLi">Diễn đàn</li>
            </ul>

            <ul className="flex flex-col items-start justify-start gap-3">
              <h2 className="text-[#6E7491] font-bold text-lg">Đối tác</h2>
              <li className="footerLi">Chương trình đối tác</li>
              <li className="footerLi">Chương trình liên kết</li>
              <li className="footerLi">Đối tác kỹ thuật</li>
              <li className="footerLi">Khuyến mãi & sự kiện</li>
              <li className="footerLi">Tích hợp hệ thống</li>
              <li className="footerLi">Cộng đồng</li>
              <li className="footerLi">Chương trình khách hàng thân thiết</li>
            </ul>

            <ul className="flex flex-col items-start justify-start gap-3">
              <h2 className="text-[#6E7491] font-bold text-lg">Hỗ trợ</h2>
              <li className="footerLi">Trung tâm trợ giúp</li>
              <li className="footerLi">Liên hệ</li>
              <li className="footerLi">Chính sách bảo mật</li>
              <li className="footerLi">Điều khoản dịch vụ</li>
              <li className="footerLi">An toàn & tin cậy</li>
              <li className="footerLi">Khả năng tiếp cận</li>
            </ul>

          </div>

          <div className="border-t-2 border-[#CBD4E6] py-8 flex justify-between items-center">
            <p className="text-[#7C8DB0] text-sm sm:text-base">&copy; 2023 QAIRLINE. Bản quyền đã được bảo hộ.</p>
          </div>
        </div>
      </>
  );
};

export default Footer;
