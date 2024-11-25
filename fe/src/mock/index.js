const mockBlogPosts = [
    {
        id: 1,
        title: "A Passion for Putting Patients First",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        date: "2021-09-09",
        author: "Author",
        views: 50,
        likes: 30,
        image: require('../assets/img/News1.png')
    },
    {
        id: 2,
        title: "Another Exciting Post",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        date: "2021-09-10",
        author: "Author",
        views: 20,
        likes: 15,
        image: require('../assets/img/News2.png')
    },
    {
        id: 3,
        title: "Another Exciting Post",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        date: "2021-09-10",
        author: "Author",
        views: 20,
        likes: 15,
        image: require('../assets/img/News2.png')
    },
    {
        id: 4,
        title: "Another Exciting Post",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        date: "2021-09-10",
        author: "Author",
        views: 20,
        likes: 15,
        image: require('../assets/img/News2.png')
    },
];

const contactDetails = [
    {
        title: "Khẩn cấp",
        info: ["(237) 681-812-255", "(237) 666-331-894"],
        icon: require('../assets/img/group-188-2.png'),
        bgColor: '#BFD2F8',
        textColor: '#1F2B6C'
    },
    {
        title: "Địa chỉ",
        info: ["0123 Hải Phòng", "9876 Lê Duẩn"],
        icon: require('../assets/img/letter.png'),
        bgColor: '#BFD2F8',
        textColor: '#1F2B6C'
    },
    {
        title: "Email",
        info: ["meddical@gmail.com"],
        icon: require('../assets/img/group-178-2.png'),
        bgColor: '#BFD2F8',
        textColor: '#1F2B6C'
    },
    {
        title: "Giờ làm việc",
        info: ["Từ thứ hai đến thứ bảy lúc 09:00-20:00", "Chỉ khẩn cấp vào Chủ nhật"],
        icon: require('../assets/img/group-177-2.png'),
        bgColor: '#BFD2F8',
        textColor: '#1F2B6C'
    }
];

const doctors = [
    {
        id: 1,
        name: "Dr. John Doe",
        specialty: "Cardiology",
        image: require("../assets/img/doctor-1.png"),
        bio: "Dr. John Doe is an experienced cardiologist with over 15 years of practice, specializing in heart diseases and surgeries.",
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")],
        department: 'Tim mạch',
        price: 500.000
    },
    {
        id: 2,
        name: "Dr. Jane Smith",
        specialty: "Neurology",
        image: require("../assets/img/doctor-2.png"),
        bio: "Dr. John Doe is an experienced cardiologist with over 15 years of practice, specializing in heart diseases and surgeries.",
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")],
        department: 'Nhi',
        price: 500.000
    },
    {
        id: 3,
        name: "Dr. Emily Johnson",
        specialty: "Pediatrics",
        image: require("../assets/img/doctor-3.png"),
        bio: "Dr. John Doe is an experienced cardiologist with over 15 years of practice, specializing in heart diseases and surgeries.",
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")],
        department: 'Ngoại',
        price: 850.000
    },
    {
        id: 4,
        name: "Dr. Michael Brown",
        specialty: "Orthopedics",
        image: require("../assets/img/doctor-3.png"),
        bio: "Dr. John Doe is an experienced cardiologist with over 15 years of practice, specializing in heart diseases and surgeries.",
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")],
        department: 'Ngoại',
        price: 850.000
    }
];

const recentPosts = [
    {
        title: "This Article's Title goes Here, but not too long.",
        date: "Monday 05, September 2021",
        image: require('../assets/img/News1.png')
    },
    {
        title: "This Article's Title goes Here, but not too long.",
        date: "Monday 05, September 2021",
        image: require('../assets/img/News2.png')
    }
];

const categories = [
    { name: 'Surgery', count: 3 },
    { name: 'Health Care', count: 5 },
    { name: 'Medical', count: 8 },
    { name: 'Professional', count: 10 }
];
const cardData = [
    {
        text: "Đặt Lịch Hẹn",
        color: "#1f2b6c",
        textColor: "#fcfefeff",
        icon: require("../assets/img/Calendar.png"),
    },
    {
        text: "Đội Ngũ Chúng Tôi",
        color: "#bfd2f8ff",
        textColor: "#1f2b6cff",
        icon: require("../assets/img/Team.png"),
    },
    {
        text: "Quản Lý Thanh Toán",
        color: "#159eecff",
        textColor: "#fcfefeff",
        icon: require("../assets/img/Cash.png"),
    },
];

const specialties = [
    { name: 'Khoa Thần Kinh' },
    { name: 'Khoa Mắt' },
    { name: 'Khoa Tiêu Hóa' },
    { name: 'Khoa Ung Bướu' },
    { name: 'Khoa Tim Mạch' },
    { name: 'Khoa Tiết Niệu' },
    { name: 'Khoa Cơ Xương Khớp' },
    { name: 'Khoa Hô Hấp' },
    { name: 'Khoa Da Liễu' },
    { name: 'Khoa Tai Mũi Họng' },
    { name: 'Khoa Thận' },
    { name: 'Khoa Phụ Khoa' },
];
const articles = [
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    }
];
const menuItems = [
    { label: 'Hồ sơ', route: '/profile' },
    { label: 'Lịch khám', route: '/schedule' },
    { label: 'Thông báo', route: '/notifications' },
    { label: 'Đăng xuất', route: '/login' },
];
const schedules = [
    {
        id: 1,
        name: 'Sally Trần',
        email: 'sallysayhi@gmail.com',
        date: '10/10/2024',
        time: '9h-10h SA',
        doctor: 'Mai Văn Hà',
        department: 'Răng-Hàm-Mặt',
        status: 'Sắp tới',
    },
    {
        id: 2,
        name: 'Sally Trần',
        email: 'sallysayhi@gmail.com',
        date: '10/10/2024',
        time: '9h-10h SA',
        doctor: 'Mai Văn Hà',
        department: 'Răng-Hàm-Mặt',
        status: 'Đã khám',
    },
];
const services = [
    { title: "Free Checkup", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat convallis felis vitae tortor augue. Velit nascetur massa in." },
    { title: "Free Checkup", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat convallis felis vitae tortor augue. Velit nascetur massa in." },
    { title: "Free Checkup", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat convallis felis vitae tortor augue. Velit nascetur massa in." },
    { title: "Free Checkup", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat convallis felis vitae tortor augue. Velit nascetur massa in." },
    { title: "Free Checkup", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat convallis felis vitae tortor augue. Velit nascetur massa in." },
    { title: "Free Checkup", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat convallis felis vitae tortor augue. Velit nascetur massa in." },
];

const notifications = [
    {
        title: '🎉HOÀN TIỀN 5% khi đặt lịch tiêm HPV qua Meddical🎉',
        description: '🎉20/10 này, đừng quên chăm sóc bản thân mình bằng cách chủ động phòng ngừa HPV từ sớm Nàng nhé!📍 Bệnh viện Đa khoa Quốc tế Hoàn Mỹ Thủ Đức. 💯Đặc biệt, khi đặt lịch qua Medpro, Nàng sẽ nhận được ưu đãi hoàn tiền lên đến 5% trên tổng hóa đơn thanh toán nữa đó! 👉 Đặt lịch ngay!',
        time: '1 tuần trước',
    },
    {
        title: '🔥TẶNG VOUCHER 50% Xét Nghiệm Ung Thư Cổ Tử Cung🔥',
        description: '🔥Nhân dịp 20/10, Dr Marie dành tặng Nàng Voucher 50% gói “Xét nghiệm ung thư cổ tử cung” 🌷⏰Thời gian áp dụng: Từ nay đến hết ngày 5/11/2024. Đặc biệt hơn hết, bạn còn được hoàn tiền 5% khi đặt lịch khám qua Medpro nữa đó! Đặt khám ngay để không bỏ lỡ “Double Voucher” lần này bạn nhé!🔥',
        time: '2 tuần trước',
    },
    {
        title: '🔥Giảm giá 30% điều trị da liễu🔥',
        description: '🔥Phòng khám Chuyên khoa Da Trần Thịnh đang có chương trình GIẢM GIÁ 30% cho tất cả các gói điều trị!💡 Đừng bỏ lỡ cơ hội làm đẹp với đội ngũ bác sĩ chuyên nghiệp và công nghệ hiện đại.⚡ Ưu đãi chỉ đến hết ngày 30/9.👉 Nhanh tay đặt lịch trên Meddical nhé!',
        time: '15/09/2024 19:35',
    }
];
const hours = [
    "8h SA- 9h SA",
    "9h SA - 10h SA",
    "10h SA - 11h SA",
    "11h SA - 12h CH",
    "1h CH - 2h CH",
    "2h CH - 3h CH",
    "3h CH - 4h CH",
    "4h CH - 5h CH",
    "5h CH - 6h CH",
    "6h CH - 7h CH",
    "7h CH - 8h CH",
];
export const departments = ['Tim mạch', 'Nhi', 'Ngoại'];


export { mockBlogPosts, contactDetails, doctors, recentPosts, categories, cardData, specialties, articles, menuItems, schedules, notifications, services, hours };